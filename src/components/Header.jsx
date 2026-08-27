import { Clock3, Mail, MapPin, Menu, Phone, ShoppingBag, Sparkles, Stethoscope, X } from "lucide-react";
import React, { useState } from "react";
import { contactInfo, navItems } from "../data/siteData.js";
import Brand from "./Brand.jsx";

const path = () => window.location.pathname.replace(/\/+$/, "") || "/";
const resolveHref = (href) => href.startsWith("#") && path() !== "/" ? `/${href}` : href;

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);
  const currentPath = path();

  return (
    <>
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
          {navItems.map((item) => {
            const isStoreLink = item.href === "/tienda";
            const isCurrent = item.href === currentPath;
            return <a key={item.href} className={isStoreLink ? "nav-store" : undefined} href={resolveHref(item.href)} onClick={closeMenu} aria-current={isCurrent ? "page" : undefined}>
              {isStoreLink && <ShoppingBag size={17} />}
              {isStoreLink ? <span><small><Sparkles size={10} /> Descubre</small>{item.label}</span> : item.label}
            </a>;
          })}
          <a className="nav-cta" href={resolveHref("#cotizador")} onClick={closeMenu}>
            <Stethoscope size={17} />
            <span><small>Orientación preliminar</small>Diagnosticar mi equipo</span>
          </a>
        </nav>
      </div>
    </header>
      <nav className="mobile-dock" aria-label="Acciones principales">
        <a className={currentPath === "/" ? "is-active" : ""} href={resolveHref("#cotizador")}><Stethoscope size={21} /><span>Reparar</span></a>
        <a className={currentPath === "/tienda" ? "is-active" : ""} href="/tienda"><ShoppingBag size={21} /><span>Comprar</span></a>
        <a className={currentPath.startsWith("/sucursales") ? "is-active" : ""} href="/sucursales"><MapPin size={21} /><span>Sucursales</span></a>
      </nav>
    </>
  );
}
