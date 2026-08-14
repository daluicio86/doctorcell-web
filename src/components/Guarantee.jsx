import React from "react";
<<<<<<< HEAD
import { Check, MessageCircle, ShieldCheck } from "lucide-react";
import { whatsappUrl } from "../utils/whatsapp.js";

const visibleTerms = [
  "Cubre fallas del repuesto instalado o del trabajo realizado, durante el plazo indicado en tu orden.",
  "Para solicitarla, presenta la orden de servicio y entrega el equipo para revisión técnica.",
  "No cubre golpes, humedad, manipulación de terceros, daños nuevos ni uso inadecuado.",
  "Si aplica, corregiremos la reparación sin costo; la garantía no amplía su plazo original."
=======
import { Check, ClipboardCheck, Microscope, ShieldCheck, TestTube2 } from "lucide-react";

const trustSteps = [
  { icon: Microscope, title: "Diagnóstico claro", text: "Te explicamos la falla encontrada y las alternativas disponibles." },
  { icon: ClipboardCheck, title: "Autorización previa", text: "Conoces precio, alcance y tiempo antes de intervenir el equipo." },
  { icon: TestTube2, title: "Pruebas finales", text: "Revisamos las funciones relacionadas antes de entregarlo." },
  { icon: ShieldCheck, title: "Garantía por escrito", text: "La cobertura y sus condiciones quedan registradas en tu orden." }
>>>>>>> 2292f79 (Actualización del proyecto DoctorCell)
];

export default function Guarantee() {
  return (
    <section className="guarantee" id="garantia">
      <div className="guarantee-content">
<<<<<<< HEAD
        <p className="eyebrow">Garantía DoctorCell Quito</p>
        <h2>Condiciones claras, antes de autorizar.</h2>
        <p>
          Antes de reparar recibirás el diagnóstico, el precio, el tiempo estimado y el plazo de garantía.
          La cobertura depende del servicio y del repuesto elegido y queda registrada en tu orden.
        </p>
        <a className="guarantee-link" href={whatsappUrl("Hola DoctorCell Quito, quiero conocer la garantía para mi reparación.")} target="_blank" rel="noopener noreferrer">
          <MessageCircle size={18} /> Consultar la garantía de mi equipo
        </a>
      </div>
      <div className="guarantee-card">
        <div className="guarantee-seal"><ShieldCheck size={34} /></div>
        <div>
          <span>Condiciones generales de garantía</span>
          {visibleTerms.map((term) => <p key={term}><Check size={17} /> {term}</p>)}
        </div>
=======
        <p className="eyebrow">Por qué confiar en DoctorCell</p>
        <h2>Una reparación entendible de principio a fin.</h2>
        <p>No prometemos antes de revisar. Primero orientamos, luego confirmamos la falla y solo trabajamos con tu autorización.</p>
        <a className="guarantee-link" href="/#cotizador"><Check size={18} /> Empezar orientación preliminar</a>
      </div>
      <div className="guarantee-card trust-process">
        {trustSteps.map(({ icon: Icon, title, text }) => <article key={title}><Icon size={25} /><div><strong>{title}</strong><p>{text}</p></div></article>)}
>>>>>>> 2292f79 (Actualización del proyecto DoctorCell)
      </div>
    </section>
  );
}
