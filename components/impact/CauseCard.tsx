/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link'
import Image from 'next/image'
import { urlForImage } from '@/sanity/lib/image'
import FadeInOnScroll from '@/components/animation/FadeInOnScroll'

interface CauseCardProps {
  cause: {
    _id: string
    name: string
    slug: { current: string }
    summary: string
    image?: any
    externalUrl?: string
  }
  index?: number
}

// Accent colours cycling through brand palette
const ACCENT_COLOURS = [
  'from-rotary-blue/10 to-rotary-blue/5',
  'from-rotary-gold/15 to-rotary-gold/5',
  'from-cranberry/10 to-cranberry/5',
  'from-rotary-blue-dark/10 to-rotary-blue-dark/5',
]

const ICON_COLOURS = [
  'bg-rotary-blue/15 text-rotary-blue',
  'bg-rotary-gold/20 text-rotary-gold-dark',
  'bg-cranberry/10 text-cranberry',
  'bg-rotary-blue-dark/10 text-rotary-blue-dark',
]

export default function CauseCard({ cause, index = 0 }: CauseCardProps) {
  const imageSrc = cause.image
    ? urlForImage(cause.image)?.width(800).height(500).url()
    : null

  const accentIndex = index % ACCENT_COLOURS.length
  const isExternal = !!cause.externalUrl

  const CardContent = (
    <div className="group block h-full rounded-xl bg-white shadow-sm border border-grey-200 overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover">

      {/* Image or illustrated fallback */}
      <div className={`relative h-44 w-full overflow-hidden bg-gradient-to-br ${ACCENT_COLOURS[accentIndex]}`}>
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={cause.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <div
              className={`flex h-16 w-16 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110 ${ICON_COLOURS[accentIndex]}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9"
                />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="font-heading text-lg font-semibold text-grey-900 leading-snug group-hover:text-rotary-blue transition-colors">
            {cause.name}
          </h3>
          {isExternal && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 shrink-0 text-grey-400 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          )}
        </div>
        <p className="text-sm text-grey-600 leading-relaxed line-clamp-3">
          {cause.summary}
        </p>
        <div className="mt-4 flex items-center gap-1 text-sm font-medium text-rotary-blue">
          {isExternal ? 'Visit website' : 'Learn more'}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  )

  return (
    <FadeInOnScroll delay={index * 0.08}>
      {isExternal ? (
        <a
          href={cause.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rotary-gold rounded-xl"
          aria-label={`${cause.name} — opens external website`}
        >
          {CardContent}
        </a>
      ) : (
        <Link
          href={`/causes/${cause.slug.current}`}
          className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rotary-gold rounded-xl"
        >
          {CardContent}
        </Link>
      )}
    </FadeInOnScroll>
  )
}