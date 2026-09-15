import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, FileText, Gift, Sparkles, TicketCheck, X } from "lucide-react";

const DISMISSED_KEY = "doctorcell-raffle-s07-dismissed";

export default function RafflePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef(null);
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (sessionStorage.getItem(DISMISSED_KEY)) return undefined;
    const openTimer = window.setTimeout(() => setIsOpen(true), 700);
    return () => window.clearTimeout(openTimer);
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
        sessionStorage.setItem(DISMISSED_KEY, "true");
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
    sessionStorage.setItem(DISMISSED_KEY, "true");
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
            <span className="raffle-confetti raffle-confetti-one" />
            <span className="raffle-confetti raffle-confetti-two" />
            <span className="raffle-confetti raffle-confetti-three" />
            <Sparkles className="raffle-sparkle raffle-sparkle-one" size={27} />
            <Sparkles className="raffle-sparkle raffle-sparkle-two" size={20} />

            <div className="raffle-prize-tag"><Gift size={16} /> Gran premio</div>
            <div className="raffle-device-glow" />
            <div className="raffle-device-card">
              <img className="raffle-device-image" src="/images/raffle-device.jpg" alt="" width="447" height="447" decoding="async" />
            </div>
            <div className="raffle-winner-ribbon"><Sparkles size={15} /> ¡Puede ser tuyo!</div>
          </div>

          <div className="raffle-content">
            <span className="raffle-kicker"><Gift size={15} /> Rifa DoctorCell</span>
            <h2 id="raffle-title">¡Participa para ganar un <em>Samsung S07!</em></h2>
            <p id="raffle-description">
              Tus compras se acumulan automáticamente: por cada <strong>$25 acumulados</strong> recibes una oportunidad para participar en la rifa.
            </p>

            <div className="raffle-equation" aria-label="Cada veinticinco dólares acumulados en compras equivalen a una oportunidad">
              <span><b>$25</b><small>en compras</small></span>
              <i>=</i>
              <span><b>1</b><small>oportunidad</small></span>
            </div>

            <div className="raffle-more-chances"><TicketCheck size={18} /> Registro automático: tus compras se acumulan hasta completar $25.</div>

            <a
              className="raffle-cta"
              href="/terminos-rifa"
              onClick={closePopup}
            >
              <FileText size={20} />
              <span>Quiero participar<small>Conoce los requisitos y condiciones</small></span>
              <ArrowRight size={20} />
            </a>
            <a className="raffle-terms" href="/terminos-rifa" onClick={closePopup}>Vigente hasta el 31 de octubre · Sorteo: 7 de noviembre de 2026</a>
          </div>
        </div>
      </section>
    </div>
  );
}
