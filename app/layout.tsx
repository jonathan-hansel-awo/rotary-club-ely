import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import PageTransition from "@/components/animation/PageTransition";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SkipToContent from "@/components/layout/SkipToContent";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Rotary Club of Ely",
    default: "Rotary Club of Ely",
  },
  description:
    "People of Action, Right Here in Ely. The Rotary Club of Ely organises community events, raises funds for local causes, and welcomes new members.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://rotaryclubofely.co.uk"
  ),
  openGraph: {
    siteName: "Rotary Club of Ely",
    type: "website",
    locale: "en_GB",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${inter.variable}`}>
      <head>
        <link
          rel="preload"
          as="image"
          href="https://rotaryclubely.vercel.app/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcgu2y1hc%2Fproduction%2F3cd2508cf07a5666591ff16635aec37e097e1bef-1072x800.jpg%3Frect%3D0%2C43%2C1072%2C715%26w%3D1200%26h%3D800%26fit%3Dmax%26auto%3Dformat&w=1080&q=75"
          fetchPriority="high"
        />
      </head>
      <body
        className={`
    ${plusJakartaSans.variable}
    ${inter.variable}
    bg-bg-primary
    text-text-primary
    font-body
    antialiased
  `}
      >
        <a
          href="#main-content"
          className="
      sr-only focus:not-sr-only
      fixed top-4 left-4 z-100
      bg-rotary-gold text-grey-900
      font-body font-semibold text-sm
      px-4 py-2 rounded-sm
      focus:outline-none
    "
        >
          Skip to main content
        </a>
        <SkipToContent />
        <Header />

        <PageTransition>
          <main id="main-content">{children}</main>
        </PageTransition>
        <Footer />
      </body>
    </html>
  );
}