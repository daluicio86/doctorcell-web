import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const origin = "https://www.doctorcell.com.ec";
const branches = [
  ["matriz-prensa-rio-arajuno", "DoctorCell Sucursal Prensa", "Prensa y Río Arajuno"],
  ["colon-juan-leon-mera", "DoctorCell Colón", "Colón y Juan León Mera"],
  ["shyris-tomas-de-berlanga", "DoctorCell Shyris", "Shyris y Tomás de Berlanga"],
  ["prensa-vaca-de-castro", "DoctorCell Sucursal Vaca de Castro", "Prensa y Vaca de Castro"]
];

const routes = [
  { path: "tienda", title: "Tienda de accesorios | DoctorCell Quito", description: "Estuches, audífonos, cables y cargadores con fotografías, precios y compatibilidad por modelo.", heading: "Accesorios para tu equipo", copy: "Consulta productos reales, compatibilidad, precio y disponibilidad." },
  { path: "agendar", title: "Solicitar una cita | DoctorCell Quito", description: "Solicita un horario de revisión en una de las cuatro sucursales DoctorCell de Quito.", heading: "Solicita una cita", copy: "Elige la sucursal y el horario que prefieres; confirmaremos la disponibilidad contigo." },
  { path: "seguimiento", title: "Seguimiento de reparación | DoctorCell Quito", description: "Consulta el estado de una reparación DoctorCell mediante el número de orden.", heading: "Seguimiento de reparación", copy: "Ten a mano el número de orden entregado al recibir tu equipo." },
  { path: "sucursales", title: "Sucursales DoctorCell en Quito", description: "Direcciones, horarios, rutas y contacto de las cuatro sucursales DoctorCell en Quito.", heading: "Cuatro sucursales en Quito", copy: "Encuentra la sede más conveniente y abre la ruta directa." },
  { path: "preguntas", title: "Preguntas frecuentes | DoctorCell Quito", description: "Respuestas sobre tiempos, repuestos, garantía, diagnóstico y visita a las sucursales DoctorCell.", heading: "Preguntas frecuentes", copy: "Lo esencial antes de traer tu equipo a una sucursal DoctorCell." },
  ...branches.map(([slug, name, address]) => ({
    path: `sucursales/${slug}`,
    title: `${name} | DoctorCell Quito`,
    description: `Servicio técnico DoctorCell en ${address}, Quito. Horarios, ruta, orientación preliminar y contacto.`,
    heading: name,
    copy: `${address}, Quito. Atención de lunes a sábado, de 09:00 a 18:00.`,
    schema: {
      "@context": "https://schema.org", "@type": "CellPhoneStore", name,
      url: `${origin}/sucursales/${slug}/`, telephone: "+593983222100", email: "dc.infouio@gmail.com", priceRange: "$",
      image: `${origin}/logo.jpg`,
      address: { "@type": "PostalAddress", streetAddress: address, addressLocality: "Quito", addressRegion: "Pichincha", addressCountry: "EC" },
      openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "09:00", closes: "18:00" }]
    }
  }))
];

const esc = (value) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const source = await readFile(resolve("dist/index.html"), "utf8");

for (const route of routes) {
  const canonical = `${origin}/${route.path}/`;
  const fallback = `<main class="static-route-fallback"><img src="/logo.jpg" width="224" height="64" alt="DoctorCell Quito"><p>DoctorCell · la solución tecnológica a tus dispositivos</p><h1>${esc(route.heading)}</h1><p>${esc(route.copy)}</p></main>`;
  const html = source
    .replace(/<title>.*?<\/title>/s, `<title>${esc(route.title)}</title>`)
    .replace(/<meta name="description" content=".*?"\s*\/?>/s, `<meta name="description" content="${esc(route.description)}" />`)
    .replace(/<link rel="canonical" href=".*?"\s*\/?>/s, `<link rel="canonical" href="${canonical}" />`)
    .replace(/<meta property="og:title" content=".*?"\s*\/?>/s, `<meta property="og:title" content="${esc(route.title)}" />`)
    .replace(/<meta property="og:description" content=".*?"\s*\/?>/s, `<meta property="og:description" content="${esc(route.description)}" />`)
    .replace(/<meta property="og:url" content=".*?"\s*\/?>/s, `<meta property="og:url" content="${canonical}" />`)
    .replace("</head>", `<style>.static-route-fallback{max-width:920px;margin:0 auto;padding:72px 24px;font-family:Inter,system-ui,sans-serif;color:#10271d}.static-route-fallback img{object-fit:contain}.static-route-fallback>p:first-of-type{margin-top:36px;color:#4f9f34;font-weight:800}.static-route-fallback h1{max-width:760px;margin:10px 0;font-size:clamp(38px,7vw,72px);line-height:1.02}.static-route-fallback>p:last-child{max-width:680px;font-size:18px;line-height:1.6}</style>${route.schema ? `<script type="application/ld+json">${JSON.stringify(route.schema).replaceAll("<", "\\u003c")}</script>` : ""}</head>`)
    .replace('<div id="root"></div>', `<div id="root">${fallback}</div>`);

  const directory = resolve("dist", route.path);
  await mkdir(directory, { recursive: true });
  await writeFile(resolve(directory, "index.html"), html);
}

console.log(`Generadas ${routes.length} rutas prerenderizadas para IIS.`);
