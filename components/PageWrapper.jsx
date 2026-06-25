"use client";

import { useState, useCallback } from "react";
import Preloader from "@/components/Preloader";

export default function PageWrapper({ children }) {
  const [done, setDone] = useState(false);

  const handleComplete = useCallback(() => setDone(true), []);

  return (
    <>
      {!done && <Preloader onComplete={handleComplete} />}
      {children}
    </>
  );
}
