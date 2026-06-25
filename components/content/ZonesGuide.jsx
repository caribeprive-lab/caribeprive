"use client";

import { useLang } from "@/components/LanguageProvider";
import Reveal from "@/components/Reveal";
import {
  PageHero, Section, SectionHead, StatCard, BarChart, Note, CTABand, Icons,
} from "@/components/content/ui";

const ZONES = [
  {
    key: "cancun",
    image: "/articulos/B.jpg",
    name: "Cancún · Puerto Cancún",
    price: "$2,900 – $4,000+ USD/m²",
    appr: "8 – 12%",
    yield: "6 – 12%",
    desc: {
      es: "La zona más consolidada y líquida. Lujo vertical frente a marina, máxima conectividad e infraestructura. Precio premium, pero la reventa y la demanda son las más sólidas del Caribe.",
      en: "The most consolidated and liquid area. Vertical luxury facing the marina, top connectivity and infrastructure. Premium price, but resale and demand are the strongest in the Caribbean.",
    },
    fit: { es: "Ideal para: liquidez y lujo", en: "Best for: liquidity & luxury" },
  },
  {
    key: "pm",
    image: "/articulos/E.jpg",
    name: "Puerto Morelos",
    price: "~$2,000 USD/m²",
    appr: "8 – 12%",
    yield: "6 – 10%",
    desc: {
      es: "El punto de entrada más accesible del corredor, entre Cancún y Playa. Naturaleza, cenotes y desarrollos eco-luxury. El mejor precio por metro para entrar con potencial de crecimiento.",
      en: "The most accessible entry point of the corridor, between Cancún and Playa. Nature, cenotes and eco-luxury developments. The best price per meter to enter with growth potential.",
    },
    fit: { es: "Ideal para: entrar con plusvalía", en: "Best for: entry with upside" },
  },
  {
    key: "riviera",
    image: "/articulos/H.jpg",
    name: "Riviera Maya · Playa del Carmen / Tulum",
    price: "$2,000 – $4,500 USD/m²",
    appr: "12 – 14%",
    yield: "6.5 – 8%",
    desc: {
      es: "El motor turístico y de renta vacacional. Beachfront hasta $10,800/m². La plusvalía nominal más alta del corredor, impulsada por el Tren Maya y la demanda internacional.",
      en: "The tourism and vacation-rental engine. Beachfront up to $10,800/m². The highest nominal appreciation in the corridor, driven by the Maya Train and international demand.",
    },
    fit: { es: "Ideal para: renta vacacional", en: "Best for: vacation rental" },
  },
];

