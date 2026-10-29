import { isValidWhatsAppPhone } from "./contact.js";
export { isValidWhatsAppPhone } from "./contact.js";

export const appointmentTimeSlots = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"];

// Quito uses UTC−5 year-round, independently of the visitor's timezone.
export function quitoDate(now = Date.now()) {
  return new Date(now - 5 * 60 * 60 * 1000).toISOString().slice(0, 10);
}

export function appointmentDateError(date, now = Date.now()) {
  if (!date) return "Selecciona una fecha.";
  const parsed = new Date(`${date}T12:00:00Z`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== date) return "Ingresa una fecha válida.";
  if (date < quitoDate(now)) return "Elige hoy o una fecha futura en horario de Quito.";
  if (parsed.getUTCDay() === 0) return "Atendemos de lunes a sábado. Elige otro día.";
  return "";
}

export function isAppointmentSlotAvailable(date, time, now = Date.now()) {
  return !appointmentDateError(date, now)
    && appointmentTimeSlots.includes(time)
    && Date.parse(`${date}T${time}:00-05:00`) > now;
}

export function validateAppointment(form, now = Date.now()) {
  const errors = {};
  if (!form.branch.trim()) errors.branch = "Selecciona una sucursal.";
  const dateError = appointmentDateError(form.date, now);
  if (dateError) errors.date = dateError;
  if (!form.time) errors.time = "Selecciona una hora.";
  else if (!dateError && !isAppointmentSlotAvailable(form.date, form.time, now)) errors.time = "Elige un horario futuro disponible en Quito.";
  if (!form.issue.trim()) errors.issue = "Selecciona la falla de tu equipo.";
  if (form.name.trim().length < 2) errors.name = "Escribe tu nombre (al menos 2 caracteres).";
  if (!isValidWhatsAppPhone(form.phone)) errors.phone = "Usa un celular de Ecuador (09XXXXXXXX) o un número internacional con + y código de país.";
  return errors;
}
