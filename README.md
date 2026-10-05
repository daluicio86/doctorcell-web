# DoctorCell web app

## Home comercial

`npm run build` compila el cliente y una entrada de renderizado React en
`.prerender/`; el generador incorpora el contenido completo de la home en
`dist/index.html`. Las rutas secundarias conservan su contenido estático inicial.
Los metadatos de la home están en `index.html` y `src/App.jsx`.

La home presenta WhatsApp como acción principal, enlaces a reseñas por sucursal
y la rifa con sus fechas existentes. El contador usa UTC−5, cierra la participación
al terminar el 31 de octubre y cambia el mensaje el día del sorteo, sin inventar
una hora. Antes de publicar la promoción, el negocio debe completar su revisión
legal y confirmar la mecánica anunciada.

Las imágenes del catálogo se sirven en WebP; se conservan los originales.
No se publican precios nuevos por modelo ni cifras de reseñas sin confirmación.
`googleReviewSummary` en `src/data/siteData.js` admite `rating` y `count` verificados.

Con consentimiento, `whatsapp_click` incluye `placement`, `branch` y `page_path`.
Un clic no acredita un mensaje recibido: esa medición requiere conectar el canal
de WhatsApp o registrar conversaciones y ventas reales desde el CRM.

## Captura de leads

`npm run build` y `npm start` sirven la web y registran en `POST /api/leads`
los casos autorizados desde el chatbot. Los leads se guardan por defecto en
`data/leads.ndjson`, un archivo excluido de Git.

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

`npm run build` genera el índice `/guias/`, seis páginas temáticas, `robots.txt`
y `sitemap.xml`. El contenido fuente está en `scripts/generateSeoPages.mjs`.
Después de publicar, registra `https://www.doctorcell.com.ec/sitemap.xml` en
Google Search Console.

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
