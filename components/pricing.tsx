"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  adPackages,
  adPackagesFootnote,
  formatPrice,
  formatRowPrice,
  priceList,
  priceListFootnote,
  sponsorships,
  vatNote,
} from "@/data/pricing";
import { useInquiry } from "./inquiry-context";
import { easeApple, fadeUp, Reveal, rise3d, Stagger } from "./motion";
import { buttonClass, Eyebrow, Icon, SectionTitle } from "./ui";

export function Packages() {
  const { choose } = useInquiry();
  return (
    <section id="paketi" className="bg-surface py-24 sm:py-32" aria-labelledby="paketi-title">
      <div className="container-page">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow>Рекламни пакети · 30-секунден клип</Eyebrow>
          <SectionTitle id="paketi-title" className="mt-4" text="Изберете присъствието, което отговаря на целите Ви." />
          <p className="mt-5 text-[17px] text-ink-soft">{vatNote}</p>
        </Reveal>

        <Stagger className="mt-16 grid items-stretch gap-5 lg:grid-cols-3" step={0.12}>
          {adPackages.map((p) => (
            <motion.article
              key={p.id}
              variants={rise3d}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 26 }}
              className={`relative flex flex-col rounded-[28px] p-8 sm:p-10 ${
                p.featured
                  ? "bg-feature text-white shadow-[0_40px_80px_-40px_rgba(0,0,0,0.6)] lg:-my-4 lg:py-14"
                  : "bg-card text-fg"
              }`}
            >
              {p.featured && (
                <>
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-[28px] p-px [background:linear-gradient(135deg,#e6cf86,transparent_40%,transparent_60%,#a8813f)] [mask:linear-gradient(#000_0_0)_content-box_exclude,linear-gradient(#000_0_0)]"
                  />
                  <span className="bg-gold-gradient absolute right-6 top-6 rounded-full px-3 py-1 text-[12px] font-semibold text-ink">
                    Най-избиран
                  </span>
                </>
              )}
              <p className={`text-[13px] font-semibold uppercase tracking-[0.12em] ${p.featured ? "text-gold-300" : "text-gold-400"}`}>
                Пакет
              </p>
              <h3 className="mt-2 text-[28px] font-semibold leading-tight tracking-headline">„{p.name}“</h3>
              <p className="mt-8 flex items-baseline gap-2">
                <span className={`text-[clamp(3rem,5vw,4rem)] font-semibold leading-none tracking-display ${p.featured ? "text-gold-gradient" : ""}`}>
                  {formatPrice(p.price)}
                </span>
                <span className={p.featured ? "text-white/60" : "text-ink-soft"}>/ {p.period}</span>
              </p>
              <p className={`mt-3 text-[17px] font-medium ${p.featured ? "text-white" : "text-fg"}`}>
                {p.airings} излъчвания месечно
              </p>
              <p className={`mt-5 flex-1 text-pretty text-[15.5px] leading-relaxed ${p.featured ? "text-white/65" : "text-ink-soft"}`}>
                {p.description}
              </p>
              <button
                type="button"
                onClick={() => choose(`package:${p.id}`)}
                className={buttonClass(p.featured ? "primary" : "dark", "mt-10 w-full !py-3.5")}
              >
                Изберете този пакет
              </button>
            </motion.article>
          ))}
        </Stagger>

        <Reveal className="mx-auto mt-12 max-w-2xl text-center text-[14px] leading-relaxed text-ink-soft">
          {adPackagesFootnote}
        </Reveal>
      </div>
    </section>
  );
}

