/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import FadeInOnScroll from "@/components/animation/FadeInOnScroll";

interface ContributionCardProps {
  contribution: {
    _id: string;
    title?: string;
    slug: { current: string };
    date: string;
    amount?: string;
    summary: string;
    recipient: string;
    image?: any;
  };
  index?: number;
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function ContributionCard({
  contribution,
  index = 0,
}: ContributionCardProps) {
  const imageSrc = contribution.image
    ? urlForImage(contribution.image)?.width(800).height(500).url()
    : null;

  return (
    <FadeInOnScroll delay={index * 0.08}>
      <Link
        href={`/impact/${contribution.slug.current}`}
        className="group block h-full rounded-xl bg-white shadow-sm border border-grey-200 overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rotary-gold"
      >
        {/* Image or fallback */}
        <div className="relative h-48 w-full overflow-hidden bg-grey-100">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={contribution.recipient}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-rotary-blue/10 to-rotary-blue/5">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rotary-blue/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-rotary-blue/40"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
            </div>
          )}

          {/* Amount badge */}
          {contribution.amount && (
            <div className="absolute top-3 right-3 rounded-full bg-rotary-gold px-3 py-1 text-xs font-semibold text-grey-900 shadow-sm">
              {contribution.amount}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="mb-1 text-xs font-medium uppercase tracking-wider text-grey-700">
            {formatDate(contribution.date)}
          </p>
          <h3 className="font-heading text-lg font-semibold text-grey-900 leading-snug mb-2 group-hover:text-rotary-blue transition-colors">
            {contribution.recipient}
          </h3>
          <p className="text-sm text-grey-600 leading-relaxed line-clamp-2">
            {contribution.summary}
          </p>

          <div className="mt-4 flex items-center gap-1 text-sm font-medium text-rotary-blue">
            Read the story
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
    </FadeInOnScroll>
  );
}
