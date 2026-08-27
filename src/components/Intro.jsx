import React from "react";
import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";
import { whatsappUrl } from "../utils/whatsapp.js";

export default function Intro() {
  return (
    <section className="section intro">
      <div>
        <p className="eyebrow">Repara hoy, sin complicaciones</p>
        <h2>Recupera tu celular y vuelve a lo importante.</h2>
        <div className="intro-price"><strong>Cotización personalizada</strong><span>Confirmación antes de reparar</span></div>
      </div>
      <div className="intro-offer">
        <p>Cuéntanos qué le pasa a tu equipo. Te orientamos, confirmamos disponibilidad y explicamos el valor antes de comenzar.</p>
        <ul>
          <li><CheckCircle2 size={19} /> Diagnóstico y precio claros</li>
          <li><CheckCircle2 size={19} /> Repuestos con garantía por escrito</li>
          <li><CheckCircle2 size={19} /> Cuatro sucursales en Quito</li>
        </ul>
        <a href={whatsappUrl("Hola DoctorCell Quito, quiero cotizar una reparación. Mi equipo, modelo y falla son:")} target="_blank" rel="noopener noreferrer">
          <MessageCircle size={19} /> Cotizar mi reparación <ArrowRight size={18} />
        </a>
        <small>Respuesta rápida en horario de atención.</small>
      </div>
    </section>
  );
}
