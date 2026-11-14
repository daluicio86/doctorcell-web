// Contenido administrable sin CMS. Publicar solo información validada por el negocio.
export const promotions = [];
// Ejemplo: { id, enabled: true, startsAt: '2026-12-01T00:00:00-05:00',
// endsAt: '2026-12-31T23:59:59-05:00', title, description, href: '/cotizar/' }
export function activePromotions(items = promotions, now = Date.now()) {
  return items.filter((item) => item.enabled === true && Number.isFinite(Date.parse(item.startsAt))
    && Number.isFinite(Date.parse(item.endsAt)) && Date.parse(item.startsAt) <= now && now <= Date.parse(item.endsAt));
}

export const deviceTypes = ['Celular', 'Tablet', 'MacBook', 'Smartwatch'];
export const repairTypes = ['Pantalla', 'Batería', 'Puerto de carga', 'Cámara', 'Audio', 'Humedad', 'Software', 'Microsoldadura', 'Otro'];
export const modelSuggestions = ['iPhone 11', 'iPhone 12', 'iPhone 13', 'iPhone 14', 'iPhone 15', 'Galaxy A54', 'Galaxy S23', 'Redmi Note 13', 'iPad', 'MacBook Air', 'MacBook Pro', 'Apple Watch'];
export const publishedRepairPrices = [];
// Agregar filas aprobadas aquí: { id, service, brand, model, min, max,
// estimatedTime, partType, warranty, verified: true }.

// min/max son USD. null evita publicar precios o condiciones sin confirmar.
// Para una tarifa específica, indicar brand y model; '*' aplica a cualquier equipo.
export const repairPrices = [...publishedRepairPrices, ...repairTypes.map((service) => ({
  id: service, service, brand: '*', model: '*', min: null, max: null,
  estimatedTime: null, partType: null, warranty: null, verified: false
}))];
export function priceLabel(row) {
  return row.verified && Number.isFinite(row.min) && Number.isFinite(row.max) && row.min >= 0 && row.max >= row.min
    ? `$${row.min}–$${row.max} USD` : 'Solicitar cotización';
}

export const verifiedTestimonials = [];
// { name, text, branch, sourceUrl: 'https://...', verified: true }
export const repairCases = [];
// { id, verified: true, authorized: true, before, after, device, fault,
// solution, estimatedTime, warranty }. before/after: fotos propias en /images/social-proof/.
export const branchMedia = {};
// Por slug: { photo: '/images/social-proof/local.webp', alt, fullAddress,
// googleProfileUrl }. No usar coordenadas o numeraciones sin validación.

export const faqItems = [
  ['¿Cuánto tarda una reparación?', 'El plazo se confirma después del diagnóstico, según el modelo, la falla, la disponibilidad del repuesto y las pruebas necesarias. Solicita una estimación para tu caso.'],
  ['¿Usan repuestos originales?', 'Consulta las opciones para tu modelo. El tipo de repuesto y su disponibilidad se deben confirmar antes de autorizar la reparación.'],
  ['¿Qué garantía tienen las reparaciones?', 'Borrador para validación: la duración, cobertura y exclusiones por servicio deben constar en la orden. Consulta las condiciones aplicables antes de autorizar.'],
  ['¿Puedo enviar mi equipo desde otra ciudad?', 'Borrador para validación: consulta primero si se recibe tu equipo y cómo se coordinarían transporte, costos y devolución. No lo envíes sin confirmación.'],
  ['¿Hacen respaldo de información?', 'Borrador para validación: solicita y confirma el alcance del respaldo antes de entregar tu equipo. No se promete recuperación ni conservación de datos sin evaluar el caso.'],
  ['¿Qué pasa si el equipo no se puede reparar?', 'Borrador para validación: confirma previamente las condiciones del diagnóstico, sus posibles costos y la devolución del equipo.'],
  ['¿Necesito cita previa?', 'Puedes solicitar una revisión en /agendar/. La sucursal debe confirmar la disponibilidad; enviar la solicitud no reserva automáticamente un turno.'],
  ['¿Aceptan tarjetas o transferencias?', 'Borrador para validación: confirma los medios de pago habilitados con la sucursal. La web no procesa pagos.'],
  ['¿Cuánto cuesta reparar una pantalla en Quito?', 'Depende de la marca, modelo, repuesto y diagnóstico. Usa el cotizador o consulta los precios orientativos; el valor final requiere confirmación.'],
  ['¿Qué hago si mi celular se mojó?', 'Evita cargarlo y solicita una evaluación técnica. Comunica qué líquido lo afectó y cuándo ocurrió para orientar la revisión.']
];

