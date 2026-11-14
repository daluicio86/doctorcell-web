import { SITE_ORIGIN } from "../data/siteConfig.js";
import { contactInfo, openingHours } from "../data/businessInfo.js";
import { branchMedia, legalPages } from '../data/conversionContent.js';

const origin = SITE_ORIGIN;

function ensureMeta(selector, attributes) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement(attributes.rel ? "link" : "meta");
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
  return element;
}

export function setPageMetadata({ title, description, path = "/", image = "/logo.jpg", schema }) {
  const url = `${origin}${path === "/" ? "/" : `${path.replace(/\/$/, "")}/`}`;
  document.title = title;
  ensureMeta('meta[name="robots"]', { name: 'robots', content: legalPages[path]?.draft ? 'noindex,follow' : 'index,follow,max-image-preview:large' });
  ensureMeta('meta[name="description"]', { name: "description", content: description });
  ensureMeta('link[rel="canonical"]', { rel: "canonical", href: url });
  ensureMeta('meta[property="og:title"]', { property: "og:title", content: title });
  ensureMeta('meta[property="og:description"]', { property: "og:description", content: description });
  ensureMeta('meta[property="og:url"]', { property: "og:url", content: url });
  ensureMeta('meta[property="og:image"]', { property: "og:image", content: `${origin}${image}` });
  ensureMeta('meta[name="twitter:title"]', { name: "twitter:title", content: title });
  ensureMeta('meta[name="twitter:description"]', { name: "twitter:description", content: description });
  ensureMeta('meta[name="twitter:image"]', { name: "twitter:image", content: `${origin}${image}` });

  const previous = document.getElementById("route-structured-data");
  if (previous) previous.remove();
  if (schema) {
    const script = document.createElement("script");
    script.id = "route-structured-data";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema).replaceAll("<", "\\u003c");
    document.head.appendChild(script);
  }
}

export function localBusinessSchema(branch) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    '@id': `${origin}/sucursales/${branch.slug}/#business`,
    name: `DoctorCell Quito — ${branch.name}`,
    url: `${origin}/sucursales/${branch.slug}/`,
    telephone: contactInfo.phoneHref,
    email: contactInfo.email,
    image: `${origin}/logo.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: branchMedia[branch.slug]?.fullAddress || branch.address,
      addressLocality: "Quito",
      addressRegion: "Pichincha",
      addressCountry: "EC"
    },
    areaServed: { '@type': 'AdministrativeArea', name: 'Quito, Pichincha, Ecuador' },
    hasMap: branchMedia[branch.slug]?.googleProfileUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`DoctorCell ${branch.address} Quito Ecuador`)}`,
    ...(branchMedia[branch.slug]?.googleProfileUrl ? { sameAs: [branchMedia[branch.slug].googleProfileUrl] } : {}),
    ...(branch.geoVerified ? { geo: { '@type': 'GeoCoordinates', latitude: branch.latitude, longitude: branch.longitude } } : {}),
    hasOfferCatalog: { '@type': 'OfferCatalog', name: 'Reparación de equipos', itemListElement: ['Pantallas', 'Baterías', 'Carga', 'Humedad', 'Cámara y audio', 'Microsoldadura', 'Software', 'Tablets', 'MacBook', 'Smartwatches'].map((name) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name } })) },
    openingHoursSpecification: [{
      "@type": "OpeningHoursSpecification",
      dayOfWeek: openingHours.dayOfWeek,
      opens: openingHours.opens,
      closes: openingHours.closes
    }]
  };
}

export function homeBusinessSchema(branches) {
  return { '@context': 'https://schema.org', '@graph': [
    { '@type': 'Organization', '@id': `${origin}/#organization`, name: contactInfo.businessName, url: `${origin}/`, logo: `${origin}/logo.jpg`, telephone: contactInfo.phoneHref, email: contactInfo.email },
    ...branches.map(localBusinessSchema).map(({ '@context': context, ...item }) => item)
  ] };
}
