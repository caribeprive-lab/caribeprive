"use client";

import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";

export default function PropertyCard({ item, emphasizeRent = false }) {
  const { lang, t } = useLang();
  const showRent = item.operation === "renta" || (emphasizeRent && item.rentPrice);
  const priceDisplay = showRent && item.operation !== "renta"
    ? item.rentPrice?.display?.[lang]
    : item.price?.display?.[lang];

  return (
    <Link href={item.href} className="group block h-full">
      <article className="bg-white border border-line overflow-hidden flex flex-col h-full transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_22px_46px_rgba(52,67,81,0.16)]">
        <div className="aspect-[4/3] overflow-hidden relative">
          <img
            src={item.cardImage}
            alt={item.name}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
          />
          <span className="absolute top-3.5 left-3.5 bg-yellow text-ink text-[10px] font-semibold tracking-[0.1em] uppercase px-3 py-1.5 rounded-full">
            {item.zone}
          </span>
        </div>
        <div className="p-6 flex-1 flex flex-col">
          <div className="text-[11px] tracking-[0.12em] uppercase text-muted mb-2">{item.type[lang]}</div>
          <h3 className="text-[32px] mb-2">{item.name}</h3>
          <p className="text-[13px] text-muted mb-5 flex-1">{item.cardDesc[lang]}</p>
          <div className="flex justify-between items-center border-t border-line pt-4">
            <div>
              <div className="font-display text-[22px] text-blue">{priceDisplay}</div>
              <div className="text-[10px] tracking-[0.08em] uppercase text-muted">
                {showRent ? t("props.rentPrice") : t("props.salePrice")}
              </div>
            </div>
            <span className="text-blue text-lg group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
