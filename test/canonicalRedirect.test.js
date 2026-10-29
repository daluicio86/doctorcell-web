import assert from "node:assert/strict";
import test from "node:test";
import { canonicalRedirect } from "../server/canonicalRedirect.js";
import { SITE_ORIGIN } from "../src/data/siteConfig.js";

test("www redirects to the HTTPS apex while preserving paths and query parameters", () => {
  assert.equal(SITE_ORIGIN, "https://doctorcell.com.ec");
  assert.equal(canonicalRedirect("www.doctorcell.com.ec", "/"), `${SITE_ORIGIN}/`);
  assert.equal(canonicalRedirect("WWW.DOCTORCELL.COM.EC:443", "/guias/microsoldadura-celulares-quito/?utm_source=google&text=a%20b"), `${SITE_ORIGIN}/guias/microsoldadura-celulares-quito/?utm_source=google&text=a%20b`);
});

test("the canonical domain and local development do not redirect", () => {
  for (const host of ["doctorcell.com.ec", "doctorcell.com.ec:443", "localhost:4173", "127.0.0.1:4173", undefined, "www.doctorcell.com.ec.evil.example"]) assert.equal(canonicalRedirect(host, "/agendar/"), null);
});

test("request targets cannot turn the canonical redirect into an external redirect", () => {
  assert.equal(canonicalRedirect("www.doctorcell.com.ec", "//evil.example/path?x=1"), `${SITE_ORIGIN}/path?x=1`);
});
