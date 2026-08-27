import React, { useEffect, useState } from "react";
import { CheckCircle2, ClipboardCheck, LoaderCircle, MessageCircle, Phone, Search, Wrench } from "lucide-react";
import { contactInfo } from "../data/siteData";
import { whatsappUrl } from "../utils/whatsapp";

export default function RepairTracking() {
  const [orderNumber, setOrderNumber] = useState("");
  const [status, setStatus] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [availability, setAvailability] = useState("checking");
  const cleanOrder = orderNumber.trim();

  useEffect(() => {
    let active = true;
    fetch("/api/repair-status/availability")
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((payload) => active && setAvailability(payload.available ? "available" : "unavailable"))
      .catch(() => active && setAvailability("unavailable"));
    return () => { active = false; };
  }, []);

  async function consultOrder(event) {
    event.preventDefault();
    if (!cleanOrder || loading) return;
    setLoading(true);
    setError("");
    setStatus(null);
    try {
      const response = await fetch(`/api/repair-status?order=${encodeURIComponent(cleanOrder)}`);
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "No pudimos consultar la orden.");
      setStatus(payload);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="section repair-tracking" id="seguimiento">
      <div className="tracking-copy">
        <p className="eyebrow">Seguimiento de reparación</p>
        <h2>¿Ya dejaste tu equipo?</h2>
        <p>Ten a mano el número de tu orden para revisar el avance de tu reparación con DoctorCell Quito.</p>
        <div className="tracking-steps" aria-label="Etapas de una reparación">
          <span><ClipboardCheck size={20} /><b>1</b>Recibido</span>
          <span><Search size={20} /><b>2</b>Diagnóstico</span>
          <span><Wrench size={20} /><b>3</b>Reparación</span>
          <span><CheckCircle2 size={20} /><b>4</b>Listo</span>
        </div>
      </div>
      {availability === "available" && <form className="tracking-card" onSubmit={consultOrder}>
        <label htmlFor="order-number">Número de orden</label>
        <input
          id="order-number"
          value={orderNumber}
          onChange={(event) => setOrderNumber(event.target.value)}
          placeholder="Ej. DC-10428"
          autoComplete="off"
        />
        <button
          className={`button tracking-submit ${cleanOrder ? "" : "is-disabled"}`}
          type="submit"
          disabled={!cleanOrder || loading}
        >
          {loading ? <LoaderCircle className="spin" size={19} /> : <Search size={19} />} {loading ? "Consultando…" : "Consultar estado"}
        </button>
        {status && <div className="tracking-result" role="status"><strong>{status.status || "Orden encontrada"}</strong><span>{status.message || `Orden ${cleanOrder}`}</span>{status.updatedAt && <small>Actualizado: {status.updatedAt}</small>}</div>}
        {error && <p className="tracking-error" role="alert">{error}</p>}
        <small>La consulta se realiza automáticamente con el sistema de órdenes; no abre WhatsApp.</small>
      </form>}
      {availability === "checking" && <div className="tracking-card tracking-availability" role="status">
        <LoaderCircle className="spin" size={24} />
        <strong>Preparando tu opción de seguimiento…</strong>
        <small>En un momento te indicaremos cómo consultar tu reparación.</small>
      </div>}
      {availability === "unavailable" && <div className="tracking-card tracking-fallback">
        <span className="tracking-fallback-icon"><MessageCircle size={24} /></span>
        <strong>Consulta tu reparación con nuestro equipo</strong>
        <p>Envíanos tu número de orden y te ayudaremos a confirmar el estado actual de tu equipo.</p>
        <label htmlFor="assisted-order-number">Número de orden</label>
        <input
          id="assisted-order-number"
          value={orderNumber}
          onChange={(event) => setOrderNumber(event.target.value)}
          placeholder="Ej. DC-10428"
          autoComplete="off"
        />
        <a
          className={`button tracking-submit ${cleanOrder ? "" : "is-disabled"}`}
          href={cleanOrder ? whatsappUrl(`Hola DoctorCell Quito, quiero consultar el estado de mi reparación. Mi número de orden es: ${cleanOrder}.`) : undefined}
          target={cleanOrder ? "_blank" : undefined}
          rel="noopener noreferrer"
          aria-disabled={!cleanOrder}
          onClick={(event) => { if (!cleanOrder) event.preventDefault(); }}
        >
          <MessageCircle size={19} /> Consultar por WhatsApp
        </a>
        <a className="tracking-phone" href={`tel:${contactInfo.phoneHref}`}><Phone size={17} /> Llamar al {contactInfo.phoneDisplay}</a>
        <small>Horario de atención: {contactInfo.hours}.</small>
      </div>}
    </section>
  );
}
