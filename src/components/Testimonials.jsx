import React from "react";
import { ArrowUpRight, Quote, Star } from "lucide-react";
import { googleReviewSummary, testimonials } from "../data/siteData.js";
import { mapsUrl } from "../utils/whatsapp.js";
import SectionHeading from "./SectionHeading.jsx";

export default function Testimonials() {
  return (
    <section className="section testimonials">
      <SectionHeading eyebrow="Clientes felices" title="Confianza que se gana en mostrador.">
        Opiniones compartidas por clientes de DoctorCell Quito. Consulta también las reseñas públicas antes de decidir.
      </SectionHeading>
      <div className="testimonial-track">
        {testimonials.map((testimonial) => (
          <article key={`${testimonial.name}-${testimonial.text}`}>
            <div className="testimonial-topline">
              <div className="stars" aria-label="Cinco estrellas">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} size={17} fill="currentColor" />
                ))}
              </div>
              <Quote size={22} aria-hidden="true" />
            </div>
            <blockquote>“{testimonial.text}”</blockquote>
            <div className="testimonial-author">
              <span aria-hidden="true">{testimonial.name.charAt(0)}</span>
              <div><strong>{testimonial.name}</strong><small>{testimonial.branch}</small></div>
            </div>
          </article>
        ))}
      </div>
      <div className="reviews-proof">
        <div className="reviews-proof-copy">
          <div className="stars" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, index) => <Star key={index} size={20} fill="currentColor" />)}
          </div>
          <strong>
            {googleReviewSummary
              ? `${googleReviewSummary.rating}★ con ${googleReviewSummary.count}+ reseñas en Google`
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
