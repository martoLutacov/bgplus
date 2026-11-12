"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { contact, nav } from "@/data/site";
import { buttonClass, Icon } from "./ui";
import { easeApple } from "./motion";

export function Nav() {
  const { scrollY } = useScroll();
  const [onDark, setOnDark] = useState(true);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useMotionValueEvent(scrollY, "change", (y) => {
    setOnDark(y < window.innerHeight - 64);
  });

  useEffect(() => {
    setOnDark(window.scrollY < window.innerHeight - 64);
    const ids = nav.map((n) => n.href.slice(1));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const dark = onDark && !open;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: easeApple, delay: 0.2 }}
        className={`border-b backdrop-blur-xl backdrop-saturate-150 transition-colors duration-500 ${
          dark ? "border-transparent bg-black/10" : "border-white/[0.08] bg-black/70"
        }`}
      >
        <nav className="container-page flex h-16 items-center justify-between gap-6" aria-label="Основна навигация">
          <a href="#top" className="relative flex h-9 w-[60px] shrink-0 items-center" aria-label="ТВ БГ+ — начало">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-light.png"
              alt="TV BG+"
              className="absolute h-9 w-auto"
            />
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => {
              const isActive = active === item.href.slice(1);
              return (
                <li key={item.href} className="relative">
                  <a
                    href={item.href}
                    className={`relative z-10 block rounded-full px-4 py-2 text-[13.5px] font-medium transition-colors duration-300 ${
                      "text-white/70 hover:text-white"
                    } ${isActive ? "!text-white" : ""}`}
                  >
                    {item.label}
                  </a>
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className={`absolute inset-0 rounded-full bg-white/[0.12]`}
                      transition={{ type: "spring", stiffness: 380, damping: 34 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={contact.phoneHref}
              aria-label={`Обадете се: ${contact.phoneDisplay}`}
              className={`grid size-10 place-items-center rounded-full transition-colors duration-300 ${
                "text-white hover:bg-white/15"
              }`}
            >
              <Icon name="phone" className="size-[18px]" />
            </a>
            <a href="#kontakt" className={buttonClass("primary", "hidden !px-5 !py-2 !text-[13.5px] sm:inline-flex")}>
              Поискайте оферта
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Затвори менюто" : "Отвори менюто"}
              className={`grid size-10 place-items-center rounded-full lg:hidden ${
                "text-white hover:bg-white/15"
              }`}
            >
              <span className="relative block h-3 w-[18px]">
                <span
                  className={`absolute left-0 h-[1.5px] w-full bg-current transition-transform duration-300 ${
                    open ? "top-1/2 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 h-[1.5px] w-full bg-current transition-transform duration-300 ${
                    open ? "top-1/2 -rotate-45" : "bottom-0"
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 bottom-0 top-16 bg-black/95 backdrop-blur-xl lg:hidden"
          >
            <motion.ul
              className="container-page flex flex-col pt-6"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } } }}
            >
              {[...nav, { href: "#kontakt", label: "Поискайте оферта" }].map((item) => (
                <motion.li
                  key={item.href}
                  variants={{
                    hidden: { opacity: 0, y: -8 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeApple } },
                  }}
                  className="border-b border-white/[0.06]"
                >
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-4 text-[26px] font-semibold tracking-headline text-fg"
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
