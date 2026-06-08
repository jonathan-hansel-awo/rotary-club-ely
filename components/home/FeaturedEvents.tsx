import Link from "next/link";
import EventCard from "@/components/events/EventCard";
import type { Event } from "@/lib/types";

interface FeaturedEventsProps {
  events: Event[];
}

export default function FeaturedEvents({ events }: FeaturedEventsProps) {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(247,168,0,0.22),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(1,104,183,0.35),transparent_36%)]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-rotary-gold">
              What&apos;s on
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              Events that bring Ely together.
            </h2>

            <p className="mt-5 max-w-xl text-lg leading-8 text-white/75">
              From Aquafest to the Fireworks display, our events raise funds,
              create memories, and support good causes across Ely and beyond.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-wide text-rotary-gold">
              Planning ahead?
            </p>
            <p className="mt-2 text-balance text-2xl font-bold">
              Some annual events are announced by month first, then updated with
              the exact day closer to the time.
            </p>
          </div>
        </div>

        {events.length > 0 ? (
          <>
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event, index) => (
                <EventCard key={event._id} event={event} index={index} />
              ))}
            </div>

            <div className="mt-10 flex justify-center">
              <Link
                href="/events"
                className="rounded-full bg-rotary-gold px-7 py-3 text-sm font-black uppercase tracking-wide text-slate-950 transition hover:bg-white"
              >
                View all events
              </Link>
            </div>
          </>
        ) : (
          <div className="mt-12 rounded-3xl border border-white/10 bg-white/10 p-10 text-center">
            <h3 className="text-2xl font-black">No upcoming events yet</h3>
            <p className="mt-3 text-white/70">
              Check back soon — the club is always planning something for the
              community.
            </p>
            <Link
              href="/events?status=Past"
              className="mt-6 inline-flex rounded-full bg-rotary-gold px-6 py-3 text-sm font-bold text-slate-950"
            >
              Browse past events
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
