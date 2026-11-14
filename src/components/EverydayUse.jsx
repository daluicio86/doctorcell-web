import React from 'react';
import { ArrowUpRight, BookOpen, BriefcaseBusiness, Camera, ClipboardList, MessageCircle, ShieldCheck, Star } from 'lucide-react';
import SectionHeading from './SectionHeading.jsx';
import { whatsappUrl } from '../utils/whatsapp.js';

const moments = [
  { icon: BookOpen, tag: 'CLASES + APUNTES + CHATS', title: 'Que te acompañe todo el día.', text: 'Si la batería se agota entre clases o la pantalla ya no responde, revisemos qué necesita antes de pensar en otro celular.', label: 'Consultar por batería o pantalla', message: 'Uso mi celular para estudiar y quiero revisar la batería o la pantalla.' },
  { icon: BriefcaseBusiness, tag: 'TRABAJO + LLAMADAS + AGENDA', title: 'Organízate con información.', text: 'Consulta el tiempo estimado para tu caso y solicita una revisión en la sucursal que te quede cerca. Confirmamos la disponibilidad contigo.', label: 'Solicitar una revisión', href: '/agendar/' },
  { icon: Camera, tag: 'FOTOS + VIDEOS + IDEAS', title: 'Que tus ideas se vean y se escuchen.', text: '¿Fotos borrosas, audio bajo o un micrófono que falla? Revisamos cámara, sonido y conectividad para encontrar la causa.', label: 'Consultar por cámara o audio', message: 'Uso mi celular para fotos y videos y quiero revisar la cámara o el audio.' }
];

export function EverydayUse() {
  return <section className="section everyday-use" aria-labelledby="everyday-title">
    <SectionHeading eyebrow="CONECTA CON LO QUE TE MUEVE" title={<span id="everyday-title">Un celular. Todo tu día.</span>}>
      Tu equipo hace mucho más que recibir llamadas. Cuéntanos qué necesitas volver a hacer con él.
    </SectionHeading>
    <div className="everyday-grid">{moments.map(({ icon: Icon, tag, title, text, label, message, href }, index) => <article key={tag}>
      <div className="everyday-card-top"><Icon size={27} aria-hidden="true" /><span>0{index + 1}</span></div>
      <p className="moment-tag">{tag}</p><h3>{title}</h3><p>{text}</p>
      <a href={href || whatsappUrl(`Hola DoctorCell Quito, ${message} Mi modelo es: `)} target={href ? undefined : '_blank'} rel={href ? undefined : 'noopener noreferrer'} data-analytics-placement={`everyday_${index + 1}`}>{label}<ArrowUpRight size={18} aria-hidden="true" /></a>
    </article>)}</div>
  </section>;
}

export function ConfidenceLinks() {
  return <section className="section confidence-section" aria-labelledby="confidence-title">
    <div><p className="eyebrow">TÚ TIENES LA ÚLTIMA PALABRA</p><h2 id="confidence-title">Tu equipo importa.<br />Tu tranquilidad, también.</h2><p>Pregunta, compara y decide con información antes de autorizar una reparación.</p></div>
    <div className="confidence-links">
      <a href="/precios/"><MessageCircle aria-hidden="true" /><span><strong>Un precio para tu caso</strong><small>Consulta por modelo y tipo de repuesto.</small></span><ArrowUpRight size={18} aria-hidden="true" /></a>
      <a href="/garantia/"><ShieldCheck aria-hidden="true" /><span><strong>Condiciones claras</strong><small>Consulta cobertura y garantía antes de decidir.</small></span><ArrowUpRight size={18} aria-hidden="true" /></a>
      <a href="/seguimiento/"><ClipboardList aria-hidden="true" /><span><strong>Consulta cómo va tu equipo</strong><small>Ten a mano tu número de orden.</small></span><ArrowUpRight size={18} aria-hidden="true" /></a>
      <a href="#opiniones"><Star aria-hidden="true" /><span><strong>Experiencias de otros clientes</strong><small>Accede a las reseñas públicas por sucursal.</small></span><ArrowUpRight size={18} aria-hidden="true" /></a>
    </div>
  </section>;
}

export function AccessoryEdit({ products }) {
  // Reuse the catalog's names and images; availability is confirmed in the chat.
  const selection = [20, 52, 64].map((id) => products.find((item) => item.id === id)).filter(Boolean);
  return <section className="section accessory-edit" aria-labelledby="accessory-title">
    <div className="accessory-intro"><p className="eyebrow">PROTÉGELO. PERSONALÍZALO. DISFRÚTALO.</p><h2 id="accessory-title">Tu celular también<br />tiene tu estilo.</h2><p>Estuches con color, audífonos para tu playlist y cargadores para tu rutina. Explora el catálogo y consulta compatibilidad para tu equipo.</p><a className="accessory-store-link" href="/tienda/">Explorar accesorios<ArrowUpRight size={20} aria-hidden="true" /></a><small>Modelo, color y disponibilidad se confirman antes de comprar.</small></div>
    <div className="accessory-selection">{selection.map((product) => <a className="accessory-pick" key={product.id} href={whatsappUrl(`Hola DoctorCell Quito, me interesa ${product.name}${product.category === 'Estuches' ? ` para ${product.model}` : ''}. ¿Me confirman compatibilidad, colores, precio final y disponibilidad?`)} target="_blank" rel="noopener noreferrer" data-analytics-placement="home_accessory"><div className="accessory-image"><img src={product.image} alt={product.name} loading="lazy" width="400" height="400" /><span><ArrowUpRight size={20} aria-hidden="true" /></span></div><small>{product.category === 'Estuches' ? product.model : product.category}</small><h3>{product.name}</h3><span className="accessory-inquire">Consultar por WhatsApp</span></a>)}</div>
  </section>;
}
