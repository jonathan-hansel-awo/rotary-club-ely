import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import FadeInOnScroll from "@/components/animation/FadeInOnScroll";
import SectionHeading from "@/components/ui/SectionHeading";
import type { NewsPost } from "@/lib/types";

interface LatestNewsProps {
  posts: NewsPost[];
}

function buildImageUrl(
  image: NewsPost["image"],
  width: number,
  height: number,
): string | null {
  if (!image?.asset?._ref) return null;
  try {
    return urlForImage(image).width(width).height(height).url();
  } catch {
    return null;
  }
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function FeaturedPost({ post }: { post: NewsPost }) {
  const imageUrl = buildImageUrl(post.image, 800, 500);

  return (
    <Link
      href={`/news/${post.slug.current}`}
      className="group flex flex-col rounded-[0.75rem] overflow-hidden bg-white shadow-sm hover:shadow-card-hover transition-all duration-200 ease-out hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative w-full aspect-[16/10] overflow-hidden flex-shrink-0">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={post.image?.alt ?? post.title}
            fill
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-rotary-blue transition-transform duration-300 ease-out group-hover:scale-105" />
        )}

        {/* Pinned indicator */}
        {post.pinned && (
          <div className="absolute top-3 left-3 bg-[#F7A81B] text-[#1A1918] text-xs font-semibold font-body uppercase tracking-wider px-2.5 py-1 rounded-[0.375rem]">
            Pinned
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-1">
        <p className="font-body text-xs text-text-muted mb-2">
          {formatDate(post.date)}
        </p>
        <h3 className="font-heading font-bold text-[1.25rem] leading-snug text-text-primary mb-3 group-hover:text-rotary-blue transition-colors duration-150">
          {post.title}
        </h3>
        <span
          className="
          mt-auto inline-flex items-center gap-1
          font-body font-medium text-sm text-link
          group-hover:text-rotary-blue group-hover:gap-2
          transition-all duration-150
        "
        >
          Read more →
        </span>
      </div>
    </Link>
  );
}

function CompactPost({ post }: { post: NewsPost }) {
  const imageUrl = buildImageUrl(post.image, 160, 160);

  return (
    <Link
      href={`/news/${post.slug.current}`}
      className="
        group flex items-start gap-4 p-4
        rounded-[0.75rem] bg-white
        shadow-sm hover:shadow-md
        transition-all duration-200 ease-out
        hover:-translate-y-0.5
        border-l-2
        border-l-transparent
        hover:border-l-[#F7A81B]
      "
      style={post.pinned ? { borderLeftColor: "#F7A81B" } : undefined}
    >
      {/* Thumbnail */}
      <div className="relative w-16 h-16 rounded-[0.5rem] overflow-hidden flex-shrink-0">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={post.image?.alt ?? post.title}
            fill
            sizes="64px"
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-rotary-blue/20" />
        )}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="font-body text-xs text-text-muted mb-1">
          {formatDate(post.date)}
        </p>
        <h4
          className="
          font-heading font-semibold text-sm leading-snug
          text-text-primary group-hover:text-rotary-blue
          transition-colors duration-150
          line-clamp-2
        "
        >
          {post.title}
        </h4>
      </div>
    </Link>
  );
}

export default function LatestNews({ posts }: LatestNewsProps) {
  if (!posts || posts.length === 0) return null;

  const [featured, ...rest] = posts;

  return (
    <section
      aria-labelledby="latest-news-heading"
      className="bg-white py-[clamp(3rem,6vw,6rem)]"
    >
      <div
        className="max-w-[1280px] mx-auto px-[clamp(1rem,2vw,2rem)]"
        id="news"
      >
        <FadeInOnScroll>
          <SectionHeading
            eyebrow="Latest in Ely Rotary"
            title="News & Announcements"
            subtitle="Stay up to date with club news, announcements, and stories from our community."
          />
        </FadeInOnScroll>

        {/* Asymmetric layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Featured post — takes 3 of 5 columns */}
          <div className="lg:col-span-3">
            <FadeInOnScroll>
              <FeaturedPost post={featured} />
            </FadeInOnScroll>
          </div>

          {/* Compact posts — take 2 of 5 columns */}
          {rest.length > 0 && (
            <div className="lg:col-span-2 flex flex-col gap-4">
              {rest.map((post, index) => (
                <FadeInOnScroll key={post._id} delay={index * 0.1}>
                  <CompactPost post={post} />
                </FadeInOnScroll>
              ))}
            </div>
          )}
        </div>

        {/* View all link */}
        <FadeInOnScroll>
          <div className="text-center mt-10">
            <Link
              href="/news"
              className="
                inline-flex items-center gap-2
                font-body font-medium text-[0.95rem]
                text-[#0067C8] hover:text-[#17458F]
                transition-colors duration-150
                group
              "
            >
              View all news
              <span
                className="inline-block transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </Link>
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  );
}
