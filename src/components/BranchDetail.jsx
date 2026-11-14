import React, { useEffect } from "react";
import { ArrowLeft, Clock3, MapPin, MessageCircle, Navigation, Stethoscope } from "lucide-react";
import { contactInfo, branches } from "../data/siteData.js";
import { branchMedia } from '../data/conversionContent.js';
import { mapsUrl, whatsappUrl } from "../utils/whatsapp.js";
import { localBusinessSchema, setPageMetadata } from "../utils/pageMetadata.js";

export default function BranchDetail({ branch }) {
  useEffect(() => {
    setPageMetadata({
      title: `${branch.name} | DoctorCell Quito`,
      description: `Servicio técnico DoctorCell en ${branch.address}, Quito. Horarios, ruta, orientación preliminar y contacto.`,
      path: `/sucursales/${branch.slug}`,
      schema: localBusinessSchema(branch)
    });
  }, [branch]);

  const query = `DoctorCell Quito ${branch.address} Quito Ecuador`;
  const media = branchMedia[branch.slug] || {};
  return (
    <section className="branch-detail">
      <div className="branch-detail-copy">
        <a className="back-link" href="/sucursales"><ArrowLeft size={17} /> Todas las sucursales</a>
        <p className="eyebrow">DoctorCell · la solución tecnológica a tus dispositivos</p>
        <h1>{branch.name}</h1>
        <p className="branch-detail-lead">Atención para celulares, tablets y relojes con orientación clara y autorización previa.</p>
        <div className="branch-facts">
          <span><MapPin size={20} /><b>{media.fullAddress || `${branch.address}, Quito, Pichincha, Ecuador`}</b><small>{branch.reference}</small></span>
          <span><Clock3 size={20} /><b>{branch.hours}</b><small>Horario habitual</small></span>
        </div>
        <div className="branch-detail-actions">
          <a className="button" href={whatsappUrl(`Hola DoctorCell, quiero cotizar una reparación en ${branch.name}.`)} target="_blank" rel="noopener noreferrer" data-analytics-placement="branch_detail" data-analytics-branch={branch.slug}><Stethoscope size={18} /> Cotiza por WhatsApp</a>
          <a className="button button-ghost" href={mapsUrl(query)} target="_blank" rel="noopener noreferrer"><Navigation size={18} /> Cómo llegar</a>
          <a className="button button-ghost" href={`/agendar/?sucursal=${branch.slug}`}>Agendar revisión</a>
          <a href={media.googleProfileUrl || mapsUrl(`${query} reseñas`)} target="_blank" rel="noopener noreferrer" data-analytics-event="reviews_click">Ver reseñas en Google</a>
        </div>
        <a className="branch-call" href={`tel:${contactInfo.phoneHref}`}><MessageCircle size={17} /> {contactInfo.phoneDisplay}</a>
        <h2>Servicios que puedes consultar</h2><p>Pantallas, baterías, carga, humedad, cámaras, audio, software y microsoldadura. Consulta también por tablets, MacBook y smartwatches. Confirma disponibilidad por modelo con la sucursal.</p>
        <div className="content-links"><a href="/cotizar/">Solicitar cotización</a><a href="/precios/">Precios orientativos</a><a href="/garantia/">Garantía</a></div>
        <h2>Otras sucursales</h2><nav className="content-links" aria-label="Otras sucursales">{branches.filter((item) => item.slug !== branch.slug).map((item) => <a key={item.slug} href={`/sucursales/${item.slug}/`}>{item.name}</a>)}</nav>
      </div>
      <div className="branch-detail-map">
        <iframe title={`Mapa de ${branch.name}`} src={`https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        {media.photo && <figure><img src={media.photo} alt={media.alt || `Local de ${branch.name}`} width="900" height="600" loading="lazy" /></figure>}
      </div>
    </section>
  );
}
