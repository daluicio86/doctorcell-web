import assert from "node:assert/strict";
import test from "node:test";
import { isRaffleActive, raffleClosingTime } from "../src/utils/raffle.js";

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
