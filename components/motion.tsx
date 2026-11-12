"use client";

import { motion, useInView, useReducedMotion, animate, type Variants } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { groupDigits } from "@/data/pricing";

/** Apple-подобна крива: бърз старт, дълго и меко забавяне */
export const easeApple = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: easeApple },
  },
};

export const stagger = (step = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: step, delayChildren: delay } },
});

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "p" | "h2" | "span";
};

/** Плавно появяване отдолу нагоре при скрол */
export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      variants={fadeUp}
      transition={{ delay }}
    >
      {children}
    </Comp>
  );
}

/** Контейнер, който появява децата си едно след друго */
export function Stagger({
  children,
  className,
  step = 0.08,
  delay = 0,
  as = "div",
}: RevealProps & { step?: number }) {
  const Comp = motion[as === "li" ? "ul" : as];
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={stagger(step, delay)}
    >
      {children}
    </Comp>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={fadeUp}>
      {children}
    </motion.div>
  );
}

/** Брояч, който „отброява“ до стойността, когато влезе в екрана */
export function CountUp({
  to,
  prefix = "",
  suffix = "",
  duration = 2,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setValue(to);
      return;
    }
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, to, duration]);

  const formatted = groupDigits(value);
  return (
    <span ref={ref} className="tabular-nums">
      <span className="sr-only">
        {prefix}
        {groupDigits(to)}
        {suffix}
      </span>
      <span aria-hidden>
        {prefix}
        {formatted}
        {suffix}
      </span>
    </span>
  );
}
