"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { contact, media } from "@/data/site";
import { useInquiry } from "./inquiry-context";
import { buttonClass, Icon } from "./ui";
import { easeApple } from "./motion";

const lines = ["Вашият бизнес заслужава да бъде видян.", "Вашата история заслужава да бъде разказана."];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { choose } = useInquiry();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const bgScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.08, 1.28]);
  const bgY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "12%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, reduce ? 1 : 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.6], reduce ? [0, 0] : [0, -90]);
  const contentScale = useTransform(scrollYProgress, [0, 0.6], reduce ? [1, 1] : [1, 0.94]);
  const veil = useTransform(scrollYProgress, [0, 0.8], [0.55, reduce ? 0.55 : 0.9]);

  let wordIndex = 0;

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-black text-white"
      aria-labelledby="hero-title"
    >
      {/* Фон: видео рийл на БГ+ или постер със студио */}
      <motion.div className="absolute inset-0 will-change-transform" style={{ scale: bgScale, y: bgY }}>
        {media.heroVideo && !reduce ? (
          <video
            className="size-full object-cover"
            src={media.heroVideo}
            poster={media.heroPoster}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={media.heroPoster} alt="" aria-hidden className="size-full object-cover" />
        )}
      </motion.div>
      <motion.div className="absolute inset-0 bg-black" style={{ opacity: veil }} aria-hidden />
      <div
        className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_110%,rgba(168,129,63,0.35),transparent_60%),linear-gradient(to_bottom,rgba(0,0,0,0.55),transparent_35%,transparent_65%,rgba(0,0,0,0.85))]"
        aria-hidden
      />

      <motion.div
        className="container-page relative z-10 pb-20 pt-32 text-center"
        style={{ opacity: contentOpacity, y: contentY, scale: contentScale }}
      >
        <motion.p
          initial={{ opacity: 0, y: 12, letterSpacing: "0.3em" }}
          animate={{ opacity: 1, y: 0, letterSpacing: "0.16em" }}
          transition={{ duration: 1.4, ease: easeApple, delay: 0.3 }}
          className="mb-7 text-[11.5px] font-semibold uppercase text-gold-300 sm:text-[13px]"
        >
          <span className="block sm:inline">Национална телевизия БГ+</span>
          <span className="mx-2 hidden text-white/30 sm:inline">|</span>
          <span className="mt-1 block sm:mt-0 sm:inline">Реклама и партньорства</span>
        </motion.p>

        <h1
          id="hero-title"
          className="mx-auto max-w-[24ch] text-balance text-[clamp(2.25rem,5.4vw,4.6rem)] font-semibold leading-[1.02] tracking-display"
        >
          {lines.map((line, li) => (
            <span key={li} className={`block ${li === 1 ? "text-gold-gradient pb-[0.08em]" : ""}`}>
              {line.split(" ").map((word, wi) => {
                const i = wordIndex++;
                return (
                  <motion.span
                    key={wi}
                    className="inline-block whitespace-pre"
                    initial={{ opacity: 0, y: "0.45em", filter: "blur(12px)" }}
                    animate={{ opacity: 1, y: "0em", filter: "blur(0px)" }}
                    transition={{ duration: 1.1, ease: easeApple, delay: 0.45 + i * 0.06 }}
                  >
                    {word}
                    {wi < line.split(" ").length - 1 ? " " : ""}
                  </motion.span>
                );
              })}
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: easeApple, delay: 1.3 }}
          className="mx-auto mt-7 max-w-[38rem] text-pretty text-[clamp(1.05rem,1.7vw,1.3rem)] leading-relaxed text-white/75"
        >
          Превърнете разпознаваемостта в доверие, а доверието — в нови възможности за Вашия бизнес.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: easeApple, delay: 1.5 }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <button
            type="button"
            onClick={() => choose("")}
            className={buttonClass("primary", "w-full !px-7 !py-3.5 !text-base sm:w-auto")}
          >
            Поискайте рекламна оферта
            <Icon name="arrow" className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
          <a href={contact.phoneHref} className={buttonClass("outline-light", "w-full !px-7 !py-3.5 !text-base sm:w-auto")}>
            <Icon name="phone" className="size-4" />
            Обадете се сега
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        aria-hidden
      >
        <div className="flex h-10 w-6 justify-center rounded-full ring-1 ring-white/30">
          <motion.span
            className="mt-2 block h-2 w-[3px] rounded-full bg-white/70"
            animate={reduce ? undefined : { y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
