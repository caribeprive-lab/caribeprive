"use client";

import { useLang } from "@/components/LanguageProvider";
import Reveal from "@/components/Reveal";

export default function Market() {
  const { t } = useLang();
  const rows = [
    { zone: "Cancún", price: "$2.9–4k", note: t("market.cancun_note"), appr: "8–12%", yield: "6–12%" },
    { zone: "Puerto Morelos", price: "~$2k", note: t("market.pm_note"), appr: "8–12%", yield: "6–10%" },
    { zone: "Riviera Maya", price: "$2–4.5k", note: t("market.rm_note"), appr: "12–14%", yield: "6.5–8%" },
  ];
  return (
    <section id="mercado" className="bg-ink text-white py-28 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <Reveal>
          <div className="eyebrow text-yellow mb-6">{t("market.eyebrow")}</div>
          <h2 className="text-white max-w-[20ch]" style={{ fontSize: "clamp(30px,4.4vw,58px)" }}>
            {t("market.title")}
          </h2>
        </Reveal>

        <div className="mt-12 border-t border-white/15">
          <div className="hidden md:grid grid-cols-[1.4fr_1fr_1fr_1fr] gap-5 py-4 text-[11px] tracking-[0.14em] uppercase text-white/50 border-b border-white/10">
            <span>{t("market.zone")}</span>
            <span>{t("market.price")}</span>
            <span>{t("market.appr")}</span>
            <span>{t("market.yield")}</span>
          </div>
          {rows.map((r, i) => (
            <Reveal key={r.zone} delay={i * 0.06}>
              <div className="grid grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-3 md:gap-5 py-6 border-b border-white/10 items-baseline">
                <span className="font-display text-[34px] col-span-2 md:col-span-1">{r.zone}</span>
                <span className="font-display text-[34px] md:text-[38px] text-yellow">
                  {r.price}
                  <small className="block font-sans text-[11px] text-white/50 tracking-wide mt-0.5 normal-case">
                    {r.note}
                  </small>
                </span>
                <span className="font-display text-[34px] md:text-[38px] text-yellow">{r.appr}</span>
                <span className="font-display text-[34px] md:text-[38px] text-yellow">{r.yield}</span>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-7 text-[13px] text-white/60 italic">{t("market.footnote")}</p>
      </div>
    </section>
  );
}