export default function ZonesGuide() {
  const { lang } = useLang();
  const L = (o) => o[lang];

  const priceRows = [
    { label: "Puerto Morelos", value: 2000, display: "~$2,000", highlight: true },
    { label: "Cancún", value: 3450, display: "$2.9k–4k+" },
    { label: "Riviera Maya", value: 3250, display: "$2k–4.5k" },
  ];
  const apprRows = [
    { label: "Riviera Maya", value: 13, display: "12–14%", highlight: true },
    { label: "Cancún", value: 10, display: "8–12%" },
    { label: "Puerto Morelos", value: 10, display: "8–12%" },
  ];
  const yieldRows = [
    { label: "Cancún", value: 9, display: "6–12%", highlight: true },
    { label: "Puerto Morelos", value: 8, display: "6–10%" },
    { label: "Riviera Maya", value: 7.25, display: "6.5–8%" },
  ];

  return (
    <>
      <PageHero
        image="/articulos/D.jpg"
        eyebrow={L({ es: "Guía de zonas", en: "Zones guide" })}
        title={L({ es: "¿Dónde conviene invertir en el Caribe Mexicano?", en: "Where should you invest in the Mexican Caribbean?" })}
        sub={L({
          es: "Cancún, Puerto Morelos y Riviera Maya juegan partidos distintos. Aquí comparamos precio por metro, plusvalía y rendimiento de renta para que elijas con criterio, no por intuición.",
          en: "Cancún, Puerto Morelos and Riviera Maya play different games. Here we compare price per meter, appreciation and rental yield so you choose with criteria, not intuition.",
        })}
      />

      {/* Zone cards */}
      <Section className="py-20 md:py-28">
        <SectionHead
          eyebrow={L({ es: "Las tres zonas", en: "The three zones" })}
          title={L({ es: "Un mismo corredor, tres perfiles de inversión.", en: "One corridor, three investment profiles." })}
        />
        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {ZONES.map((z, i) => (
            <Reveal key={z.key} delay={i * 0.08}>
              <article className="rounded-2xl border border-line bg-white overflow-hidden flex flex-col h-full">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={z.image} alt={z.name} className="h-full w-full object-cover" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-ink text-[20px] font-medium mb-1">{z.name}</h3>
                  <span className="inline-flex w-fit items-center gap-1.5 text-[11px] font-semibold text-[#2f8f82] bg-[#3FB0A0]/10 rounded-full px-3 py-1 mb-4">
                    <Icons.pin /> {L(z.fit)}
                  </span>
                  <p className="text-muted text-[14px] leading-relaxed mb-5 flex-1">{L(z.desc)}</p>
                  <dl className="grid grid-cols-3 gap-2 border-t border-line pt-4 text-center">
                    <div><dt className="text-[10px] uppercase tracking-wide text-muted">{L({ es: "Precio/m²", en: "Price/m²" })}</dt><dd className="text-[12px] font-semibold text-ink mt-1">{z.price.replace(" USD/m²", "").replace("/m²", "")}</dd></div>
                    <div><dt className="text-[10px] uppercase tracking-wide text-muted">{L({ es: "Plusvalía", en: "Apprec." })}</dt><dd className="text-[13px] font-semibold text-blue mt-1">{z.appr}</dd></div>
                    <div><dt className="text-[10px] uppercase tracking-wide text-muted">{L({ es: "Renta", en: "Yield" })}</dt><dd className="text-[13px] font-semibold text-[#2f8f82] mt-1">{z.yield}</dd></div>
                  </dl>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Charts */}
      <Section tone="white" className="py-20 md:py-28">
        <SectionHead
          eyebrow={L({ es: "Comparativa", en: "Comparison" })}
          title={L({ es: "Los números, lado a lado.", en: "The numbers, side by side." })}
          intro={L({
            es: "Datos de mercado 2025–2026. Cada zona destaca en algo distinto: Puerto Morelos en precio de entrada, Riviera Maya en plusvalía nominal y Cancún en rendimiento y liquidez.",
            en: "Market data 2025–2026. Each zone leads in something different: Puerto Morelos on entry price, Riviera Maya on nominal appreciation and Cancún on yield and liquidity.",
          })}
        />
        <div className="grid md:grid-cols-3 gap-5 mt-10">
          <BarChart title={L({ es: "Precio por m²", en: "Price per m²" })} unit="USD" rows={priceRows} max={4500} />
          <BarChart title={L({ es: "Plusvalía anual", en: "Annual appreciation" })} unit="%" rows={apprRows} max={14} />
          <BarChart title={L({ es: "Rendimiento de renta", en: "Rental yield" })} unit="%" rows={yieldRows} max={12} />
        </div>
        <p className="text-muted text-[12px] mt-4">
          {L({ es: "Barras a valor medio del rango. En verde, la zona líder de cada métrica.", en: "Bars at range midpoint. In green, the leading zone per metric." })}
        </p>
      </Section>

      {/* Context */}
      <Section className="py-20 md:py-28">
        <SectionHead
          eyebrow={L({ es: "Contexto que mueve el precio", en: "What's moving prices" })}
          title={L({ es: "Por qué este corredor crece como crece.", en: "Why this corridor grows the way it does." })}
        />
        <div className="grid sm:grid-cols-3 gap-4 mt-10">
          <StatCard value="+400%" label={L({ es: "Aumento del m²", en: "Price per m² rise" })} sub={L({ es: "En zonas del Tren Maya desde su anuncio", en: "In Maya Train areas since its announcement" })} />
          <StatCard value="~75%" label={L({ es: "Ocupación vacacional", en: "Vacation occupancy" })} sub={L({ es: "Promedio de renta turística en el corredor", en: "Average tourist-rental in the corridor" })} />
          <StatCard value="20–30%" label={L({ es: "Costo de administración", en: "Management cost" })} sub={L({ es: "Lo que se lleva administrar tu renta", en: "What managing your rental takes" })} />
        </div>
        <div className="mt-8">
          <Note>
            {L({
              es: "Las cifras son rangos de referencia de mercado, no una promesa de rendimiento. El número que importa es el neto de tu unidad específica: eso lo calculamos contigo antes de que decidas.",
              en: "Figures are market reference ranges, not a promise of return. The number that matters is the net yield of your specific unit: we model that with you before you decide.",
            })}
          </Note>
        </div>
      </Section>

      <CTABand
        title={L({ es: "¿Qué zona encaja con tu objetivo?", en: "Which zone fits your goal?" })}
        sub={L({ es: "Cuéntanos qué buscas y te decimos —con números— dónde tiene más sentido para ti.", en: "Tell us what you're after and we'll show you —with numbers— where it makes the most sense for you." })}
        primary={L({ es: "Agendar una llamada", en: "Book a call" })}
        secondary={L({ es: "Ver propiedades", en: "View properties" })}
      />
    </>
  );
}
