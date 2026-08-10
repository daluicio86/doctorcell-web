import React from "react";
import { Check, MessageCircle, ShieldCheck } from "lucide-react";
import { whatsappUrl } from "../utils/whatsapp.js";

const visibleTerms = [
  "Cubre fallas del repuesto instalado o del trabajo realizado, durante el plazo indicado en tu orden.",
  "Para solicitarla, presenta la orden de servicio y entrega el equipo para revisión técnica.",
  "No cubre golpes, humedad, manipulación de terceros, daños nuevos ni uso inadecuado.",
  "Si aplica, corregiremos la reparación sin costo; la garantía no amplía su plazo original."
];

export default function Guarantee() {
  return (
    <section className="guarantee" id="garantia">
      <div className="guarantee-content">
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
      </div>
    </section>
  );
}
