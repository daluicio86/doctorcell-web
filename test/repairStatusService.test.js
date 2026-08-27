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
  };

  assert.equal(isRepairStatusAvailable(env), true);
  const result = await queryRepairStatus("DC 10428", {
    env,
    fetchImpl: async (url, options) => {
      requestedUrl = url;
      requestedOptions = options;
      return { ok: true, json: async () => ({ status: "En reparación" }) };
    }
  });

  assert.equal(result.status, 200);
  assert.equal(result.body.status, "En reparación");
  assert.equal(requestedUrl.searchParams.get("site"), "doctorcell");
  assert.equal(requestedUrl.searchParams.get("order"), "DC 10428");
  assert.equal(requestedOptions.headers.authorization, "Bearer secret-token");
});
