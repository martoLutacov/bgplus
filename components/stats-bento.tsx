"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef, type MouseEvent } from "react";
import { pillars, statement, stats } from "@/data/site";
import { CountUp, Reveal, rise3d, Stagger, StaggerItem } from "./motion";
import { Eyebrow, Icon, SectionTitle } from "./ui";

export function Stats() {
  return (
    <section className="bg-black py-24 sm:py-32" aria-labelledby="stats-title">
      <div className="container-page">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow>Обхват</Eyebrow>
          <SectionTitle id="stats-title" className="mt-4" text="Национално присъствие. Реални възможности за Вашия бранд." />
        </Reveal>

        <Stagger className="mt-16 grid gap-4 sm:grid-cols-3" step={0.12}>
          {stats.map((s) => (
            <StaggerItem key={s.label} className="rounded-[28px] bg-mist px-8 py-10 text-center">
              <p className="text-gold-gradient text-[clamp(2.6rem,5vw,4.25rem)] font-semibold leading-none tracking-display">
                {"text" in s ? s.text : <CountUp to={s.value} prefix={s.prefix} suffix={s.suffix} />}
              </p>
              <p className="mx-auto mt-4 max-w-[16rem] text-[15px] leading-snug text-ink-soft">{s.label}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/** Карта с мек „прожектор“, който следва курсора */
function SpotlightCard({
  children,
  className = "",
  dark = false,
  decor = false,
}: {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
  decor?: boolean;
}) {
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <motion.div
      variants={rise3d}
      onMouseMove={onMove}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
      className={`group relative overflow-hidden rounded-[28px] p-8 sm:p-10 ${
        dark ? "bg-feature text-white" : "bg-card text-fg"
      } shadow-[0_1px_0_rgba(0,0,0,0.03)] transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.25)] ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), ${
            dark ? "rgba(212,178,106,0.18)" : "rgba(212,178,106,0.14)"
          }, transparent 60%)`,
        }}
      />
      {decor && (
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 hidden size-[26rem] lg:block transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 group-hover:-rotate-6">
          <div className="bg-gold-gradient size-full rounded-full opacity-90 shadow-[inset_-30px_-40px_80px_rgba(0,0,0,0.25)]" />
        </div>
      )}
      <div className="relative h-full">{children}</div>
    </motion.div>
  );
}

const spans = [
  "lg:col-span-4 lg:row-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-6",
];

export function Bento() {
  return (
    <section id="predimstva" className="bg-surface py-24 sm:py-32" aria-labelledby="predimstva-title">
      <div className="container-page">
        <Reveal className="max-w-3xl">
          <Eyebrow>Защо БГ+</Eyebrow>
          <SectionTitle id="predimstva-title" className="mt-4" text="Повече от рекламно време. Медиен партньор за Вашия растеж." />
        </Reveal>

        <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-6" step={0.09}>
          {pillars.map((p, i) => {
            const big = i === 0;
            const wide = i === 5;
            return (
              <SpotlightCard key={p.title} dark={big} decor={big} className={`${spans[i]} ${big ? "sm:col-span-2" : ""} ${wide ? "sm:col-span-2" : ""}`}>
                <div className={big ? "flex h-full min-h-[22rem] flex-col justify-between" : wide ? "sm:flex sm:items-center sm:gap-10" : ""}>
                  <div
                    className={`grid size-12 shrink-0 place-items-center rounded-2xl ${
                      big ? "bg-gold-gradient text-ink" : "bg-mist text-gold-400"
                    }`}
                  >
                    <Icon name={p.icon} className="size-6" />
                  </div>
                  <div className={big ? "" : wide ? "mt-6 sm:mt-0" : "mt-8"}>
                    <p className={`text-[13px] font-semibold tabular-nums ${big ? "text-gold-300" : "text-gold-400"}`}>
                      0{i + 1}
                    </p>
                    <h3
                      className={`mt-2 text-balance font-semibold tracking-headline ${
                        big ? "text-[clamp(1.9rem,3.4vw,2.9rem)] leading-[1.08]" : "text-[22px] leading-tight"
                      }`}
                    >
                      {p.title}
                    </h3>
                    <p
                      className={`mt-3 text-pretty leading-relaxed ${
                        big ? "max-w-xl text-[17px] text-white/70" : "text-[15.5px] text-ink-soft"
                      }`}
                    >
                      {p.body}
                    </p>
                  </div>
                </div>
              </SpotlightCard>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

function Word({ word, range, progress }: { word: string; range: [number, number]; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="inline">
      {word}{" "}
    </motion.span>
  );
}

/** Голямо изявление, чиито думи „светват“ една по една при скрол */
export function Statement() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = statement.split(" ");

  return (
    <section className="bg-black py-28 sm:py-40" aria-label="Една инвестиция. Повече възможности.">
      <div className="container-page">
        <Reveal>
          <Eyebrow>Една инвестиция. Повече възможности.</Eyebrow>
        </Reveal>
        <div ref={ref} className="mt-8 max-w-5xl">
          <p className="text-[clamp(1.75rem,4vw,3.25rem)] font-semibold leading-[1.15] tracking-headline text-fg">
            {reduce
              ? statement
              : words.map((w, i) => (
                  <Word
                    key={i}
                    word={w}
                    progress={scrollYProgress}
                    range={[i / words.length, (i + 1) / words.length]}
                  />
                ))}
          </p>
          <Reveal delay={0.1}>
            <p className="mt-10 max-w-2xl text-pretty text-[18px] leading-relaxed text-ink-soft">
              Доброто медийно планиране започва с правилния въпрос: не колко пъти ще бъде излъчена рекламата, а какво искате
              да постигнете с нея.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
