import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Chat from "@/components/Chat";
import HowWeWork from "@/components/content/HowWeWork";

export const metadata = {
  title: "Cómo trabajamos",
  description:
    "Una sola contraparte durante todo el ciclo de tu propiedad: comprar, rentar, administrar y vender. Claridad radical y acompañamiento de largo plazo en el Caribe Mexicano.",
  alternates: { canonical: "/como-trabajamos" },
};

export default function Page() {
  return (
    <>
      <Nav dark />
      <HowWeWork />
      <Footer />
      <Chat />
    </>
  );
}
