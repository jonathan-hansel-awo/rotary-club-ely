import Image from "next/image";
import Link from "next/link";
import FadeInOnScroll from "@/components/animation/FadeInOnScroll";
import StaggerChildren from "@/components/animation/StaggerChildren";
import Container from "@/components/layout/Container";
import { urlForImage } from "@/sanity/lib/image";
import type { Cause } from "@/lib/types";

interface OurCausesProps {
  causes: Cause[];
}

const accentColours = [
  {
    bg: "bg-rotary-blue/10",
    text: "text-rotary-blue",
    border: "border-rotary-blue/20",
  },
  {
    bg: "bg-rotary-gold/15",
    text: "text-rotary-gold-dark",
    border: "border-rotary-gold/25",
  },
  {
    bg: "bg-cranberry/10",
    text: "text-cranberry",
    border: "border-cranberry/20",
  },
  {
    bg: "bg-rotary-azure/10",
    text: "text-rotary-azure",
    border: "border-rotary-azure/20",
  },
  {
    bg: "bg-success/10",
    text: "text-success",
    border: "border-success/20",
  },
];

function buildImageUrl(
  image: Cause["image"],
  width: number,
  height: number,
): string | null {
  if (!image?.asset?._ref) return null;

  try {
    return urlForImage(image)
      .width(width)
      .height(height)
      .fit("crop")
      .auto("format")
      .url();
  } catch {
    return null;
  }
}

function causeHref(cause: Cause) {
  return cause.externalUrl || `/causes/${cause.slug.current}`;
}

function CauseInitial({
  name,
  accent,
}: {
  name: string;
  accent: (typeof accentColours)[number];
}) {
  return (
    <div
      className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl border ${accent.bg} ${accent.border}`}
    >
      <span className={`font-heading text-xl font-black ${accent.text}`}>
        {name.charAt(0).toUpperCase()}
      </span>
    </div>
  );
}

function CauseBadge({
  cause,
  accentIndex,
}: {
  cause: Cause;
  accentIndex: number;
}) {
  const accent = accentColours[accentIndex % accentColours.length];
  const imageUrl = buildImageUrl(cause.image, 140, 140);
  const isExternal = !!cause.externalUrl;

  return (
    <a
      href={causeHref(cause)}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="group flex items-start gap-4 rounded-3xl border border-grey-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-rotary-blue/20 hover:shadow-lg"
    >
      {imageUrl ? (
        <div
          className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border ${accent.border}`}
        >
          <Image
            src={imageUrl}
            alt={cause.image?.alt ?? cause.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-110"
            sizes="56px"
          />
        </div>
      ) : (
        <CauseInitial name={cause.name} accent={accent} />
      )}

      <div>
        <h3 className="font-heading text-lg font-black leading-snug text-grey-900 transition group-hover:text-rotary-blue">
          {cause.name}
          {isExternal && (
            <span className="ml-1 text-sm text-grey-700" aria-hidden="true">
              ↗
            </span>
          )}
        </h3>

        {cause.summary && (
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-grey-700">
            {cause.summary}
          </p>
        )}
      </div>
    </a>
  );
}

function FeaturedCause({ cause }: { cause: Cause }) {
  const imageUrl = buildImageUrl(cause.image, 1100, 780);
  const isExternal = !!cause.externalUrl;

  return (
    <FadeInOnScroll>
      <a
        href={causeHref(cause)}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="group grid overflow-hidden rounded-[2rem] bg-white shadow-lg transition hover:-translate-y-1 hover:shadow-card-hover lg:grid-cols-[1.05fr_0.95fr]"
      >
        <div className="relative min-h-[340px] overflow-hidden bg-rotary-blue lg:min-h-[520px]">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={cause.image?.alt ?? cause.name}
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-rotary-blue to-rotary-blue-dark">
              <div className="grid h-28 w-28 place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm">
                <span className="font-heading text-5xl font-black">
                  {cause.name.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent" />

          <span className="absolute left-6 top-6 rounded-full bg-rotary-gold px-4 py-2 text-xs font-black uppercase tracking-wide text-slate-950">
            Featured cause
          </span>
        </div>

        <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-rotary-gold">
            Where support goes
          </p>

          <h3 className="mt-4 font-heading text-4xl font-black leading-tight text-grey-900 md:text-5xl">
            {cause.name}
          </h3>

          {cause.summary && (
            <p className="mt-6 text-lg leading-relaxed text-grey-700">
              {cause.summary}
            </p>
          )}

          <span className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-rotary-blue px-7 py-3 text-sm font-black uppercase tracking-wide text-white transition group-hover:bg-rotary-blue-dark">
            Learn more
            <span
              aria-hidden="true"
              className="transition group-hover:translate-x-1"
            >
              →
            </span>
          </span>
        </div>
      </a>
    </FadeInOnScroll>
  );
}

export default function OurCauses({ causes }: OurCausesProps) {
  if (!causes || causes.length === 0) return null;

  const [featuredCause, ...rest] = causes;
  const supportingCauses = rest.slice(0, 4);
  const hasMore = causes.length > 5;

  return (
    <section
      aria-labelledby="our-causes-heading"
      className="relative overflow-hidden bg-[#F8F5EE] py-20 md:py-28"
    >
      <div className="absolute -right-32 top-20 h-96 w-96 rounded-full bg-rotary-gold/15 blur-3xl" />
      <div className="absolute -left-40 bottom-10 h-[28rem] w-[28rem] rounded-full bg-rotary-blue/10 blur-3xl" />

      <Container>
        <div className="relative">
          <FadeInOnScroll>
            <div className="mb-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div>
                <p className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-rotary-gold">
                  Our Causes
                </p>

                <h2
                  id="our-causes-heading"
                  className="font-heading text-4xl font-black leading-tight text-grey-900 md:text-6xl"
                >
                  Making a Difference
                  <span className="block text-rotary-blue">
                    Locally & Globally
                  </span>
                </h2>
              </div>

              <div className="max-w-2xl lg:justify-self-end">
                <p className="text-lg leading-relaxed text-grey-700">
                  From supporting local families to international humanitarian
                  projects, these are the causes closest to our hearts.
                </p>

                {hasMore && (
                  <Link
                    href="/causes"
                    className="mt-6 inline-flex items-center gap-2 rounded-full border border-rotary-blue px-6 py-3 text-sm font-black uppercase tracking-wide text-rotary-blue transition hover:bg-rotary-blue hover:text-white"
                  >
                    View all causes
                    <span aria-hidden="true">→</span>
                  </Link>
                )}
              </div>
            </div>
          </FadeInOnScroll>

          <FeaturedCause cause={featuredCause} />

          {supportingCauses.length > 0 && (
            <div className="mt-8">
              <div className="mb-5 flex items-center justify-between gap-4">
                <h3 className="font-heading text-2xl font-black text-grey-900">
                  More ways we serve
                </h3>

                <div className="hidden h-px flex-1 bg-grey-200 sm:block" />
              </div>

              <StaggerChildren className="grid gap-5 md:grid-cols-2">
                {supportingCauses.map((cause, index) => (
                  <CauseBadge
                    key={cause._id}
                    cause={cause}
                    accentIndex={index}
                  />
                ))}
              </StaggerChildren>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
