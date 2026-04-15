/* eslint-disable @typescript-eslint/no-explicit-any */
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { urlForImage } from '@/sanity/lib/image'
import { PortableText } from '@portabletext/react'
import { portableTextComponents } from '@/sanity/lib/portable-text'
import Badge from '@/components/ui/Badge'
import EventGallery from '@/components/events/EventGallery'
import EventCard from '@/components/events/EventCard'
import FadeInOnScroll from '@/components/animation/FadeInOnScroll'
import StaggerChildren from '@/components/animation/StaggerChildren'
import { getAllEvents, getEventBySlug } from '@/lib/sanity.fetch'
import Container from '@/components/layout/Container'
import { TypedObject } from 'sanity'
import { SanityImage } from '@/lib/types'
import ShareButton from '../ShareButton'

export const revalidate = 3600

export async function generateStaticParams() {
  const events = await getAllEvents()
  return events.map((event: { slug: { current: string } }) => ({
    slug: event.slug.current,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const event = await getEventBySlug(slug)
  if (!event) return {}

  const ogImage = event.heroImage
    ? urlForImage(event.heroImage)?.width(1200).height(630).url()
    : undefined

  return {
    title: `${event.title} | Rotary Club of Ely`,
    description: `Join us for ${event.title}${event.location ? ` at ${event.location}` : ''}. Organised by the Rotary Club of Ely.`,
    openGraph: {
      title: event.title,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : [],
      type: 'article',
    },
  }
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function formatTime(dateString: string) {
  return new Date(dateString).toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const event = await getEventBySlug(slug)

  if (!event) notFound()

  const heroSrc = event.heroImage
    ? urlForImage(event.heroImage)?.width(1600).height(900).url()
    : null

  const isUpcoming = new Date(event.dateStart) >= new Date()

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    startDate: event.dateStart,
    endDate: event.dateEnd || event.dateStart,
    location: event.location
      ? { '@type': 'Place', name: event.location }
      : undefined,
    organizer: {
      '@type': 'Organization',
      name: 'Rotary Club of Ely',
      url: 'https://rotaryclubofely.co.uk',
    },
    image: heroSrc || undefined,
    eventStatus: isUpcoming
      ? 'https://schema.org/EventScheduled'
      : 'https://schema.org/EventPostponed',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero image */}
      <div className="relative h-[50vh] min-h-[320px] max-h-[560px] w-full overflow-hidden bg-rotary-blue-dark">
        {heroSrc ? (
          <>
            <Image
              src={heroSrc}
              alt={event.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-rotary-blue-dark/70 via-transparent to-rotary-blue-dark/30" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-rotary-blue to-rotary-blue-dark" />
        )}

        {/* Overlaid category badge + title */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <Container>
            <div className="flex items-center gap-3 mb-3">
              <Badge variant="category">{event.category}</Badge>
              <Badge variant={isUpcoming ? 'upcoming' : 'past'}>
                {isUpcoming ? 'Upcoming' : 'Past Event'}
              </Badge>
            </div>
            <h1 className="font-heading text-3xl font-bold text-white md:text-4xl lg:text-5xl leading-tight max-w-3xl">
              {event.title}
            </h1>
          </Container>
        </div>
      </div>

      <main id="main-content">
        <section className="bg-off-white py-12 md:py-16">
          <Container>
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-2 text-sm text-grey-500">
                <li><Link href="/" className="hover:text-rotary-blue transition-colors">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link href="/events" className="hover:text-rotary-blue transition-colors">Events</Link></li>
                <li aria-hidden="true">/</li>
                <li className="text-grey-700 font-medium truncate max-w-[200px]">{event.title}</li>
              </ol>
            </nav>

            <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">

              {/* Main content */}
              <div className="lg:col-span-2">

                {/* Event metadata bar */}
                <FadeInOnScroll>
                  <div className="mb-8 rounded-xl bg-white p-6 shadow-sm border border-grey-200">
                    <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <div>
                        <dt className="text-xs font-medium uppercase tracking-wider text-grey-500 mb-1">Date</dt>
                        <dd className="text-sm font-semibold text-grey-900">
                          {formatDate(event.dateStart)}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs font-medium uppercase tracking-wider text-grey-500 mb-1">Time</dt>
                        <dd className="text-sm font-semibold text-grey-900">
                          {formatTime(event.dateStart)}
                          {event.dateEnd && ` – ${formatTime(event.dateEnd)}`}
                        </dd>
                      </div>
                      {event.location && (
                        <div>
                          <dt className="text-xs font-medium uppercase tracking-wider text-grey-500 mb-1">Location</dt>
                          <dd className="text-sm font-semibold text-grey-900">{event.location}</dd>
                        </div>
                      )}
                    </dl>
                  </div>
                </FadeInOnScroll>

                {/* Rich text body */}
                <FadeInOnScroll delay={0.1}>
                  <div className="prose prose-lg max-w-none">
                    {event.description && (
                      <PortableText
                        value={event.description as any}
                        components={portableTextComponents}
                      />
                    )}
                  </div>
                </FadeInOnScroll>

                {/* External link */}
                {event.externalUrl && (
                  <FadeInOnScroll delay={0.15}>
                    <div className="mt-8">
                      <a
                        href={event.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg bg-rotary-blue px-6 py-3 font-medium text-white transition-colors hover:bg-rotary-blue-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rotary-gold"
                      >
                        Visit Event Website
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </FadeInOnScroll>
                )}

                {/* Gallery */}
                {event.gallery && event.gallery.length > 0 && (
                  <FadeInOnScroll delay={0.2}>
                    <div className="mt-12">
                      <h2 className="font-heading text-2xl font-bold text-grey-900 mb-6">
                        Photo Gallery
                      </h2>
                      <EventGallery images={event.gallery as any[]} />
                    </div>
                  </FadeInOnScroll>
                )}
              </div>

              {/* Sidebar */}
              <aside className="lg:col-span-1">
                <FadeInOnScroll delay={0.2}>
                  <div className="sticky top-28 space-y-6">

                    {/* Share / back */}
                    <div className="rounded-xl bg-white p-6 shadow-sm border border-grey-200">
                      <h3 className="font-heading text-base font-semibold text-grey-900 mb-4">
                        Share this event
                      </h3>
                      <ShareButton title={event.title} />
                    </div>

                    {/* Related events */}
                    {event.relatedEvents && event.relatedEvents.length > 0 && (
                      <div className="rounded-xl bg-white p-6 shadow-sm border border-grey-200">
                        <h3 className="font-heading text-base font-semibold text-grey-900 mb-4">
                          More {event.category} Events
                        </h3>
                        <ul className="space-y-4">
                          {event.relatedEvents.map((related: any) => (
                            <li key={related._id}>
                              <Link
                                href={`/events/${related.slug.current}`}
                                className="group block"
                              >
                                <p className="text-sm font-medium text-grey-900 group-hover:text-rotary-blue transition-colors leading-snug">
                                  {related.title}
                                </p>
                                <p className="mt-0.5 text-xs text-grey-500">
                                  {formatDate(related.dateStart)}
                                </p>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Back link */}
                    <Link
                      href="/events"
                      className="flex items-center gap-2 text-sm font-medium text-rotary-blue hover:text-rotary-blue-dark transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                      </svg>
                      Back to all events
                    </Link>
                  </div>
                </FadeInOnScroll>
              </aside>

            </div>
          </Container>
        </section>

        {/* Related events — full width strip */}
        {event.relatedEvents && event.relatedEvents.length > 0 && (
          <section className="bg-white py-16 border-t border-grey-200">
            <Container>
              <h2 className="font-heading text-2xl font-bold text-grey-900 mb-8">
                More Events You Might Like
              </h2>
              <StaggerChildren className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {event.relatedEvents.map((related: any, index: number) => (
                  <EventCard key={related._id} event={related} index={index} />
                ))}
              </StaggerChildren>
            </Container>
          </section>
        )}
      </main>
    </>
  )
}
