const origin = "https://www.doctorcell.com.ec";

function ensureMeta(selector, attributes) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement(attributes.property ? "meta" : "link");
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
  return element;
}

export function setPageMetadata({ title, description, path = "/", image = "/logo.jpg", schema }) {
  const url = `${origin}${path === "/" ? "/" : `${path.replace(/\/$/, "")}/`}`;
  document.title = title;
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
    "@type": "CellPhoneStore",
    name: `DoctorCell Quito — ${branch.name}`,
    url: `${origin}/sucursales/${branch.slug}/`,
    telephone: "+593983222100",
    email: "dc.infouio@gmail.com",
    priceRange: "$",
    image: `${origin}/logo.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: branch.address,
      addressLocality: "Quito",
      addressRegion: "Pichincha",
      addressCountry: "EC"
    },
    openingHoursSpecification: [{
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "18:00"
    }]
  };
}
