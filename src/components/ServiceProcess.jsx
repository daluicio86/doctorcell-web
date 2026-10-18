import React from "react";
import { Check, ClipboardCheck, Microscope, TestTube2 } from "lucide-react";

const trustSteps = [
  { icon: Microscope, title: "Diagnóstico claro", text: "Te explicamos la falla encontrada y las alternativas disponibles." },
  { icon: ClipboardCheck, title: "Autorización previa", text: "Conoces precio, alcance y tiempo antes de intervenir el equipo." },
  { icon: TestTube2, title: "Pruebas finales", text: "Revisamos las funciones relacionadas antes de entregarlo." },
];

export default function ServiceProcess() {
  return (
    <section className="service-process" id="proceso">
      <div className="service-process-content">
        <p className="eyebrow">Por qué confiar en DoctorCell</p>
        <h2>Una reparación entendible de principio a fin.</h2>
        <p>No prometemos antes de revisar. Primero orientamos, luego confirmamos la falla y solo trabajamos con tu autorización.</p>
        <a className="service-process-link" href="/#cotizador"><Check size={18} /> Empezar orientación preliminar</a>
      </div>
      <div className="service-process-card trust-process">
        {trustSteps.map(({ icon: Icon, title, text }) => <article key={title}><Icon size={25} /><div><strong>{title}</strong><p>{text}</p></div></article>)}
      </div>
    </section>
  );
}
