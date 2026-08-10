import React, { useState } from "react";
import { CheckCircle2, ClipboardCheck, MessageCircle, Search, Wrench } from "lucide-react";
import { whatsappUrl } from "../utils/whatsapp.js";

export default function RepairTracking() {
  const [orderNumber, setOrderNumber] = useState("");
  const cleanOrder = orderNumber.trim();

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
      <div className="tracking-card">
        <label htmlFor="order-number">Número de orden</label>
        <input
          id="order-number"
          value={orderNumber}
          onChange={(event) => setOrderNumber(event.target.value)}
          placeholder="Ej. DC-10428"
          autoComplete="off"
        />
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
    </section>
  );
}
