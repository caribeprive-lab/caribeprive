"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/components/LanguageProvider";

export default function Chat({ propertyName = null }) {
  const { lang, t } = useLang();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const bodyRef = useRef(null);

  // greeting follows language
  useEffect(() => {
    setMessages((m) =>
      m.length === 0 ? [{ role: "assistant", content: t("chat.greeting") }] : m
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("ns-open-chat", handler);
    return () => window.removeEventListener("ns-open-chat", handler);
  }, []);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, loading]);

  const quickReplies = [
    { es: "Propiedades en Cancún",        en: "Properties in Cancún" },
    { es: "Propiedades en Puerto Morelos", en: "Properties in Puerto Morelos" },
    { es: "Propiedades en Riviera Maya",   en: "Properties in Riviera Maya" },
    { es: "Quiero agendar una cita / Zoom", en: "I'd like to schedule a Zoom call" },
  ];

  const sendText = async (text) => {
    if (!text || loading) return;
    const next = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lang,
          messages: next.filter((m) => m.role === "user" || m.role === "assistant"),
        }),
      });
      const data = await res.json();
      setMessages([
        ...next,
        { role: "assistant", content: data.reply || t("chat.error") },
      ]);
    } catch {
      setMessages([...next, { role: "assistant", content: t("chat.error") }]);
    } finally {
      setLoading(false);
    }
  };

  const send = () => sendText(input.trim());

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {open && (
        <div className="absolute bottom-16 right-0 w-[340px] max-w-[calc(100vw-3rem)] bg-paper border border-line rounded-2xl shadow-[0_24px_60px_rgba(12,22,38,0.25)] overflow-hidden">
          <div className="bg-blue text-white px-5 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <img src="/anachat.png" alt="Ana" className="w-10 h-10 rounded-full object-cover" />
              </div>
              <div>
                <div className="font-semibold text-[15px]">Ana Paula Quiroga</div>
                <div className="text-[11px] text-green-300 tracking-wide flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full" /> Online
                </div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white text-xl leading-none">
              ×
            </button>
          </div>

          <div ref={bodyRef} className="chat-scroll p-4 flex flex-col gap-3 max-h-[360px] overflow-auto">
            {messages.map((m, i) => (
              m.role === "user" ? (
                <div key={i} className="text-[13.5px] px-3.5 py-2.5 rounded-xl rounded-br-sm max-w-[85%] whitespace-pre-wrap bg-blue text-white self-end">
                  {m.content}
                </div>
              ) : (
                <div key={i} className="flex items-end gap-2 self-start max-w-[85%]">
                  <img src="/anachat.png" alt="Ana" className="w-6 h-6 rounded-full object-cover flex-shrink-0 mb-0.5" />
                  <div className="text-[13.5px] px-3.5 py-2.5 rounded-xl rounded-bl-sm whitespace-pre-wrap bg-bone text-ink">
                    {m.content}
                  </div>
                </div>
              )
            ))}
            {/* quick replies: solo cuando el chat está en el estado inicial (solo greeting) */}
            {messages.length === 1 && !loading && (
              <div className="flex flex-col gap-2 pl-8 mt-1">
                {quickReplies.map((qr) => (
                  <button
                    key={qr.es}
                    onClick={() => sendText(lang === "es" ? qr.es : qr.en)}
                    className="text-left text-[12px] px-3.5 py-2 rounded-full border border-blue/30 text-blue hover:bg-blue hover:text-white transition-colors bg-white"
                  >
                    {lang === "es" ? qr.es : qr.en}
                  </button>
                ))}
              </div>
            )}

            {loading && (
              <div className="flex items-end gap-2 self-start">
                <img src="/anachat.png" alt="Ana" className="w-6 h-6 rounded-full object-cover flex-shrink-0 mb-0.5" />
                <div className="bg-bone text-ink rounded-xl rounded-bl-sm px-3.5 py-2.5 text-[13.5px]">
                  <span className="inline-flex gap-1">
                    <Dot /> <Dot d="150ms" /> <Dot d="300ms" />
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-line p-3 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder={t("chat.placeholder")}
              className="flex-1 border border-line rounded-full px-3.5 py-2 text-[13px] outline-none bg-white focus:border-blue"
            />
            <button
              onClick={send}
              disabled={loading}
              className="bg-blue text-white rounded-full w-9 h-9 flex items-center justify-center disabled:opacity-50"
            >
              ↑
            </button>
          </div>
        </div>
      )}

      {/* burbuja flotante con foto + alerta */}
      <div className="flex flex-col items-end gap-2">
        {!open && (
          <div className="relative mr-1">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl rounded-br-none shadow-[0_4px_16px_rgba(12,22,38,0.12)] px-3.5 py-2 text-ink/80 text-[12px] w-[160px] leading-snug">
              {propertyName
                ? (lang === "es"
                    ? `¿Te interesa ${propertyName}? 🏠`
                    : `Interested in ${propertyName}? 🏠`)
                : (lang === "es"
                    ? "¿Buscas una propiedad en el Caribe? 🌴"
                    : "Looking for a property in the Caribbean? 🌴")
              }
            </div>
            {/* cola apuntando abajo-derecha hacia el avatar */}
            <div
              className="absolute -bottom-2.5 right-0 w-0 h-0"
              style={{
                borderLeft: "10px solid transparent",
                borderTop: "10px solid rgba(255,255,255,0.9)",
              }}
            />
          </div>
        )}
        <button
          onClick={() => setOpen((o) => !o)}
          className="relative w-14 h-14 rounded-full shadow-[0_12px_30px_rgba(10,53,113,0.4)] overflow-visible"
        >
          <img src="/anachat.png" alt="Ana" className="w-14 h-14 rounded-full object-cover" />
          <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-green-400 border-2 border-white rounded-full" />
        </button>
      </div>
    </div>
  );
}

function Dot({ d = "0ms" }) {
  return (
    <span
      className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce inline-block"
      style={{ animationDelay: d }}
    />
  );
}