export const legalPages = {
  '/politica-privacidad': {
    heading: 'Política de privacidad', description: 'Información sobre consultas, consentimiento y tratamiento de datos en DoctorCell Quito.', draft: true,
    sections: [
      ['Responsable y contacto', 'DoctorCell Quito. Canal de contacto: dc.infouio@gmail.com y +593 98 322 2100. Pendiente de validar: razón social, identificación y domicilio legal del responsable.'],
      ['Datos y finalidad', 'El cotizador solicita nombre, WhatsApp e información del equipo para registrar y gestionar la consulta, incluidos sus seguimientos autorizados. No envía la consulta sin marcar la autorización. La foto opcional se selecciona en tu dispositivo; debes adjuntarla manualmente en WhatsApp.'],
      ['Almacenamiento y proveedores', 'Las consultas autorizadas se guardan en el servidor. El negocio debe validar quién accede, el plazo de conservación y los proveedores de CRM o mensajería antes de publicar esta política. No incluimos información del formulario en los eventos de medición.'],
      ['WhatsApp, mapas y medición', 'Al continuar por WhatsApp compartes el mensaje con ese servicio. Los mapas embebidos se conectan con Google. GA4 y Meta Pixel, si están configurados, se activan después de aceptar la medición. Puedes cambiar la preferencia desde el pie de página.'],
      ['Solicitudes sobre tus datos', 'Puedes escribir al correo de contacto para consultar el tratamiento de tu información. Pendiente de validación legal: procedimiento de identificación, derechos aplicables, plazos de respuesta, conservación, transferencias y gestión de incidentes.']
    ]
  },
  '/terminos-y-condiciones': {
    heading: 'Términos y condiciones', description: 'Condiciones de consultas y solicitudes de revisión en DoctorCell Quito.', draft: true,
    sections: [
      ['Cotizaciones y citas', 'Los precios orientativos no constituyen una oferta definitiva. Repuesto, alcance, tiempo y precio requieren diagnóstico y autorización. Las solicitudes de cita requieren confirmación de la sucursal.'],
      ['Recepción y autorización', 'Pendiente de validar: registro del estado del equipo, presupuesto, costo del diagnóstico, aprobación del cliente y condiciones de custodia y entrega.'],
      ['Catálogo y pagos', 'El catálogo permite consultar productos por WhatsApp; no cobra en la web. Confirma compatibilidad, disponibilidad por sucursal, precio final y condiciones de entrega. Pendiente: medios de pago y devoluciones.'],
      ['Datos y responsabilidad', 'Pendiente de validar: respaldo de información, equipos con intervenciones anteriores, cancelaciones, equipos no retirados y procedimiento de reclamos. Consulta también la política de privacidad y la página de garantía.']
    ]
  },
  '/garantia': {
    heading: 'Garantía de reparación', description: 'Qué confirmar sobre duración, cobertura y solicitud de garantía de una reparación.', draft: true,
    sections: [
      ['Duración por tipo de reparación', 'Pendiente de validación del propietario: duración para pantalla, batería, carga, cámara, audio, software y microsoldadura. No hay un plazo publicado hasta recibir las condiciones aprobadas por servicio y repuesto.'],
      ['Qué cubre', 'Pendiente: definir las fallas cubiertas del componente o trabajo realizado y las condiciones que deben constar por escrito en la orden de servicio.'],
      ['Qué no cubre', 'Pendiente: validar exclusiones y su alcance. No se publican exclusiones generales ni se limitan derechos del cliente sin revisión de las condiciones.'],
      ['Humedad, golpes y manipulación previa', 'Estos antecedentes deben informarse al recibir el equipo. La viabilidad y las condiciones específicas requieren evaluación. Pendiente: aprobar la cobertura aplicable a cada caso.'],
      ['Cómo solicitar revisión de garantía', 'Contacta a la sucursal con tu número de orden y describe la falla. Confirma el procedimiento y la documentación necesaria antes de enviar o entregar el equipo. No publiques contraseñas ni códigos de acceso.']
    ]
  },
  '/sobre-nosotros': {
    heading: 'Sobre DoctorCell', description: 'Servicio técnico de celulares, tablets, MacBook y smartwatches en cuatro sucursales de Quito.', draft: false,
    sections: [
      ['Atención en Quito', 'DoctorCell atiende consultas de reparación de celulares, tablets, MacBook y smartwatches en Prensa, Colón, Shyris y Vaca de Castro. Horario: lunes a sábado, de 09:00 a 18:00.'],
      ['Primero, entender la falla', 'Comparte el modelo y los síntomas para orientar la revisión. El diagnóstico permite definir las opciones, disponibilidad del repuesto y precio antes de autorizar el trabajo.'],
      ['Hablemos de tu equipo', 'Escríbenos al +593 98 322 2100 o a dc.infouio@gmail.com. Puedes solicitar una cita o elegir la sucursal que te quede más cerca.']
    ]
  }
};

