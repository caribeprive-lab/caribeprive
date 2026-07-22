"use client";

import { useState } from "react";
import { useLang } from "@/components/LanguageProvider";
import { getPublicListings } from "@/lib/listings";
import Reveal from "@/components/Reveal";
import PropertyCard from "@/components/PropertyCard";

const ZONES = ["Cancún", "Puerto Morelos", "Riviera Maya"];

export default function Properties() {
  const { t } = useLang();
  const [filter, setFilter] = useState("all");

  const all = getPublicListings({ operation: "venta" }).filter((p) => p.kind !== "development");
  const visible = filter === "all" ? all : all.filter((p) => p.city === filter);

  return (
    <section id="propiedades" className="py-28 md:py-32 border-t border-line">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <div className="flex justify-between items-end flex-wrap gap-5 mb-12">
          <Reveal>
            <div className="eyebrow text-blue mb-6">{t("props.eyebrow")}</div>
            <h2 className="max-w-[20ch]" style={{ fontSize: "clamp(30px,4.4vw,58px)" }}>
              {t("props.title")}
            </h2>
          </Reveal>
          {/* Filtros por zona — ocultos por ahora (pocos desarrollos). Reactivar cuando haya más.
          <div className="flex gap-2.5 flex-wrap">
            <Chip active={filter === "all"} onClick={() => setFilter("all")}>
              {t("props.all")}
            </Chip>
            {ZONES.map((z) => (
              <Chip key={z} active={filter === z} onClick={() => setFilter(z)}>
                {z}
              </Chip>
            ))}
          </div>
          */}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {visible.map((item, i) => (
            <Reveal key={item.slug} delay={i * 0.08}>
              <PropertyCard item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Chip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`text-xs tracking-wide px-4 py-2 rounded-full border transition-colors ${
        active ? "bg-blue text-white border-blue" : "border-line text-muted hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}
