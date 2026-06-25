import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Chat from "@/components/Chat";
import ZonesGuide from "@/components/content/ZonesGuide";

export const metadata = {
  title: "Guía de zonas — dónde invertir",
  description:
    "Cancún, Puerto Morelos y Riviera Maya comparados: precio por m², plusvalía y rendimiento de renta. Datos de mercado 2025–2026 para elegir dónde invertir en el Caribe Mexicano.",
  alternates: { canonical: "/zonas" },
};

export default function Page() {
  return (
    <>
      <Nav dark />
      <ZonesGuide />
      <Footer />
      <Chat />
    </>
  );
}
