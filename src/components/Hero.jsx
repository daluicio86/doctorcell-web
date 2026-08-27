import React from "react";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Wrench
} from "lucide-react";
import ButtonLink from "./ButtonLink.jsx";

const proofPoints = ["15+ años de experiencia", "4 sucursales", "Garantía por escrito", "Todas las marcas"];

export default function Hero() {
  return (
    <section className="hero hero-conversion">
      <div className="hero-content">
        <div className="hero-livebar">
          <span><span className="live-dot" /> Respuesta rápida en horario de atención</span>
          <span><Clock3 size={15} /> Quito · 4 sucursales</span>
        </div>

        <p className="eyebrow">DoctorCell · la solución tecnológica a tus dispositivos</p>
        <h1>Tu dispositivo vuelve a funcionar. <em>Sin sorpresas.</em></h1>
        <p className="hero-copy">
          Diagnóstico claro, precio autorizado y garantía por escrito. Reparamos celulares
          multimarca, MacBook, tablets y smartwatches. Cuatro sucursales disponibles en Quito.
        </p>

        <div className="apple-specialist">
          <span className="apple-specialist-icon"><Sparkles size={21} /></span>
          <span><small>Experiencia especializada</small><strong>Somos especialistas en productos Apple</strong></span>
        </div>

        <div className="hero-actions">
          <ButtonLink
            href="#cotizador"
            icon={Stethoscope}
          >
            Diagnosticar mi equipo
          </ButtonLink>
          <ButtonLink href="/sucursales" variant="ghost" icon={ArrowRight}>
            Encontrar una sucursal
          </ButtonLink>
        </div>

        <div className="hero-proof-points" aria-label="Datos principales de DoctorCell">
          {proofPoints.map((item) => <span key={item}><CheckCircle2 size={15} /> {item}</span>)}
        </div>

      </div>

      <div className="hero-media" aria-label="Diagnóstico DoctorCell Quito por WhatsApp">
        <div className="hero-glow" />
        <div className="diagnosis-card">
          <div className="diagnosis-head">
            <span className="doctor-avatar"><Wrench size={23} /></span>
            <span><strong>DoctorCell Quito</strong><small>En línea</small></span>
            <ShieldCheck size={24} />
          </div>
          <div className="chat-bubble chat-in">¿Qué equipo tienes y qué le ocurre?</div>
          <div className="chat-bubble chat-out">Samsung A54. Se cayó y no responde la pantalla.</div>
          <div className="chat-bubble chat-in">
            Te damos una orientación preliminar y confirmamos el diagnóstico al revisar el equipo.
          </div>
          <a className="mini-whatsapp" href="#cotizador">
            <Stethoscope size={18} /> Orientar mi reparación
          </a>
        </div>
        <div className="floating-proof proof-top"><ShieldCheck size={18} /><span><strong>Garantía clara</strong> antes de reparar</span></div>
        <div className="floating-proof proof-bottom"><Clock3 size={18} /><span><strong>Respuesta ágil</strong> por WhatsApp</span></div>
      </div>
    </section>
  );
}
