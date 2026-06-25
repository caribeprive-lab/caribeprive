import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Chat from "@/components/Chat";
import InvestorGuide from "@/components/content/InvestorGuide";

export const metadata = {
  title: "Guía del inversionista",
  description:
    "Cómo comprar de forma legal y segura en el Caribe Mexicano: fideicomiso bancario, gastos de cierre, impuestos y rendimiento realista. Guía clara para comprador nacional y extranjero.",
  alternates: { canonical: "/guia-inversionista" },
};

export default function Page() {
  return (
    <>
      <Nav dark />
      <InvestorGuide />
      <Footer />
      <Chat />
    </>
  );
}
