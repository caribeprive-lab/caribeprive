import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Chat from "@/components/Chat";
import LuxuryRentalsComingSoon from "@/components/content/LuxuryRentalsComingSoon";
import RentalsListing from "@/components/content/RentalsListing";
import { getPublicListings } from "@/lib/listings";

export const metadata = {
  title: "Rentas de lujo",
  description:
    "Rentas vacacionales y de temporada de lujo en el Caribe Mexicano: Cancún, Puerto Morelos y Riviera Maya.",
  alternates: { canonical: "/rentas-de-lujo" },
};

export default function Page() {
  const hasRentals = getPublicListings({ operation: "renta" }).length > 0;

  return (
    <>
      <Nav dark />
      {hasRentals ? <RentalsListing /> : <LuxuryRentalsComingSoon />}
      <Footer />
      <Chat />
    </>
  );
}
