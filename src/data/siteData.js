import {
  BatteryCharging,
  Cable,
  Camera,
  CheckCircle2,
  Clock3,
  Droplets,
  Headphones,
  MapPin,
  MessageCircle,
  MonitorSmartphone,
  Phone,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  TabletSmartphone,
  Wrench,
  Zap
} from "lucide-react";

export const whatsappNumber = "593983222100";

export const contactInfo = {
  businessName: "DoctorCell Quito",
  address: "Prensa y Río Arajuno, Quito, Ecuador",
  whatsappDisplay: "+593 98 322 2100",
  phoneDisplay: "+593 98 322 2100",
  phoneHref: "+593983222100",
  email: "dc.infouio@gmail.com",
  hours: "Lunes a sábado, 09:00–18:00"
};

export const navItems = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "#servicios" },
  { label: "Citas", href: "/agendar" },
  { label: "Sucursales", href: "/sucursales" },
  { label: "Seguimiento", href: "/seguimiento" }
];

export const trustItems = [
  { label: "Repuestos premium", icon: ShieldCheck },
  { label: "Entrega rápida", icon: Clock3 },
  { label: "Garantía por escrito", icon: CheckCircle2 }
];

export const diagnostics = [
  { icon: Smartphone, title: "Pantalla rota", text: "Vidrio, touch, display o manchas en pantalla.", price: "Pantallas desde $35", startingPrice: "35", keywords: "pantalla display touch vidrio Samsung A54 iPhone Xiaomi Huawei Motorola" },
  { icon: Cable, title: "No carga", text: "Pin de carga, batería o carga intermitente.", price: "Reparación desde $20", startingPrice: "20", keywords: "pin puerto conector carga cable USB tipo C lightning Samsung iPhone Xiaomi" },
  { icon: Camera, title: "Cámara", text: "Cámara frontal, trasera, enfoque o sensores.", price: "Reparación desde $25", startingPrice: "25", keywords: "cámara frontal trasera enfoque sensor Samsung iPhone Xiaomi" },
  { icon: Headphones, title: "Audio", text: "Parlante, auricular, micrófono o sonido.", price: "Reparación desde $25", startingPrice: "25", keywords: "audio parlante auricular altavoz micrófono sonido Samsung iPhone Xiaomi" },
  { icon: Wrench, title: "No funciona algún periférico", text: "Botones, vibrador, sensores, Wi-Fi o Bluetooth.", price: "Diagnóstico desde $20", startingPrice: "20", keywords: "periférico botones vibrador sensores wifi bluetooth conexión componente" },
  { icon: Droplets, title: "Se mojó", text: "Diagnóstico por humedad y limpieza técnica.", price: "Diagnóstico desde $20", startingPrice: "20", keywords: "mojado agua humedad limpieza no enciende Samsung iPhone Xiaomi" },
  { icon: BatteryCharging, title: "Batería", text: "Se descarga rápido, se apaga o se recalienta.", price: "Cambio desde $25", startingPrice: "25", keywords: "batería descarga apaga recalienta hinchada Samsung A54 iPhone Xiaomi" },
  { icon: MonitorSmartphone, title: "Software", text: "Lento, bloqueado, errores o actualización.", price: "Servicio desde $20", startingPrice: "20", keywords: "software lento bloqueado actualización sistema Android iOS Samsung iPhone Xiaomi" },
  { icon: TabletSmartphone, title: "Tablet / iWatch", text: "Revisión para tablets y relojes inteligentes.", price: "Servicio desde $30", startingPrice: "30", keywords: "tablet iPad iWatch smartwatch reloj Apple Samsung Huawei" },
  { icon: MessageCircle, title: "Otro problema", text: "Cuéntanos qué ocurre con tu equipo.", price: "Diagnóstico desde $20", startingPrice: "20", keywords: "otro diagnóstico revisión celular equipo todas las marcas" }
];

export const brands = ["Apple", "Samsung", "Xiaomi", "Huawei", "Motorola", "Honor", "Oppo", "Infinix", "Tecno", "Nokia", "Google", "Otra"];

