"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { formats } from "@/data/site";
import { Reveal } from "./motion";
import { Eyebrow, SectionTitle } from "./ui";

function useMedia(query: string) {
  const [match, setMatch] = useState(false);
  useEffect(() => {
    const m = window.matchMedia(query);
    const on = () => setMatch(m.matches);
    on();
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, [query]);
  return match;
}

function FormatCard({ f, i }: { f: (typeof formats)[number]; i: number }) {
  return (
    <article className="group relative flex h-full w-full flex-col overflow-hidden rounded-[28px] bg-ink text-white">
      <div className={`relative aspect-[16/11] max-h-[36vh] w-full overflow-hidden bg-gradient-to-br ${f.tone}`}>
        {f.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={f.image}
            alt={f.title}
            loading="lazy"
            className="size-full object-cover opacity-80 transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
          />
        ) : (
          <div
            aria-hidden
            className="absolute inset-0 transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
          >
            <div className="absolute -right-16 -top-16 size-72 rounded-full bg-gold-gradient opacity-30 blur-2xl" />
            <div className="absolute bottom-6 right-8 text-[9rem] font-semibold leading-none tracking-display text-white/[0.07]">
              0{i + 1}
            </div>
            <svg viewBox="0 0 400 300" className="absolute inset-0 size-full opacity-[0.12]">
              {Array.from({ length: 9 }).map((_, k) => (
                <circle key={k} cx="330" cy="40" r={40 + k * 34} fill="none" stroke="white" strokeWidth="1" />
              ))}
            </svg>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" aria-hidden />
      </div>
      <div className="relative flex flex-1 flex-col p-7 sm:p-8">
        <p className="text-[13px] font-semibold tabular-nums text-gold-300">0{i + 1}</p>
        <h3 className="mt-2 text-balance text-[24px] font-semibold leading-tight tracking-headline">{f.title}</h3>
        <p className="mt-3 text-pretty text-[15.5px] leading-relaxed text-white/65">{f.body}</p>
      </div>
    </article>
  );
}

function Header() {
  return (
    <Reveal className="max-w-3xl">
      <Eyebrow>Рекламни формати</Eyebrow>
      <SectionTitle className="mt-4">
        <span id="formati-title">Изберете начина, по който да разкажете своята история.</span>
      </SectionTitle>
    </Reveal>
  );
}

export function Formats() {
  const reduce = useReducedMotion();
  const wide = useMedia("(min-width: 900px)");
  const pinned = wide && !reduce;

  const ref = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    if (!pinned) return;
    const measure = () => {
      if (!track.current) return;
      setDistance(Math.max(0, track.current.offsetWidth - window.innerWidth + 80));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [pinned]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -distance]);
  const bar = useTransform(scrollYProgress, [0.05, 0.95], [0, 1]);

  return (
    <section
      id="formati"
      ref={ref}
      className={`relative bg-white ${pinned ? "" : "py-24 sm:py-32"}`}
      style={pinned ? { height: `calc(100vh + ${distance}px)` } : undefined}
      aria-labelledby="formati-title"
    >
      {pinned ? (
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-16">
          <div className="container-page">
            <Header />
          </div>
          <motion.div
            ref={track}
            style={{ x }}
            className="mt-12 flex w-max gap-5 pl-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))] will-change-transform"
          >
            {formats.map((f, i) => (
              <div key={f.title} className="w-[min(30rem,40vw)] shrink-0">
                <FormatCard f={f} i={i} />
              </div>
            ))}
          </motion.div>
          <div className="container-page mt-10">
            <div className="h-[3px] w-40 overflow-hidden rounded-full bg-black/[0.08]" aria-hidden>
              <motion.div className="h-full origin-left bg-gold-gradient" style={{ scaleX: bar }} />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="container-page">
            <Header />
          </div>
          <div className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-6 [scrollbar-width:none] md:px-10">
            {formats.map((f, i) => (
              <div key={f.title} className="w-[82vw] max-w-[26rem] shrink-0 snap-center">
                <FormatCard f={f} i={i} />
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
