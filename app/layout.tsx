import type { Metadata } from "next";
import Script from "next/script";
import { Archivo, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { OG_IMAGE, SITE_NAME, SITE_URL } from "@/app/lib/seo";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const DESCRIPTION =
  "Honest, side-by-side comparisons that help you decide — BMW vs Audi, Claude Code vs Codex, SQL vs NoSQL and more. The differences that actually matter, with a verdict.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Better Versus — Honest, Side-by-Side Comparisons",
    template: "%s | Better Versus",
  },
  description: DESCRIPTION,
  keywords: [
    "comparison",
    "versus",
    "vs",
    "alternatives",
    "best",
    "side by side",
    "head to head",
    "compare",
  ],
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: SITE_URL,
    locale: "en_US",
    title: "Better Versus — Honest, Side-by-Side Comparisons",
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Better Versus — Honest, Side-by-Side Comparisons",
    description: DESCRIPTION,
    images: [OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        {children}
        <Analytics />
        {/* Google Analytics (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-F0WEHWP1YK"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-F0WEHWP1YK');`}
        </Script>
      </body>
    </html>
  );
}
