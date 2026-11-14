export function isRepairStatusAvailable(env = process.env) {
  return Boolean(env.ZENTRA_STATUS_URL?.trim() && env.ZENTRA_STATUS_VERIFY_CONTACT === 'true');
}

export const repairStatuses = ['Recibido', 'En diagnóstico', 'Esperando autorización', 'En reparación', 'Esperando repuesto', 'Listo para entrega', 'Entregado'];
export async function queryRepairStatus(order, { contact = '', env = process.env, fetchImpl = fetch } = {}) {
  const endpoint = env.ZENTRA_STATUS_URL?.trim();
  if (!isRepairStatusAvailable(env)) {
    return {
      status: 503,
      body: { error: "Por ahora, solicita el estado de tu reparación directamente a nuestro equipo." }
    };
  }
  if (typeof order !== 'string' || !/^[A-Za-z0-9 -]{2,80}$/.test(order) || typeof contact !== 'string' || contact.length > 160 || !(/^\+?[\d ()-]{7,30}$/.test(contact) || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact))) return { status: 400, body: { error: 'Ingresa una orden y el teléfono o correo registrado.' } };

  try {
    const target = new URL(endpoint);
    const upstream = await fetchImpl(target, {
      method: 'POST',
      headers: { 'content-type': 'application/json', ...(env.ZENTRA_API_TOKEN ? { authorization: `Bearer ${env.ZENTRA_API_TOKEN}` } : {}) },
      body: JSON.stringify({ order: order.trim(), contact: contact.trim() }),
      signal: AbortSignal.timeout(8000)
    });
    const payload = await upstream.json();
    if (!upstream.ok || payload.contactVerified !== true) {
      return { status: 404, body: { error: 'No pudimos verificar los datos. Revisa la orden y el contacto o consulta con la sucursal.' } };
    }
    if (!repairStatuses.includes(payload.status)) return { status: 502, body: { error: 'Solicita el estado actualizado a la sucursal.' } };
    return { status: 200, body: { status: payload.status } };
  } catch {
    return { status: 502, body: { error: "El seguimiento en línea no está disponible en este momento." } };
  }
}
