# Mejoras DoctorCell · 14 de noviembre de 2026

## Alcance y auditoría

Implementación en el repositorio local. No se publicó ni se modificó el hosting de doctorcell.com.ec.

Se revisaron la portada pública, el proyecto, los formularios, las integraciones, las rutas y el sitemap local. El sitio usa React 19, Vite 7, CSS existente, generación estática y un servidor Node. No se encontró un CMS ni un panel editorial. El sitemap y robots remotos no pudieron leerse con la herramienta web; la auditoría de esas rutas se hizo sobre los archivos del proyecto. No se accedió a Search Console, Analytics ni a Google Business Profile.

Ya estaban implementados el retiro de la rifa, la redirección 301 de `/terminos-rifa/`, citas por WhatsApp, catálogo, registro de consultas, reseñas enlazadas y guías. Se conservaron las URLs anteriores, el estilo oscuro y verde, las imágenes y las funciones. Los datos de contacto y horarios confirmados se siguen tomando de `businessInfo.js`.

## Cambios y descripción de las secciones

- Portada: titular centrado en pantalla rota; CTAs de WhatsApp, agendamiento y precios juntos. Acceso flotante de WhatsApp en móvil y escritorio. Bloque de confianza cuando no hay promoción vigente. CTA final de reparación.
- Cotizador: portada y `/cotizar/`; equipo, marca, modelo con sugerencias, reparación, descripción, sucursal opcional y datos de contacto. Validación accesible, consentimiento, enlaces legales, registro duradero e idempotente y confirmación visible antes de continuar por WhatsApp. Las nuevas consultas se guardan con `status: nuevo` y fecha.
- Foto opcional: selección local de JPG/PNG/WebP de hasta 5 MB. No se sube, previsualiza ni adjunta automáticamente. El texto explica que el cliente debe adjuntarla en WhatsApp. No hay almacenamiento público de imágenes personales.
- Precios: tabla en la portada y `/precios/`, filtros por marca/modelo/reparación, tiempo, repuesto, garantía y CTA. Sin tarifas verificadas se muestra “Solicitar cotización”. No se tomaron los valores antiguos genéricos del proyecto como tarifas aprobadas por modelo.
- Confianza: seis pasos del servicio; componentes para testimonios con fuente y casos reales antes/después. Ambos permanecen ocultos si faltan registros verificados. Se conservan las ilustraciones del proceso identificadas como ilustrativas.
- Información: privacidad, términos y garantía con borradores expresamente señalados; FAQ ampliado y página sobre el negocio. Los tres borradores llevan `noindex,follow` y quedan fuera del sitemap.
- Sucursales: dirección disponible con ciudad/provincia/país, mapas existentes, reseñas, contacto, horario, servicios para consultar, enlaces cruzados y cita con sucursal preseleccionada. Las fotografías se muestran al proporcionar material propio autorizado. No se inventaron números de local ni coordenadas nuevas.
- SEO: seis páginas de servicio diferentes en `/servicios/`, nueva guía MacBook, títulos/descripciones/canonical, FAQPage, BreadcrumbList, Organization, LocalBusiness y Service. No se usa `RepairService`, que no se necesita para describir el servicio. Las coordenadas existentes no entran al JSON-LD hasta validar `geoVerified`.
- Renderizado: todas las rutas React incluidas en el generador ahora entregan el contenido completo en HTML; antes las secundarias solo tenían un texto de respaldo. Se conservan las guías y el sitemap incorpora automáticamente las nuevas páginas publicables.
- Catálogo: conserva sus 76 productos, fotos, precios y pedido por WhatsApp. Añade tipo de producto y disponibilidad por sucursal, campos de garantía e inventario editables; elimina la disponibilidad afirmada para todos. Conserva los precios comerciales anteriores; su validación sigue pendiente. No se añadieron pagos ni checkout.
- Seguimiento: consulta con orden y contacto mediante POST. Solo se habilita con un proveedor que verifique ambos datos. Devuelve únicamente un estado permitido, sin devolver nombres, contactos ni mensajes privados del proveedor. Tiene timeout, respuesta privada sin caché y límite de intentos por conexión. Sin integración mantiene WhatsApp y una demostración local expresamente identificada.
- Accesibilidad: enlace para saltar al contenido, foco visible, controles amplios, etiquetas, errores asociados, un H1 por página y foco al confirmar una consulta. Fichas y pedido del catálogo mantienen el foco dentro del diálogo y cierran con Escape. Imágenes del catálogo con dimensiones y carga diferida. No se añadieron dependencias.

## Actualización de contenido

Editar `src/data/conversionContent.js` y ejecutar `npm run build`.

