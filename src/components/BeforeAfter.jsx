import React from "react";
import { ArrowRight, CheckCircle2, Clock3, ShieldCheck } from "lucide-react";
import SectionHeading from "./SectionHeading.jsx";

const comparisons = [
  { label: "1 · FALLA", title: "Hallazgo documentado", text: "Registramos el estado de ingreso y explicamos qué encontramos.", image: "/images/repair-diagnosis.webp", alt: "Ilustración del diagnóstico de un dispositivo con la pantalla rota" },
  { label: "2 · SOLUCIÓN", title: "Trabajo autorizado", text: "No intervenimos hasta que apruebes solución, precio y tiempo.", image: "/images/repair-service.webp", alt: "Ilustración de una reparación técnica de pantalla" },
  { label: "3 · ENTREGA", title: "Pruebas finales", text: "Validamos las funciones reparadas antes de entregar tu equipo.", image: "/images/repair-testing.webp", alt: "Ilustración de las pruebas finales de un dispositivo reparado" }
];

export default function BeforeAfter() {
  return (
    <section className="section before-after" id="casos-reales">
      <SectionHeading eyebrow="03 / ASÍ LO HACEMOS" title="De la falla a la solución. Contigo en cada paso.">
        Un proceso claro: revisamos, te explicamos y reparamos con tu autorización. Estas ilustraciones muestran cómo cuidamos tu equipo.
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
              {index === 2 && <small><CheckCircle2 size={15} /> Funciones revisadas</small>}
            </article>
            {index < comparisons.length - 1 && <ArrowRight className="case-arrow" aria-hidden="true" />}
          </React.Fragment>
        ))}
      </div>
      <div className="case-cta case-evidence-note">
        <span><ShieldCheck size={23} /> Autorización antes de reparar</span>
        <span><Clock3 size={18} /> Tiempo informado según cada caso</span>
      </div>
    </section>
  );
}
