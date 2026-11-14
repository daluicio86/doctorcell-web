import React from "react";
import { ArrowUpRight, BatteryCharging, Camera, Cpu, MessageCircle, ScanLine, ShieldCheck, Smartphone, Sparkles } from "lucide-react";
import ButtonLink from "./ButtonLink.jsx";
import { whatsappUrl } from "../utils/whatsapp.js";

const quoteUrl = whatsappUrl("Hola DoctorCell, necesito reparar mi [marca] [modelo]. La falla es: [describir falla]. Prefiero la sucursal de [sucursal].");

function DeviceScene() {
  return (
    <div className="lab-scene" aria-hidden="true">
      <div className="lab-grid" />
      <div className="lab-orbit orbit-one" />
      <div className="lab-orbit orbit-two" />
      <span className="lab-coordinate coordinate-top">DOCTORCELL / QUITO</span>
      <span className="lab-coordinate coordinate-bottom">CONECTA CON LO QUE TE MUEVE</span>
      <div className="device-assembly">
        <div className="device-shadow" />
        <div className="device-body">
          <div className="device-button" />
          <div className="device-display">
            <div className="device-island" />
            <span className="device-time">09:41 <BatteryCharging size={17} /></span>
            <div className="device-aurora" />
            <div className="device-screen-content">
              <span className="device-symbol"><Sparkles size={38} strokeWidth={1.3} /></span>
              <small>TUS PLANES SIGUEN</small>
              <strong>Estudia.<br />Trabaja.<br />Crea.</strong>
              <span className="device-screen-divider" />
              <span className="device-screen-signature">DoctorCell <span>®</span></span>
            </div>
            <div className="device-scan" />
            <div className="device-home-indicator" />
          </div>
        </div>
      </div>
      <div className="lab-chip chip-precision"><span><ScanLine size={19} /></span><div><small>TECNOLOGÍA + EXPERIENCIA</small><strong>Diagnóstico de precisión</strong></div><span className="chip-status" /></div>
      <div className="lab-chip chip-component"><Cpu size={22} /><span>CUIDAMOS<br /><b>CADA COMPONENTE</b></span></div>
      <span className="lab-spark spark-one" /><span className="lab-spark spark-two" /><span className="lab-spark spark-three" />
    </div>
  );
}

export default function Hero() {
  return (
    <section className="hero hero-conversion future-hero" aria-labelledby="hero-title">
      <div className="hero-ambient ambient-one" aria-hidden="true" />
      <div className="hero-ambient ambient-two" aria-hidden="true" />
      <div className="hero-content">
        <a className="hero-location" href="/sucursales"><span className="live-dot" /> QUITO, ECUADOR <span className="location-separator">/</span> 4 SUCURSALES <ArrowUpRight size={14} /></a>
        <p className="eyebrow">REPARACIÓN DE CELULARES EN QUITO</p>
        <h1 id="hero-title">Tu celular.<br />Tus planes.<br /><em>Sigue a tu ritmo.</em></h1>
        <p className="hero-copy">Clases, trabajo, fotos y ese próximo plan. Te ayudamos a volver a lo tuyo con <strong>diagnóstico claro y un precio que tú autorizas.</strong></p>
        <div className="hero-actions">
          <ButtonLink href={quoteUrl} icon={MessageCircle} target="_blank" rel="noopener noreferrer" data-analytics-placement="hero">Cotizar por WhatsApp <ArrowUpRight size={17} /></ButtonLink>
          <ButtonLink href="#servicios" variant="ghost">Ver qué necesita mi celular</ButtonLink>
        </div>
        <p className="hero-assurance"><ShieldCheck size={15} /> Conoces y autorizas el precio antes de reparar.</p>
        <nav className="hero-quick-issues" aria-label="Cotiza según la falla de tu celular">
          {[[Smartphone, 'Pantalla rota'], [BatteryCharging, 'Batería que dura poco'], [Camera, 'Cámara o audio']].map(([Icon, label]) => <a key={label} href={whatsappUrl(`Hola DoctorCell Quito, quiero cotizar una revisión por: ${label}. Mi modelo es: `)} target="_blank" rel="noopener noreferrer" data-analytics-placement="hero_issue"><Icon size={16} aria-hidden="true" /><span>{label}</span><ArrowUpRight size={14} aria-hidden="true" /></a>)}
        </nav>
        <div className="hero-proof-points" aria-label="Experiencia DoctorCell">
          <span><strong>15+</strong><small>Años de experiencia</small></span>
          <span><strong>4</strong><small>Sucursales en Quito</small></span>
          <span className="specialist-proof"><Sparkles size={22} /><small>Especialistas en<br /><b>productos Apple</b></small></span>
        </div>
      </div>
      <DeviceScene />
    </section>
  );
}
