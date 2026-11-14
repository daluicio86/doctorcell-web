import React from "react";
import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "../utils/whatsapp.js";

export default function FloatingWhatsApp() {
  return (
    <a
      className="floating-whatsapp"
      href={whatsappUrl("Hola DoctorCell, necesito reparar mi [marca] [modelo]. La falla es: [describir falla]. Prefiero la sucursal de [sucursal].")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      data-analytics-placement="floating_whatsapp"
    >
      <MessageCircle size={25} />
      <span>Cotizar por WhatsApp</span>
    </a>
  );
}
