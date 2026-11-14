import React from "react";
import { MessageCircle } from "lucide-react";
import ButtonLink from "./ButtonLink.jsx";
import { whatsappUrl } from "../utils/whatsapp.js";

export default function FinalCta() {
  return (
    <section className="final-cta">
      <p className="eyebrow">TUS PLANES SIGUEN</p>
      <h2>Vuelve a lo tuyo.<br /><em>Empecemos por tu celular.</em></h2>
      <p>Envíanos el modelo y cuéntanos qué falla. Te orientamos por WhatsApp y coordinamos la revisión en la sucursal que prefieras.</p>
      <ButtonLink href={whatsappUrl("Hola DoctorCell Quito, quiero volver a usar mi celular sin esta falla. Mi modelo es: . Lo que ocurre es: . ¿Me ayudan a cotizar una revisión?")} icon={MessageCircle} target="_blank" rel="noopener noreferrer" data-analytics-placement="final_cta">
        Hablar de mi celular
      </ButtonLink>
    </section>
  );
}
