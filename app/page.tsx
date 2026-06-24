import { getHomepageData } from "@/lib/sanity.fetch";
import dynamic from "next/dynamic";
import Hero from "@/components/home/Hero";
import FeaturedEvents from "@/components/home/FeaturedEvents";
import SectionDivider from "@/components/ui/SectionDivider";
import { Metadata } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://rotaryclubofely.co.uk";

const homeTitle =
  "Rotary Club of Ely | Ely Rotary, Volunteering & Community Events";

const homeDescription =
  "Rotary Club of Ely, also known locally as Ely Rotary, brings people together through community events, volunteering, fundraising and support for good causes across Ely and East Cambridgeshire.";
  
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: "Rotary Club of Ely",
    alternateName: "Ely Rotary",
    url: siteUrl,
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
  };

  const homePageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${siteUrl}/#webpage`,
    url: siteUrl,
    name: homeTitle,
    description: homeDescription,
    isPartOf: {
      "@id": `${siteUrl}/#website`,
    },
    about: {
      "@id": `${siteUrl}/#organization`,
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${siteUrl}/og-default.png`,
      width: 1200,
      height: 630,
    },
  };

// Dynamically import below-fold sections
const Impact = dynamic(() => import("@/components/home/Impact"));
const SupportArchivePreview = dynamic(
  () => import("@/components/home/SupportArchivePreview"),
);
const LatestNews = dynamic(() => import("@/components/home/LatestNews"));
const OurCauses = dynamic(() => import("@/components/home/OurCauses"));
const MeetTheTeam = dynamic(() => import("@/components/home/MeetTheTeam"));
const JoinCTA = dynamic(() => import("@/components/home/JoinCTA"));

export default async function Home() {
  const data = await getHomepageData();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([websiteSchema, homePageSchema]),
        }}
      />
      
      <Hero
        imageSrc="/images/Hero/AR05B.jpg"
        imageAlt="Members of the Rotary Club of Ely at a community event"
        heroImages={data.settings.heroImages}
      />
      <SectionDivider />
      <Impact stats={data.impactStats} />
      <SectionDivider />
      <SupportArchivePreview records={data.supportRecords} />
      <SectionDivider />
      <FeaturedEvents events={data.upcomingEvents} />
      <SectionDivider />
      <LatestNews posts={data.latestNews} />
      <SectionDivider />
      <OurCauses causes={data.causes} />
      <SectionDivider />
      <JoinCTA settings={data.settings} />
      <SectionDivider />
      <MeetTheTeam members={data.members} />
    </>
  );
}

export const metadata: Metadata = {
  title: homeTitle,
  description: homeDescription,

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    url: "/",
    title: homeTitle,
    description: homeDescription,
    siteName: "Rotary Club of Ely",
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
    title: homeTitle,
    description: homeDescription,
    images: ["/og-default.png"],
  },
};

export const revalidate = 3600;
