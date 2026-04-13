import Link from "next/link";
import FadeInOnScroll from "@/components/animation/FadeInOnScroll";
import SectionHeading from "@/components/ui/SectionHeading";

interface TileProps {
  label: string;
  description: string;
  href: string;
  badge: string;
  bgClass: string;
  gradientClass: string;
  className?: string;
  borderHoverClass?: string;
}

function Tile({
  label,
  description,
  href,
  badge,
  bgClass,
  gradientClass,
  className = "",
  borderHoverClass = "group-hover:border-[#F7A81B]/60",
}: TileProps) {
  return (
    <Link
      href={href}
      className={`
        group relative overflow-hidden rounded-[1rem]
        flex flex-col justify-end
        cursor-pointer w-full h-full
        transition-all duration-300 ease-out
        hover:shadow-[0_16px_40px_rgba(0,0,0,0.2)]
        hover:-translate-y-1
        ${bgClass}
        ${className}
      `}
    >
      {/* Gold border on hover */}
      <div
        className={`
        absolute inset-0 rounded-[1rem]
        border-2 border-transparent
        ${borderHoverClass}
        transition-all duration-300 ease-out
        pointer-events-none z-10
      `}
      />

      {/* Gradient overlay */}
      <div
        className={`
        absolute inset-0
        bg-gradient-to-t ${gradientClass}
        group-hover:opacity-80
        transition-opacity duration-300
      `}
      />

      {/* Badge */}
      <div
        className="
        absolute top-4 left-4 z-10
        bg-white/15 backdrop-blur-sm
        text-white text-xs font-medium font-body
        uppercase tracking-wider
        px-2.5 py-1 rounded-full
      "
      >
        {badge}
      </div>

      {/* Content */}
      <div className="relative z-10 p-5 lg:p-6">
        <h3
          className="
          font-heading font-bold text-white
          leading-snug mb-1
          text-[1.1rem] lg:text-[1.35rem]
        "
        >
          {label}
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
          {description}
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

        {/*
          Layout:
          mobile:  [  Aquafest (full, tall)    ]
                   [ Fireworks | Charitable    ]
                   [ Community Events (full)   ]

          sm:      [ Aquafest | Fireworks      ]
                   [ Charitable | Community    ]

          lg:      [ Aquafest (row-span-2) | Fireworks (col-span-2)  ]
                   [                       | Charitable | Community  ]
        */}
        <div
          className="
          grid gap-3 sm:gap-4
          grid-cols-2
          lg:grid-cols-3 lg:grid-rows-2
          auto-rows-auto
        "
        >
          {/* Aquafest — full width on mobile, row-span-2 on desktop */}
          <FadeInOnScroll
            delay={0}
            className="
              col-span-2
              lg:col-span-1 lg:row-span-2
            "
          >
            <Tile
              label="Ely Aquafest"
              description="Our flagship summer festival on the River Great Ouse — boat races, live music, and family fun."
              href="/events"
              badge="Annual Event"
              bgClass="bg-gradient-to-br from-[#1A5DC7] to-[#0C2340]"
              gradientClass="from-[#0C2340]/80 via-[#17458F]/40 to-transparent"
              className="min-h-[220px] sm:min-h-[260px] lg:min-h-0 lg:h-full"
            />
          </FadeInOnScroll>

          {/* Fireworks — half width on mobile, col-span-2 on desktop */}
          <FadeInOnScroll
            delay={0.1}
            className="
              col-span-1
              lg:col-span-2
            "
          >
            <Tile
              label="Fireworks Night"
              description="East Cambridgeshire's biggest fireworks display every November."
              href="/events"
              badge="Annual Event"
              bgClass="bg-gradient-to-br from-[#0C2340] to-[#872455]"
              gradientClass="from-[#0C2340]/80 to-transparent"
              className="min-h-[160px] sm:min-h-[200px] lg:min-h-[190px]"
            />
          </FadeInOnScroll>

          {/* Charitable Giving — half width on mobile */}
          <FadeInOnScroll delay={0.2} className="col-span-1">
            <Tile
              label="Charitable Giving"
              description="Over £45,000 raised for local causes, charities, and community initiatives."
              href="/impact"
              badge="15+ Years"
              bgClass="bg-gradient-to-br from-[#D4900F] to-[#F7A81B]"
              gradientClass="from-[#1A1918]/60 to-transparent"
              borderHoverClass="group-hover:border-white/40"
              className="min-h-[160px] sm:min-h-[200px] lg:min-h-[190px]"
            />
          </FadeInOnScroll>

          {/* Community Events — full width on mobile, normal on desktop */}
          <FadeInOnScroll
            delay={0.3}
            className="
              col-span-2
              sm:col-span-1
              lg:col-span-1
            "
          >
            <Tile
              label="Community Events"
              description="Clean-ups, social gatherings, talks, and initiatives that keep Ely thriving."
              href="/events"
              badge="Year Round"
              bgClass="bg-gradient-to-br from-[#2D7A3A] to-[#17458F]"
              gradientClass="from-[#0C2340]/70 to-transparent"
              className="min-h-[140px] sm:min-h-[200px] lg:min-h-[190px]"
            />
          </FadeInOnScroll>
        </div>
      </div>
    </section>
  );
}
