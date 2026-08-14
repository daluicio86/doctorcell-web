import React from "react";
<<<<<<< HEAD
import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "../utils/whatsapp.js";
=======
import { Stethoscope } from "lucide-react";
>>>>>>> 2292f79 (Actualización del proyecto DoctorCell)
import ButtonLink from "./ButtonLink.jsx";

export default function FinalCta() {
  return (
    <section className="final-cta">
<<<<<<< HEAD
      <h2>¿Listo para reparar tu equipo?</h2>
      <p>Cuéntanos marca, modelo y problema. Te orientamos por WhatsApp antes de visitar la sucursal.</p>
      <ButtonLink href={whatsappUrl("Hola DoctorCell Quito, necesito ayuda con mi equipo.")} icon={MessageCircle} target="_blank" rel="noopener noreferrer">
        Escribir ahora
=======
      <h2>Cuéntanos qué le pasa a tu equipo.</h2>
      <p>Recibe una orientación preliminar y elige la sucursal que te quede más cerca.</p>
      <ButtonLink href="#cotizador" icon={Stethoscope}>
        Empezar ahora
>>>>>>> 2292f79 (Actualización del proyecto DoctorCell)
      </ButtonLink>
    </section>
  );
}
