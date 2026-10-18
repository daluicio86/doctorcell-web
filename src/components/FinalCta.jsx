import React from "react";
import { MessageCircle } from "lucide-react";
import ButtonLink from "./ButtonLink.jsx";
import { whatsappUrl } from "../utils/whatsapp.js";

export default function FinalCta() {
  return (
    <section className="final-cta">
      <p className="eyebrow">EL SIGUIENTE PASO ES TUYO</p>
      <h2>Volvamos a<br /><em>conectar tu mundo.</em></h2>
      <p>Recibe una orientación preliminar y elige la sucursal que te quede más cerca.</p>
      <ButtonLink href={whatsappUrl("Hola DoctorCell Quito, quiero cotizar una reparación.")} icon={MessageCircle} target="_blank" rel="noopener noreferrer" data-analytics-placement="final_cta">
        Cotiza por WhatsApp
      </ButtonLink>
    </section>
  );
}
