import React, { useRef, useState } from "react";
import { ArrowRight, CheckCircle2, LoaderCircle, LocateFixed, MessageCircle } from "lucide-react";
import { brands, branches } from "../data/siteData.js";
import { whatsappUrl } from "../utils/whatsapp.js";
import { isValidWhatsAppPhone } from "../utils/contact.js";
import { captureQuoteLead } from "../utils/leads.js";
import { trackEvent } from "../utils/analytics.js";
import { deviceTypes, repairTypes, modelSuggestions } from '../data/conversionContent.js';

export default function QuoteFinder() {
  const [form, setForm] = useState({ name: "", phone: "", device: '', detail: '', problem: "", brand: "", model: "", branch: "", consent: false });
  const [photo, setPhoto] = useState(null);
  const [photoError, setPhotoError] = useState('');
  const startedRef = useRef(false);
  const confirmationRef = useRef(null);
  const [locationStatus, setLocationStatus] = useState("");
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(null);
  const requestRef = useRef(null);
  const submittingRef = useRef(false);
  const update = (key) => (event) => {
    const value = key === "consent" ? event.target.checked : event.target.value;
    if (!startedRef.current) { startedRef.current = true; trackEvent('quote_start', { placement: 'quote_finder' }); }
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
    for (const [key, label] of [['device', 'el tipo de equipo'], ['brand', 'la marca'], ['model', 'el modelo'], ['detail', 'una descripción breve de la falla']]) {
      if (!form[key].trim()) invalid[key] = `Indica ${label}.`;
    }
    if (!form.consent) invalid.consent = "Necesitamos tu autorización para guardar la consulta y contactarte.";
    setErrors(invalid);
    if (Object.keys(invalid).length) {
      formElement.elements.namedItem(Object.keys(invalid)[0])?.focus();
      return;
    }

    const payload = {
      name: form.name.trim(), contact: form.phone.trim(), problem: form.problem,
      brand: form.brand, model: form.model.trim(), location: form.branch,
      device: form.device, detail: form.detail.trim(), service: "Cotización de reparación", consent: form.consent
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
        `Tipo de equipo: ${payload.device}. Detalle: ${payload.detail}.`,
        `Sucursal preferida: ${payload.location || "ayúdenme a elegir"}.`,
        "¿Me ayudan con una orientación preliminar de valor y tiempo?"
      ].join(" ");
      const href = whatsappUrl(message);
      setSaved({ caseId, href });
      try {
        trackEvent("generate_lead", { lead_source: "quote_finder" }, "Lead");
        trackEvent('quote_submit', { placement: 'quote_finder' });
      }
      catch { /* Measurement availability must not block a saved consultation. */ }
      requestAnimationFrame(() => confirmationRef.current?.focus());
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
        <h2 id="quote-title">Empecemos por tu equipo.</h2>
        <p>Déjanos tu nombre, WhatsApp y la falla. Con tu autorización, guardamos la consulta para contactarte aunque no envíes el mensaje de WhatsApp.</p>
        <div className="quote-route" aria-label="Cómo enviar tu consulta">
          <span>Tu contacto</span><ArrowRight size={14} /><span>Consulta guardada</span><ArrowRight size={14} /><span>WhatsApp</span>
        </div>
      </div>
      {saved ? <div className="quote-confirmation" role="status">
        <CheckCircle2 size={28} />
        <h3>Tu consulta quedó registrada</h3>
        <p ref={confirmationRef} tabIndex={-1}>Recibimos tu solicitud. Un asesor te contactará por WhatsApp para confirmar disponibilidad de repuesto, diagnóstico y precio final.</p>
        <p>Referencia: <strong>{saved.caseId}</strong>.</p>
        <a className="button whatsapp-submit" href={saved.href} target="_blank" rel="noopener noreferrer" data-analytics-placement="quote_finder" data-analytics-branch={branches.find((item) => item.name === form.branch)?.slug || "general"}><MessageCircle size={19} /> Continuar por WhatsApp</a>
        <small>Puedes enviar la foto de tu equipo directamente en el chat.</small>
      </div> : <form className="quote-form" noValidate onSubmit={submit}>
        <fieldset className="quote-fields" aria-label="Datos para tu consulta" disabled={saving}>
          <label><span>Tu nombre</span><input {...fieldProps("name")} autoComplete="name" required minLength={2} maxLength={100} value={form.name} onChange={update("name")} placeholder="Tu nombre" />{fieldError("name")}</label>
          <label><span>Tu WhatsApp</span><input {...fieldProps("phone")} type="tel" autoComplete="tel" required maxLength={30} value={form.phone} onChange={update("phone")} placeholder="09 9999 9999" />{fieldError("phone")}</label>
          <label><span>Tipo de equipo</span><select {...fieldProps('device')} required value={form.device} onChange={update('device')}><option value="">Selecciona tu equipo</option>{deviceTypes.map((item) => <option key={item}>{item}</option>)}</select>{fieldError('device')}</label>
          <label className="quote-problem"><span>¿Qué le pasa a tu equipo?</span><select {...fieldProps("problem")} required value={form.problem} onChange={update("problem")}><option value="">Selecciona la falla</option>{repairTypes.map((title) => <option key={title}>{title}</option>)}</select>{fieldError("problem")}</label>
          <div className="quote-optional">
            <div className="quote-optional-fields">
              <label><span>Marca</span><select {...fieldProps('brand')} required value={form.brand} onChange={update("brand")}><option value="">Selecciona la marca</option>{brands.map((item) => <option key={item}>{item}</option>)}</select>{fieldError('brand')}</label>
              <label><span>Modelo</span><input {...fieldProps('model')} required list="quote-models" value={form.model} maxLength={100} onChange={update("model")} placeholder="Ej. iPhone 11" />{fieldError('model')}<datalist id="quote-models">{modelSuggestions.map((item) => <option key={item} value={item} />)}</datalist></label>
              <label className="quote-branch"><span>Sucursal preferida</span><select name="branch" value={form.branch} onChange={update("branch")}><option value="">Ayúdenme a elegir</option>{branches.map(({ name }) => <option key={name}>{name}</option>)}</select><button className="nearest-branch-button" type="button" onClick={selectNearestBranch}><LocateFixed size={17} /> Usar mi ubicación</button>{locationStatus && <small role="status">{locationStatus}</small>}</label>
            </div>
          </div>
          <label className="quote-problem"><span>Descripción breve</span><textarea {...fieldProps('detail')} required maxLength={500} rows={3} value={form.detail} onChange={update('detail')} placeholder="Desde cuándo ocurre, síntomas y antecedentes" />{fieldError('detail')}</label>
          <label className="quote-problem"><span>Foto opcional (JPG, PNG o WebP, máximo 5 MB)</span><input type="file" accept="image/jpeg,image/png,image/webp" aria-describedby="quote-photo-note" onChange={(event) => { const file = event.target.files?.[0]; setPhoto(null); setPhotoError(''); if (!file) return; if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 5 * 1024 * 1024) { setPhotoError('Selecciona JPG, PNG o WebP de hasta 5 MB.'); event.target.value = ''; return; } setPhoto(file.name); }} /><small id="quote-photo-note">La foto no se sube ni se envía con el formulario. Adjunta el archivo manualmente al continuar en WhatsApp.</small>{photo && <small>Seleccionada: {photo}</small>}{photoError && <small role="alert">{photoError}</small>}</label>
          <label className="quote-consent"><input {...fieldProps("consent")} type="checkbox" required checked={form.consent} onChange={update("consent")} /><span>He leído la <a href="/politica-privacidad/" target="_blank" rel="noopener noreferrer">política de privacidad</a> y autorizo guardar mis datos y contactarme para gestionar esta consulta, incluidos sus seguimientos. Consulta los <a href="/terminos-y-condiciones/" target="_blank" rel="noopener noreferrer">términos del servicio</a>.</span></label>
          {fieldError("consent")}
        </fieldset>
        {errors.submit && <p className="quote-submit-error" role="alert">{errors.submit}</p>}
        <button className="button whatsapp-submit" type="submit" disabled={saving}>
          {saving ? <LoaderCircle className="spin" size={19} /> : <MessageCircle size={19} />}
          {saving ? "Guardando tu consulta…" : "Enviar solicitud de cotización"}
        </button>
        <small>El diagnóstico, el precio y el tiempo se confirman al revisar el equipo. Puedes enviar una foto directamente en WhatsApp.</small>
      </form>}
    </section>
  );
}
