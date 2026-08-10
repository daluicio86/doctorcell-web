import React, { useMemo, useState } from "react";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import { brands, branches, diagnostics } from "../data/siteData.js";
import { whatsappUrl } from "../utils/whatsapp.js";

export default function QuoteFinder() {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [problem, setProblem] = useState("");
  const [branch, setBranch] = useState("");

  const selectedProblem = useMemo(
    () => diagnostics.find((item) => item.title === problem),
    [problem]
  );
  const isReady = brand && model.trim() && problem && branch;

  const message = [
    "Hola DoctorCell Quito, quiero cotizar una reparación.",
    `Equipo: ${brand} ${model.trim()}.`,
    `Problema: ${problem}.`,
    `Sucursal preferida: ${branch}.`,
    "¿Me ayudan con el valor orientativo y el tiempo estimado?"
  ].join(" ");

  return (
    <section className="quote-finder" id="cotizador" aria-labelledby="quote-title">
      <div className="quote-intro">
        <p className="eyebrow">Cotizador rápido</p>
        <h2 id="quote-title">Cuéntanos qué equipo tienes.</h2>
        <p>Completa cuatro datos y envía la consulta a WhatsApp sin escribir todo desde cero.</p>
        <div className="quote-route" aria-label="Flujo del cotizador">
          <span>Marca</span><ArrowRight size={14} />
          <span>Modelo</span><ArrowRight size={14} />
          <span>Problema</span><ArrowRight size={14} />
          <span>Sucursal</span>
        </div>
      </div>

      <form className="quote-form" onSubmit={(event) => event.preventDefault()}>
        <label>
          <span>1. Marca</span>
          <select value={brand} onChange={(event) => setBrand(event.target.value)}>
            <option value="">Selecciona la marca</option>
            {brands.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
        <label>
          <span>2. Modelo</span>
          <input
            value={model}
            onChange={(event) => setModel(event.target.value)}
            placeholder="Ej. iPhone 11"
            autoComplete="off"
          />
        </label>
        <label>
          <span>3. Problema</span>
          <select value={problem} onChange={(event) => setProblem(event.target.value)}>
            <option value="">¿Qué le pasa?</option>
            {diagnostics.map((item) => <option key={item.title} value={item.title}>{item.title}</option>)}
          </select>
        </label>
        <label>
          <span>4. Sucursal</span>
          <select value={branch} onChange={(event) => setBranch(event.target.value)}>
            <option value="">Elige la más cercana</option>
            {branches.map((item) => <option key={item.name} value={item.name}>{item.name}</option>)}
          </select>
        </label>

        {selectedProblem && (
          <p className="quote-hint"><Check size={16} /> {selectedProblem.price}</p>
        )}

        <a
          className={`button whatsapp-submit ${isReady ? "" : "is-disabled"}`}
          href={isReady ? whatsappUrl(message) : undefined}
          target={isReady ? "_blank" : undefined}
          rel="noopener noreferrer"
          aria-disabled={!isReady}
          onClick={(event) => { if (!isReady) event.preventDefault(); }}
        >
          <MessageCircle size={19} />
          Cotizar por WhatsApp
        </a>
        <small>No enviamos tus datos a ningún servidor. WhatsApp se abre sólo cuando tú confirmas.</small>
      </form>
    </section>
  );
}
