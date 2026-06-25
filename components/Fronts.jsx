"use client";

import { useLang } from "@/components/LanguageProvider";
import Reveal from "@/components/Reveal";

export default function Fronts() {
  const { t } = useLang();
  const items = [
    { n: "01", title: t("fronts.1_title"), body: t("fronts.1_body") },
    { n: "02", title: t("fronts.2_title"), body: t("fronts.2_body") },
    { n: "03", title: t("fronts.3_title"), body: t("fronts.3_body") },
  ];
  return (
    <section id="como-trabajamos" className="py-28 md:py-32 border-t border-line">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <Reveal>
          <div className="eyebrow text-blue mb-6">{t("fronts.eyebrow")}</div>
          <h2 className="max-w-[20ch]" style={{ fontSize: "clamp(30px,4.4vw,58px)" }}>
            {t("fronts.title")}
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-px bg-line border border-line mt-14">
          {items.map((it, i) => (
            <Reveal key={it.n} delay={i * 0.08}>
              <div className="bg-paper hover:bg-white transition-colors p-8 md:p-10 min-h-[290px] flex flex-col h-full">
                <div
                  className="font-display text-yellow leading-none mb-6"
                  style={{ fontSize: "64px", WebkitTextStroke: "1px #0A3571" }}
                >
                  {it.n}
                </div>
                <h3 className="text-[30px] mb-3.5">{it.title}</h3>
                <p className="text-sm text-muted">{it.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
