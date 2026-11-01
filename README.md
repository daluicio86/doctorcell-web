# DoctorCell web app

## Home comercial

El diseño de laboratorio digital está en `src/styles/future.css`, cargado después
de los estilos base. La portada incluye un teléfono construido con CSS, luz
animada y una franja continua de marcas. `useSiteMotion` añade entradas al
desplazarse e iluminación de las tarjetas con el puntero; respeta
`prefers-reduced-motion` y pausa la escena cuando sale de pantalla. Las rutas de
citas, seguimiento, sucursales y tienda comparten la paleta oscura.

`npm run build` compila el cliente y una entrada de renderizado React en
`.prerender/`; el generador incorpora el contenido completo de la home en
`dist/index.html`. Las rutas secundarias conservan su contenido estático inicial.
Los metadatos de la home están en `index.html` y `src/App.jsx`.

La home presenta WhatsApp como acción principal y enlaces a reseñas por sucursal.
La promoción finalizada el 31 de octubre de 2026 fue retirada de la portada,
los avisos emergentes y el sitemap. La antigua ruta `/terminos-rifa/` redirige
al inicio en IIS, Netlify y el servidor Node.

Las imágenes del catálogo se sirven en WebP; se conservan los originales.
No se publican precios nuevos por modelo ni cifras de reseñas sin confirmación.
`googleReviewSummary` en `src/data/siteData.js` admite `rating` y `count` verificados.

Con consentimiento, `whatsapp_click` incluye `placement`, `branch` y `page_path`.
Un clic no acredita un mensaje recibido: esa medición requiere conectar el canal
de WhatsApp o registrar conversaciones y ventas reales desde el CRM.

## Herramienta: ¿Conviene reparar mi celular?

Disponible en `/conviene-reparar/`, con accesos desde la portada y el pie de página.
Evalúa falla, antigüedad y estado previo, sin solicitar costos al visitante.
Humedad, batería hinchada y falta de encendido priorizan el diagnóstico.
El precio y la viabilidad siempre requieren revisión técnica. Los enlaces
compartidos anteriores siguen abriendo la evaluación del equipo; los campos
de costos antiguos se ignoran y no se incluyen al volver a compartir.

El enlace compartido conserva las respuestas en el fragmento de URL y permite
reconstruir el resultado, sin guardar registros en el servidor. El destinatario
puede ver los datos incluidos y realizar su propia evaluación. Ofrece compartir
con el menú del dispositivo, copiar enlace con alternativa manual y compartir
por WhatsApp. Cotizar abre el WhatsApp del negocio con las respuestas y la
sucursal elegida. Los eventos `repair_decision_complete` y
`repair_decision_share` respetan el consentimiento de analítica existente.

## Captura de leads

El cotizador de la portada exige solo nombre, WhatsApp y falla, junto con una
autorización explícita para registrar y gestionar la consulta y sus seguimientos.
Marca, modelo y sucursal son opcionales; las fotos se envían directamente en
WhatsApp. Primero confirma el registro mediante `POST /api/leads` y luego abre
el chat. El nombre, contacto y falla quedan guardados aunque el visitante no
envíe el mensaje de WhatsApp. Un fallo de registro conserva el formulario y
permite reintentar; el mismo intento no crea leads duplicados. Los datos del
formulario no se persisten en el navegador.

El chatbot mantiene la conversación solo en memoria mientras la página está
abierta. Elimina el historial local de versiones anteriores, no lo restaura y
no guarda nuevos mensajes ni datos de contacto en el navegador. Rechazar el
registro también elimina el contacto de la conversación y del resumen; no
envía un lead al servidor. Crear un caso requiere elegir la autorización
explícita. Los casos ya registrados con autorización permanecen en el servidor.

## Solicitudes de cita

El formulario valida nombres y teléfonos móviles de Ecuador (`09XXXXXXXX`,
`5939XXXXXXXX` o `+5939XXXXXXXX`); admite otros números internacionales con
`+` y código de país. Las fechas y horas se interpretan en Quito (UTC−5): no
admite domingos, fechas pasadas ni turnos que ya comenzaron. La validación se
repite al solicitar la cita. El envío abre WhatsApp y la sucursal confirma la
disponibilidad; no representa una reserva automática.

## Registro y seguimiento de leads

`npm run build` y `npm start` sirven la web y registran en `POST /api/leads`
los casos autorizados desde el chatbot y el cotizador. Los leads se guardan por defecto en
`data/leads.ndjson`, un archivo excluido de Git.

