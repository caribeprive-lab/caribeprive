"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

const words = ["Hola", "Hello", "Bonjour", "logo"];
const delays = [380, 380, 380, 620]; // ms que cada palabra permanece visible

export default function Preloader({ onComplete }) {
  const [index, setIndex] = useState(0);
  const [dim, setDim] = useState({ w: 0, h: 0 });
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    setDim({ w: window.innerWidth, h: window.innerHeight });
  }, []);

  useEffect(() => {
    const isLast = index === words.length - 1;
    const timer = setTimeout(
      () => {
        if (isLast) {
          setExiting(true);
          setTimeout(onComplete, 500);
        } else {
          setIndex((i) => i + 1);
        }
      },
      delays[index],
    );
    return () => clearTimeout(timer);
  }, [index, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={exiting ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-blue-deep"
    >
      {/* Fondo animado (mismo de la sección 02 · Los compromisos) */}
      <BackgroundGradientAnimation interactive={false} containerClassName="absolute inset-0 z-0" />

      {/* Viñeta para neutralizar el halo central de los blobs */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(12,22,38,.7) 0%, rgba(12,22,38,.25) 35%, transparent 65%)",
        }}
      />

      {/* Estrellas — puntos decorativos estáticos */}
      {dim.w > 0 && (
        <svg className="absolute inset-0 z-[1] w-full h-full pointer-events-none" aria-hidden>
          {Array.from({ length: 40 }, (_, i) => {
            const x = ((i * 137 + 31) % 97) / 97;
            const y = ((i * 79 + 13) % 89) / 89;
            const r = i % 3 === 0 ? 1.5 : 1;
            return (
              <circle
                key={i}
                cx={`${x * 100}%`}
                cy={`${y * 100}%`}
                r={r}
                fill={i % 7 === 0 ? "#3FB0A0" : "white"}
                opacity={0.15 + (i % 5) * 0.06}
              />
            );
          })}
        </svg>
      )}

      {/* Palabra / Logo */}
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex items-center justify-center select-none"
      >
        {words[index] === "logo" ? (
          <img
            src="/logowhite.svg"
            alt="Caribe Privé"
            className="w-[50vw] md:w-[clamp(225px,30vw,300px)] h-auto"
          />
        ) : (
          <p
            className="font-display font-bold tracking-[0.08em] text-center text-paper"
            style={{ fontSize: "clamp(2.8rem, 6vw, 3.5rem)" }}
          >
            {words[index]}
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}
