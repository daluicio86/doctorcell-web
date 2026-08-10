import React from "react";
import { ArrowUpRight } from "lucide-react";
import { brands } from "../data/siteData.js";
import { whatsappUrl } from "../utils/whatsapp.js";

export default function BrandsStrip() {
  const visibleBrands = brands.filter((brand) => brand !== "Otra");

  return (
    <section className="brands-strip" aria-labelledby="brands-title">
      <div>
        <p className="eyebrow">Cotiza por marca</p>
        <h2 id="brands-title">Tu equipo tiene solución.</h2>
        <p className="brands-copy">Selecciona la marca y cuéntanos el modelo y la falla.</p>
      </div>
      <div className="brand-list">
        {visibleBrands.map((brand) => (
          <a key={brand} href={whatsappUrl(`Hola DoctorCell Quito, quiero cotizar la reparación de un ${brand}. Mi modelo y falla son:`)} target="_blank" rel="noopener noreferrer">
            <span>{brand}</span><ArrowUpRight size={16} />
          </a>
        ))}
      </div>
    </section>
  );
}
