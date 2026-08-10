import React from "react";
import { Clock3, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { contactInfo } from "../data/siteData.js";
import { whatsappUrl } from "../utils/whatsapp.js";
import Brand from "./Brand.jsx";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-about">
        <Brand />
        <p>Servicio técnico para celulares, tablets y relojes inteligentes, con diagnóstico claro y garantía por escrito.</p>
      </div>
      <div className="footer-contact" aria-label="Datos de contacto">
        <strong>{contactInfo.businessName}</strong>
        <span><MapPin size={16} /> {contactInfo.address}</span>
        <a href={whatsappUrl("Hola DoctorCell Quito, necesito ayuda con mi equipo.")} target="_blank" rel="noopener noreferrer"><MessageCircle size={16} /> WhatsApp: {contactInfo.whatsappDisplay}</a>
        <a href={`tel:${contactInfo.phoneHref}`}><Phone size={16} /> Teléfono: {contactInfo.phoneDisplay}</a>
        <a href={`mailto:${contactInfo.email}`}><Mail size={16} /> {contactInfo.email}</a>
      </div>
      <div className="footer-hours">
        <strong>Atención</strong>
        <span><Clock3 size={16} /> {contactInfo.hours}</span>
        <a href="#sucursales"><MapPin size={16} /> Ver las 4 sucursales</a>
        <a href="/guias/">Guías de reparación</a>
        <button className="footer-cookie-settings" type="button" onClick={() => window.dispatchEvent(new Event("doctorcell:cookie-settings"))}>Preferencias de medición</button>
      </div>
    </footer>
  );
}
