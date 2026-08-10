import React, { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { accessories } from "../data/siteData.js";
import { whatsappUrl } from "../utils/whatsapp.js";
import SectionHeading from "./SectionHeading.jsx";

export default function Accessories() {
  const [query, setQuery] = useState("");
  const filteredAccessories = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("es");
    if (!normalized) return accessories;
    return accessories.filter((item) => `${item.title} ${item.text} ${item.keywords}`.toLocaleLowerCase("es").includes(normalized));
  }, [query]);

  return (
    <section className="section accessories" id="accesorios">
      <SectionHeading eyebrow="Accesorios" title="Protege y mejora tus dispositivos.">
        Catálogo rápido para consultar disponibilidad por WhatsApp.
      </SectionHeading>
      <div className="accessory-search">
        <Search size={19} />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Busca: cargador iPhone, cable tipo C, mica Samsung…"
          aria-label="Buscar accesorios"
        />
      </div>
      <div className="accessory-grid">
        {filteredAccessories.map(({ icon: Icon, title, text, artClass }) => (
          <article className="accessory-card" key={title}>
            <div className={`accessory-art ${artClass}`}>
              <Icon size={42} />
            </div>
            <div>
              <h3>{title}</h3>
              <p>{text}</p>
              <a href={whatsappUrl(`Hola DoctorCell Quito, quiero consultar disponibilidad de ${title}.`)} target="_blank" rel="noopener noreferrer">
                Consultar disponibilidad
              </a>
            </div>
          </article>
        ))}
      </div>
      {filteredAccessories.length === 0 && (
        <div className="empty-state">
          <strong>No encontramos ese accesorio en el catálogo.</strong>
          <a href={whatsappUrl(`Hola DoctorCell Quito, busco este accesorio: ${query}. ¿Tienen disponibilidad?`)} target="_blank" rel="noopener noreferrer">Preguntar por WhatsApp</a>
        </div>
      )}
    </section>
  );
}
