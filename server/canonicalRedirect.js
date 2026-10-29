import { SITE_ORIGIN } from "../src/data/siteConfig.js";

export function canonicalRedirect(host, requestTarget = "/") {
  const hostname = String(host || "").toLowerCase().replace(/:\d+$/, "");
  if (hostname !== "www.doctorcell.com.ec") return null;
  const url = new URL(requestTarget, SITE_ORIGIN);
  return `${SITE_ORIGIN}${url.pathname}${url.search}`;
}
