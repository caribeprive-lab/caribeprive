"use client";

import { useState } from "react";
import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";
import { properties } from "@/lib/properties";
import Reveal from "@/components/Reveal";

const ZONES = ["Cancún", "Puerto Morelos", "Riviera Maya"];

export default function Properties() {
  const { lang, t } = useLang();
  const [filter, setFilter] = useState("all");

  const visible =
    filter === "all" ? properties : properties.filter((p) => p.zone === filter);

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
          {visible.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <Link href={`/propiedades/${p.slug}`} className="group block h-full">
                <article className="bg-white border border-line overflow-hidden flex flex-col h-full transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_22px_46px_rgba(10,53,113,0.16)]">
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={p.cardImage}
                      alt={p.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    />
                    <span className="absolute top-3.5 left-3.5 bg-yellow text-ink text-[10px] font-semibold tracking-[0.1em] uppercase px-3 py-1.5 rounded-full">
                      {p.zone}
                    </span>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="text-[11px] tracking-[0.12em] uppercase text-muted mb-2">
                      {p.type[lang]}
                    </div>
                    <h3 className="text-[32px] mb-2">{p.name}</h3>
                    <p className="text-[13px] text-muted mb-5 flex-1">{p.cardDesc[lang]}</p>
                    <div className="flex justify-between items-center border-t border-line pt-4">
                      <div>
                        <div className="font-display text-[30px] text-blue">{p.appreciation}</div>
                        <div className="text-[10px] tracking-[0.08em] uppercase text-muted">
                          {t("props.appreciation")}
                        </div>
                      </div>
                      <span className="text-blue text-lg group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </article>
              </Link>
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
