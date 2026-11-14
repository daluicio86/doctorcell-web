import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { renderHome, renderPage } from "../.prerender/entry-server.js";
import { pageRegistry } from '../src/data/pageRegistry.js';
import { SITE_ORIGIN } from "../src/data/siteConfig.js";
import { branches } from "../src/data/siteData.js";
import { localBusinessSchema, homeBusinessSchema } from "../src/utils/pageMetadata.js";

const origin = SITE_ORIGIN;

const routes = [
  ...Object.entries(pageRegistry).map(([path, page]) => ({ ...page, path: path.slice(1) })),
  { path: "conviene-reparar", title: "¿Conviene reparar mi celular? | DoctorCell Quito", description: "Evalúa el estado de tu celular, compara reparar o reemplazar, comparte tu resultado y cotiza por WhatsApp con DoctorCell Quito.", heading: "¿Conviene reparar mi celular?", copy: "Cuéntanos cómo está tu equipo. Compara tus opciones, comparte tu orientación y cotiza por WhatsApp." },
  { path: "tienda", title: "Tienda de accesorios | DoctorCell Quito", description: "Estuches, audífonos, cables y cargadores con fotografías, precios y compatibilidad por modelo.", heading: "Accesorios para tu equipo", copy: "Consulta productos reales, compatibilidad, precio y disponibilidad." },
  { path: "agendar", title: "Solicitar una cita | DoctorCell Quito", description: "Solicita un horario de revisión en una de las cuatro sucursales DoctorCell de Quito.", heading: "Solicita una cita", copy: "Elige la sucursal y el horario que prefieres; confirmaremos la disponibilidad contigo." },
  { path: "seguimiento", title: "Seguimiento de reparación | DoctorCell Quito", description: "Consulta el estado de una reparación DoctorCell mediante el número de orden.", heading: "Seguimiento de reparación", copy: "Ten a mano el número de orden entregado al recibir tu equipo." },
  { path: "sucursales", title: "Sucursales DoctorCell en Quito", description: "Direcciones, horarios, rutas y contacto de las cuatro sucursales DoctorCell en Quito.", heading: "Cuatro sucursales en Quito", copy: "Encuentra la sede más conveniente y abre la ruta directa." },
  { path: "preguntas", title: "Preguntas frecuentes | DoctorCell Quito", description: "Respuestas sobre tiempos, repuestos, diagnóstico y visita a las sucursales DoctorCell.", heading: "Preguntas frecuentes", copy: "Lo esencial antes de traer tu equipo a una sucursal DoctorCell." },
  ...branches.map((branch) => ({
    path: `sucursales/${branch.slug}`,
    title: `${branch.name} | DoctorCell Quito`,
    description: `Servicio técnico DoctorCell en ${branch.address}, Quito. Horarios, ruta, orientación preliminar y contacto.`,
    heading: branch.name,
    copy: `${branch.address}, Quito. ${branch.hours}.`,
    schema: localBusinessSchema(branch)
  }))
];

const esc = (value) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const source = (await readFile(resolve("dist/index.html"), "utf8"))
  .replaceAll("\r\n", "\n")
  .replace(/<script\b[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/g, '')
  .replace(/^[ \t]+$/gm, '')
  .replace(/<div id="root">[\s\S]*<\/div>/, '<div id="root"></div>');
await writeFile(resolve("dist/index.html"), source.replace('</head>', `<script id="route-structured-data" type="application/ld+json">${JSON.stringify(homeBusinessSchema(branches)).replaceAll('<', '\\u003c')}</script></head>`).replace('<div id="root"></div>', `<div id="root">${renderHome()}</div>`));

for (const route of routes) {
  const canonical = `${origin}/${route.path}/`;
  const fallback = renderPage(`/${route.path}`);
  const html = source
    .replace(/<title>.*?<\/title>/s, `<title>${esc(route.title)}</title>`)
    .replace(/<meta name="robots" content=".*?"\s*\/?>/s, `<meta name="robots" content="${route.draft ? 'noindex,follow' : 'index,follow'}" />`)
    .replace(/<meta name="description" content=".*?"\s*\/?>/s, `<meta name="description" content="${esc(route.description)}" />`)
    .replace(/<link rel="canonical" href=".*?"\s*\/?>/s, `<link rel="canonical" href="${canonical}" />`)
    .replace(/<meta property="og:title" content=".*?"\s*\/?>/s, `<meta property="og:title" content="${esc(route.title)}" />`)
    .replace(/<meta property="og:description" content=".*?"\s*\/?>/s, `<meta property="og:description" content="${esc(route.description)}" />`)
    .replace(/<meta property="og:url" content=".*?"\s*\/?>/s, `<meta property="og:url" content="${canonical}" />`)
    .replace(/<meta name="twitter:title" content=".*?"\s*\/?>/s, `<meta name="twitter:title" content="${esc(route.title)}" />`)
    .replace(/<meta name="twitter:description" content=".*?"\s*\/?>/s, `<meta name="twitter:description" content="${esc(route.description)}" />`)
    .replace("</head>", `${route.schema ? `<script id="route-structured-data" type="application/ld+json">${JSON.stringify(route.schema).replaceAll("<", "\\u003c")}</script>` : ""}</head>`)
    .replace('<div id="root"></div>', `<div id="root">${fallback}</div>`);

  const directory = resolve("dist", route.path);
  await mkdir(directory, { recursive: true });
  await writeFile(resolve(directory, "index.html"), html);
}

console.log(`Generadas ${routes.length} rutas prerenderizadas para IIS.`);
