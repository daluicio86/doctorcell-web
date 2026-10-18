import { useEffect } from "react";

// Progressive enhancement: content stays visible without JS or observer support.
export default function useSiteMotion() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let cleanup = () => {};
    const setup = () => {
      cleanup();
      if (preference.matches || !("IntersectionObserver" in window)) return;
      const targets = [...document.querySelectorAll(".futurist-home .section-heading, .futurist-home .service-grid article, .futurist-home .comparison-grid article, .futurist-home .quote-intro, .futurist-home .guarantee-content, .futurist-home .trust-process article, .futurist-home .branch-card, .futurist-home .branch-review-links > a")];
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (isIntersecting) {
            target.classList.add("is-revealed");
            observer.unobserve(target);
          }
        });
      }, { threshold: 0.08 });
      targets.forEach((target, index) => {
        target.classList.add("motion-ready");
        target.style.setProperty("--reveal-delay", `${index % 3 * 65}ms`);
        observer.observe(target);
      });
      const scene = document.querySelector(".future-hero");
      const sceneObserver = new IntersectionObserver(([entry]) => {
        scene?.classList.toggle("motion-paused", !entry.isIntersecting);
      });
      if (scene) sceneObserver.observe(scene);
      const cards = [...document.querySelectorAll(".service-grid article")];
      const onPointer = (event) => {
        if (event.pointerType !== "mouse") return;
        const bounds = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty("--spot-x", `${event.clientX - bounds.left}px`);
        event.currentTarget.style.setProperty("--spot-y", `${event.clientY - bounds.top}px`);
      };
      cards.forEach((card) => card.addEventListener("pointermove", onPointer));
      cleanup = () => {
        observer.disconnect();
        sceneObserver.disconnect();
        scene?.classList.remove("motion-paused");
        targets.forEach((target) => target.classList.remove("motion-ready", "is-revealed"));
        cards.forEach((card) => card.removeEventListener("pointermove", onPointer));
      };
    };
    setup();
    preference.addEventListener("change", setup);
    return () => { cleanup(); preference.removeEventListener("change", setup); };
  }, []);
}
