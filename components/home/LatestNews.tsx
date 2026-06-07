import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import FadeInOnScroll from "@/components/animation/FadeInOnScroll";
import SectionHeading from "@/components/ui/SectionHeading";
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
  ctaLabel?: string;
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

function BrandedImageFallback({ title }: { title: string }) {
  const initial = title?.charAt(0)?.toUpperCase() ?? "E";

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#17458F]">
      <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full border border-white/15" />
      <div className="absolute -bottom-16 -left-12 h-48 w-48 rounded-full bg-[#F7A81B]/20 blur-2xl" />
      <div className="absolute inset-x-0 bottom-0 h-1 bg-[#F7A81B]" />
      <div className="relative grid h-20 w-20 place-items-center rounded-full border border-white/20 bg-white/10 text-white shadow-2xl backdrop-blur-sm">
        <span className="font-heading text-3xl font-bold">{initial}</span>
      </div>
    </div>
  );
}

function MetaRow({ post }: { post: EnhancedNewsPost }) {
  return (
    <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-medium">
      <span className="rounded-full bg-[#17458F]/10 px-3 py-1 text-[#17458F]">
        {getCategoryLabel(post.category)}
      </span>
      {post.pinned && (
        <span className="rounded-full bg-[#F7A81B]/20 px-3 py-1 text-[#6f4700]">
          Pinned
        </span>
      )}
      <span className="text-grey-700">{formatDate(post)}</span>
    </div>
  );
}

function FeaturedPost({ post }: { post: EnhancedNewsPost }) {
  const imageUrl = buildImageUrl(post.image, 1100, 760);

  return (
    <Link
      href={`/news/${post.slug.current}`}
      className="group relative grid overflow-hidden rounded-[1.75rem] bg-[#0f2f65] text-white shadow-xl shadow-[#17458F]/10 outline-none transition duration-300 hover:-translate-y-1 hover:shadow-2xl focus-visible:ring-2 focus-visible:ring-[#F7A81B] lg:min-h-[540px]"
    >
      <div className="absolute inset-0">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={post.image?.alt ?? post.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-cover opacity-75 transition duration-700 group-hover:scale-105 group-hover:opacity-85"
          />
        ) : (
          <BrandedImageFallback title={post.title} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07172f] via-[#07172f]/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07172f]/55 via-transparent to-transparent" />
      </div>

      <div className="relative flex min-h-[440px] flex-col justify-end p-6 sm:p-8 lg:p-10">
        <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em]">
          <span className="rounded-full bg-[#F7A81B] px-3 py-1 text-[#1A1918]">
            {post.featured ? "Featured" : getCategoryLabel(post.category)}
          </span>
          {post.pinned && (
            <span className="rounded-full bg-white/15 px-3 py-1 text-white backdrop-blur-sm">
              Pinned
            </span>
          )}
          <span className="text-white/75">{formatDate(post)}</span>
        </div>

        <h3 className="max-w-2xl font-heading text-[clamp(2rem,5vw,4.5rem)] font-bold leading-[0.95] tracking-tight">
          {post.title}
        </h3>

        {post.excerpt && (
          <p className="mt-5 max-w-xl font-body text-base leading-7 text-white/85 sm:text-lg">
            {post.excerpt}
          </p>
        )}

        <div className="mt-7 inline-flex w-fit items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#17458F] transition duration-200 group-hover:bg-[#F7A81B] group-hover:text-[#1A1918]">
          Read the story
          <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}

function CompactPost({ post }: { post: EnhancedNewsPost }) {
  const imageUrl = buildImageUrl(post.image, 360, 300);

  return (
    <Link
      href={`/news/${post.slug.current}`}
      className="group grid grid-cols-[6rem_1fr] gap-4 rounded-[1.25rem] border border-grey-200/70 bg-white p-3 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#F7A81B]/70 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F7A81B] sm:grid-cols-[8rem_1fr]"
    >
      <div className="relative min-h-28 overflow-hidden rounded-[1rem] bg-[#17458F]/10">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={post.image?.alt ?? post.title}
            fill
            sizes="128px"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <BrandedImageFallback title={post.title} />
        )}
      </div>

      <div className="min-w-0 py-1 pr-1">
        <MetaRow post={post} />
        <h4 className="font-heading text-lg font-bold leading-snug text-grey-900 transition-colors duration-200 group-hover:text-[#17458F]">
          {post.title}
        </h4>
        {post.excerpt && (
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-grey-700">
            {post.excerpt}
          </p>
        )}
      </div>
    </Link>
  );
}

export default function LatestNews({ posts }: LatestNewsProps) {
  const enhancedPosts = (posts ?? []) as EnhancedNewsPost[];
  if (enhancedPosts.length === 0) return null;

  const featured =
    enhancedPosts.find((post) => post.featured) ??
    enhancedPosts.find((post) => post.pinned) ??
    enhancedPosts[0];

  const rest = enhancedPosts.filter((post) => post._id !== featured._id).slice(0, 4);

  return (
    <section
      aria-labelledby="latest-news-heading"
      className="relative overflow-hidden bg-white py-[clamp(4rem,8vw,7rem)]"
    >
      <div className="absolute left-1/2 top-0 h-72 w-[44rem] -translate-x-1/2 rounded-full bg-[#17458F]/5 blur-3xl" />
      <div className="absolute bottom-10 right-0 h-64 w-64 rounded-full bg-[#F7A81B]/10 blur-3xl" />

      <div className="relative mx-auto max-w-[1280px] px-[clamp(1rem,2vw,2rem)]" id="news">
        <FadeInOnScroll>
          <SectionHeading
            eyebrow="Latest in Ely Rotary"
            title="News & Announcements"
            subtitle="Club updates, community stories and opportunities to get involved in Ely."
          />
        </FadeInOnScroll>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch">
          <div className="lg:col-span-7">
            <FadeInOnScroll>
              <FeaturedPost post={featured} />
            </FadeInOnScroll>
          </div>

          {rest.length > 0 && (
            <div className="flex flex-col gap-4 lg:col-span-5">
              {rest.map((post, index) => (
                <FadeInOnScroll key={post._id} delay={index * 0.08}>
                  <CompactPost post={post} />
                </FadeInOnScroll>
              ))}
            </div>
          )}
        </div>

        <FadeInOnScroll>
          <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-[1.25rem] border border-[#17458F]/10 bg-[#f8fbff] px-5 py-5 text-center sm:flex-row sm:text-left">
            <p className="max-w-2xl text-sm leading-6 text-grey-700">
              Want to see what Ely Rotary has been doing recently? Browse every update, announcement and community story.
            </p>
            <Link
              href="/news"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#17458F] px-5 py-3 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#123873] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F7A81B]"
            >
              View all news
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  );
}
