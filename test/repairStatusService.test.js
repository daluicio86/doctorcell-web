import assert from "node:assert/strict";
import test from "node:test";
import { isRepairStatusAvailable, queryRepairStatus } from "../server/repairStatusService.js";

test("reports assisted tracking when ZENTRA_STATUS_URL is absent", async () => {
  let fetchCalled = false;
  assert.equal(isRepairStatusAvailable({}), false);

  const result = await queryRepairStatus("DC-10428", {
    env: {},
    fetchImpl: async () => { fetchCalled = true; }
  });

  assert.equal(result.status, 503);
  assert.equal(fetchCalled, false);
  assert.match(result.body.error, /nuestro equipo/);
  assert.doesNotMatch(result.body.error, /ZENTRA|configur|variable/i);
});

test("keeps the Zentra request path when ZENTRA_STATUS_URL is configured", async () => {
  let requestedUrl;
  let requestedOptions;
  const env = {
    ZENTRA_STATUS_URL: "https://zentra.example/status?site=doctorcell",
    ZENTRA_API_TOKEN: "secret-token"
    , ZENTRA_STATUS_VERIFY_CONTACT: 'true'
  };

  assert.equal(isRepairStatusAvailable(env), true);
  const result = await queryRepairStatus("DC 10428", {
    contact: '0991234567',
    env,
    fetchImpl: async (url, options) => {
      requestedUrl = url;
      requestedOptions = options;
      return { ok: true, json: async () => ({ status: "En reparación", contactVerified: true, customerName: 'PRIVATE', message: 'PRIVATE', contact: 'PRIVATE' }) };
    }
  });

  assert.equal(result.status, 200);
  assert.equal(result.body.status, "En reparación");
  assert.equal(requestedUrl.searchParams.get("site"), "doctorcell");
  assert.equal(requestedUrl.searchParams.has('order'), false);
  assert.equal(requestedOptions.method, 'POST');
  assert.deepEqual(JSON.parse(requestedOptions.body), { order: 'DC 10428', contact: '0991234567' });
  assert.deepEqual(result.body, { status: 'En reparación' });
  assert.equal(requestedOptions.headers.authorization, "Bearer secret-token");
});

test('tracking stays assisted until the provider supports contact verification', () => {
  assert.equal(isRepairStatusAvailable({ ZENTRA_STATUS_URL: 'https://example.test/status' }), false);
});
test('tracking rejects missing contact without asking the provider', async () => {
  const result = await queryRepairStatus('DC-001', { env: { ZENTRA_STATUS_URL: 'https://example.test/status', ZENTRA_STATUS_VERIFY_CONTACT: 'true' }, fetchImpl: () => { throw new Error('Unexpected request'); } });
  assert.equal(result.status, 400);
});
test('tracking never returns an unverified order or provider private fields', async () => {
  const env = { ZENTRA_STATUS_URL: 'https://example.test/status', ZENTRA_STATUS_VERIFY_CONTACT: 'true' };
  for (const body of [{ status: 'En reparación', customer: 'PRIVATE' }, { contactVerified: false, status: 'Entregado' }]) {
    const result = await queryRepairStatus('DC-001', { env, contact: 'test@example.test', fetchImpl: async () => ({ ok: true, json: async () => body }) });
    assert.equal(result.status, 404); assert.doesNotMatch(JSON.stringify(result.body), /PRIVATE|Entregado|En reparación/);
  }
});
