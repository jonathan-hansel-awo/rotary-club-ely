/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import FadeInOnScroll from "@/components/animation/FadeInOnScroll";
import SectionHeading from "@/components/ui/SectionHeading";

interface ActivityTile {
  key: string;
  label: string;
  description: string;
  href: string;
  external?: boolean;
  bgClass: string;
  gradientClass: string;
  span: "large" | "normal";
  badge?: string;
}

const tiles: ActivityTile[] = [
  {
    key: "aquafest",
    label: "Ely Aquafest",
    description:
      "Our flagship summer festival on the River Great Ouse — boat races, live music, and family fun.",
    href: "/events",
    bgClass: "bg-gradient-to-br from-[#1A5DC7] to-[#0C2340]",
    gradientClass: "from-[#0C2340]/80 via-[#17458F]/40 to-transparent",
    span: "large",
    badge: "Annual Event",
  },
  {
    key: "fireworks",
    label: "Fireworks Night",
    description:
      "East Cambridgeshire's biggest fireworks display every November.",
    href: "/events",
    bgClass: "bg-gradient-to-br from-[#0C2340] to-[#872455]",
    gradientClass: "from-[#0C2340]/80 to-transparent",
    span: "normal",
    badge: "Annual Event",
  },
  {
    key: "charitable",
    label: "Charitable Giving",
    description:
      "Over £45,000 raised for local causes, charities, and community initiatives.",
    href: "/impact",
    bgClass: "bg-gradient-to-br from-[#D4900F] to-[#F7A81B]",
    gradientClass: "from-[#1A1918]/60 to-transparent",
    span: "normal",
    badge: "15+ Years",
  },
];

function ActivityTile({ tile, index }: { tile: ActivityTile; index: number }) {
  const Tag = tile.external ? "a" : Link;
  const externalProps = tile.external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <FadeInOnScroll delay={index * 0.1}>
      <Tag
        href={tile.href}
        {...externalProps}
        className={`
          group relative overflow-hidden rounded-[1rem]
          flex flex-col justify-end
          ${
            tile.span === "large"
              ? "lg:row-span-2 min-h-[280px] lg:min-h-[400px]"
              : "min-h-[200px] lg:min-h-[190px]"
          }
          cursor-pointer
          transition-all duration-300 ease-out
          hover:shadow-[0_16px_40px_rgba(0,0,0,0.2)]
          hover:-translate-y-1
          ${tile.bgClass}
        `}
      >
        {/* Gold border on hover */}
        <div
          className="
          absolute inset-0 rounded-[1rem]
          border-2 border-transparent
          group-hover:border-[#F7A81B]/60
          transition-all duration-300 ease-out
          pointer-events-none z-10
        "
        />

        {/* Gradient overlay */}
        <div
          className={`
          absolute inset-0
          bg-gradient-to-t ${tile.gradientClass}
          transition-opacity duration-300 ease-out
          group-hover:opacity-80
        `}
        />

        {/* Badge */}
        {tile.badge && (
          <div
            className="
            absolute top-4 left-4 z-10
            bg-white/15 backdrop-blur-sm
            text-white text-xs font-medium font-body
            uppercase tracking-wider
            px-2.5 py-1 rounded-full
          "
          >
            {tile.badge}
          </div>
        )}

        {/* Content */}
        <div className="relative z-10 p-5 lg:p-6">
          <h3
            className="
            font-heading font-bold
            text-white leading-snug mb-1
            text-[1.15rem] lg:text-[1.35rem]
          "
          >
            {tile.label}
          </h3>

          {/* Description — hidden by default, fades in on hover */}
          <p
            className="
            font-body text-sm text-white/80
            leading-relaxed
            max-h-0 overflow-hidden opacity-0
            group-hover:max-h-20 group-hover:opacity-100
            transition-all duration-300 ease-out
            mb-0 group-hover:mb-3
          "
          >
            {tile.description}
          </p>

          {/* Learn more */}
          <span
            className="
            inline-flex items-center gap-1
            text-white/70 text-sm font-medium font-body
            group-hover:text-white group-hover:gap-2
            transition-all duration-200 ease-out
            opacity-0 group-hover:opacity-100
          "
          >
            Learn more →
          </span>
        </div>
      </Tag>
    </FadeInOnScroll>
  );
}

