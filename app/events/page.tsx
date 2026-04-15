import { Suspense } from "react";
import InteriorHero from "@/components/ui/InteriorHero";
import EventFilter from "@/components/events/EventFilter"
import type { Metadata } from "next";
import { getAllEvents } from "@/lib/sanity.fetch";
import EventCard from "@/components/events/EventCard";
import Container from "@/components/layout/Container";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Events",
  description:
    "Upcoming and past events organised by the Rotary Club of Ely — from Aquafest to Fireworks and community activities.",
  openGraph: {
    title: "Events | Rotary Club of Ely",
    description:
      "From Aquafest to Fireworks — find upcoming and past events organised by the Rotary Club of Ely.",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
};

interface EventsPageProps {
  searchParams: Promise<{ category?: string; status?: string }>;
}

async function EventsList({ searchParams }: EventsPageProps) {
  const { category, status } = await searchParams;
  const allEvents = await getAllEvents();

  const filtered = allEvents.filter((event) => {
    const now = new Date();
    const eventDate = new Date(event.dateStart);
    const isUpcoming = eventDate >= now;
    const eventStatus = isUpcoming ? "Upcoming" : "Past";

    const categoryMatch =
      !category || category === "All" || event.category === category;
    const statusMatch = !status || status === "All" || eventStatus === status;

    return categoryMatch && statusMatch;
  });

  if (filtered.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="text-xl font-heading font-semibold text-grey-700">
          No events found
        </p>
        <p className="mt-2 text-grey-500">Try adjusting the filters above.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {filtered.map((event, index) => (
        <EventCard key={event._id} event={event} index={index} />
      ))}
    </div>
  );
}

export default function EventsPage(props: EventsPageProps) {
  return (
    <>
      <InteriorHero
        eyebrow="What's On"
        title="Events in Ely"
        subtitle="From our flagship Aquafest to community clean-ups and the annual Fireworks display — there's always something happening."
      />

      <Suspense
        fallback={<div className="h-16 bg-white border-b border-grey-200" />}
      >
        <EventFilter />
      </Suspense>

      <main id="main-content">
        <section className="bg-off-white py-16 md:py-20">
          <Container>
            <Suspense
              fallback={
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="h-80 rounded-xl bg-grey-200 animate-pulse"
                    />
                  ))}
                </div>
              }
            >
              <EventsList searchParams={props.searchParams} />
            </Suspense>
          </Container>
        </section>
      </main>
    </>
  );
}