export const servicePages = [
  { slug: 'cambio-pantalla-iphone-quito', heading: 'Cambio de pantalla iPhone en Quito', description: '¿Vidrio roto, manchas o táctil que falla? Consulta opciones de pantalla para tu iPhone en DoctorCell Quito.', intro: 'Una pantalla rota puede afectar el uso del táctil, la imagen o ambos. Indícanos el modelo de iPhone y qué dejó de funcionar para orientar la revisión.', symptoms: ['Vidrio agrietado o desprendido.', 'Manchas, líneas o imagen negra.', 'Táctil intermitente o sin respuesta.'], process: 'Revisamos imagen, respuesta táctil y estado del equipo. Confirmamos las opciones de repuesto para el modelo antes de autorizar el cambio y comprobamos las funciones relacionadas al terminar.', guide: 'cambio-pantalla-iphone-quito', faqs: [['¿Se cambia solo el vidrio?', 'Depende del daño y las opciones disponibles para el modelo. Requiere evaluación.'], ['¿Se conserva Face ID?', 'Debe revisarse su estado antes y después del trabajo. Consulta el alcance para tu modelo.']] },
  { slug: 'cambio-bateria-samsung-quito', heading: 'Cambio de batería Samsung en Quito', description: 'Consulta por descarga rápida, apagados o fallas de batería Samsung en Quito. Diagnóstico y cotización por modelo.', intro: 'Si tu Samsung pierde autonomía, conviene revisar el consumo y la batería antes de proponer un reemplazo. Cuéntanos cuánto dura y si se apaga o se calienta.', symptoms: ['Autonomía menor a la habitual.', 'Apagados inesperados.', 'Carcasa levantada o batería deformada.'], process: 'Evaluamos consumo, carga y condición física. Si corresponde un reemplazo, confirmamos batería, costo y plazo; después comprobamos carga y funcionamiento.', guide: 'cambio-bateria-celular-quito', faqs: [['¿La descarga rápida siempre es la batería?', 'También puede relacionarse con software, uso o carga. Primero se identifica la causa.'], ['¿Qué hago si está hinchada?', 'Deja de cargarla, evita presionarla y solicita una revisión técnica.']] },
  { slug: 'reparacion-puerto-carga-xiaomi-quito', heading: 'Reparación de puerto de carga Xiaomi en Quito', description: '¿Tu Xiaomi carga de forma intermitente? Consulta revisión del puerto, cable y circuito de carga en Quito.', intro: 'Una carga intermitente no confirma por sí sola que el puerto esté dañado. Revisamos el síntoma para distinguir entre cable, conector y circuito de carga.', symptoms: ['Solo carga al mover el cable.', 'No reconoce el cargador.', 'Conector flojo o conexión de datos intermitente.'], process: 'Comprobamos alimentación y conexión, identificamos el componente afectado y presentamos el trabajo propuesto. Tras la intervención revisamos la carga y las funciones relacionadas.', guide: 'celular-no-carga-quito', faqs: [['¿Necesita cambiar el puerto?', 'Se determina después de revisar el conector y los demás elementos de carga.'], ['¿Puedo usar objetos para limpiarlo?', 'Evita introducir objetos o líquidos; solicita una evaluación para no dañar el conector.']] },
  { slug: 'reparacion-celular-mojado-quito', heading: 'Reparación de celular mojado en Quito', description: 'Evaluación de celulares afectados por líquidos en Quito. Consulta diagnóstico de humedad y viabilidad de reparación.', intro: 'El daño por líquido depende del tiempo transcurrido y los componentes afectados. Informa cuándo ocurrió, qué líquido fue y si intentaste encender o cargar el equipo.', symptoms: ['Fallas después del contacto con líquido.', 'Cámara empañada o sonido irregular.', 'No enciende o se reinicia.'], process: 'Registramos los antecedentes y evaluamos el estado interno. Explicamos los hallazgos y la viabilidad antes de cualquier trabajo autorizado. No se garantiza recuperación antes del diagnóstico.', guide: 'celular-mojado-que-hacer', faqs: [['¿Lo puedo cargar para comprobar?', 'Evita cargarlo y solicita evaluación técnica.'], ['¿Se pueden recuperar los datos?', 'Depende del daño. Indica si la información es prioritaria; no se garantiza su recuperación.']] },
  { slug: 'reparacion-macbook-quito', heading: 'Reparación de MacBook en Quito', description: 'Consulta diagnóstico de pantalla, batería, carga y funcionamiento de MacBook en DoctorCell Quito.', intro: 'Comparte el modelo y año de tu MacBook y describe la falla. Esos datos permiten orientar la recepción y confirmar qué revisión está disponible.', symptoms: ['No enciende o no carga.', 'Pantalla con líneas o sin imagen.', 'Autonomía reducida o reinicios.'], process: 'Confirmamos el modelo y sus antecedentes, evaluamos la falla y consultamos disponibilidad de componentes. El alcance y las pruebas se acuerdan antes del trabajo.', guide: 'reparacion-macbook-quito', faqs: [['¿Atienden cualquier año de MacBook?', 'La viabilidad y disponibilidad se confirman para el modelo específico.'], ['¿Debo compartir mi contraseña?', 'No la envíes por el formulario ni por WhatsApp; coordina con el técnico las pruebas necesarias.']] },
  { slug: 'reparacion-apple-watch-quito', heading: 'Reparación de Apple Watch en Quito', description: 'Consulta opciones de revisión de batería, carga y pantalla de Apple Watch en DoctorCell Quito.', intro: 'Indica la serie y tamaño del Apple Watch y si presenta fallas de carga, autonomía o pantalla. Confirmamos las opciones de revisión para ese modelo.', symptoms: ['No reconoce la carga.', 'Batería de corta duración.', 'Pantalla rota o sin respuesta.'], process: 'Evaluamos el estado, identificamos las funciones afectadas y confirmamos componentes y alcance. Consulta expresamente qué condiciones se aplican después de abrir el equipo.', guide: 'reparacion-smartwatch-apple-watch-quito', faqs: [['¿Mantiene la resistencia al agua?', 'No debe asumirse después de una intervención; consulta las condiciones y pruebas aplicables.'], ['¿Hay repuestos para todas las series?', 'La disponibilidad debe confirmarse con la sucursal antes de autorizar.']] }
];
