import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "@/sanity/lib/portable-text";
import { urlForImage } from "@/sanity/lib/image";
import FadeInOnScroll from "@/components/animation/FadeInOnScroll";
import { NewsPost } from "@/lib/types";
import Container from "@/components/layout/Container";
import { getAllNews, getNewsBySlug } from "@/lib/sanity.fetch";

export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getAllNews();
  return posts.map((p: { slug: { current: string } }) => ({
    slug: p.slug.current,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getNewsBySlug(slug);
  if (!post) return {};

  const ogImage = post.image
    ? urlForImage(post.image)?.width(1200).height(630).url()
    : undefined;

  return {
    title: `${post.title} | Rotary Club of Ely`,
    openGraph: {
      title: post.title,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : [],
      type: "article",
      publishedTime: post.date,
    },
  };
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function NewsPostDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getNewsBySlug(slug);

  if (!post) notFound();

  const heroSrc = post.image
    ? urlForImage(post.image)?.width(1600).height(900).url()
    : null;

  // JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.date,
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
      <div className="relative pt-24 pb-0 bg-rotary-blue-dark">
        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <Container className="relative z-10 pb-0">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-white/50">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  href="/news"
                  className="hover:text-white transition-colors"
                >
                  News
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-white/80 truncate max-w-[200px]">
                {post.title}
              </li>
            </ol>
          </nav>

          {/* Pinned badge */}
          {post.pinned && (
            <span className="mb-4 inline-block rounded-full bg-rotary-gold/20 px-3 py-1 text-xs font-semibold text-rotary-gold">
              Pinned Announcement
            </span>
          )}

          <p className="mb-3 text-sm font-medium text-white/60">
            {formatDate(post.date)}
          </p>

          <h1 className="font-heading text-3xl font-bold text-white md:text-4xl lg:text-5xl leading-tight max-w-3xl pb-10">
            {post.title}
          </h1>
        </Container>

        {/* Hero image — bleeds out of the dark header */}
        {heroSrc && (
          <div className="relative mt-0 h-72 w-full overflow-hidden sm:h-96 md:h-[480px]">
            <Image
              src={heroSrc}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-off-white/20 to-transparent" />
          </div>
        )}
      </div>

      <main id="main-content">
        <section className="bg-off-white py-12 md:py-16">
          <Container>
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
              {/* Article body */}
              <div className="lg:col-span-2">
                <FadeInOnScroll>
                  <div className="prose prose-lg max-w-none">
                    {post.body && (
                      <PortableText
                        value={post.body}
                        components={portableTextComponents}
                      />
                    )}
                  </div>
                </FadeInOnScroll>
              </div>

              {/* Sidebar */}
              <aside className="lg:col-span-1">
                <FadeInOnScroll delay={0.15}>
                  <div className="sticky top-28 space-y-6">
                    {/* Recent posts */}
                    {post.related && post.related.length > 0 && (
                      <div className="rounded-xl bg-white p-6 shadow-sm border border-grey-200">
                        <h3 className="font-heading text-base font-semibold text-grey-900 mb-4">
                          More News
                        </h3>
                        <ul className="space-y-4">
                          {post.related.map((related: NewsPost) => (
                            <li key={related._id}>
                              <Link
                                href={`/news/${related.slug.current}`}
                                className="group block"
                              >
                                <p className="text-sm font-medium text-grey-900 group-hover:text-rotary-blue transition-colors leading-snug">
                                  {related.title}
                                </p>
                                <p className="mt-0.5 text-xs text-grey-500">
                                  {new Date(related.date).toLocaleDateString(
                                    "en-GB",
                                    {
                                      day: "numeric",
                                      month: "long",
                                      year: "numeric",
                                    },
                                  )}
                                </p>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Meeting info CTA */}
                    <div className="rounded-xl bg-rotary-blue p-6 text-white">
                      <p className="text-xs font-medium uppercase tracking-wider text-rotary-gold mb-2">
                        Come and Meet Us
                      </p>
                      <p className="text-sm leading-relaxed text-white/80 mb-4">
                        We meet every Thursday at 8:00 PM at The City of Ely
                        Bowls Club. Visitors are always welcome.
                      </p>
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-rotary-gold hover:text-rotary-gold-light transition-colors"
                      >
                        Get in touch
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
                      href="/news"
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
                      Back to News
                    </Link>
                  </div>
                </FadeInOnScroll>
              </aside>
            </div>
          </Container>
        </section>

        {/* Related posts strip */}
        {post.related && post.related.length > 0 && (
          <section className="bg-white py-16 border-t border-grey-200">
            <Container>
              <h2 className="font-heading text-2xl font-bold text-grey-900 mb-8">
                More from Ely Rotary
              </h2>
              <div className="space-y-4">
                {post.related.map((related: NewsPost, index: number) => (
                  <FadeInOnScroll key={related._id} delay={index * 0.05}>
                    <NewsListItem post={related} />
                  </FadeInOnScroll>
                ))}
              </div>
            </Container>
          </section>
        )}
      </main>
    </>
  );
}

// ─── Shared list item component ────────────────────────────────────────────────

function NewsListItem({ post }: { post: NewsPost }) {
  const imageSrc = post.image
    ? urlForImage(post.image)?.width(200).height(200).url()
    : null;

  const initial = post.title?.charAt(0)?.toUpperCase() ?? "?";

  return (
    <Link
      href={`/news/${post.slug.current}`}
      className="group flex items-start gap-5 rounded-xl bg-white p-5 shadow-sm border border-grey-200 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rotary-gold"
    >
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-grey-100">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="64px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-rotary-blue/10">
            <span className="font-heading text-xl font-bold text-rotary-blue/40">
              {initial}
            </span>
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="mb-1 text-xs text-grey-500">
          {new Date(post.date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <h2 className="font-heading text-base font-semibold text-grey-900 leading-snug group-hover:text-rotary-blue transition-colors truncate">
          {post.title}
        </h2>

      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 shrink-0 text-grey-300 transition-all duration-200 group-hover:text-rotary-blue group-hover:translate-x-0.5 mt-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  );
}
