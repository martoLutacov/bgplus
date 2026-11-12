"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { media } from "@/data/site";
import { Reveal } from "./motion";
import { buttonClass, Icon } from "./ui";

export function Presentation() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0.68, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], reduce ? [28, 28] : [80, 28]);
  const glow = useTransform(scrollYProgress, [0.4, 1], [0, 1]);

  return (
    <section className="overflow-hidden bg-black py-24 text-white sm:py-32" aria-labelledby="prezentaciya-title">
      <div className="container-page">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-gold-300">Медийна презентация</p>
          <h2
            id="prezentaciya-title"
            className="mt-4 text-balance text-[clamp(2rem,4.6vw,3.5rem)] font-semibold leading-[1.06] tracking-headline"
          >
            Студиа, водещи и предавания, които изграждат доверие.
          </h2>
        </Reveal>

        <div ref={ref} className="relative mx-auto mt-14 max-w-5xl">
          <motion.div
            aria-hidden
            style={{ opacity: glow }}
            className="absolute -inset-10 -z-0 rounded-[64px] bg-[radial-gradient(closest-side,rgba(212,178,106,0.35),transparent)] blur-2xl"
          />
          <motion.div
            style={{ scale, borderRadius: radius }}
            className="relative aspect-video overflow-hidden bg-ink ring-1 ring-white/10 will-change-transform"
          >
            {media.presentationVideo ? (
              <video
                className="size-full object-cover"
                src={media.presentationVideo}
                poster={media.presentationPoster}
                controls
                preload="metadata"
                playsInline
              >
                <track kind="captions" />
              </video>
            ) : (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={media.presentationPoster}
                  alt="Продукция и монтаж в ТВ БГ+"
                  loading="lazy"
                  className="size-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <p className="absolute bottom-6 left-6 right-6 text-left text-[15px] text-white/80 sm:bottom-8 sm:left-8">
                  Пълна видеопрезентация на БГ+ получавате заедно с персоналната оферта.
                </p>
              </>
            )}
          </motion.div>
        </div>

        <Reveal className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row" delay={0.1}>
          <a href="#cenorazpis" className={buttonClass("light", "!px-7 !py-3.5")}>
            Вижте ценоразписа
            <Icon name="arrow" className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
          <a href="#kontakt" className={buttonClass("outline-light", "!px-7 !py-3.5")}>
            Поискайте медийна презентация
          </a>
        </Reveal>
      </div>
    </section>
  );
}
