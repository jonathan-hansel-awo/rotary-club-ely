import Link from 'next/link'
import Image from 'next/image'
import FadeInOnScroll from '@/components/animation/FadeInOnScroll'
import StaggerChildren from '@/components/animation/StaggerChildren'
import SectionHeading from '@/components/ui/SectionHeading'
import { urlForImage } from '@/sanity/lib/image'
import type { Cause } from '@/lib/types'

interface OurCausesProps {
  causes: Cause[]
}

// Cycle through these accent colours for cause icon circles
const accentColours = [
  { bg: 'bg-[#17458F]/10', text: 'text-[#17458F]', border: 'border-[#17458F]/20' },
  { bg: 'bg-[#F7A81B]/10', text: 'text-[#D4900F]', border: 'border-[#F7A81B]/20' },
  { bg: 'bg-[#872455]/10', text: 'text-[#872455]', border: 'border-[#872455]/20' },
  { bg: 'bg-[#0067C8]/10', text: 'text-[#0067C8]', border: 'border-[#0067C8]/20' },
  { bg: 'bg-[#2D7A3A]/10', text: 'text-[#2D7A3A]', border: 'border-[#2D7A3A]/20' },
  { bg: 'bg-[#17458F]/10', text: 'text-[#17458F]', border: 'border-[#17458F]/20' },
]

function buildImageUrl(image: Cause['image']): string | null {
  if (!image?.asset?._ref) return null
  try {
    return urlForImage(image).width(120).height(120).url()
  } catch {
    return null
  }
}

function CauseInitial({ name, accent }: { name: string; accent: typeof accentColours[0] }) {
  return (
    <div className={`
      w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0
      border ${accent.bg} ${accent.border}
    `}>
      <span className={`font-heading font-bold text-xl ${accent.text}`}>
        {name.charAt(0).toUpperCase()}
      </span>
    </div>
  )
}

function CauseCard({
  cause,
  accentIndex,
}: {
  cause: Cause
  accentIndex: number
}) {
  const accent = accentColours[accentIndex % accentColours.length]
  const imageUrl = buildImageUrl(cause.image)
  const isExternal = !!cause.externalUrl
  const href = isExternal ? cause.externalUrl! : `/causes/${cause.slug.current}`

  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="
        group flex flex-col
        bg-white rounded-[1rem] p-6
        shadow-sm hover:shadow-md
        transition-all duration-200 ease-out
        hover:-translate-y-1
        border border-transparent hover:border-[#E2E0DB]
      "
    >
      {/* Icon circle */}
      <div className="mb-4">
        {imageUrl ? (
          <div className={`
            w-14 h-14 rounded-full overflow-hidden flex-shrink-0
            border ${accent.border}
          `}>
            <Image
              src={imageUrl}
              alt={cause.image?.alt ?? cause.name}
              width={56}
              height={56}
              className="object-cover w-full h-full"
            />
          </div>
        ) : (
          <CauseInitial name={cause.name} accent={accent} />
        )}
      </div>

      {/* Text */}
      <h3 className="
        font-heading font-semibold text-[1.05rem]
        text-text-primary leading-snug mb-2
        group-hover:text-rotary-blue transition-colors duration-150
        flex items-center gap-1.5
      ">
        {cause.name}
        {isExternal && (
          <span
            className="text-text-muted text-sm font-normal"
            aria-label="opens external website"
          >
            ↗
          </span>
        )}
      </h3>

      <p className="font-body text-sm text-text-secondary leading-relaxed">
        {cause.summary}
      </p>
    </a>
  )
}

export default function OurCauses({ causes }: OurCausesProps) {
  if (!causes || causes.length === 0) return null

  const displayCauses = causes.slice(0, 6)
  const hasMore = causes.length > 6

  return (
    <section
      aria-labelledby="our-causes-heading"
      className="bg-[#F8F7F4] py-[clamp(3rem,6vw,6rem)]"
    >
      <div className="max-w-[1280px] mx-auto px-[clamp(1rem,2vw,2rem)]">

        <FadeInOnScroll>
          <SectionHeading
            eyebrow="Our Causes"
            heading="Making a Difference, Locally and Globally"
            subtitle="From supporting local families to international humanitarian projects, these are the causes closest to our hearts."
            id="our-causes-heading"
          />
        </FadeInOnScroll>

        <StaggerChildren className="
          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
          gap-6 mb-10
        ">
          {displayCauses.map((cause, index) => (
            <CauseCard
              key={cause._id}
              cause={cause}
              accentIndex={index}
            />
          ))}
        </StaggerChildren>

        {/* View all causes — only shown if more than 6 */}
        {hasMore && (
          <FadeInOnScroll>
            <div className="text-center">
              <Link
                href="/causes"
                className="
                  inline-flex items-center gap-2
                  font-body font-medium text-[0.95rem]
                  text-[#0067C8] hover:text-[#17458F]
                  transition-colors duration-150
                  group
                "
              >
                View all our causes
                <span
                  className="inline-block transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>
            </div>
          </FadeInOnScroll>
        )}

      </div>
    </section>
  )
}