import React, { useMemo, useState } from "react";
import { MessageCircle, Search } from "lucide-react";
import { diagnostics } from "../data/siteData.js";
import { whatsappUrl } from "../utils/whatsapp.js";
import SectionHeading from "./SectionHeading.jsx";

export default function Diagnostic() {
  const [query, setQuery] = useState("");
  const quickTags = ["Pantalla rota", "No carga", "Batería", "Se mojó"];

  const filteredDiagnostics = useMemo(() => {
    const tokens = query.trim().toLocaleLowerCase("es").split(/\s+/).filter(Boolean);
    if (!tokens.length) return diagnostics;
    return diagnostics.filter((item) => {
      const content = `${item.title} ${item.text} ${item.keywords}`.toLocaleLowerCase("es");
      return tokens.every((token) => content.includes(token));
    });
  }, [query]);

  const handleProblem = (problem) => {
    const detail = query.trim() ? ` Búsqueda: ${query.trim()}.` : "";
    const message = `Hola DoctorCell Quito, quiero cotizar una reparación. Problema: ${problem}.${detail} Mi equipo es:`;
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
  };

  return (
    <section className="section diagnostic" id="diagnostico">
      <SectionHeading eyebrow="Diagnóstico rápido" title="¿Qué le pasa a tu equipo?">
<<<<<<< HEAD
        Busca por modelo o falla. Tenemos servicios seleccionados desde $20.
=======
        Busca por modelo o falla. Te orientamos según el equipo y la revisión necesaria.
>>>>>>> 2292f79 (Actualización del proyecto DoctorCell)
      </SectionHeading>
      <div className="problem-search">
        <div className="problem-search-field">
          <Search size={20} />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Ej. pantalla rota Samsung A54"
            aria-label="Buscar reparación por modelo o problema"
          />
        </div>
        <div className="quick-tags" aria-label="Problemas frecuentes">
          {quickTags.map((tag) => (
            <button type="button" className={query === tag ? "is-active" : ""} key={tag} onClick={() => setQuery(tag)}>
              {tag}
            </button>
          ))}
        </div>
      </div>
      <div className="diagnostic-grid">
<<<<<<< HEAD
        {filteredDiagnostics.map(({ icon: Icon, title, text, startingPrice }) => (
=======
        {filteredDiagnostics.map(({ icon: Icon, title, text }) => (
>>>>>>> 2292f79 (Actualización del proyecto DoctorCell)
          <button className="diagnostic-card" type="button" key={title} onClick={() => handleProblem(title)}>
            <span><Icon size={22} /></span>
            <strong>{title}</strong>
            <small>{text}</small>
<<<<<<< HEAD
            <b className="diagnostic-price">Desde ${startingPrice}</b>
=======
>>>>>>> 2292f79 (Actualización del proyecto DoctorCell)
          </button>
        ))}
      </div>
      {filteredDiagnostics.length === 0 && (
        <div className="diagnostic-empty">
          <p>No encontramos una coincidencia exacta. Cuéntanos la falla y te orientamos.</p>
          <a href={whatsappUrl(`Hola DoctorCell Quito, busco una reparación para: ${query}. ¿Me ayudan con una cotización?`)} target="_blank" rel="noopener noreferrer">
            <MessageCircle size={17} /> Consultar por WhatsApp
          </a>
        </div>
      )}
<<<<<<< HEAD
      <p className="price-disclaimer">* Valores referenciales. El precio final depende del modelo, repuesto y diagnóstico.</p>
=======
>>>>>>> 2292f79 (Actualización del proyecto DoctorCell)
    </section>
  );
}
