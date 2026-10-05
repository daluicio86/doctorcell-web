import React from "react";
import { MessageCircle } from "lucide-react";
import ButtonLink from "./ButtonLink.jsx";
import { whatsappUrl } from "../utils/whatsapp.js";

export default function FinalCta() {
  return (
    <section className="final-cta">
      <h2>Cuéntanos qué le pasa a tu equipo.</h2>
      <p>Recibe una orientación preliminar y elige la sucursal que te quede más cerca.</p>
      <ButtonLink href={whatsappUrl("Hola DoctorCell Quito, quiero cotizar una reparación.")} icon={MessageCircle} target="_blank" rel="noopener noreferrer" data-analytics-placement="final_cta">
        Cotiza por WhatsApp
      </ButtonLink>
    </section>
  );
}
