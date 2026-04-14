import { getHomepageData } from "@/lib/sanity.fetch";
import dynamic from "next/dynamic";
import Hero from "@/components/home/Hero";
import FeaturedEvents from "@/components/home/FeaturedEvents";
import MeetTheTeam from "@/components/home/MeetTheTeam";

// Dynamically import below-fold sections
const ImpactNumbers = dynamic(() => import("@/components/home/ImpactNumbers"));
const LatestNews = dynamic(() => import("@/components/home/LatestNews"));
const OurCauses = dynamic(() => import("@/components/home/OurCauses"));
// const MeetTheTeam = dynamic(() => import("@/components/home/MeetTheTeam"));
const ActivityGrid = dynamic(() => import("@/components/home/ActivityGrid"));
const SponsorsStrip = dynamic(() => import("@/components/home/SponsorsStrip"));
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

      <FeaturedEvents events={data.upcomingEvents} />

      <ImpactNumbers totalContributions={data.impactStats.totalContributions} />

      <LatestNews posts={data.latestNews} />

      <OurCauses causes={data.causes} />

      <ActivityGrid tiles={data.settings.activityTiles} />

      <SponsorsStrip sponsors={data.sponsors} />

      <JoinCTA settings={data.settings} />

      <MeetTheTeam members={data.members} />
    </>
  );
}


export const metadata = {
  title: "Rotary Club of Ely | People of Action in East Cambridgeshire",
  description:
    "The Rotary Club of Ely organises community events including Aquafest and the annual Fireworks display, raises funds for local causes, and welcomes new members.",
  openGraph: {
    title: "Rotary Club of Ely",
    description:
      "Community events, charitable giving, and fellowship in Ely, Cambridgeshire.",
    images: ["/og-default.jpg"],
  },
};

export const revalidate = 3600;