import Image from 'next/image'
import FadeInOnScroll from '@/components/animation/FadeInOnScroll'
import { urlForImage } from '@/sanity/lib/image'
import type { Sponsor } from '@/lib/types'

interface SponsorsStripProps {
  sponsors: Sponsor[]
}

function buildLogoUrl(image: Sponsor['logo']): string | null {
  if (!image?.asset?._ref) return null
  try {
    return urlForImage(image).height(80).url()
  } catch {
    return null
  }
}

function SponsorLogo({ sponsor }: { sponsor: Sponsor }) {
  const logoUrl = buildLogoUrl(sponsor.logo)
  if (!logoUrl) return null

  const inner = (
    <div className="
      relative h-10 w-auto min-w-[80px] max-w-[160px]
      flex items-center justify-center
    ">
      <Image
        src={logoUrl}
        alt={sponsor.name}
        width={160}
        height={40}
        className="
          object-contain h-10 w-auto
          filter grayscale opacity-50
          transition-all duration-300 ease-out
          group-hover:grayscale-0 group-hover:opacity-100
        "
      />
    </div>
  )

  if (sponsor.websiteUrl) {
    return (
      <a
        href={sponsor.websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit ${sponsor.name}`}
        className="group flex items-center justify-center px-6 flex-shrink-0"
      >
        {inner}
      </a>
    )
  }

  return (
    <div className="group flex items-center justify-center px-6 flex-shrink-0">
      {inner}
    </div>
  )
}

function StaticRow({ sponsors }: { sponsors: Sponsor[] }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {sponsors.map((sponsor) => (
        <SponsorLogo key={sponsor._id} sponsor={sponsor} />
      ))}
    </div>
  )
}

function MarqueeRow({ sponsors }: { sponsors: Sponsor[] }) {
  // Duplicate the list so the marquee loops seamlessly
  const doubled = [...sponsors, ...sponsors]

  return (
    <div
      className="relative overflow-hidden"
      // Pause on hover via CSS custom property
    >
      {/* Fade edges */}
      <div
        aria-hidden="true"
        className="
          absolute left-0 top-0 bottom-0 w-16 z-10
          bg-gradient-to-r from-[#F8F7F4] to-transparent
          pointer-events-none
        "
      />
      <div
        aria-hidden="true"
        className="
          absolute right-0 top-0 bottom-0 w-16 z-10
          bg-gradient-to-l from-[#F8F7F4] to-transparent
          pointer-events-none
        "
      />

      <div className="flex [&:hover>div]:pause-marquee overflow-hidden">
        <div className="flex animate-marquee">
          {doubled.map((sponsor, index) => (
            <SponsorLogo key={`${sponsor._id}-${index}`} sponsor={sponsor} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function SponsorsStrip({ sponsors }: SponsorsStripProps) {
  if (!sponsors || sponsors.length === 0) return null

  const useMarquee = sponsors.length >= 6

  return (
    <section aria-label="Our sponsors and partners">
      <FadeInOnScroll>
        <div className="
          max-w-[1280px] mx-auto
          px-[clamp(1rem,2vw,2rem)]
          py-12
        ">
          <p className="
            font-body font-medium text-xs uppercase
            tracking-[0.08em] text-text-muted
            text-center mb-8
          ">
            Supported By
          </p>

          {useMarquee
            ? <MarqueeRow sponsors={sponsors} />
            : <StaticRow sponsors={sponsors} />
          }
        </div>
      </FadeInOnScroll>
    </section>
  )
}