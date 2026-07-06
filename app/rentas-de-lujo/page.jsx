import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Chat from "@/components/Chat";
import LuxuryRentalsComingSoon from "@/components/content/LuxuryRentalsComingSoon";

export const metadata = {
  title: "Rentas de lujo",
  description:
    "Próximamente: rentas vacacionales y de temporada de lujo en el Caribe Mexicano. Mientras tanto, explora nuestras propiedades disponibles en reventa.",
  alternates: { canonical: "/rentas-de-lujo" },
};

export default function Page() {
  return (
    <>
      <Nav dark />
      <LuxuryRentalsComingSoon />
      <Footer />
      <Chat />
    </>
  );
}
