"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { faq, partners, steps } from "@/data/site";
import { easeApple, fadeUp, Reveal, Stagger } from "./motion";
import { Icon } from "./ui";

export function Steps() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.55"] });
  const line = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0, 1]);

  return (
    <section className="bg-black py-24 sm:py-32" aria-labelledby="steps-title">
      <div className="container-page">

        <div ref={ref} className="relative mt-16">
          {/* Линия, която се „изчертава“ при скрол: вертикална на мобилно, хоризонтална на десктоп */}
          <div aria-hidden className="absolute bottom-6 left-[23px] top-6 w-px bg-white/[0.08] md:hidden">
            <motion.div className="bg-gold-gradient size-full origin-top" style={{ scaleY: line }} />
          </div>
          <div
            aria-hidden
            className="absolute left-[calc(100%/6)] right-[calc(100%/6)] top-6 hidden h-px bg-white/[0.08] md:block"
          >
            <motion.div className="bg-gold-gradient size-full origin-left" style={{ scaleX: line }} />
          </div>

          <Stagger as="div" className="relative grid gap-10 md:grid-cols-3 md:gap-8" step={0.15}>
            {steps.map((s, i) => (
              <motion.div key={s.title} variants={fadeUp} className="flex gap-6 md:flex-col md:items-center md:text-center">
                <span className="relative z-10 grid size-12 shrink-0 place-items-center rounded-full bg-gold-gradient text-[17px] font-semibold text-ink ring-8 ring-black">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-[22px] font-semibold leading-tight tracking-headline md:mt-4">{s.title}</h3>
                  <p className="mx-auto mt-3 max-w-xs text-pretty text-[15.5px] leading-relaxed text-ink-soft">{s.body}</p>
                </div>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="chzv" className="bg-surface py-24 sm:py-32" aria-labelledby="chzv-title">
      <div className="container-page max-w-4xl">

        <Stagger className="mt-14 space-y-3" step={0.06}>
          {faq.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.div key={item.q} variants={fadeUp} className="rounded-3xl bg-card">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    className="flex w-full items-center justify-between gap-6 px-6 py-6 text-left sm:px-8"
                  >
                    <span className="text-[18px] font-semibold tracking-[-0.01em]">{item.q}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.45, ease: easeApple }}
                      className="grid size-8 shrink-0 place-items-center rounded-full bg-mist"
                    >
                      <Icon name="chevron" className="size-4" />
                    </motion.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-${i}`}
                      role="region"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: easeApple }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl px-6 pb-7 text-[16px] leading-relaxed text-ink-soft sm:px-8">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </Stagger>

        {partners.length > 0 && (
          <div className="mt-20">
            <p className="text-center text-[13px] font-semibold uppercase tracking-[0.14em] text-ink-soft">
              Доверяват ни се
            </p>
            <div className="relative mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
              <div className="animate-marquee flex w-max gap-16 [animation:marquee_40s_linear_infinite]">
                {[...partners, ...partners].map((p, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={i}
                    src={p.logo}
                    alt={i < partners.length ? p.name : ""}
                    aria-hidden={i >= partners.length}
                    className="h-10 w-auto opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0"
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
