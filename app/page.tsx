import { Calculator } from "@/components/calculator";
import { Contact, Footer } from "@/components/contact";
import { Formats } from "@/components/formats";
import { Hero } from "@/components/hero";
import { Nav } from "@/components/nav";
import { Presentation } from "@/components/presentation";
import { Packages, PriceList, Sponsorships } from "@/components/pricing";
import { Providers } from "@/components/providers";
import { Bento, Statement, Stats } from "@/components/stats-bento";
import { Faq, Steps } from "@/components/steps-faq";
import { ZoomText } from "@/components/zoom-text";
import { adPackages, formatPrice } from "@/data/pricing";
import { contact, faq, siteUrl } from "@/data/site";

const minPackage = Math.min(...adPackages.map((p) => p.price));

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Национална телевизия БГ+",
    alternateName: "TV BG+",
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      name: contact.name,
      telephone: "+359878834504",
      email: contact.email,
      areaServed: "BG",
      availableLanguage: ["bg"],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
];

export default function Page() {
  return (
    <Providers>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
      >
        Към съдържанието
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Stats />
        <ZoomText text="В цяла България." sub="95% национално разпространение. Една история — Вашата." />
        <Bento />
        <Formats />
        <Statement />
        <Presentation />
        <ZoomText text="Вашият бранд. В ефир." sub={`Рекламни пакети от ${formatPrice(minPackage)} на месец.`} tone="white" />
        <Packages />
        <Calculator />
        <ZoomText text="Повече от реклама." sub="Спонсорство на предавания с истории, които вдъхновяват." />
        <Sponsorships />
        <PriceList />
        <Steps />
        <Faq />
        <ZoomText text="Да започваме." sub="Персонална оферта до един работен ден." tone="white" />
        <Contact />
      </main>
      <Footer />
    </Providers>
  );
}
