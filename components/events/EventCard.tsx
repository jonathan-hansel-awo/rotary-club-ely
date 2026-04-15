/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import Badge from "@/components/ui/Badge";
import FadeInOnScroll from "@/components/animation/FadeInOnScroll";

interface EventCardProps {
  event: {
    _id: string;
    title: string;
    slug: { current: string };
    dateStart: string;
    dateEnd?: string;
    category: string;
    location?: string;
    heroImage?: any;
    featured?: boolean;
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

function formatTime(dateString: string) {
  return new Date(dateString).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function EventCard({ event, index = 0 }: EventCardProps) {
  const imageSrc = event.heroImage
    ? urlForImage(event.heroImage)?.width(800).height(450).url()
    : null;

  const isUpcoming = new Date(event.dateStart) >= new Date();

  return (
    <FadeInOnScroll delay={index * 0.08}>
      <Link
        href={`/events/${event.slug.current}`}
        className="group block h-full rounded-xl bg-white shadow-sm border border-grey-200 overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rotary-gold"
      >
        {/* Image */}
        <div className="relative h-48 w-full overflow-hidden bg-grey-100">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={event.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            // Branded fallback when no image is available
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
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
          )}

          {/* Gradient overlay for badge legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

          {/* Category badge — bottom left of image */}
          <div className="absolute bottom-3 left-3">
            <Badge variant="category">{event.category}</Badge>
          </div>

          {/* Status badge — bottom right of image */}
          <div className="absolute bottom-3 right-3">
            <Badge variant={isUpcoming ? "upcoming" : "past"}>
              {isUpcoming ? "Upcoming" : "Past"}
            </Badge>
          </div>
        </div>

        {/* Card body */}
        <div className="p-5">
          <h3 className="font-heading text-lg font-semibold text-grey-900 leading-snug mb-2 group-hover:text-rotary-blue transition-colors line-clamp-2">
            {event.title}
          </h3>

          {/* Date */}
          <div className="flex items-center gap-1.5 text-sm text-grey-500 mb-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 shrink-0 text-grey-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>
              {formatDate(event.dateStart)}{" "}
              <span className="text-grey-400">
                at {formatTime(event.dateStart)}
              </span>
            </span>
          </div>

          {/* Location */}
          {event.location && (
            <div className="flex items-center gap-1.5 text-sm text-grey-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 shrink-0 text-grey-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="truncate">{event.location}</span>
            </div>
          )}

          {/* Read more link */}
          <div className="mt-4 flex items-center gap-1 text-sm font-medium text-rotary-blue">
            View event
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
