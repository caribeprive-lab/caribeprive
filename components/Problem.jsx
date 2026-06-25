"use client";

import { useLang } from "@/components/LanguageProvider";
import Reveal from "@/components/Reveal";

export default function Problem() {
  const { t } = useLang();
  return (
    <section className="py-28 md:py-32 border-t border-line">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <Reveal>
          <div className="eyebrow text-blue mb-6">{t("problem.eyebrow")}</div>
        </Reveal>
        <div className="grid md:grid-cols-[1.1fr_.9fr] gap-10 md:gap-20 items-center mt-2">
          <Reveal>
            <h2 className="max-w-[16ch]" style={{ fontSize: "clamp(30px,3.6vw,50px)" }}>
              {t("problem.title")}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="border-l-[3px] border-yellow pl-7">
              <p className="text-[19px] leading-relaxed text-ink font-medium mb-4">
                {t("problem.p1")}
              </p>
              <p className="text-[19px] leading-relaxed text-blue-soft">{t("problem.p2")}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
