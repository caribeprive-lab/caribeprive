"use client";

import { useState, useMemo } from "react";
import { useLang } from "@/components/LanguageProvider";
import { getPublicListings } from "@/lib/listings";
import Reveal from "@/components/Reveal";
import PropertyCard from "@/components/PropertyCard";
import { PageHero, Section, SectionHead, CTABand } from "@/components/content/ui";

export default function PropertiesListing() {
  const { lang } = useLang();
  const L = (es, en) => (lang === "en" ? en : es);
  const [city, setCity] = useState("all");

  const all = useMemo(
    () => getPublicListings({ operation: "venta" }).filter((p) => p.kind !== "development"),
    [],
  );
  const residential = useMemo(() => all.filter((p) => !p.category?.includes("comercial")), [all]);
  const comercial = useMemo(() => all.filter((p) => p.category?.includes("comercial")), [all]);
  const cities = useMemo(() => [...new Set(residential.map((p) => p.city))], [residential]);
  const visible = city === "all" ? residential : residential.filter((p) => p.city === city);

  return (
    <>
      <PageHero
        image="/articulos/F.jpg"
        eyebrow={L("Propiedades", "Properties")}
        title={L("Propiedades seleccionadas, no un catálogo.", "Selected properties, not a catalog.")}
        sub={L(
          "Solo representamos propiedades que cumplen criterios reales de ubicación, estructura comercial y potencial de plusvalía. Explóralas y agenda una visita.",
          "We only represent properties that meet real criteria of location, commercial structure and appreciation potential. Explore them and book a visit.",
        )}
      />

      <Section className="py-16 md:py-24">
        {/* Filtros */}
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
            <div className="flex gap-2.5 flex-wrap">
              <Chip active={city === "all"} onClick={() => setCity("all")}>{L("Todas", "All")}</Chip>
              {cities.map((c) => (
                <Chip key={c} active={city === c} onClick={() => setCity(c)}>{c}</Chip>
              ))}
            </div>
            <span className="text-[13px] text-muted">
              {visible.length} {visible.length === 1 ? L("propiedad", "property") : L("propiedades", "properties")}
            </span>
          </div>
        </Reveal>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {visible.map((item, i) => (
            <Reveal key={item.slug} delay={(i % 3) * 0.08}>
              <PropertyCard item={item} />
            </Reveal>
          ))}
        </div>
      </Section>

      {comercial.length > 0 && (
        <Section tone="bone" className="py-16 md:py-24 border-t border-line">
          <SectionHead
            eyebrow={L("Propiedades", "Properties")}
            title={L("Comercial", "Commercial")}
            intro={L(
              "Locales, edificios y espacios con uso comercial o de servicios.",
              "Retail spaces, buildings and properties for commercial or service use.",
            )}
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7 mt-10">
            {comercial.map((item, i) => (
              <Reveal key={item.slug} delay={(i % 3) * 0.08}>
                <PropertyCard item={item} />
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      <CTABand
        title={L("¿No sabes cuál encaja contigo?", "Not sure which one fits you?")}
        sub={L("Cuéntanos qué buscas y te decimos —con números— cuál tiene más sentido para tu objetivo.", "Tell us what you're after and we'll show you —with numbers— which one makes the most sense for your goal.")}
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
