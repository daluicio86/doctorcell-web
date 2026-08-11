import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";

export default function PromoStrip() {
  return (
    <section className="promo-strip promo-zentra" aria-label="Tecnología Zentra por Blue Window Studio">
      <div className="promo-icon promo-zentra-mark" aria-hidden="true">Z</div>
      <div>
        <span><Sparkles size={14} /> Tecnología detrás de cada reparación</span>
        <strong>DoctorCell Quito potencia su servicio con Zentra</strong>
        <small>Gestión inteligente desarrollada por Blue Window Studio · BWS.</small>
      </div>
      <a
        href="https://www.bluewindowstudio.com/planes-y-precios"
        target="_blank"
        rel="noopener noreferrer"
        data-analytics-partner="zentra_blue_window_studio"
        data-analytics-placement="promo_strip"
      >
        Conocer planes de Zentra <ArrowRight size={17} />
      </a>
    </section>
  );
}
