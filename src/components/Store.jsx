import React, { useEffect, useMemo, useState } from "react";
<<<<<<< HEAD
import { ArrowRight, Check, Maximize2, MessageCircle, Minus, Plus, Search, ShieldCheck, ShoppingBag, ShoppingCart, Sparkles, Trash2, Truck, X, Zap } from "lucide-react";
=======
import { ArrowRight, Check, HelpCircle, Maximize2, MessageCircle, Minus, Plus, Search, ShieldCheck, ShoppingBag, ShoppingCart, Sparkles, Trash2, Truck, X, Zap } from "lucide-react";
>>>>>>> 2292f79 (Actualización del proyecto DoctorCell)
import { whatsappUrl } from "../utils/whatsapp.js";
import "../styles/store.css";

const productData = [
  ["iPhone 16 Pro Max", "Transparente", "Case transparente antigolpes"],
  ["iPhone 17 Pro Max", "Protector de cámara", "Case MagSafe con protector de cámara"],
  ["iPhone 17 Pro", "Protector de cámara", "Case MagSafe con protector de cámara"],
  ["iPhone 17 Pro Max", "Con soporte", "Case MagSafe con soporte y protector de cámara"],
  ["iPhone 17 Pro Max", "Con soporte", "Case MagSafe con soporte negro"],
  ["iPhone 17 Pro Max", "Con soporte", "Case MagSafe con soporte naranja"],
  ["iPhone 17 Pro", "Protector de cámara", "Case MagSafe con protector de cámara"],
  ["iPhone 16 Pro Max", "Con soporte", "Case MagSafe con soporte metálico"],
  ["iPhone 17", "MagSafe", "Case MagSafe en colores"],
  ["iPhone 17 Pro Max", "MagSafe", "Case MagSafe en colores neón"],
  ["iPhone 17 Pro Max", "Con soporte", "Case transparente MagSafe con soporte"],
  ["iPhone 17 Pro Max", "Con soporte", "Case naranja MagSafe con soporte"],
  ["iPhone 17 Pro Max", "Con correa", "Kit case MagSafe con correa y tarjetero"],
  ["iPhone 17", "Transparente", "Case transparente antigolpes"],
  ["iPhone 17 Pro Max", "Protector de cámara", "Case MagSafe con protector de cámara"],
  ["iPhone 16 Pro", "Protector de cámara", "Case MagSafe con protector de cámara"],
  ["iPhone 17 Pro Max", "Con correa", "Kit case MagSafe naranja con correa"],
  ["iPhone 17 Pro Max", "MagSafe", "Case MagSafe transparente naranja"],
<<<<<<< HEAD
  ["iPhone 17 Pro Max", "MagSafe", "Case MagSafe transparente con brillo"]
];

const products = productData.map(([model, type, name], index) => ({
  id: index + 1,
  image: `/images/${index + 1}.png`,
  name,
  model,
  type,
  category: model,
  price: type === "Transparente" ? "$10" : type === "MagSafe" ? "$12" : "$15",
  badge: index % 4 === 0 ? "Nuevo" : index % 5 === 0 ? "Popular" : null
}));

