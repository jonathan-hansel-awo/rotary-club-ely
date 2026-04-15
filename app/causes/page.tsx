/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from 'next'
import { getActiveCauses } from '@/lib/sanity.fetch'
import InteriorHero from '@/components/ui/InteriorHero'
import Container from '@/components/layout/Container'
import CauseCard from '@/components/impact/CauseCard'
import { Cause } from '@/lib/types'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Our Causes | Rotary Club of Ely',
  description:
    'The causes, missions and programmes supported by the Rotary Club of Ely — locally in East Cambridgeshire and as part of Rotary International.',
}

export default async function CausesPage() {
  const causes = await getActiveCauses()

  return (
    <>
      <InteriorHero
        eyebrow="Our Causes"
        title="What We Stand For"
        subtitle="From local community projects to global Rotary programmes — these are the causes our members work to support."
      />

      <main id="main-content">
        <section className="bg-off-white py-12 md:py-20">
          <Container>

            {/* Intro */}
            <div className="mb-12 max-w-2xl">
              <p className="mb-2 text-sm font-medium uppercase tracking-wider text-rotary-gold-dark">
                Making a Difference
              </p>
              <h2 className="font-heading text-3xl font-bold text-grey-900 mb-3">
                Local Commitment, Global Connection
              </h2>
              <p className="text-grey-600 leading-relaxed">
                As part of Rotary International's worldwide network, we support
                causes that matter right here in Ely and East Cambridgeshire —
                while also contributing to global initiatives that change lives
                around the world.
              </p>
            </div>

            {causes.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-lg font-semibold text-grey-700">
                  No causes listed yet
                </p>
                <p className="mt-2 text-grey-500">Check back soon.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {causes.map((cause: Cause, index: number) => (
                  <CauseCard
                    key={cause._id}
                    cause={cause}
                    index={index}
                  />
                ))}
              </div>
            )}

            {/* Rotary International note */}
            <div className="mt-16 rounded-2xl bg-rotary-blue-dark/5 border border-rotary-blue/10 p-8 md:p-10">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="max-w-xl">
                  <p className="mb-2 text-sm font-medium uppercase tracking-wider text-rotary-gold-dark">
                    Part of Something Bigger
                  </p>
                  <h3 className="font-heading text-xl font-bold text-grey-900 mb-2">
                    Rotary International's Global Programmes
                  </h3>
                  <p className="text-sm text-grey-600 leading-relaxed">
                    Through our membership of Rotary International we contribute
                    to worldwide initiatives including the eradication of polio,
                    peacebuilding, clean water projects, and supporting education
                    in developing countries.
                  </p>
                </div>
                <a
                  href="https://www.rotary.org/en/about-rotary/rotary-causes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-2 rounded-lg border-2 border-rotary-blue px-6 py-3 text-sm font-semibold text-rotary-blue transition-all hover:bg-rotary-blue hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rotary-gold"
                >
                  Learn about Rotary causes
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </div>

          </Container>
        </section>
      </main>
    </>
  )
}