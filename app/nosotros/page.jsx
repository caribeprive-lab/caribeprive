import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Chat from "@/components/Chat";
import AboutUs from "@/components/content/AboutUs";

export const metadata = {
  title: "Sobre nosotros",
  description:
    "Caribe Privé: asesoría inmobiliaria que no desaparece al firmar. Conoce nuestro enfoque de claridad radical y al equipo que te acompaña en el Caribe Mexicano.",
  alternates: { canonical: "/nosotros" },
};

export default function Page() {
  return (
    <>
      <Nav dark />
      <AboutUs />
      <Footer />
      <Chat />
    </>
  );
}
