import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import InteriorHero from "@/components/ui/InteriorHero";
import FadeInOnScroll from "@/components/animation/FadeInOnScroll";
import { getAllNews } from "@/lib/sanity.fetch";
import type { NewsPost } from "@/lib/types";
import Container from "@/components/layout/Container";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "News & Announcements | Rotary Club of Ely",
  description:
    "Read the latest news, announcements, events and community stories from the Rotary Club of Ely.",
  openGraph: {
    title: "News & Announcements | Rotary Club of Ely",
    description:
      "Read the latest news, announcements, events and community stories from the Rotary Club of Ely.",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
};

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
  announcement: "Announcements",
  event: "Events",
  "community-story": "Community Stories",
};

const FILTERS: Array<{ label: string; href: string; category?: NewsCategory }> =
  [
    { label: "All", href: "/news" },
    { label: "News", href: "/news?category=news", category: "news" },
    {
      label: "Announcements",
      href: "/news?category=announcement",
      category: "announcement",
    },
    { label: "Events", href: "/news?category=event", category: "event" },
    {
      label: "Community Stories",
      href: "/news?category=community-story",
      category: "community-story",
    },
  ];

interface NewsPageProps {
  searchParams?: Promise<{ category?: string }>;
}

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const params = await searchParams;
  const selectedCategory = isNewsCategory(params?.category)
    ? params?.category
    : undefined;
  const posts = ((await getAllNews()) ?? []) as EnhancedNewsPost[];
  const visiblePosts = selectedCategory
    ? posts.filter((post) => post.category === selectedCategory)
    : posts;

  const featured =
    visiblePosts.find((post) => post.featured) ??
    visiblePosts.find((post) => post.pinned) ??
    visiblePosts[0];

  const pinned = visiblePosts.filter(
    (post) => post.pinned && post._id !== featured?._id,
  );
  const regular = visiblePosts.filter(
    (post) => post._id !== featured?._id && !post.pinned,
  );

  return (
    <>
      <InteriorHero
        eyebrow="Latest in Ely Rotary"
        title="News & Announcements"
        subtitle="Updates, announcements, events and stories from the Rotary Club of Ely."
      />

      <main id="main-content">
        <section className="relative overflow-hidden bg-off-white py-12 md:py-20">
          <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-[#17458F]/5 blur-3xl" />
          <div className="absolute bottom-10 right-0 h-80 w-80 rounded-full bg-[#F7A81B]/10 blur-3xl" />

          <Container>
            <div className="relative">
              <FilterBar selectedCategory={selectedCategory} />

              {visiblePosts.length === 0 ? (
                <EmptyState selectedCategory={selectedCategory} />
              ) : (
                <>
                  {featured && (
                    <FadeInOnScroll>
                      <LeadStory post={featured} />
                    </FadeInOnScroll>
                  )}

                  {pinned.length > 0 && (
                    <section
                      className="mt-12"
                      aria-labelledby="pinned-news-heading"
                    >
                      <SectionDivider
                        id="pinned-news-heading"
                        label="Pinned updates"
                      />
                      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                        {pinned.map((post, index) => (
                          <FadeInOnScroll key={post._id} delay={index * 0.06}>
                            <PinnedPostCard post={post} />
                          </FadeInOnScroll>
                        ))}
                      </div>
                    </section>
                  )}

                  {regular.length > 0 && (
                    <section
                      className="mt-12"
                      aria-labelledby="all-news-heading"
                    >
                      <SectionDivider
                        id="all-news-heading"
                        label={
                          selectedCategory
                            ? CATEGORY_LABELS[selectedCategory]
                            : "More updates"
                        }
                      />
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {regular.map((post, index) => (
                          <FadeInOnScroll key={post._id} delay={index * 0.04}>
                            <NewsCard post={post} />
                          </FadeInOnScroll>
                        ))}
                      </div>
                    </section>
                  )}
                </>
              )}
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}

function isNewsCategory(value?: string): value is NewsCategory {
  return (
    value === "news" ||
    value === "announcement" ||
    value === "event" ||
    value === "community-story"
  );
}

function FilterBar({ selectedCategory }: { selectedCategory?: NewsCategory }) {
  return (
    <nav aria-label="News categories" className="mb-8 overflow-x-auto pb-2">
      <div className="flex min-w-max gap-2 rounded-full border border-[#17458F]/10 bg-white/80 p-2 shadow-sm backdrop-blur-sm">
        {FILTERS.map((filter) => {
          const active =
            filter.category === selectedCategory ||
            (!filter.category && !selectedCategory);

          return (
            <Link
              key={filter.href}
              href={filter.href}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F7A81B] ${
                active
                  ? "bg-[#17458F] text-white shadow-sm"
                  : "text-grey-700 hover:bg-[#17458F]/8 hover:text-[#17458F]"
              }`}
            >
              {filter.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

function SectionDivider({ id, label }: { id: string; label: string }) {
  return (
    <div className="mb-6 flex items-center gap-4">
      <h2
        id={id}
        className="shrink-0 text-xs font-bold uppercase tracking-[0.2em] text-grey-700"
      >
        {label}
      </h2>
      <span className="h-px flex-1 bg-grey-200" />
    </div>
  );
}

function LeadStory({ post }: { post: EnhancedNewsPost }) {
  const imageSrc = buildImageUrl(post, 1200, 760);

  return (
    <Link
      href={`/news/${post.slug.current}`}
      className="group grid overflow-hidden rounded-[2rem] bg-[#07172f] text-white shadow-xl shadow-[#17458F]/10 transition duration-300 hover:-translate-y-1 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F7A81B] lg:grid-cols-2"
    >
      <div className="relative min-h-[320px] overflow-hidden lg:min-h-[520px]">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={post.image?.alt ?? post.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="image-polish object-cover transition duration-700 group-hover:scale-105"
          />
        ) : (
          <BrandedImageFallback title={post.title} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07172f]/70 via-transparent to-transparent lg:bg-gradient-to-r" />
      </div>

      <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
        <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em]">
          <span className="rounded-full bg-[#F7A81B] px-3 py-1 text-[#1A1918]">
            {post.featured ? "Featured" : getCategoryLabel(post.category)}
          </span>
          {post.pinned && (
            <span className="rounded-full bg-white/10 px-3 py-1 text-white">
              Pinned
            </span>
          )}
          <span className="text-white/70">{formatDate(post)}</span>
        </div>

        <h2 className="font-heading text-[clamp(2rem,5vw,4.75rem)] font-bold leading-[0.95] tracking-tight">
          {post.title}
        </h2>

        {post.excerpt && (
          <p className="mt-5 max-w-xl text-base leading-7 text-white/80 sm:text-lg">
            {post.excerpt}
          </p>
        )}

        <span className="mt-8 inline-flex w-fit items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#17458F] transition duration-200 group-hover:bg-[#F7A81B] group-hover:text-[#1A1918]">
          Read the update
          <span
            className="transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          >
            →
          </span>
        </span>
      </div>
    </Link>
  );
}

function PinnedPostCard({ post }: { post: EnhancedNewsPost }) {
  return (
    <Link
      href={`/news/${post.slug.current}`}
      className="group block rounded-[1.5rem] border border-[#F7A81B]/30 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F7A81B]"
    >
      <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-semibold">
        <span className="rounded-full bg-[#F7A81B]/20 px-3 py-1 text-[#6f4700]">
          Pinned
        </span>
        <span className="rounded-full bg-[#17458F]/10 px-3 py-1 text-[#17458F]">
          {getCategoryLabel(post.category)}
        </span>
        <span className="text-grey-700">{formatDate(post)}</span>
      </div>
      <h3 className="font-heading text-2xl font-bold leading-tight text-grey-900 transition-colors group-hover:text-[#17458F]">
        {post.title}
      </h3>
      {post.excerpt && (
        <p className="mt-3 line-clamp-3 leading-7 text-grey-700">
          {post.excerpt}
        </p>
      )}
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#17458F]">
        Read more{" "}
        <span className="transition-transform group-hover:translate-x-1">
          →
        </span>
      </span>
    </Link>
  );
}

function NewsCard({ post }: { post: EnhancedNewsPost }) {
  const imageSrc = buildImageUrl(post, 640, 460);

  return (
    <Link
      href={`/news/${post.slug.current}`}
      className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-grey-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#F7A81B]/60 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F7A81B]"
    >
      <div className="relative aspect-[16/11] overflow-hidden bg-[#17458F]/10">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={post.image?.alt ?? post.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="image-polish object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <BrandedImageFallback title={post.title} />
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-semibold">
          <span className="rounded-full bg-[#17458F]/10 px-3 py-1 text-[#17458F]">
            {getCategoryLabel(post.category)}
          </span>
          <span className="text-grey-700">{formatDate(post)}</span>
        </div>
        <h3 className="font-heading text-xl font-bold leading-tight text-grey-900 transition-colors group-hover:text-[#17458F]">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="mt-3 line-clamp-3 leading-7 text-grey-700">
            {post.excerpt}
          </p>
        )}
        <span className="mt-auto pt-5 text-sm font-semibold text-[#17458F]">
          Read more{" "}
          <span className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}

function EmptyState({ selectedCategory }: { selectedCategory?: NewsCategory }) {
  return (
    <div className="rounded-[2rem] border border-grey-200 bg-white px-6 py-20 text-center shadow-sm">
      <p className="font-heading text-2xl font-bold text-grey-900">
        No posts found
      </p>
      <p className="mx-auto mt-3 max-w-xl leading-7 text-grey-700">
        {selectedCategory
          ? `There are no ${CATEGORY_LABELS[selectedCategory].toLowerCase()} to show yet.`
          : "There are no news posts to show yet. Check back soon for updates from Ely Rotary."}
      </p>
      {selectedCategory && (
        <Link
          href="/news"
          className="mt-6 inline-flex items-center rounded-full bg-[#17458F] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#123873] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F7A81B]"
        >
          View all news
        </Link>
      )}
    </div>
  );
}

function buildImageUrl(
  post: EnhancedNewsPost,
  width: number,
  height: number,
): string | null {
  if (!post.image?.asset?._ref) return null;

  try {
    return urlForImage(post.image)
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
