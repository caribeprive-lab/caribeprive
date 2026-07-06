import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Chat from "@/components/Chat";
import PropertyView from "@/components/PropertyView";
import { developments, getDevelopment } from "@/lib/developments";

export function generateStaticParams() {
  return developments.filter((d) => d.published !== false).map((d) => ({ slug: d.slug }));
}

export function generateMetadata({ params }) {
  const d = getDevelopment(params.slug);
  if (!d || d.published === false) return {};
  const title = d.seo?.title?.es || d.name;
  const description = d.seo?.description?.es || d.cardDesc.es;
  return {
    title, // el template "%s — Caribe Privé" se aplica desde el layout
    description,
    alternates: { canonical: `/desarrollos/${d.slug}` },
    openGraph: {
      type: "article",
      title: `${d.name} — Caribe Privé`,
      description,
      url: `/desarrollos/${d.slug}`,
      images: [{ url: d.heroImage, width: 1200, height: 630, alt: d.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${d.name} — Caribe Privé`,
      description,
      images: [d.heroImage],
    },
  };
}

export default function DevelopmentPage({ params }) {
  const development = getDevelopment(params.slug);
  if (!development || development.published === false) notFound();

  return (
    <>
      <Nav />
      <PropertyView property={development} />
      <Footer />
      <Chat propertyName={development.name} />
    </>
  );
}
