import { Clock3, Mail, MapPin, Menu, MessageCircle, Phone, X } from "lucide-react";
import React, { useState } from "react";
import { contactInfo, navItems } from "../data/siteData.js";
import { whatsappUrl } from "../utils/whatsapp.js";
import Brand from "./Brand.jsx";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);
  const isStorePage = window.location.pathname.replace(/\/+$/, "") === "/tienda";

  return (
    <header className="site-header">
      <div className="header-topline">
        <div>
          <span className="branches-pulse"><MapPin size={14} /> 4 sucursales en Quito</span>
          <a href={`tel:${contactInfo.phoneHref}`}><Phone size={14} /> {contactInfo.phoneDisplay}</a>
          <a href={`mailto:${contactInfo.email}`}><Mail size={14} /> {contactInfo.email}</a>
          <span><Clock3 size={14} /> {contactInfo.hours}</span>
        </div>
      </div>
      <div className="header-main">
        <Brand />
        <button
          className="menu-button"
          type="button"
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isOpen}
          aria-controls="site-nav"
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav className={`site-nav ${isOpen ? "is-open" : ""}`} id="site-nav">
          {navItems.map((item) => (
            <a key={item.href} href={isStorePage && item.href.startsWith("#") ? `/${item.href}` : item.href} onClick={closeMenu}>
              {item.label}
            </a>
          ))}
          <a
            className="nav-cta"
            href={whatsappUrl("Hola DoctorCell Quito, quiero cotizar una reparación.")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
          >
            <MessageCircle size={17} />
            <span><small>Cotización rápida</small>WhatsApp</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
