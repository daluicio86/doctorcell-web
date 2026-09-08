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
import Guarantee from "./components/Guarantee.jsx";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import QuoteFinder from "./components/QuoteFinder.jsx";
import RepairTracking from "./components/RepairTracking.jsx";
import Services from "./components/Services.jsx";
import Store, { products } from "./components/Store.jsx";
import Testimonials from "./components/Testimonials.jsx";
import PromoStrip from "./components/PromoStrip.jsx";
import { branches } from "./data/siteData.js";
import { setPageMetadata } from "./utils/pageMetadata.js";

const route = window.location.pathname.replace(/\/+$/, "") || "/";

const pages = {
  "/": ["DoctorCell Quito | La solución tecnológica a tus dispositivos", "Reparación de celulares, tablets y relojes en cuatro sucursales de Quito, con autorización previa y garantía por escrito."],
  "/tienda": ["Tienda de accesorios | DoctorCell Quito", "Estuches, audífonos, cables y cargadores con fotografías, precios y compatibilidad por modelo."],
  "/agendar": ["Solicitar una cita | DoctorCell Quito", "Solicita un horario de revisión en una de las cuatro sucursales DoctorCell de Quito."],
  "/seguimiento": ["Seguimiento de reparación | DoctorCell Quito", "Consulta el estado de una reparación DoctorCell mediante el número de orden."],
  "/sucursales": ["Sucursales DoctorCell en Quito", "Direcciones, horarios, rutas y contacto de las cuatro sucursales DoctorCell en Quito."],
  "/preguntas": ["Preguntas frecuentes | DoctorCell Quito", "Respuestas sobre tiempos, repuestos, garantía, diagnóstico y visita a las sucursales DoctorCell."]
};

function PageFrame({ children, pageRoute, schema }) {
  const serializedSchema = schema ? JSON.stringify(schema) : "";
  useEffect(() => {
    const [title, description] = pages[pageRoute];
    setPageMetadata({ title, description, path: pageRoute, schema });
  }, [pageRoute, serializedSchema]);
  return <><Header /><main className="utility-page">{children}</main><Chatbot /><AnalyticsConsent /><Footer /></>;
}

function StorePage() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Catálogo DoctorCell Quito",
    itemListElement: products.slice(0, 40).map((product, index) => ({
      "@type": "ListItem", position: index + 1,
      item: { "@type": "Product", name: product.name, image: `https://www.doctorcell.com.ec${product.image}`, category: product.category, offers: { "@type": "Offer", priceCurrency: "USD", price: product.price, availability: "https://schema.org/InStock" } }
    }))
  };
  return <PageFrame pageRoute="/tienda" schema={itemList}><Store standalone /></PageFrame>;
}

export default function App() {
  useEffect(() => {
    if (route === "/") {
      const [title, description] = pages["/"];
      setPageMetadata({ title, description, path: "/" });
    }
  }, []);
  const branch = branches.find((item) => route === `/sucursales/${item.slug}`);
  if (branch) return <><Header /><main className="utility-page"><BranchDetail branch={branch} /></main><Chatbot /><AnalyticsConsent /><Footer /></>;
  if (route === "/tienda") return <StorePage />;
  if (route === "/seguimiento") return <PageFrame pageRoute="/seguimiento"><RepairTracking /></PageFrame>;
  if (route === "/agendar") return <PageFrame pageRoute="/agendar"><AppointmentBooking /></PageFrame>;
  if (route === "/sucursales") return <PageFrame pageRoute="/sucursales"><Branches /></PageFrame>;
  if (route === "/preguntas") return <PageFrame pageRoute="/preguntas"><Faq /></PageFrame>;

  return (
    <>
      <Header />
      <main id="inicio">
        <Hero />
        <PromoStrip />
        <QuoteFinder />
        <Services />
        <BeforeAfter />
        <Guarantee />
        <Testimonials />
        <Branches />
        <FinalCta />
      </main>
      <Chatbot />
      <AnalyticsConsent />
      <Footer />
    </>
  );
}
