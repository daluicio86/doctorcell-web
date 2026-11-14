import React, { useState } from 'react';
import { activePromotions, repairPrices, repairTypes, priceLabel, legalPages, repairCases, verifiedTestimonials } from '../data/conversionContent.js';
import { brands, branches } from '../data/siteData.js';
import { whatsappUrl } from '../utils/whatsapp.js';

export function Promotions() {
  const offers = activePromotions();
  return <section className="conversion-trust" aria-label="Antes de reparar">{offers.length ? offers.map((offer) => <article key={offer.id}><h2>{offer.title}</h2><p>{offer.description}</p><a href={offer.href}>Consultar promoción</a></article>) : <><strong>Diagnóstico previo</strong><span>Autorización antes de reparar</span><a href="/garantia/">Consulta las condiciones de garantía por escrito</a></>}</section>;
}

export function Prices({ standalone = false }) {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [service, setService] = useState('');
  const rows = repairPrices.filter((row) => (!brand || row.brand === '*' || row.brand === brand) && (!model.trim() || row.model === '*' || row.model.toLowerCase().includes(model.trim().toLowerCase())) && (!service || row.service === service));
  const Heading = standalone ? 'h1' : 'h2';
  return <section className="section prices-section" id="precios" aria-labelledby="prices-title">
    <p className="eyebrow">Decide con información</p><Heading id="prices-title">Precios orientativos</Heading>
    <p>Selecciona tu equipo y servicio. Si todavía no hay una tarifa verificada para tu modelo, solicita una cotización.</p>
    <div className="price-filters"><label>Marca<select value={brand} onChange={(e) => setBrand(e.target.value)}><option value="">Todas las marcas</option>{brands.map((b) => <option key={b}>{b}</option>)}</select></label><label>Modelo<input type="search" value={model} onChange={(e) => setModel(e.target.value)} placeholder="Ej. iPhone 13" /></label><label>Reparación<select value={service} onChange={(e) => setService(e.target.value)}><option value="">Todas las reparaciones</option>{repairTypes.map((s) => <option key={s}>{s}</option>)}</select></label></div>
    <p role="status">{rows.length} servicios encontrados. Los registros generales requieren confirmar el modelo.</p>
    <div className="price-table-scroll" role="region" aria-label="Tabla de precios, desplázala horizontalmente" tabIndex={0}><table className="price-table"><caption>Valores referenciales en dólares de Estados Unidos</caption><thead><tr>{['Servicio / equipo', 'Rango orientativo', 'Tiempo estimado', 'Repuesto', 'Garantía', 'Consulta'].map((h) => <th key={h} scope="col">{h}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row.id}><th scope="row">{row.service}<small>{row.brand === '*' ? brand || 'Todas las marcas' : row.brand} · {row.model === '*' ? model || 'Modelo por confirmar' : row.model}</small></th><td>{priceLabel(row)}</td><td>{row.verified && row.estimatedTime || 'Después del diagnóstico'}</td><td>{row.verified && row.partType || 'Según disponibilidad'}</td><td>{row.verified && row.warranty || 'Confirmar por escrito'}</td><td><a href={whatsappUrl(`Hola DoctorCell, necesito cotizar ${row.service} para ${brand || row.brand.replace('*', '[marca]')} ${model || row.model.replace('*', '[modelo]')}. Quiero confirmar repuesto, precio, tiempo y garantía.`)} target="_blank" rel="noopener noreferrer" data-analytics-placement="prices">Cotizar por WhatsApp</a></td></tr>)}</tbody></table></div>
    {!rows.length && <p>No encontramos esa combinación. <a href="/cotizar/">Cuéntanos qué necesitas</a>.</p>}
    <p className="content-notice">Los precios son referenciales y pueden variar según modelo, disponibilidad de repuesto y diagnóstico final.</p>
  </section>;
}

