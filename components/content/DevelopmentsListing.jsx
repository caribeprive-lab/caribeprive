"use client";

import { useState, useMemo } from "react";
import { useLang } from "@/components/LanguageProvider";
import { getPublicListings } from "@/lib/listings";
import Reveal from "@/components/Reveal";
import PropertyCard from "@/components/PropertyCard";
import { PageHero, Section, CTABand } from "@/components/content/ui";

export default function DevelopmentsListing() {
  const { lang } = useLang();
  const L = (es, en) => (lang === "en" ? en : es);
  const [city, setCity] = useState("all");

  const all = useMemo(
    () => getPublicListings().filter((item) => item.kind === "development"),
    [],
  );
  const cities = useMemo(() => [...new Set(all.map((p) => p.city))], [all]);
  const visible = city === "all" ? all : all.filter((p) => p.city === city);

  return (
    <>
      <PageHero
        image="/articulos/C.jpg"
        eyebrow={L("Desarrollos", "Developments")}
        title={L("Proyectos en preventa seleccionados.", "Selected pre-sale projects.")}
        sub={L(
          "Desarrollos que cumplen nuestros criterios de ubicación, estructura comercial y potencial de plusvalía en el Caribe Mexicano.",
          "Developments that meet our criteria for location, commercial structure and appreciation potential in the Mexican Caribbean.",
        )}
      />

      <Section className="py-16 md:py-24">
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
            <div className="flex gap-2.5 flex-wrap">
              <Chip active={city === "all"} onClick={() => setCity("all")}>{L("Todas", "All")}</Chip>
              {cities.map((c) => (
                <Chip key={c} active={city === c} onClick={() => setCity(c)}>{c}</Chip>
              ))}
            </div>
            <span className="text-[13px] text-muted">
              {visible.length} {visible.length === 1 ? L("desarrollo", "development") : L("desarrollos", "developments")}
            </span>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {visible.map((item, i) => (
            <Reveal key={item.slug} delay={(i % 3) * 0.08}>
              <PropertyCard item={item} />
            </Reveal>
          ))}
        </div>
      </Section>

      <CTABand
        title={L("¿Buscas invertir en preventa?", "Looking to invest in pre-sale?")}
        sub={L(
          "Cuéntanos qué tipo de desarrollo buscas y te ayudamos a comparar opciones con números reales.",
          "Tell us what kind of development you're after and we'll help you compare options with real numbers.",
        )}
        primary={L("Agendar una llamada", "Book a call")}
        secondary={L("Preguntar al asesor", "Ask the advisor")}
      />
    </>
  );
}

function Chip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`text-xs tracking-wide px-4 py-2 rounded-full border transition-colors ${
        active ? "bg-blue text-white border-blue" : "border-line text-muted hover:text-ink hover:border-[#3FB0A0]/50 bg-white"
      }`}
    >
      {children}
    </button>
  );
}
