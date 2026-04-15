import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import InteriorHero from "@/components/ui/InteriorHero";
import FadeInOnScroll from "@/components/animation/FadeInOnScroll";
import { getAllNews } from "@/lib/sanity.fetch";
import { NewsPost } from "@/lib/types";
import Container from "@/components/layout/Container";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Latest News | Rotary Club of Ely",
  description:
    "The latest news, announcements and updates from the Rotary Club of Ely.",
};


export default async function NewsPage() {
  const posts = await getAllNews();

  const pinned = posts.filter((p: NewsPost) => p.pinned);
  const regular = posts.filter((p: NewsPost) => !p.pinned);

  return (
    <>
      <InteriorHero
        eyebrow="Latest in Ely Rotary"
        title="News &amp; Announcements"
        subtitle="Updates, announcements and stories from the Rotary Club of Ely."
      />

      <main id="main-content">
        <section className="bg-off-white py-12 md:py-20">
          <Container>
            {posts.length === 0 && (
              <div className="py-20 text-center">
                <p className="text-lg font-semibold text-grey-700">
                  No posts yet
                </p>
                <p className="mt-2 text-grey-500">Check back soon.</p>
              </div>
            )}

            {/* Pinned posts */}
            {pinned.length > 0 && (
              <div className="mb-14">
                <div className="mb-6 flex items-center gap-3">
                  <span className="h-px flex-1 bg-grey-200" />
                  <p className="text-xs font-medium uppercase tracking-widest text-grey-500">
                    Pinned
                  </p>
                  <span className="h-px flex-1 bg-grey-200" />
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  {pinned.map((post: NewsPost, index: number) => (
                    <FadeInOnScroll key={post._id} delay={index * 0.08}>
                      <PinnedPostCard post={post} />
                    </FadeInOnScroll>
                  ))}
                </div>
              </div>
            )}

            {/* Regular posts */}
            {regular.length > 0 && (
              <div>
                {pinned.length > 0 && (
                  <div className="mb-8 flex items-center gap-3">
                    <span className="h-px flex-1 bg-grey-200" />
                    <p className="text-xs font-medium uppercase tracking-widest text-grey-500">
                      All Posts
                    </p>
                    <span className="h-px flex-1 bg-grey-200" />
                  </div>
                )}

                <div className="space-y-4">
                  {regular.map((post: NewsPost, index: number) => (
                    <FadeInOnScroll key={post._id} delay={index * 0.05}>
                      <NewsListItem post={post} />
                    </FadeInOnScroll>
                  ))}
                </div>
              </div>
            )}
          </Container>
        </section>
      </main>
    </>
  );
}

// ─── Pinned post card ──────────────────────────────────────────────────────────

function PinnedPostCard({ post }: { post: NewsPost }) {
  const imageSrc = post.image
    ? urlForImage(post.image)?.width(800).height(450).url()
    : null;

  return (
    <Link
      href={`/news/${post.slug.current}`}
      className="group block rounded-xl bg-white shadow-sm border-l-4 border-rotary-gold overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rotary-gold"
    >
      {imageSrc && (
        <div className="relative h-52 w-full overflow-hidden">
          <Image
            src={imageSrc}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      )}
      <div className="p-6">
        <div className="mb-2 flex items-center gap-2">
          <span className="inline-block rounded-full bg-rotary-gold/15 px-2.5 py-0.5 text-xs font-semibold text-rotary-gold-dark">
            Pinned
          </span>
          <span className="text-xs text-grey-500">
            {new Date(post.date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
        <h2 className="font-heading text-xl font-bold text-grey-900 leading-snug group-hover:text-rotary-blue transition-colors">
          {post.title}
        </h2>

        <div className="mt-4 flex items-center gap-1 text-sm font-medium text-rotary-blue">
          Read more
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
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
        </div>
      </div>
    </Link>
  );
}

// ─── Regular list item ─────────────────────────────────────────────────────────

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
      {/* Thumbnail or avatar */}
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

      {/* Content */}
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

      {/* Arrow */}
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
