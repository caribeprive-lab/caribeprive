"use client";

import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";

export default function Footer() {
  const { lang, t } = useLang();
  const L = (es, en) => (lang === "en" ? en : es);

  const explore = [
    { href: "/guia-inversionista", label: L("Guía del inversionista", "Investor guide") },
    { href: "/zonas", label: L("Guía de zonas", "Zones guide") },
    { href: "/como-trabajamos", label: L("Cómo trabajamos", "How we work") },
    { href: "/nosotros", label: L("Sobre nosotros", "About us") },
  ];

  const site = [
    { href: "/#propiedades", label: L("Propiedades", "Properties") },
    { href: "/#mercado", label: L("Mercado", "Market") },
    { href: "/agendar", label: L("Agendar cita", "Book a call") },
  ];

  return (
    <footer className="bg-ink text-[#8b96a9] pt-16 pb-10 text-[13px]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <div className="grid md:grid-cols-[1.4fr_1fr_1fr] gap-10 md:gap-8 pb-12 border-b border-white/10">
          <div>
            <img src="/logowhite.svg" alt="Caribe Privé" className="h-6 w-auto opacity-90 mb-4" />
            <p className="max-w-[34ch] leading-relaxed text-[#8b96a9]">{t("footer.tagline")}</p>
            <p className="mt-4 text-[#6b7689]">Cancún · Puerto Morelos · Riviera Maya</p>
          </div>

          <div>
            <h4 className="text-white/80 text-[11px] tracking-[0.18em] uppercase font-semibold mb-4">
              {L("Explorar", "Explore")}
            </h4>
            <ul className="flex flex-col gap-2.5">
              {explore.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-yellow transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white/80 text-[11px] tracking-[0.18em] uppercase font-semibold mb-4">
              {L("Sitio", "Site")}
            </h4>
            <ul className="flex flex-col gap-2.5">
              {site.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="hover:text-yellow transition-colors">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex justify-between flex-wrap gap-3 pt-8 text-[12px] text-[#6b7689]">
          <span>© {new Date().getFullYear()} Caribe Privé · {L("Todos los derechos reservados", "All rights reserved")}</span>
          <span>{L("Real estate advisory · Caribe Mexicano", "Real estate advisory · Mexican Caribbean")}</span>
        </div>
      </div>
    </footer>
  );
}
