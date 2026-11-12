"use client";

import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { contact, media } from "@/data/site";
import { useInquiry } from "./inquiry-context";
import { buttonClass, Icon } from "./ui";
import { easeApple } from "./motion";

const lines = ["Вашият бизнес заслужава да бъде видян.", "Вашата история заслужава да бъде разказана."];

/**
 * Hero в стил Apple: секцията е „закована“ на екрана, докато скролвате.
 * Заглавието се отдалечава и разфокусира, а кадърът от студиото се свива
 * в заоблена рамка със златно сияние, преди страницата да продължи.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { choose } = useInquiry();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // Свиване на кадъра
  const t = useTransform(p, [0.12, 0.75], [0, 1], { clamp: true });
  const insetY = useTransform(t, [0, 1], [0, 14]);
  const insetX = useTransform(t, [0, 1], [0, 9]);
  const round = useTransform(t, [0, 1], [0, 44]);
  const clip = useMotionTemplate`inset(${insetY}% ${insetX}% ${insetY}% ${insetX}% round ${round}px)`;
  const imgScale = useTransform(p, [0, 0.75], [1.18, 1]);
  const veil = useTransform(p, [0, 0.35, 0.75], [0.6, 0.85, 0.35]);
  const glow = useTransform(t, [0.4, 1], [0, 1]);

  // Заглавието се отдалечава
  const contentOpacity = useTransform(p, [0, 0.3], [1, 0]);
  const contentY = useTransform(p, [0, 0.35], [0, -140]);
  const contentScale = useTransform(p, [0, 0.35], [1, 0.9]);
  const blurPx = useTransform(p, [0, 0.3], [0, 14]);
  const contentFilter = useMotionTemplate`blur(${blurPx}px)`;

  // Надпис върху свития кадър
  const capOpacity = useTransform(p, [0.55, 0.78], [0, 1]);
  const capY = useTransform(p, [0.55, 0.8], [40, 0]);
  const hintOpacity = useTransform(p, [0, 0.08], [1, 0]);

  let wordIndex = 0;

  const headline = (
    <h1
      id="hero-title"
      className="mx-auto max-w-[24ch] text-balance text-[clamp(2.25rem,5.4vw,4.6rem)] font-semibold leading-[1.02] tracking-display"
    >
      {lines.map((line, li) => (
        <span key={li} className={`block ${li === 1 ? "text-gold-gradient pb-[0.08em]" : ""}`}>
          {line.split(" ").map((word, wi, arr) => {
            const i = wordIndex++;
            return (
              <span key={wi} className="inline-block overflow-hidden pb-[0.1em] align-bottom">
                <motion.span
                  className="inline-block whitespace-pre"
                  initial={{ opacity: 0, y: "105%", rotate: 4, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: "0%", rotate: 0, filter: "blur(0px)" }}
                  transition={{ duration: 1.3, ease: easeApple, delay: 0.35 + i * 0.055 }}
                >
                  {word}
                  {wi < arr.length - 1 ? " " : ""}
                </motion.span>
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );

  return (
    <section
      ref={ref}
      id="top"
      className={`relative bg-black text-white ${reduce ? "" : "h-[220vh]"}`}
      aria-labelledby="hero-title"
    >
      <div className={`${reduce ? "relative" : "sticky top-0"} h-[100svh] overflow-hidden`}>
        {/* Златно сияние зад свития кадър */}
        <motion.div
          aria-hidden
          style={{ opacity: reduce ? 0 : glow }}
          className="absolute inset-0 bg-[radial-gradient(50%_45%_at_50%_55%,rgba(212,178,106,0.35),transparent_70%)]"
        />

        {/* Кадър: видео рийл на БГ+ или постер със студио */}
        <motion.div className="absolute inset-0 will-change-[clip-path]" style={reduce ? undefined : { clipPath: clip }}>
          <motion.div className="size-full will-change-transform" style={{ scale: reduce ? 1 : imgScale }}>
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
          <motion.div className="absolute inset-0 bg-black" style={{ opacity: reduce ? 0.6 : veil }} aria-hidden />
          <div
            className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_110%,rgba(168,129,63,0.35),transparent_60%),linear-gradient(to_bottom,rgba(0,0,0,0.5),transparent_35%,transparent_65%,rgba(0,0,0,0.8))]"
            aria-hidden
          />
          {!reduce && (
            <motion.div
              style={{ opacity: capOpacity, y: capY }}
              className="absolute inset-x-0 bottom-[18%] px-[14%] text-center"
              aria-hidden
            >
              <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-gold-300">ТВ БГ+</p>
              <p className="mt-3 text-balance text-[clamp(1.6rem,4.4vw,3.6rem)] font-semibold leading-tight tracking-display">
                Национален ефир. <span className="text-gold-gradient">Вашата история.</span>
              </p>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          className="container-page relative z-10 flex h-full flex-col items-center justify-center pb-16 pt-28 text-center"
          style={reduce ? undefined : { opacity: contentOpacity, y: contentY, scale: contentScale, filter: contentFilter }}
        >
          <motion.p
            initial={{ opacity: 0, y: 12, letterSpacing: "0.32em" }}
            animate={{ opacity: 1, y: 0, letterSpacing: "0.16em" }}
            transition={{ duration: 1.6, ease: easeApple, delay: 0.2 }}
            className="mb-7 text-[11.5px] font-semibold uppercase text-gold-300 sm:text-[13px]"
          >
            <span className="block sm:inline">Национална телевизия БГ+</span>
            <span className="mx-2 hidden text-white/30 sm:inline">|</span>
            <span className="mt-1 block sm:mt-0 sm:inline">Реклама и партньорства</span>
          </motion.p>

          {headline}

          <motion.p
            initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: easeApple, delay: 1.25 }}
            className="mx-auto mt-7 max-w-[38rem] text-pretty text-[clamp(1.05rem,1.7vw,1.3rem)] leading-relaxed text-white/75"
          >
            Превърнете разпознаваемостта в доверие, а доверието — в нови възможности за Вашия бизнес.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: easeApple, delay: 1.45 }}
            className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
          >
            <button
              type="button"
              onClick={() => choose("")}
              className={buttonClass("primary", "w-full !px-7 !py-3.5 !text-base sm:w-auto")}
            >
              Поискайте рекламна оферта
              <Icon name="arrow" className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
            <a
              href={contact.phoneHref}
              className={buttonClass("outline-light", "w-full !px-7 !py-3.5 !text-base backdrop-blur-md sm:w-auto")}
            >
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
          <motion.div style={{ opacity: hintOpacity }} className="flex h-10 w-6 justify-center rounded-full ring-1 ring-white/30">
            <motion.span
              className="mt-2 block h-2 w-[3px] rounded-full bg-white/70"
              animate={reduce ? undefined : { y: [0, 12, 0], opacity: [1, 0.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
