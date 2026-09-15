import React from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarCheck2,
  CalendarClock,
  CheckCircle2,
  FileCheck2,
  Gift,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  TicketCheck
} from "lucide-react";
import { whatsappUrl } from "../utils/whatsapp.js";

const raffleQuestion = "Hola DoctorCell Quito. Leí los términos de la rifa del Samsung A07 y quiero consultar mis compras acumuladas y cuántas oportunidades tengo registradas.";

const sectionLinks = [
  ["organizador", "Organizador"],
  ["participacion", "Cómo participar"],
  ["premio", "Premio"],
  ["vigencia", "Vigencia y sorteo"],
  ["ganador", "Validación y entrega"],
  ["datos", "Datos y aceptación"]
];

function TermSection({ id, number, title, icon: Icon, children }) {
  return (
    <section className="raffle-terms-section" id={id} aria-labelledby={`${id}-title`}>
      <div className="raffle-terms-section-heading">
        <span className="raffle-terms-section-number" aria-hidden="true">{number}</span>
        <span className="raffle-terms-section-icon" aria-hidden="true"><Icon size={20} /></span>
        <h2 id={`${id}-title`}>{title}</h2>
      </div>
      <div className="raffle-terms-section-copy">{children}</div>
    </section>
  );
}

export default function RaffleTerms() {
  return (
    <section className="raffle-terms-page">
      <header className="raffle-terms-hero">
        <div className="raffle-terms-hero-inner">
          <div className="raffle-terms-hero-copy">
            <nav className="raffle-terms-breadcrumb" aria-label="Ruta de navegación">
              <a href="/">Inicio</a><span aria-hidden="true">/</span><span>Términos de la rifa</span>
            </nav>
            <span className="raffle-terms-badge"><Gift size={16} aria-hidden="true" /> Rifa DoctorCell</span>
            <h1>Términos y condiciones <em>de la rifa</em></h1>
            <p>Conoce cómo se registran automáticamente tus oportunidades, hasta cuándo puedes acumular compras y la fecha del sorteo.</p>

            <div className="raffle-terms-equation" aria-label="Cada veinticinco dólares acumulados en compras equivalen a una oportunidad">
              <span><strong>$25</strong><small>en compras</small></span>
              <b aria-hidden="true">=</b>
              <span><strong>1</strong><small>oportunidad</small></span>
            </div>
            <p className="raffle-terms-auto"><TicketCheck size={18} aria-hidden="true" /> Registro automático y compras acumulativas.</p>
          </div>

          <div className="raffle-terms-prize" aria-label="Premio anunciado: Samsung A07">
            <span className="raffle-terms-prize-label"><Sparkles size={16} aria-hidden="true" /> Gran premio</span>
            <div className="raffle-terms-device-frame">
              <img src="/images/raffle-device.jpg" alt="Imagen promocional del equipo Samsung anunciado como premio" width="447" height="447" />
            </div>
            <div className="raffle-terms-prize-name"><small>Premio anunciado</small><strong>Samsung A07</strong></div>
            <span className="raffle-terms-reference">Imagen referencial</span>
          </div>
        </div>
      </header>

      <div className="raffle-terms-layout">
        <aside className="raffle-terms-sidebar">
          <div className="raffle-terms-summary">
            <span className="raffle-terms-summary-kicker">Resumen de la promoción</span>
            <dl>
              <div><dt>Organiza</dt><dd>DoctorCell Quito</dd></div>
              <div><dt>Mecánica</dt><dd>USD 25 acumulados = 1 oportunidad</dd></div>
              <div><dt>Registro</dt><dd>Automático con cada compra</dd></div>
              <div><dt>Premio anunciado</dt><dd>Samsung A07</dd></div>
              <div><dt>Vigencia</dt><dd>Hasta el 31 de octubre de 2026</dd></div>
              <div><dt>Sorteo</dt><dd><span className="raffle-terms-confirmed">7 de noviembre de 2026</span></dd></div>
            </dl>
          </div>

          <nav className="raffle-terms-index" aria-label="Contenido de los términos">
            <strong>En esta página</strong>
            {sectionLinks.map(([id, label], index) => (
              <a key={id} href={`#${id}`}><span>{String(index + 1).padStart(2, "0")}</span>{label}</a>
            ))}
          </nav>
        </aside>

        <article className="raffle-terms-document">
          <div className="raffle-terms-notice" role="note">
            <CalendarCheck2 size={24} aria-hidden="true" />
            <div>
              <strong>Fechas confirmadas</strong>
              <p>La promoción está vigente hasta el <b>31 de octubre de 2026</b> y el sorteo se realizará el <b>7 de noviembre de 2026</b>.</p>
            </div>
          </div>

          <TermSection id="organizador" number="01" title="Organizador" icon={ShieldCheck}>
            <p>La promoción es realizada por <strong>DoctorCell Quito</strong>, en Quito, Ecuador.</p>
          </TermSection>

          <TermSection id="participacion" number="02" title="Cómo participar" icon={TicketCheck}>
            <p>Por cada <strong>USD 25 acumulados en compras realizadas en DoctorCell</strong>, el cliente obtiene automáticamente una oportunidad para participar en la rifa.</p>
            <ul>
              <li>No necesitas completar un formulario: la participación se registra automáticamente con cada compra.</li>
              <li>Los valores de tus compras se acumulan hasta completar cada bloque de USD 25.</li>
              <li>Cada nuevo bloque completo de USD 25 genera una oportunidad adicional.</li>
              <li>Conserva tu comprobante de compra hasta que la promoción y la entrega del premio hayan finalizado.</li>
            </ul>
          </TermSection>

          <TermSection id="premio" number="03" title="Premio" icon={Gift}>
            <p>El premio anunciado para esta promoción es un <strong>Samsung A07</strong>. Las imágenes de la campaña son referenciales; las características finales del equipo serán confirmadas por DoctorCell antes del sorteo.</p>
          </TermSection>

          <TermSection id="vigencia" number="04" title="Vigencia y sorteo" icon={CalendarClock}>
            <p>La promoción estará vigente <strong>hasta el 31 de octubre de 2026</strong>. Las compras realizadas y registradas dentro de la vigencia podrán acumularse para generar oportunidades.</p>
            <p>El sorteo se realizará el <strong>7 de noviembre de 2026</strong>. DoctorCell comunicará la modalidad y el canal de publicación del resultado por sus canales oficiales.</p>
            <p>Solo se considerarán las oportunidades registradas automáticamente a partir de compras válidas durante la vigencia.</p>
          </TermSection>

          <TermSection id="ganador" number="05" title="Validación y entrega del premio" icon={FileCheck2}>
            <p>DoctorCell comunicará por sus canales oficiales la modalidad del sorteo, el proceso para contactar a la persona ganadora y los requisitos de entrega del premio.</p>
            <p>DoctorCell podrá solicitar el comprobante de compra y la información necesaria para verificar la identidad de la persona ganadora.</p>
          </TermSection>

          <TermSection id="datos" number="06" title="Datos, consultas y aceptación" icon={CheckCircle2}>
            <p>Cuando DoctorCell solicite datos para administrar la rifa, estos se utilizarán para validar la participación y contactar a la persona ganadora. Cualquier uso adicional deberá contar con la autorización correspondiente.</p>
            <p>Al participar, confirmas que conoces y aceptas estos términos y las condiciones definitivas que DoctorCell publique antes del sorteo.</p>
          </TermSection>

          <section className="raffle-terms-contact" aria-labelledby="raffle-contact-title">
            <span className="raffle-terms-contact-icon" aria-hidden="true"><MessageCircle size={26} /></span>
            <div>
              <span>¿Tienes dudas?</span>
              <h2 id="raffle-contact-title">Confirma los detalles con DoctorCell</h2>
              <p>Consulta cuántas oportunidades tienes registradas y cualquier detalle adicional del sorteo.</p>
            </div>
            <a href={whatsappUrl(raffleQuestion)} target="_blank" rel="noopener noreferrer">
              Consultar por WhatsApp <ArrowRight size={18} aria-hidden="true" />
            </a>
          </section>

          <footer className="raffle-terms-document-footer">
            <a href="/"><ArrowLeft size={17} aria-hidden="true" /> Volver al inicio</a>
            <small>Última actualización: 15 de septiembre de 2026.</small>
          </footer>
        </article>
      </div>
    </section>
  );
}
