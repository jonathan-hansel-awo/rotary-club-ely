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
    default: "Rotary Club of Ely — People of Action",
  },
  description:
    "People of Action, Right Here in Ely. The Rotary Club of Ely organises community events, raises funds for local causes, and welcomes new members.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://rotaryclubofely.co.uk",
  ),
  openGraph: {
    siteName: "Rotary Club of Ely",
    type: "website",
    locale: "en_GB",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "Rotary Club of Ely — People of Action",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-default.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organisationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Rotary Club of Ely",
  url: "https://rotaryclubofely.co.uk",
  logo: "https://rotaryclubofely.co.uk/rotary-logo.png",
  contactPoint: {
    "@type": "ContactPoint",
    email: "info@rotaryclubofely.co.uk",
    contactType: "customer service",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "19 Nutholt Lane",
    addressLocality: "Ely",
    addressRegion: "Cambridgeshire",
    postalCode: "CB7 4PL",
    addressCountry: "GB",
  },
  sameAs: [],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organisationSchema),
          }}
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
