import React from "react";
import { ArrowRight, CheckCircle2, MessageCircle, ShieldCheck } from "lucide-react";
import { whatsappUrl } from "../utils/whatsapp.js";
import SectionHeading from "./SectionHeading.jsx";

const comparisons = [
  { label: "ANTES", title: "Pantalla rota", text: "Golpe, líneas y touch sin respuesta", className: "cracked-screen" },
  { label: "REPARACIÓN", title: "Trabajo técnico", text: "Cambio, limpieza y pruebas", className: "clean-screen" },
  { label: "DESPUÉS", title: "Equipo listo", text: "Funcionamiento verificado", className: "test-screen" }
];

export default function BeforeAfter() {
  return (
    <section className="section before-after" id="casos-reales">
      <SectionHeading eyebrow="Nuestro proceso" title="Reparaciones que se notan.">
        Así recibimos el equipo, realizamos el trabajo y hacemos las pruebas antes de entregarlo.
      </SectionHeading>
      <div className="comparison-grid">
        {comparisons.map((item, index) => (
          <React.Fragment key={item.label}>
            <article>
              <span>{item.label}</span>
              <div className={item.className} />
              <strong>{item.title}</strong>
              <p>{item.text}</p>
              {index === 2 && <small><CheckCircle2 size={15} /> Entregado con garantía</small>}
            </article>
            {index < comparisons.length - 1 && <ArrowRight className="case-arrow" aria-hidden="true" />}
          </React.Fragment>
        ))}
      </div>
      <div className="case-cta">
        <span><ShieldCheck size={23} /> ¿Tu equipo tiene un problema parecido?</span>
        <a href={whatsappUrl("Hola DoctorCell Quito, vi sus casos reales y quiero cotizar mi reparación.")} target="_blank" rel="noopener noreferrer">
          <MessageCircle size={18} /> Cotizar mi reparación
        </a>
      </div>
    </section>
  );
}
