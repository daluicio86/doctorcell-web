import React, { useState } from "react";
<<<<<<< HEAD
import { CheckCircle2, ClipboardCheck, MessageCircle, Search, Wrench } from "lucide-react";
import { whatsappUrl } from "../utils/whatsapp.js";

export default function RepairTracking() {
  const [orderNumber, setOrderNumber] = useState("");
  const cleanOrder = orderNumber.trim();

=======
import { CheckCircle2, ClipboardCheck, LoaderCircle, Search, Wrench } from "lucide-react";

export default function RepairTracking() {
  const [orderNumber, setOrderNumber] = useState("");
  const [status, setStatus] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const cleanOrder = orderNumber.trim();

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

>>>>>>> 2292f79 (Actualización del proyecto DoctorCell)
  return (
    <section className="section repair-tracking" id="seguimiento">
      <div className="tracking-copy">
        <p className="eyebrow">Seguimiento de reparación</p>
        <h2>¿Ya dejaste tu equipo?</h2>
        <p>Ingresa el número de tu orden y consulta el estado directamente con el equipo de DoctorCell Quito.</p>
        <div className="tracking-steps" aria-label="Etapas de una reparación">
          <span><ClipboardCheck size={20} /><b>1</b>Recibido</span>
          <span><Search size={20} /><b>2</b>Diagnóstico</span>
          <span><Wrench size={20} /><b>3</b>Reparación</span>
          <span><CheckCircle2 size={20} /><b>4</b>Listo</span>
        </div>
      </div>
<<<<<<< HEAD
      <div className="tracking-card">
=======
      <form className="tracking-card" onSubmit={consultOrder}>
>>>>>>> 2292f79 (Actualización del proyecto DoctorCell)
        <label htmlFor="order-number">Número de orden</label>
        <input
          id="order-number"
          value={orderNumber}
          onChange={(event) => setOrderNumber(event.target.value)}
          placeholder="Ej. DC-10428"
          autoComplete="off"
        />
<<<<<<< HEAD
        <a
          className={`button tracking-submit ${cleanOrder ? "" : "is-disabled"}`}
          href={cleanOrder ? whatsappUrl(`Hola DoctorCell Quito, quiero consultar el estado de mi reparación. Número de orden: ${cleanOrder}.`) : undefined}
          target={cleanOrder ? "_blank" : undefined}
          rel="noopener noreferrer"
          aria-disabled={!cleanOrder}
          onClick={(event) => { if (!cleanOrder) event.preventDefault(); }}
        >
          <MessageCircle size={19} /> Consultar estado
        </a>
        <small>La confirmación la realiza un asesor por WhatsApp. No mostramos estados automáticos sin verificar.</small>
      </div>
=======
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
      </form>
>>>>>>> 2292f79 (Actualización del proyecto DoctorCell)
    </section>
  );
}
