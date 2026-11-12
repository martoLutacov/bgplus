import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "./globals.css";
import { siteUrl } from "@/data/site";

const title = "Реклама в Национална телевизия БГ+ | Цени, пакети и спонсорство";
const description =
  "Рекламирайте в Национална телевизия БГ+. Телевизионни рекламни клипове, спонсорство, интервюта и корпоративни репортажи. Получете индивидуална оферта.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "bg_BG",
    url: "/",
    siteName: "Национална телевизия БГ+",
    title,
    description,
    images: [{ url: "/media/studio.jpg", width: 1290, height: 860, alt: "Студио на ТВ БГ+" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/media/studio.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bg">
      <body>{children}</body>
    </html>
  );
}
