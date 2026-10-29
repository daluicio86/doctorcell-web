import assert from "node:assert/strict";
import test from "node:test";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { basename, join, resolve, sep } from "node:path";
import { captureQuoteLead } from "../src/utils/leads.js";

const quote = { name: "Ana de prueba", contact: "0991234567", problem: "Software", consent: true };

test("quote submission requires explicit consent without sending contact data", async (t) => {
  const fetch = t.mock.method(globalThis, "fetch", async () => { throw new Error("Unexpected request"); });
  await assert.rejects(captureQuoteLead({ ...quote, consent: false }, "quote-1"), /autorización/);
  assert.equal(fetch.mock.calls.length, 0);
});

test("quote client confirms persistence and keeps a separate request identity", async (t) => {
  let payload;
  t.mock.method(globalThis, "fetch", async (url, options) => {
    assert.equal(url, "/api/leads");
    payload = JSON.parse(options.body);
    return { ok: true, json: async () => ({ ok: true, caseId: "DC-QUOTE123" }) };
  });
  assert.equal((await captureQuoteLead(quote, "quote-unique-id")).caseId, "DC-QUOTE123");
  assert.equal(payload.name, quote.name);
  assert.equal(payload.contact, quote.contact);
  assert.equal(payload.source, "quote-finder-web");
  assert.equal(payload.sessionId, "quote-unique-id");
});

test("quote client never treats a static HTML response or incomplete response as a saved lead", async (t) => {
  const fetch = t.mock.method(globalThis, "fetch", async () => ({ ok: true, json: async () => { throw new Error("HTML, not JSON"); } }));
  await assert.rejects(captureQuoteLead(quote, "quote-1"), /confirmar el registro/);
  fetch.mock.mockImplementation(async () => ({ ok: true, json: async () => ({ ok: true }) }));
  await assert.rejects(captureQuoteLead(quote, "quote-1"), /confirmar el registro/);
  fetch.mock.mockImplementation(async () => ({ ok: false, json: async () => ({ error: "Intenta más tarde" }) }));
  await assert.rejects(captureQuoteLead(quote, "quote-1"), /Intenta más tarde/);
});

test("quote server saves the contact before any WhatsApp interaction and deduplicates retries", async (t) => {
  const directory = await mkdtemp(join(tmpdir(), "doctorcell-quote-"));
  const envNames = ["LEADS_FILE", "FOLLOWUPS_FILE", "LEAD_EVENTS_FILE", "LEADS_WEBHOOK_URL"];
  const previous = Object.fromEntries(envNames.map((key) => [key, process.env[key]]));
  process.env.LEADS_FILE = join(directory, "leads.ndjson");
  process.env.FOLLOWUPS_FILE = join(directory, "followups.ndjson");
  process.env.LEAD_EVENTS_FILE = join(directory, "events.ndjson");
  delete process.env.LEADS_WEBHOOK_URL;
  t.after(async () => {
    for (const key of envNames) {
      if (previous[key] === undefined) delete process.env[key];
      else process.env[key] = previous[key];
    }
    const target = resolve(directory);
    assert.ok(target.startsWith(resolve(tmpdir()) + sep) && basename(target).startsWith("doctorcell-quote-"));
    await rm(target, { recursive: true, force: true });
  });
  const { createLead } = await import("../server/leadService.js");
  const payload = { ...quote, source: "quote-finder-web", sessionId: "quote-request-1" };
  for (const invalid of [{ consent: false }, { name: " " }, { contact: "abc0991234567" }, { contact: "test@example.com" }, { problem: "" }]) {
    assert.equal((await createLead({ ...payload, ...invalid })).status, 400);
  }
  const result = await createLead(payload);
  assert.equal(result.status, 201);
  const rows = (await readFile(process.env.LEADS_FILE, "utf8")).trim().split("\n").map(JSON.parse);
  assert.equal(rows.length, 1);
  assert.equal(rows[0].name, quote.name);
  assert.equal(rows[0].contact, quote.contact);
  assert.equal(rows[0].source, "quote-finder-web");
  assert.equal(rows[0].consent, true);
  assert.ok(Number.isFinite(Date.parse(rows[0].consentedAt)));
  const retry = await createLead(payload);
  assert.equal(retry.body.duplicate, true);
  assert.equal(retry.body.caseId, result.body.caseId);
  assert.equal((await readFile(process.env.LEADS_FILE, "utf8")).trim().split("\n").length, 1);
  assert.equal((await readFile(process.env.FOLLOWUPS_FILE, "utf8")).trim().split("\n").length, 2);
  const chatbot = await createLead({ contact: "chatbot-test@example.com", sessionId: "chatbot-request", consent: true });
  assert.equal(chatbot.status, 201);
  assert.notEqual(chatbot.body.caseId, result.body.caseId);
});
