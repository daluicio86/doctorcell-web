import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, CalendarDays, Gift, Sparkles, TicketCheck, X } from "lucide-react";
import { isRaffleActive, raffleClosingTime, raffleOpenEvent } from "../utils/raffle.js";

export default function RafflePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef(null);
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!isRaffleActive(Date.now())) return undefined;
    const openPopup = () => setIsOpen(isRaffleActive(Date.now()));
    const openTimer = window.setTimeout(openPopup, 700);
    let expiryTimer;
    const checkExpiry = () => {
      const remaining = raffleClosingTime - Date.now();
      if (remaining <= 0) {
        setIsOpen(false);
        return;
      }
      expiryTimer = window.setTimeout(checkExpiry, Math.min(remaining, 60000));
    };
    checkExpiry();
    window.addEventListener(raffleOpenEvent, openPopup);
    return () => {
      window.clearTimeout(openTimer);
      window.clearTimeout(expiryTimer);
      window.removeEventListener(raffleOpenEvent, openPopup);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    const backgroundElements = overlayRef.current?.parentElement
      ? Array.from(overlayRef.current.parentElement.children).filter((element) => element !== overlayRef.current)
      : [];
    const backgroundState = backgroundElements.map((element) => ({
      element,
      inert: element.inert,
      ariaHidden: element.getAttribute("aria-hidden")
    }));

    backgroundElements.forEach((element) => {
      element.inert = true;
      element.setAttribute("aria-hidden", "true");
    });
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        return;
      }

      if (event.key !== "Tab") return;
      const focusable = dialogRef.current?.querySelectorAll("a[href], button:not([disabled])");
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      backgroundState.forEach(({ element, inert, ariaHidden }) => {
        element.inert = inert;
        if (ariaHidden === null) element.removeAttribute("aria-hidden");
        else element.setAttribute("aria-hidden", ariaHidden);
      });
      previousFocus?.focus?.();
    };
  }, [isOpen]);

  const closePopup = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div ref={overlayRef} className="raffle-overlay" onMouseDown={(event) => event.target === event.currentTarget && closePopup()}>
      <section
        className="raffle-popup"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="raffle-title"
        aria-describedby="raffle-description"
        tabIndex={-1}
      >
        <button ref={closeButtonRef} className="raffle-close" type="button" onClick={closePopup} aria-label="Cerrar promoción">
          <X size={21} />
        </button>

        <div className="raffle-popup-layout">
          <div className="raffle-visual" aria-hidden="true">
            <div className="raffle-visual-top"><span className="raffle-prize-tag"><Gift size={14} /> EL GRAN PREMIO</span><span className="raffle-edition">DOCTORCELL / 2026</span></div>
            <span className="raffle-display-word">A07</span>
            <div className="raffle-device-glow" />
            <div className="raffle-orbit" /><div className="raffle-orbit raffle-orbit-outer" />
            <div className="raffle-device-card">
              <img className="raffle-device-image" src="/images/raffle-device-cutout.png" alt="" width="1254" height="1254" decoding="async" />
            </div>
            <span className="raffle-light-point light-point-one" /><span className="raffle-light-point light-point-two" />
            <div className="raffle-winner-ribbon"><Sparkles size={15} /><span>Una nueva posibilidad.<strong>Puede ser tuyo.</strong></span><ArrowUpRight size={17} /></div>
            <div className="raffle-visual-bottom"><span>SAMSUNG <b>Galaxy A07</b></span><small>Imagen referencial</small></div>
          </div>

          <div className="raffle-content">
            <span className="raffle-kicker"><span className="raffle-live-dot" /> PROMOCIÓN ACTIVA <span className="raffle-kicker-divider">/</span> RIFA DOCTORCELL</span>
            <h2 id="raffle-title">Tus compras.<br />Tu oportunidad.<br /><em>Un Samsung A07.</em></h2>
            <p id="raffle-description">
              Tus compras pueden traerte algo más. Por cada <strong>$25 acumulados</strong>, recibes una oportunidad para ganar.
            </p>

            <div className="raffle-equation" aria-label="Cada veinticinco dólares acumulados en compras equivalen a una oportunidad">
              <span><b>$25</b><small>en compras acumuladas</small></span>
              <i aria-hidden="true">→</i>
              <span><b>01</b><small>oportunidad de ganar</small></span>
            </div>

            <div className="raffle-more-chances"><TicketCheck size={16} /> Registro automático con cada compra.</div>

            <a
              className="raffle-cta"
              href="/terminos-rifa"
              onClick={closePopup}
            >
              <Gift size={20} />
              <span>Quiero participar<small>Conoce cómo y revisa las condiciones</small></span>
              <ArrowUpRight size={22} />
            </a>
            <a className="raffle-terms" href="/terminos-rifa" onClick={closePopup}><CalendarDays size={14} /><span>Participa hasta el <strong>31 oct 2026</strong><small>Sorteo: 7 de noviembre de 2026 · Ver condiciones</small></span></a>
          </div>
        </div>
      </section>
    </div>
  );
}
