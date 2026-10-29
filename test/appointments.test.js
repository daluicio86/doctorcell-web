import assert from "node:assert/strict";
import test from "node:test";
import { appointmentDateError, isAppointmentSlotAvailable, isValidWhatsAppPhone, quitoDate, validateAppointment } from "../src/utils/appointments.js";

const now = Date.parse("2026-10-29T10:30:00-05:00");
const validForm = { branch: "Sucursal Prensa", date: "2026-10-29", time: "12:00", name: "Ana Pérez", phone: "0991234567", issue: "Pantalla rota" };

test("booking dates follow Quito across the UTC midnight boundary", () => {
  const evening = Date.parse("2026-10-30T02:00:00Z");
  assert.equal(quitoDate(evening), "2026-10-29");
  assert.equal(quitoDate(Date.parse("2026-10-30T05:00:00Z")), "2026-10-30");
  assert.equal(appointmentDateError("2026-10-29", evening), "");
});

test("booking rejects missing, impossible, past and Sunday dates", () => {
  for (const date of ["", "2026-02-30", "2026-10-28", "2026-11-01", "2026-13-01", "not-a-date"]) {
    assert.ok(appointmentDateError(date, now), date);
  }
  assert.equal(appointmentDateError("2026-10-31", now), "");
});

test("booking offers only supported future slots on open days", () => {
  assert.equal(isAppointmentSlotAvailable("2026-10-29", "09:00", now), false);
  assert.equal(isAppointmentSlotAvailable("2026-10-29", "10:30", now), false);
  assert.equal(isAppointmentSlotAvailable("2026-10-29", "12:00", now), true);
  assert.equal(isAppointmentSlotAvailable("2026-10-30", "09:00", now), true);
  assert.equal(isAppointmentSlotAvailable("2026-11-01", "09:00", now), false);
  assert.equal(isAppointmentSlotAvailable("2026-10-30", "20:00", now), false);
});

test("WhatsApp accepts Ecuador mobile formats and explicit international numbers", () => {
  for (const phone of ["0991234567", "09 9123 4567", "593991234567", "+593 (99) 123-4567", "+57 300 123 4567"]) {
    assert.equal(isValidWhatsAppPhone(phone), true, phone);
  }
  for (const phone of ["", "abc", "abc0991234567", "123", "099123456", "+59399123", "+5930991234567", "593291234567", "++573001234567", "+0123456789"]) {
    assert.equal(isValidWhatsAppPhone(phone), false, phone);
  }
});

test("booking errors identify incomplete fields and expire a previously valid request", () => {
  assert.deepEqual(validateAppointment(validForm, now), {});
  assert.deepEqual(Object.keys(validateAppointment({ branch: "", date: "", time: "", name: " ", phone: "abc", issue: "" }, now)), ["branch", "date", "time", "issue", "name", "phone"]);
  assert.ok(validateAppointment(validForm, Date.parse("2026-10-29T12:00:00-05:00")).time);
  assert.ok(validateAppointment({ ...validForm, date: "2026-11-01" }, now).date);
});
