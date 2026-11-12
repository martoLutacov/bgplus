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
        <ZoomText id="stats-title" text="В цяла България." sub="95% национално разпространение и ≈800 000 зрители месечно." />
        <Stats />
        <ZoomText id="predimstva-title" text="Защо БГ+?" sub="Повече от рекламно време. Медиен партньор за Вашия растеж." tone="white" />
        <Bento />
        <ZoomText id="formati-title" text="Рекламни формати." sub="Изберете начина, по който да разкажете своята история." />
        <Formats />
        <Statement />
        <ZoomText id="prezentaciya-title" text="Студиа. Водещи. Доверие." sub="Предавания, които изграждат авторитет." tone="white" />
        <Presentation />
        <ZoomText id="paketi-title" text="Вашият бранд. В ефир." sub={`Рекламни пакети от ${formatPrice(minPackage)} на месец.`} />
        <Packages />
        <ZoomText id="kalkulator-title" text="Сглобете кампанията си." sub="Изберете излъчванията и вижте цената веднага." tone="white" />
        <Calculator />
        <ZoomText id="sponsorstvo-title" text="Повече от реклама." sub="Спонсорство на предавания с истории, които вдъхновяват." />
        <Sponsorships />
        <ZoomText id="cenorazpis-title" text="Всички цени." sub="На едно място. Без изненади." tone="white" />
        <PriceList />
        <ZoomText id="steps-title" text="Три стъпки." sub="До Вашата кампания в ефир." />
        <Steps />
        <ZoomText id="chzv-title" text="Въпроси?" sub="Ето най-честите." tone="white" />
        <Faq />
        <ZoomText id="kontakt-title" text="Да започваме." sub="Персонална оферта до един работен ден." />
        <Contact />
      </main>
      <Footer />
    </Providers>
  );
}
