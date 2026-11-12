"use client";

import { useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Visor de pantalla completa para la galería de una propiedad/desarrollo.
// Controles: flechas en pantalla, ← / → del teclado, deslizar en móvil,
// Esc o clic fuera de la foto para cerrar.
export default function GalleryLightbox({ images, index, onIndexChange, onClose, lang = "es" }) {
  const open = index != null;
  const total = images.length;
  const touchX = useRef(null);
  const closeBtn = useRef(null);

  const go = useCallback(
    (delta) => onIndexChange((i) => (i + delta + total) % total),
    [onIndexChange, total],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, go, onClose]);

  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
  };

  const L = (es, en) => (lang === "es" ? es : en);
  const btn =
    "absolute z-10 flex items-center justify-center w-12 h-12 rounded-full bg-white/10 text-white hover:bg-white/25 transition-colors";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={L("Galería de fotos", "Photo gallery")}
          className="fixed inset-0 z-[100] bg-blue-deep/95 flex items-center justify-center select-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="absolute top-5 left-6 text-white/80 text-sm tracking-wide tabular-nums">
            {index + 1} / {total}
          </div>

          <button
            ref={closeBtn}
            type="button"
            aria-label={L("Cerrar", "Close")}
            className={`${btn} top-3 right-3`}
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {total > 1 && (
            <>
              <button
                type="button"
                aria-label={L("Foto anterior", "Previous photo")}
                className={`${btn} left-3 top-1/2 -translate-y-1/2 hidden sm:flex`}
                onClick={(e) => {
                  e.stopPropagation();
                  go(-1);
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                type="button"
                aria-label={L("Foto siguiente", "Next photo")}
                className={`${btn} right-3 top-1/2 -translate-y-1/2 hidden sm:flex`}
                onClick={(e) => {
                  e.stopPropagation();
                  go(1);
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </>
          )}

          <AnimatePresence mode="wait" initial={false}>
            <motion.img
              key={images[index]}
              src={images[index]}
              alt={L(`Foto ${index + 1} de ${total}`, `Photo ${index + 1} of ${total}`)}
              className="max-w-[94vw] max-h-[82vh] sm:max-w-[86vw] object-contain shadow-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              draggable={false}
            />
          </AnimatePresence>

          {/* Precarga de las fotos vecinas para que el cambio sea inmediato */}
          {total > 1 && (
            <div className="hidden" aria-hidden="true">
              <img src={images[(index + 1) % total]} alt="" />
              <img src={images[(index - 1 + total) % total]} alt="" />
            </div>
          )}

          {total > 1 && (
            <div className="absolute bottom-5 left-0 right-0 text-center text-white/60 text-xs sm:hidden">
              {L("Desliza para ver más", "Swipe to see more")}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
