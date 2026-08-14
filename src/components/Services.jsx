import React from "react";
<<<<<<< HEAD
import { ArrowRight, Clock3, MessageCircle, ShieldCheck } from "lucide-react";
import { services } from "../data/siteData.js";
import { whatsappUrl } from "../utils/whatsapp.js";
=======
import { ArrowRight, Clock3, ShieldCheck, Stethoscope } from "lucide-react";
import { services } from "../data/siteData.js";
>>>>>>> 2292f79 (Actualización del proyecto DoctorCell)
import SectionHeading from "./SectionHeading.jsx";

export default function Services() {
  return (
    <section className="section services" id="servicios">
<<<<<<< HEAD
      <SectionHeading eyebrow="Servicios especializados" title="Reparamos todas las marcas.">
        Servicios seleccionados desde $15, pantalla desde $35 y batería desde $20.
        El valor final depende del modelo, el diagnóstico y el repuesto disponible.
      </SectionHeading>
      <div className="service-grid">
        {services.map(({ icon: Icon, title, text, time, price, problem, guideHref, guideLabel }) => (
=======
      <SectionHeading eyebrow="Servicios especializados en las mejores manos" title="Reparamos todas las marcas.">
        Revisamos cada equipo y confirmamos la solución según el modelo, el diagnóstico y el repuesto disponible.
      </SectionHeading>
      <div className="service-grid">
        {services.map(({ icon: Icon, title, text, time, guideHref, guideLabel }) => (
>>>>>>> 2292f79 (Actualización del proyecto DoctorCell)
          <article key={title}>
            <span className="icon"><Icon size={22} /></span>
            <h3>{title}</h3>
            <p>{text}</p>
            <ul className="service-facts">
              <li><Clock3 size={16} /> {time}</li>
              <li><ShieldCheck size={16} /> Garantía por escrito según reparación</li>
            </ul>
            <div className="service-footer">
<<<<<<< HEAD
              <strong>{price}</strong>
              <a href={whatsappUrl(`Hola DoctorCell Quito, quiero cotizar el servicio de ${title}. Problema: ${problem}. Mi equipo es:`)} target="_blank" rel="noopener noreferrer">
                <MessageCircle size={16} /> Cotizar
=======
              <a href="#cotizador">
                <Stethoscope size={16} /> Diagnosticar
>>>>>>> 2292f79 (Actualización del proyecto DoctorCell)
              </a>
            </div>
            <a className="service-guide-link" href={guideHref}>{guideLabel} <ArrowRight size={15} /></a>
          </article>
        ))}
      </div>
<<<<<<< HEAD
      <p className="price-disclaimer">Precio referencial; varía según modelo, diagnóstico y repuesto. Confirmamos el valor final antes de iniciar el trabajo.</p>
=======
>>>>>>> 2292f79 (Actualización del proyecto DoctorCell)
    </section>
  );
}
