import assert from "node:assert/strict";
import test from "node:test";
import { readLeadInbox, sessionHeaders } from "../server/leadInbox.js";

const auth = { cookie: "doctorcell_access=test; doctorcell_refresh=refresh; unrelated=secret" };
const leads = [
  { caseId: "DC-A", name: "Ana", contact: "0991111111", location: "Sucursal Colón", createdAt: "2026-11-13T14:00:00Z", ip: "private", sessionId: "private" },
  { caseId: "DC-B", name: "Beto", location: "Sucursal Shyris", createdAt: "2026-11-13T15:00:00Z" },
  { caseId: "DC-C", name: "General", location: "", createdAt: "2026-11-13T13:00:00Z" }
];
const mock = (roles, companies = []) => async (url, options) => {
  assert.ok(!options.headers.Cookie.includes("unrelated"));
  return { ok: true, json: async () => url.includes("/session") ? { id: "test-user", roles } : { data: companies.map((empresaNombre) => ({ empresaNombre })) } };
};
test("inbox denies anonymous readers without contacting any service", async () => {
  const result = await readLeadInbox({}, new URLSearchParams(), { fetcher: async () => { throw new Error("unexpected"); } });
  assert.equal(result.status, 401);
});
test("only live administrative roles may read consultations", async () => {
  assert.equal((await readLeadInbox(auth, new URLSearchParams(), { fetcher: mock(["Tecnico"]) })).status, 403);
  assert.equal((await readLeadInbox(auth, new URLSearchParams(), { fetcher: mock(["Admin"], ["Diego Aluicio"]) })).status, 403);
});
test("a branch administrator cannot see another branch or unassigned consultations", async () => {
  const dependencies = { fetcher: mock(["Admin"], ["DOCTORCELL COLON"]), readRows: async () => leads };
  const result = await readLeadInbox(auth, new URLSearchParams(), dependencies);
  assert.deepEqual(result.body.items.map((row) => row.caseId), ["DC-A"]);
  assert.equal(result.body.items[0].ip, undefined);
  assert.equal(result.body.items[0].sessionId, undefined);
  assert.equal((await readLeadInbox(auth, new URLSearchParams({ branch: "Sucursal Shyris" }), dependencies)).status, 403);
});
test("SuperAdmin can inspect and filter the complete persistent inbox", async () => {
  const dependencies = { fetcher: mock(["SuperAdmin"]), readRows: async () => leads };
  const result = await readLeadInbox(auth, new URLSearchParams(), dependencies);
  assert.equal(result.body.total, 3);
  assert.equal(result.body.items[0].caseId, "DC-B");
  assert.equal((await readLeadInbox(auth, new URLSearchParams({ search: "099111" }), dependencies)).body.total, 1);
  assert.equal((await readLeadInbox(auth, new URLSearchParams({ page: "-1" }), dependencies)).status, 400);
});
test("expired sessions and provider failures never return stored contacts", async () => {
  let read = false;
  const dependencies = { fetcher: async () => ({ ok: false, status: 401 }), readRows: async () => { read = true; return leads; } };
  assert.equal((await readLeadInbox(auth, new URLSearchParams(), dependencies)).status, 401);
  assert.equal(read, false);
  assert.deepEqual(sessionHeaders({ cookie: "unrelated=secret" }), {});
});