export function InformationPage({ path }) {
  const page = legalPages[path];
  return <article className="section information-page"><p className="eyebrow">DoctorCell Quito</p><h1>{page.heading}</h1>{page.draft && <p className="content-notice" role="note"><strong>Borrador para validación del cliente.</strong> Las condiciones pendientes requieren aprobación del propietario y revisión antes de publicar.</p>}{page.sections.map(([title, text]) => <section key={title}><h2>{title}</h2><p>{text}</p></section>)}<div className="content-links"><a href="/politica-privacidad/">Privacidad</a><a href="/terminos-y-condiciones/">Términos</a><a href="/garantia/">Garantía</a><a href="/sucursales/">Sucursales</a><a href="/cotizar/">Cotizar reparación</a></div></article>;
}

export function ServiceLanding({ service }) {
  return <article className="section information-page"><nav aria-label="Ruta de navegación"><a href="/">Inicio</a> / <a href="/#servicios">Servicios</a></nav><p className="eyebrow">Servicio técnico en Quito</p><h1>{service.heading}</h1><p className="service-intro">{service.intro}</p><a className="button" href={whatsappUrl(`Hola DoctorCell, necesito ${service.heading.toLowerCase()}. Mi modelo es [modelo] y la falla es [describir falla]. Prefiero [sucursal].`)} target="_blank" rel="noopener noreferrer" data-analytics-placement="service_landing">Cotizar por WhatsApp</a><section><h2>Síntomas comunes</h2><ul>{service.symptoms.map((s) => <li key={s}>{s}</li>)}</ul></section><section><h2>Cómo revisamos tu equipo</h2><p>{service.process}</p></section><section><h2>Precio y garantía para tu caso</h2><p>Confirma el precio final, el tiempo estimado y las condiciones de garantía por escrito antes de autorizar. La viabilidad depende del diagnóstico.</p><div className="content-links"><a href="/precios/">Precios orientativos</a><a href="/cotizar/">Completar cotizador</a><a href="/garantia/">Condiciones de garantía</a></div></section><section><h2>Elige tu sucursal en Quito</h2><p>Solicita la revisión en la sede que prefieras. Confirma disponibilidad del servicio y repuesto para tu modelo.</p><div className="content-links">{branches.map((b) => <a key={b.slug} href={`/sucursales/${b.slug}/`}>{b.name}</a>)}</div></section><section><h2>Preguntas frecuentes</h2>{service.faqs.map(([q,a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</section><div className="content-links"><a href={`/guias/${service.guide}/`}>Guía relacionada</a><a href="/guias/">Todas las guías</a><a href="/agendar/">Agendar revisión</a><a href="/servicios/reparacion-celular-mojado-quito/">Daños por humedad</a><a href="/servicios/reparacion-macbook-quito/">Revisión de MacBook</a></div></article>;
}

export function DocumentedRepairs() {
  const cases = repairCases.filter((item) => item.verified && item.authorized && item.before && item.after);
  if (!cases.length) return null;
  return <section className="section documented-repairs"><h2>Reparaciones documentadas</h2><div className="documented-grid">{cases.map((item) => <article key={item.id}><h3>{item.device}</h3><div className="repair-photo-pair">{[['Antes', item.before], ['Después', item.after]].map(([label, src]) => <figure key={label}><img src={src} alt={`${label}: ${item.device}, ${item.fault}`} width="720" height="540" loading="lazy" /><figcaption>{label}</figcaption></figure>)}</div><p>Falla: {item.fault}</p><p>Solución: {item.solution}</p><p>Tiempo del caso: {item.estimatedTime}</p><p>Garantía aplicada: {item.warranty}</p></article>)}</div></section>;
}

export function VerifiedTestimonials() {
  const items = verifiedTestimonials.filter((item) => item.verified && item.sourceUrl?.startsWith('https://'));
  return items.length ? <div className="documented-grid">{items.map((item) => <blockquote key={`${item.name}-${item.sourceUrl}`}><p>“{item.text}”</p><cite>{item.name} · {item.branch}</cite><a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" data-analytics-event="reviews_click">Consultar reseña original</a></blockquote>)}</div> : null;
}
