"use client";

import { MotionConfig } from "framer-motion";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useEffect, type ReactNode } from "react";
import { InquiryProvider } from "./inquiry-context";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/** Плавен скрол с инерция (като на apple.com). Изключен при намалено движение. */
function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      anchors: true,
      autoRaf: true,
    });
    window.__lenis = lenis;
    return () => {
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);
}

export function Providers({ children }: { children: ReactNode }) {
  useSmoothScroll();
  // reducedMotion="user": при prefers-reduced-motion Framer Motion пропуска
  // трансформациите и оставя само плавна смяна на прозрачност.
  return (
    <MotionConfig reducedMotion="user">
      <InquiryProvider>{children}</InquiryProvider>
    </MotionConfig>
  );
}
