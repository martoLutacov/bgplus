"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { budgetRanges, inquiryOptions } from "@/data/pricing";
import { contact } from "@/data/site";
import { emptyInquiry, validateInquiry, type Inquiry, type InquiryErrors } from "@/lib/inquiry";
import { useInquiry } from "./inquiry-context";
import { easeApple, Reveal } from "./motion";
import { buttonClass, Icon } from "./ui";

type Status = "idle" | "loading" | "success" | "mailto" | "error";

const inputCls =
  "peer w-full rounded-2xl border bg-white px-4 pb-2.5 pt-6 text-[16px] text-ink outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-transparent focus:border-gold-500 focus:shadow-[0_0_0_4px_rgba(212,178,106,0.2)]";

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="relative">
        {children}
        <label
          htmlFor={id}
          className="pointer-events-none absolute left-4 top-2 text-[12px] font-medium text-ink-soft transition-all"
        >
          {label}
        </label>
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-err`}
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            className="px-1 pt-1.5 text-[13px] text-[#c2410c]"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function mailtoHref(d: Inquiry, serviceLabel: string) {
  const body = [
    `Фирма: ${d.company}`,
    `Лице за контакт: ${d.name}`,
    `Телефон: ${d.phone}`,
    `Имейл: ${d.email}`,
    `Интерес: ${serviceLabel}`,
    d.budget ? `Бюджет: ${d.budget}` : "",
    "",
    d.message,
  ]
    .filter((l) => l !== "")
    .join("\n");
  return `mailto:${contact.email}?subject=${encodeURIComponent(`Запитване за реклама — ${d.company}`)}&body=${encodeURIComponent(body)}`;
}

export function Contact() {
  const { selected, setSelected } = useInquiry();
  const [data, setData] = useState<Inquiry>(emptyInquiry);
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [flash, setFlash] = useState(false);
  const options = inquiryOptions();

  // Пакет, избран от ценовите карти, попълва падащото меню
  useEffect(() => {
    if (!selected) return;
    setData((d) => ({ ...d, service: selected }));
    setErrors((e) => ({ ...e, service: undefined }));
    setFlash(true);
    const t = setTimeout(() => setFlash(false), 1600);
    return () => clearTimeout(t);
  }, [selected]);

  const set = <K extends keyof Inquiry>(k: K, v: Inquiry[K]) => {
    setData((d) => ({ ...d, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
    if (k === "service") setSelected(v as string);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validateInquiry(data);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      document.getElementById(`f-${first}`)?.focus();
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("success");
        return;
      }
      if (res.status === 503 || res.status === 502) {
        const label = options.find((o) => o.value === data.service)?.label ?? data.service;
        window.location.href = mailtoHref(data, label);
        setStatus("mailto");
        return;
      }
      setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  const border = (k: keyof Inquiry) => (errors[k] ? "border-[#c2410c]" : "border-black/10");
  const aria = (k: keyof Inquiry) =>
    errors[k] ? { "aria-invalid": true as const, "aria-describedby": `f-${k}-err` } : {};

  return (
    <section id="kontakt" className="bg-white py-24 sm:py-32" aria-labelledby="kontakt-title">
      <div className="container-page">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2
            id="kontakt-title"
            className="text-balance text-[clamp(2.2rem,5.4vw,4.25rem)] font-semibold leading-[1.04] tracking-display"
          >
            Нека Вашият бранд бъде част от <span className="text-gold-gradient">следващата добра история.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-[18px] leading-relaxed text-ink-soft">
            Свържете се с нас за персонална оферта, медийна консултация или предложение за спонсорство.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-[0.85fr_1.4fr]">
          {/* Контакт */}
          <Reveal className="relative overflow-hidden rounded-[32px] bg-ink p-8 text-white sm:p-10">
            <div aria-hidden className="bg-gold-gradient absolute -right-24 -top-24 size-72 rounded-full opacity-25 blur-3xl" />
            <div className="relative flex h-full flex-col">
              <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-gold-300">
                Вашият контакт за реклама и партньорства
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div
                  aria-hidden
                  className="bg-gold-gradient grid size-16 place-items-center rounded-full text-[22px] font-semibold text-ink"
                >
                  РТ
                </div>
                <div>
                  <p className="text-[24px] font-semibold tracking-headline">{contact.name}</p>
                  <p className="text-[15px] text-white/60">{contact.role}</p>
                </div>
              </div>

              <div className="mt-10 space-y-3">
                <a
                  href={contact.phoneHref}
                  className="group flex items-center gap-4 rounded-2xl bg-white/[0.06] p-4 transition-colors hover:bg-white/[0.12]"
                >
                  <span className="grid size-11 place-items-center rounded-full bg-white/10 text-gold-300">
                    <Icon name="phone" className="size-5" />
                  </span>
                  <span>
                    <span className="block text-[12px] text-white/50">Телефон</span>
                    <span className="text-[18px] font-medium tabular-nums">{contact.phoneDisplay}</span>
                  </span>
                  <Icon name="arrow" className="ml-auto size-4 text-white/40 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href={`mailto:${contact.email}`}
                  className="group flex items-center gap-4 rounded-2xl bg-white/[0.06] p-4 transition-colors hover:bg-white/[0.12]"
                >
                  <span className="grid size-11 place-items-center rounded-full bg-white/10 text-gold-300">
                    <Icon name="mail" className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[12px] text-white/50">Имейл</span>
                    <span className="block truncate text-[17px] font-medium">{contact.email}</span>
                  </span>
                  <Icon name="arrow" className="ml-auto size-4 shrink-0 text-white/40 transition-transform group-hover:translate-x-1" />
                </a>
              </div>

              <p className="mt-auto pt-10 text-[14px] leading-relaxed text-white/50">
                Национална телевизия БГ+ · Отговаряме на запитвания в рамките на един работен ден.
              </p>
            </div>
          </Reveal>

          {/* Форма */}
          <Reveal className="rounded-[32px] bg-mist p-6 sm:p-10" delay={0.08}>
            <AnimatePresence mode="wait">
              {status === "success" || status === "mailto" ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: easeApple }}
                  className="flex min-h-[28rem] flex-col items-center justify-center text-center"
                  role="status"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.15 }}
                    className="bg-gold-gradient grid size-20 place-items-center rounded-full text-ink"
                  >
                    <Icon name={status === "success" ? "check" : "mail"} className="size-9" />
                  </motion.div>
                  <h3 className="mt-8 text-[28px] font-semibold tracking-headline">
                    {status === "success" ? "Благодарим Ви!" : "Почти готово"}
                  </h3>
                  <p className="mt-3 max-w-sm text-[16px] leading-relaxed text-ink-soft">
                    {status === "success"
                      ? "Запитването е изпратено. Ще се свържем с Вас до един работен ден с персонално предложение."
                      : "Отворихме имейл приложението Ви с попълнено запитване — остава само да натиснете „Изпрати“."}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setStatus("idle");
                      setData(emptyInquiry);
                      setSelected("");
                    }}
                    className={buttonClass("ghost", "mt-8 ring-1 ring-inset ring-black/10")}
                  >
                    Ново запитване
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  noValidate
                  onSubmit={onSubmit}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="grid gap-4 sm:grid-cols-2"
                  aria-label="Форма за запитване"
                >
                  <Field id="f-company" label="Име на фирма *" error={errors.company}>
                    <input
                      id="f-company"
                      autoComplete="organization"
                      placeholder=" "
                      value={data.company}
                      onChange={(e) => set("company", e.target.value)}
                      className={`${inputCls} ${border("company")}`}
                      {...aria("company")}
                    />
                  </Field>
                  <Field id="f-name" label="Лице за контакт *" error={errors.name}>
                    <input
                      id="f-name"
                      autoComplete="name"
                      placeholder=" "
                      value={data.name}
                      onChange={(e) => set("name", e.target.value)}
                      className={`${inputCls} ${border("name")}`}
                      {...aria("name")}
                    />
                  </Field>
                  <Field id="f-phone" label="Телефон *" error={errors.phone}>
                    <input
                      id="f-phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder=" "
                      value={data.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      className={`${inputCls} ${border("phone")}`}
                      {...aria("phone")}
                    />
                  </Field>
                  <Field id="f-email" label="Имейл *" error={errors.email}>
                    <input
                      id="f-email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder=" "
                      value={data.email}
                      onChange={(e) => set("email", e.target.value)}
                      className={`${inputCls} ${border("email")}`}
                      {...aria("email")}
                    />
                  </Field>
                  <Field id="f-service" label="Услуга / пакет *" error={errors.service}>
                    <motion.div
                      animate={flash ? { scale: [1, 1.02, 1] } : { scale: 1 }}
                      transition={{ duration: 0.6, ease: easeApple }}
                      className="relative"
                    >
                      <select
                        id="f-service"
                        value={data.service}
                        onChange={(e) => set("service", e.target.value)}
                        className={`${inputCls} ${border("service")} appearance-none pr-10 ${
                          flash ? "!border-gold-500 shadow-[0_0_0_4px_rgba(212,178,106,0.3)]" : ""
                        }`}
                        {...aria("service")}
                      >
                        <option value="" disabled>
                          Изберете…
                        </option>
                        {options.map((o) => (
                          <option key={o.value} value={o.value}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                      <Icon name="chevron" className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-ink-soft" />
                    </motion.div>
                  </Field>
                  <Field id="f-budget" label="Ориентировъчен бюджет">
                    <div className="relative">
                      <select
                        id="f-budget"
                        value={data.budget}
                        onChange={(e) => set("budget", e.target.value)}
                        className={`${inputCls} border-black/10 appearance-none pr-10`}
                      >
                        <option value="">Изберете…</option>
                        {budgetRanges.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                      <Icon name="chevron" className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-ink-soft" />
                    </div>
                  </Field>
                  <div className="sm:col-span-2">
                    <Field id="f-message" label="Съобщение / цели на кампанията" error={errors.message}>
                      <textarea
                        id="f-message"
                        rows={4}
                        placeholder=" "
                        value={data.message}
                        onChange={(e) => set("message", e.target.value)}
                        className={`${inputCls} ${border("message")} resize-y pt-7`}
                        {...aria("message")}
                      />
                    </Field>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="flex cursor-pointer items-start gap-3 px-1 text-[14px] leading-relaxed text-ink-soft">
                      <input
                        id="f-consent"
                        type="checkbox"
                        checked={data.consent}
                        onChange={(e) => set("consent", e.target.checked)}
                        className="mt-1 size-[18px] shrink-0 accent-[#a8813f]"
                        {...aria("consent")}
                      />
                      Съгласен/на съм ТВ БГ+ да използва данните ми, за да се свърже с мен във връзка с това запитване.
                    </label>
                    {errors.consent && (
                      <p id="f-consent-err" className="px-1 pt-1.5 text-[13px] text-[#c2410c]">
                        {errors.consent}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col items-start gap-4 sm:col-span-2 sm:flex-row sm:items-center">
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className={buttonClass("primary", "w-full !px-8 !py-4 !text-base sm:w-auto")}
                      aria-live="polite"
                    >
                      {status === "loading" ? (
                        <>
                          <motion.span
                            className="size-4 rounded-full border-2 border-ink/30 border-t-ink"
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                          />
                          Изпращане…
                        </>
                      ) : (
                        <>
                          Изпратете запитване
                          <Icon name="arrow" className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                        </>
                      )}
                    </button>
                    {status === "error" && (
                      <p className="text-[14px] text-[#c2410c]" role="alert">
                        Възникна грешка. Моля, опитайте отново или се обадете на {contact.phoneDisplay}.
                      </p>
                    )}
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-black/[0.06] bg-mist">
      <div className="container-page flex flex-col items-center justify-between gap-6 py-10 text-[13px] text-ink-soft sm:flex-row">
        <div className="flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="TV BG+" className="h-8 w-auto" />
          <span>© {new Date().getFullYear()} Национална телевизия БГ+</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <a href={contact.phoneHref} className="hover:text-ink">
            {contact.phoneDisplay}
          </a>
          <a href={`mailto:${contact.email}`} className="hover:text-ink">
            {contact.email}
          </a>
          <a href="https://bgplus.bg" className="hover:text-ink">
            bgplus.bg
          </a>
        </div>
      </div>
    </footer>
  );
}
