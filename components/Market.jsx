"use client";

import { useState } from "react";
import { useLang } from "@/components/LanguageProvider";
import Reveal from "@/components/Reveal";

export default function Market() {
  const { t } = useLang();
  const [sourcesOpen, setSourcesOpen] = useState(false);

  const indicators = [
    {
      id: "qroo",
      tag: t("market.tag_appreciation"),
      value: t("market.ind1_value"),
      label: t("market.ind1_label"),
      note: t("market.appreciation_note"),
      period: t("market.ind1_period"),
      source: t("market.source_shf"),
      measures: t("market.measures_appreciation"),
    },
    {
      id: "benito-juarez",
      tag: t("market.tag_appreciation"),
      value: t("market.ind2_value"),
      label: t("market.ind2_label"),
      note: t("market.appreciation_note"),
      period: t("market.ind2_period"),
      source: t("market.source_shf"),
      measures: t("market.measures_appreciation"),
    },
    {
      id: "occ-cancun",
      tag: t("market.tag_occupancy"),
      value: t("market.ind3_value"),
      label: t("market.ind3_label"),
      period: t("market.ind3_period"),
      source: t("market.source_sedetur"),
      clarify: t("market.occupancy_clarify"),
      measures: t("market.measures_occupancy"),
    },
    {
      id: "occ-puerto-morelos",
      tag: t("market.tag_occupancy"),
      value: t("market.ind4_value"),
      label: t("market.ind4_label"),
      period: t("market.ind4_period"),
      source: t("market.source_sedetur"),
      clarify: t("market.occupancy_clarify"),
      measures: t("market.measures_occupancy"),
    },
  ];

  const demand = [
    {
      id: "pax-total",
      value: t("market.demand1_value"),
      label: t("market.demand1_label"),
      period: t("market.demand1_period"),
      source: t("market.source_asur"),
      measures: t("market.demand1_measures"),
    },
    {
      id: "pax-intl",
      value: t("market.demand2_value"),
      label: t("market.demand2_label"),
      period: t("market.demand2_period"),
      source: t("market.source_asur"),
      measures: t("market.demand2_measures"),
    },
    {
      id: "pax-yoy",
      value: t("market.demand3_value"),
      label: t("market.demand3_label"),
      period: t("market.demand3_period"),
      source: t("market.source_asur"),
      measures: t("market.demand3_measures"),
    },
    {
      id: "pax-ca",
      value: t("market.demand4_value"),
      label: t("market.demand4_label"),
      period: t("market.demand4_period"),
      source: t("market.source_asur"),
      measures: t("market.demand4_measures"),
    },
  ];

  const allSources = [...indicators, ...demand];

  return (
    <section id="mercado" className="bg-ink text-white py-28 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <Reveal>
          <div className="eyebrow text-yellow mb-6">{t("market.eyebrow")}</div>
          <h2 className="text-white max-w-[20ch]" style={{ fontSize: "clamp(30px,4.4vw,58px)" }}>
            {t("market.title")}
          </h2>
        </Reveal>

        {/* Indicadores clave */}
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {indicators.map((ind, i) => (
            <Reveal key={ind.id} delay={i * 0.06}>
              <div className="border border-white/15 rounded-2xl p-6 h-full flex flex-col">
                <span className="eyebrow text-white/50">{ind.tag}</span>
                <span className="font-display text-yellow text-[38px] mt-3 leading-none">{ind.value}</span>
                <span className="text-white/80 text-[15px] mt-2">{ind.label}</span>
                {ind.note && (
                  <span className="text-white/50 text-[11px] mt-1">{ind.note}</span>
                )}
                <span className="text-white/45 text-[12px] mt-1">{ind.period}</span>
                {ind.clarify && (
                  <span className="text-white/40 text-[11px] mt-3 italic leading-snug">{ind.clarify}</span>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        {/* Demanda y conectividad */}
        <Reveal delay={0.1}>
          <h3 className="font-display text-white text-[26px] md:text-[32px] mt-16 mb-8">
            {t("market.demand_title")}
          </h3>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {demand.map((d, i) => (
            <Reveal key={d.id} delay={i * 0.06}>
              <div className="border border-white/15 rounded-2xl p-6 h-full flex flex-col">
                <span className="font-display text-yellow text-[32px] leading-none">{d.value}</span>
                <span className="text-white/80 text-[15px] mt-2">{d.label}</span>
                <span className="text-white/45 text-[12px] mt-1">{d.period}</span>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Fuentes y metodología */}
        <div className="mt-10 border-t border-white/15 pt-7">
          <button
            onClick={() => setSourcesOpen((v) => !v)}
            aria-expanded={sourcesOpen}
            className="inline-flex items-center gap-2 text-yellow text-[13px] tracking-wide hover:opacity-80 transition-opacity"
          >
            {t("market.sources_toggle")}
            <span className={`transition-transform ${sourcesOpen ? "rotate-180" : ""}`}>▾</span>
          </button>

          {sourcesOpen && (
            <div className="mt-5 grid sm:grid-cols-2 gap-x-8 gap-y-6">
              {allSources.map((item) => (
                <div key={item.id} className="text-[13px] text-white/60 leading-relaxed">
                  <div className="text-white/85 font-medium mb-1">{item.label}</div>
                  <div>
                    <span className="text-white/40">{t("market.label_source")}:</span> {item.source}
                  </div>
                  <div>
                    <span className="text-white/40">{t("market.label_period")}:</span> {item.period}
                  </div>
                  <div>
                    <span className="text-white/40">{t("market.label_measures")}:</span> {item.measures}
                  </div>
                </div>
              ))}
            </div>
          )}

          <p className="mt-7 text-[13px] text-white/60 italic">{t("market.footnote")}</p>
        </div>
      </div>
    </section>
  );
}
