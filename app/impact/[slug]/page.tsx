import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "@/sanity/lib/portable-text";
import { urlForImage } from "@/sanity/lib/image";
import ContributionCard from "@/components/impact/ContributionCard";
import FadeInOnScroll from "@/components/animation/FadeInOnScroll";
import { getAllContributions, getContributionBySlug } from "@/lib/sanity.fetch";
import Container from "@/components/layout/Container";
import { Contribution } from "@/lib/types";

export const revalidate = 3600;

export async function generateStaticParams() {
  const contributions = await getAllContributions();
  return contributions.map((c: { slug: { current: string } }) => ({
    slug: c.slug.current,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const contribution = await getContributionBySlug(slug);
  if (!contribution) return {};

  const ogImage = contribution.image
    ? urlForImage(contribution.image)?.width(1200).height(630).url()
    : undefined;

  return {
    title: `${contribution.recipient} | Our Impact | Rotary Club of Ely`,
    description: contribution.summary,
    openGraph: {
      title: `${contribution.recipient} | Rotary Club of Ely`,
      description: contribution.summary,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : [],
    },
  };
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function ContributionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const contribution = await getContributionBySlug(slug);

  if (!contribution) notFound();

  const heroSrc = contribution.image
    ? urlForImage(contribution.image)?.width(1600).height(900).url()
    : null;

  // JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: contribution.recipient,
    description: contribution.summary,
    datePublished: contribution.date,
    author: {
      "@type": "Organization",
      name: "Rotary Club of Ely",
      url: "https://rotaryclubofely.co.uk",
    },
    publisher: {
      "@type": "Organization",
      name: "Rotary Club of Ely",
      url: "https://rotaryclubofely.co.uk",
    },
    image: heroSrc || undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative h-[45vh] min-h-[280px] max-h-[500px] w-full overflow-hidden bg-rotary-blue-dark">
        {heroSrc ? (
          <>
            <Image
              src={heroSrc}
              alt={contribution.recipient}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-rotary-blue-dark/80 via-rotary-blue-dark/30 to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-rotary-blue to-rotary-blue-dark" />
        )}

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <Container>
            <p className="mb-2 text-sm font-medium uppercase tracking-wider text-rotary-gold">
              Our Impact
            </p>
            <h1 className="font-heading text-3xl font-bold text-white md:text-4xl leading-tight max-w-3xl">
              {contribution.recipient}
            </h1>
          </Container>
        </div>
      </div>

      <main id="main-content">
        <section className="bg-off-white py-12 md:py-16">
          <Container>
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-2 text-sm text-grey-700">
                <li>
                  <Link
                    href="/"
                    className="hover:text-rotary-blue transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link
                    href="/impact"
                    className="hover:text-rotary-blue transition-colors"
                  >
                    Our Impact
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-grey-700 font-medium truncate max-w-[200px]">
                  {contribution.recipient}
                </li>
              </ol>
            </nav>

            <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
              {/* Main content */}
              <div className="lg:col-span-2">
                {/* Meta card */}
                <FadeInOnScroll>
                  <div className="mb-8 rounded-xl bg-white p-6 shadow-sm border border-grey-200">
                    <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <dt className="text-xs font-medium uppercase tracking-wider text-grey-700 mb-1">
                          Recipient
                        </dt>
                        <dd className="text-sm font-semibold text-grey-900">
                          {contribution.recipient}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs font-medium uppercase tracking-wider text-grey-700 mb-1">
                          Date
                        </dt>
                        <dd className="text-sm font-semibold text-grey-900">
                          {formatDate(contribution.date)}
                        </dd>
                      </div>
                      {contribution.amount && (
                        <div className="sm:col-span-2">
                          <dt className="text-xs font-medium uppercase tracking-wider text-grey-700 mb-1">
                            Contribution
                          </dt>
                          <dd className="inline-flex items-center rounded-full bg-rotary-gold/15 px-4 py-1.5 text-sm font-bold text-rotary-gold-dark">
                            {contribution.amount}
                          </dd>
                        </div>
                      )}
                    </dl>
                  </div>
                </FadeInOnScroll>

                {/* Summary lead */}
                <FadeInOnScroll delay={0.1}>
                  <p className="mb-6 text-xl font-medium text-grey-700 leading-relaxed border-l-4 border-rotary-gold pl-5">
                    {contribution.summary}
                  </p>
                </FadeInOnScroll>

                {/* Rich text body */}
                <FadeInOnScroll delay={0.15}>
                  <div className="prose prose-lg max-w-none">
                    {contribution.description && (
                      <PortableText
                        value={contribution.description}
                        components={portableTextComponents}
                      />
                    )}
                  </div>
                </FadeInOnScroll>
              </div>

              {/* Sidebar */}
              <aside className="lg:col-span-1">
                <FadeInOnScroll delay={0.2}>
                  <div className="sticky top-28 space-y-6">
                    {/* Impact callout */}
                    <div className="rounded-xl bg-rotary-blue p-6 text-white">
                      <p className="text-xs font-medium uppercase tracking-wider text-rotary-gold mb-3">
                        About Our Work
                      </p>
                      <p className="text-sm leading-relaxed text-white/80">
                        The Rotary Club of Ely has been supporting local causes
                        for over 80 years. Every contribution comes from
                        fundraising, events, and the generosity of our members
                        and the community.
                      </p>
                      <Link
                        href="/impact"
                        className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-rotary-gold hover:text-rotary-gold-light transition-colors"
                      >
                        See all our contributions
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
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    </div>

                    {/* Get involved */}
                    <div className="rounded-xl bg-white p-6 shadow-sm border border-grey-200">
                      <p className="text-xs font-medium uppercase tracking-wider text-grey-700 mb-2">
                        Get Involved
                      </p>
                      <p className="text-sm text-grey-600 leading-relaxed mb-4">
                        Want to help us support more causes like this? Join the
                        Rotary Club of Ely.
                      </p>
                      <Link
                        href="/contact"
                        className="inline-flex items-center justify-center w-full rounded-lg bg-rotary-gold px-4 py-2.5 text-sm font-semibold text-grey-900 transition-colors hover:bg-rotary-gold-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rotary-gold"
                      >
                        Find Out More
                      </Link>
                    </div>

                    {/* Back link */}
                    <Link
                      href="/impact"
                      className="flex items-center gap-2 text-sm font-medium text-rotary-blue hover:text-rotary-blue-dark transition-colors"
                    >
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
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                      Back to Our Impact
                    </Link>
                  </div>
                </FadeInOnScroll>
              </aside>
            </div>
          </Container>
        </section>

        {/* Related contributions */}
        {contribution.related && contribution.related.length > 0 && (
          <section className="bg-white py-16 border-t border-grey-200">
            <Container>
              <h2 className="font-heading text-2xl font-bold text-grey-900 mb-8">
                More Impact Stories
              </h2>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {contribution.related.map(
                  (related: Contribution, index: number) => (
                    <ContributionCard
                      key={related._id}
                      contribution={related}
                      index={index}
                    />
                  ),
                )}
              </div>
            </Container>
          </section>
        )}
      </main>
    </>
  );
}
