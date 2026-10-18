import React from "react";
import { ArrowUpRight } from "lucide-react";

const names = ["Apple", "Samsung", "Xiaomi", "Huawei", "Motorola", "Honor"];

export default function TechMarquee() {
  return (
    <div className="tech-marquee" aria-label={`Reparamos todas las marcas: ${names.join(", ")} y más.`}>
      <span className="marquee-caption">TU MARCA.<br /><b>NUESTRA EXPERIENCIA.</b></span>
      <div className="marquee-window" aria-hidden="true">
        <div className="marquee-track">{[0, 1].map((copy) => <div className="marquee-group" key={copy}>{names.map((name) => <span key={name}>{name}<i>✳</i></span>)}</div>)}</div>
      </div>
      <a href="#cotizador" aria-label="Cotizar reparación de mi equipo"><ArrowUpRight size={22} /></a>
    </div>
  );
}
