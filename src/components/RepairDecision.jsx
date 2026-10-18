import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowUpRight, Check, CheckCircle2, Copy, GitCompareArrows, MessageCircle, RotateCcw, Share2, ShieldCheck, Smartphone, Sparkles, TriangleAlert } from "lucide-react";
import { branches } from "../data/siteData.js";
import { trackEvent } from "../utils/analytics.js";
import { whatsappUrl } from "../utils/whatsapp.js";
import { ageOptions, conditionOptions, decisionBrands, decisionPath, decisionSummary, decisionUrl, emptyDecision, evaluateRepair, normalizeDecision, problemOptions, readDecisionHash } from "../utils/repairDecision.js";
import "../styles/repair-decision.css";

export function RepairDecisionTeaser() {
  return <section className="decision-teaser" aria-labelledby="decision-teaser-title">
    <div className="decision-teaser-icon" aria-hidden="true"><Smartphone size={38} /><span><GitCompareArrows size={20} /></span></div>
    <div><p className="eyebrow">ANTES DE DECIDIR</p><h2 id="decision-teaser-title">¿Conviene reparar mi celular?</h2><p>Compara tus opciones en un minuto. Obtén una orientación, compártela y cotiza con nuestro equipo.</p></div>
    <a className="decision-primary" href={decisionPath}>Evaluar mi celular <ArrowUpRight size={19} /></a>
  </section>;
}

function SelectField({ name, label, options, value, onChange }) {
  return <label className="decision-field"><span>{label}</span><select name={name} value={value} onChange={onChange} required><option value="">Selecciona una opción</option>{Object.entries(options).map(([key, text]) => <option key={key} value={key}>{text}</option>)}</select></label>;
}

