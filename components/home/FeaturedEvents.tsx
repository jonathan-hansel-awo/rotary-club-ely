/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import StaggerChildren from "@/components/animation/StaggerChildren";
import FadeInOnScroll from "@/components/animation/FadeInOnScroll";
import Card from "@/components/ui/Card";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "../ui/Badge";

interface Event {
  _id: string;
  title: string;
  slug: { current: string };
  dateStart: string;
  category: string;
  location?: string;
  heroImage: {
    asset: { _ref: string };
    alt?: string;
    hotspot?: { x: number; y: number };
    crop?: object;
  };
}

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
              <p className="font-body text-[#8A8681] text-sm mb-6">
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
            {events.map((event) => (
              <Card
                key={event._id}
                title={event.title}
                href={`/events/${event.slug.current}`}
                image={event.heroImage}
                imageAlt={event.heroImage?.alt ?? event.title}
                meta={formatEventMeta(event.dateStart, event.location)}
                badge={<Badge variant="category">{event.category}</Badge>}
              />
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
