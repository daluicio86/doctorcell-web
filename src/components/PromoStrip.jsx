import React from "react";
import { ArrowRight, CheckCircle2, Gift, ReceiptText, Sparkles } from "lucide-react";
import { whatsappUrl } from "../utils/whatsapp.js";

const activationMessage = "Hola DoctorCell Quito. Hice una compra y quiero conocer cómo activar Zentra Free para facturar en mi pequeño negocio.";

export default function PromoStrip({ variant = "home" }) {
  return (
    <section
      className={`zentra-free-offer ${variant === "store" ? "zentra-free-store" : ""}`}
      aria-labelledby={`zentra-free-title-${variant}`}
    >
      <div className="zentra-free-glow" aria-hidden="true" />

      <div className="zentra-free-badge" aria-hidden="true">
        <span><Gift size={21} /></span>
        <strong>FREE</strong>
      </div>

      <div className="zentra-free-copy">
        <span className="zentra-free-kicker"><Sparkles size={14} /> Beneficio exclusivo por tu compra</span>
        <h2 id={`zentra-free-title-${variant}`}>
          Compra en DoctorCell y recibe <em>Zentra Free</em>
        </h2>
        <p>La solución sencilla para pequeños negocios que solo necesitan facturar.</p>
        <div className="zentra-free-benefits" aria-label="Beneficios de Zentra Free">
          <span><CheckCircle2 size={15} /> Empieza sin costo</span>
          <span><ReceiptText size={15} /> Facturación simple</span>
        </div>
      </div>

      <a
        className="zentra-free-action"
        href={whatsappUrl(activationMessage)}
        target="_blank"
        rel="noopener noreferrer"
        data-analytics-partner="zentra_free"
        data-analytics-placement={variant === "store" ? "store_offer" : "home_offer"}
      >
        <span>Activar mi beneficio<small>Consulta cómo obtenerlo</small></span>
        <ArrowRight size={19} />
      </a>
    </section>
  );
}
