"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

type InquiryCtx = {
  selected: string;
  setSelected: (value: string) => void;
  /** Текст, който се попълва в съобщението (напр. от калкулатора) */
  note: { text: string; at: number } | null;
  /** Избира услуга/пакет и скролва плавно до формата */
  choose: (value: string, note?: string) => void;
};

const Ctx = createContext<InquiryCtx | null>(null);

export function InquiryProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState("");
  const [note, setNote] = useState<{ text: string; at: number } | null>(null);

  const choose = useCallback((value: string, text?: string) => {
    setSelected(value);
    if (text) setNote({ text, at: Date.now() });
    const form = document.getElementById("kontakt");
    if (!form) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (window.__lenis) window.__lenis.scrollTo(form, { duration: 1.6 });
    else form.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    // Фокус върху първото поле след скрола, без втори скок
    window.setTimeout(() => {
      document.getElementById("f-company")?.focus({ preventScroll: true });
    }, reduce ? 0 : 1600);
  }, []);

  return <Ctx.Provider value={{ selected, setSelected, note, choose }}>{children}</Ctx.Provider>;
}

export function useInquiry() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useInquiry must be used inside InquiryProvider");
  return ctx;
}
