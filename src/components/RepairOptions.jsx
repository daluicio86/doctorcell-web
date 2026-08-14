import React from "react";
import { Check, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import { whatsappUrl } from "../utils/whatsapp.js";
import SectionHeading from "./SectionHeading.jsx";

const options = [
  {
    name: "Opción compatible",
    eyebrow: "Cuida tu presupuesto",
<<<<<<< HEAD
    price: "Desde $35",
    note: "Ejemplo: cambio de pantalla. El valor depende del modelo.",
=======
    note: "La compatibilidad se confirma según el modelo y la revisión.",
>>>>>>> 2292f79 (Actualización del proyecto DoctorCell)
    features: [
      "Repuesto compatible verificado",
      "Prueba de táctil, imagen y funciones",
      "Garantía por escrito según el repuesto"
    ],
    cta: "Cotizar compatible",
    message: "Hola DoctorCell Quito, quiero cotizar una reparación con repuesto compatible. ¿Qué opciones tienen para mi modelo?"
  },
  {
    name: "Opción premium",
    eyebrow: "Mejor experiencia",
<<<<<<< HEAD
    price: "Cotización por modelo",
=======
>>>>>>> 2292f79 (Actualización del proyecto DoctorCell)
    note: "Sujeta a disponibilidad del repuesto premium u original.",
    features: [
      "Mejor ajuste de brillo, color o respuesta según pieza",
      "Repuesto premium u original cuando esté disponible",
      "Cobertura y condiciones informadas antes de reparar"
    ],
    cta: "Comparar opción premium",
    message: "Hola DoctorCell Quito, quiero comparar la opción premium u original para mi reparación. ¿Cuál recomiendan para mi modelo?",
    featured: true
  }
];

export default function RepairOptions() {
  return (
    <section className="section repair-options" id="opciones-repuesto">
      <SectionHeading eyebrow="Elige con claridad" title="No todos los repuestos ofrecen la misma experiencia.">
        Compara antes de decidir. Te confirmamos compatibilidad, disponibilidad, precio final y garantía antes de intervenir tu equipo.
      </SectionHeading>

      <div className="repair-option-grid">
        {options.map((option) => (
          <article className={option.featured ? "is-featured" : ""} key={option.name}>
            {option.featured && <span className="option-badge"><Sparkles size={15} /> Recomendado</span>}
            <p className="option-eyebrow">{option.eyebrow}</p>
            <h3>{option.name}</h3>
<<<<<<< HEAD
            <strong className="option-price">{option.price}</strong>
=======
>>>>>>> 2292f79 (Actualización del proyecto DoctorCell)
            <small>{option.note}</small>
            <ul>
              {option.features.map((feature) => <li key={feature}><Check size={17} /> {feature}</li>)}
            </ul>
            <a href={whatsappUrl(option.message)} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={18} /> {option.cta}
            </a>
          </article>
        ))}
      </div>

      <div className="option-clarity-note">
        <ShieldCheck size={21} />
<<<<<<< HEAD
        <p><strong>Sin sorpresas:</strong> el precio publicado es una referencia inicial. La cotización final identifica el tipo de pieza, las pruebas incluidas y la cobertura exacta.</p>
=======
        <p><strong>Sin sorpresas:</strong> la cotización final identifica el tipo de pieza, las pruebas incluidas y la cobertura exacta.</p>
>>>>>>> 2292f79 (Actualización del proyecto DoctorCell)
      </div>
    </section>
  );
}
