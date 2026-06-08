import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import EventCard from "@/components/events/EventCard";
import EventFilter from "@/components/events/EventFilter";
import InteriorHero from "@/components/ui/InteriorHero";
import { getAllEvents } from "@/lib/sanity.fetch";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Events",
  description:
    "Upcoming and past events organised by the Rotary Club of Ely — from Aquafest to Fireworks and community activities.",
};

interface EventsPageProps {
  searchParams: Promise<{
    category?: string;
    status?: string;
  }>;
}

export default async function EventsPage({ searchParams }: EventsPageProps) {
  const { category, status } = await searchParams;
  const allEvents = await getAllEvents();

  const filtered = allEvents.filter((event) => {
    const resolvedStatus =
      event.status ??
      (event.dateStart && new Date(event.dateStart) < new Date()
        ? "past"
        : (event.eventStatus ?? "upcoming"));

    const categoryMatch =
      !category || category === "All" || event.category === category;

    const statusMatch =
      !status ||
      status === "All" ||
      resolvedStatus.toLowerCase() === status.toLowerCase();

    return categoryMatch && statusMatch;
  });

  return (
    <>
      <InteriorHero
        eyebrow="Events"
        title="Join us at our next community event"
        subtitle="Explore upcoming fundraisers, family days, social events and annual Ely traditions organised or supported by the Rotary Club of Ely."
      />

      <section className="bg-slate-50 py-16">
        <Container>
          <div className="mb-10 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <EventFilter />
          </div>

          {filtered.length > 0 ? (
            <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((event, index) => (
                <EventCard key={event._id} event={event} index={index} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
              <h2 className="text-2xl font-black text-slate-950">
                No events found
              </h2>
              <p className="mt-3 text-slate-600">
                Try changing the category or status filter.
              </p>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
