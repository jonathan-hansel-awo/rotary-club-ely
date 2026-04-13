import Hero from "@/components/home/Hero";
import FeaturedEvents from "@/components/home/FeaturedEvents";
import ImpactNumbers from "@/components/home/ImpactNumbers";
import LatestNews from "@/components/home/LatestNews";
import OurCauses from "@/components/home/OurCauses";
import ActivityGrid from "@/components/home/ActivityGrid";
import SponsorsStrip from "@/components/home/SponsorsStrip";
import JoinCTA from "@/components/home/JoinCTA";
import { getHomepageData } from "@/lib/sanity.fetch";

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
    </>
  );
}

export const revalidate = 3600;
