import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Chat from "@/components/Chat";
import DevelopmentsComingSoon from "@/components/content/DevelopmentsComingSoon";

export const metadata = {
  title: "Desarrollos en preventa",
  description:
    "Próximamente: desarrollos en preventa seleccionados en el Caribe Mexicano. Mientras tanto, explora nuestras propiedades disponibles en reventa.",
  alternates: { canonical: "/desarrollos" },
};

export default function Page() {
  return (
    <>
      <Nav dark />
      <DevelopmentsComingSoon />
      <Footer />
      <Chat />
    </>
  );
}
