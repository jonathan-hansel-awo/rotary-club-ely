import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import PageTransition from "@/components/animation/PageTransition";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SkipToContent from "@/components/layout/SkipToContent";
import SmoothScroll from "@/components/providers/SmoothScroll";

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

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://rotaryclubofely.co.uk";

export const metadata: Metadata = {
  title: {
    template: "%s | Rotary Club of Ely",
    default: "Rotary Club of Ely — People of Action",
  },
  description:
    "People of Action, Right Here in Ely. The Rotary Club of Ely organises community events, raises funds for local and international causes, and welcomes new members.",
  metadataBase: new URL(siteUrl),
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
  icons: {
    icon: [
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

const organisationSchema = {
  "@context": "https://schema.org",
  "@type": "NGO",
  "@id": `${siteUrl}/#organization`,
  name: "Rotary Club of Ely",
  alternateName: "Ely Rotary",
  url: siteUrl,
  logo: `${siteUrl}/rotary-logo.png`,
  image: `${siteUrl}/og-default.png`,
  description:
    "Rotary Club of Ely is a local community service club supporting charities, good causes, volunteering and community events across Ely and the surrounding area.",
  areaServed: [
    {
      "@type": "City",
      name: "Ely",
    },
    {
      "@type": "AdministrativeArea",
      name: "Cambridgeshire",
    },
  ],
  memberOf: {
    "@type": "Organization",
    name: "Rotary International",
    url: "https://www.rotary.org/",
  },
  sameAs: ["https://rotary-ribi.org/clubs/homepage.php?ClubID=467"],
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
          <main id="main-content">
        <SmoothScroll />
            {children}
            </main>
        </PageTransition>
        <Footer />
      </body>
    </html>
  );
}
