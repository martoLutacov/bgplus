"use client";

import { MaskTitle } from "./motion";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "dark" | "ghost" | "light" | "outline-light";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[15px] font-medium tracking-[-0.01em] transition-[transform,background-color,box-shadow,color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.97] disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-gold-gradient text-ink shadow-[0_8px_24px_-10px_rgba(168,129,63,0.7)] hover:shadow-[0_14px_34px_-12px_rgba(168,129,63,0.85)] hover:-translate-y-0.5",
  dark: "bg-white text-black hover:bg-white/90 hover:-translate-y-0.5",
  ghost: "text-fg hover:bg-white/5",
  light: "bg-white text-black hover:bg-white/90 hover:-translate-y-0.5",
  "outline-light": "text-white ring-1 ring-inset ring-white/40 hover:bg-white/10 hover:ring-white/70",
};

export function buttonClass(variant: Variant = "primary", extra = "") {
  return `${base} ${variants[variant]} ${extra}`;
}

export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<"a"> & { variant?: Variant }) {
  return <a className={buttonClass(variant, className)} {...props} />;
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`text-[13px] font-semibold uppercase tracking-[0.14em] text-gold-400 ${className}`}>
      {children}
    </p>
  );
}

export function SectionTitle({ text, id, className = "" }: { text: string; id?: string; className?: string }) {
  return (
    <MaskTitle
      text={text}
      id={id}
      className={`text-balance text-[clamp(2rem,4.6vw,3.5rem)] font-semibold leading-[1.06] tracking-headline ${className}`}
    />
  );
}

const paths: Record<string, ReactNode> = {
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3Z" />
    </>
  ),
  heart: <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />,
  flag: (
    <>
      <path d="M5 21V4" />
      <path d="M5 4h11l-2 4 2 4H5" />
    </>
  ),
  play: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m10 9 5 3-5 3V9Z" />
    </>
  ),
  chart: (
    <>
      <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
    </>
  ),
  phone: (
    <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  download: <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />,
  plus: <path d="M12 5v14M5 12h14" />,
  check: <path d="m5 12 4.5 4.5L19 7" />,
  chevron: <path d="m6 9 6 6 6-6" />,
};

export function Icon({ name, className = "size-5" }: { name: keyof typeof paths | string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {paths[name]}
    </svg>
  );
}
