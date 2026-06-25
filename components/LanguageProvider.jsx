"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { dict } from "@/lib/i18n";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("es");

  useEffect(() => {
    const saved = typeof window !== "undefined" && localStorage.getItem("ns_lang");
    if (saved === "es" || saved === "en") setLang(saved);
  }, []);

  const toggle = () => {
    setLang((prev) => {
      const next = prev === "es" ? "en" : "es";
      if (typeof window !== "undefined") localStorage.setItem("ns_lang", next);
      document.documentElement.lang = next;
      return next;
    });
  };

  // t("key") returns the string for the current language
  const t = (key) => {
    const entry = dict[key];
    if (!entry) return key;
    return entry[lang] ?? entry.es ?? key;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
