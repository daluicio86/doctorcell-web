import React from "react";
import {
  CheckCircle2,
  ClipboardCheck,
  ScanLine,
  ShieldCheck,
  Sparkles,
  UserRoundCog
} from "lucide-react";

const workflow = [
  { icon: ScanLine, label: "Ingreso", detail: "Equipo identificado" },
  { icon: ClipboardCheck, label: "Diagnóstico", detail: "Proceso documentado" },
  { icon: UserRoundCog, label: "Técnico", detail: "Trabajo organizado" },
  { icon: CheckCircle2, label: "Entrega", detail: "Servicio verificado" }
];

export default function ZentraTechnology() {
  return (
    <section className="zentra-section" aria-labelledby="zentra-title">
      <div className="zentra-copy">
        <div className="zentra-brandline">
          <span className="zentra-mark" aria-hidden="true">Z</span>
          <span>Gestión impulsada por <strong>Zentra</strong></span>
        </div>

        <p className="eyebrow">Tecnología detrás de cada reparación</p>
        <h2 id="zentra-title">Tu equipo en buenas manos. Y cada detalle, bajo control.</h2>
        <p className="zentra-lead">
          En DoctorCell Quito utilizamos Zentra para organizar cada servicio y acompañar el trabajo
          de nuestros técnicos, desde el ingreso del equipo hasta su entrega.
        </p>

        <div className="zentra-trust">
          <span><ShieldCheck size={18} /> Información ordenada</span>
          <span><Sparkles size={18} /> Atención más ágil</span>
        </div>
      </div>

      <div className="zentra-panel" aria-label="Flujo de servicio gestionado con Zentra">
        <div className="zentra-panel-head">
          <div>
            <small>ORDEN DE SERVICIO</small>
            <strong>Gestión inteligente</strong>
          </div>
          <span><i /> En proceso</span>
        </div>

        <div className="zentra-progress" aria-hidden="true"><span /></div>

        <div className="zentra-workflow">
          {workflow.map(({ icon: Icon, label, detail }, index) => (
            <article key={label}>
              <div className="zentra-step-icon"><Icon size={20} /></div>
              <div>
                <small>0{index + 1}</small>
                <strong>{label}</strong>
                <span>{detail}</span>
              </div>
            </article>
          ))}
        </div>

        <p className="zentra-panel-note">
          <CheckCircle2 size={17} /> Más claridad para el equipo técnico. Más confianza para ti.
        </p>
      </div>
    </section>
  );
}
