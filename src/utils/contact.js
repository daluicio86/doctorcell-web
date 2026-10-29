export function isValidWhatsAppPhone(phone) {
  const value = typeof phone === "string" ? phone.trim() : "";
  if (!/^[+\d\s()-]+$/.test(value)) return false;
  const compact = value.replace(/[\s()-]/g, "");
  if (/^09\d{8}$/.test(compact)) return true;
  if (/^\+?593/.test(compact)) return /^\+?5939\d{8}$/.test(compact);
  return /^\+[1-9]\d{7,14}$/.test(compact);
}
