import Image from "next/image";
import Link from "next/link";
import FadeInOnScroll from "@/components/animation/FadeInOnScroll";
import Container from "@/components/layout/Container";
import { urlForImage } from "@/sanity/lib/image";
import type { NewsPost } from "@/lib/types";

interface LatestNewsProps {
  posts: NewsPost[];
}

type NewsCategory = "news" | "announcement" | "event" | "community-story";

type EnhancedNewsPost = NewsPost & {
  excerpt?: string;
  category?: NewsCategory;
  publishedAt?: string;
  date?: string;
  featured?: boolean;
  pinned?: boolean;
};

const CATEGORY_LABELS: Record<NewsCategory, string> = {
  news: "News",
  announcement: "Announcement",
  event: "Event",
  "community-story": "Community Story",
};

function buildImageUrl(
  image: EnhancedNewsPost["image"],
  width: number,
  height: number,
): string | null {
  if (!image?.asset?._ref) return null;

  try {
    return urlForImage(image)
      .width(width)
      .height(height)
      .fit("crop")
      .auto("format")
      .url();
  } catch {
    return null;
  }
}

function formatDate(post: EnhancedNewsPost): string {
  const value = post.publishedAt ?? post.date;

  if (!value) return "Latest update";

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

function getCategoryLabel(category?: NewsCategory): string {
  return CATEGORY_LABELS[category ?? "news"];
}

function getPostHref(post: EnhancedNewsPost) {
  return `/news/${post.slug.current}`;
}

function ImageFallback({ title }: { title: string }) {
  const initial = title?.charAt(0)?.toUpperCase() ?? "E";

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-rotary-blue">
      <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full border-[18px] border-white/10" />
      <div className="absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-rotary-gold/20 blur-3xl" />
      <div className="absolute inset-x-0 bottom-0 h-1 bg-rotary-gold" />

      <div className="relative grid h-20 w-20 place-items-center rounded-full border border-white/20 bg-white/10 text-white shadow-2xl backdrop-blur-sm">
        <span className="font-heading text-3xl font-bold">{initial}</span>
      </div>
    </div>
  );
}

function FeaturedArticle({ post }: { post: EnhancedNewsPost }) {
  const imageUrl = buildImageUrl(post.image, 1200, 850);

  return (
    <Link
      href={getPostHref(post)}
      className="group relative grid min-h-[560px] overflow-hidden rounded-[2rem] bg-slate-950 shadow-lg lg:min-h-[620px]"
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={post.image?.alt || post.title}
          fill
          className="image-polish object-cover opacity-80 transition duration-700 group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 58vw"
        />
      ) : (
        <ImageFallback title={post.title} />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/55 via-transparent to-transparent" />

      <div className="relative mt-auto p-7 sm:p-10">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-rotary-gold px-4 py-2 text-xs font-black uppercase tracking-wide text-slate-950">
            Featured update
          </span>

          {post.pinned && (
            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wide text-white backdrop-blur">
              Pinned
            </span>
          )}

          <span className="text-sm font-semibold text-white/75">
            {formatDate(post)}
          </span>
        </div>

        <h3 className="mt-5 max-w-3xl font-heading text-4xl font-black leading-tight text-white sm:text-5xl">
          {post.title}
        </h3>

        {post.excerpt && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80">
            {post.excerpt}
          </p>
        )}

        <span className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-black uppercase tracking-wide text-rotary-blue transition group-hover:bg-rotary-gold group-hover:text-slate-950">
          Read story
          <span
            aria-hidden="true"
            className="transition group-hover:translate-x-1"
          >
            →
          </span>
        </span>
      </div>
    </Link>
  );
}

function CompactArticle({
  post,
  index,
}: {
  post: EnhancedNewsPost;
  index: number;
}) {
  const imageUrl = buildImageUrl(post.image, 500, 380);

  return (
    <FadeInOnScroll delay={index * 0.08}>
      <Link
        href={getPostHref(post)}
        className="group grid gap-4 rounded-3xl border border-grey-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:grid-cols-[160px_1fr]"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-grey-100 sm:aspect-auto">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={post.image?.alt || post.title}
              fill
              className="image-polish object-cover transition duration-500 group-hover:scale-105"
              sizes="160px"
            />
          ) : (
            <ImageFallback title={post.title} />
          )}
        </div>

        <div className="flex flex-col py-1">
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
            <span className="rounded-full bg-rotary-blue/10 px-3 py-1 text-rotary-blue">
              {getCategoryLabel(post.category)}
            </span>
            <span className="text-grey-700">{formatDate(post)}</span>
          </div>

          <h4 className="mt-3 font-heading text-xl font-black leading-snug text-grey-900 transition group-hover:text-rotary-blue">
            {post.title}
          </h4>

          {post.excerpt && (
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-grey-700">
              {post.excerpt}
            </p>
          )}

          <span className="mt-auto pt-4 text-sm font-bold text-rotary-blue">
            Read more →
          </span>
        </div>
      </Link>
    </FadeInOnScroll>
  );
}

export default function LatestNews({ posts }: LatestNewsProps) {
  const enhancedPosts = (posts ?? []) as EnhancedNewsPost[];

  if (enhancedPosts.length === 0) return null;

  const featured =
    enhancedPosts.find((post) => post.featured) ??
    enhancedPosts.find((post) => post.pinned) ??
    enhancedPosts[0];

  const rest = enhancedPosts
    .filter((post) => post._id !== featured._id)
    .slice(0, 4);

  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-28">
      <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-rotary-gold/10 blur-3xl" />
      <div className="absolute -left-32 bottom-20 h-96 w-96 rounded-full bg-rotary-blue/5 blur-3xl" />

      <Container>
        <div className="relative">
          <div className="mb-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-rotary-gold">
                Latest News
              </p>

              <h2 className="font-heading text-4xl font-black leading-tight text-grey-900 md:text-6xl">
                Ely Rotary News
                <span className="block text-rotary-blue">& Announcements</span>
              </h2>
            </div>

            <div className="max-w-2xl lg:justify-self-end">
              <p className="text-lg leading-relaxed text-grey-700">
                Club updates, announcements and stories from Rotary Club of Ely
                — from upcoming activities and fundraising milestones to the
                people and projects behind our service.
              </p>

              <Link
                href="/news"
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-rotary-blue px-6 py-3 text-sm font-black uppercase tracking-wide text-rotary-blue transition hover:bg-rotary-blue hover:text-white"
              >
                View all news
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.35fr_0.95fr]">
            <FadeInOnScroll>
              <FeaturedArticle post={featured} />
            </FadeInOnScroll>

            {rest.length > 0 && (
              <div className="grid content-start gap-4">
                {rest.map((post, index) => (
                  <CompactArticle key={post._id} post={post} index={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
