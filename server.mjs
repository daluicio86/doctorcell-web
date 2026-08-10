import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";
import { createLead, readJsonBody } from "./server/leadService.js";
import { dispatchDueFollowups, recordLifecycleEvent } from "./server/followupService.js";

const PORT = Number(process.env.PORT || 4173);
const DIST = resolve("dist");
const types = { ".css": "text/css", ".html": "text/html", ".ico": "image/x-icon", ".jpg": "image/jpeg", ".js": "text/javascript", ".json": "application/json", ".png": "image/png", ".svg": "image/svg+xml", ".txt": "text/plain", ".webp": "image/webp", ".xml": "application/xml" };

function json(response, status, body) {
  response.writeHead(status, { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" });
  response.end(JSON.stringify(body));
}

async function handleLead(request, response) {
  if (request.method !== "POST") return json(response, 405, { error: "Método no permitido." });
  try {
    const payload = await readJsonBody(request);
    const result = await createLead(payload, {
      ip: request.headers["x-forwarded-for"]?.split(",")[0] || request.socket.remoteAddress,
      userAgent: request.headers["user-agent"]
    });
    json(response, result.status, result.body);
  } catch (error) {
    json(response, error.message === "PAYLOAD_TOO_LARGE" ? 413 : 400, { error: "Solicitud inválida." });
  }
}

async function handleLeadEvent(request, response, caseId) {
  if (request.method !== "POST") return json(response, 405, { error: "Método no permitido." });
  const expected = process.env.LEADS_ADMIN_TOKEN;
  if (!expected || request.headers.authorization !== `Bearer ${expected}`) return json(response, 401, { error: "No autorizado." });
  try {
    const result = await recordLifecycleEvent(caseId, await readJsonBody(request));
    json(response, result.status, result.body);
  } catch { json(response, 400, { error: "Solicitud inválida." }); }
}

async function serveStatic(request, response) {
  const requested = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
  const safePath = normalize(requested).replace(/^(\.\.[/\\])+/, "");
  let file = join(DIST, safePath === "/" ? "index.html" : safePath);
  if (!file.startsWith(DIST)) return json(response, 403, { error: "Ruta no permitida." });
  try {
    if ((await stat(file)).isDirectory()) file = join(file, "index.html");
  } catch {
    file = join(DIST, "index.html");
  }
  response.writeHead(200, { "content-type": `${types[extname(file)] || "application/octet-stream"}; charset=utf-8` });
  createReadStream(file).pipe(response);
}

createServer((request, response) => {
  const eventMatch = new URL(request.url, "http://localhost").pathname.match(/^\/api\/leads\/([^/]+)\/events$/);
  if (eventMatch) return void handleLeadEvent(request, response, eventMatch[1]);
  if (request.url?.startsWith("/api/leads")) return void handleLead(request, response);
  return void serveStatic(request, response);
}).listen(PORT, "0.0.0.0", () => console.log(`DoctorCell Quito listo en http://localhost:${PORT}`));

const followupTimer = setInterval(() => dispatchDueFollowups().catch((error) => console.error("Error en seguimientos:", error.message)), 60_000);
followupTimer.unref();
dispatchDueFollowups().catch((error) => console.error("Error en seguimientos:", error.message));
