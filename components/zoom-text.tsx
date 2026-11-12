"use client";

import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * Заглавие на секция в стил Apple: огромен надпис, който се приближава,
 * докато скролвате, и камерата сякаш минава през него. Използва се
 * като въведение пред всяка секция, така че анимациите вървят една след друга.
 */
export function ZoomText({
  id,
  text,
  sub,
  tone = "gold",
}: {
  /** id на заглавието — секцията след него го ползва в aria-labelledby */
  id: string;
  text: string;
  sub?: string;
  /** gold = златен градиент, white = бял текст */
  tone?: "gold" | "white";
}) {
  const textCls = tone === "gold" ? "text-gold-gradient" : "text-white";
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // Кубично ускорение: надписът остава четим и после рязко „прелита“ покрай камерата
  const scale = useTransform(p, [0.1, 0.92], [1, 30], { clamp: true, ease: (t) => t * t * t });
  const opacity = useTransform(p, [0, 0.05, 0.72, 0.9], [0.4, 1, 1, 0]);
  const blurPx = useTransform(p, [0, 0.05], [10, 0]);
  const filter = useMotionTemplate`blur(${blurPx}px)`;
  const subOpacity = useTransform(p, [0.03, 0.12, 0.32, 0.45], [0, 1, 1, 0]);
  const subY = useTransform(p, [0.03, 0.45], [24, -24]);
  const glow = useTransform(p, [0.4, 0.85, 1], [0, 1, 0]);

  // Размерът е обвързан с ширината на екрана и текстът се пренася на редове,
  // така че никога не излиза извън екрана преди самото приближаване.
  const size = "text-[clamp(2.4rem,9vw,8.5rem)] max-w-[12ch]";

  if (reduce) {
    return (
      <div className="bg-black px-5 py-28 text-center">
        <h2 id={id} className={`${textCls} ${size} mx-auto text-balance font-semibold leading-[1.02] tracking-display`}>
          {text}
        </h2>
        {sub && <p className="mx-auto mt-6 max-w-xl text-[18px] text-ink-soft">{sub}</p>}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative h-[170vh] bg-black">
      <div className="sticky top-0 flex h-[100svh] flex-col items-center justify-center overflow-hidden px-5">
        <motion.div
          aria-hidden
          style={{ opacity: glow }}
          className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_50%,rgba(212,178,106,0.28),transparent_70%)]"
        />
        <motion.h2
          id={id}
          style={{ scale, opacity, filter }}
          className={`${textCls} ${size} relative text-balance text-center font-semibold leading-[1.02] tracking-display will-change-transform`}
        >
          {text}
        </motion.h2>
        {sub && (
          <motion.p
            style={{ opacity: subOpacity, y: subY }}
            className="absolute bottom-[18%] max-w-xl px-6 text-center text-[clamp(1.05rem,1.8vw,1.35rem)] text-white/70"
          >
            {sub}
          </motion.p>
        )}
      </div>
    </div>
  );
}
