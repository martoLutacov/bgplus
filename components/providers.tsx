"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { InquiryProvider } from "./inquiry-context";

export function Providers({ children }: { children: ReactNode }) {
  // reducedMotion="user": при prefers-reduced-motion Framer Motion пропуска
  // трансформациите и оставя само плавна смяна на прозрачност.
  return (
    <MotionConfig reducedMotion="user">
      <InquiryProvider>{children}</InquiryProvider>
    </MotionConfig>
  );
}
