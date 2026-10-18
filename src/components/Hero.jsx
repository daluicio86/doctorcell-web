import React from "react";
import { ArrowDown, ArrowUpRight, BatteryCharging, Check, Cpu, MessageCircle, ScanLine, ShieldCheck, Sparkles } from "lucide-react";
import ButtonLink from "./ButtonLink.jsx";
import { whatsappUrl } from "../utils/whatsapp.js";

const quoteUrl = whatsappUrl("Hola DoctorCell Quito, quiero cotizar una reparación. Mi equipo es: ");

function DeviceScene() {
  return (
    <div className="lab-scene" aria-hidden="true">
      <div className="lab-grid" />
      <div className="lab-orbit orbit-one" />
      <div className="lab-orbit orbit-two" />
      <span className="lab-coordinate coordinate-top">DC / REPAIR LAB</span>
      <span className="lab-coordinate coordinate-bottom">PRECISIÓN EN CADA DETALLE</span>
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
              <small>UNA NUEVA OPORTUNIDAD</small>
              <strong>De vuelta<br />a tu mundo.</strong>
              <span className="device-screen-divider" />
              <span className="device-screen-signature">DoctorCell <span>®</span></span>
            </div>
            <div className="device-scan" />
            <div className="device-home-indicator" />
          </div>
        </div>
      </div>
      <div className="lab-chip chip-precision"><span><ScanLine size={19} /></span><div><small>TECNOLOGÍA + EXPERIENCIA</small><strong>Diagnóstico de precisión</strong></div><span className="chip-status" /></div>
      <div className="lab-chip chip-guarantee"><span><ShieldCheck size={20} /></span><div><strong>Tu tranquilidad, por escrito.</strong><small>Garantía según reparación</small></div><Check size={14} /></div>
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
        <p className="eyebrow">SERVICIO TÉCNICO. SIGUIENTE NIVEL.</p>
        <h1 id="hero-title">Tu mundo<br />no se detiene.<br /><em>Tu equipo tampoco.</em></h1>
        <p className="hero-copy">Le damos una nueva vida a tu tecnología. Reparación de celulares, MacBook, tablets y smartwatches, con diagnóstico claro y garantía por escrito.</p>
        <div className="hero-actions">
          <ButtonLink href={quoteUrl} icon={MessageCircle} target="_blank" rel="noopener noreferrer" data-analytics-placement="hero">Cotiza por WhatsApp <ArrowUpRight size={17} /></ButtonLink>
          <ButtonLink href="#servicios" variant="ghost" icon={ArrowDown}>Explorar servicios</ButtonLink>
        </div>
        <p className="hero-assurance"><ShieldCheck size={15} /> Conoces y autorizas el precio antes de reparar.</p>
        <div className="hero-proof-points" aria-label="Experiencia DoctorCell">
          <span><strong>15+</strong><small>Años de experiencia</small></span>
          <span><strong>04</strong><small>Sucursales en Quito</small></span>
          <span className="specialist-proof"><Sparkles size={22} /><small>Especialistas en<br /><b>productos Apple</b></small></span>
        </div>
      </div>
      <DeviceScene />
      <a className="hero-scroll-cue" href="#servicios"><span /> DESLIZA PARA DESCUBRIR <ArrowDown size={13} /></a>
      <span className="hero-edition" aria-hidden="true">TECNOLOGÍA QUE VUELVE A CONECTAR.</span>
    </section>
  );
}