export default function ActivityGrid() {
  return (
    <section
      aria-labelledby="activity-grid-heading"
      className="bg-white py-[clamp(3rem,6vw,6rem)]"
    >
      <div
        className="max-w-[1280px] mx-auto px-[clamp(1rem,2vw,2rem)]"
        id="activity-grid-heading"
      >
        <FadeInOnScroll>
          <SectionHeading
            eyebrow="What We Do"
            title="Events & Activities"
            subtitle="From flagship festivals to quiet acts of community service — here's what keeps us busy."
          />
        </FadeInOnScroll>

        {/* Bento grid */}
        <div
          className="
          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
          grid-rows-auto lg:grid-rows-2
          gap-4
        "
        >
          {/* Large tile — Aquafest spans 2 rows on desktop */}
          <div className="sm:col-span-1 lg:col-span-1 lg:row-span-2">
            <FadeInOnScroll delay={0}>
              <Link
                href="/events"
                className={`
                  group relative overflow-hidden rounded-[1rem]
                  flex flex-col justify-end
                  min-h-[280px] lg:h-full lg:min-h-[400px]
                  cursor-pointer
                  transition-all duration-300 ease-out
                  hover:shadow-[0_16px_40px_rgba(0,0,0,0.2)]
                  hover:-translate-y-1
                  bg-gradient-to-br from-[#1A5DC7] to-[#0C2340]
                `}
              >
                <div
                  className="
                  absolute inset-0 rounded-[1rem]
                  border-2 border-transparent
                  group-hover:border-[#F7A81B]/60
                  transition-all duration-300 ease-out
                  pointer-events-none z-10
                "
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C2340]/80 via-[#17458F]/40 to-transparent group-hover:opacity-80 transition-opacity duration-300" />
                <div className="absolute top-4 left-4 z-10 bg-white/15 backdrop-blur-sm text-white text-xs font-medium font-body uppercase tracking-wider px-2.5 py-1 rounded-full">
                  Annual Event
                </div>
                <div className="relative z-10 p-5 lg:p-6">
                  <h3 className="font-heading font-bold text-white leading-snug mb-1 text-[1.15rem] lg:text-[1.5rem]">
                    Ely Aquafest
                  </h3>
                  <p className="font-body text-sm text-white/80 leading-relaxed max-h-0 overflow-hidden opacity-0 group-hover:max-h-24 group-hover:opacity-100 transition-all duration-300 ease-out mb-0 group-hover:mb-3">
                    Our flagship summer festival on the River Great Ouse — boat
                    races, live music, and family fun.
                  </p>
                  <span className="inline-flex items-center gap-1 text-white/70 text-sm font-medium font-body group-hover:text-white group-hover:gap-2 transition-all duration-200 opacity-0 group-hover:opacity-100">
                    Learn more →
                  </span>
                </div>
              </Link>
            </FadeInOnScroll>
          </div>

          {/* Fireworks */}
          <FadeInOnScroll delay={0.1} className="lg:col-span-2">
            <Link
              href="/events"
              className="
                group relative overflow-hidden rounded-[1rem]
                flex flex-col justify-end
                min-h-[200px]
                cursor-pointer w-full
                transition-all duration-300 ease-out
                hover:shadow-[0_16px_40px_rgba(0,0,0,0.2)]
                hover:-translate-y-1
                bg-gradient-to-br from-[#0C2340] to-[#872455]
              "
            >
              <div className="absolute inset-0 rounded-[1rem] border-2 border-transparent group-hover:border-[#F7A81B]/60 transition-all duration-300 pointer-events-none z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C2340]/80 to-transparent group-hover:opacity-80 transition-opacity duration-300" />
              <div className="absolute top-4 left-4 z-10 bg-white/15 backdrop-blur-sm text-white text-xs font-medium font-body uppercase tracking-wider px-2.5 py-1 rounded-full">
                Annual Event
              </div>
              <div className="relative z-10 p-5 lg:p-6">
                <h3 className="font-heading font-bold text-white leading-snug mb-1 text-[1.15rem] lg:text-[1.35rem]">
                  Fireworks Night
                </h3>
                <p className="font-body text-sm text-white/80 leading-relaxed max-h-0 overflow-hidden opacity-0 group-hover:max-h-20 group-hover:opacity-100 transition-all duration-300 mb-0 group-hover:mb-3">
                  East Cambridgeshire's biggest fireworks display every
                  November.
                </p>
                <span className="inline-flex items-center gap-1 text-white/70 text-sm font-medium font-body group-hover:text-white group-hover:gap-2 transition-all duration-200 opacity-0 group-hover:opacity-100">
                  Learn more →
                </span>
              </div>
            </Link>
          </FadeInOnScroll>

          {/* Charitable Giving */}
          <FadeInOnScroll delay={0.2}>
            <Link
              href="/impact"
              className="
                group relative overflow-hidden rounded-[1rem]
                flex flex-col justify-end
                min-h-[200px]
                cursor-pointer w-full
                transition-all duration-300 ease-out
                hover:shadow-[0_16px_40px_rgba(0,0,0,0.2)]
                hover:-translate-y-1
                bg-gradient-to-br from-[#D4900F] to-[#F7A81B]
              "
            >
              <div className="absolute inset-0 rounded-[1rem] border-2 border-transparent group-hover:border-white/40 transition-all duration-300 pointer-events-none z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1918]/60 to-transparent group-hover:opacity-80 transition-opacity duration-300" />
              <div className="absolute top-4 left-4 z-10 bg-white/20 backdrop-blur-sm text-white text-xs font-medium font-body uppercase tracking-wider px-2.5 py-1 rounded-full">
                15+ Years
              </div>
              <div className="relative z-10 p-5 lg:p-6">
                <h3 className="font-heading font-bold text-white leading-snug mb-1 text-[1.15rem] lg:text-[1.35rem]">
                  Charitable Giving
                </h3>
                <p className="font-body text-sm text-white/80 leading-relaxed max-h-0 overflow-hidden opacity-0 group-hover:max-h-20 group-hover:opacity-100 transition-all duration-300 mb-0 group-hover:mb-3">
                  Over £45,000 raised for local causes, charities, and community
                  initiatives.
                </p>
                <span className="inline-flex items-center gap-1 text-white/70 text-sm font-medium font-body group-hover:text-white group-hover:gap-2 transition-all duration-200 opacity-0 group-hover:opacity-100">
                  Learn more →
                </span>
              </div>
            </Link>
          </FadeInOnScroll>

          {/* Community Events */}
          <FadeInOnScroll delay={0.3}>
            <Link
              href="/events"
              className="
                group relative overflow-hidden rounded-[1rem]
                flex flex-col justify-end
                min-h-[200px]
                cursor-pointer w-full
                transition-all duration-300 ease-out
                hover:shadow-[0_16px_40px_rgba(0,0,0,0.2)]
                hover:-translate-y-1
                bg-gradient-to-br from-[#2D7A3A] to-[#17458F]
              "
            >
              <div className="absolute inset-0 rounded-[1rem] border-2 border-transparent group-hover:border-[#F7A81B]/60 transition-all duration-300 pointer-events-none z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C2340]/70 to-transparent group-hover:opacity-80 transition-opacity duration-300" />
              <div className="absolute top-4 left-4 z-10 bg-white/15 backdrop-blur-sm text-white text-xs font-medium font-body uppercase tracking-wider px-2.5 py-1 rounded-full">
                Year Round
              </div>
              <div className="relative z-10 p-5 lg:p-6">
                <h3 className="font-heading font-bold text-white leading-snug mb-1 text-[1.15rem] lg:text-[1.35rem]">
                  Community Events
                </h3>
                <p className="font-body text-sm text-white/80 leading-relaxed max-h-0 overflow-hidden opacity-0 group-hover:max-h-20 group-hover:opacity-100 transition-all duration-300 mb-0 group-hover:mb-3">
                  Clean-ups, social gatherings, talks, and initiatives that keep
                  Ely thriving.
                </p>
                <span className="inline-flex items-center gap-1 text-white/70 text-sm font-medium font-body group-hover:text-white group-hover:gap-2 transition-all duration-200 opacity-0 group-hover:opacity-100">
                  Learn more →
                </span>
              </div>
            </Link>
          </FadeInOnScroll>
        </div>
      </div>
    </section>
  );
}
