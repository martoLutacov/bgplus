"use client";

import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * Apple-подобен „полет през текста“: огромен надпис се приближава,
 * докато скролвате, и камерата сякаш минава през него.
 */
export function ZoomText({ text, sub }: { text: string; sub: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const scale = useTransform(p, [0.08, 0.9], [1, 26], { clamp: true });
  const opacity = useTransform(p, [0, 0.06, 0.7, 0.88], [0.5, 1, 1, 0]);
  const blurPx = useTransform(p, [0, 0.06], [8, 0]);
  const filter = useMotionTemplate`blur(${blurPx}px)`;
  const subOpacity = useTransform(p, [0.05, 0.15, 0.3, 0.4], [0, 1, 1, 0]);
  const subY = useTransform(p, [0.05, 0.4], [30, -30]);
  const glow = useTransform(p, [0.4, 0.85, 1], [0, 1, 0]);

  if (reduce) {
    return (
      <section className="bg-black py-32 text-center" aria-label={text}>
        <p className="text-gold-gradient text-[clamp(3rem,11vw,9rem)] font-semibold leading-none tracking-display">{text}</p>
        <p className="mt-6 text-[18px] text-ink-soft">{sub}</p>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[220vh] bg-black" aria-label={`${text} ${sub}`}>
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden">
        <motion.div
          aria-hidden
          style={{ opacity: glow }}
          className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_50%,rgba(212,178,106,0.28),transparent_70%)]"
        />
        <motion.p
          aria-hidden
          style={{ scale, opacity, filter }}
          className="text-gold-gradient relative whitespace-nowrap text-[clamp(3rem,11vw,9.5rem)] font-semibold leading-none tracking-display will-change-transform"
        >
          {text}
        </motion.p>
        <motion.p
          aria-hidden
          style={{ opacity: subOpacity, y: subY }}
          className="absolute bottom-[22%] px-6 text-center text-[clamp(1.05rem,1.8vw,1.35rem)] text-white/70"
        >
          {sub}
        </motion.p>
      </div>
    </section>
  );
}
