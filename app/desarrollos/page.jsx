import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Chat from "@/components/Chat";
import DevelopmentsListing from "@/components/content/DevelopmentsListing";

export const metadata = {
  title: "Desarrollos en preventa",
  description:
    "Desarrollos en preventa seleccionados en el Caribe Mexicano: Mukta Residencial, Vellmari Grand Living y Puerto 369.",
  alternates: { canonical: "/desarrollos" },
};

export default function Page() {
  return (
    <>
      <Nav dark />
      <DevelopmentsListing />
      <Footer />
      <Chat />
    </>
  );
}
