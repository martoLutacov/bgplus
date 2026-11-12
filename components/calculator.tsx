"use client";

import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { calculator as c, formatPrice, groupDigits } from "@/data/pricing";
import { useInquiry } from "./inquiry-context";
import { easeApple, Reveal } from "./motion";
import { buttonClass, Eyebrow, Icon, SectionTitle } from "./ui";

/** Число, което плавно „доплува“ до новата стойност */
function Rolling({ value, className }: { value: number; className?: string }) {
  const reduce = useReducedMotion();
  const mv = useMotionValue(value);
  const text = useTransform(mv, (v) => groupDigits(v));
  useEffect(() => {
    if (reduce) {
      mv.set(value);
      return;
    }
    const a = animate(mv, value, { duration: 0.7, ease: easeApple });
    return () => a.stop();
  }, [value, reduce, mv]);
  return <motion.span className={`tabular-nums ${className ?? ""}`}>{text}</motion.span>;
}

function Stepper({
  id,
  label,
  hint,
  rate,
  value,
  onChange,
}: {
  id: string;
  label: string;
  hint: string;
  rate: number;
  value: number;
  onChange: (v: number) => void;
}) {
  const clamp = (v: number) => Math.max(0, Math.min(c.maxPerWeek, Math.round(v || 0)));
  const pct = (value / c.maxPerWeek) * 100;
  return (
    <div className="rounded-3xl bg-mist/60 p-5 ring-1 ring-white/[0.05] sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <label htmlFor={id} className="text-[16px] font-semibold text-fg">
            {label}
          </label>
          <p className="mt-0.5 text-[13px] text-ink-soft">{hint}</p>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            aria-label={`Намали: ${label}`}
            onClick={() => onChange(clamp(value - 1))}
            className="grid size-9 place-items-center rounded-full bg-white/[0.08] text-fg transition hover:bg-white/15 active:scale-90"
          >
            <span className="block h-[1.5px] w-3 bg-current" />
          </button>
          <input
            id={id}
            type="number"
            inputMode="numeric"
            min={0}
            max={c.maxPerWeek}
            value={value}
            onChange={(e) => onChange(clamp(Number(e.target.value)))}
            className="w-14 rounded-xl bg-transparent text-center text-[22px] font-semibold tabular-nums text-fg outline-none [appearance:textfield] focus:bg-white/[0.06] [&::-webkit-inner-spin-button]:appearance-none"
          />
          <button
            type="button"
            aria-label={`Увеличи: ${label}`}
            onClick={() => onChange(clamp(value + 1))}
            className="grid size-9 place-items-center rounded-full bg-white/[0.08] text-fg transition hover:bg-white/15 active:scale-90"
          >
            <Icon name="plus" className="size-4" />
          </button>
        </div>
      </div>
      <input
        type="range"
        aria-label={label}
        min={0}
        max={c.maxPerWeek}
        value={value}
        onChange={(e) => onChange(clamp(Number(e.target.value)))}
        className="range-gold mt-5 w-full"
        style={{ ["--pct" as string]: `${pct}%` }}
      />
      <p className="mt-3 text-[13px] text-ink-soft">
        {formatPrice(rate)} за излъчване · <span className="text-fg">{formatPrice(value * rate)}</span> седмично
      </p>
    </div>
  );
}

