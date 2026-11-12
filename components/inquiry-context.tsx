"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

type InquiryCtx = {
  selected: string;
  setSelected: (value: string) => void;
  /** Избира услуга/пакет и скролва плавно до формата */
  choose: (value: string) => void;
};

const Ctx = createContext<InquiryCtx | null>(null);

export function InquiryProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState("");

  const choose = useCallback((value: string) => {
    setSelected(value);
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

  return <Ctx.Provider value={{ selected, setSelected, choose }}>{children}</Ctx.Provider>;
}

export function useInquiry() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useInquiry must be used inside InquiryProvider");
  return ctx;
}
