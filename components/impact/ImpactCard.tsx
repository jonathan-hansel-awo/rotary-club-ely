// components/impact/ImpactCard.tsx

/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import FadeInOnScroll from "@/components/animation/FadeInOnScroll";

interface ImpactCardProps {
  impact: {
    _id: string;
    title: string;
    slug: { current: string };
    date: string;
    recipient: string;
    summary: string;
    image?: any;
  };
  index?: number;
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });
}

export default function ImpactCard({ impact, index = 0 }: ImpactCardProps) {
  const imageSrc = impact.image
    ? urlForImage(impact.image)?.width(1000).height(700).url()
    : null;

  return (
    <FadeInOnScroll delay={index * 0.08}>
      <Link
        href={`/impact/${impact.slug.current}`}
        className="group block h-full overflow-hidden rounded-3xl border border-grey-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-rotary-blue/10">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={impact.image?.alt || impact.title}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
              sizes="(min-width: 1024px) 33vw, 100vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-rotary-blue to-rotary-blue-dark p-8 text-center text-white">
              <span className="font-heading text-2xl font-bold">
                {impact.title}
              </span>
            </div>
          )}

          <div className="absolute left-4 top-4 rounded-full bg-white/95 px-4 py-2 text-xs font-bold uppercase tracking-wide text-rotary-blue shadow-sm">
            Impact Story
          </div>
        </div>

        <div className="flex min-h-[240px] flex-col p-6">
          <p className="text-sm font-semibold text-rotary-gold-dark">
            {formatDate(impact.date)}
          </p>

          <h3 className="mt-3 font-heading text-2xl font-bold text-grey-900 transition group-hover:text-rotary-blue">
            {impact.title}
          </h3>

          <p className="mt-2 text-sm font-semibold text-grey-500">
            {impact.recipient}
          </p>

          <p className="mt-4 flex-1 leading-relaxed text-grey-700">
            {impact.summary}
          </p>

          <span className="mt-6 inline-flex items-center font-semibold text-rotary-blue">
            Read the story
            <span className="ml-2 transition group-hover:translate-x-1">→</span>
          </span>
        </div>
      </Link>
    </FadeInOnScroll>
  );
}
