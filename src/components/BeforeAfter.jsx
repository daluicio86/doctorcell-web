import React from "react";
<<<<<<< HEAD
import { ArrowRight, CheckCircle2, MessageCircle, ShieldCheck } from "lucide-react";
import { whatsappUrl } from "../utils/whatsapp.js";
import SectionHeading from "./SectionHeading.jsx";

const comparisons = [
  { label: "ANTES", title: "Pantalla rota", text: "Golpe, líneas y touch sin respuesta", className: "cracked-screen" },
  { label: "REPARACIÓN", title: "Trabajo técnico", text: "Cambio, limpieza y pruebas", className: "clean-screen" },
  { label: "DESPUÉS", title: "Equipo listo", text: "Funcionamiento verificado", className: "test-screen" }
=======
import { ArrowRight, CheckCircle2, Clock3, ShieldCheck } from "lucide-react";
import SectionHeading from "./SectionHeading.jsx";

const comparisons = [
  { label: "1 · FALLA", title: "Hallazgo documentado", text: "Registramos el estado de ingreso y explicamos qué encontramos.", image: "/images/repair-diagnosis.webp", alt: "Ilustración del diagnóstico de un dispositivo con la pantalla rota" },
  { label: "2 · SOLUCIÓN", title: "Trabajo autorizado", text: "No intervenimos hasta que apruebes solución, precio y tiempo.", image: "/images/repair-service.webp", alt: "Ilustración de una reparación técnica de pantalla" },
  { label: "3 · ENTREGA", title: "Pruebas y garantía", text: "Validamos las funciones reparadas y dejamos la cobertura por escrito.", image: "/images/repair-testing.webp", alt: "Ilustración de las pruebas finales de un dispositivo reparado" }
>>>>>>> 2292f79 (Actualización del proyecto DoctorCell)
];

export default function BeforeAfter() {
  return (
    <section className="section before-after" id="casos-reales">
<<<<<<< HEAD
      <SectionHeading eyebrow="Nuestro proceso" title="Reparaciones que se notan.">
        Así recibimos el equipo, realizamos el trabajo y hacemos las pruebas antes de entregarlo.
=======
      <SectionHeading eyebrow="Reparaciones documentadas" title="Sabes qué falló, qué hicimos y qué cubre la garantía.">
        Cada caso real publicado incluirá autorización del cliente, evidencia antes y después, solución, tiempo y garantía. No usamos imágenes de banco para simular reparaciones.
>>>>>>> 2292f79 (Actualización del proyecto DoctorCell)
      </SectionHeading>
      <div className="comparison-grid">
        {comparisons.map((item, index) => (
          <React.Fragment key={item.label}>
            <article>
              <span>{item.label}</span>
<<<<<<< HEAD
              <div className={item.className} />
=======
              <figure className="repair-evidence">
                <img src={item.image} alt={item.alt} width="900" height="560" loading="lazy" />
                <figcaption>Imagen ilustrativa</figcaption>
              </figure>
>>>>>>> 2292f79 (Actualización del proyecto DoctorCell)
              <strong>{item.title}</strong>
              <p>{item.text}</p>
              {index === 2 && <small><CheckCircle2 size={15} /> Entregado con garantía</small>}
            </article>
            {index < comparisons.length - 1 && <ArrowRight className="case-arrow" aria-hidden="true" />}
          </React.Fragment>
        ))}
      </div>
<<<<<<< HEAD
      <div className="case-cta">
        <span><ShieldCheck size={23} /> ¿Tu equipo tiene un problema parecido?</span>
        <a href={whatsappUrl("Hola DoctorCell Quito, vi sus casos reales y quiero cotizar mi reparación.")} target="_blank" rel="noopener noreferrer">
          <MessageCircle size={18} /> Cotizar mi reparación
        </a>
=======
      <div className="case-cta case-evidence-note">
        <span><ShieldCheck size={23} /> Autorización previa y garantía por escrito</span>
        <span><Clock3 size={18} /> Tiempo informado según cada caso</span>
>>>>>>> 2292f79 (Actualización del proyecto DoctorCell)
      </div>
    </section>
  );
}
