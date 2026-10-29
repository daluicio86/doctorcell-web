// Dates use Ecuador's UTC−5. The draw time has not been announced.
export const raffleClosingTime = Date.parse("2026-11-01T00:00:00-05:00");
export const raffleDrawDay = Date.parse("2026-11-07T00:00:00-05:00");
export const raffleOpenEvent = "doctorcell:open-raffle";
export const raffleSessionKey = "doctorcell-raffle-seen-2026-10";

export function claimRaffleAutoOpen(storage, now) {
  if (!isRaffleActive(now)) return false;
  try {
    if (storage.getItem(raffleSessionKey)) return false;
    storage.setItem(raffleSessionKey, "1");
    return true;
  } catch {
    // Without session storage, keep the promotion available through its button.
    return false;
  }
}

export function isRaffleActive(now) {
  return Number.isFinite(now) && now < raffleClosingTime;
}

export function raffleStatus(now) {
  if (now >= raffleDrawDay) return "La participación cerró. Consulta el resultado en los canales oficiales.";
  if (now >= raffleClosingTime) return "Participación cerrada · Sorteo: 7 de noviembre de 2026";
  const days = Math.ceil((raffleClosingTime - now) / 86400000);
  return `${days} ${days === 1 ? "día" : "días"} para el cierre de participación`;
}
