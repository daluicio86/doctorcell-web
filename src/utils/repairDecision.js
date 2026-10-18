export const decisionPath = "/conviene-reparar/";
export const decisionBrands = ["Apple", "Samsung", "Xiaomi", "Huawei", "Motorola", "Honor", "Oppo", "Infinix", "Tecno", "Nokia", "Google", "Otra"];
export const problemOptions = {
  screen: "Pantalla rota o falla del táctil",
  battery: "La batería dura poco",
  charging: "No carga o carga intermitente",
  camera: "Problema de cámara o audio",
  software: "Lentitud o fallas de software",
  liquid: "Se mojó",
  swollen: "Batería hinchada o tapa levantada",
  dead: "No enciende",
  other: "Otro problema / no estoy seguro"
};
export const ageOptions = { recent: "Menos de 2 años", middle: "Entre 2 y 4 años", older: "Más de 4 años", unknown: "No lo sé" };
export const conditionOptions = { good: "Funcionaba bien antes de esta falla", several: "Tiene otros daños o fallas", unreliable: "Ya no cubre lo que necesito" };
export const emptyDecision = { brand: "", model: "", problem: "", age: "", condition: "", repairCost: "", replacementCost: "" };

// Only user-provided costs are compared. These thresholds are an orientation,
// not a market valuation, repair quote or technical diagnosis.
function costValue(value) {
  if (value === "" || value == null) return "";
  const text = String(value);
  if (!/^\d{1,6}(?:\.\d{1,2})?$/.test(text)) return null;
  const amount = Number(text);
  return amount > 0 && amount <= 100000 ? String(amount) : null;
}

export function normalizeDecision(input) {
  if (!input || !decisionBrands.includes(input.brand)
    || !Object.hasOwn(problemOptions, input.problem) || !Object.hasOwn(ageOptions, input.age)
    || !Object.hasOwn(conditionOptions, input.condition) || typeof input.model !== "string") return null;
  const model = input.model.trim().replace(/\s+/g, " ");
  const repairCost = costValue(input.repairCost);
  const replacementCost = costValue(input.replacementCost);
  if (!model || model.length > 80 || /[\x00-\x1f\x7f]/.test(model) || repairCost === null || replacementCost === null) return null;
  return { brand: input.brand, model, problem: input.problem, age: input.age, condition: input.condition, repairCost, replacementCost };
}

export function evaluateRepair(input) {
  const answers = normalizeDecision(input);
  if (!answers) throw new TypeError("Respuestas inválidas");
  const ratio = answers.repairCost && answers.replacementCost ? Number(answers.repairCost) / Number(answers.replacementCost) : null;
  const hasOtherConcerns = answers.condition !== "good" || answers.age === "older";
  let outcome = "quote";
  let title = "Vale la pena cotizar la reparación";
  let explanation = "Si el equipo cubría tus necesidades, conocer el costo de solucionar esta falla es un buen primer paso antes de reemplazarlo.";
  if (["liquid", "swollen", "dead"].includes(answers.problem)) {
    outcome = "diagnosis";
    title = "Primero, una revisión técnica";
    explanation = "Esta falla puede tener distintas causas o afectar varios componentes. Primero confirma qué se puede recuperar y el costo total antes de decidir.";
  } else if (ratio !== null && ratio >= 0.6) {
    outcome = "compare";
    title = "Conviene comparar con un reemplazo";
    explanation = "La reparación que ingresaste cuesta al menos el 60 % de la alternativa. Compara garantía, estado y vida útil esperada de ambas opciones.";
  } else if (hasOtherConcerns || (ratio !== null && ratio > 0.4)) {
    outcome = "weigh";
    title = "Compara el costo y la vida útil";
    explanation = hasOtherConcerns
      ? "La antigüedad, otras fallas o tus necesidades pueden pesar tanto como el precio. Pide una revisión completa y compara el gasto total con otra opción."
      : "El costo está entre el 40 % y el 60 % de la alternativa. La garantía, el estado general y el tiempo que esperas seguir usándolo ayudan a decidir.";
  } else if (ratio !== null) {
    outcome = "repair";
    title = "Reparar puede ser una buena opción";
    explanation = "El costo que ingresaste no supera el 40 % de la alternativa y el resto del equipo funcionaba bien. Confirma el diagnóstico, el repuesto y la garantía antes de autorizar.";
  }
  const nextSteps = ["Confirma el costo total, el tipo de repuesto y la garantía por escrito."];
  if (answers.age === "older" || answers.age === "unknown") nextSteps.push("Consulta la disponibilidad de repuestos y si tu modelo sigue recibiendo las actualizaciones que necesitas.");
  if (answers.condition !== "good") nextSteps.push("Incluye las otras fallas y tus necesidades en la comparación.");
  nextSteps.push("Indica si recuperar tus datos es una prioridad; su recuperación no está garantizada.");
  const precaution = answers.problem === "swollen"
    ? "Deja de usarlo y cargarlo. No presiones ni perfores la batería; solicita una revisión técnica."
    : answers.problem === "liquid" ? "Apágalo y no lo cargues. Evita calor y arroz; solicita una revisión por humedad." : "";
  return { outcome, title, explanation, ratio, nextSteps, precaution };
}

export function decisionUrl(input, origin = "https://www.doctorcell.com.ec") {
  const answers = normalizeDecision(input);
  if (!answers) throw new TypeError("Respuestas inválidas");
  return `${origin}${decisionPath}#${new URLSearchParams({ v: "1", ...answers })}`;
}

export function readDecisionHash(hash) {
  if (!hash || hash.length > 2000) return null;
  const parameters = new URLSearchParams(hash.replace(/^#/, ""));
  if (parameters.get("v") !== "1") return null;
  return normalizeDecision(Object.fromEntries(parameters));
}

export function decisionSummary(answers) {
  const result = evaluateRepair(answers);
  return [
    "¿Conviene reparar mi celular? · DoctorCell Quito",
    `Equipo: ${answers.brand} ${answers.model}.`,
    `Falla: ${problemOptions[answers.problem]}.`,
    `Antigüedad: ${ageOptions[answers.age]}. Estado: ${conditionOptions[answers.condition]}.`,
    answers.repairCost ? `Costo de reparación ingresado: USD ${answers.repairCost}.` : "Costo de reparación: por confirmar.",
    answers.replacementCost ? `Costo de alternativa ingresado: USD ${answers.replacementCost}.` : "Costo de alternativa: por confirmar.",
    `Orientación: ${result.title}.`,
    result.explanation,
    result.precaution,
    "Orientación preliminar; el diagnóstico, precio y viabilidad se confirman al revisar el equipo."
  ].filter(Boolean).join("\n");
}
