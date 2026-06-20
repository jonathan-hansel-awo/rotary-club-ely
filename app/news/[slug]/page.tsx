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

  const postDate = post.date || null;

  const ogImage = post.image
    ? urlForImage(post.image)?.width(1200).height(630).url()
    : undefined;

  return {
    title: `${post.title} | Rotary Club of Ely`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : [],
      type: "article",
      publishedTime: postDate ?? undefined,
    },
  };
}

function formatDate(dateString?: string | null) {
  if (!dateString) return "Date coming soon";

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "Date coming soon";
  }

  return date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatShortDate(dateString?: string | null) {
  if (!dateString) return "Date coming soon";

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "Date coming soon";
  }

  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function getCategoryLabel(category?: string) {
  switch (category) {
    case "announcement":
      return "Announcement";
    case "event":
      return "Event";
    case "community-story":
      return "Community Story";
    case "news":
    default:
      return "News";
  }
}

export default async function NewsPostDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getNewsBySlug(slug);

  if (!post) notFound();

  const postDate = post.date || null;

  const heroSrc = post.image
    ? urlForImage(post.image)?.width(1600).height(900).url()
    : null;

  const heroAlt = post.image?.alt || post.title;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: postDate || undefined,
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

      <div className="relative bg-rotary-blue-dark pt-24">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <Container className="relative z-10 pb-10">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-white/50">
              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  href="/news"
                  className="transition-colors hover:text-white"
                >
                  News
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="max-w-[220px] truncate text-white/80">
                {post.title}
              </li>
            </ol>
          </nav>

          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white ring-1 ring-white/15">
              {getCategoryLabel(post.category)}
            </span>

            {post.pinned && (
              <span className="inline-flex rounded-full bg-rotary-gold/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-rotary-gold ring-1 ring-rotary-gold/30">
                Pinned Announcement
              </span>
            )}
          </div>

          <p className="mb-3 text-sm font-medium text-white/60">
            {formatDate(postDate)}
          </p>

          <h1 className="max-w-4xl pb-5 font-heading text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="max-w-2xl text-lg leading-relaxed text-white/75">
              {post.excerpt}
            </p>
          )}
        </Container>

        {heroSrc && (
          <div className="relative h-72 w-full overflow-hidden sm:h-96 md:h-[480px]">
            <Image
              src={heroSrc}
              alt={heroAlt}
              fill
              className="image-polish object-cover"
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
              <div className="lg:col-span-2">
                <FadeInOnScroll>
                  <article className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-grey-200 md:p-10">
                    <div className="prose prose-lg max-w-none">
                      {post.body && (
                        <PortableText
                          value={post.body}
                          components={portableTextComponents}
                        />
                      )}
                    </div>

                    {post.ctaLabel && post.ctaUrl && (
                      <div className="mt-10 rounded-2xl bg-rotary-blue/5 p-6 ring-1 ring-rotary-blue/10">
                        <p className="mb-4 font-heading text-xl font-bold text-grey-900">
                          Want to learn more?
                        </p>
                        <Link
                          href={post.ctaUrl}
                          className="inline-flex items-center rounded-full bg-rotary-blue px-5 py-3 text-sm font-semibold text-white transition hover:bg-rotary-blue-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rotary-gold"
                        >
                          {post.ctaLabel}
                        </Link>
                      </div>
                    )}
                  </article>
                </FadeInOnScroll>
              </div>

              <aside className="lg:col-span-1">
                <FadeInOnScroll delay={0.15}>
                  <div className="sticky top-28 space-y-6">
                    {post.related && post.related.length > 0 && (
                      <div className="rounded-2xl border border-grey-200 bg-white p-6 shadow-sm">
                        <h3 className="mb-4 font-heading text-base font-semibold text-grey-900">
                          More News
                        </h3>

                        <ul className="space-y-4">
                          {post.related.map((related: NewsPost) => (
                            <li key={related._id}>
                              <Link
                                href={`/news/${related.slug.current}`}
                                className="group block"
                              >
                                <p className="text-sm font-medium leading-snug text-grey-900 transition-colors group-hover:text-rotary-blue">
                                  {related.title}
                                </p>
                                <p className="mt-1 text-xs text-grey-700">
                                  {formatShortDate(related.date)}
                                </p>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="rounded-2xl bg-rotary-blue p-6 text-white shadow-sm">
                      <p className="mb-2 text-xs font-medium uppercase tracking-wider text-rotary-gold">
                        Come and Meet Us
                      </p>

                      <p className="mb-4 text-sm leading-relaxed text-white/80">
                        We meet most Thursdays at 8:00 PM at The City of Ely
                        Bowls Club. Visitors are always welcome.
                      </p>

                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-rotary-gold transition-colors hover:text-rotary-gold-light"
                      >
                        Get in touch
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    </div>

                    <Link
                      href="/news"
                      className="flex items-center gap-2 text-sm font-medium text-rotary-blue transition-colors hover:text-rotary-blue-dark"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden="true"
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

        {post.related && post.related.length > 0 && (
          <section className="border-t border-grey-200 bg-white py-16">
            <Container>
              <h2 className="mb-8 font-heading text-2xl font-bold text-grey-900">
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

function NewsListItem({ post }: { post: NewsPost }) {
  const imageSrc = post.image
    ? urlForImage(post.image)?.width(200).height(200).url()
    : null;

  const initial = post.title?.charAt(0)?.toUpperCase() ?? "?";

  return (
    <Link
      href={`/news/${post.slug.current}`}
      className="group flex items-start gap-5 rounded-xl border border-grey-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rotary-gold"
    >
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-grey-100">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={post.image?.alt || post.title}
            fill
            className="image-polish object-cover transition-transform duration-300 group-hover:scale-105"
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

      <div className="min-w-0 flex-1">
        <p className="mb-1 text-xs text-grey-700">
          {formatShortDate(post.date)}
        </p>

        <h2 className="font-heading text-base font-semibold leading-snug text-grey-900 transition-colors group-hover:text-rotary-blue">
          {post.title}
        </h2>

        {post.excerpt && (
          <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-grey-700">
            {post.excerpt}
          </p>
        )}
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="mt-1 h-4 w-4 shrink-0 text-grey-300 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-rotary-blue"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  );
            }
