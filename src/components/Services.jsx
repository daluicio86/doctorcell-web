import React from "react";
import { ArrowUpRight, ChevronDown, MessageCircle } from "lucide-react";
import { services } from "../data/siteData.js";
import SectionHeading from "./SectionHeading.jsx";
import { whatsappUrl } from "../utils/whatsapp.js";
import { servicePages } from '../data/conversionContent.js';

const featuredTitles = ["Pantallas", "Baterías", "Puerto de carga", "Equipos mojados"];
const featuredCopy = [
  "Que una caída no decida el próximo equipo que compras. Revisamos tu pantalla y las opciones de repuesto para tu modelo.",
  "¿Buscando un enchufe a mitad del día? Revisamos la batería, el consumo y la temperatura antes de recomendar un cambio.",
  "¿Tienes que mover el cable para cargar? Identificamos si la falla está en el puerto, la batería u otro componente.",
  "¿Terminó en el agua? Evita cargarlo y solicita una revisión. Evaluamos el daño y te explicamos si es viable repararlo."
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
      <SectionHeading eyebrow="QUÉ LE PASA A TU CELULAR" title={<span id="services-title">Menos fallas. Más planes.</span>}>
        Empieza por lo que notas. Te explicamos las opciones, el repuesto y el tiempo estimado antes de que decidas.
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
      <nav className="content-links" aria-label="Servicios por equipo en Quito">{servicePages.map((service) => <a key={service.slug} href={`/servicios/${service.slug}/`}>{service.heading}</a>)}</nav>
    </section>
  );
}
