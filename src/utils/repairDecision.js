import { SITE_ORIGIN } from "../data/siteConfig.js";

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
export const emptyDecision = { brand: "", model: "", problem: "", age: "", condition: "" };

export function normalizeDecision(input) {
  if (!input || !decisionBrands.includes(input.brand)
    || !Object.hasOwn(problemOptions, input.problem) || !Object.hasOwn(ageOptions, input.age)
    || !Object.hasOwn(conditionOptions, input.condition) || typeof input.model !== "string") return null;
  const model = input.model.trim().replace(/\s+/g, " ");
  if (!model || model.length > 80 || /[\x00-\x1f\x7f]/.test(model)) return null;
  return { brand: input.brand, model, problem: input.problem, age: input.age, condition: input.condition };
}

export function evaluateRepair(input) {
  const answers = normalizeDecision(input);
  if (!answers) throw new TypeError("Respuestas inválidas");
  const hasOtherConcerns = answers.condition !== "good" || answers.age === "older";
  let outcome = "quote";
  let title = "Vale la pena cotizar la reparación";
  let explanation = "Si el equipo cubría tus necesidades, conocer el costo de solucionar esta falla es un buen primer paso antes de reemplazarlo.";
  if (["liquid", "swollen", "dead"].includes(answers.problem)) {
    outcome = "diagnosis";
    title = "Primero, una revisión técnica";
    explanation = "Esta falla puede tener distintas causas o afectar varios componentes. Primero confirma qué se puede recuperar y el costo total antes de decidir.";
  } else if (hasOtherConcerns) {
    outcome = "weigh";
    title = "Revisa el estado general antes de decidir";
    explanation = "La antigüedad, otras fallas o tus necesidades pueden influir en la decisión. Pide una revisión completa y confirma si la reparación permite seguir usando el equipo como necesitas.";
  }
  const nextSteps = ["Confirma el costo total, el tipo de repuesto y el tiempo de reparación."];
  if (answers.age === "older" || answers.age === "unknown") nextSteps.push("Consulta la disponibilidad de repuestos y si tu modelo sigue recibiendo las actualizaciones que necesitas.");
  if (answers.condition !== "good") nextSteps.push("Incluye las otras fallas y tus necesidades en la comparación.");
  nextSteps.push("Indica si recuperar tus datos es una prioridad para la revisión.");
  const precaution = answers.problem === "swollen"
    ? "Deja de usarlo y cargarlo. No presiones ni perfores la batería; solicita una revisión técnica."
    : answers.problem === "liquid" ? "Apágalo y no lo cargues. Evita calor y arroz; solicita una revisión por humedad." : "";
  return { outcome, title, explanation, nextSteps, precaution };
}

export function decisionUrl(input, origin = SITE_ORIGIN) {
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
    `Orientación: ${result.title}.`,
    result.explanation,
    result.precaution,
    "Orientación preliminar; el diagnóstico, precio y viabilidad se confirman al revisar el equipo."
  ].filter(Boolean).join("\n");
}
