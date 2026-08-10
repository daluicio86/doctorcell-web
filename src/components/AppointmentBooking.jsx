import React, { useMemo, useState } from "react";
import { CalendarDays, CheckCircle2, Clock3, MessageCircle } from "lucide-react";
import { branches, diagnostics } from "../data/siteData.js";
import { whatsappUrl } from "../utils/whatsapp.js";
import SectionHeading from "./SectionHeading.jsx";

const timeSlots = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"];

export default function AppointmentBooking() {
  const [form, setForm] = useState({ branch: "", date: "", time: "", name: "", phone: "", issue: "" });
  const today = new Date().toISOString().slice(0, 10);
  const ready = Object.values(form).every((value) => value.trim());
  const message = useMemo(() => [
    "Hola DoctorCell Quito, quiero agendar una cita.",
    `Sucursal: ${form.branch}.`, `Fecha: ${form.date}.`, `Hora: ${form.time}.`,
    `Cliente: ${form.name}.`, `Teléfono: ${form.phone}.`, `Falla: ${form.issue}.`,
    "Por favor confirmen la disponibilidad."
  ].join(" "), [form]);
  const update = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }));

  return (
    <section className="section booking" id="agendar">
      <div className="booking-copy">
        <SectionHeading eyebrow="Agenda en minutos" title="Reserva una revisión en tu sucursal.">
          Escoge fecha y horario. La cita queda lista para confirmar por WhatsApp con el equipo de la sucursal.
        </SectionHeading>
        <div className="booking-benefits">
          <span><CalendarDays size={20} /><b>Elige tu sucursal</b><small>Cuatro puntos en Quito</small></span>
          <span><Clock3 size={20} /><b>Evita esperas</b><small>Selecciona un horario</small></span>
          <span><CheckCircle2 size={20} /><b>Confirmación humana</b><small>Recíbela por WhatsApp</small></span>
        </div>
      </div>
      <form className="booking-form" onSubmit={(event) => event.preventDefault()}>
        <label><span>Sucursal</span><select value={form.branch} onChange={update("branch")}><option value="">Selecciona</option>{branches.map(({ name }) => <option key={name}>{name}</option>)}</select></label>
        <label><span>Fecha</span><input type="date" min={today} value={form.date} onChange={update("date")} /></label>
        <label><span>Hora</span><select value={form.time} onChange={update("time")}><option value="">Selecciona</option>{timeSlots.map((time) => <option key={time}>{time}</option>)}</select></label>
        <label><span>Falla</span><select value={form.issue} onChange={update("issue")}><option value="">Selecciona</option>{diagnostics.map(({ title }) => <option key={title}>{title}</option>)}</select></label>
        <label><span>Nombre</span><input value={form.name} onChange={update("name")} placeholder="Tu nombre" /></label>
        <label><span>WhatsApp</span><input type="tel" value={form.phone} onChange={update("phone")} placeholder="09 9999 9999" /></label>
        <a className={`button booking-submit ${ready ? "" : "is-disabled"}`} href={ready ? whatsappUrl(message) : undefined} target={ready ? "_blank" : undefined} rel="noopener noreferrer" aria-disabled={!ready} onClick={(event) => !ready && event.preventDefault()}>
          <MessageCircle size={19} /> Solicitar cita
        </a>
        <small>La hora se confirma según disponibilidad de la sucursal.</small>
      </form>
    </section>
  );
}
