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

function getCauseHref(cause: Cause) {
  if (cause.externalUrl) return cause.externalUrl;
  if (cause.slug?.current) return `/causes/${cause.slug.current}`;
  return "/causes";
}

function CauseLogo({
  cause,
  size = "md",
}: {
  cause: Cause;
  size?: "md" | "lg";
}) {
  const logoUrl = buildImageUrl(cause.logo, 180, 180);
  const sizeClasses =
    size === "lg" ? "h-20 w-20 rounded-3xl" : "h-14 w-14 rounded-2xl";

  return (
    <div
      className={`${sizeClasses} grid shrink-0 place-items-center overflow-hidden border border-white/80 bg-white shadow-lg`}
    >
      {logoUrl ? (
        <Image
          src={logoUrl}
          alt={cause.logo?.alt ?? `${cause.name} logo`}
          width={size === "lg" ? 80 : 56}
          height={size === "lg" ? 80 : 56}
          className="h-full w-full object-contain p-2"
        />
      ) : (
        <span className="font-heading text-xl font-black text-rotary-blue">
          {cause.name.charAt(0).toUpperCase()}
        </span>
      )}
    </div>
  );
}

function FeaturedCause({ cause }: { cause: Cause }) {
  const image = cause.featuredImage || cause.image;
  const imageUrl = buildImageUrl(image, 1200, 800);
  const isExternal = !!cause.externalUrl;
  const href = getCauseHref(cause);

  return (
    <FadeInOnScroll>
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="group grid overflow-hidden rounded-[2rem] bg-white shadow-xl ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-card-hover lg:grid-cols-[1.05fr_0.95fr]"
      >
        <div className="relative min-h-[340px] overflow-hidden bg-rotary-blue lg:min-h-[520px]">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={image?.alt ?? cause.name}
              fill
              className="image-polish object-cover transition duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-rotary-blue to-rotary-blue-dark">
              <span className="font-heading text-7xl font-black text-white/90">
                {cause.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />

          <span className="absolute left-6 top-6 rounded-full bg-rotary-gold px-4 py-2 text-xs font-black uppercase tracking-wide text-slate-950">
            Featured cause
          </span>

          <div className="absolute bottom-6 left-6">
            <CauseLogo cause={cause} size="lg" />
          </div>
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

function CauseCard({ cause }: { cause: Cause }) {
  const image = cause.featuredImage || cause.image;
  const imageUrl = buildImageUrl(image, 720, 460);
  const isExternal = !!cause.externalUrl;
  const href = getCauseHref(cause);

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="group overflow-hidden rounded-3xl border border-grey-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-rotary-blue/20 hover:shadow-lg"
    >
      {/* Image section */}
      <div className="overflow-hidden rounded-t-3xl">
        <div className="relative h-48 bg-rotary-blue/10">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={image?.alt ?? cause.name}
              fill
              className="image-polish object-cover transition duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-rotary-blue/90 to-rotary-blue-dark">
              <span className="font-heading text-5xl font-black text-white">
                {cause.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Content section */}
      <div className="relative p-5 pt-10">
        <div className="absolute -top-7 left-5 z-20">
          <CauseLogo cause={cause} />
        </div>

        <h3 className="font-heading text-xl font-black leading-snug text-grey-900 transition group-hover:text-rotary-blue">
          {cause.name}
          {isExternal && (
            <span className="ml-1 text-sm text-grey-700" aria-hidden="true">
              ↗
            </span>
          )}
        </h3>

        {cause.summary && (
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-grey-700">
            {cause.summary}
          </p>
        )}

        <span className="mt-5 inline-flex items-center gap-2 text-sm font-black uppercase tracking-wide text-rotary-blue">
          Read more
          <span
            aria-hidden="true"
            className="transition group-hover:translate-x-1"
          >
            →
          </span>
        </span>
      </div>
    </a>
  );
}

export default function OurCauses({ causes }: OurCausesProps) {
  if (!causes || causes.length === 0) return null;

  const [featuredCause, ...rest] = causes;
  const supportingCauses = rest.slice(0, 4);

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
                  Supporting people,
                  <span className="block text-rotary-blue">
                    not just projects
                  </span>
                </h2>
              </div>

              <div className="max-w-2xl lg:justify-self-end">
                <p className="text-lg leading-relaxed text-grey-700">
                  From local families and young people to international
                  humanitarian work, these are some of the causes the Rotary
                  Club of Ely proudly supports.
                </p>

                <Link
                  href="/causes"
                  className="mt-6 inline-flex items-center gap-2 rounded-full border border-rotary-blue px-6 py-3 text-sm font-black uppercase tracking-wide text-rotary-blue transition hover:bg-rotary-blue hover:text-white"
                >
                  See who we support
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </FadeInOnScroll>

          <FeaturedCause cause={featuredCause} />

          {supportingCauses.length > 0 && (
            <div className="mt-10">
              <div className="mb-6 flex items-center justify-between gap-4">
                <h3 className="font-heading text-2xl font-black text-grey-900">
                  More causes we support
                </h3>

                <div className="hidden h-px flex-1 bg-grey-200 sm:block" />
              </div>

              <StaggerChildren className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {supportingCauses.map((cause) => (
                  <CauseCard key={cause._id} cause={cause} />
                ))}
              </StaggerChildren>

              <div className="mt-10 text-center">
                <Link
                  href="/causes"
                  className="inline-flex items-center gap-2 rounded-full bg-rotary-blue px-8 py-4 text-sm font-black uppercase tracking-wide text-white transition hover:bg-rotary-blue-dark"
                >
                  Explore all causes
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
