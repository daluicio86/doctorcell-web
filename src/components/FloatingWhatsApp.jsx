import React from "react";
import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "../utils/whatsapp.js";

export default function FloatingWhatsApp() {
  return (
    <a
      className="floating-whatsapp"
      href={whatsappUrl("Hola DoctorCell Quito, quiero cotizar una reparación.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={25} />
      <span>Cotizar por WhatsApp</span>
    </a>
  );
}
