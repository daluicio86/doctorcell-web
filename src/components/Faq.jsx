import React from "react";
import { ChevronDown } from "lucide-react";
import SectionHeading from "./SectionHeading.jsx";
import { faqItems } from '../data/conversionContent.js';

export default function Faq({ standalone = false }) {
  return (
    <section className="section faq" id="preguntas">
      {standalone && <h1>Preguntas frecuentes</h1>}
      <SectionHeading eyebrow="Antes de visitarnos" title="Respuestas rápidas para decidir hoy.">
        Lo esencial antes de traer tu equipo a una sucursal de DoctorCell Quito.
      </SectionHeading>
      <div className="faq-list">{faqItems.map(([question, answer], index) => <details key={question} open={index === 0}><summary>{question}<ChevronDown size={20} /></summary><p>{answer}</p></details>)}</div>
    </section>
  );
}
