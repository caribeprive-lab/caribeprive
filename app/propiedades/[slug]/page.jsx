import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Chat from "@/components/Chat";
import PropertyView from "@/components/PropertyView";
import { properties, getProperty } from "@/lib/properties";

export function generateStaticParams() {
  return properties.filter((p) => p.published !== false).map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const p = getProperty(params.slug);
  if (!p || p.published === false) return {};
  const description = p.cardDesc.es;
  return {
    title: p.name, // el template "%s — Caribe Privé" se aplica desde el layout
    description,
    alternates: { canonical: `/propiedades/${p.slug}` },
    openGraph: {
      type: "article",
      title: `${p.name} — Caribe Privé`,
      description,
      url: `/propiedades/${p.slug}`,
      images: [{ url: p.heroImage, width: 1200, height: 630, alt: p.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${p.name} — Caribe Privé`,
      description,
      images: [p.heroImage],
    },
  };
}

export default function PropertyPage({ params }) {
  const property = getProperty(params.slug);
  if (!property || property.published === false) notFound();

  return (
    <>
      <Nav />
      <PropertyView property={property} />
      <Footer />
      <Chat propertyName={property.name} />
    </>
  );
}
