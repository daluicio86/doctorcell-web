import { faqItems, legalPages, servicePages } from './conversionContent.js';
import { SITE_ORIGIN } from './siteConfig.js';
export const pageRegistry = {
  '/cotizar': { title: 'Cotiza tu reparación | DoctorCell Quito', description: 'Solicita una revisión de celular, tablet, MacBook o smartwatch en Quito. Cotización sujeta a diagnóstico.' },
  '/precios': { title: 'Precios orientativos de reparación | DoctorCell Quito', description: 'Consulta servicios de reparación por marca y modelo. Precio, tiempo, repuesto y garantía requieren confirmación.' },
  '/preguntas-frecuentes': { title: 'Preguntas frecuentes | DoctorCell Quito', description: 'Consulta sobre tiempos, repuestos, garantía, citas, datos y pagos antes de llevar tu equipo.', schema: { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqItems.map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } })) } },
  ...Object.fromEntries(Object.entries(legalPages).map(([path, page]) => [path, { title: `${page.heading} | DoctorCell Quito`, description: page.description, draft: page.draft }])),
  ...Object.fromEntries(servicePages.map((page) => [`/servicios/${page.slug}`, { title: `${page.heading} | DoctorCell`, description: page.description, service: page }]))
};
for (const [path, page] of Object.entries(pageRegistry)) {
  const graph = [{ '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_ORIGIN}/` },
    { '@type': 'ListItem', position: 2, name: page.title.split(' | ')[0], item: `${SITE_ORIGIN}${path}/` }
  ] }];
  if (page.schema) { const { '@context': context, ...schema } = page.schema; graph.push(schema); }
  if (page.service) graph.push({ '@type': 'Service', name: page.service.heading, areaServed: 'Quito, Pichincha, Ecuador', url: `${SITE_ORIGIN}${path}/`, provider: { '@type': 'Organization', name: 'DoctorCell Quito', url: SITE_ORIGIN } }, { '@type': 'FAQPage', mainEntity: page.service.faqs.map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } })) });
  page.schema = { '@context': 'https://schema.org', '@graph': graph };
}