export default function Store({ standalone = false }) {
  const [query, setQuery] = useState("");
  const [model, setModel] = useState("Todos");
  const [type, setType] = useState("Todos");
  const [cart, setCart] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [zoomedProduct, setZoomedProduct] = useState(null);
  const models = ["Todos", ...new Set(products.map((product) => product.model))];
  const types = ["Todos", ...new Set(products.map((product) => product.type))];
  const visible = useMemo(() => products.filter((product) =>
    (model === "Todos" || product.model === model) &&
    (type === "Todos" || product.type === type) &&
    `${product.name} ${product.model} ${product.type}`.toLowerCase().includes(query.trim().toLowerCase())
  ), [model, type, query]);
=======
  ["iPhone 17 Pro Max", "MagSafe", "Case MagSafe transparente con brillo"],
  ["HONOR X6C", "MagSafe", "Case MagSafe degradado rosa y lila"],
  ["HONOR X6C", "MagSafe", "Case MagSafe degradado amarillo y celeste"],
  ["HONOR X7D", "MagSafe", "Case MagSafe degradado coral y rosa"],
  ["HONOR X7D", "MagSafe", "Case MagSafe degradado amarillo y celeste"],
  ["HONOR X8D", "MagSafe", "Case MagSafe degradado rosa y lila"],
  ["HONOR X8D", "MagSafe", "Case MagSafe degradado amarillo y celeste"],
  ["INFINIX NOTE 60", "MagSafe", "Case MagSafe degradado amarillo y celeste"],
  ["INFINIX NOTE 60", "MagSafe", "Case MagSafe degradado coral y rosa"],
  ["INFINIX NOTE 60 PRO", "MagSafe", "Case MagSafe degradado rosa y lila"],
  ["HONOR MAGIC 8 LITE", "MagSafe", "Case MagSafe degradado azul y verde"],
  ["INFINIX NOTE 60 PRO", "MagSafe", "Case MagSafe degradado amarillo y celeste"],
  ["HONOR MAGIC 8 LITE", "MagSafe", "Case MagSafe degradado coral y rosa"],
  ["REDMI NOTE 15", "MagSafe", "Case MagSafe degradado amarillo y celeste"],
  ["REDMI NOTE 15", "MagSafe", "Case MagSafe degradado lila y rosa"],
  ["REDMI NOTE 15", "MagSafe", "Case MagSafe degradado naranja y rosa"],
  ["REDMI NOTE 15", "MagSafe", "Case MagSafe degradado amarillo, verde y celeste"],
  ["SAMSUNG GALAXY A56", "MagSafe", "Case MagSafe degradado amarillo y celeste"],
  ["SAMSUNG GALAXY A56", "MagSafe", "Case MagSafe degradado azul y verde"],
  ["TECNO SPARK 20 4G", "MagSafe", "Case MagSafe degradado rosa y lila"],
  ["TECNO SPARK 20 4G", "MagSafe", "Case MagSafe degradado amarillo y celeste"],
  ["TECNO SPARK 50 4G", "MagSafe", "Case MagSafe degradado amarillo y celeste"],
  ["TECNO SPARK 50 4G", "MagSafe", "Case MagSafe degradado rosa y lila"],
  ["TECNO CAMON 50 PRO", "MagSafe", "Case MagSafe degradado coral y rosa"],
  ["TECNO CAMON 50 PRO", "MagSafe", "Case MagSafe degradado amarillo y celeste"],
  ["Cargadores", "Cargadores", "Kit cargador USB-C para iPhone"],
  ["Audífonos 3.5 mm", "Audífonos con cable", "EarPods con conector 3.5 mm"],
  ["Cables", "Cables", "Cable USB-C a USB-C"],
  ["Audífonos Lightning", "Audífonos con cable", "EarPods con conector Lightning"],
  ["Cables", "Cables", "Cable USB-C a Lightning"],
  ["Cargadores", "Cargadores", "Adaptador USB para iPhone"],
  ["Cables", "Cables", "Cable USB-A a Lightning"],
  ["Cargadores", "Cargadores", "Adaptador USB-C 20W para iPhone"],
  ["Audífonos Bluetooth", "Audífonos inalámbricos", "Audífonos TWS rosa pastel"],
  ["Audífonos Bluetooth", "Audífonos inalámbricos", "Audífonos EC-737"],
  ["Audífonos Bluetooth", "Audífonos inalámbricos", "Audífonos TWS blancos"],
  ["Audífonos Bluetooth", "Audífonos inalámbricos", "Audífonos TWS 5.3 rosa"],
  ["Audífonos Bluetooth", "Audífonos inalámbricos", "Audífonos TWS transparentes"],
  ["Audífonos Bluetooth", "Audífonos inalámbricos", "Audífonos T6"],
  ["Audífonos Bluetooth", "Audífonos inalámbricos", "Audífonos T15"],
  ["Audífonos Bluetooth", "Audífonos inalámbricos", "Audífonos T110"],
  ["Audífonos Bluetooth", "Audífonos inalámbricos", "Audífonos SAIYA T10"],
  ["Audífonos Bluetooth", "Audífonos inalámbricos", "Audífonos W1"],
  ["Audífonos Bluetooth", "Audífonos inalámbricos", "Audífonos T13"],
  ["Audífonos Bluetooth", "Audífonos inalámbricos", "Audífonos T3"],
  ["Cargadores", "65W · 2 USB-C + USB-A", "Cargador LDNIO Q2617 GaN 65W blanco"],
  ["Cargadores", "20W · USB-C + USB-A", "Cargador LDNIO A2206Q 20W negro"],
  ["Cargadores", "33W · USB-C + USB-A", "Cargador LDNIO A3306C 33W blanco"],
  ["Cargadores", "33W · USB-C + USB-A", "Cargador LDNIO 33W negro USB-C + USB-A"],
  ["Cargadores", "25W · USB-C (Tipo C)", "Cargador Samsung PD 25W USB-C negro"],
  ["Cargadores", "45W · USB-C con cable Tipo C", "Kit cargador Samsung PD 45W USB-C con cable Tipo C"],
  ["Cargadores", "30W · USB-C + USB-A", "Cargador LDNIO A2317C 30W USB-C + USB-A"],
  ["Cargadores", "33W · USB-C + USB-A", "Cargador LDNIO A3313C 33W USB-C + USB-A"],
  ["Cargadores", "Auto 60W · 2 USB-C", "Cargador para auto LDNIO C104 60W doble USB-C"],
  ["Cargadores", "Auto 38W · USB-C + USB-A", "Cargador para auto ECCO EC-135 38W USB-C + USB-A"],
  ["Cargadores", "Auto · 2 USB-A", "Cargador para auto LDNIO C-17 doble USB-A"],
  ["Cargadores", "20W · USB-C + USB-A", "Cargador LDNIO A1204Q 20W negro USB-C + USB-A"],
  ["Cargadores", "18W · USB-A", "Cargador LDNIO A1320Q 18W USB-A"]
];

