import React, { useEffect } from "react";
import AnalyticsConsent from "./components/AnalyticsConsent.jsx";
import AppointmentBooking from "./components/AppointmentBooking.jsx";
import BeforeAfter from "./components/BeforeAfter.jsx";
import BranchDetail from "./components/BranchDetail.jsx";
import Branches from "./components/Branches.jsx";
import Chatbot from "./components/Chatbot.jsx";
import FinalCta from "./components/FinalCta.jsx";
import Faq from "./components/Faq.jsx";
import Footer from "./components/Footer.jsx";
import Gallery from "./components/Gallery.jsx";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import QuoteFinder from "./components/QuoteFinder.jsx";
import RepairTracking from "./components/RepairTracking.jsx";
import RepairDecision, { RepairDecisionTeaser } from "./components/RepairDecision.jsx";
import Services from "./components/Services.jsx";
import Store, { products } from "./components/Store.jsx";
import Testimonials from "./components/Testimonials.jsx";
import TechMarquee from "./components/TechMarquee.jsx";
import useSiteMotion from "./hooks/useSiteMotion.js";
import { branches } from "./data/siteData.js";
import { SITE_ORIGIN } from "./data/siteConfig.js";
import { setPageMetadata } from "./utils/pageMetadata.js";
import FloatingWhatsApp from './components/FloatingWhatsApp.jsx';
import { Promotions, Prices, InformationPage, ServiceLanding, DocumentedRepairs } from './components/ConversionPages.jsx';
import { pageRegistry } from './data/pageRegistry.js';
import { legalPages, servicePages } from './data/conversionContent.js';
import { homeBusinessSchema } from './utils/pageMetadata.js';

const pages = {
  "/": ["Cambio de pantalla y reparación de celulares en Quito | DoctorCell", "¿Pantalla rota? Cotiza por WhatsApp. Confirmamos el precio antes de reparar. Encuéntranos en cuatro sucursales de Quito."],
  "/tienda": ["Tienda de accesorios | DoctorCell Quito", "Estuches, audífonos, cables y cargadores con fotografías, precios y compatibilidad por modelo."],
  "/agendar": ["Solicitar una cita | DoctorCell Quito", "Solicita un horario de revisión en una de las cuatro sucursales DoctorCell de Quito."],
  "/seguimiento": ["Seguimiento de reparación | DoctorCell Quito", "Consulta el estado de una reparación DoctorCell mediante el número de orden."],
  "/sucursales": ["Sucursales DoctorCell en Quito", "Direcciones, horarios, rutas y contacto de las cuatro sucursales DoctorCell en Quito."],
  "/preguntas": ["Preguntas frecuentes | DoctorCell Quito", "Respuestas sobre tiempos, repuestos, diagnóstico y visita a las sucursales DoctorCell."],
  "/conviene-reparar": ["¿Conviene reparar mi celular? | DoctorCell Quito", "Evalúa el estado de tu celular, compara reparar o reemplazar, comparte tu resultado y cotiza por WhatsApp con DoctorCell Quito."]
};

function PageFrame({ children, pageRoute, schema }) {
  schema = schema || pageRegistry[pageRoute]?.schema;
  const serializedSchema = schema ? JSON.stringify(schema) : "";
  useEffect(() => {
    const [title, description] = pages[pageRoute] || [pageRegistry[pageRoute].title, pageRegistry[pageRoute].description];
    setPageMetadata({ title, description, path: pageRoute, schema });
  }, [pageRoute, serializedSchema]);
  const themeClass = pageRoute === "/tienda" ? " future-store" : " future-utility";
  return <><Header /><main id="main-content" className={`utility-page${themeClass}`}>{children}</main><Chatbot /><FloatingWhatsApp /><AnalyticsConsent /><Footer /></>;
}

function StorePage() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Catálogo DoctorCell Quito",
    itemListElement: products.slice(0, 40).map((product, index) => ({
      "@type": "ListItem", position: index + 1,
      item: { "@type": "Product", name: product.name, image: `${SITE_ORIGIN}${product.image}`, category: product.category, offers: { "@type": "Offer", priceCurrency: "USD", price: product.price.replace("$", "") } }
    }))
  };
  return <PageFrame pageRoute="/tienda" schema={itemList}><Store standalone /></PageFrame>;
}

export default function App({ path }) {
  const route = (path || (typeof window === 'undefined' ? '/' : window.location.pathname)).replace(/\/+$/, '') || '/';
  useSiteMotion();
  useEffect(() => {
    if (route === "/") {
      const [title, description] = pages["/"];
      setPageMetadata({ title, description, path: "/", schema: homeBusinessSchema(branches) });
    }
  }, []);
  const branch = branches.find((item) => route === `/sucursales/${item.slug}`);
  if (branch) return <><Header /><main id="main-content" className="utility-page future-utility"><BranchDetail branch={branch} /></main><Chatbot /><FloatingWhatsApp /><AnalyticsConsent /><Footer /></>;
  if (route === '/cotizar') return <PageFrame pageRoute={route}><h1 className="utility-heading">Cotiza tu reparación en Quito</h1><QuoteFinder /></PageFrame>;
  if (route === '/precios') return <PageFrame pageRoute={route}><Prices standalone /></PageFrame>;
  if (route === '/preguntas-frecuentes') return <PageFrame pageRoute={route} schema={pageRegistry[route].schema}><Faq standalone /></PageFrame>;
  if (legalPages[route]) return <PageFrame pageRoute={route}><InformationPage path={route} /></PageFrame>;
  const service = servicePages.find((item) => route === `/servicios/${item.slug}`);
  if (service) return <PageFrame pageRoute={route}><ServiceLanding service={service} /></PageFrame>;
  if (route === "/tienda") return <StorePage />;
  if (route === "/seguimiento") return <PageFrame pageRoute="/seguimiento"><h1 className="utility-heading">Seguimiento de reparación</h1><RepairTracking /></PageFrame>;
  if (route === "/agendar") return <PageFrame pageRoute="/agendar"><h1 className="utility-heading">Agendar revisión</h1><AppointmentBooking /></PageFrame>;
  if (route === "/sucursales") return <PageFrame pageRoute="/sucursales"><h1 className="utility-heading">Sucursales DoctorCell en Quito</h1><Branches /></PageFrame>;
  if (route === "/preguntas") return <PageFrame pageRoute="/preguntas" schema={pageRegistry['/preguntas-frecuentes'].schema}><Faq standalone /></PageFrame>;
  if (route === "/conviene-reparar") return <PageFrame pageRoute="/conviene-reparar"><RepairDecision /></PageFrame>;

  return (
    <>
      <Header />
      <main id="main-content" className="futurist-home">
        <Hero />
        <Promotions />
        <TechMarquee />
        <Services />
        <QuoteFinder />
        <Prices />
        <RepairDecisionTeaser />
        <BeforeAfter />
        <Gallery />
        <DocumentedRepairs />
        <Testimonials />
        <Branches />
        <FinalCta />
      </main>
      <Chatbot />
      <FloatingWhatsApp />
      <AnalyticsConsent />
      <Footer />
    </>
  );
}
