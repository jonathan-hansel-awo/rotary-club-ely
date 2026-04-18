import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "@/sanity/lib/portable-text";
import { urlForImage } from "@/sanity/lib/image";
import CauseCard from "@/components/impact/CauseCard";
import FadeInOnScroll from "@/components/animation/FadeInOnScroll";
import { getActiveCauses, getCauseBySlug } from "@/lib/sanity.fetch";
import Container from "@/components/layout/Container";
import { Cause } from "@/lib/types";

export const revalidate = 3600;

export async function generateStaticParams() {
  const causes = await getActiveCauses();
  return causes.map((c: { slug: { current: string } }) => ({
    slug: c.slug.current,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cause = await getCauseBySlug(slug);
  if (!cause) return {};

  const ogImage = cause.image
    ? urlForImage(cause.image)?.width(1200).height(630).url()
    : undefined;

  return {
    title: `${cause.name} | Our Causes | Rotary Club of Ely`,
    description: cause.summary,
    openGraph: {
      title: `${cause.name} | Rotary Club of Ely`,
      description: cause.summary,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : [],
    },
  };
}

export default async function CauseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cause = await getCauseBySlug(slug);

  if (!cause) notFound();

  const heroSrc = cause.image
    ? urlForImage(cause.image)?.width(1600).height(900).url()
    : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: cause.name,
    description: cause.summary,
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
              alt={cause.name}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-rotary-blue-dark/80 via-rotary-blue-dark/30 to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-rotary-blue to-rotary-blue-dark">
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage:
                  "radial-gradient(circle, white 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <Container>
            <p className="mb-2 text-sm font-medium uppercase tracking-wider text-rotary-gold">
              Our Causes
            </p>
            <h1 className="font-heading text-3xl font-bold text-white md:text-4xl leading-tight max-w-3xl">
              {cause.name}
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
                    href="/causes"
                    className="hover:text-rotary-blue transition-colors"
                  >
                    Our Causes
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-grey-700 font-medium truncate max-w-[200px]">
                  {cause.name}
                </li>
              </ol>
            </nav>

            <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
              {/* Main content */}
              <div className="lg:col-span-2">
                {/* Summary lead */}
                <FadeInOnScroll>
                  <p className="mb-8 text-xl font-medium text-grey-700 leading-relaxed border-l-4 border-rotary-gold pl-5">
                    {cause.summary}
                  </p>
                </FadeInOnScroll>

                {/* Rich text body */}
                <FadeInOnScroll delay={0.1}>
                  <div className="prose prose-lg max-w-none">
                    {cause.description && (
                      <PortableText
                        value={cause.description}
                        components={portableTextComponents}
                      />
                    )}
                  </div>
                </FadeInOnScroll>

                {/* External link CTA */}
                {cause.externalUrl && (
                  <FadeInOnScroll delay={0.15}>
                    <div className="mt-10 rounded-xl bg-white p-6 shadow-sm border border-grey-200">
                      <p className="mb-1 text-sm font-medium text-grey-700">
                        Want to find out more about this cause?
                      </p>
                      <p className="mb-4 text-sm text-grey-700">
                        Visit the official website for more information,
                        resources, and ways to get involved.
                      </p>
                      <a
                        href={cause.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg bg-rotary-blue px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-rotary-blue-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rotary-gold"
                      >
                        Visit Official Website
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
                  </FadeInOnScroll>
                )}
              </div>

              {/* Sidebar */}
              <aside className="lg:col-span-1">
                <FadeInOnScroll delay={0.2}>
                  <div className="sticky top-28 space-y-6">
                    {/* Get involved */}
                    <div className="rounded-xl bg-rotary-blue p-6 text-white">
                      <p className="text-xs font-medium uppercase tracking-wider text-rotary-gold mb-2">
                        Get Involved
                      </p>
                      <p className="text-sm leading-relaxed text-white/80 mb-4">
                        Passionate about this cause? Join the Rotary Club of Ely
                        and help us make a real difference in our community.
                      </p>
                      <Link
                        href="/contact"
                        className="inline-flex w-full items-center justify-center rounded-lg bg-rotary-gold px-4 py-2.5 text-sm font-semibold text-grey-900 transition-colors hover:bg-rotary-gold-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                      >
                        Join the Club
                      </Link>
                    </div>

                    {/* Our impact link */}
                    <div className="rounded-xl bg-white p-6 shadow-sm border border-grey-200">
                      <p className="text-xs font-medium uppercase tracking-wider text-grey-700 mb-2">
                        See Our Work in Action
                      </p>
                      <p className="text-sm text-grey-600 leading-relaxed mb-4">
                        Browse our full history of charitable contributions and
                        community support across East Cambridgeshire.
                      </p>
                      <Link
                        href="/impact"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-rotary-blue hover:text-rotary-blue-dark transition-colors"
                      >
                        View our impact
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

                    {/* Back link */}
                    <Link
                      href="/causes"
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
                      Back to Our Causes
                    </Link>
                  </div>
                </FadeInOnScroll>
              </aside>
            </div>
          </Container>
        </section>

        {/* Related causes */}
        {cause.related && cause.related.length > 0 && (
          <section className="bg-white py-16 border-t border-grey-200">
            <Container>
              <h2 className="font-heading text-2xl font-bold text-grey-900 mb-8">
                More Causes We Support
              </h2>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {cause.related.map((related: Cause, index: number) => (
                  <CauseCard key={related._id} cause={related} index={index} />
                ))}
              </div>
            </Container>
          </section>
        )}
      </main>
    </>
  );
}
