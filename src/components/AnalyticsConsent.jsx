import React, { useEffect, useState } from "react";
import { BarChart3, X } from "lucide-react";
import { ANALYTICS_ENABLED, CONSENT_KEY, initializeAnalytics, trackEvent } from "../utils/analytics.js";

export default function AnalyticsConsent() {
  const [choice, setChoice] = useState(() => localStorage.getItem(CONSENT_KEY));

  
  useEffect(() => {
    if (!ANALYTICS_ENABLED) return undefined;
    if (choice === "accepted") initializeAnalytics();

    const reopen = () => setChoice(null);
    window.addEventListener("doctorcell:cookie-settings", reopen);
    return () => window.removeEventListener("doctorcell:cookie-settings", reopen);
  }, [choice]);

  useEffect(() => {
    if (!ANALYTICS_ENABLED || choice !== "accepted") return undefined;
    const handleClick = (event) => {
      const link = event.target.closest("a");
      if (!link) return;
      const href = link.getAttribute("href") || "";
      const outboundPartner = link.dataset.analyticsPartner;
      if (outboundPartner) {
        trackEvent("partner_outbound_click", {
          partner: outboundPartner,
          placement: link.dataset.analyticsPlacement || "unknown",
          destination: link.href,
          link_text: link.innerText.trim().slice(0, 80)
        });
      }
      else if (href.includes("wa.me")) trackEvent("whatsapp_click", { link_text: link.innerText.trim().slice(0, 80) }, "Contact");
      else if (href.startsWith("tel:")) trackEvent("phone_click", {}, "Contact");
      else if (href.startsWith("mailto:")) trackEvent("email_click", {}, "Contact");
      else if (href.includes("/guias/")) trackEvent("guide_open", { destination: href });
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [choice]);

  if (!ANALYTICS_ENABLED || choice) return null;

  const save = (value) => { localStorage.setItem(CONSENT_KEY, value); setChoice(value); };
  return (
    <aside className="consent-banner" aria-label="Preferencias de medición">
      <button className="consent-close" type="button" onClick={() => save("rejected")} aria-label="Rechazar medición"><X size={18} /></button>
      <BarChart3 size={25} />
      <div>
        <strong>¿Nos permites medir la experiencia?</strong>
        <p>Usamos Google Analytics y Meta Pixel para entender qué funciona y mejorar nuestras campañas. No se activan hasta que aceptes.</p>
      </div>
      <div className="consent-actions">
        <button type="button" onClick={() => save("rejected")}>Rechazar</button>
        <button className="is-primary" type="button" onClick={() => save("accepted")}>Aceptar medición</button>
      </div>
    </aside>
  );
}
