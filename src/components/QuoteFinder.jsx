<<<<<<< HEAD
import React, { useMemo, useState } from "react";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import { brands, branches, diagnostics } from "../data/siteData.js";
import { whatsappUrl } from "../utils/whatsapp.js";

=======
import React, { useState } from "react";
import { ArrowRight, Camera, LocateFixed, MessageCircle } from "lucide-react";
import { brands, branches, diagnostics } from "../data/siteData.js";
import { whatsappUrl } from "../utils/whatsapp.js";

const branchCoordinates = {
  "Sucursal Prensa": [-0.1512, -78.4925],
  "Sucursal Colón": [-0.20092, -78.49],
  "Sucursal Shyris": [-0.16447, -78.47986],
  "Sucursal Vaca de Castro": [-0.12932, -78.4941]
};

>>>>>>> 2292f79 (Actualización del proyecto DoctorCell)
export default function QuoteFinder() {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [problem, setProblem] = useState("");
  const [branch, setBranch] = useState("");
<<<<<<< HEAD

  const selectedProblem = useMemo(
    () => diagnostics.find((item) => item.title === problem),
    [problem]
  );
=======
  const [photoFile, setPhotoFile] = useState(null);
  const [locationStatus, setLocationStatus] = useState("");

  const selectNearestBranch = () => {
    if (!navigator.geolocation) {
      setLocationStatus("Tu navegador no permite obtener la ubicación.");
      return;
    }
    setLocationStatus("Buscando tu ubicación…");
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const toRadians = (value) => value * Math.PI / 180;
      const distanceTo = (item) => {
        const [latitude, longitude] = branchCoordinates[item.name];
        const latitudeDelta = toRadians(latitude - coords.latitude);
        const longitudeDelta = toRadians(longitude - coords.longitude);
        const calculation = Math.sin(latitudeDelta / 2) ** 2
          + Math.cos(toRadians(coords.latitude)) * Math.cos(toRadians(latitude))
          * Math.sin(longitudeDelta / 2) ** 2;
        return 6371 * 2 * Math.atan2(Math.sqrt(calculation), Math.sqrt(1 - calculation));
      };
      const nearest = branches.reduce((best, item) => distanceTo(item) < distanceTo(best) ? item : best);
      setBranch(nearest.name);
      setLocationStatus(`${nearest.name} es la más cercana a tu ubicación.`);
    }, () => {
      setLocationStatus("No pudimos acceder a tu ubicación. Puedes elegir la sucursal manualmente.");
    }, { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 });
  };

>>>>>>> 2292f79 (Actualización del proyecto DoctorCell)
  const isReady = brand && model.trim() && problem && branch;

  const message = [
    "Hola DoctorCell Quito, quiero cotizar una reparación.",
    `Equipo: ${brand} ${model.trim()}.`,
    `Problema: ${problem}.`,
    `Sucursal preferida: ${branch}.`,
<<<<<<< HEAD
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
=======
    photoFile ? `Foto seleccionada: ${photoFile.name}. La adjunto con este mensaje.` : "No adjuntaré una foto por ahora.",
    "¿Me ayudan con una orientación preliminar de valor y tiempo?"
  ].join(" ");

  const handleWhatsAppClick = async (event) => {
    if (!isReady) {
      event.preventDefault();
      return;
    }
    if (!photoFile || !navigator.share || !navigator.canShare?.({ files: [photoFile] })) return;

    event.preventDefault();
    try {
      await navigator.share({
        title: "Diagnóstico DoctorCell Quito",
        text: message,
        files: [photoFile]
      });
    } catch (error) {
      if (error.name !== "AbortError") window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section className="quote-finder" id="cotizador" aria-labelledby="quote-title">
      <div className="quote-intro">
        <p className="eyebrow">Orientación preliminar</p>
        <h2 id="quote-title">Cuéntanos qué le pasa a tu equipo.</h2>
        <p>Marca, modelo, falla, una foto opcional y la sucursal que prefieres. El diagnóstico definitivo se confirma al revisar físicamente el equipo.</p>
        <div className="quote-route" aria-label="Flujo del cotizador">
          <span>Marca</span><ArrowRight size={14} />
          <span>Modelo</span><ArrowRight size={14} />
          <span>Falla</span><ArrowRight size={14} />
          <span>Foto</span><ArrowRight size={14} />
>>>>>>> 2292f79 (Actualización del proyecto DoctorCell)
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
<<<<<<< HEAD
          <span>4. Sucursal</span>
=======
          <span>4. Foto opcional</span>
          <span className="quote-file"><Camera size={18} />{photoFile?.name || "Añadir una foto"}<input type="file" accept="image/*" onChange={(event) => setPhotoFile(event.target.files?.[0] || null)} /></span>
        </label>
        <label>
          <span>5. Sucursal</span>
>>>>>>> 2292f79 (Actualización del proyecto DoctorCell)
          <select value={branch} onChange={(event) => setBranch(event.target.value)}>
            <option value="">Elige la más cercana</option>
            {branches.map((item) => <option key={item.name} value={item.name}>{item.name}</option>)}
          </select>
<<<<<<< HEAD
        </label>

        {selectedProblem && (
          <p className="quote-hint"><Check size={16} /> {selectedProblem.price}</p>
        )}

=======
          <button className="nearest-branch-button" type="button" onClick={selectNearestBranch}>
            <LocateFixed size={17} /> Usar mi ubicación
          </button>
          {locationStatus && <small className="location-status" role="status">{locationStatus}</small>}
        </label>

>>>>>>> 2292f79 (Actualización del proyecto DoctorCell)
        <a
          className={`button whatsapp-submit ${isReady ? "" : "is-disabled"}`}
          href={isReady ? whatsappUrl(message) : undefined}
          target={isReady ? "_blank" : undefined}
          rel="noopener noreferrer"
          aria-disabled={!isReady}
<<<<<<< HEAD
          onClick={(event) => { if (!isReady) event.preventDefault(); }}
        >
          <MessageCircle size={19} />
          Cotizar por WhatsApp
        </a>
        <small>No enviamos tus datos a ningún servidor. WhatsApp se abre sólo cuando tú confirmas.</small>
=======
          onClick={handleWhatsAppClick}
        >
          <MessageCircle size={19} />
          Continuar orientación
        </a>
        <small>{photoFile ? "Foto lista. En dispositivos compatibles podrás compartirla junto con el mensaje; si WhatsApp solo abre el chat, adjúntala manualmente." : "La foto no se sube al sitio. Puedes seleccionarla para compartirla con tu consulta."}</small>
>>>>>>> 2292f79 (Actualización del proyecto DoctorCell)
      </form>
    </section>
  );
}
