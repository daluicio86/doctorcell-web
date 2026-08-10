import React from "react";
import { ArrowRight, Clock3, MessageCircle, ShieldCheck } from "lucide-react";
import { services } from "../data/siteData.js";
import { whatsappUrl } from "../utils/whatsapp.js";
import SectionHeading from "./SectionHeading.jsx";

export default function Services() {
  return (
    <section className="section services" id="servicios">
      <SectionHeading eyebrow="Servicios especializados" title="Reparamos todas las marcas.">
        Servicios seleccionados desde $15, pantalla desde $35 y batería desde $20.
        El valor final depende del modelo, el diagnóstico y el repuesto disponible.
      </SectionHeading>
      <div className="service-grid">
        {services.map(({ icon: Icon, title, text, time, price, problem, guideHref, guideLabel }) => (
          <article key={title}>
            <span className="icon"><Icon size={22} /></span>
            <h3>{title}</h3>
            <p>{text}</p>
            <ul className="service-facts">
              <li><Clock3 size={16} /> {time}</li>
              <li><ShieldCheck size={16} /> Garantía por escrito según reparación</li>
            </ul>
            <div className="service-footer">
              <strong>{price}</strong>
              <a href={whatsappUrl(`Hola DoctorCell Quito, quiero cotizar el servicio de ${title}. Problema: ${problem}. Mi equipo es:`)} target="_blank" rel="noopener noreferrer">
                <MessageCircle size={16} /> Cotizar
              </a>
            </div>
            <a className="service-guide-link" href={guideHref}>{guideLabel} <ArrowRight size={15} /></a>
          </article>
        ))}
      </div>
      <p className="price-disclaimer">Precio referencial; varía según modelo, diagnóstico y repuesto. Confirmamos el valor final antes de iniciar el trabajo.</p>
    </section>
  );
}
