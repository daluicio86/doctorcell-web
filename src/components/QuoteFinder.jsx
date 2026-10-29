import React, { useRef, useState } from "react";
import { ArrowRight, CheckCircle2, LoaderCircle, LocateFixed, MessageCircle } from "lucide-react";
import { brands, branches, diagnostics } from "../data/siteData.js";
import { whatsappUrl } from "../utils/whatsapp.js";
import { isValidWhatsAppPhone } from "../utils/contact.js";
import { captureQuoteLead } from "../utils/leads.js";
import { trackEvent } from "../utils/analytics.js";

export default function QuoteFinder() {
  const [form, setForm] = useState({ name: "", phone: "", problem: "", brand: "", model: "", branch: "", consent: false });
  const [locationStatus, setLocationStatus] = useState("");
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(null);
  const requestRef = useRef(null);
  const submittingRef = useRef(false);
  const update = (key) => (event) => {
    const value = key === "consent" ? event.target.checked : event.target.value;
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: "", submit: "" }));
  };

  const selectNearestBranch = () => {
    if (!navigator.geolocation) return setLocationStatus("Puedes elegir una sucursal manualmente.");
    setLocationStatus("Buscando tu ubicación…");
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const radians = (value) => value * Math.PI / 180;
      const distance = ({ latitude, longitude }) => {
        const a = Math.sin(radians(latitude - coords.latitude) / 2) ** 2
          + Math.cos(radians(coords.latitude)) * Math.cos(radians(latitude))
          * Math.sin(radians(longitude - coords.longitude) / 2) ** 2;
        return 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      };
      const nearest = branches.reduce((best, item) => distance(item) < distance(best) ? item : best);
      setForm((current) => ({ ...current, branch: nearest.name }));
      setLocationStatus(`${nearest.name} es la más cercana a tu ubicación.`);
    }, () => setLocationStatus("No pudimos acceder a tu ubicación. Puedes elegir la sucursal manualmente."), { timeout: 10000, maximumAge: 300000 });
  };

  const fieldProps = (key) => ({ name: key, "aria-invalid": Boolean(errors[key]), "aria-describedby": errors[key] ? `quote-${key}-error` : undefined });
  const fieldError = (key) => errors[key] ? <small className="quote-field-error" id={`quote-${key}-error`}>{errors[key]}</small> : null;

  const submit = async (event) => {
    event.preventDefault();
    if (submittingRef.current) return;
    const formElement = event.currentTarget;
    const invalid = {};
    if (form.name.trim().length < 2) invalid.name = "Escribe tu nombre (al menos 2 caracteres).";
    if (!isValidWhatsAppPhone(form.phone)) invalid.phone = "Ingresa un celular de Ecuador (09XXXXXXXX) o un número internacional con + y código de país.";
    if (!form.problem) invalid.problem = "Selecciona la falla de tu equipo.";
    if (!form.consent) invalid.consent = "Necesitamos tu autorización para guardar la consulta y contactarte.";
    setErrors(invalid);
    if (Object.keys(invalid).length) {
      formElement.elements.namedItem(Object.keys(invalid)[0])?.focus();
      return;
    }

    const payload = {
      name: form.name.trim(), contact: form.phone.trim(), problem: form.problem,
      brand: form.brand, model: form.model.trim(), location: form.branch,
      service: "Cotización de reparación", consent: form.consent
    };
    const fingerprint = JSON.stringify(payload);
    if (requestRef.current?.fingerprint !== fingerprint) requestRef.current = { fingerprint, id: crypto.randomUUID() };
    submittingRef.current = true;
    setSaving(true);
    try {
      const { caseId } = await captureQuoteLead(payload, requestRef.current.id);
      const message = [
        `Hola DoctorCell Quito, registré mi consulta ${caseId} y quiero cotizar una reparación.`,
        `Nombre: ${payload.name}.`, `WhatsApp: ${payload.contact}.`, `Problema: ${payload.problem}.`,
        `Equipo: ${[payload.brand, payload.model].filter(Boolean).join(" ") || "por confirmar"}.`,
        `Sucursal preferida: ${payload.location || "ayúdenme a elegir"}.`,
        "¿Me ayudan con una orientación preliminar de valor y tiempo?"
      ].join(" ");
      const href = whatsappUrl(message);
      setSaved({ caseId, href });
      try {
        trackEvent("generate_lead", { lead_source: "quote_finder", case_id: caseId }, "Lead");
        trackEvent("whatsapp_click", { placement: "quote_finder", branch: branches.find((item) => item.name === payload.location)?.slug || "general", page_path: window.location.pathname }, "Contact");
      }
      catch { /* Measurement availability must not block a saved consultation. */ }
      // Same-tab navigation remains reliable after the asynchronous save.
      window.location.assign(href);
    } catch {
      setErrors({ submit: "No pudimos confirmar el registro. Tus datos siguen en el formulario; inténtalo de nuevo antes de continuar a WhatsApp." });
    } finally {
      submittingRef.current = false;
      setSaving(false);
    }
  };

  return (
    <section className="quote-finder" id="cotizador" aria-labelledby="quote-title">
      <div className="quote-intro">
        <p className="eyebrow">02 / CONECTEMOS</p>
        <h2 id="quote-title">Cuéntanos qué le pasa a tu equipo.</h2>
        <p>Solo necesitamos tu nombre, WhatsApp y la falla. Con tu autorización, guardamos la consulta antes de abrir el chat para poder contactarte aunque no envíes el mensaje.</p>
        <div className="quote-route" aria-label="Cómo enviar tu consulta">
          <span>Tu contacto</span><ArrowRight size={14} /><span>Consulta guardada</span><ArrowRight size={14} /><span>WhatsApp</span>
        </div>
      </div>
      {saved ? <div className="quote-confirmation" role="status">
        <CheckCircle2 size={28} />
        <h3>Tu consulta quedó registrada</h3>
        <p>Caso <strong>{saved.caseId}</strong>. Ya tenemos tus datos para gestionar tu consulta.</p>
        <a className="button whatsapp-submit" href={saved.href} data-analytics-placement="quote_finder" data-analytics-branch={branches.find((item) => item.name === form.branch)?.slug || "general"}><MessageCircle size={19} /> Abrir WhatsApp</a>
        <small>Puedes enviar la foto de tu equipo directamente en el chat.</small>
      </div> : <form className="quote-form" noValidate onSubmit={submit}>
        <fieldset className="quote-fields" aria-label="Datos para tu consulta" disabled={saving}>
          <label><span>Tu nombre</span><input {...fieldProps("name")} autoComplete="name" required minLength={2} maxLength={100} value={form.name} onChange={update("name")} placeholder="Tu nombre" />{fieldError("name")}</label>
          <label><span>Tu WhatsApp</span><input {...fieldProps("phone")} type="tel" autoComplete="tel" required maxLength={30} value={form.phone} onChange={update("phone")} placeholder="09 9999 9999" />{fieldError("phone")}</label>
          <label className="quote-problem"><span>¿Qué le pasa a tu equipo?</span><select {...fieldProps("problem")} required value={form.problem} onChange={update("problem")}><option value="">Selecciona la falla</option>{diagnostics.map(({ title }) => <option key={title}>{title}</option>)}</select>{fieldError("problem")}</label>
          <details className="quote-optional">
            <summary>Añadir marca, modelo o sucursal (opcional)</summary>
            <div className="quote-optional-fields">
              <label><span>Marca</span><select name="brand" value={form.brand} onChange={update("brand")}><option value="">No lo sé todavía</option>{brands.map((item) => <option key={item}>{item}</option>)}</select></label>
              <label><span>Modelo</span><input name="model" value={form.model} maxLength={100} onChange={update("model")} placeholder="Ej. iPhone 11" /></label>
              <label className="quote-branch"><span>Sucursal preferida</span><select name="branch" value={form.branch} onChange={update("branch")}><option value="">Ayúdenme a elegir</option>{branches.map(({ name }) => <option key={name}>{name}</option>)}</select><button className="nearest-branch-button" type="button" onClick={selectNearestBranch}><LocateFixed size={17} /> Usar mi ubicación</button>{locationStatus && <small role="status">{locationStatus}</small>}</label>
            </div>
          </details>
          <label className="quote-consent"><input {...fieldProps("consent")} type="checkbox" required checked={form.consent} onChange={update("consent")} /><span>Autorizo a DoctorCell a guardar estos datos y contactarme para gestionar esta consulta, incluidos sus seguimientos.</span></label>
          {fieldError("consent")}
        </fieldset>
        {errors.submit && <p className="quote-submit-error" role="alert">{errors.submit}</p>}
        <button className="button whatsapp-submit" type="submit" disabled={saving}>
          {saving ? <LoaderCircle className="spin" size={19} /> : <MessageCircle size={19} />}
          {saving ? "Guardando tu consulta…" : "Guardar consulta y abrir WhatsApp"}
        </button>
        <small>El diagnóstico, el precio y el tiempo se confirman al revisar el equipo. Puedes enviar una foto directamente en WhatsApp.</small>
      </form>}
    </section>
  );
}
