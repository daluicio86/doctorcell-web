import React, { useEffect, useMemo, useState } from "react";
import { CalendarDays, CheckCircle2, Clock3, MessageCircle } from "lucide-react";
import { branches, diagnostics } from "../data/siteData.js";
import { whatsappUrl } from "../utils/whatsapp.js";
import SectionHeading from "./SectionHeading.jsx";
import { appointmentTimeSlots, isAppointmentSlotAvailable, quitoDate, validateAppointment } from "../utils/appointments.js";

export default function AppointmentBooking() {
  const [form, setForm] = useState({ branch: "", date: "", time: "", name: "", phone: "", issue: "" });
  const [now, setNow] = useState(Date.now);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 30000);
    return () => window.clearInterval(timer);
  }, []);
  const today = quitoDate(now);
  const errors = validateAppointment(form, now);
  const fieldError = (key) => (submitted || touched[key]) ? errors[key] : "";
  const fieldProps = (key) => ({
    name: key,
    required: true,
    "aria-invalid": Boolean(fieldError(key)),
    "aria-describedby": fieldError(key) ? `booking-${key}-error` : undefined,
    onBlur: () => setTouched((current) => ({ ...current, [key]: true }))
  });
  const errorMessage = (key) => fieldError(key) ? <small className="booking-field-error" id={`booking-${key}-error`}>{fieldError(key)}</small> : null;
  const message = useMemo(() => [
    "Hola DoctorCell Quito, quiero solicitar una cita.",
    `Sucursal: ${form.branch}.`, `Fecha: ${form.date}.`, `Hora: ${form.time}.`,
    `Cliente: ${form.name.trim()}.`, `Teléfono: ${form.phone.trim()}.`, `Falla: ${form.issue}.`,
    "Por favor confirmen la disponibilidad."
  ].join(" "), [form]);
  const update = (key) => (event) => {
    const value = event.target.value;
    setForm((current) => ({ ...current, [key]: value, ...(key === "date" ? { time: "" } : {}) }));
  };
  const submit = (event) => {
    event.preventDefault();
    const currentTime = Date.now();
    setNow(currentTime);
    setSubmitted(true);
    const currentErrors = validateAppointment(form, currentTime);
    if (Object.keys(currentErrors).length) {
      event.currentTarget.elements.namedItem(Object.keys(currentErrors)[0])?.focus();
      return;
    }
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
  };

  return (
    <section className="section booking" id="agendar">
      <div className="booking-copy">
        <SectionHeading eyebrow="Solicitud de cita" title="Elige cuándo prefieres visitarnos.">
          Indica una fecha y una hora preferidas. La sucursal confirmará el horario real disponible antes de reservarlo.
        </SectionHeading>
        <div className="booking-benefits">
          <span><CalendarDays size={20} /><b>Elige tu sucursal</b><small>Cuatro puntos en Quito</small></span>
          <span><Clock3 size={20} /><b>Horario preferido</b><small>Sujeto a confirmación</small></span>
          <span><CheckCircle2 size={20} /><b>Confirmación humana</b><small>Recíbela por WhatsApp</small></span>
        </div>
      </div>
      <form className="booking-form" noValidate onSubmit={submit}>
        <label><span>Sucursal</span><select {...fieldProps("branch")} value={form.branch} onChange={update("branch")}><option value="">Selecciona</option>{branches.map(({ name }) => <option key={name}>{name}</option>)}</select>{errorMessage("branch")}</label>
        <label><span>Fecha (Quito)</span><input {...fieldProps("date")} type="date" min={today} value={form.date} onInput={update("date")} onChange={update("date")} />{errorMessage("date")}</label>
        <label><span>Hora (Quito)</span><select {...fieldProps("time")} value={form.time} onChange={update("time")}><option value="">Selecciona</option>{appointmentTimeSlots.map((time) => <option key={time} disabled={!isAppointmentSlotAvailable(form.date, time, now)}>{time}</option>)}</select>{errorMessage("time")}</label>
        <label><span>Falla</span><select {...fieldProps("issue")} value={form.issue} onChange={update("issue")}><option value="">Selecciona</option>{diagnostics.map(({ title }) => <option key={title}>{title}</option>)}</select>{errorMessage("issue")}</label>
        <label><span>Nombre</span><input {...fieldProps("name")} autoComplete="name" minLength={2} maxLength={100} value={form.name} onChange={update("name")} placeholder="Tu nombre" />{errorMessage("name")}</label>
        <label><span>WhatsApp</span><input {...fieldProps("phone")} type="tel" autoComplete="tel" maxLength={30} value={form.phone} onChange={update("phone")} placeholder="09 9999 9999" />{errorMessage("phone")}</label>
        {submitted && Object.keys(errors).length > 0 && <p className="booking-error-summary" role="alert">Revisa los campos indicados antes de solicitar tu cita.</p>}
        <button className="button booking-submit" type="submit">
          <MessageCircle size={19} /> Solicitar cita
        </button>
        <small>Atendemos de lunes a sábado. Todas las horas corresponden a Quito. La sucursal confirma la disponibilidad por WhatsApp.</small>
      </form>
    </section>
  );
}
