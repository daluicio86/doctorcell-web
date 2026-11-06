import React from "react";
import { ArrowUpRight, ChevronDown, MessageCircle } from "lucide-react";
import { services } from "../data/siteData.js";
import SectionHeading from "./SectionHeading.jsx";
import { whatsappUrl } from "../utils/whatsapp.js";

const featuredTitles = ["Pantallas", "Baterías", "Puerto de carga", "Equipos mojados"];
const featuredCopy = [
  "¿Vidrio roto, manchas o fallas del táctil? Revisamos tu pantalla y las opciones para tu modelo.",
  "Recupera la autonomía de tu equipo. Revisamos consumo, temperatura y estado de la batería.",
  "¿Carga intermitente o un conector que falla? Identificamos la causa antes de intervenir.",
  "Evaluamos los daños por humedad y te explicamos las alternativas para tu equipo."
];

function ServiceCard({ service, index, featured = false }) {
  const { icon: Icon, title, text, guideHref } = service;
  return (
    <article className={featured && index === 0 ? "service-featured" : undefined}>
      <div className="service-card-heading">
        <span className="icon"><Icon size={23} aria-hidden="true" /></span>
        <h3>{featured ? featuredTitles[index] : title}</h3>
      </div>
      <p>{featured ? featuredCopy[index] : text}</p>
      <div className="service-card-actions">
        <a href={whatsappUrl(`Hola DoctorCell Quito, quiero cotizar: ${title}. Mi modelo es: `)} target="_blank" rel="noopener noreferrer" data-analytics-placement={`service_${title}`} aria-label={`Cotizar: ${title}`}>
          <MessageCircle size={18} aria-hidden="true" /> Cotizar
        </a>
        <a className="service-guide-link" href={guideHref} aria-label={`Ver guía: ${title}`}>Ver guía <ArrowUpRight size={17} aria-hidden="true" /></a>
      </div>
    </article>
  );
}

export default function Services() {
  return (
    <section className="section services" id="servicios" aria-labelledby="services-title">
      <SectionHeading eyebrow="01 / QUÉ NECESITA TU EQUIPO" title={<span id="services-title">Una solución para cada falla.</span>}>
        Elige lo que le ocurre a tu equipo. Confirmamos precio, tiempo y repuesto después del diagnóstico.
      </SectionHeading>
      <div className="service-grid featured-services">
        {services.slice(0, 4).map((service, index) => <ServiceCard key={service.title} service={service} index={index} featured />)}
      </div>
      <details className="more-services">
        <summary><span>Ver todos los servicios <small>Software, tablets, relojes y más</small></span><ChevronDown size={22} aria-hidden="true" /></summary>
        <div className="service-grid additional-services">
          {services.slice(4).map((service, index) => <ServiceCard key={service.title} service={service} index={index + 4} />)}
        </div>
      </details>
    </section>
  );
}
