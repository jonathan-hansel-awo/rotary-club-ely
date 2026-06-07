/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import StaggerChildren from "@/components/animation/StaggerChildren";
import FadeInOnScroll from "@/components/animation/FadeInOnScroll";
import Card from "@/components/ui/Card";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "../ui/Badge";
import type { Event, SanityImage } from "@/lib/types";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import { buildImageUrl } from "@/lib/utilities";

interface FeaturedEventsProps {
  events: Event[];
}

export default function FeaturedEvents({ events }: FeaturedEventsProps) {



  return (
    <section
      aria-labelledby="featured-events-heading"
      className="
        bg-white
        py-[clamp(3rem,6vw,6rem)]
      "
    >
      <div
        className="max-w-[1280px] mx-auto px-[clamp(1rem,2vw,2rem)]"
        id="featured-events-heading"
      >
        {/* Section heading */}
        <FadeInOnScroll>
          <SectionHeading
            className="pb-6"
            eyebrow="Upcoming Events"
            title="What's Happening in Ely"
            subtitle="Join us for our upcoming community events — from summer festivals to winter fireworks, there's something for everyone."
          />
        </FadeInOnScroll>

        {/* Empty state */}
        {events.length === 0 && (
          <FadeInOnScroll>
            <div
              className="
              rounded-[0.75rem] border-2 border-dashed border-[#E2E0DB]
              py-16 px-8 text-center
            "
            >
              <p className="font-heading font-semibold text-[#4A4845] text-lg mb-2">
                No upcoming events right now
              </p>
              <p className="font-body text-[#4A4845] text-sm mb-6">
                Check back soon — we're always planning something new.
              </p>
              <Link
                href="/events"
                className="
                  font-body font-medium text-sm text-[#0067C8]
                  hover:text-[#17458F] transition-colors duration-150
                  underline underline-offset-2
                "
              >
                Browse past events →
              </Link>
            </div>
          </FadeInOnScroll>
        )}

        {/* Card grid */}
        {events.length > 0 && (
          <StaggerChildren
            className="
            grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
            gap-6 mb-10
          "
          >
            {events.map((event, index) => (
              <article key={index} className="group overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-2xl">
                <div className="relative h-64">
                  <Image
                    src={buildImageUrl(event.heroImage) || "/placeholder-event.jpg"}
                    alt={event.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute left-5 top-5 rounded-2xl bg-white px-4 py-3 text-center shadow-lg">
                    <div className="text-2xl font-black text-[#17458F]">
                      {17}
                    </div>
                    <div className="text-xs font-bold uppercase text-slate-500">
                      {7}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-black text-[#061D3A]">
                    {event.title}
                  </h3>
                  <p className="mt-3 text-slate-600">{event.location}</p>

                  <a className="mt-6 inline-flex font-bold text-[#17458F]">
                    Read more →
                  </a>
                </div>
              </article>
            ))}
          </StaggerChildren>
        )}

        {/* View all link */}
        {events.length > 0 && (
          <FadeInOnScroll>
            <div className="text-center">
              <Link
                href="/events"
                className="
                  inline-flex items-center gap-2
                  font-body font-medium text-[0.95rem]
                  text-[#0067C8] hover:text-[#17458F]
                  transition-colors duration-150
                  group
                "
              >
                View all events
                <span
                  className="
                    inline-block transition-transform duration-200
                    group-hover:translate-x-1
                  "
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>
            </div>
          </FadeInOnScroll>
        )}
      </div>
    </section>
  );
}

function formatEventMeta(dateStart: string, location?: string): string {
  const formatted = new Date(dateStart).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return location ? `${formatted} · ${location}` : formatted;
}
