export function isRepairStatusAvailable(env = process.env) {
  return Boolean(env.ZENTRA_STATUS_URL?.trim());
}

export async function queryRepairStatus(order, { env = process.env, fetchImpl = fetch } = {}) {
  const endpoint = env.ZENTRA_STATUS_URL?.trim();
  if (!endpoint) {
    return {
      status: 503,
      body: { error: "Por ahora, solicita el estado de tu reparación directamente a nuestro equipo." }
    };
  }

  try {
    const target = new URL(endpoint);
    target.searchParams.set("order", order);
    const upstream = await fetchImpl(target, {
      headers: env.ZENTRA_API_TOKEN ? { authorization: `Bearer ${env.ZENTRA_API_TOKEN}` } : {}
    });
    const payload = await upstream.json();
    if (!upstream.ok) {
      return { status: upstream.status, body: { error: payload.error || "No pudimos consultar esta orden." } };
    }
    return { status: 200, body: payload };
  } catch {
    return { status: 502, body: { error: "El seguimiento en línea no está disponible en este momento." } };
  }
}