const accessoryCategories = new Set(["Cargadores", "Cables", "Audífonos Bluetooth", "Audífonos 3.5 mm", "Audífonos Lightning"]);

const getBrand = (sourceModel, name) => {
  if (/LDNIO/i.test(name)) return "LDNIO";
  if (/Samsung/i.test(name)) return "Samsung";
  if (/ECCO/i.test(name)) return "ECCO";
  if (sourceModel.startsWith("iPhone")) return "Apple";
  if (sourceModel.startsWith("HONOR")) return "Honor";
  if (sourceModel.startsWith("INFINIX")) return "Infinix";
  if (sourceModel.startsWith("REDMI")) return "Redmi";
  if (sourceModel.startsWith("SAMSUNG")) return "Samsung";
  if (sourceModel.startsWith("TECNO")) return "Tecno";
  if (/iPhone|Lightning/i.test(name)) return "Compatible con Apple";
  if (/SAIYA/i.test(name)) return "Saiya";
  if (/T110/i.test(name)) return "Senbono";
  if (/T15/i.test(name)) return "Saiying";
  if (/T6|T13|T3/.test(name)) return "Huawei";
  return "Genérica";
};

const headphonePrices = [
  [/EC-737/i, "$25"],
  [/TWS 5\.3/i, "$18"],
  [/TWS transparentes/i, "$18"], // IPH en la lista recibida
  [/TWS/i, "$18"],
  [/T110/i, "$28"],
  [/T15/i, "$25"],
  [/T13/i, "$25"],
  [/T10/i, "$15"],
  [/T6/i, "$27"],
  [/T3/i, "$25"],
  [/W1/i, "$18"]
];

const getProductPrice = (sourceModel, type, name) => {
  if (sourceModel.includes("Audífonos")) {
    const match = headphonePrices.find(([pattern]) => pattern.test(name));
    if (match) return match[1];
  }
  return type === "Transparente" ? "$10" : type === "MagSafe" ? "$12" : "$15";
};

