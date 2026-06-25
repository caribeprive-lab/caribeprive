"use client";

import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";
import Reveal from "@/components/Reveal";

const openChat = () => window.dispatchEvent(new CustomEvent("ns-open-chat"));

export default function CTA() {
  const { t } = useLang();
  return (
    <section id="asesor" className="bg-yellow text-ink py-28 md:py-32 text-center">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <Reveal>
          <div className="eyebrow text-blue mb-6">{t("cta.eyebrow")}</div>
          <h2 className="max-w-[16ch] mx-auto mb-8" style={{ fontSize: "clamp(40px,6.5vw,96px)" }}>
            {t("cta.title")}
          </h2>
          <div className="flex gap-3.5 justify-center flex-wrap">
            <button
              onClick={openChat}
              className="text-[13px] tracking-wide rounded-full px-7 py-3.5 border border-ink hover:bg-ink hover:text-paper transition-colors"
            >
              {t("nav.cta")}
            </button>
            <Link
              href="/agendar"
              className="text-[13px] font-semibold tracking-wide rounded-full px-7 py-3.5 bg-ink text-paper hover:opacity-80 transition-opacity"
            >
              Agendar Cita / Zoom
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
