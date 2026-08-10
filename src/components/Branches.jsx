import React, { useMemo, useState } from "react";
import { Clock3, Landmark, MessageCircle, Navigation } from "lucide-react";
import { branches } from "../data/siteData.js";
import { mapsUrl, whatsappUrl } from "../utils/whatsapp.js";
import SectionHeading from "./SectionHeading.jsx";

export default function Branches() {
  const [activeBranch, setActiveBranch] = useState(0);
  const selected = branches[activeBranch];
  const mapSrc = useMemo(
    () => `https://www.google.com/maps?q=${encodeURIComponent(`DoctorCell Quito ${selected.address} Quito Ecuador`)}&output=embed`,
    [selected.address]
  );

  return (
    <section className="section branches" id="sucursales">
      <SectionHeading eyebrow="Estamos cerca" title="Conoce nuestras sucursales.">
        Elige la más cómoda y llega directo con Google Maps.
      </SectionHeading>
      <nav className="branch-shortcuts" aria-label="Selecciona una sucursal">
        {branches.map(({ name }, index) => (
          <button className={activeBranch === index ? "is-active" : ""} type="button" key={name} onClick={() => setActiveBranch(index)}>
            {name.replace("Sucursal ", "")}
          </button>
        ))}
      </nav>
      <div className="branch-map">
        <iframe key={mapSrc} title={`Mapa de ${selected.name}`} src={mapSrc} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        <div className="branch-map-copy">
          <span>Sucursal seleccionada</span>
          <strong>{selected.name}</strong>
          <p>{selected.address} · {selected.reference}</p>
          <a href={mapsUrl(`DoctorCell Quito ${selected.address} Quito Ecuador`)} target="_blank" rel="noopener noreferrer">
            <Navigation size={16} /> Abrir ruta en Google Maps
          </a>
        </div>
      </div>
      <div className="branch-grid">
        {branches.map(({ name, address, reference, hours, icon: Icon }, index) => (
          <article className="branch-card" id={`sucursal-${index + 1}`} key={address}>
            <span className="branch-number">{index + 1}</span>
            <Icon size={24} />
            <h3>{name}</h3>
            <p>{address}</p>
            <p className="branch-meta"><Landmark size={15} /> {reference}</p>
            <p className="branch-meta"><Clock3 size={15} /> {hours}</p>
            <div className="branch-actions">
              <a href={mapsUrl(`DoctorCell Quito ${address} Quito Ecuador`)} target="_blank" rel="noopener noreferrer">
                <Navigation size={15} />
                Cómo llegar
              </a>
              <a href={whatsappUrl(`Hola DoctorCell Quito, quiero atención en ${name} (${address}).`)} target="_blank" rel="noopener noreferrer">
                <MessageCircle size={15} />
                WhatsApp
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