export const products = productData.map(([sourceModel, type, name], index) => {
  const isAccessory = accessoryCategories.has(sourceModel);
  return {
    id: index + 1,
    image: `/images/${index + 1}.png`,
    name,
    model: isAccessory ? name : sourceModel,
    brand: getBrand(sourceModel, name),
    type,
    category: isAccessory ? sourceModel : "Estuches",
    price: getProductPrice(sourceModel, type, name),
    badge: index % 4 === 0 ? "Nuevo" : index % 5 === 0 ? "Popular" : null
  };
});

export default function Store({ standalone = false }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todos");
  const [brand, setBrand] = useState("Todos");
  const [model, setModel] = useState("Todos");
  const [cart, setCart] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [zoomedProduct, setZoomedProduct] = useState(null);
  const categoryOrder = ["Estuches", "Audífonos Bluetooth", "Audífonos 3.5 mm", "Audífonos Lightning", "Cables", "Cargadores"];
  const categories = ["Todos", ...categoryOrder.filter((item) => products.some((product) => product.category === item))];
  const brands = ["Todos", ...new Set(products.filter((product) => category === "Todos" || product.category === category).map((product) => product.brand))];
  const models = ["Todos", ...new Set(products.filter((product) =>
    (category === "Todos" || product.category === category) &&
    (brand === "Todos" || product.brand === brand)
  ).map((product) => product.model))];
  const visible = useMemo(() => products.filter((product) =>
    (category === "Todos" || product.category === category) &&
    (brand === "Todos" || product.brand === brand) &&
    (model === "Todos" || product.model === model) &&
    `${product.name} ${product.category} ${product.brand} ${product.model} ${product.type}`.toLowerCase().includes(query.trim().toLowerCase())
  ), [category, brand, model, query]);
>>>>>>> 2292f79 (Actualización del proyecto DoctorCell)
  const cartItems = products.filter(({ id }) => cart[id]).map((product) => ({ ...product, quantity: cart[product.id] }));
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const changeQuantity = (id, amount) => setCart((current) => {
    const quantity = (current[id] || 0) + amount;
    if (quantity <= 0) { const next = { ...current }; delete next[id]; return next; }
    return { ...current, [id]: quantity };
  });
  const orderMessage = [
    "Hola DoctorCell Quito, quiero consultar precio y disponibilidad de estos productos:",
    ...cartItems.map((item) => `• ${item.quantity} × ${item.name} (${item.price} c/u)`),
    "Quiero confirmar el modelo, color, valor final y coordinar el pago y la entrega."
  ].join("\n");

  useEffect(() => {
    if (!zoomedProduct) return undefined;
    const closeOnEscape = (event) => event.key === "Escape" && setZoomedProduct(null);
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [zoomedProduct]);

  useEffect(() => {
    const overlayOpen = cartOpen || Boolean(zoomedProduct);
    document.body.classList.toggle("store-overlay-open", overlayOpen);
    return () => document.body.classList.remove("store-overlay-open");
  }, [cartOpen, zoomedProduct]);

  return (
    <section className="store section" id="tienda">
      <div className="store-orb store-orb-one" aria-hidden="true" />
      <div className="store-orb store-orb-two" aria-hidden="true" />
      <div className="store-heading">
        <div>
          <p className="eyebrow"><Sparkles size={15} /> Nueva colección</p>
          {standalone
<<<<<<< HEAD
            ? <h1>Protección de otro nivel.<br /><em>Diseñada para destacar.</em></h1>
            : <h2>Protección de otro nivel.<br /><em>Diseñada para destacar.</em></h2>}
          <p>Cases seleccionados para proteger tu equipo sin esconder su estilo. Elige tu favorito y confirma disponibilidad al instante.</p>
=======
            ? <h1>Todo para tu equipo.<br /><em>Diseñado para destacar.</em></h1>
            : <h2>Todo para tu equipo.<br /><em>Diseñado para destacar.</em></h2>}
          <p>Cases y accesorios seleccionados para proteger, cargar y disfrutar tu equipo. Elige tu favorito y confirma disponibilidad al instante.</p>
>>>>>>> 2292f79 (Actualización del proyecto DoctorCell)
          <div className="store-trust">
            <span><ShieldCheck size={17} /> Compatibilidad verificada</span>
            <span><Zap size={17} /> Respuesta rápida</span>
            <span><Truck size={17} /> Entrega en Quito</span>
          </div>
        </div>
        <button className={`store-cart-button ${itemCount ? "has-items" : ""}`} type="button" onClick={() => setCartOpen(true)} aria-label={`Abrir carrito, ${itemCount} productos`}>
          <ShoppingCart size={20} /><span><small>Tu selección</small>Mi pedido</span><b>{itemCount}</b>
        </button>
      </div>

      <div className="store-toolbar">
<<<<<<< HEAD
        <label className="store-search"><Search size={18} /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar un case..." aria-label="Buscar en la tienda" /></label>
        <div className="store-selectors" aria-label="Filtrar productos">
          <label><span>Modelo</span><select value={model} onChange={(event) => setModel(event.target.value)}>{models.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label><span>Tipo</span><select value={type} onChange={(event) => setType(event.target.value)}>{types.map((item) => <option key={item}>{item}</option>)}</select></label>
=======
        <label className="store-search"><Search size={18} /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar un producto..." aria-label="Buscar en la tienda" /></label>
        <div className="store-selectors" aria-label="Filtrar productos">
          <label><span>Categoría</span><select value={category} onChange={(event) => { setCategory(event.target.value); setBrand("Todos"); setModel("Todos"); }}>{categories.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label><span>Marca</span><select value={brand} onChange={(event) => { setBrand(event.target.value); setModel("Todos"); }}>{brands.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label><span>Modelo</span><select value={model} onChange={(event) => setModel(event.target.value)}>{models.map((item) => <option key={item}>{item}</option>)}</select></label>
>>>>>>> 2292f79 (Actualización del proyecto DoctorCell)
        </div>
      </div>

      <div className="store-grid">
        {visible.map((product) => {
          const inCart = Boolean(cart[product.id]);
          return <article className="product-card" key={product.id}>
<<<<<<< HEAD
            <button className="product-image" type="button" onClick={() => setZoomedProduct(product)} aria-label={`Ampliar imagen de ${product.name}`}><img src={product.image} alt={product.name} loading="lazy" />{product.badge && <span>{product.badge}</span>}<i><Maximize2 size={17} /> Ver imagen</i><em className="product-flirt"><span className="flirt-wink" aria-hidden="true">😉</span><span><b>¿Nos vamos juntos?</b><small>Tu iPhone y yo hacemos buen match</small></span></em></button>
            <div className="product-copy"><small>{product.model}</small><h3>{product.name}</h3><div className="product-meta"><span className="product-type">{product.type}</span><span className="product-stock"><i /> Disponible</span></div><strong className="product-price">{product.price}</strong><p><ShieldCheck size={14} /> Modelo verificado · Confirma disponibilidad</p>
=======
            <button className="product-image" type="button" onClick={() => setZoomedProduct(product)} aria-label={`Ampliar imagen de ${product.name}`}><img src={product.image} alt={product.name} loading="lazy" />{product.badge && <span>{product.badge}</span>}<i><Maximize2 size={17} /> Ver imagen</i><em className="product-flirt"><span className="flirt-wink" aria-hidden="true">😉</span><span><b>¿Nos vamos juntos?</b><small>Tu equipo y yo hacemos buen match</small></span></em></button>
            <div className="product-copy"><small>{product.brand} · {product.category}</small><h3>{product.name}</h3><div className="product-meta"><span className="product-type">{product.type}</span><span className="product-stock"><i /> Disponible</span></div><strong className="product-price">{product.price}</strong><p><ShieldCheck size={14} /> Modelo verificado · Confirma disponibilidad</p>
>>>>>>> 2292f79 (Actualización del proyecto DoctorCell)
              <button type="button" className={inCart ? "is-added" : ""} onClick={() => changeQuantity(product.id, 1)}>{inCart ? <Check size={18} /> : <Plus size={18} />}{inCart ? `En pedido (${cart[product.id]})` : "Agregar al pedido"}</button>
              <a className="product-buy" href={whatsappUrl(`Hola DoctorCell Quito, quiero comprar ${product.name}, con precio publicado de ${product.price}. Quiero confirmar el modelo, color, valor final y coordinar el pago y la entrega.`)} target="_blank" rel="noopener noreferrer"><MessageCircle size={17} /> Comprar ahora <ArrowRight size={16} /></a>
            </div>
          </article>;
        })}
      </div>
<<<<<<< HEAD
      {!visible.length && <div className="store-empty"><ShoppingBag size={28} /><strong>No encontramos productos con esos filtros.</strong><button type="button" onClick={() => { setQuery(""); setModel("Todos"); setType("Todos"); }}>Ver todo el catálogo</button></div>}
=======
      {!visible.length && <div className="store-empty"><ShoppingBag size={28} /><strong>No encontramos productos con esos filtros.</strong><p>Es posible que tengamos tu modelo aunque todavía no aparezca en la tienda.</p><a href={whatsappUrl(`Hola DoctorCell Quito, estoy buscando ${query.trim() || model !== "Todos" && model || "otro producto"}. ¿Me ayudan a confirmar disponibilidad?`)} target="_blank" rel="noopener noreferrer"><MessageCircle size={17} /> Consultar disponibilidad</a><button type="button" onClick={() => { setQuery(""); setCategory("Todos"); setBrand("Todos"); setModel("Todos"); }}>Ver todo el catálogo</button></div>}

      <section className="store-help" aria-labelledby="store-help-title">
        <div className="store-help-intro">
          <span className="store-help-icon"><HelpCircle size={25} /></span>
          <p className="eyebrow">Te ayudamos a encontrarlo</p>
          <h2 id="store-help-title">¿Buscas un case para otro modelo?</h2>
          <p>Cuéntanos la marca y el modelo exacto de tu celular. Revisamos disponibilidad y te enviamos las opciones compatibles por WhatsApp.</p>
          <a href={whatsappUrl("Hola DoctorCell Quito, estoy buscando un case para otro modelo de celular. La marca y el modelo exacto son: ")} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} /><span>Consultar otro modelo<small>Respuesta rápida por WhatsApp</small></span><ArrowRight size={18} /></a>
        </div>
        <div className="store-faq">
          <details open><summary>¿Qué información debo enviar?<Plus size={18} /></summary><p>La marca y el modelo exacto del celular. Puedes encontrarlo en Ajustes › Acerca del teléfono o enviarnos una foto de esa pantalla.</p></details>
          <details><summary>¿Tienen modelos que no aparecen en la tienda?<Plus size={18} /></summary><p>Sí. El catálogo web muestra una selección y el inventario cambia constantemente. Escríbenos para revisar las opciones disponibles.</p></details>
          <details><summary>¿Cómo confirman que el case sea compatible?<Plus size={18} /></summary><p>Verificamos el modelo exacto y la distribución de cámaras antes de confirmar tu pedido.</p></details>
          <details><summary>¿Puedo preguntar por un color específico?<Plus size={18} /></summary><p>Claro. Indica el modelo y el color que buscas; te enviaremos fotos de las alternativas disponibles.</p></details>
        </div>
      </section>

      <a className="store-model-fab" href={whatsappUrl("Hola DoctorCell Quito, no encuentro mi modelo en la tienda. La marca y el modelo exacto son: ")} target="_blank" rel="noopener noreferrer" aria-label="Consultar un modelo que no aparece en la tienda"><HelpCircle size={19} /><span>¿No está tu modelo?<small>Consúltanos aquí</small></span><ArrowRight size={17} /></a>
>>>>>>> 2292f79 (Actualización del proyecto DoctorCell)

      {cartOpen && <div className="cart-backdrop" onClick={() => setCartOpen(false)}><aside className="cart-panel" role="dialog" aria-modal="true" aria-label="Mi pedido" onClick={(event) => event.stopPropagation()}>
        <div className="cart-header"><div><small>DoctorCell Quito</small><h2>Mi pedido</h2></div><button type="button" onClick={() => setCartOpen(false)} aria-label="Cerrar carrito"><X /></button></div>
        <div className="cart-content">
          {!cartItems.length ? <div className="cart-empty"><ShoppingCart size={38} /><strong>Tu pedido está vacío</strong><p>Agrega los cases que te gusten para consultar disponibilidad.</p></div> : cartItems.map((item) => <article className="cart-item" key={item.id}><img src={item.image} alt="" /><div><strong>{item.name}</strong><small>{item.price} c/u · Precio final por confirmar</small><div className="quantity"><button type="button" onClick={() => changeQuantity(item.id, -1)} aria-label="Quitar uno"><Minus size={15} /></button><span>{item.quantity}</span><button type="button" onClick={() => changeQuantity(item.id, 1)} aria-label="Agregar uno"><Plus size={15} /></button><button className="remove" type="button" onClick={() => setCart((current) => { const next = { ...current }; delete next[item.id]; return next; })} aria-label="Eliminar"><Trash2 size={16} /></button></div></div></article>)}
        </div>
        {cartItems.length > 0 && <div className="cart-footer"><p>El precio final se confirma según modelo y disponibilidad.</p><a href={whatsappUrl(orderMessage)} target="_blank" rel="noopener noreferrer">Solicitar por WhatsApp <span>{itemCount}</span></a></div>}
      </aside></div>}
      {zoomedProduct && <div className="product-zoom" role="dialog" aria-modal="true" aria-label={`Imagen ampliada de ${zoomedProduct.name}`} onClick={() => setZoomedProduct(null)}><button className="zoom-close" type="button" onClick={() => setZoomedProduct(null)} aria-label="Cerrar imagen"><X /></button><div className="zoom-card" onClick={(event) => event.stopPropagation()}>
        <div className="zoom-visual"><span className="zoom-kicker"><Sparkles size={14} /> Selección DoctorCell Quito</span><img src={zoomedProduct.image} alt={zoomedProduct.name} /><div className="zoom-visual-note"><ShieldCheck size={17} /><span><b>Protección confiable</b><small>Modelo revisado en empaque</small></span></div></div>
<<<<<<< HEAD
        <div className="zoom-info"><span className="zoom-model">{zoomedProduct.category}</span><strong>{zoomedProduct.name}</strong><div className="zoom-rating"><span>★★★★★</span> Producto recomendado</div><b className="zoom-price">{zoomedProduct.price}</b><div className="zoom-benefits"><span><ShieldCheck size={18} /><b>Compatibilidad verificada</b></span><span><Zap size={18} /><b>Confirmación inmediata</b></span><span><Truck size={18} /><b>Coordina tu entrega</b></span></div><a href={whatsappUrl(`Hola DoctorCell Quito, quiero comprar ${zoomedProduct.name}, con precio publicado de ${zoomedProduct.price}. Quiero confirmar modelo, color, valor final y entrega.`)} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} /><span>Lo quiero por WhatsApp<small>Confirmamos modelo y color</small></span><ArrowRight size={18} /></a><p className="zoom-reassurance"><span /> Atención directa, sin pagos dentro de la web</p></div>
=======
        <div className="zoom-info"><span className="zoom-model">{zoomedProduct.category} · {zoomedProduct.brand}</span><strong>{zoomedProduct.name}</strong><div className="zoom-rating"><span>★★★★★</span> Producto recomendado</div><b className="zoom-price">{zoomedProduct.price}</b><div className="zoom-benefits"><span><ShieldCheck size={18} /><b>Compatibilidad verificada</b></span><span><Zap size={18} /><b>Confirmación inmediata</b></span><span><Truck size={18} /><b>Coordina tu entrega</b></span></div><a href={whatsappUrl(`Hola DoctorCell Quito, quiero comprar ${zoomedProduct.name}, con precio publicado de ${zoomedProduct.price}. Quiero confirmar modelo, color, valor final y entrega.`)} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} /><span>Lo quiero por WhatsApp<small>Confirmamos modelo y color</small></span><ArrowRight size={18} /></a><p className="zoom-reassurance"><span /> Atención directa, sin pagos dentro de la web</p></div>
>>>>>>> 2292f79 (Actualización del proyecto DoctorCell)
      </div></div>}
    </section>
  );
}
