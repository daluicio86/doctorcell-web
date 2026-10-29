import { appendFile, mkdir, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { randomUUID } from "node:crypto";
import { scheduleNewLeadFollowups } from "./followupService.js";
import { isValidWhatsAppPhone } from "../src/utils/contact.js";

const DATA_FILE = resolve(process.env.LEADS_FILE || "data/leads.ndjson");
const MAX_BODY_SIZE = 32 * 1024;
const allowedFields = ["sessionId", "name", "device", "brand", "model", "problem", "detail", "service", "location", "schedule", "contact"];

const clean = (value, max = 500) => typeof value === "string" ? value.trim().slice(0, max) : "";

function validContact(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || /\d{7,}/.test(value.replace(/\D/g, ""));
}

async function findExisting(sessionId) {
  if (!sessionId) return null;
  try {
    const rows = (await readFile(DATA_FILE, "utf8")).trim().split("\n").reverse();
    for (const row of rows) {
      const lead = JSON.parse(row);
      if (lead.sessionId === sessionId) return lead;
    }
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  return null;
}

async function forwardToWebhook(lead) {
  const url = process.env.LEADS_WEBHOOK_URL;
  if (!url) return;
  const response = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(lead),
    signal: AbortSignal.timeout(8000)
  });
  if (!response.ok) throw new Error(`Webhook respondió ${response.status}`);
}

export async function createLead(payload, metadata = {}) {
  if (!payload || payload.consent !== true) {
    return { status: 400, body: { error: "Se requiere autorización para guardar los datos." } };
  }

  const lead = Object.fromEntries(allowedFields.map((field) => [field, clean(payload[field], field === "detail" ? 500 : 160)]));
  if (payload.source === "quote-finder-web") {
    if (lead.name.length < 2) return { status: 400, body: { error: "Escribe tu nombre (al menos 2 caracteres)." } };
    if (!isValidWhatsAppPhone(lead.contact)) return { status: 400, body: { error: "Ingresa un teléfono de WhatsApp válido." } };
    if (!lead.problem) return { status: 400, body: { error: "Selecciona la falla de tu equipo." } };
  }
  if (!validContact(lead.contact)) {
    return { status: 400, body: { error: "El teléfono o correo no es válido." } };
  }

  const existing = await findExisting(lead.sessionId);
  if (existing) return { status: 200, body: { ok: true, caseId: existing.caseId, duplicate: true } };

  lead.caseId = `DC-${randomUUID().replaceAll("-", "").slice(0, 8).toUpperCase()}`;
  lead.createdAt = new Date().toISOString();
  lead.source = payload.source === "quote-finder-web" ? "quote-finder-web" : "chatbot-web";
  lead.consent = true;
  lead.consentedAt = lead.createdAt;
  lead.ip = clean(metadata.ip, 80);
  lead.userAgent = clean(metadata.userAgent, 240);

  await mkdir(dirname(DATA_FILE), { recursive: true });
  await appendFile(DATA_FILE, `${JSON.stringify(lead)}\n`, { encoding: "utf8", mode: 0o600 });
  await scheduleNewLeadFollowups(lead);

  try {
    await forwardToWebhook(lead);
  } catch (error) {
    console.error("Lead guardado, pero el webhook falló:", error.message);
  }

  return { status: 201, body: { ok: true, caseId: lead.caseId } };
}

export async function readJsonBody(request) {
  let body = "";
  for await (const chunk of request) {
    body += chunk;
    if (Buffer.byteLength(body) > MAX_BODY_SIZE) throw new Error("PAYLOAD_TOO_LARGE");
  }
  return JSON.parse(body || "{}");
}