export function Calculator() {
  const { choose } = useInquiry();
  const [preset, setPreset] = useState(c.presets[0].id);
  const [prime, setPrime] = useState(c.presets[0].primetime);
  const [off, setOff] = useState(c.presets[0].offPrime);

  const applyPreset = (id: string) => {
    const p = c.presets.find((x) => x.id === id)!;
    setPreset(id);
    setPrime(p.primetime);
    setOff(p.offPrime);
  };
  const edit = (fn: (v: number) => void) => (v: number) => {
    fn(v);
    setPreset("custom");
  };

  const monthlyCount = (prime + off) * c.weeksPerMonth;
  const monthlyPrice = (prime * c.primetimeRate + off * c.offPrimeRate) * c.weeksPerMonth;
  const primeShare = prime + off ? (prime / (prime + off)) * 100 : 0;
  const active = c.presets.find((p) => p.id === preset);

  const send = () =>
    choose(
      "service:custom",
      `Калкулатор: ${prime} излъчвания в праймтайм и ${off} извън праймтайм седмично ` +
        `(${monthlyCount} на месец), ориентировъчно ${formatPrice(monthlyPrice)} на месец без ДДС.`,
    );

  return (
    <section id="kalkulator" className="bg-black py-24 sm:py-32" aria-labelledby="kalkulator-title">
      <div className="container-page">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow>Рекламен калкулатор · 30-секунден клип</Eyebrow>
          <SectionTitle id="kalkulator-title" className="mt-4" text="Сглобете своята кампания." />
          <p className="mt-5 text-pretty text-[18px] leading-relaxed text-ink-soft">
            Изберете колко пъти седмично да се излъчва клипът — в праймтайм и извън него — и вижте месечната стойност веднага.
          </p>
        </Reveal>

        <Reveal className="mt-14 overflow-hidden rounded-[32px] bg-card ring-1 ring-white/[0.06]">
          <div className="grid lg:grid-cols-[1.25fr_1fr]">
            <div className="p-6 sm:p-10">
              {/* Сегментиран избор на вариант */}
              <div role="radiogroup" aria-label="Примерен вариант" className="relative grid grid-cols-3 rounded-full bg-black/60 p-1 ring-1 ring-white/[0.06]">
                {[...c.presets.map((p) => ({ id: p.id, label: p.label })), { id: "custom", label: "Собствен" }].map((o) => {
                  const on = preset === o.id;
                  return (
                    <button
                      key={o.id}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      onClick={() => (o.id === "custom" ? setPreset("custom") : applyPreset(o.id))}
                      className={`relative rounded-full px-2 py-2.5 text-[12.5px] font-medium leading-tight transition-colors sm:text-[14px] ${
                        on ? "text-ink" : "text-white/65 hover:text-white"
                      }`}
                    >
                      {on && (
                        <motion.span
                          layoutId="calc-preset"
                          className="bg-gold-gradient absolute inset-0 rounded-full"
                          transition={{ type: "spring", stiffness: 400, damping: 34 }}
                        />
                      )}
                      <span className="relative">{o.label}</span>
                    </button>
                  );
                })}
              </div>
              <p className="mt-4 min-h-[2.75rem] text-[14px] leading-relaxed text-ink-soft">
                {active ? active.description : "Задайте собствен брой излъчвания с плъзгачите или бутоните."}
              </p>

              <div className="mt-4 space-y-3">
                <Stepper
                  id="calc-prime"
                  label="В праймтайм"
                  hint="Излъчвания седмично"
                  rate={c.primetimeRate}
                  value={prime}
                  onChange={edit(setPrime)}
                />
                <Stepper
                  id="calc-off"
                  label="Извън праймтайм"
                  hint="Излъчвания седмично"
                  rate={c.offPrimeRate}
                  value={off}
                  onChange={edit(setOff)}
                />
              </div>

              <div className="mt-6 rounded-2xl bg-white/[0.03] p-4 text-[13px] leading-relaxed text-ink-soft ring-1 ring-white/[0.05]">
                <p className="font-semibold text-fg">Кога е праймтайм?</p>
                <ul className="mt-1.5 space-y-1">
                  {c.primetimeInfo.map((t) => (
                    <li key={t}>• {t}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Резултат */}
            <div className="bg-feature relative flex flex-col justify-between gap-8 p-6 sm:p-10" aria-live="polite">
              <div>
                <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-gold-300">Месечна стойност</p>
                <p className="mt-3 flex items-baseline gap-2">
                  <Rolling
                    value={monthlyPrice}
                    className="text-gold-gradient text-[clamp(3.2rem,7vw,5rem)] font-semibold leading-none tracking-display"
                  />
                  <span className="text-[clamp(1.6rem,3vw,2.4rem)] font-semibold text-gold-300">€</span>
                </p>
                <p className="mt-2 text-[14px] text-white/55">без ДДС, за 30-секунден клип</p>

                <dl className="mt-8 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-white/[0.05] p-4">
                    <dt className="text-[12px] text-white/50">Излъчвания месечно</dt>
                    <dd className="mt-1 text-[26px] font-semibold">
                      <Rolling value={monthlyCount} />
                    </dd>
                  </div>
                  <div className="rounded-2xl bg-white/[0.05] p-4">
                    <dt className="text-[12px] text-white/50">Средно за излъчване</dt>
                    <dd className="mt-1 text-[26px] font-semibold">
                      <Rolling value={monthlyCount ? monthlyPrice / monthlyCount : 0} /> €
                    </dd>
                  </div>
                </dl>

                <div className="mt-6">
                  <div className="flex justify-between text-[12px] text-white/50">
                    <span>Праймтайм</span>
                    <span>Извън праймтайм</span>
                  </div>
                  <div className="mt-2 flex h-2.5 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="bg-gold-gradient h-full"
                      animate={{ width: `${primeShare}%` }}
                      transition={{ duration: 0.6, ease: easeApple }}
                    />
                  </div>
                </div>
              </div>

              <div>
                <button type="button" onClick={send} className={buttonClass("primary", "w-full !py-4 !text-base")}>
                  Поискайте тази кампания
                  <Icon name="arrow" className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>
                <ul className="mt-5 space-y-1.5 text-[12.5px] leading-relaxed text-white/45">
                  {c.notes.map((n) => (
                    <li key={n}>* {n}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
