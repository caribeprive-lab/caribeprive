"use client";

import { useLang } from "@/components/LanguageProvider";
import Reveal from "@/components/Reveal";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

export default function Pledge() {
  const { t } = useLang();
  return (
    <section className="relative overflow-hidden bg-blue-deep text-white py-28 md:py-32">
      <BackgroundGradientAnimation
        interactive={false}
        containerClassName="absolute inset-0 z-0"
      />
      <div className="absolute inset-0 z-[1] bg-blue-deep/40" />
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-8">
        <Reveal>
          <div className="eyebrow text-yellow mb-6">{t("pledge.eyebrow")}</div>
          <h2 className="text-white max-w-[16ch] mb-12" style={{ fontSize: "clamp(34px,5.5vw,76px)" }}>
            {t("pledge.title")}
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-10 md:gap-16">
          <Reveal delay={0.05}>
            <h3 className="text-white text-[34px] mb-4">{t("pledge.a_title")}</h3>
            <p className="text-[#c2cee0] text-[15px]">{t("pledge.a_body")}</p>
            <p className="italic text-white text-[17px] mt-4 border-l-[3px] border-yellow pl-[18px]">
              {t("pledge.a_quote")}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <h3 className="text-white text-[34px] mb-4">{t("pledge.b_title")}</h3>
            <p className="text-[#c2cee0] text-[15px]">{t("pledge.b_body")}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
