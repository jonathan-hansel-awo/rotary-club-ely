/* eslint-disable @typescript-eslint/no-explicit-any */

import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "@/sanity/lib/image";
import type { Event } from "@/lib/types";

interface EventCardProps {
  event: Event;
  index?: number;
}

function formatDate(dateStart?: string, dateLabel?: string) {
  if (dateLabel) return dateLabel;

  if (!dateStart) return "Date to be confirmed";

  return new Date(dateStart).toLocaleDateString("en-GB", {
    weekday: "short",
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

function getCategoryLabel(category: string) {
  return category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function EventCard({ event }: EventCardProps) {
  const imageSrc = event.heroImage
    ? urlForImage(event.heroImage)?.width(900).height(620).url()
    : null;

  const status =
    event.status ??
    (event.dateStart && new Date(event.dateStart) < new Date()
      ? "past"
      : (event.eventStatus ?? "upcoming"));

  const time = formatTime(event.dateStart);

  return (
    <Link
      href={`/events/${event.slug.current}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rotary-gold"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={event.heroImage?.alt || event.title}
            fill
            className="image-polish object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-rotary-blue via-rotary-blue to-sky-800">
            <div className="rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-white">
              Rotary Ely
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

        <div className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-wide text-rotary-blue shadow-sm">
          {getCategoryLabel(event.category)}
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <p className="inline-flex rounded-full bg-rotary-gold px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-950">
            {status === "upcoming" ? "Upcoming" : "Past event"}
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm font-semibold text-rotary-blue">
          {formatDate(event.dateStart, event.dateLabel)}
          {time ? ` · ${time}` : ""}
        </p>

        <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-950 transition group-hover:text-rotary-blue">
          {event.title}
        </h3>

        {event.location && (
          <p className="mt-3 text-sm leading-6 text-slate-600">
            {event.location}
          </p>
        )}

        <div className="mt-auto pt-6">
          <span className="inline-flex items-center gap-2 text-sm font-bold text-rotary-blue">
            View event
            <span className="transition group-hover:translate-x-1">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
