import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const branchesByCompany = {
  "DOCTORCELL MATRIZ": "Sucursal Prensa",
  "DOCTORCELL COLON": "Sucursal Colón",
  "DOCTORCELL SHYRIS": "Sucursal Shyris",
  "DOCTORCELL VACA CASTRO": "Sucursal Vaca de Castro"
};
const allBranches = Object.values(branchesByCompany);
const normalize = (value) => String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toUpperCase();
const cookies = new Set(["doctorcell_access", "doctorcell_refresh", "doctorcell_session_id", "doctorcell_user_id"]);

export function sessionHeaders(headers) {
  const result = {};
  const authorization = headers.authorization;
  if (typeof authorization === "string" && /^Bearer [^\s\r\n]{1,4096}$/.test(authorization)) result.Authorization = authorization;
  const cookie = String(headers.cookie || "").split(";").map((part) => part.trim()).filter((part) => {
    const index = part.indexOf("=");
    return index > 0 && cookies.has(part.slice(0, index)) && !/[\r\n]/.test(part);
  }).join("; ");
  if (cookie) result.Cookie = cookie;
  return result;
}

async function rows() {
  try {
    const text = await readFile(resolve(process.env.LEADS_FILE || "data/leads.ndjson"), "utf8");
    return text.split("\n").filter((line) => line.trim()).map(JSON.parse);
  } catch (error) { if (error.code === "ENOENT") return []; throw error; }
}

export async function readLeadInbox(headers, query, { fetcher = fetch, readRows = rows } = {}) {
  const auth = sessionHeaders(headers);
  if (!auth.Cookie && !auth.Authorization) return { status: 401, body: { error: "Inicia sesión en Zentra." } };
  const page = Number(query.get("page") || "1");
  const search = (query.get("search") || "").trim();
  const branch = query.get("branch") || "";
  if (!Number.isSafeInteger(page) || page < 1 || page > 100000 || search.length > 100 || (branch && !allBranches.includes(branch))) return { status: 400, body: { error: "Filtros inválidos." } };
  const request = async (path) => fetcher(`https://concentrador.net${path}`, {
    headers: auth, redirect: "error", cache: "no-store", signal: AbortSignal.timeout(10000)
  });
  try {
    // The live authority validates the session and roles on every read. No cached profile grants access.
    const sessionResponse = await request("/api/usuario/session");
    if (!sessionResponse.ok) return { status: sessionResponse.status === 401 ? 401 : 503, body: { error: "No pudimos validar la sesión de Zentra." } };
    const session = await sessionResponse.json();
    const roles = Array.isArray(session.roles) ? session.roles.map(normalize) : [];
    const superAdmin = roles.includes("SUPERADMIN");
    if (!session.id || (!superAdmin && !roles.includes("ADMIN"))) return { status: 403, body: { error: "Se requiere acceso administrativo de Doctorcell." } };
    let allowed = allBranches;
    if (!superAdmin) {
      const localResponse = await request("/api/local?pageIndex=1&pageSize=100&estado=1");
      if (!localResponse.ok) return { status: 403, body: { error: "No pudimos confirmar tus sucursales autorizadas." } };
      const localPage = await localResponse.json();
      allowed = [...new Set((Array.isArray(localPage.data) ? localPage.data : []).map((local) => branchesByCompany[normalize(local.empresaNombre)]).filter(Boolean))];
      if (!allowed.length) return { status: 403, body: { error: "Tu cuenta no tiene sucursales Doctorcell autorizadas." } };
    }
    if (branch && !allowed.includes(branch)) return { status: 403, body: { error: "Sucursal no autorizada." } };
    const allowedBranches = new Set(allowed.map(normalize));
    const filtered = (await readRows()).filter((lead) => {
      const location = normalize(lead.location);
      // Unassigned consultations belong to the main branch. Unknown historical labels remain SuperAdmin-only.
      const scopeAllowed = !location ? allowedBranches.has(normalize("Sucursal Prensa")) : allowedBranches.has(location) || (superAdmin && !branch);
      return scopeAllowed && (!branch || location === normalize(branch)) && (!search || normalize([lead.name, lead.contact, lead.caseId, lead.brand, lead.model].join(" ")).includes(normalize(search)));
    }).sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
    const fields = ["caseId", "createdAt", "name", "contact", "problem", "detail", "service", "brand", "model", "device", "location", "schedule", "source", "consent", "consentedAt"];
    const pageSize = 25;
    return { status: 200, body: {
      page, pageSize, total: filtered.length, branches: allowed,
      items: filtered.slice((page - 1) * pageSize, page * pageSize).map((lead) => Object.fromEntries(fields.filter((field) => Object.hasOwn(lead, field)).map((field) => [field, lead[field]])))
    } };
  } catch { return { status: 503, body: { error: "No pudimos consultar las solicitudes. Reintenta en un momento." } }; }
}
