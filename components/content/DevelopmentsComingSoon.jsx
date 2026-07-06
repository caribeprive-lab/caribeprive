"use client";

import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";
import Reveal from "@/components/Reveal";
import { PageHero, Section, CTABand } from "@/components/content/ui";

export default function DevelopmentsComingSoon() {
  const { lang } = useLang();
  const L = (es, en) => (lang === "en" ? en : es);

  return (
    <>
      <PageHero
        image="/articulos/C.jpg"
        eyebrow={L("Desarrollos", "Developments")}
        title={L("Proyectos en preventa. Muy pronto aquí.", "Pre-sale projects. Coming here soon.")}
        sub={L(
          "Estamos organizando la selección de desarrollos en preventa que cumplen nuestros criterios de ubicación, estructura comercial y potencial de plusvalía.",
          "We're organizing the selection of pre-sale developments that meet our criteria for location, commercial structure and appreciation potential.",
        )}
      />

      <Section className="py-24 md:py-28">
        <Reveal>
          <div className="max-w-[640px] mx-auto text-center">
            <p className="text-muted text-[16px] leading-relaxed mb-8">
              {L(
                "Mientras tanto, conoce las propiedades disponibles en reventa — desarrollos ya entregados o en etapas avanzadas, listos para visitar.",
                "In the meantime, take a look at our available resale properties — already-delivered or advanced-stage developments, ready to visit.",
              )}
            </p>
            <Link
              href="/propiedades"
              className="inline-flex text-[13px] font-semibold tracking-wide rounded-full px-7 py-3.5 bg-yellow text-ink hover:bg-yellow-bright transition-colors"
            >
              {L("Ver propiedades en reventa", "See resale properties")}
            </Link>
          </div>
        </Reveal>
      </Section>

      <CTABand
        title={L("¿Buscas invertir en preventa?", "Looking to invest in pre-sale?")}
        sub={L(
          "Cuéntanos qué tipo de desarrollo buscas y te avisamos en cuanto abramos esta sección con las primeras oportunidades.",
          "Tell us what kind of development you're after and we'll notify you as soon as we open this section with the first opportunities.",
        )}
        primary={L("Agendar una llamada", "Book a call")}
        secondary={L("Preguntar al asesor", "Ask the advisor")}
      />
    </>
  );
}
