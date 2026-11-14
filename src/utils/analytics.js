const rawGA4 = import.meta.env.VITE_GA4_ID?.trim() || '';
const rawMeta = import.meta.env.VITE_META_PIXEL_ID?.trim() || '';
const GA4_ID = /^G-[A-Z0-9]+$/.test(rawGA4) && rawGA4 !== 'G-XXXXXXXXXX' ? rawGA4 : '';
const META_PIXEL_ID = /^\d{10,20}$/.test(rawMeta) && !/^0+$/.test(rawMeta) ? rawMeta : '';
export const ANALYTICS_ENABLED = Boolean(GA4_ID || META_PIXEL_ID);
export const CONSENT_KEY = "doctorcell-analytics-consent-v1";

function addScript(id, src) {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id; script.async = true; script.src = src;
  document.head.appendChild(script);
}

export function initializeAnalytics() {
  if (!ANALYTICS_ENABLED || window.__doctorcellAnalyticsReady) return;
  window.__doctorcellAnalyticsReady = true;

  if (GA4_ID) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments); };
    window.gtag("consent", "default", { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
    window.gtag("consent", "update", { analytics_storage: "granted", ad_storage: "granted", ad_user_data: "granted", ad_personalization: "granted" });
    window.gtag("js", new Date());
    window.gtag("config", GA4_ID, { send_page_view: true });
    addScript("doctorcell-ga4", `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA4_ID)}`);
  }

  if (META_PIXEL_ID) {
    const fbq = window.fbq = window.fbq || function pixelQueue() { fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments); };
    if (!window._fbq) window._fbq = fbq;
    fbq.push = fbq; fbq.loaded = true; fbq.version = "2.0"; fbq.queue = fbq.queue || [];
    addScript("doctorcell-meta-pixel", "https://connect.facebook.net/en_US/fbevents.js");
    fbq("init", META_PIXEL_ID);
    fbq("track", "PageView");
  }
}

export function trackEvent(name, parameters = {}, metaEvent = "") {
  try { if (localStorage.getItem(CONSENT_KEY) !== 'accepted') return; } catch { return; }
  if (GA4_ID && window.gtag) window.gtag("event", name, parameters);
  if (META_PIXEL_ID && window.fbq) {
    if (metaEvent) window.fbq("track", metaEvent, parameters);
    else window.fbq("trackCustom", name, parameters);
  }
}
