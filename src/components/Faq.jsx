import React from "react";
import { ChevronDown } from "lucide-react";
import SectionHeading from "./SectionHeading.jsx";

const questions = [
  ["¿Cuánto demora el cambio de pantalla?", "El tiempo estimado es de 2 a 3 horas. Puede variar según el modelo, el repuesto y las pruebas finales."],
  ["¿Atienden todas las marcas?", "Sí. Atendemos iPhone, Samsung, Xiaomi y muchas marcas más."],
  ["¿Puedo cotizar antes de llevar mi equipo?", "Sí. Escríbenos por WhatsApp con la marca, el modelo y la falla."],
  ["¿Tienen repuestos en stock?", "Disponemos de un amplio stock. Confirma la disponibilidad para tu modelo por WhatsApp."],
<<<<<<< HEAD
  ["¿Cuánto cuesta reparar la pantalla de un celular en Quito?", "Depende de la marca, el modelo y el tipo de repuesto. En DoctorCell Quito tenemos cambios de pantalla desde $35; confirma el valor exacto con el cotizador."],
=======
  ["¿Cuánto cuesta reparar la pantalla de un celular en Quito?", "Depende de la marca, el modelo, el diagnóstico y el tipo de repuesto. Te confirmamos la cotización antes de iniciar la reparación."],
>>>>>>> 2292f79 (Actualización del proyecto DoctorCell)
  ["¿Cuánto tarda un cambio de pantalla de iPhone?", "Muchos cambios se realizan el mismo día. El tiempo definitivo depende del modelo, la disponibilidad del repuesto y las pruebas finales."],
  ["¿La reparación tiene garantía?", "Sí. La cobertura y vigencia se indican por escrito según el servicio y repuesto instalados."],
  ["¿Debo agendar antes de visitar una sucursal?", "No es obligatorio, pero agendar te ayuda a reducir la espera y permite confirmar disponibilidad en la sucursal elegida."],
  ["¿Reparan celulares mojados o que no encienden?", "Sí. Primero realizamos un diagnóstico técnico. No intentes cargar el equipo mojado; apágalo y tráelo cuanto antes."],
  ["¿Trabajan con iPhone, Samsung y Xiaomi?", "Sí. Atendemos Apple, Samsung, Xiaomi, Huawei, Motorola, Honor, Oppo y otras marcas, sujeto a disponibilidad de repuestos."]
];

export default function Faq() {
  return (
    <section className="section faq" id="preguntas">
      <SectionHeading eyebrow="Antes de visitarnos" title="Respuestas rápidas para decidir hoy.">
        Lo esencial antes de traer tu equipo a una sucursal de DoctorCell Quito.
      </SectionHeading>
      <div className="faq-list">{questions.map(([question, answer], index) => <details key={question} open={index === 0}><summary>{question}<ChevronDown size={20} /></summary><p>{answer}</p></details>)}</div>
    </section>
  );
}
