"use client";

import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";
import Reveal from "@/components/Reveal";
import { PageHero, Section, CTABand } from "@/components/content/ui";

export default function LuxuryRentalsComingSoon() {
  const { lang } = useLang();
  const L = (es, en) => (lang === "en" ? en : es);

  return (
    <>
      <PageHero
        image="/articulos/D.jpg"
        eyebrow={L("Rentas de lujo", "Luxury rentals")}
        title={L("Rentas vacacionales y de temporada. Muy pronto aquí.", "Vacation and seasonal rentals. Coming here soon.")}
        sub={L(
          "Estamos preparando la selección de propiedades disponibles para renta de lujo en el Caribe Mexicano, con administración y seguimiento continuo.",
          "We're preparing the selection of luxury rental properties available in the Mexican Caribbean, with ongoing management and follow-up.",
        )}
      />

      <Section className="py-24 md:py-28">
        <Reveal>
          <div className="max-w-[640px] mx-auto text-center">
            <p className="text-muted text-[16px] leading-relaxed mb-8">
              {L(
                "Mientras tanto, conoce las propiedades disponibles en reventa, o cuéntanos qué tipo de renta buscas y te contactamos personalmente.",
                "In the meantime, take a look at our available resale properties, or tell us what kind of rental you're after and we'll reach out personally.",
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
        title={L("¿Buscas rentar en el Caribe Mexicano?", "Looking to rent in the Mexican Caribbean?")}
        sub={L(
          "Cuéntanos tus fechas y preferencias y te avisamos en cuanto abramos esta sección con las primeras opciones disponibles.",
          "Tell us your dates and preferences and we'll notify you as soon as we open this section with the first available options.",
        )}
        primary={L("Agendar una llamada", "Book a call")}
        secondary={L("Preguntar al asesor", "Ask the advisor")}
      />
    </>
  );
}
