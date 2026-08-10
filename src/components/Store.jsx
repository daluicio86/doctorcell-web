import React, { useEffect, useMemo, useState } from "react";
import { ArrowRight, Check, Maximize2, MessageCircle, Minus, Plus, Search, ShieldCheck, ShoppingBag, ShoppingCart, Sparkles, Trash2, Truck, X, Zap } from "lucide-react";
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
            ? <h1>Protección de otro nivel.<br /><em>Diseñada para destacar.</em></h1>
            : <h2>Protección de otro nivel.<br /><em>Diseñada para destacar.</em></h2>}
          <p>Cases seleccionados para proteger tu equipo sin esconder su estilo. Elige tu favorito y confirma disponibilidad al instante.</p>
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
        <label className="store-search"><Search size={18} /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar un case..." aria-label="Buscar en la tienda" /></label>
        <div className="store-selectors" aria-label="Filtrar productos">
          <label><span>Modelo</span><select value={model} onChange={(event) => setModel(event.target.value)}>{models.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label><span>Tipo</span><select value={type} onChange={(event) => setType(event.target.value)}>{types.map((item) => <option key={item}>{item}</option>)}</select></label>
        </div>
      </div>

      <div className="store-grid">
        {visible.map((product) => {
          const inCart = Boolean(cart[product.id]);
          return <article className="product-card" key={product.id}>
            <button className="product-image" type="button" onClick={() => setZoomedProduct(product)} aria-label={`Ampliar imagen de ${product.name}`}><img src={product.image} alt={product.name} loading="lazy" />{product.badge && <span>{product.badge}</span>}<i><Maximize2 size={17} /> Ver imagen</i><em className="product-flirt"><span className="flirt-wink" aria-hidden="true">😉</span><span><b>¿Nos vamos juntos?</b><small>Tu iPhone y yo hacemos buen match</small></span></em></button>
            <div className="product-copy"><small>{product.model}</small><h3>{product.name}</h3><div className="product-meta"><span className="product-type">{product.type}</span><span className="product-stock"><i /> Disponible</span></div><strong className="product-price">{product.price}</strong><p><ShieldCheck size={14} /> Modelo verificado · Confirma disponibilidad</p>
              <button type="button" className={inCart ? "is-added" : ""} onClick={() => changeQuantity(product.id, 1)}>{inCart ? <Check size={18} /> : <Plus size={18} />}{inCart ? `En pedido (${cart[product.id]})` : "Agregar al pedido"}</button>
              <a className="product-buy" href={whatsappUrl(`Hola DoctorCell Quito, quiero comprar ${product.name}, con precio publicado de ${product.price}. Quiero confirmar el modelo, color, valor final y coordinar el pago y la entrega.`)} target="_blank" rel="noopener noreferrer"><MessageCircle size={17} /> Comprar ahora <ArrowRight size={16} /></a>
            </div>
          </article>;
        })}
      </div>
      {!visible.length && <div className="store-empty"><ShoppingBag size={28} /><strong>No encontramos productos con esos filtros.</strong><button type="button" onClick={() => { setQuery(""); setModel("Todos"); setType("Todos"); }}>Ver todo el catálogo</button></div>}

      {cartOpen && <div className="cart-backdrop" onClick={() => setCartOpen(false)}><aside className="cart-panel" role="dialog" aria-modal="true" aria-label="Mi pedido" onClick={(event) => event.stopPropagation()}>
        <div className="cart-header"><div><small>DoctorCell Quito</small><h2>Mi pedido</h2></div><button type="button" onClick={() => setCartOpen(false)} aria-label="Cerrar carrito"><X /></button></div>
        <div className="cart-content">
          {!cartItems.length ? <div className="cart-empty"><ShoppingCart size={38} /><strong>Tu pedido está vacío</strong><p>Agrega los cases que te gusten para consultar disponibilidad.</p></div> : cartItems.map((item) => <article className="cart-item" key={item.id}><img src={item.image} alt="" /><div><strong>{item.name}</strong><small>{item.price} c/u · Precio final por confirmar</small><div className="quantity"><button type="button" onClick={() => changeQuantity(item.id, -1)} aria-label="Quitar uno"><Minus size={15} /></button><span>{item.quantity}</span><button type="button" onClick={() => changeQuantity(item.id, 1)} aria-label="Agregar uno"><Plus size={15} /></button><button className="remove" type="button" onClick={() => setCart((current) => { const next = { ...current }; delete next[item.id]; return next; })} aria-label="Eliminar"><Trash2 size={16} /></button></div></div></article>)}
        </div>
        {cartItems.length > 0 && <div className="cart-footer"><p>El precio final se confirma según modelo y disponibilidad.</p><a href={whatsappUrl(orderMessage)} target="_blank" rel="noopener noreferrer">Solicitar por WhatsApp <span>{itemCount}</span></a></div>}
      </aside></div>}
      {zoomedProduct && <div className="product-zoom" role="dialog" aria-modal="true" aria-label={`Imagen ampliada de ${zoomedProduct.name}`} onClick={() => setZoomedProduct(null)}><button className="zoom-close" type="button" onClick={() => setZoomedProduct(null)} aria-label="Cerrar imagen"><X /></button><div className="zoom-card" onClick={(event) => event.stopPropagation()}>
        <div className="zoom-visual"><span className="zoom-kicker"><Sparkles size={14} /> Selección DoctorCell Quito</span><img src={zoomedProduct.image} alt={zoomedProduct.name} /><div className="zoom-visual-note"><ShieldCheck size={17} /><span><b>Protección confiable</b><small>Modelo revisado en empaque</small></span></div></div>
        <div className="zoom-info"><span className="zoom-model">{zoomedProduct.category}</span><strong>{zoomedProduct.name}</strong><div className="zoom-rating"><span>★★★★★</span> Producto recomendado</div><b className="zoom-price">{zoomedProduct.price}</b><div className="zoom-benefits"><span><ShieldCheck size={18} /><b>Compatibilidad verificada</b></span><span><Zap size={18} /><b>Confirmación inmediata</b></span><span><Truck size={18} /><b>Coordina tu entrega</b></span></div><a href={whatsappUrl(`Hola DoctorCell Quito, quiero comprar ${zoomedProduct.name}, con precio publicado de ${zoomedProduct.price}. Quiero confirmar modelo, color, valor final y entrega.`)} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} /><span>Lo quiero por WhatsApp<small>Confirmamos modelo y color</small></span><ArrowRight size={18} /></a><p className="zoom-reassurance"><span /> Atención directa, sin pagos dentro de la web</p></div>
      </div></div>}
    </section>
  );
}
