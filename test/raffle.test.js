import assert from "node:assert/strict";
import test from "node:test";
import { claimRaffleAutoOpen, isRaffleActive, raffleClosingTime } from "../src/utils/raffle.js";

test("the promotion remains active through October 31 in Ecuador", () => {
  assert.equal(isRaffleActive(Date.parse("2026-10-31T23:59:59.999-05:00")), true);
  assert.equal(isRaffleActive(raffleClosingTime - 1), true);
});

test("the promotion closes at midnight Ecuador time and stays closed", () => {
  assert.equal(raffleClosingTime, Date.parse("2026-11-01T05:00:00Z"));
  assert.equal(isRaffleActive(raffleClosingTime), false);
  assert.equal(isRaffleActive(Date.parse("2026-11-07T00:00:00-05:00")), false);
  assert.equal(isRaffleActive(NaN), false);
});

function sessionStorage() {
  const values = new Map();
  return { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) };
}

test("automatic promotion opens once across mounts in a tab session", () => {
  const storage = sessionStorage();
  const now = Date.parse("2026-10-29T10:00:00-05:00");
  assert.equal(claimRaffleAutoOpen(storage, now), true);
  assert.equal(claimRaffleAutoOpen(storage, now), false);
  assert.equal(claimRaffleAutoOpen(storage, now + 1000), false);
  assert.equal(claimRaffleAutoOpen(sessionStorage(), now), true);
});

test("expired raffle and unavailable session storage cannot trigger automatic display", () => {
  assert.equal(claimRaffleAutoOpen(sessionStorage(), raffleClosingTime), false);
  assert.equal(claimRaffleAutoOpen(sessionStorage(), NaN), false);
  const now = raffleClosingTime - 1;
  assert.equal(claimRaffleAutoOpen(undefined, now), false);
  assert.equal(claimRaffleAutoOpen({ getItem() { throw new Error("Storage blocked"); } }, now), false);
  assert.equal(claimRaffleAutoOpen({ getItem() { return null; }, setItem() { throw new Error("Storage full"); } }, now), false);
});