La captura del cotizador requiere el servidor Node (`npm start`) o que el hosting
redirija `/api/leads` a ese servidor. Subir solo los archivos estáticos de `dist/`
a IIS no habilita el registro. Una respuesta HTML del hosting nunca se muestra
como registro exitoso.

Variables opcionales:

- `PORT`: puerto HTTP (4173 por defecto).
- `LEADS_FILE`: ruta del archivo NDJSON.
- `LEADS_WEBHOOK_URL`: reenvía cada lead nuevo a un CRM o automatización.
- `FOLLOWUP_WEBHOOK_URL`: recibe seguimientos para enviarlos por email, SMS o WhatsApp.
- `LEADS_ADMIN_TOKEN`: protege el registro de eventos internos.
- `FOLLOWUPS_FILE` y `LEAD_EVENTS_FILE`: rutas opcionales de cola y eventos.
- `ZENTRA_STATUS_URL`: activa la consulta automática del estado de una reparación.
- `ZENTRA_API_TOKEN`: token Bearer opcional para el servicio de estado de Zentra.

Si `ZENTRA_STATUS_URL` no está configurada, la página de seguimiento ofrece una
consulta asistida por WhatsApp y teléfono, sin mostrar un error técnico al cliente.

El archivo local debe respaldarse o montarse en almacenamiento persistente en
producción. Si el hosting usa un filesystem efímero, configura
`LEADS_WEBHOOK_URL`.

## Páginas SEO

`npm run build` genera el índice `/guias/`, once páginas temáticas, `robots.txt`
y `sitemap.xml`. El contenido fuente está en `scripts/generateSeoPages.mjs`.
Después de publicar, registra `https://doctorcell.com.ec/sitemap.xml` en
Google Search Console.

La portada incluye nueve tarjetas de servicio, con software y actualizaciones,
tablets y iPad, y smartwatches y Apple Watch como categorías propias. Las tres
categorías enlazan a sus guías específicas y a WhatsApp con el servicio en el
mensaje. La tarjeta de cámaras, audio y periféricos también menciona botones,
sensores y conectividad. Los nuevos servicios no publican precios ni plazos
sin diagnóstico.

Microsoldadura y cámaras, audio y periféricos enlazan a sus propias guías;
no se reutilizan para ellos las guías de humedad o de Xiaomi.

El dominio principal es `https://doctorcell.com.ec`, sin `www`. Canonical,
sitemap, robots, metadatos sociales, datos estructurados y enlaces compartidos
usan esa versión. `public/web.config` incluye redirecciones 301 de `www` y de
HTTP en IIS; `public/_redirects` incluye las equivalentes para Netlify. El
servidor Node redirige el host `www` con 301, conservando ruta y parámetros;
HTTPS se termina en el proxy o hosting. Estas reglas deben publicarse en el
hosting para entrar en vigor; no cambian la configuración remota por sí solas.

El negocio confirmó un único teléfono, `+593 98 322 2100`, y atención de lunes
a sábado de `09:00` a `18:00`. El contacto y horario compartidos están en
`src/data/businessInfo.js`; las tarjetas y fichas de sucursales y sus datos
estructurados reutilizan esa información. Los perfiles externos de Google Maps
y redes sociales se deben revisar en sus respectivas cuentas al publicar.

## Analítica y remarketing

Copia `.env.example` a `.env` y completa `VITE_GA4_ID` y
`VITE_META_PIXEL_ID`. GA4 y Meta Pixel utilizan consentimiento básico: ningún
script de medición se carga hasta que el visitante acepta. Se registran clics
en WhatsApp, teléfono, correo, guías y leads confirmados del chatbot.

## Seguimiento post-visita

Cada lead autorizado programa seguimientos a las 24 y 72 horas. El servidor
revisa la cola cada minuto y envía los trabajos vencidos a
`FOLLOWUP_WEBHOOK_URL`. El receptor puede ser un CRM, Make, Zapier o un servicio
propio de mensajería.

Los sistemas internos registran hitos mediante `POST
/api/leads/:caseId/events`, usando `Authorization: Bearer LEADS_ADMIN_TOKEN`.
Se admiten `appointment_confirmed`, `service_completed`, `lead_won` y
`lead_lost`. Una cita confirmada programa un aviso dos horas antes; un servicio
completado solicita una reseña a las 24 horas. El recordatorio de mantenimiento
a 90 días solo se crea cuando el evento incluye `marketingConsent: true`.
