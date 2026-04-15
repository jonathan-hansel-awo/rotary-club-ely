import type { Metadata } from "next";
import InteriorHero from "@/components/ui/InteriorHero";
import ImpactOverview from "@/components/impact/ImpactOverview";
import ContributionCard from "@/components/impact/ContributionCard";
import { getAllContributions, getImpactStats } from "@/lib/sanity.fetch";
import Container from "../../components/layout/Container";
import { Contribution } from "@/lib/types";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Our Impact | Rotary Club of Ely",
  description:
    "For over 80 years the Rotary Club of Ely has supported local causes, charities, and community initiatives across East Cambridgeshire.",
};

export default async function ImpactPage() {
  const [contributions, stats] = await Promise.all([
    getAllContributions(),
    getImpactStats(),
  ]);

  return (
    <>
      <InteriorHero
        eyebrow="Our Impact"
        title="Making a Difference in Ely"
        subtitle="For over 80 years our volunteers have raised funds, given time, and supported causes that matter to the people of East Cambridgeshire."
      />

      <main id="main-content">
        {/* Stats overview */}
        <section className="bg-off-white py-12 md:py-16">
          <Container>
            <ImpactOverview
              totalContributions={stats.totalContributions}
              yearsActive={80}
            />
          </Container>
        </section>

        {/* Contributions listing */}
        <section className="bg-white py-12 md:py-20">
          <Container>
            <div className="mb-10">
              <p className="mb-2 text-sm font-medium uppercase tracking-wider text-rotary-gold-dark">
                Our Contributions
              </p>
              <h2 className="font-heading text-3xl font-bold text-grey-900">
                Stories of Impact
              </h2>
              <p className="mt-3 max-w-xl text-grey-600">
                Every entry below represents real support given to real people
                and organisations in and around Ely.
              </p>
            </div>

            {contributions.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-lg font-semibold text-grey-700">
                  No contributions found
                </p>
                <p className="mt-2 text-grey-500">Check back soon.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {contributions.map((contribution: Contribution, index: number) => (
                  <ContributionCard
                    key={contribution._id}
                    contribution={contribution}
                    index={index}
                  />
                ))}
              </div>
            )}
          </Container>
        </section>
      </main>
    </>
  );
}
