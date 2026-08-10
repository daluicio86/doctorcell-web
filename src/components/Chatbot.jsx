import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertCircle, ArrowLeft, Bot, CheckCircle2,
  LoaderCircle, MessageCircle, Paperclip, RotateCcw,
  Send, Sparkles, UserRound, X
} from "lucide-react";
import { branches, diagnostics } from "../data/siteData.js";
import { whatsappUrl } from "../utils/whatsapp.js";
import { captureChatbotLead } from "../utils/leads.js";
import { trackEvent } from "../utils/analytics.js";
import "../styles/chatbot.css";

const STORAGE_KEY = "doctorcell-diagnostic-v2";
const initialAnswers = { device: "", brand: "", model: "", problem: "", detail: "", service: "", location: "", schedule: "", contact: "", consent: false };
const welcome = [
  { id: 1, from: "bot", text: "¡Hola! Soy el asistente de DoctorCell Quito. Haré un diagnóstico preliminar de tu equipo." },
  { id: 2, from: "bot", text: "¿Qué tipo de equipo necesitas revisar?" }
];
const flow = ["device", "brand", "model", "problem", "detail", "diagnosis", "service", "location", "schedule", "contact", "consent", "complete"];
const optionSets = {
  device: ["Celular", "Tablet", "Smartwatch", "Otro"],
  brand: ["Apple", "Samsung", "Xiaomi", "Huawei", "Motorola", "No sé", "Otra"],
  problem: [...diagnostics.map(({ title }) => title).filter((title) => title !== "Otro problema"), "No sé", "Otro"],
  detail: ["Empezó hoy", "Hace varios días", "Es intermitente", "No sé"],
  service: ["Ver cotización", "Hablar con un asesor"],
  location: [...branches.map(({ name }) => name), "Atención a domicilio", "No sé todavía"],
  schedule: ["Hoy", "Mañana", "Esta semana", "Coordinar con asesor"],
  consent: ["Acepto y crear caso", "No guardar mis datos"]
};

const normalize = (value = "") => value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
function detectProblem(value) {
  const text = normalize(value);
  if (/agua|moj|humedad|liquido/.test(text)) return ["Se mojó", 92];
  if (/pantalla|vidrio|touch|tactil|display|linea|mancha|quebr/.test(text)) return ["Pantalla rota", 90];
  if (/bateria|descarga|calienta|hinch|apaga/.test(text)) return ["Batería", 86];
  if (/carga|cargador|puerto|conector|no prende|no enciende/.test(text)) return ["No carga", 84];
  if (/camara|audio|parlante|microfono|sensor/.test(text)) return ["Cámara o audio", 88];
  if (/software|lento|bloque|reinicia|actualiza|virus/.test(text)) return ["Software", 78];
  return ["Otro problema", 45];
}

const estimates = {
  "Pantalla rota": { service: "Revisión y posible cambio de pantalla", price: "$35–$160", time: "1–3 horas" },
  "No carga": { service: "Diagnóstico de batería y sistema de carga", price: "$20–$70", time: "1–2 horas" },
  "Cámara o audio": { service: "Revisión de cámara, audio o sensores", price: "$25–$90", time: "1–3 horas" },
  "Se mojó": { service: "Limpieza técnica y diagnóstico por humedad", price: "$20–$80", time: "24–72 horas" },
  "Batería": { service: "Prueba y posible cambio de batería", price: "$25–$85", time: "1–2 horas" },
  "Software": { service: "Diagnóstico y servicio de software", price: "$20–$50", time: "1–4 horas" },
  "Tablet / iWatch": { service: "Diagnóstico especializado", price: "$30–$120", time: "1–3 días" },
  "Otro problema": { service: "Diagnóstico técnico completo", price: "Desde $20", time: "Según revisión" }
};

