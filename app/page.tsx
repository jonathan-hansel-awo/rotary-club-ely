import { getHomepageData } from "@/lib/sanity.fetch";
import dynamic from "next/dynamic";
import Hero from "@/components/home/Hero";
import FeaturedEvents from "@/components/home/FeaturedEvents";
import SectionDivider from "@/components/ui/SectionDivider";

// Dynamically import below-fold sections
const Impact = dynamic(() => import("@/components/home/Impact"));
const SupportArchivePreview = dynamic(() => import("@/components/home/SupportArchivePreview"));
const LatestNews = dynamic(() => import("@/components/home/LatestNews"));
const OurCauses = dynamic(() => import("@/components/home/OurCauses"));
const MeetTheTeam = dynamic(() => import("@/components/home/MeetTheTeam"));
const JoinCTA = dynamic(() => import("@/components/home/JoinCTA"));

export default async function Home() {
  const data = await getHomepageData();

  return (
    <>
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

export const metadata = {
  title: "Rotary Club of Ely | People of Action in East Cambridgeshire",
  description:
    "The Rotary Club of Ely organises community events including Aquafest and the annual Fireworks display, raises funds for local and international causes, and welcomes new members.",
  openGraph: {
    title: "Rotary Club of Ely",
    description:
      "Community events, charitable giving, and fellowship in Ely, Cambridgeshire.",
    images: ["/og-default.jpg"],
  },
};

export const revalidate = 3600;