| Dato | Dónde editar | Reglas |
| --- | --- | --- |
| Promociones | `promotions` | `enabled: true`, `startsAt` y `endsAt` ISO con `-05:00`, título, descripción y enlace. Se omiten promociones desactivadas, futuras, vencidas o sin fechas válidas. |
| Tarifas | `publishedRepairPrices` | Añadir filas con id único, servicio de `repairTypes`, marca, modelo, min/max en USD, tiempo, repuesto, garantía y `verified: true`. Usar `*` para una fila general. Sin rango válido no se publica un valor. |
| Testimonios | `verifiedTestimonials` | Nombre, texto real, sucursal, URL HTTPS de la fuente y `verified: true`. Contar con autorización cuando corresponda. |
| Casos reales | `repairCases` | id, `verified` y `authorized` verdaderos, dos fotos propias (`before`, `after`), equipo, falla, solución, tiempo del caso y garantía aplicada. No subir pantallas con datos del cliente. |
| Locales | `branchMedia[slug]` | Dirección completa confirmada, `googleProfileUrl`, foto y alt. Imágenes en `public/images/social-proof/`. |
| FAQ y textos legales | `faqItems`, `legalPages` | Aprobar condiciones antes de quitar el marcador de borrador. Cambiar `draft` a `false` solo al aprobar; el build permite entonces indexación e inclusión en sitemap. |
| Puntuación de Google | `googleReviewSummary` en `siteData.js` | Solo `rating` y `count` comprobados; hoy permanece null. Conservar evidencia y fecha de consulta. |
| Stock/garantía de catálogo | `src/data/catalogOverrides.js` | Por id: `availableBranches: null` = consultar, `[]` = sin stock confirmado, array de slugs = disponibilidad confirmada. `warranty` debe ser un texto aprobado. |
| Contacto y horarios | `businessInfo.js` | Fuente compartida por páginas y datos estructurados. |

Las imágenes añadidas deben ser WebP, tener dimensiones razonables y contar con autorización. La galería anterior `galleryItems` se conserva para fotos generales del negocio. Una actualización de inventario o contenido requiere recompilar y desplegar; no hay edición remota desde un CMS. La expiración de promociones se evalúa al renderizar: programar un rebuild al vencer para mantener actualizado también el HTML estático sin JavaScript.

## Integraciones y variables

`.env.example` no contiene claves ni identificadores ficticios activos. Vite lee variables `VITE_*` durante la compilación; nunca colocar secretos en ellas. El servidor recibe sus variables desde el hosting/proceso (en desarrollo, puede iniciarse con `node --env-file=.env server.mjs`).

- `VITE_GA4_ID`, `VITE_META_PIXEL_ID`: opcionales; medición posterior al consentimiento. No se encontró GTM ni Google Ads existentes en los archivos auditados y no se añadieron etiquetas paralelas.
- `PORT`, `HOST`: puerto y dirección de escucha. Producción conserva `0.0.0.0`; QA local puede usar `127.0.0.1`.
- `LEADS_FILE`, `FOLLOWUPS_FILE`, `LEAD_EVENTS_FILE`: almacenamiento privado persistente. Respaldarlo y conservarlo al desplegar; no incluir datos reales en paquetes ni en Git.
- `LEADS_WEBHOOK_URL`, `FOLLOWUP_WEBHOOK_URL`: integraciones existentes de consultas y seguimientos. Configurar y probar únicamente con destinos autorizados.
- `LEADS_ADMIN_TOKEN`: autorización de eventos internos, nunca entregada al navegador.
- `ZENTRA_STATUS_URL`, `ZENTRA_API_TOKEN`: endpoint privado y token opcional del seguimiento.
- `ZENTRA_STATUS_VERIFY_CONTACT=true`: habilitar únicamente después de verificar que el proveedor compara el contacto con el registrado en la orden. Antes bastaba configurar la URL; ahora se exige este contrato para cerrar la consulta insegura solo por orden.

Contrato de seguimiento: el navegador envía `POST /api/repair-status` con `{ order, contact }`. El servidor reenvía por POST esos campos al endpoint, con Bearer si se configura. El proveedor responde `{ contactVerified: true, status: 'En reparación' }` solo después de verificar la coincidencia. Una respuesta sin verificación no muestra el estado. La lista permitida es Recibido, En diagnóstico, Esperando autorización, En reparación, Esperando repuesto, Listo para entrega, Entregado. Adaptar el proveedor, incluyendo los nombres exactos de los estados, antes de activar la bandera. La limitación actual es por conexión e instancia Node; revisar la configuración de proxy/IIS y un límite compartido si se despliegan varias instancias.

## Eventos de medición

| Evento | Disparador |
| --- | --- |
| `whatsapp_click` | Clic real en enlace de WhatsApp; incluye ubicación del botón y sucursal cuando está disponible. |
| `phone_click`, `email_click` | Clic en teléfono/correo. |
| `quote_start` | Primera edición del cotizador durante esa visita. |
| `quote_submit`, `generate_lead` | Registro confirmado por el servidor, no al pulsar un formulario inválido. |
| `directions_click` | Clic en enlace de Maps para ubicación/ruta. |
| `reviews_click` | Clic en reseñas. |
| `appointment_click` | Clic hacia agendamiento. |
| `appointment_submit` | Solicitud válida preparada para WhatsApp; no equivale a reserva confirmada. |

