const SESSION_KEY = "doctorcell-lead-session";

function sessionId() {
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

async function postLead(payload) {
  const response = await fetch("/api/leads", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(12000)
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok || result.ok !== true || typeof result.caseId !== "string" || !result.caseId) throw new Error(result.error || "No pudimos confirmar el registro de tu consulta. Intenta nuevamente.");
  return result;
}

export function captureChatbotLead(answers) {
  return postLead({ ...answers, sessionId: sessionId(), consent: true });
}

export function captureQuoteLead(answers, requestId) {
  if (answers.consent !== true) return Promise.reject(new Error("Se requiere autorización para guardar la consulta."));
  return postLead({ ...answers, sessionId: requestId, source: "quote-finder-web" });
}