export const services = [
  {
    icon: Smartphone,
    title: "Cambio de pantallas certificado",
    text: "Pantallas compatibles y originales según disponibilidad, instalación técnica y prueba final.",
    time: "Tiempo estimado: confirmar por modelo",
    price: "Desde $35",
    problem: "Pantalla rota",
    guideHref: "/guias/cambio-pantalla-iphone-quito/",
    guideLabel: "Guía de pantallas"
  },
  {
    icon: Zap,
    title: "Cambio de batería",
    text: "Reemplazo de baterías, diagnóstico de consumo, temperatura y autonomía.",
    time: "Tiempo estimado: confirmar por modelo",
    price: "Desde $20",
    problem: "Batería",
    guideHref: "/guias/cambio-bateria-celular-quito/",
    guideLabel: "Guía de batería"
  },
  {
    icon: Camera,
    title: "Puerto de carga",
    text: "Diagnóstico de carga intermitente, limpieza técnica y reparación de conectores.",
    time: "Tiempo estimado después del diagnóstico",
    price: "Desde $25",
    problem: "No carga",
    guideHref: "/guias/celular-no-carga-quito/",
    guideLabel: "Guía de carga"
  },
  {
    icon: Droplets,
    title: "Equipos mojados",
    text: "Apertura, limpieza técnica y evaluación de daños por humedad o corrosión.",
    time: "Evaluación inicial antes de intervenir",
    price: "Desde $20",
    problem: "Se mojó",
    guideHref: "/guias/celular-mojado-que-hacer/",
    guideLabel: "Guía por humedad"
  },
  {
    icon: Camera,
    title: "Cámaras y audio",
    text: "Revisión de cámaras, parlantes, micrófonos, sensores y conectores internos.",
    time: "Tiempo estimado después del diagnóstico",
    price: "Desde $25",
    problem: "Cámara o audio",
    guideHref: "/guias/reparacion-xiaomi-quito/",
    guideLabel: "Guía de diagnóstico"
  },
  {
    icon: Wrench,
    title: "Microsoldadura",
    text: "Intervenciones avanzadas para fallas de placa y componentes críticos.",
    time: "Tiempo estimado después del diagnóstico",
    price: "Desde $30",
    problem: "Otro problema",
    guideHref: "/guias/celular-mojado-que-hacer/",
    guideLabel: "Guía de microsoldadura"
  }
];

export const guaranteeItems = [
  { label: "Diagnóstico transparente", icon: CheckCircle2 },
  { label: "Repuestos de calidad", icon: ShieldCheck },
  { label: "Pruebas antes de entregar", icon: Sparkles },
  { label: "Atención personalizada", icon: MessageCircle }
];

export const accessories = [
  {
    icon: Zap,
    title: "Cargadores rápidos",
    text: "Potencia estable para uso diario.",
    artClass: "art-blue",
    keywords: "cargador iPhone Samsung tipo C USB-C adaptador fuente"
  },
  {
    icon: Headphones,
    title: "AirPods y audífonos",
    text: "Audio inalámbrico para llamadas y música.",
    artClass: "art-green",
    keywords: "audífonos bluetooth manos libres iPhone Android"
  },
  {
    icon: Cable,
    title: "Cables resistentes",
    text: "Carga y datos para iPhone, USB-C y micro USB.",
    artClass: "art-amber",
    keywords: "cable iPhone lightning tipo C USB-C micro USB"
  },
  {
    icon: ShoppingBag,
    title: "Micas y protectores",
    text: "Protección precisa para pantalla y cámara.",
    artClass: "art-violet",
    keywords: "mica Samsung iPhone protector estuche antichoque vidrio cámara"
  }
];

export const testimonials = [
  {
    name: "Jhoana Colina",
    text: "La atención fue excelente, muy amables y profesionales. Los recomiendo.",
    branch: "Cliente de DoctorCell Quito"
  },
  {
    name: "Juan Morejon",
    text: "Mi pantalla quedó impecable, con garantía y atención muy amable.",
    branch: "Cliente de DoctorCell Quito"
  }
];

// Publica solo material propio y autorizado. Cada elemento debe corresponder
// a una foto real guardada en /public/images/social-proof/.
export const galleryItems = [];

// Completar únicamente con cifras comprobadas en el perfil oficial de Google.
export const googleReviewSummary = null;

export const branches = [
  { slug: "matriz-prensa-rio-arajuno", name: "Sucursal Prensa", address: "Prensa y Río Arajuno", reference: "Sector Av. de la Prensa", latitude: -0.1512, longitude: -78.4925, hours: contactInfo.hours, icon: MapPin },
  { slug: "colon-juan-leon-mera", name: "Sucursal Colón", address: "Colón y Juan León Mera", reference: "Sector La Mariscal", latitude: -0.20092, longitude: -78.49, hours: contactInfo.hours, icon: MapPin },
  { slug: "shyris-tomas-de-berlanga", name: "Sucursal Shyris", address: "Shyris y Tomás de Berlanga", reference: "Sector Parque La Carolina", latitude: -0.16447, longitude: -78.47986, hours: contactInfo.hours, icon: MapPin },
  { slug: "prensa-vaca-de-castro", name: "Sucursal Vaca de Castro", address: "Prensa y Vaca de Castro", reference: "Norte de Quito", latitude: -0.12932, longitude: -78.4941, hours: contactInfo.hours, icon: MapPin }
];

export const quickStats = [
  { value: "15+", label: "años de experiencia" },
  { value: "4", label: "sucursales en Quito" },
  { value: "100%", label: "reparaciones con prueba final" }
];