Los nuevos eventos no incluyen nombre, teléfono, descripción, foto ni referencia privada del caso. GA4 y Meta requieren consentimiento. Un clic en WhatsApp no demuestra que se envió un mensaje. Verificar los eventos en DebugView con IDs reales antes de publicar. No se validaron etiquetas dentro de cuentas externas. Las guías estáticas conservan su mecanismo de consentimiento previo; la cobertura de nuevos eventos se concentra en las páginas React.

## Pendientes del propietario

1. Tarifas reales por modelo, tiempos orientativos, clase de repuesto y garantía por servicio.
2. Razón social, identificación, domicilio legal, plazos de conservación, proveedores y textos aprobados de privacidad/términos/garantía; validar envíos, diagnóstico no reparable, respaldo, tarjetas, transferencias y demás pagos.
3. Fotos reales de locales y casos antes/después autorizados, testimonios con fuente, puntuación y cantidad verificadas de reseñas.
4. URLs exactas de perfiles Google de cada sede, numeración completa de los locales y coordenadas verificadas. Los enlaces actuales son búsquedas en Maps, no Place IDs confirmados.
5. Disponibilidad y garantía del inventario por sucursal. Se conservan categorías con productos existentes; pantallas, baterías y protectores pueden añadirse con fichas/fotos reales, sin inventar stock.
6. IDs reales de analítica y acceso a Search Console para inspeccionar las URLs publicadas. Configuración y prueba del proveedor de seguimiento con verificación de contacto.
7. Revisar las afirmaciones comerciales anteriores conservadas, incluidas experiencia, catálogo y campaña de entrega. No se añadieron reseñas, cifras, certificaciones ni promesas nuevas.

## Verificaciones realizadas y plan antes de publicar

Ejecutar, en orden: `npm test`, `npm run build`, `node scripts/verifyStaticSite.mjs`. La auditoría estática produce `verification/conversion-static-check.json`.

Realizado: 33 pruebas automatizadas aprobadas; compilación de cliente y SSR; 37 HTML con un H1, metadata, JSON-LD legible y recursos/enlaces internos existentes; 34 URLs de sitemap resueltas, sin borradores ni rifa. Navegador a 1366 × 900, 390 × 844 y 360 × 800: portada, cotizador, filtros, catálogo, ficha de sucursal y demostración de seguimiento. En 360 × 800 los tres CTAs de portada terminan antes de 622 px. Se probó una consulta sintética contra almacenamiento local aislado; no se abrió su enlace de WhatsApp ni se enviaron mensajes. Se comprobó catálogo vacío por sede sin stock, restablecer sus 76 productos, apertura de ficha y cierre con Escape.

| Entorno | Prueba pendiente antes de publicación |
| --- | --- |
| Android físico y Safari iOS | WhatsApp instalado/no instalado, llamadas, teclado, selector de foto, rotación y barra inferior. |
| Móvil 320/360/390 px | Texto al 200 %, formulario completo, errores, foco, tabla con desplazamiento lateral y menús. |
| Escritorio Chrome/Edge/Firefox | Teclado Tab/Shift+Tab/Escape, foco en diálogos y navegación sin mouse. |
| Red lenta / gama media | Lighthouse y Core Web Vitals, imágenes, fuentes, carga inicial y mapas. No se midió una puntuación Lighthouse en esta entrega. |
| Formularios y servidor de staging | Error 400/413/timeout/desconexión, reintentos sin duplicados, consentimiento no marcado y persistencia tras reinicio. |
| Seguimiento integrado | Orden ajena, contacto incorrecto, error del proveedor, respuesta sin verificación y límite de intentos. Nunca mostrar campos privados. |
| Analítica | Rechazar/aceptar, ausencia de duplicados y recepción de eventos con IDs reales, sin datos personales. |
| Hosting/SEO | Respuestas 200, redirecciones 301 existentes, canonical sin www, sitemap/robots, JSON-LD en validadores y contenido prerenderizado sin JavaScript. Comparar URLs con Search Console. |

Despliegue: aprobar contenido pendiente, respaldar `data/`, compilar y publicar el servidor Node junto con `dist/` y su configuración IIS existente. Subir solo HTML no habilita `/api/leads`. `npm run release` conserva el empaquetador existente para preparar el ZIP completo; no se ejecutó una publicación remota. Mantener una copia del paquete anterior para reversión.

## Archivos

El manifiesto completo está en `verification/conversion-changed-files.txt`. Las carpetas `dist/` y las guías/sitemap de `public/` contienen salidas generadas; los archivos fuente de esas salidas son los scripts, datos y componentes. No editar directamente los HTML generados.
