import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import PageTransition from "@/components/animation/PageTransition";

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
    <html lang="en">
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

        <PageTransition>
          <main id="main-content">
            {children}
          </main>
        </PageTransition>
      </body>
    </html>
  );
}