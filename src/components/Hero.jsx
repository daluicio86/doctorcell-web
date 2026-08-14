import React from "react";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
<<<<<<< HEAD
  ExternalLink,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Wrench
} from "lucide-react";
import { whatsappUrl } from "../utils/whatsapp.js";
import ButtonLink from "./ButtonLink.jsx";

=======
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Wrench
} from "lucide-react";
import ButtonLink from "./ButtonLink.jsx";

const proofPoints = ["15+ años de experiencia", "4 sucursales", "Garantía por escrito", "Todas las marcas"];

>>>>>>> 2292f79 (Actualización del proyecto DoctorCell)
export default function Hero() {
  return (
    <section className="hero hero-conversion">
      <div className="hero-content">
        <div className="hero-livebar">
          <span><span className="live-dot" /> Respuesta rápida en horario de atención</span>
          <span><Clock3 size={15} /> Quito · 4 sucursales</span>
        </div>

<<<<<<< HEAD
        <p className="eyebrow">Expertos en tecnología · Más de 15 años</p>
        <h1>Tu celular como nuevo, <em>hoy mismo.</em></h1>
        <p className="hero-copy">
          Reparaciones rápidas, repuestos de calidad y garantía por escrito. Cuéntanos
          qué le pasa a tu equipo y recibe una cotización sin compromiso.
        </p>

        <div className="hero-price"><strong>Desde $15</strong><span>en servicios seleccionados; precio referencial según modelo, diagnóstico y repuesto</span></div>

        <div className="hero-actions">
          <ButtonLink
            href={whatsappUrl("Hola DoctorCell Quito, quiero un diagnóstico gratis para mi equipo.")}
            icon={MessageCircle}
            target="_blank"
            rel="noopener noreferrer"
          >
            Cotiza por WhatsApp
          </ButtonLink>
          <ButtonLink href="#casos-reales" variant="ghost" icon={ArrowRight}>
            Ver casos reales
          </ButtonLink>
        </div>

        <div className="trust-strip" aria-label="Beneficios principales">
          <span><CheckCircle2 size={16} /> Cotización sin compromiso</span>
          <span><ShieldCheck size={16} /> Garantía visible</span>
          <span><Sparkles size={16} /> Prueba final del equipo</span>
        </div>

        <a
          className="hero-mobile-powered"
          href="https://www.bluewindowstudio.com/"
          target="_blank"
          rel="noopener noreferrer"
          data-analytics-partner="zentra_blue_window_studio"
          data-analytics-placement="hero_mobile_powered"
          aria-label="Conocer Zentra y Blue Window Studio"
        >
          <span className="hero-mobile-powered-mark" aria-hidden="true">Z</span>
          <span className="hero-mobile-powered-copy">
            <small>TECNOLOGÍA QUE IMPULSA TU SERVICIO</small>
            <strong>Diagnóstico inteligente con <em>Zentra</em></strong>
            <span>Desarrollado por Blue Window Studio <b>· BWS</b></span>
          </span>
          <ExternalLink size={17} aria-hidden="true" />
        </a>
=======
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

>>>>>>> 2292f79 (Actualización del proyecto DoctorCell)
      </div>

      <div className="hero-media" aria-label="Diagnóstico DoctorCell Quito por WhatsApp">
        <div className="hero-glow" />
        <div className="diagnosis-card">
          <div className="diagnosis-head">
            <span className="doctor-avatar"><Wrench size={23} /></span>
            <span><strong>DoctorCell Quito</strong><small>En línea</small></span>
            <ShieldCheck size={24} />
          </div>
<<<<<<< HEAD
          <div className="chat-bubble chat-in">¡Hola! 👋 ¿Qué equipo necesitas reparar?</div>
          <div className="chat-bubble chat-out">Samsung A54. Se cayó y no responde la pantalla.</div>
          <div className="chat-bubble chat-in">
            Podemos ayudarte. Envíanos una foto y te orientamos sin compromiso.
          </div>
          <a
            className="mini-whatsapp"
            href={whatsappUrl("Hola DoctorCell Quito, quiero un diagnóstico gratis para mi equipo.")}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={18} /> Iniciar diagnóstico
          </a>
          <a
            className="zentra-powered"
            href="https://www.bluewindowstudio.com/"
            target="_blank"
            rel="noopener noreferrer"
            data-analytics-partner="zentra_blue_window_studio"
            data-analytics-placement="hero_diagnosis_card"
            aria-label="Conocer Blue Window Studio, creador de Zentra"
          >
            <span className="zentra-powered-mark" aria-hidden="true">Z</span>
            <span>
              <small>GESTIONADO CON</small>
              <strong>Zentra</strong>
              <em>por Blue Window Studio</em>
            </span>
            <ExternalLink size={14} aria-hidden="true" />
=======
          <div className="chat-bubble chat-in">¿Qué equipo tienes y qué le ocurre?</div>
          <div className="chat-bubble chat-out">Samsung A54. Se cayó y no responde la pantalla.</div>
          <div className="chat-bubble chat-in">
            Te damos una orientación preliminar y confirmamos el diagnóstico al revisar el equipo.
          </div>
          <a className="mini-whatsapp" href="#cotizador">
            <Stethoscope size={18} /> Orientar mi reparación
>>>>>>> 2292f79 (Actualización del proyecto DoctorCell)
          </a>
        </div>
        <div className="floating-proof proof-top"><ShieldCheck size={18} /><span><strong>Garantía clara</strong> antes de reparar</span></div>
        <div className="floating-proof proof-bottom"><Clock3 size={18} /><span><strong>Respuesta ágil</strong> por WhatsApp</span></div>
      </div>
    </section>
  );
}
