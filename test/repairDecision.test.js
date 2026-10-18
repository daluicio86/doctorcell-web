import assert from "node:assert/strict";
import test from "node:test";
import { decisionSummary, decisionUrl, evaluateRepair, normalizeDecision, readDecisionHash } from "../src/utils/repairDecision.js";

const base = { brand: "Samsung", model: "Galaxy A54", problem: "screen", age: "recent", condition: "good", repairCost: "", replacementCost: "" };

test("without prices, suggests a quote without inventing costs or a ratio", () => {
  const result = evaluateRepair(base);
  assert.equal(result.outcome, "quote");
  assert.equal(result.ratio, null);
  assert.match(decisionSummary(base), /Costo de reparación: por confirmar/);
});

test("one known price is insufficient to make an economic comparison", () => {
  assert.equal(evaluateRepair({ ...base, repairCost: "45" }).ratio, null);
  assert.equal(evaluateRepair({ ...base, replacementCost: "200" }).ratio, null);
});

test("price comparison respects both threshold boundaries", () => {
  const evaluate = (repairCost) => evaluateRepair({ ...base, repairCost, replacementCost: "100" });
  assert.equal(evaluate("39.99").outcome, "repair");
  assert.equal(evaluate("40").outcome, "repair");
  assert.equal(evaluate("40.01").outcome, "weigh");
  assert.equal(evaluate("59.99").outcome, "weigh");
  assert.equal(evaluate("60").outcome, "compare");
  assert.equal(evaluate("125").ratio, 1.25);
});

test("other faults and age temper a cheap repair recommendation", () => {
  const cheapRepair = { ...base, repairCost: "20", replacementCost: "200" };
  assert.equal(evaluateRepair({ ...cheapRepair, age: "older" }).outcome, "weigh");
  assert.equal(evaluateRepair({ ...cheapRepair, condition: "several" }).outcome, "weigh");
  assert.equal(evaluateRepair({ ...cheapRepair, condition: "unreliable" }).outcome, "weigh");
});

test("liquid, swollen battery and no power prioritize diagnosis over any price ratio", () => {
  for (const problem of ["liquid", "swollen", "dead"]) {
    const result = evaluateRepair({ ...base, problem, repairCost: "10", replacementCost: "200" });
    assert.equal(result.outcome, "diagnosis");
    if (problem !== "dead") assert.match(result.precaution, /no lo cargues|cargarlo/);
  }
});

test("a shared URL faithfully recreates answers and result with Unicode and reserved characters", () => {
  const answers = { ...base, model: "Galaxy A54 / edición + 5G & más #1", repairCost: "35.50", replacementCost: "200" };
  const url = new URL(decisionUrl(answers));
  const restored = readDecisionHash(url.hash);
  assert.equal(url.pathname, "/conviene-reparar/");
  assert.equal(url.search, "");
  assert.deepEqual(restored, normalizeDecision(answers));
  assert.deepEqual(evaluateRepair(restored), evaluateRepair(answers));
  assert.deepEqual(readDecisionHash(new URL(decisionUrl(answers, "http://localhost:5173")).hash), restored);
});

test("share data excludes fields unrelated to the evaluation", () => {
  const url = decisionUrl({ ...base, email: "private@example.com", branch: "secret", phone: "1234" });
  assert.equal(url.includes("private"), false);
  assert.equal(url.includes("branch"), false);
  assert.equal(url.includes("phone"), false);
});

test("invalid and tampered shared answers cannot create a result", () => {
  const valid = new URL(decisionUrl(base)).hash;
  for (const hash of ["", "#v=2", "#v=1&model=hello", valid.replace("screen", "__proto__"), valid.replace("recent", "made-up"), valid.replace("Samsung", "unlisted"), `#${"x".repeat(2001)}`]) {
    assert.equal(readDecisionHash(hash), null);
  }
});

test("invalid prices, empty models and control characters are rejected", () => {
  for (const repairCost of ["0", "-1", "Infinity", "NaN", "1e3", "100001", "20.001", " 20 ", "20,50"]) {
    assert.equal(normalizeDecision({ ...base, repairCost }), null);
  }
  assert.equal(normalizeDecision({ ...base, model: "   " }), null);
  assert.equal(normalizeDecision({ ...base, model: "x".repeat(81) }), null);
  assert.equal(normalizeDecision({ ...base, model: "Galaxy\nA54\u0000" }), null);
  assert.equal(normalizeDecision({ ...base, repairCost: "0.01" }).repairCost, "0.01");
  assert.equal(normalizeDecision({ ...base, repairCost: "100000" }).repairCost, "100000");
});

test("summary retains entered prices and cautions for quoting and sharing", () => {
  const summary = decisionSummary({ ...base, problem: "swollen", repairCost: "25", replacementCost: "150" });
  assert.match(summary, /Samsung Galaxy A54/);
  assert.match(summary, /USD 25/);
  assert.match(summary, /USD 150/);
  assert.match(summary, /Deja de usarlo y cargarlo/);
  assert.match(summary, /se confirman al revisar/);
});
