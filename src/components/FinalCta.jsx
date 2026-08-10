import React from "react";
import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "../utils/whatsapp.js";
import ButtonLink from "./ButtonLink.jsx";

export default function FinalCta() {
  return (
    <section className="final-cta">
      <h2>¿Listo para reparar tu equipo?</h2>
      <p>Cuéntanos marca, modelo y problema. Te orientamos por WhatsApp antes de visitar la sucursal.</p>
      <ButtonLink href={whatsappUrl("Hola DoctorCell Quito, necesito ayuda con mi equipo.")} icon={MessageCircle} target="_blank" rel="noopener noreferrer">
        Escribir ahora
      </ButtonLink>
    </section>
  );
}
