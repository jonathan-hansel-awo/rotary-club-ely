import ActivityGrid from "@/components/home/ActivityGrid";
import FeaturedEvents from "@/components/home/FeaturedEvents";
import Hero from "@/components/home/Hero";
import ImpactNumbers from "@/components/home/ImpactNumbers";
import JoinCTA from "@/components/home/JoinCTA";
import LatestNews from "@/components/home/LatestNews";
import OurCauses from "@/components/home/OurCauses";
import SponsorsStrip from "@/components/home/SponsorsStrip";
import { getHomepageData } from "@/lib/sanity.fetch";

export default async function Home() {
  const data = await getHomepageData();

  return (
    <div>
      <Hero
        imageSrc="/images/hero-placeholder.jpg"
        imageAlt="Members of the Rotary Club of Ely at a community event"
      />

      <FeaturedEvents events={data.upcomingEvents} />
      <ImpactNumbers totalContributions={data.impactStats.totalContributions} />
      <LatestNews posts={data.latestNews} />
      <OurCauses causes={data.causes} />
      <ActivityGrid />
      <SponsorsStrip sponsors={data.sponsors} />
      <JoinCTA settings={data.settings} />

      {/* Light area to test scrolled nav */}
      <div className="min-h-screen bg-off-white flex items-center justify-center">
        <h2 className="font-heading font-bold text-3xl text-rotary-blue">
          Scroll down to see nav change
        </h2>
      </div>
    </div>
  );
}