export default function RepairDecision() {
  const [answers, setAnswers] = useState(emptyDecision);
  const [submitted, setSubmitted] = useState(null);
  const [branch, setBranch] = useState("");
  const [status, setStatus] = useState("");
  const [manualCopy, setManualCopy] = useState(false);
  const [canShare, setCanShare] = useState(false);
  const [sharedVisit, setSharedVisit] = useState(false);
  const resultHeading = useRef(null);
  const formHeading = useRef(null);
  const copyField = useRef(null);
  const focusAfterSubmit = useRef(false);

  useEffect(() => {
    setCanShare(Boolean(navigator.share));
    const restore = () => {
      const restored = readDecisionHash(window.location.hash);
      setAnswers(restored || emptyDecision);
      setSubmitted(restored);
      setSharedVisit(Boolean(restored));
      setStatus(window.location.hash && !restored ? "Este enlace no contiene un resultado válido. Puedes hacer una nueva evaluación." : "");
    };
    restore();
    window.addEventListener("hashchange", restore);
    return () => window.removeEventListener("hashchange", restore);
  }, []);

  useEffect(() => {
    if (submitted && focusAfterSubmit.current) {
      resultHeading.current?.focus();
      resultHeading.current?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
      focusAfterSubmit.current = false;
    }
  }, [submitted]);

  useEffect(() => { if (manualCopy) { copyField.current?.focus(); copyField.current?.select(); } }, [manualCopy]);

  const result = submitted ? evaluateRepair(submitted) : null;
  const shareUrl = submitted ? decisionUrl(submitted, typeof window === "undefined" ? undefined : window.location.origin) : "";
  const summary = submitted ? decisionSummary(submitted) : "";
  const shareMessage = `${summary}\n\nMira mi resultado y evalúa tu celular:\n${shareUrl}`;
  const quoteMessage = `${summary}\n\nHola DoctorCell, usé la herramienta y quiero cotizar mi reparación.\nSucursal preferida: ${branch || "Necesito ayuda para elegir una sucursal"}.\n¿Me confirman la viabilidad, el precio total y el tiempo?`;

  const change = (event) => {
    setAnswers((current) => ({ ...current, [event.target.name]: event.target.value }));
    setStatus("");
  };

  const calculate = (event) => {
    event.preventDefault();
    const normalized = normalizeDecision(answers);
    if (!normalized) { setStatus("Revisa la marca, el modelo y las respuestas sobre tu equipo."); return; }
    setAnswers(normalized);
    focusAfterSubmit.current = true;
    setSubmitted(normalized);
    setSharedVisit(false);
    setManualCopy(false);
    setStatus("");
    window.history.replaceState(null, "", decisionUrl(normalized, window.location.origin));
    trackEvent("repair_decision_complete", { outcome: evaluateRepair(normalized).outcome });
  };

  const edit = (reset = false) => {
    setSubmitted(null);
    if (reset) { setAnswers(emptyDecision); setBranch(""); }
    setStatus(""); setManualCopy(false); setSharedVisit(false);
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    requestAnimationFrame(() => formHeading.current?.focus());
  };

  const copyLink = async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(shareUrl);
      setStatus("Enlace copiado. Quien lo abra verá este mismo resultado.");
      setManualCopy(false);
      trackEvent("repair_decision_share", { method: "copy", outcome: result.outcome });
    } catch {
      setManualCopy(true);
      setStatus("Selecciona y copia el enlace que aparece abajo para compartir tu resultado.");
    }
  };

  const share = async () => {
    try {
      await navigator.share({ title: "¿Conviene reparar mi celular? · DoctorCell", text: summary, url: shareUrl });
      setStatus("Resultado compartido.");
      trackEvent("repair_decision_share", { method: "native", outcome: result.outcome });
    } catch (error) { if (error.name !== "AbortError") await copyLink(); }
  };

  return <section className="repair-decision" aria-labelledby="decision-title">
    <a className="decision-back" href="/"><ArrowLeft size={16} /> Volver al inicio</a>
    <header className="decision-intro">
      <p className="eyebrow"><Sparkles size={14} /> UNA DECISIÓN CON MÁS INFORMACIÓN</p>
      <h1 id="decision-title">¿Conviene reparar<br />mi <em>celular?</em></h1>
      <p>Antes de cambiarlo, compara tus opciones. Cuéntanos cómo está tu equipo y recibe una orientación para dar el siguiente paso.</p>
      <div className="decision-benefits"><span><Check size={15} /> Cerca de 1 minuto</span><span><Check size={15} /> Sin registrarte</span><span><Share2 size={15} /> Resultado para compartir</span></div>
    </header>

    <div className="decision-workspace">
      {!submitted ? <form className="decision-form" onSubmit={calculate}>
        <div className="decision-card-heading"><span className="decision-step">01</span><div><h2 ref={formHeading} tabIndex={-1}>Cuéntanos sobre tu equipo</h2><p>Completa los datos para orientar tu decisión.</p></div><Smartphone size={25} /></div>
        <div className="decision-fields">
          <SelectField name="brand" label="Marca" options={Object.fromEntries(decisionBrands.map((brand) => [brand, brand]))} value={answers.brand} onChange={change} />
          <label className="decision-field"><span>Modelo</span><input name="model" value={answers.model} onChange={change} required maxLength={80} pattern=".*\S.*" placeholder="Ej. iPhone 13 o Galaxy A54" autoComplete="off" /><small>Escribe solo el modelo, sin datos personales.</small></label>
          <div className="decision-full"><SelectField name="problem" label="¿Qué le pasa?" options={problemOptions} value={answers.problem} onChange={change} /></div>
          <SelectField name="age" label="¿Cuánto tiempo llevas usándolo?" options={ageOptions} value={answers.age} onChange={change} />
          <SelectField name="condition" label="Antes de esta falla…" options={conditionOptions} value={answers.condition} onChange={change} />
        </div>
        <button className="decision-primary decision-submit" type="submit">Ver mi orientación <ArrowUpRight size={19} /></button>
        <p className="decision-form-note">El resultado es preliminar. El diagnóstico y el precio se confirman al revisar el celular.</p>
      </form> : <div className={`decision-result decision-result-${result.outcome}`}>
        {sharedVisit && <p className="decision-shared"><Share2 size={15} /> Estás viendo un resultado compartido. <button type="button" onClick={() => edit(true)}>Evaluar mi celular</button></p>}
        <div className="decision-result-top"><span className="decision-result-icon">{result.outcome === "diagnosis" ? <TriangleAlert size={28} /> : <CheckCircle2 size={28} />}</span><span className="eyebrow">TU ORIENTACIÓN</span><button type="button" onClick={() => edit()}><RotateCcw size={14} /> Editar respuestas</button></div>
        <p className="decision-device">{submitted.brand} {submitted.model}</p>
        <h2 ref={resultHeading} tabIndex={-1}>{result.title}</h2>
        <p className="decision-explanation">{result.explanation}</p>
        {result.precaution && <p className="decision-precaution"><TriangleAlert size={20} /><span>{result.precaution}</span></p>}
        <dl className="decision-facts"><div><dt>Falla</dt><dd>{problemOptions[submitted.problem]}</dd></div><div><dt>Tiempo de uso</dt><dd>{ageOptions[submitted.age]}</dd></div><div><dt>Estado previo</dt><dd>{conditionOptions[submitted.condition]}</dd></div></dl>
        <h3>Antes de decidir</h3><ul className="decision-next-steps">{result.nextSteps.map((step) => <li key={step}><Check size={16} /><span>{step}</span></li>)}</ul>
        <div className="decision-quote"><label className="decision-field"><span>¿Dónde te gustaría que lo revisemos?</span><select value={branch} onChange={(event) => setBranch(event.target.value)}><option value="">Ayúdenme a elegir una sucursal</option>{branches.map((item) => <option key={item.slug} value={item.name}>{item.name}</option>)}</select></label><a className="decision-primary" href={whatsappUrl(quoteMessage)} target="_blank" rel="noopener noreferrer" data-analytics-placement="repair_decision_quote" data-analytics-branch={branches.find((item) => item.name === branch)?.slug || "general"}><MessageCircle size={19} /> Cotizar mi reparación por WhatsApp <ArrowUpRight size={17} /></a><small>Tus respuestas aparecerán en el mensaje. Revísalo y envíalo cuando quieras.</small></div>
        <div className="decision-share"><h3>Comparte tu resultado</h3><p>El enlace incluye el modelo y tus respuestas sobre el estado del equipo. Quien lo reciba podrá ver esta orientación y evaluar su propio celular.</p><div className="decision-share-actions">{canShare && <button type="button" onClick={share}><Share2 size={17} /> Compartir resultado</button>}<button type="button" onClick={copyLink}><Copy size={17} /> Copiar enlace</button><a href={`https://wa.me/?text=${encodeURIComponent(shareMessage)}`} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("repair_decision_share", { method: "whatsapp", outcome: result.outcome })} data-analytics-placement="repair_decision_share" data-analytics-intent="share"><MessageCircle size={17} /> Compartir por WhatsApp</a></div>{manualCopy && <label className="decision-field decision-copy-field"><span>Enlace de tu resultado</span><input ref={copyField} readOnly value={shareUrl} onFocus={(event) => event.target.select()} /></label>}</div>
        <p className="decision-form-note">Orientación preliminar. El diagnóstico, precio y viabilidad se confirman al revisar el equipo.</p>
      </div>}

      <aside className="decision-guide"><div className="decision-guide-icon"><GitCompareArrows size={30} /></div><p className="eyebrow">CÓMO LO EVALUAMOS</p><h2>La falla importa.<br />El estado, también.</h2><p>Consideramos la falla, el tiempo de uso y cómo funcionaba tu celular antes del problema.</p><div className="decision-guide-rule"><span>01</span><p><strong>La falla de tu celular</strong>Identificamos qué necesita una revisión técnica y qué información conviene llevar al cotizar.</p></div><div className="decision-guide-rule"><span>02</span><p><strong>El estado y el tiempo de uso</strong>Consideramos si funcionaba bien, si tiene otras fallas y si todavía cubre tus necesidades.</p></div><div className="decision-guide-rule"><span>03</span><p><strong>Tu caso es único</strong>Son criterios orientativos, no una tasación. Otras fallas, antigüedad, actualizaciones y tus necesidades pueden cambiar la decisión.</p></div><div className="decision-guide-footer"><ShieldCheck size={20} /><p>Decides después de conocer y autorizar el precio.</p></div></aside>
    </div>
    <p className="decision-status" role="status" aria-live="polite">{status}</p>
  </section>;
}
