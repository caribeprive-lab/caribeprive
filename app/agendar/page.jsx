"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AppointmentForm from "@/components/AppointmentForm";
import Chat from "@/components/Chat";

export default function AgendarPage() {
  return (
    <>
      <Nav dark />
      <AppointmentForm />
      <Footer />
      <Chat />
    </>
  );
}
