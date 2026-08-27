import React from "react";
import { ArrowRight, Clock3, ShieldCheck, Stethoscope } from "lucide-react";
import { services } from "../data/siteData.js";
import SectionHeading from "./SectionHeading.jsx";

export default function Services() {
  return (
    <section className="section services" id="servicios">
      <SectionHeading eyebrow="Servicios especializados en las mejores manos" title="Reparamos todas las marcas.">
        Revisamos cada equipo y confirmamos la solución según el modelo, el diagnóstico y el repuesto disponible.
      </SectionHeading>
      <div className="service-grid">
        {services.map(({ icon: Icon, title, text, time, guideHref, guideLabel }) => (
          <article key={title}>
            <span className="icon"><Icon size={22} /></span>
            <h3>{title}</h3>
            <p>{text}</p>
            <ul className="service-facts">
              <li><Clock3 size={16} /> {time}</li>
              <li><ShieldCheck size={16} /> Garantía por escrito según reparación</li>
            </ul>
            <div className="service-footer">
              <a href="#cotizador">
                <Stethoscope size={16} /> Diagnosticar
              </a>
            </div>
            <a className="service-guide-link" href={guideHref}>{guideLabel} <ArrowRight size={15} /></a>
          </article>
        ))}
      </div>
    </section>
  );
}
