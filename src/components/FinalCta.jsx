import React from "react";
import { Stethoscope } from "lucide-react";
import ButtonLink from "./ButtonLink.jsx";

export default function FinalCta() {
  return (
    <section className="final-cta">
      <h2>Cuéntanos qué le pasa a tu equipo.</h2>
      <p>Recibe una orientación preliminar y elige la sucursal que te quede más cerca.</p>
      <ButtonLink href="#cotizador" icon={Stethoscope}>
        Empezar ahora
      </ButtonLink>
    </section>
  );
}
