import { mkdir, readFile, writeFile as rawWriteFile } from "node:fs/promises";
import { resolve } from "node:path";
import { loadEnv } from "vite";
import { SITE_ORIGIN } from "../src/data/siteConfig.js";
import { whatsappNumber } from "../src/data/businessInfo.js";

const origin = SITE_ORIGIN;
const buildEnv = loadEnv(process.env.NODE_ENV || "production", process.cwd(), "VITE_");
const ga4Id = /^G-[A-Z0-9]+$/.test(buildEnv.VITE_GA4_ID || "") ? buildEnv.VITE_GA4_ID : "";
const metaPixelId = /^\d{10,20}$/.test(buildEnv.VITE_META_PIXEL_ID || "") ? buildEnv.VITE_META_PIXEL_ID : "";
const wa = (text) => `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
const writeFile = async (path, data) => {
  try {
    if ((await readFile(path, "utf8")).trimEnd() === data.trimEnd()) return;
  } catch (error) {
    if (error?.code !== "ENOENT") throw error;
  }
  try {
    await rawWriteFile(path, data);
  } catch (error) {
    if (error?.code !== "EPERM") throw error;
    const current = await readFile(path, "utf8");
    if (current.trimEnd() !== data.trimEnd()) throw error;
  }
};
const pages = [
  {
    slug: "cambio-pantalla-iphone-quito", title: "Cambio de pantalla iPhone en Quito",
    description: "Guía para cambiar la pantalla de un iPhone en Quito: tipos de daño, repuestos y pruebas finales.",
    intro: "Una caída puede romper solo el vidrio o afectar también el táctil y la imagen. Identificar el daño evita una reparación incorrecta.",
    sections: [
      ["¿Qué parte está dañada?", "Si la imagen se ve normal y el táctil responde en toda la superficie, el daño puede estar limitado al vidrio. Líneas, manchas negras, parpadeos, zonas sin imagen o respuesta irregular suelen indicar daño en el módulo. La confirmación requiere revisar el equipo y el modelo exacto."],
      ["Qué preguntar antes del cambio", "Solicita que te expliquen el tipo de repuesto, valor total y tiempo estimado. Confirma que brillo, sensores, cámara frontal y respuesta táctil serán probados antes de la entrega."],
      ["Antes y después de reparar", "Haz una copia de seguridad si todavía funciona. Al retirarlo prueba el táctil completo, brillo, colores, cámaras, audio y sensores. Revisa el cierre del marco y conserva el comprobante del servicio."]
    ], faqs: [["¿Cuánto tarda?", "Depende del modelo, la disponibilidad del repuesto y las pruebas finales."], ["¿Se borran mis datos?", "Normalmente no, pero siempre conviene contar con una copia de seguridad."], ["¿Puedo usarlo roto?", "No es recomendable: el daño puede avanzar y permitir la entrada de humedad."]]
  },
  {
    slug: "cambio-pantalla-samsung-quito", title: "Cambio de pantalla Samsung en Quito",
    description: "Qué revisar antes de cambiar una pantalla Samsung en Quito: módulo, táctil, imagen y repuesto.",
    intro: "En muchos Samsung la imagen y el táctil forman parte de un módulo. El modelo y el diagnóstico importan tanto como el repuesto.",
    sections: [
      ["Vidrio, táctil o display", "Manchas moradas, líneas verticales, pantalla negra con sonido o zonas sin respuesta apuntan a una afectación interna. No presiones el panel: una mancha pequeña puede extenderse."],
      ["El modelo exacto cambia la reparación", "Galaxy A, S, Note y Z usan componentes diferentes, incluso entre variantes del mismo nombre. Consulta en Ajustes o en la etiqueta el código de modelo para verificar compatibilidad."],
      ["Pruebas y protección", "Antes de entregar deben comprobarse táctil, brillo, color, proximidad, huella y cámaras según el modelo. Después usa una funda con borde elevado y un protector compatible."]
    ], faqs: [["¿Se cambia solo el vidrio?", "Depende del modelo y del daño; una revisión determina si es viable."], ["¿Funcionará la huella?", "Debe comprobarse según el modelo y el repuesto."], ["¿Necesito el código de modelo?", "Sí, es más preciso que el nombre comercial."]]
  },
  {
    slug: "celular-mojado-que-hacer", title: "Qué hacer si tu celular se mojó",
    description: "Pasos seguros si tu celular se mojó: qué apagar, qué evitar y cuándo buscar diagnóstico por humedad en Quito.",
    intro: "Los primeros minutos importan. El objetivo no es secar solo el exterior, sino evitar energía y corrosión dentro del equipo.",
    sections: [
      ["Apágalo y desconéctalo", "Apágalo sin seguir probando funciones. Desconecta cargadores, quita la funda y seca el exterior con un paño. Retira la batería solo si el modelo permite hacerlo sin forzar el equipo."],
      ["No lo cargues ni uses calor", "No lo conectes para comprobar si enciende. Evita secadores, hornos, sol directo y aire caliente: pueden deformar adhesivos y desplazar la humedad."],
      ["El arroz no elimina la corrosión", "Puede absorber algo de humedad ambiental, pero no limpia residuos internos y puede contaminar conectores. Un equipo que vuelve a encender aún puede fallar días después."],
      ["Busca revisión pronto", "Indica qué líquido fue, cuánto duró la exposición y si intentaste encenderlo. Agua salada y bebidas dejan residuos especialmente agresivos."]
    ], faqs: [["¿Lo pongo en arroz?", "No es una reparación y puede contaminar conectores."], ["¿Puedo cargarlo si parece seco?", "No; la humedad interna puede causar un cortocircuito."], ["¿Se recuperan los datos?", "Depende del daño. Indica si los datos son tu prioridad."]]
  },
  {
    slug: "cambio-bateria-celular-quito", title: "Cambio de batería de celular en Quito",
    description: "Señales para cambiar la batería: descarga rápida, apagados, calentamiento y batería hinchada.",
    intro: "La autonomía baja puede venir de la batería, del sistema o de una aplicación. Una prueba evita reemplazos innecesarios.",
    sections: [
      ["Señales de degradación", "Descarga acelerada, apagados con porcentaje disponible, reinicios, carga lenta o calentamiento justifican una revisión. La señal débil, aplicaciones y errores de software también aumentan el consumo."],
      ["Si está hinchada", "Deja de cargar y usar el equipo. No presiones la tapa, no perfores la batería y aléjala del calor. Una batería deformada requiere atención prioritaria."],
      ["Qué debe incluir el servicio", "Pregunta por compatibilidad, valor total y tiempo. Después del cambio deben revisarse carga, consumo, temperatura, encendido y cierre correcto."]
    ], faqs: [["¿Cuándo debo cambiarla?", "Cuando una prueba confirma degradación o existen apagados, hinchazón o autonomía insuficiente."], ["¿Pierdo datos?", "Normalmente no, pero recomendamos una copia de seguridad."], ["¿Es peligroso usarla hinchada?", "Sí. Apaga el equipo y no lo cargues."]]
  },
  {
    slug: "celular-no-carga-quito", title: "Mi celular no carga: diagnóstico en Quito",
    description: "Qué revisar cuando un celular no carga: cable, adaptador, suciedad, puerto, batería y diagnóstico técnico.",
    intro: "Que un teléfono no cargue no significa automáticamente que el puerto esté dañado. Empieza por pruebas seguras.",
    sections: [
      ["Descarta cable y adaptador", "Prueba accesorios compatibles que funcionen con otro equipo. Si la carga aparece al mover el cable, deja de forzarlo para evitar mayor daño."],
      ["No introduzcas objetos", "Pelusa compactada puede impedir el contacto, pero agujas y metal pueden doblar pines o causar un corto. No uses líquidos. Si ves corrosión o pines deformados, solicita revisión."],
      ["Puede ser batería o placa", "Si se calienta, huele extraño, se reinicia o no responde con accesorios comprobados, desconéctalo. El diagnóstico debe diferenciar puerto, batería, circuito y software."],
      ["Qué contar al técnico", "Lleva el cable habitual y explica desde cuándo falla, si hubo golpe o humedad y si carga de forma inalámbrica."]
    ], faqs: [["¿Uso una aguja?", "No; el metal puede dañar contactos o causar un corto."], ["¿Por qué carga en una posición?", "Puede existir suciedad, desgaste del cable o daño del conector."], ["¿Siempre se cambia el puerto?", "No. Primero se descartan accesorios, suciedad y batería."]]
  },
  {
    slug: "reparacion-xiaomi-quito", title: "Reparación de celulares Xiaomi en Quito",
    description: "Diagnóstico de celulares Xiaomi, Redmi y POCO en Quito: pantalla, batería, carga, cámaras y software.",
    intro: "Xiaomi, Redmi y POCO comparten familias, pero no siempre componentes. El código exacto evita errores de compatibilidad.",
    sections: [
      ["Identifica modelo y falla", "Busca el nombre y código en Ajustes, la caja o etiqueta. Describe si hubo golpe, humedad, actualización o calentamiento. Una misma falla visible puede tener causas distintas."],
      ["Pantalla, batería y carga", "Líneas, manchas o táctil irregular requieren revisar el módulo. En carga deben descartarse accesorios y suciedad antes de reemplazar el conector."],
      ["Problemas de software", "Reinicios, lentitud y bloqueos pueden requerir diagnóstico de almacenamiento, aplicaciones o sistema. Pregunta si el proceso borrará datos y respáldalos cuando sea posible."],
      ["Antes de autorizar", "Confirma repuesto compatible, costo y plazo. Al retirarlo prueba pantalla, cámaras, audio, carga, conectividad y sensores."]
    ], faqs: [["¿Reparan Redmi y POCO?", "Depende del modelo y repuesto; consulta con el código exacto."], ["¿Se borran datos al actualizar?", "No siempre, pero ciertos procesos de recuperación sí pueden hacerlo."], ["¿Dónde veo el modelo?", "En Ajustes, la caja o la etiqueta del equipo."]]
  },
  {
    slug: "software-celulares-quito", title: "Software y actualizaciones de celulares en Quito",
    description: "Diagnóstico de lentitud, reinicios, errores y actualizaciones de Android o iOS en Quito. Consulta el alcance del servicio antes de autorizar.",
    intro: "¿Tu celular está lento, se reinicia o muestra errores? Cuéntanos qué ocurre y desde cuándo para orientar la revisión de software en DoctorCell.",
    sections: [
      ["Qué problemas revisamos", "Evaluamos lentitud, reinicios, errores de aplicaciones y problemas relacionados con actualizaciones. La revisión permite definir qué intervención corresponde; no asumimos que una falla se resuelve con una actualización sin comprobar primero el equipo."],
      ["Tus datos antes de intervenir", "Indica si tienes una copia de seguridad y qué información necesitas conservar. Antes de autorizar, confirma si el procedimiento propuesto requiere borrar datos y qué alternativas te propone el equipo técnico."],
      ["Cómo solicitar el servicio en Quito", "Envíanos marca, modelo, una descripción del error y si apareció después de una actualización o instalación. Elige tu sucursal y confirma el alcance, precio total y tiempo estimado después del diagnóstico. La intervención se realiza con tu autorización."]
    ], faqs: [["¿El servicio de software borra mis datos?", "Depende del procedimiento. Te explicamos el alcance y si requiere borrar datos antes de que autorices."], ["¿Puedo cotizar por WhatsApp?", "Sí. Envía marca, modelo y descripción de la falla. El precio y la viabilidad se confirman con la revisión."], ["¿Una actualización soluciona cualquier falla?", "No lo damos por hecho. Primero revisamos el caso para definir la intervención adecuada."]]
  },
  {
    slug: "reparacion-tablets-ipad-quito", title: "Reparación de tablets y iPad en Quito",
    description: "Revisión de pantalla, batería, carga y funcionamiento de tablets Android y iPad en Quito. Confirma viabilidad, repuesto y precio para tu modelo.",
    intro: "Una tablet para estudiar, trabajar o comunicarte necesita una revisión acorde a su modelo. En DoctorCell orientamos tu consulta y confirmamos qué reparación es viable antes de intervenir.",
    sections: [
      ["Pantalla, batería y carga", "Describe si el daño afecta al vidrio, la imagen, el táctil, la autonomía o la carga. Indica si hubo una caída o contacto con líquido. Revisamos el funcionamiento del equipo para definir el alcance de la reparación."],
      ["Identifica tu tablet o iPad", "Comparte la marca y el modelo exacto que aparecen en los ajustes, la caja o la etiqueta del equipo. La disponibilidad del repuesto y las opciones de reparación se confirman para ese modelo; no todas las tablets admiten la misma intervención."],
      ["Antes de autorizar y al retirar", "Confirma el precio total, tipo de repuesto y tiempo estimado. Pregunta si el procedimiento afecta tus datos y comunica si cuentas con una copia de seguridad. Al retirar la tablet, revisa con el equipo técnico las funciones que se repararon."]
    ], faqs: [["¿Atienden iPad y tablets Android?", "Sí, recibimos consultas para ambos. La reparación y los repuestos se confirman según el modelo y el diagnóstico."], ["¿Puedo consultar una pantalla rota?", "Sí. Envíanos el modelo y describe el daño para orientar la revisión y comprobar disponibilidad."], ["¿Cuánto cuesta la reparación?", "El valor depende del equipo, la falla y el repuesto. Confirmamos el precio antes de iniciar el trabajo."]]
  },
  {
    slug: "reparacion-smartwatch-apple-watch-quito", title: "Reparación de smartwatches y Apple Watch en Quito",
    description: "Diagnóstico de batería, carga y funcionamiento de smartwatches y Apple Watch en Quito. Consulta viabilidad y disponibilidad de repuestos por modelo.",
    intro: "¿Tu reloj inteligente dura menos, no carga o presenta una falla? Consulta con DoctorCell en Quito para revisar las opciones disponibles para tu modelo.",
    sections: [
      ["Qué información necesitamos", "Comparte la marca, el modelo o serie del reloj y una descripción de la falla. Indica desde cuándo ocurre y si hubo golpe, humedad o cambio de cargador. Con esos datos podemos orientar la revisión inicial."],
      ["Batería, carga y funcionamiento", "Revisamos problemas de autonomía, carga y funcionamiento general. La intervención depende del diagnóstico y la disponibilidad de componentes. Te explicamos qué trabajo es viable antes de que decidas continuar."],
      ["Qué confirmar antes de reparar", "Pregunta por el repuesto, el precio total, el plazo y las condiciones del servicio. Confirma qué pruebas de batería, carga y funcionamiento se realizarán antes de la entrega y revisa con el equipo técnico las funciones reparadas."]
    ], faqs: [["¿Atienden Apple Watch y otros relojes inteligentes?", "Sí, revisamos consultas para Apple Watch y otros smartwatches. La viabilidad se confirma por modelo."], ["¿Pueden revisar un reloj que no carga?", "Sí. Describe el problema y el modelo; el diagnóstico permite confirmar qué intervención corresponde."], ["¿Todos los modelos tienen repuestos disponibles?", "La disponibilidad debe confirmarse con la sucursal antes de autorizar el servicio."]]
  },
  {
    slug: "microsoldadura-celulares-quito", title: "Microsoldadura de celulares en Quito",
    description: "Diagnóstico de placa y componentes para microsoldadura de celulares en Quito. Consulta viabilidad, alcance y precio antes de autorizar la reparación.",
    intro: "Una falla de placa necesita una evaluación técnica antes de definir la reparación. En DoctorCell revisamos tu caso y explicamos si una intervención de microsoldadura es viable para tu equipo.",
    sections: [
      ["Qué revisamos antes de intervenir", "Describe si el celular no enciende, falla de forma intermitente o presenta problemas de carga o funcionamiento. Estos síntomas no confirman por sí solos una falla de placa: primero debemos identificar el origen del problema."],
      ["Un diagnóstico para tu modelo", "Comparte la marca, el modelo y si hubo un golpe, contacto con líquido o una reparación anterior. La intervención depende del estado de la placa y de los componentes disponibles. Confirmamos el alcance técnico antes de que decidas continuar."],
      ["Precio, plazo y pruebas finales", "Antes de autorizar, pregunta qué trabajo se realizará, el precio total y el tiempo estimado. Indica si conservar tus datos es una prioridad para la evaluación. Al retirar el equipo, revisa con el técnico las funciones reparadas y las condiciones del servicio."]
    ], faqs: [["¿Un celular que no enciende siempre necesita microsoldadura?", "No. Ese síntoma requiere diagnóstico; primero se debe identificar la falla."], ["¿Pueden confirmar el precio por WhatsApp?", "Podemos orientar la consulta con la marca, modelo y síntomas. La viabilidad y el valor final requieren la revisión del equipo."], ["¿La microsoldadura garantiza recuperar mis datos?", "No se garantiza antes de revisar el equipo. Comunica si tus datos son una prioridad para evaluar el caso."]]
  },
  {
    slug: "reparacion-camaras-audio-perifericos-quito", title: "Reparación de cámaras, audio y periféricos en Quito",
    description: "Revisión de cámaras, parlantes, micrófonos, botones, sensores y conectividad de celulares en Quito. Diagnóstico y cotización antes de reparar.",
    intro: "¿La cámara falla, no te escuchan en las llamadas o un botón dejó de responder? Cuéntanos qué función presenta el problema para orientar la revisión de tu celular en DoctorCell.",
    sections: [
      ["Cámaras y calidad de imagen", "Indica si el problema afecta a la cámara frontal, trasera o a ambas, y si ocurre en todas las aplicaciones o solo en una. Describe si ves imagen negra, fallas de enfoque o daños visibles. Revisamos el caso antes de proponer un cambio de componente."],
      ["Parlantes, micrófonos y llamadas", "Explica si no escuchas, no te escuchan o el sonido es intermitente. Cuenta si ocurre durante llamadas, grabaciones, reproducción de música o al usar un accesorio. Esa información ayuda a definir qué funciones deben comprobarse."],
      ["Botones, sensores y conectividad", "También recibimos consultas por botones, sensores y fallas de Wi-Fi o Bluetooth. Comparte el modelo y desde cuándo sucede. La causa y las opciones de reparación se confirman mediante el diagnóstico."],
      ["Qué confirmar antes de autorizar", "Pregunta por el alcance del trabajo, disponibilidad del repuesto, precio total y plazo. Al retirar el equipo, prueba con el técnico la cámara, el audio o la función que se haya reparado."]
    ], faqs: [["¿Una cámara que falla siempre debe cambiarse?", "No lo asumimos antes de revisar. Primero comprobamos el problema para definir la solución."], ["¿Revisan micrófonos y parlantes?", "Sí. Describe la falla y el modelo para orientar la consulta y confirmar las opciones de reparación."], ["¿Atienden problemas de Wi-Fi o Bluetooth?", "Sí, recibimos estas consultas. La viabilidad de la reparación se confirma después del diagnóstico."]]
  }
];

const esc = (s) => s.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const withFavicon = (html) => html
  .replace("<head>", '<head><link rel="icon" href="/favicon.ico" sizes="any">')
  .replaceAll("DoctorCell", "DoctorCell Quito")
  .replaceAll("DoctorCell Quito · Quito", "DoctorCell Quito");
const css = `:root{--blue:#0b69ff;--ink:#101828;--muted:#58677a;--line:#dfe5ec}*{box-sizing:border-box}body{margin:0;color:var(--ink);background:#f8fafc;font-family:Inter,system-ui,sans-serif;line-height:1.7}a{color:inherit;text-decoration:none}.top,.footer{color:#fff;background:#062b50}.nav,.wrap{width:min(1080px,calc(100% - 36px));margin:auto}.nav{display:flex;align-items:center;gap:24px;min-height:92px}.logo{display:flex;align-items:center;margin-right:auto;padding:4px 10px;border-radius:12px;background:#fff}.logo img{display:block;width:210px;height:72px;object-fit:contain}.nav-links{display:flex;align-items:center;gap:20px;font-size:14px;font-weight:800}.nav-cta,.primary{padding:11px 15px;border-radius:9px;background:#86cf45;color:#14280c;font-weight:900}.hero{padding:70px 0;color:#fff;background:linear-gradient(135deg,#062b50,#0d64a4)}.crumbs{color:#d8e9f8}.crumbs a{text-decoration:underline}.hero h1{margin:18px 0;font-size:clamp(38px,7vw,66px);line-height:1.03}.hero p{max-width:760px;color:#e3f0fb;font-size:19px}.content{padding:56px 0}.content article,.card{padding:clamp(24px,5vw,52px);border:1px solid var(--line);border-radius:16px;background:#fff;box-shadow:0 14px 40px #10182810}.content h2{margin:34px 0 8px;line-height:1.2}.content h2:first-child{margin-top:0}.notice{margin:30px 0;padding:18px;border-left:4px solid #17b26a;background:#ecfdf3}.faq{margin-top:40px;padding-top:20px;border-top:1px solid var(--line)}details{padding:15px 0;border-bottom:1px solid var(--line)}summary{cursor:pointer;font-weight:900}.actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:30px}.actions a{padding:12px 16px;border:1px solid var(--line);border-radius:9px;font-weight:900}.actions .primary{color:#fff;background:var(--blue)}.related{padding:0 0 60px}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.grid a{padding:18px;border:1px solid var(--line);border-radius:10px;background:#fff;font-weight:800}.index{grid-template-columns:repeat(2,1fr)}.index a{display:block}.index strong,.index span{display:block}.index span{margin-top:5px;color:var(--muted);font-weight:400}.footer{padding:32px 0}.footer .wrap{display:flex;justify-content:space-between}.seo-consent{position:fixed;right:16px;bottom:16px;z-index:20;width:min(500px,calc(100vw - 32px));padding:20px;border:1px solid var(--line);border-radius:14px;background:#fff;box-shadow:0 24px 70px #041d3745}.seo-consent strong{display:block}.seo-consent p{margin:5px 0 14px;color:var(--muted);font-size:13px}.seo-consent div{display:flex;justify-content:flex-end;gap:8px}.seo-consent button{padding:9px 13px;border:1px solid var(--line);border-radius:8px;background:#fff;font:inherit;font-weight:800;cursor:pointer}.seo-consent button:last-child{color:#fff;border-color:var(--blue);background:var(--blue)}@media(max-width:760px){.grid,.index{grid-template-columns:1fr}.nav{min-height:76px}.logo img{width:150px;height:58px}.nav-links{display:none}.nav-cta{font-size:13px}.hero{padding:48px 0}.footer .wrap{flex-direction:column}}`;

function analyticsScript() {
  if (!ga4Id && !metaPixelId) return "";
  return `<script>(()=>{const k='doctorcell-analytics-consent-v1',g=${JSON.stringify(ga4Id)},m=${JSON.stringify(metaPixelId)};function s(id,src){if(document.getElementById(id))return;const e=document.createElement('script');e.id=id;e.async=true;e.src=src;document.head.appendChild(e)}function init(){if(window.__dcSeoAnalytics)return;window.__dcSeoAnalytics=true;if(g){window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments)};gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});gtag('consent','update',{analytics_storage:'granted',ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted'});gtag('js',new Date());gtag('config',g);s('dc-ga','https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(g))}if(m){const f=window.fbq=window.fbq||function(){f.callMethod?f.callMethod.apply(f,arguments):f.queue.push(arguments)};window._fbq=window._fbq||f;f.push=f;f.loaded=true;f.version='2.0';f.queue=f.queue||[];s('dc-meta','https://connect.facebook.net/en_US/fbevents.js');f('init',m);f('track','PageView')}}function banner(){const a=document.createElement('aside');a.className='seo-consent';a.innerHTML='<strong>¿Nos permites medir la experiencia?</strong><p>Usamos GA4 y Meta Pixel para mejorar el sitio y nuestras campañas. No se activan hasta que aceptes.</p><div><button data-v="rejected">Rechazar</button><button data-v="accepted">Aceptar medición</button></div>';a.onclick=e=>{const v=e.target.dataset.v;if(!v)return;localStorage.setItem(k,v);a.remove();if(v==='accepted')init()};document.body.appendChild(a)}document.addEventListener('DOMContentLoaded',()=>{const c=localStorage.getItem(k);if(c==='accepted')init();else if(!c)banner()})})();</script>`;
}

const head = (p, body, json = "") => `<!doctype html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(p.title)} | DoctorCell</title><meta name="description" content="${esc(p.description)}"><meta name="robots" content="index,follow"><link rel="canonical" href="${origin}/guias/${p.slug ? `${p.slug}/` : ""}"><meta property="og:title" content="${esc(p.title)}"><meta property="og:description" content="${esc(p.description)}"><meta property="og:locale" content="es_EC"><link rel="stylesheet" href="/guias/seo.css">${json ? `<script type="application/ld+json">${json}</script>` : ""}${analyticsScript()}</head><body><header class="top"><nav class="nav"><a class="logo" href="/" aria-label="DoctorCell inicio"><img src="/logo.jpg" alt="DoctorCell logo" width="210" height="72"></a><div class="nav-links"><a href="/#servicios">Servicios</a><a href="/#sucursales">Sucursales</a><a href="/guias/">Guías</a></div><a class="nav-cta" href="${wa("Hola DoctorCell, necesito ayuda con mi equipo.")}">Consultar reparación</a></nav></header>${body}<footer class="footer"><div class="wrap"><strong>DoctorCell · Quito</strong><a href="/">Página principal</a></div></footer></body></html>`;

await mkdir(resolve("public/guias"), { recursive: true });
const brandedCss = css
  .replaceAll("#0b69ff", "#4f9f34")
  .replaceAll("#101828", "#10271d")
  .replaceAll("#dfe5ec", "#dfe5df")
  .replace("linear-gradient(135deg,#062b50,#0d64a4)", "linear-gradient(135deg,#071f35,#194a35)");
await writeFile(resolve("public/guias/seo.css"), brandedCss);
for (const page of pages) {
  const faqSchema = { "@context": "https://schema.org", "@graph": [{ "@type": "Article", headline: page.title, description: page.description, inLanguage: "es-EC", mainEntityOfPage: `${origin}/guias/${page.slug}/`, author: { "@type": "Organization", name: "DoctorCell" } }, { "@type": "FAQPage", mainEntity: page.faqs.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })) }] };
  const relatedBySlug = {
    "cambio-pantalla-iphone-quito": ["cambio-pantalla-samsung-quito", "cambio-bateria-celular-quito", "celular-mojado-que-hacer"],
    "cambio-pantalla-samsung-quito": ["cambio-pantalla-iphone-quito", "reparacion-xiaomi-quito", "celular-mojado-que-hacer"],
    "celular-mojado-que-hacer": ["celular-no-carga-quito", "cambio-bateria-celular-quito", "reparacion-xiaomi-quito"],
    "cambio-bateria-celular-quito": ["celular-no-carga-quito", "celular-mojado-que-hacer", "reparacion-xiaomi-quito"],
    "celular-no-carga-quito": ["cambio-bateria-celular-quito", "celular-mojado-que-hacer", "reparacion-xiaomi-quito"],
    "reparacion-xiaomi-quito": ["software-celulares-quito", "cambio-bateria-celular-quito", "celular-no-carga-quito"],
    "software-celulares-quito": ["reparacion-xiaomi-quito", "reparacion-tablets-ipad-quito", "cambio-bateria-celular-quito"],
    "reparacion-tablets-ipad-quito": ["software-celulares-quito", "reparacion-smartwatch-apple-watch-quito", "celular-no-carga-quito"],
    "reparacion-smartwatch-apple-watch-quito": ["reparacion-tablets-ipad-quito", "cambio-bateria-celular-quito", "celular-no-carga-quito"],
    "microsoldadura-celulares-quito": ["celular-no-carga-quito", "celular-mojado-que-hacer", "reparacion-camaras-audio-perifericos-quito"],
    "reparacion-camaras-audio-perifericos-quito": ["software-celulares-quito", "microsoldadura-celulares-quito", "celular-no-carga-quito"]
  };
  const related = relatedBySlug[page.slug].map((slug) => pages.find((x) => x.slug === slug)).map((x) => `<a href="/guias/${x.slug}/">${esc(x.title)}</a>`).join("");
  const body = `<main><header class="hero"><div class="wrap"><div class="crumbs"><a href="/">Inicio</a> · <a href="/guias/">Guías</a></div><h1>${esc(page.title)}</h1><p>${esc(page.intro)}</p></div></header><section class="content"><div class="wrap"><article>${page.sections.map(([h, t]) => `<h2>${esc(h)}</h2><p>${esc(t)}</p>`).join("")}<aside class="notice"><strong>Importante:</strong> el precio, repuesto y tiempo se confirman al identificar el modelo y revisar el equipo.</aside><section class="faq"><h2>Preguntas frecuentes</h2>${page.faqs.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("")}</section><div class="actions"><a class="primary" href="${wa(`Hola DoctorCell, leí la guía “${page.title}” y quiero consultar mi equipo.`)}">Consultar mi caso</a><a href="/#sucursales">Ver sucursales</a></div></article></div></section><section class="related"><div class="wrap"><h2>También puede ayudarte</h2><div class="grid">${related}</div></div></section></main>`;
  const dir = resolve("public/guias", page.slug); await mkdir(dir, { recursive: true });
  await writeFile(resolve(dir, "index.html"), withFavicon(head(page, body, JSON.stringify(faqSchema).replaceAll("<", "\\u003c"))));
}
const cards = pages.map((p) => `<a href="/guias/${p.slug}/"><strong>${esc(p.title)}</strong><span>${esc(p.description)}</span></a>`).join("");
const indexPage = { title: "Guías de reparación de celulares, tablets y relojes", description: "Guías sobre pantallas, baterías, carga, humedad, software y reparación de celulares, tablets y relojes inteligentes en Quito." };
await writeFile(resolve("public/guias/index.html"), withFavicon(head(indexPage, `<main><header class="hero"><div class="wrap"><div class="crumbs"><a href="/">Inicio</a> · Guías</div><h1>Guías para cuidar y reparar tus equipos</h1><p>Celulares, tablets y relojes inteligentes: información práctica para actuar ante una falla y llegar mejor preparado al diagnóstico.</p></div></header><section class="content"><div class="wrap"><div class="grid index">${cards}</div></div></section></main>`)));
const paths = [
  "/", "/tienda/", "/agendar/", "/seguimiento/", "/sucursales/", "/preguntas/", "/terminos-rifa/", "/conviene-reparar/",
  "/sucursales/matriz-prensa-rio-arajuno/", "/sucursales/colon-juan-leon-mera/",
  "/sucursales/shyris-tomas-de-berlanga/", "/sucursales/prensa-vaca-de-castro/",
  "/guias/", ...pages.map((p) => `/guias/${p.slug}/`)
];
await writeFile(resolve("public/sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map((p) => `<url><loc>${origin}${p}</loc></url>`).join("")}</urlset>`);
await writeFile(resolve("public/robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
console.log(`Generadas ${pages.length} páginas SEO.`);
