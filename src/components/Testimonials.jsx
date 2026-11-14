import React from "react";
import { ArrowUpRight, Star } from "lucide-react";
import { branches, googleReviewSummary } from "../data/siteData.js";
import { mapsUrl } from "../utils/whatsapp.js";
import SectionHeading from "./SectionHeading.jsx";
import { VerifiedTestimonials } from './ConversionPages.jsx';

export default function Testimonials() {
  return (
    <section className="section testimonials" id="opiniones">
      <SectionHeading eyebrow="LA CONFIANZA SE COMPRUEBA" title="Antes de dejarnos tu celular, conócenos.">
        Lee las experiencias de otros clientes en Google Maps y elige dónde traer tu equipo.
      </SectionHeading>
      <VerifiedTestimonials />
      <div className="testimonial-track branch-review-links">
        {branches.map((branch) => (
          <a key={branch.name} href={mapsUrl(`DoctorCell Quito ${branch.address} reseñas`)} target="_blank" rel="noopener noreferrer">
            <div className="stars" aria-hidden="true"><Star size={17} /></div>
            <strong>{branch.name}</strong>
            <span>{branch.address}</span>
            <small>Leer reseñas reales <ArrowUpRight size={16} /></small>
          </a>
        ))}
      </div>
      <div className="reviews-proof">
        <div className="reviews-proof-copy">
          {googleReviewSummary && <div className="stars" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, index) => <Star key={index} size={20} fill="currentColor" />)}
          </div>}
          <strong>
            {googleReviewSummary
              ? `${googleReviewSummary.rating}★ con ${googleReviewSummary.count} reseñas en Google`
              : "Revisa opiniones públicas antes de elegir."}
          </strong>
          <span>La puntuación y el número de reseñas se consultan directamente en Google Maps.</span>
        </div>
        <a className="google-reviews-link" href={mapsUrl("DoctorCell Quito Ecuador reseñas")} target="_blank" rel="noopener noreferrer">
          Ver reseñas en Google Maps <ArrowUpRight size={18} />
        </a>
      </div>
    </section>
  );
}
