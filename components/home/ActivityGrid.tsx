import Image from "next/image";
import Link from "next/link";
import FadeInOnScroll from "@/components/animation/FadeInOnScroll";
import SectionHeading from "@/components/ui/SectionHeading";
import { urlForImage } from "@/sanity/lib/image";
import type { ActivityTile } from "@/lib/types";

interface ActivityGridProps {
  tiles?: ActivityTile[];
}

// Fallback gradient config keyed by index
const fallbackGradients = [
  {
    bgClass: "bg-gradient-to-br from-[#1A5DC7] to-[#0C2340]",
    gradientClass: "from-[#0C2340]/80 via-[#17458F]/40 to-transparent",
    borderHoverClass: "group-hover:border-[#F7A81B]/60",
  },
  {
    bgClass: "bg-gradient-to-br from-[#0C2340] to-[#872455]",
    gradientClass: "from-[#0C2340]/80 to-transparent",
    borderHoverClass: "group-hover:border-[#F7A81B]/60",
  },
  {
    bgClass: "bg-gradient-to-br from-[#D4900F] to-[#F7A81B]",
    gradientClass: "from-[#1A1918]/60 to-transparent",
    borderHoverClass: "group-hover:border-white/40",
  },
  {
    bgClass: "bg-gradient-to-br from-[#2D7A3A] to-[#17458F]",
    gradientClass: "from-[#0C2340]/70 to-transparent",
    borderHoverClass: "group-hover:border-[#F7A81B]/60",
  },
];

// Fallback tiles if Sanity has no activity tiles yet
const fallbackTiles: ActivityTile[] = [
  {
    label: "Ely Aquafest",
    description:
      "Our flagship summer festival on the River Great Ouse — boat races, live music, and family fun.",
    href: "/events",
    badge: "Annual Event",
  },
  {
    label: "Fireworks Night",
    description:
      "East Cambridgeshire's biggest fireworks display every November.",
    href: "/events",
    badge: "Annual Event",
  },
  {
    label: "Charitable Giving",
    description:
      "Over £45,000 raised for local causes, charities, and community initiatives.",
    href: "/impact",
    badge: "15+ Years",
  },
  {
    label: "Community Events",
    description:
      "Clean-ups, social gatherings, talks, and initiatives that keep Ely thriving.",
    href: "/events",
    badge: "Year Round",
  },
];

function buildImageUrl(image: ActivityTile["image"]): string | null {
  if (!image?.asset?._ref) return null;
  try {
    return urlForImage(image).width(800).height(600).url();
  } catch {
    return null;
  }
}

interface TileCardProps {
  tile: ActivityTile;
  index: number;
  className?: string;
}

function TileCard({ tile, index, className = "" }: TileCardProps) {
  const gradient = fallbackGradients[index % fallbackGradients.length];
  const imageUrl = buildImageUrl(tile.image);

  return (
    <Link
      href={tile.href}
      className={`
        group relative overflow-hidden rounded-[1rem]
        flex flex-col justify-end
        cursor-pointer w-full h-full
        transition-all duration-300 ease-out
        hover:shadow-[0_16px_40px_rgba(0,0,0,0.2)]
        hover:-translate-y-1
        ${imageUrl ? "" : gradient.bgClass}
        ${className}
      `}
    >
      {/* Background image */}
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={tile.image?.alt ?? tile.label}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="
            object-cover
            transition-transform duration-300 ease-out
            group-hover:scale-105
          "
          style={
            tile.image?.hotspot
              ? {
                  objectPosition: `${tile.image.hotspot.x * 100}% ${tile.image.hotspot.y * 100}%`,
                }
              : undefined
          }
        />
      )}

      {/* Hover border */}
      <div
        className={`
        absolute inset-0 rounded-[1rem]
        border-2 border-transparent
        ${gradient.borderHoverClass}
        transition-all duration-300 ease-out
        pointer-events-none z-10
      `}
      />

      {/* Gradient overlay */}
      <div
        className={`
        absolute inset-0
        bg-gradient-to-t ${gradient.gradientClass}
        ${imageUrl ? "opacity-75" : "opacity-100"}
        group-hover:opacity-90
        transition-opacity duration-300
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
          font-heading font-bold text-white
          leading-snug mb-1
          text-[1.1rem] lg:text-[1.35rem]
        "
        >
          {tile.label}
        </h3>
        <p
          className="
          font-body text-sm text-white/80 leading-relaxed
          max-h-0 overflow-hidden opacity-0
          group-hover:max-h-24 group-hover:opacity-100
          transition-all duration-300 ease-out
          mb-0 group-hover:mb-3
        "
        >
          {tile.description}
        </p>
        <span
          className="
          inline-flex items-center gap-1
          text-white/70 text-sm font-medium font-body
          group-hover:text-white group-hover:gap-2
          transition-all duration-200
          opacity-0 group-hover:opacity-100
        "
        >
          Learn more →
        </span>
      </div>
    </Link>
  );
}

export default function ActivityGrid({ tiles }: ActivityGridProps) {
  const displayTiles = (
    tiles && tiles.length > 0 ? tiles : fallbackTiles
  ).slice(0, 4);

  const [t0, t1, t2, t3] = displayTiles;

  return (
    <section
      aria-labelledby="activity-grid-heading"
      className="bg-white py-[clamp(3rem,6vw,6rem)]"
    >
      <div className="max-w-[1280px] mx-auto px-[clamp(1rem,2vw,2rem)]" 
      id="activity-grid-heading"
      >
        <FadeInOnScroll>
          <SectionHeading
            eyebrow="What We Do"
            title="Events & Activities"
            subtitle="From flagship festivals to quiet acts of community service — here's what keeps us busy."
           
          />
        </FadeInOnScroll>

        <div
          className="
          grid gap-3 sm:gap-4
          grid-cols-2
          lg:grid-cols-3 lg:grid-rows-2
          auto-rows-auto
        "
        >
          {/* Tile 0 — Aquafest: full width mobile, row-span-2 desktop */}
          {t0 && (
            <FadeInOnScroll
              delay={0}
              className="col-span-2 lg:col-span-1 lg:row-span-2"
            >
              <TileCard
                tile={t0}
                index={0}
                className="min-h-[220px] sm:min-h-[260px] lg:min-h-0 lg:h-full"
              />
            </FadeInOnScroll>
          )}

          {/* Tile 1 — Fireworks: half width mobile, col-span-2 desktop */}
          {t1 && (
            <FadeInOnScroll delay={0.1} className="col-span-1 lg:col-span-2">
              <TileCard
                tile={t1}
                index={1}
                className="min-h-[160px] sm:min-h-[200px] lg:min-h-[190px]"
              />
            </FadeInOnScroll>
          )}

          {/* Tile 2 — Charitable: half width mobile, normal desktop */}
          {t2 && (
            <FadeInOnScroll delay={0.2} className="col-span-1">
              <TileCard
                tile={t2}
                index={2}
                className="min-h-[160px] sm:min-h-[200px] lg:min-h-[190px]"
              />
            </FadeInOnScroll>
          )}

          {/* Tile 3 — Community: full width mobile, normal desktop */}
          {t3 && (
            <FadeInOnScroll
              delay={0.3}
              className="col-span-2 sm:col-span-1 lg:col-span-1"
            >
              <TileCard
                tile={t3}
                index={3}
                className="min-h-[140px] sm:min-h-[200px] lg:min-h-[190px]"
              />
            </FadeInOnScroll>
          )}
        </div>
      </div>
    </section>
  );
}
