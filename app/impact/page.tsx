// app/impact/page.tsx

import type { Metadata } from "next";
import InteriorHero from "@/components/ui/InteriorHero";
import Container from "@/components/layout/Container";
import ImpactCard from "@/components/impact/ImpactCard";
import { getAllImpacts, getImpactStats } from "@/lib/sanity.fetch";
import { Impact } from "@/lib/types";
import { clubAge } from "@/lib/utilities";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Our Impact",
  description: `For ${clubAge} years the Rotary Club of Ely has supported local causes, charities, and community initiatives across East Cambridgeshire.`,
};

export default async function ImpactPage() {
  const [impacts, stats] = await Promise.all([
    getAllImpacts(),
    getImpactStats(),
  ]);

  return (
    <>
      <InteriorHero
        eyebrow="Our Impact"
        title="Stories of service, support and community impact"
        subtitle={`For ${clubAge} years, the Rotary Club of Ely has brought people together to support local causes, international projects and communities in need.`}
      />

      <section className="bg-off-white py-16 md:py-24">
        <Container>
          <div className="mb-12 max-w-3xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-rotary-gold-dark">
              Impact Stories
            </p>

            <h2 className="font-heading text-3xl font-bold text-grey-900 md:text-4xl">
              The difference our members help make
            </h2>

            <p className="mt-4 text-lg leading-relaxed text-grey-700">
              These stories highlight the people, charities and projects
              supported by the Rotary Club of Ely — from local community work to
              international disaster relief.
            </p>
          </div>

          {impacts.length === 0 ? (
            <div className="rounded-3xl border border-grey-200 bg-white p-10 text-center shadow-sm">
              <h3 className="font-heading text-2xl font-bold text-grey-900">
                Impact stories coming soon
              </h3>
              <p className="mt-3 text-grey-600">
                We’re preparing stories that show how Rotary service supports
                communities locally and around the world.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {impacts.map((impact: Impact, index: number) => (
                <ImpactCard key={impact._id} impact={impact} index={index} />
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
