"use client";

import { useLang } from "@/components/LanguageProvider";

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="bg-ink text-[#8b96a9] py-14 text-[13px]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 flex justify-between flex-wrap gap-5 items-center">
        <div className="flex items-center gap-4">
          <img src="/logowhite.svg" alt="Caribe Privé" className="h-6 w-auto opacity-90" />
          <span className="hidden sm:inline">· {t("footer.tagline")}</span>
        </div>
        <div>Cancún · Puerto Morelos · Riviera Maya</div>
      </div>
    </footer>
  );
}
