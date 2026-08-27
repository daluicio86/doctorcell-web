import React from "react";
import { ArrowRight, CheckCircle2, Clock3, ShieldCheck } from "lucide-react";
import SectionHeading from "./SectionHeading.jsx";

const comparisons = [
  { label: "1 · FALLA", title: "Hallazgo documentado", text: "Registramos el estado de ingreso y explicamos qué encontramos.", image: "/images/repair-diagnosis.webp", alt: "Ilustración del diagnóstico de un dispositivo con la pantalla rota" },
  { label: "2 · SOLUCIÓN", title: "Trabajo autorizado", text: "No intervenimos hasta que apruebes solución, precio y tiempo.", image: "/images/repair-service.webp", alt: "Ilustración de una reparación técnica de pantalla" },
  { label: "3 · ENTREGA", title: "Pruebas y garantía", text: "Validamos las funciones reparadas y dejamos la cobertura por escrito.", image: "/images/repair-testing.webp", alt: "Ilustración de las pruebas finales de un dispositivo reparado" }
];

export default function BeforeAfter() {
  return (
    <section className="section before-after" id="casos-reales">
      <SectionHeading eyebrow="Reparaciones documentadas" title="Sabes qué falló, qué hicimos y qué cubre la garantía.">
        Cada caso real publicado incluirá autorización del cliente, evidencia antes y después, solución, tiempo y garantía. No usamos imágenes de banco para simular reparaciones.
      </SectionHeading>
      <div className="comparison-grid">
        {comparisons.map((item, index) => (
          <React.Fragment key={item.label}>
            <article>
              <span>{item.label}</span>
              <figure className="repair-evidence">
                <img src={item.image} alt={item.alt} width="900" height="560" loading="lazy" />
                <figcaption>Imagen ilustrativa</figcaption>
              </figure>
              <strong>{item.title}</strong>
              <p>{item.text}</p>
              {index === 2 && <small><CheckCircle2 size={15} /> Entregado con garantía</small>}
            </article>
            {index < comparisons.length - 1 && <ArrowRight className="case-arrow" aria-hidden="true" />}
          </React.Fragment>
        ))}
      </div>
      <div className="case-cta case-evidence-note">
        <span><ShieldCheck size={23} /> Autorización previa y garantía por escrito</span>
        <span><Clock3 size={18} /> Tiempo informado según cada caso</span>
      </div>
    </section>
  );
}
