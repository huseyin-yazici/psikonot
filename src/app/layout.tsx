import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

const serif = Source_Serif_4({
  variable: "--font-serif-display",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name}: ${site.tagline}`,
  description:
    "Seans kaydınızı Türkçe metne çevirir, birkaç dakikada düzenli bir seans notu taslağı hazırlar. Ses dosyası saklanmaz. Beta için ücretsiz katılımcı arıyoruz.",
  openGraph: {
    title: `${site.name}: ${site.tagline}`,
    description:
      "Psikologlar ve danışmanlar için Türkçe yapay zekâ seans notu asistanı. Beta için ücretsiz katılımcı arıyoruz.",
    locale: "tr_TR",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="tr"
      className={`${inter.variable} ${serif.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