function SponsorCard({ s, index }: { s: (typeof sponsorships)[number]; index: number }) {
  const { choose } = useInquiry();
  const [sel, setSel] = useState(s.tiers.length - 1);
  const tier = s.tiers[sel];
  const perMonth = Math.round(tier.total / tier.months);
  const dark = index === 1;

  return (
    <Reveal
      className={`relative overflow-hidden rounded-[32px] ${dark ? "bg-feature text-white" : "bg-card text-fg ring-1 ring-white/[0.06]"}`}
    >
      <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div>
          <p className={`text-[13px] font-semibold uppercase tracking-[0.12em] ${dark ? "text-gold-300" : "text-gold-400"}`}>
            {index === 0 ? "Специално спонсорско предложение" : "Дългосрочно партньорство"}
          </p>
          <h3 className="mt-3 text-[clamp(2.2rem,4vw,3.25rem)] font-semibold leading-[1.04] tracking-display">„{s.name}“</h3>
          <p className={`mt-3 text-[19px] font-medium leading-snug ${dark ? "text-white/85" : "text-fg"}`}>{s.tagline}</p>
          <p className={`mt-5 text-pretty text-[15.5px] leading-relaxed ${dark ? "text-white/60" : "text-ink-soft"}`}>{s.description}</p>

          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
            {s.schedule.map((row) => (
              <div key={row.label}>
                <dt className={`text-[12px] font-semibold uppercase tracking-[0.1em] ${dark ? "text-white/45" : "text-ink-soft"}`}>
                  {row.label}
                </dt>
                <dd className="mt-1 text-[15px] font-medium">{row.value}</dd>
              </div>
            ))}
          </dl>

          <ul className="mt-8 space-y-2.5">
            {s.includes.map((item) => (
              <li key={item} className={`flex gap-3 text-[15px] ${dark ? "text-white/80" : "text-fg"}`}>
                <Icon name="check" className={`mt-0.5 size-[18px] shrink-0 ${dark ? "text-gold-300" : "text-gold-400"}`} />
                {item}
              </li>
            ))}
          </ul>
          {s.audience && (
            <p className={`mt-6 text-[14px] leading-relaxed ${dark ? "text-white/50" : "text-ink-soft"}`}>{s.audience}</p>
          )}
        </div>

        <div className="flex flex-col">
          <div role="radiogroup" aria-label={`Спонсорски пакети за „${s.name}“`}>
            <div
              aria-hidden
              className={`grid grid-cols-[1.3fr_1fr_1fr] px-4 pb-2 text-[12px] font-semibold uppercase tracking-[0.1em] ${
                dark ? "text-white/45" : "text-ink-soft"
              }`}
            >
              <span>Период</span>
              <span className="text-right">Обща цена</span>
              <span className="text-right">На месец</span>
            </div>
            {s.tiers.map((t, i) => {
              const active = i === sel;
              return (
                <button
                  key={t.months}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setSel(i)}
                  className="relative mt-1.5 grid w-full grid-cols-[1.3fr_1fr_1fr] items-center rounded-2xl px-4 py-4 text-left text-[16px]"
                >
                  {active && (
                    <motion.span
                      layoutId={`tier-${s.id}`}
                      aria-hidden
                      className={`absolute inset-0 rounded-2xl ${
                        dark ? "bg-white/[0.08] ring-1 ring-gold-400/40" : "bg-mist ring-1 ring-gold-500/30"
                      }`}
                      transition={{ type: "spring", stiffness: 380, damping: 34 }}
                    />
                  )}
                  <span className="relative flex flex-wrap items-center gap-2 font-medium">
                    <span
                      className={`grid size-[18px] place-items-center rounded-full ring-1 transition-colors ${
                        active ? "bg-gold-gradient ring-transparent" : dark ? "ring-white/30" : "ring-white/20"
                      }`}
                    >
                      {active && <span className="size-1.5 rounded-full bg-ink" />}
                    </span>
                    {t.label}
                    {t.badge && (
                      <span
                        className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                          dark ? "bg-gold-400/15 text-gold-300" : "bg-gold-400/15 text-gold-300"
                        }`}
                      >
                        {t.badge}
                      </span>
                    )}
                  </span>
                  <span className="relative text-right font-semibold tabular-nums">{formatPrice(t.total)}</span>
                  <span className={`relative text-right tabular-nums ${dark ? "text-white/60" : "text-ink-soft"}`}>
                    {formatPrice(Math.round(t.total / t.months))}
                  </span>
                </button>
              );
            })}
          </div>

          <div className={`mt-6 rounded-3xl p-6 ${dark ? "bg-white/[0.06]" : "bg-mist"}`}>
            <p className={`text-[13px] ${dark ? "text-white/55" : "text-ink-soft"}`}>Избран период: {tier.label}</p>
            <div className="mt-1 flex items-baseline gap-2 overflow-hidden">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={tier.total}
                  initial={{ y: 24, opacity: 0, filter: "blur(6px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -24, opacity: 0, filter: "blur(6px)" }}
                  transition={{ duration: 0.5, ease: easeApple }}
                  className="text-gold-gradient text-[clamp(2.2rem,4vw,3rem)] font-semibold leading-tight tracking-display tabular-nums"
                >
                  {formatPrice(tier.total)}
                </motion.span>
              </AnimatePresence>
              <span className={dark ? "text-white/55" : "text-ink-soft"}>≈ {formatPrice(perMonth)} / мес.</span>
            </div>
            <p className={`mt-1 text-[13px] ${dark ? "text-white/45" : "text-ink-soft"}`}>Цени без ДДС</p>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => choose(`sponsor:${s.id}`)}
              className={buttonClass("primary", "flex-1 !py-3.5")}
            >
              {index === 0 ? "Искам да стана спонсор" : "Получете спонсорска оферта"}
            </button>
            {s.brochure && (
              <a
                href={s.brochure}
                download
                className={buttonClass(dark ? "outline-light" : "ghost", `!py-3.5 ${dark ? "" : "ring-1 ring-inset ring-white/10"}`)}
              >
                <Icon name="download" className="size-4" />
                Брошура
              </a>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function Sponsorships() {
  return (
    <section id="sponsorstvo" className="bg-black py-24 sm:py-32" aria-labelledby="sponsorstvo-title">
      <div className="container-page">
        <Reveal className="max-w-3xl">
          <Eyebrow>Спонсорство на предавания</Eyebrow>
          <SectionTitle id="sponsorstvo-title" className="mt-4" text="Вашият бранд като партньор на съдържание с ценност." />
          <p className="mt-5 max-w-2xl text-pretty text-[18px] leading-relaxed text-ink-soft">
            Присъствайте последователно във формат, близък до Вашите ценности, продукти и аудитория. Конкретният спонсорски
            инвентар и ексклузивните права се определят в индивидуалния договор.
          </p>
        </Reveal>
        <div className="mt-14 space-y-6">
          {sponsorships.map((s, i) => (
            <SponsorCard key={s.id} s={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function PriceList() {
  const { choose } = useInquiry();

  return (
    <section id="cenorazpis" className="bg-surface py-24 sm:py-32" aria-labelledby="cenorazpis-title">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <Reveal className="max-w-3xl">
            <Eyebrow>Ценоразпис</Eyebrow>
            <SectionTitle id="cenorazpis-title" className="mt-4" text="Всички цени. На едно място." />
            <p className="mt-5 max-w-2xl text-pretty text-[18px] leading-relaxed text-ink-soft">{priceListFootnote}</p>
          </Reveal>
          <Reveal delay={0.1} className="flex shrink-0 flex-wrap gap-3">
            <button type="button" onClick={() => choose("service:custom")} className={buttonClass("dark")}>
              Поискайте индивидуална оферта
              <Icon name="arrow" className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          </Reveal>
        </div>

        <Stagger className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-3" step={0.08}>
          {priceList.map((g) => (
            <motion.article
              key={g.id}
              variants={rise3d}
              className="flex flex-col rounded-[28px] bg-card p-7 ring-1 ring-white/[0.06] transition-colors duration-500 hover:ring-gold-400/30 sm:p-8"
            >
              <h3 className="text-[21px] font-semibold leading-tight tracking-headline">{g.title}</h3>
              {g.note && <p className="mt-2 text-[14px] leading-snug text-ink-soft">{g.note}</p>}
              <dl className="mt-6 flex-1 divide-y divide-white/[0.07]">
                {g.rows.map((r) => (
                  <div key={r.name} className="flex items-baseline justify-between gap-4 py-3.5">
                    <dt className="min-w-0">
                      <span className="block text-[15.5px] font-medium text-fg">{r.name}</span>
                      {r.detail && <span className="mt-0.5 block text-[13px] leading-snug text-ink-soft">{r.detail}</span>}
                    </dt>
                    <dd className="shrink-0 text-right">
                      <span className="text-gold-gradient whitespace-nowrap text-[17px] font-semibold tabular-nums">
                        {formatRowPrice(r.price)}
                      </span>
                      {r.unit && <span className="ml-1 text-[13px] text-ink-soft">{r.unit}</span>}
                    </dd>
                  </div>
                ))}
              </dl>
            </motion.article>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
