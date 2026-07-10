"use client";

import { useState, useMemo } from "react";
import { useLang } from "@/components/LanguageProvider";
import { getPublicListings } from "@/lib/listings";
import Reveal from "@/components/Reveal";
import PropertyCard from "@/components/PropertyCard";
import { PageHero, Section, CTABand } from "@/components/content/ui";

export default function RentalsListing() {
  const { lang } = useLang();
  const L = (es, en) => (lang === "en" ? en : es);
  const [zone, setZone] = useState("all");

  const all = useMemo(() => getPublicListings({ operation: "renta" }), []);
  const zones = useMemo(() => [...new Set(all.map((p) => p.zone))], [all]);
  const visible = zone === "all" ? all : all.filter((p) => p.zone === zone);

  return (
    <>
      <PageHero
        image="/articulos/D.jpg"
        eyebrow={L("Rentas de lujo", "Luxury rentals")}
        title={L("Rentas seleccionadas para quedarte como en casa.", "Selected rentals, so you feel right at home.")}
        sub={L(
          "Casas y departamentos de lujo disponibles para renta en el Caribe Mexicano, con administración y seguimiento continuo.",
          "Luxury homes and condos available for rent in the Mexican Caribbean, with ongoing management and follow-up.",
        )}
      />

      <Section className="py-16 md:py-24">
        {/* Filtros */}
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
            <div className="flex gap-2.5 flex-wrap">
              <Chip active={zone === "all"} onClick={() => setZone("all")}>{L("Todas", "All")}</Chip>
              {zones.map((z) => (
                <Chip key={z} active={zone === z} onClick={() => setZone(z)}>{z}</Chip>
              ))}
            </div>
            <span className="text-[13px] text-muted">
              {visible.length} {visible.length === 1 ? L("renta", "rental") : L("rentas", "rentals")}
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

      <CTABand
        title={L("¿Buscas rentar en el Caribe Mexicano?", "Looking to rent in the Mexican Caribbean?")}
        sub={L(
          "Cuéntanos tus fechas y preferencias y te ayudamos a encontrar la renta ideal.",
          "Tell us your dates and preferences and we'll help you find the ideal rental.",
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
