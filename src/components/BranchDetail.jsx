import React, { useEffect } from "react";
import { ArrowLeft, Clock3, MapPin, MessageCircle, Navigation, ShieldCheck, Stethoscope } from "lucide-react";
import { contactInfo } from "../data/siteData.js";
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
  return (
    <section className="branch-detail">
      <div className="branch-detail-copy">
        <a className="back-link" href="/sucursales"><ArrowLeft size={17} /> Todas las sucursales</a>
        <p className="eyebrow">DoctorCell · la solución tecnológica a tus dispositivos</p>
        <h1>{branch.name}</h1>
        <p className="branch-detail-lead">Atención para celulares, tablets y relojes con orientación clara, autorización previa y garantía por escrito.</p>
        <div className="branch-facts">
          <span><MapPin size={20} /><b>{branch.address}</b><small>{branch.reference}</small></span>
          <span><Clock3 size={20} /><b>{branch.hours}</b><small>Horario habitual</small></span>
          <span><ShieldCheck size={20} /><b>Garantía por escrito</b><small>Según servicio y repuesto</small></span>
        </div>
        <div className="branch-detail-actions">
          <a className="button" href={whatsappUrl(`Hola DoctorCell, necesito orientación para reparar mi equipo en ${branch.name}.`)} target="_blank" rel="noopener noreferrer"><Stethoscope size={18} /> Orientar mi reparación</a>
          <a className="button button-ghost" href={mapsUrl(query)} target="_blank" rel="noopener noreferrer"><Navigation size={18} /> Cómo llegar</a>
        </div>
        <a className="branch-call" href={`tel:${contactInfo.phoneHref}`}><MessageCircle size={17} /> {contactInfo.phoneDisplay}</a>
      </div>
      <div className="branch-detail-map">
        <iframe title={`Mapa de ${branch.name}`} src={`https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        <p><MapPin size={17} /> La fotografía real del local puede añadirse aquí cuando esté disponible y autorizada.</p>
      </div>
    </section>
  );
}
