import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import Container from "@/components/layout/Container";
import { getEventBySlug } from "@/lib/sanity.fetch";
import { urlForImage } from "@/sanity/lib/image";

interface EventPageProps {
  params: Promise<{
    slug: string;
  }>;
}

function formatDate(dateStart?: string, dateLabel?: string) {
  if (dateLabel) return dateLabel;
  if (!dateStart) return "Date to be confirmed";

  return new Date(dateStart).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatTime(dateStart?: string) {
  if (!dateStart) return null;

  return new Date(dateStart).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function labelFromCategory(category: string) {
  return category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export async function generateMetadata({
  params,
}: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    return {
      title: "Event not found",
    };
  }

  return {
    title: event.title,
    description: `${event.title} — ${formatDate(
      event.dateStart,
      event.dateLabel,
    )}`,
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) notFound();

  const imageSrc = event.heroImage
    ? urlForImage(event.heroImage)?.width(1600).height(900).url()
    : null;

  const time = formatTime(event.dateStart);

  const status =
    event.status ??
    (event.dateStart && new Date(event.dateStart) < new Date()
      ? "past"
      : (event.eventStatus ?? "upcoming"));

  return (
    <>
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={event.heroImage?.alt || event.title}
              fill
              priority
              className="image-polish object-cover opacity-35"
              sizes="100vw"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-rotary-blue via-slate-950 to-slate-900" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/20" />
        </div>

        <Container className="relative py-24 sm:py-32">
          <Link
            href="/events"
            className="inline-flex text-sm font-bold text-rotary-gold hover:text-white"
          >
            ← Back to events
          </Link>

          <div className="mt-10 max-w-4xl">
            <div className="flex flex-wrap gap-3">
              <span className="rounded-full bg-rotary-gold px-4 py-2 text-xs font-black uppercase tracking-wide text-slate-950">
                {labelFromCategory(event.category)}
              </span>

              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-wide text-white">
                {status === "upcoming" ? "Upcoming" : "Past event"}
              </span>
            </div>

            <h1 className="mt-6 text-5xl font-black tracking-tight sm:text-6xl">
              {event.title}
            </h1>

            <div className="mt-8 grid gap-4 text-base font-semibold text-white/85 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.25em] text-rotary-gold">
                  Date
                </p>
                <p className="mt-2 text-xl text-white">
                  {formatDate(event.dateStart, event.dateLabel)}
                </p>
                {time && <p className="mt-1 text-white/70">{time}</p>}
              </div>

              {event.location && (
                <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                  <p className="text-xs uppercase tracking-[0.25em] text-rotary-gold">
                    Location
                  </p>
                  <p className="mt-2 text-xl text-white">{event.location}</p>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_360px]">
            <article className="prose prose-slate max-w-none prose-headings:font-black prose-a:text-rotary-blue">
              {event.description && <PortableText value={event.description} />}
            </article>

            <aside className="h-fit rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-xl font-black text-slate-950">
                Event details
              </h2>

              <dl className="mt-6 space-y-5 text-sm">
                <div>
                  <dt className="font-bold uppercase tracking-wide text-slate-500">
                    Date
                  </dt>
                  <dd className="mt-1 text-lg font-bold text-slate-950">
                    {formatDate(event.dateStart, event.dateLabel)}
                  </dd>
                </div>

                {time && (
                  <div>
                    <dt className="font-bold uppercase tracking-wide text-slate-500">
                      Time
                    </dt>
                    <dd className="mt-1 text-lg font-bold text-slate-950">
                      {time}
                    </dd>
                  </div>
                )}

                {event.location && (
                  <div>
                    <dt className="font-bold uppercase tracking-wide text-slate-500">
                      Location
                    </dt>
                    <dd className="mt-1 text-lg font-bold text-slate-950">
                      {event.location}
                    </dd>
                  </div>
                )}

                <div>
                  <dt className="font-bold uppercase tracking-wide text-slate-500">
                    Category
                  </dt>
                  <dd className="mt-1 text-lg font-bold text-slate-950">
                    {labelFromCategory(event.category)}
                  </dd>
                </div>
              </dl>

              {event.externalUrl && (
                <a
                  href={event.externalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex w-full justify-center rounded-full bg-rotary-blue px-6 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:bg-slate-950"
                >
                  Visit event link
                </a>
              )}
            </aside>
          </div>

          {event.gallery && event.gallery.length > 0 && (
            <div className="mt-16">
              <h2 className="text-3xl font-black text-slate-950">
                Event gallery
              </h2>

              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {event.gallery.map((image) => {
                  const src = urlForImage(image)?.width(900).height(700).url();

                  if (!src) return null;

                  return (
                    <div
                      key={image._key}
                      className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-slate-100"
                    >
                      <Image
                        src={src}
                        alt={image.alt || event.title}
                        fill
                        className="image-polish object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
