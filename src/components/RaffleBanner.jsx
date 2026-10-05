import React, { useEffect, useState } from "react";
import { Gift } from "lucide-react";
import { raffleClosingTime, raffleStatus } from "../utils/raffle.js";

export default function RaffleBanner() {
  const [now, setNow] = useState(null);
  const closed = now !== null && now >= raffleClosingTime;
  useEffect(() => {
    setNow(Date.now());
    const timer = window.setInterval(() => setNow(Date.now()), 60000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="raffle-home section" aria-labelledby="raffle-home-title">
      <figure>
        <img src="/images/raffle-device.webp" alt="Samsung anunciado como premio de la rifa DoctorCell" width="447" height="447" loading="lazy" />
        <figcaption>Imagen referencial</figcaption>
      </figure>
      <div>
        <p className="eyebrow"><Gift size={18} aria-hidden="true" /> Rifa DoctorCell</p>
        <h2 id="raffle-home-title">{closed ? "Rifa DoctorCell: Samsung A07" : "Tus compras pueden hacerte ganar un Samsung A07."}</h2>
        <p>{closed ? "La participación en esta promoción ha finalizado." : <>Cada <strong>$25 acumulados en compras</strong> generan una oportunidad. Registro automático con cada compra.</>}</p>
        <p>{closed ? "La participación cerró el " : "Participa hasta el "}<strong>31 de octubre de 2026</strong>.<br />Sorteo: <strong>7 de noviembre de 2026</strong>.</p>
        <p className="raffle-home-countdown">{now === null ? "Cierre de participación: 31 de octubre de 2026" : raffleStatus(now)}</p>
        <a className="google-reviews-link" href="/terminos-rifa">Ver requisitos y condiciones de la rifa</a>
      </div>
    </section>
  );
}
