import assert from "node:assert/strict";
import test from "node:test";
import { decisionSummary, decisionUrl, evaluateRepair, normalizeDecision, readDecisionHash } from "../src/utils/repairDecision.js";

const base = { brand: "Samsung", model: "Galaxy A54", problem: "screen", age: "recent", condition: "good" };

test("a working device with a single fault is directed to a quote", () => {
  const result = evaluateRepair(base);
  assert.equal(result.outcome, "quote");
  assert.equal("ratio" in result, false);
  assert.doesNotMatch(decisionSummary(base), /USD|ingresado|%/);
});

test("age and other faults inform the recommendation without prices", () => {
  assert.equal(evaluateRepair({ ...base, age: "older" }).outcome, "weigh");
  assert.equal(evaluateRepair({ ...base, condition: "several" }).outcome, "weigh");
  assert.equal(evaluateRepair({ ...base, condition: "unreliable" }).outcome, "weigh");
});

test("liquid, swollen battery and no power prioritize diagnosis", () => {
  for (const problem of ["liquid", "swollen", "dead"]) {
    const result = evaluateRepair({ ...base, problem, age: "older", condition: "several" });
    assert.equal(result.outcome, "diagnosis");
    if (problem !== "dead") assert.match(result.precaution, /no lo cargues|cargarlo/);
  }
});

test("a shared URL recreates answers and result with Unicode and reserved characters", () => {
  const answers = { ...base, model: "Galaxy A54 / edición + 5G & más #1" };
  const url = new URL(decisionUrl(answers));
  const restored = readDecisionHash(url.hash);
  assert.equal(url.pathname, "/conviene-reparar/");
  assert.equal(url.search, "");
  assert.deepEqual(restored, normalizeDecision(answers));
  assert.deepEqual(evaluateRepair(restored), evaluateRepair(answers));
  assert.deepEqual(readDecisionHash(new URL(decisionUrl(answers, "http://localhost:5173")).hash), restored);
});

test("previously shared links still open but retired price fields are discarded", () => {
  const legacy = "#v=1&brand=Samsung&model=Galaxy+A54&problem=screen&age=recent&condition=good&repairCost=150&replacementCost=200";
  const restored = readDecisionHash(legacy);
  assert.deepEqual(restored, base);
  assert.equal(evaluateRepair(restored).outcome, "quote");
  assert.doesNotMatch(decisionUrl(restored), /repairCost|replacementCost/);
  assert.doesNotMatch(decisionSummary({ ...base, repairCost: "150", replacementCost: "200" }), /150|200|USD|%/);
});

test("share data excludes fields unrelated to the evaluation", () => {
  const url = decisionUrl({ ...base, email: "private@example.com", branch: "secret", phone: "1234", repairCost: "10" });
  for (const field of ["private", "branch", "phone", "repairCost"]) assert.equal(url.includes(field), false);
});

test("invalid and tampered shared answers cannot create a result", () => {
  const valid = new URL(decisionUrl(base)).hash;
  for (const hash of ["", "#v=2", "#v=1&model=hello", valid.replace("screen", "__proto__"), valid.replace("recent", "made-up"), valid.replace("Samsung", "unlisted"), "#" + "x".repeat(2001)]) {
    assert.equal(readDecisionHash(hash), null);
  }
  assert.equal(normalizeDecision({ ...base, model: "   " }), null);
  assert.equal(normalizeDecision({ ...base, model: "x".repeat(81) }), null);
  assert.equal(normalizeDecision({ ...base, model: "Galaxy\u0000" }), null);
});

test("summary retains equipment and relevant cautions for quoting and sharing", () => {
  const summary = decisionSummary({ ...base, problem: "swollen" });
  assert.match(summary, /Samsung Galaxy A54/);
  assert.match(summary, /Deja de usarlo y cargarlo/);
  assert.match(summary, /se confirman al revisar/);
});
