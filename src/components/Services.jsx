import React from "react";
import { ArrowRight, Clock3, ShieldCheck, Stethoscope } from "lucide-react";
import { services } from "../data/siteData.js";
import SectionHeading from "./SectionHeading.jsx";
import { whatsappUrl } from "../utils/whatsapp.js";

export default function Services() {
  return (
    <section className="section services" id="servicios">
      <SectionHeading eyebrow="01 / PRECISIÓN QUE SE NOTA" title="Un nuevo comienzo para tu equipo.">
        Revisamos cada equipo y confirmamos la solución según el modelo, el diagnóstico y el repuesto disponible.
      </SectionHeading>
      <div className="service-grid">
        {services.map(({ icon: Icon, title, text, time, guideHref, guideLabel }, index) => (
          <article key={title}>
            <span className="service-index" aria-hidden="true">0{index + 1} <ArrowRight size={17} /></span>
            <span className="icon"><Icon size={22} /></span>
            <h3>{title}</h3>
            <p>{text}</p>
            <ul className="service-facts">
              <li><Clock3 size={16} /> {time}</li>
              <li><ShieldCheck size={16} /> Garantía por escrito según reparación</li>
            </ul>
            <div className="service-footer">
              <a href={whatsappUrl(`Hola DoctorCell Quito, quiero cotizar: ${title}. Mi modelo es: `)} target="_blank" rel="noopener noreferrer" data-analytics-placement={`service_${title}`}>
                <Stethoscope size={16} /> Cotiza por WhatsApp
              </a>
            </div>
            <a className="service-guide-link" href={guideHref}>{guideLabel} <ArrowRight size={15} /></a>
          </article>
        ))}
      </div>
    </section>
  );
}