export default function Chatbot() {
  const restored = useMemo(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "null"); } catch { return null; }
  }, []);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(restored?.messages || welcome);
  const [step, setStep] = useState(restored?.step || "device");
  const [answers, setAnswers] = useState({ ...initialAnswers, ...(restored?.answers || {}) });
  const [input, setInput] = useState("");
  const [photos, setPhotos] = useState([]);
  const [typing, setTyping] = useState(false);
  const [error, setError] = useState("");
  const [savingLead, setSavingLead] = useState(false);
  const nextId = useRef(Math.max(3, ...messages.map((item) => item.id + 1)));
  const fileInput = useRef(null);
  const messageBox = useRef(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ messages, step, answers }));
    messageBox.current?.scrollTo({ top: messageBox.current.scrollHeight, behavior: "smooth" });
  }, [messages, step, answers]);
  const add = (...items) => setMessages((current) => [...current, ...items.map((item) => ({ id: nextId.current++, ...item }))]);
  const botReply = (text, extra = {}) => {
    setTyping(true);
    window.setTimeout(() => { setTyping(false); add({ from: "bot", text, ...extra }); }, 450);
  };
  const diagnosis = useMemo(() => {
    const inferred = detectProblem(`${answers.problem} ${answers.detail}`);
    const problem = answers.problem && !["No sé", "Otro"].includes(answers.problem) ? answers.problem : inferred[0];
    return { problem, confidence: problem === inferred[0] ? inferred[1] : 82, ...(estimates[problem] || estimates["Otro problema"]) };
  }, [answers]);

  const advance = (value) => {
    setError("");
    add({ from: "user", text: value });
    if (step === "device") { setAnswers((a) => ({ ...a, device: value })); setStep("brand"); botReply("¿Cuál es la marca?"); }
    if (step === "brand") { setAnswers((a) => ({ ...a, brand: value })); setStep("model"); botReply("Escribe el modelo exacto si lo conoces. También puedes responder “No sé”."); }
    if (step === "model") { setAnswers((a) => ({ ...a, model: value })); setStep("problem"); botReply("¿Cuál es el problema principal?"); }
    if (step === "problem") { setAnswers((a) => ({ ...a, problem: value })); setStep("detail"); botReply("Cuéntame qué sucede, cuándo empezó y si el equipo sufrió un golpe o contacto con líquido."); }
    if (step === "detail") { setAnswers((a) => ({ ...a, detail: value })); setStep("diagnosis"); botReply("Preparé un diagnóstico preliminar con la información disponible.", { result: true }); }
    if (step === "service") {
      setAnswers((a) => ({ ...a, service: value }));
      if (value.includes("asesor")) { setStep("contact"); botReply("Transferiré el historial completo. Déjame un teléfono o correo para contactarte."); }
      else { setStep("location"); botReply("La disponibilidad del repuesto debe confirmarse con la sucursal. ¿Dónde prefieres recibir atención?"); }
    }
    if (step === "location") { setAnswers((a) => ({ ...a, location: value })); setStep("schedule"); botReply("¿Cuándo te gustaría agendar?"); }
    if (step === "schedule") { setAnswers((a) => ({ ...a, schedule: value })); setStep("contact"); botReply("Escribe tu WhatsApp o correo para enviarte la confirmación."); }
    if (step === "contact") { setAnswers((a) => ({ ...a, contact: value })); setStep("consent"); botReply("Antes de continuar: ¿autorizas guardar estos datos para gestionar tu caso y contactarte?"); }
    if (step === "consent") {
      const accepted = value.startsWith("Acepto");
      if (!accepted) {
        setAnswers((a) => ({ ...a, consent: false, caseId: "Sin registro" })); setStep("complete");
        botReply("No guardaremos tus datos. Puedes continuar por WhatsApp sin crear un caso.");
        return;
      }
      setSavingLead(true);
      captureChatbotLead(answers)
        .then(({ caseId }) => {
          trackEvent("generate_lead", { lead_source: "chatbot", case_id: caseId }, "Lead");
          setAnswers((a) => ({ ...a, consent: true, caseId }));
          setStep("complete");
          botReply(`Caso ${caseId} registrado. Un asesor ya puede ver tu solicitud y contactarte.`, { result: true });
        })
        .catch((requestError) => {
          setError(`${requestError.message} Puedes reintentar o continuar por WhatsApp.`);
          add({ from: "bot", text: "No pude confirmar el registro todavía. Tus datos siguen guardados en este navegador." });
        })
        .finally(() => setSavingLead(false));
    }
  };

  const validateAndSubmit = (event) => {
    event.preventDefault();
    const text = input.trim();
    if (!text) { setError("Escribe una respuesta o elige una opción."); return; }
    if (text.length < 2) { setError("Necesito un poco más de información para continuar."); return; }
    if (step === "contact" && !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text) || /\d{7,}/.test(text.replace(/\D/g, "")))) {
      setError("Ingresa un correo válido o un teléfono de al menos 7 dígitos."); return;
    }
    setInput("");
    if (["diagnosis", "complete"].includes(step)) { add({ from: "user", text }); botReply("Un asesor podrá responder esa consulta con el historial de tu caso."); return; }
    advance(text);
  };

  const goBack = () => {
    const index = flow.indexOf(step);
    if (index <= 0) return;
    const previous = flow[index - 1] === "diagnosis" ? "detail" : flow[index - 1];
    setStep(previous); setError("");
    add({ from: "bot", text: "Puedes corregir tu respuesta anterior." });
  };
  const reset = () => {
    setMessages(welcome); setStep("device"); setAnswers(initialAnswers); setInput(""); setPhotos([]); setError("");
    nextId.current = 3; localStorage.removeItem(STORAGE_KEY);
  };
  const cancel = () => { reset(); setOpen(false); };
  const handlePhotos = (event) => {
    const files = [...event.target.files].filter((file) => file.type.startsWith("image/")).slice(0, 3 - photos.length);
    if (!files.length) { setError("Selecciona una imagen JPG, PNG o WebP."); return; }
    setPhotos((current) => [...current, ...files.map((file) => ({ name: file.name, url: URL.createObjectURL(file) }))]);
    add({ from: "user", text: `${files.length} foto(s) adjunta(s) al diagnóstico.` }); event.target.value = "";
  };

  const summary = `Hola DoctorCell Quito. Caso: ${answers.caseId || "por crear"}. Equipo: ${answers.device} ${answers.brand} ${answers.model}. Problema: ${diagnosis.problem}. Detalle: ${answers.detail}. Diagnóstico preliminar (${diagnosis.confidence}%): ${diagnosis.service}. Estimado: ${diagnosis.price}, ${diagnosis.time}. Atención: ${answers.location || "por definir"}. Fecha: ${answers.schedule || "por definir"}. Contacto: ${answers.contact || "por definir"}.`;
  const progress = `${Math.max(8, Math.round(((flow.indexOf(step) + 1) / flow.length) * 100))}%`;

  return <>
    <button className="chatbot-launcher" type="button" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="doctorcell-chatbot"><Sparkles size={22} /><span>Diagnosticar mi equipo</span></button>
    {open && <aside className="chatbot-panel" id="doctorcell-chatbot" aria-label="Asistente de diagnóstico">
      <header className="chatbot-header">
        <span className="chatbot-avatar"><Bot size={22} /></span><div><strong>Asistente DoctorCell Quito</strong><small><i /> En línea · diagnóstico guiado</small></div>
        <button type="button" onClick={() => setOpen(false)} aria-label="Cerrar y conservar conversación"><X size={21} /></button>
      </header>
      <div className="chatbot-toolbar">
        <button type="button" onClick={goBack} disabled={step === "device"}><ArrowLeft size={15} /> Volver</button>
        <button type="button" onClick={reset}><RotateCcw size={14} /> Reiniciar</button>
        <button type="button" onClick={cancel}><X size={14} /> Cancelar</button>
      </div>
      <div className="chatbot-progress" aria-label={`Progreso ${progress}`}><span style={{ width: progress }} /></div>
      <div className="chatbot-messages" ref={messageBox} role="log" aria-live="polite">
        {messages.map((message) => <div className={`chatbot-message is-${message.from}`} key={message.id}><div className={message.result ? "is-result" : ""}>{message.result && <CheckCircle2 size={18} />}<span>{message.text}</span></div></div>)}
        {step === "diagnosis" && <div className="chatbot-diagnosis">
          <div><strong>Diagnóstico preliminar</strong><b>{diagnosis.confidence}% confianza</b></div>
          <h3>{diagnosis.problem}</h3><p>{diagnosis.service}</p>
          <dl><div><dt>Precio referencial</dt><dd>{diagnosis.price}</dd></div><div><dt>Tiempo estimado</dt><dd>{diagnosis.time}</dd></div><div><dt>Repuesto</dt><dd>Por confirmar</dd></div></dl>
          <small>No sustituye la revisión física del equipo.</small>
          <button type="button" onClick={() => { setStep("service"); botReply("¿Cómo deseas continuar?"); }}>Continuar</button>
        </div>}
        {typing && <div className="chatbot-typing" aria-label="El asistente está escribiendo"><span /><span /><span /></div>}
      </div>
      {photos.length > 0 && <div className="chatbot-photos">{photos.map((photo) => <img src={photo.url} alt={photo.name} key={photo.url} />)}</div>}
      {optionSets[step] && <div className="chatbot-options" aria-label="Respuestas rápidas">{optionSets[step].map((choice) => <button type="button" key={choice} onClick={() => advance(choice)} disabled={typing || savingLead}>{choice}</button>)}</div>}
      {step === "complete" && <div className="chatbot-result-actions">
        <a href={whatsappUrl(summary)} target="_blank" rel="noopener noreferrer"><MessageCircle size={17} /> Confirmar por WhatsApp</a>
        <button type="button" onClick={() => { setStep("contact"); botReply("Conservaré el historial para el asesor."); }}><UserRound size={15} /> Hablar con un asesor</button>
      </div>}
      {error && <p className="chatbot-error"><AlertCircle size={14} /> {error}</p>}
      <form className="chatbot-input" onSubmit={validateAndSubmit}>
        <input ref={fileInput} className="chatbot-file" type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={handlePhotos} />
        <button className="chatbot-attach" type="button" onClick={() => fileInput.current?.click()} aria-label="Adjuntar fotos" disabled={photos.length >= 3}><Paperclip size={18} /></button>
        <label className="sr-only" htmlFor="chatbot-message">Escribe tu mensaje</label>
        <input id="chatbot-message" value={input} onChange={(event) => { setInput(event.target.value); setError(""); }} placeholder={step === "model" ? "Ej. Galaxy A54 o No sé" : "Escribe tu respuesta…"} autoComplete="off" maxLength={500} />
        <button type="submit" aria-label="Enviar mensaje" disabled={typing}>{typing ? <LoaderCircle className="is-spinning" size={18} /> : <Send size={18} />}</button>
      </form>
    </aside>}
  </>;
}
