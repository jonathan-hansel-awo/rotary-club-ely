import Link from 'next/link'
import Image from 'next/image'
import FadeInOnScroll from '@/components/animation/FadeInOnScroll'
import SectionHeading from '@/components/ui/SectionHeading'
import { urlForImage } from '@/sanity/lib/image'
import type { ClubMember } from '@/lib/types'

interface MeetTheTeamProps {
  members: ClubMember[]
}

// Accent colours cycling for avatar initials
const avatarAccents = [
  { bg: '#17458F', text: '#FFFFFF' },
  { bg: '#F7A81B', text: '#1A1918' },
  { bg: '#872455', text: '#FFFFFF' },
  { bg: '#0067C8', text: '#FFFFFF' },
  { bg: '#2D7A3A', text: '#FFFFFF' },
  { bg: '#0C2340', text: '#FFFFFF' },
]

function buildPhotoUrl(photo: ClubMember['photo']): string | null {
  if (!photo?.asset?._ref) return null
  try {
    return urlForImage(photo).width(400).height(400).url()
  } catch {
    return null
  }
}

function MemberCard({
  member,
  index,
}: {
  member: ClubMember
  index: number
}) {
  const photoUrl = buildPhotoUrl(member.photo)
  const accent = avatarAccents[index % avatarAccents.length]
  const initials = member.name
    .split(' ')
    .map((n) => n.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('')

  return (
    <div
      className="
        flex-shrink-0
        w-[240px] sm:w-auto
        bg-white rounded-[1rem]
        shadow-sm
        overflow-hidden
        transition-all duration-200 ease-out
        hover:-translate-y-1 hover:shadow-md
        group
      "
    >
      {/* Photo or avatar */}
      <div className="relative w-full aspect-square overflow-hidden">
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt={member.name}
            fill
            sizes="(max-width: 640px) 240px, (max-width: 1024px) 33vw, 25vw"
            className="
              object-cover
              transition-transform duration-300 ease-out
              group-hover:scale-105
            "
            style={
              member.photo?.hotspot
                ? {
                    objectPosition: `${member.photo.hotspot.x * 100}% ${member.photo.hotspot.y * 100}%`,
                  }
                : undefined
            }
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ backgroundColor: accent.bg }}
          >
            <span
              className="font-heading font-bold text-4xl"
              style={{ color: accent.text }}
            >
              {initials}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="
          font-heading font-semibold
          text-[1rem] text-text-primary
          leading-snug mb-1
        ">
          {member.name}
        </h3>

        {member.role && (
          <p className="
            font-body text-xs font-medium uppercase
            tracking-[0.06em] text-[#D4900F]
            mb-3
          ">
            {member.role}
          </p>
        )}

        {member.bio && (
          <p className="
            font-body text-sm text-text-secondary
            leading-relaxed line-clamp-3
          ">
            {member.bio}
          </p>
        )}
      </div>
    </div>
  )
}

export default function MeetTheTeam({ members }: MeetTheTeamProps) {
  if (!members || members.length === 0) return null

  return (
    <section
      aria-labelledby="meet-the-team-heading"
      className="bg-[#F8F7F4] py-[clamp(3rem,6vw,6rem)]"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Heading — inside gutter */}
        <div className="px-[clamp(1rem,2vw,2rem)]" id="meet-the-team-heading"
        >
          <FadeInOnScroll>
            <SectionHeading
              eyebrow="The People Behind It"
              title="Meet the Team"
              subtitle="Our club is run entirely by volunteers who give their time, energy, and enthusiasm to make Ely a better place."
            />
          </FadeInOnScroll>
        </div>

        {/* 
          Mobile: horizontal scroll with snap
          Desktop: grid 
        */}
        <div
          className="
            flex gap-4 overflow-x-auto
            px-[clamp(1rem,2vw,2rem)]
            pb-6
            snap-x snap-mandatory
            scroll-smooth
            scrollbar-hide

            sm:grid sm:overflow-visible
            sm:grid-cols-2
            sm:pb-0

            lg:grid-cols-4
          "
          role="list"
        >
          {members.map((member, index) => (
            <div key={member._id} className="snap-start" role="listitem">
              <FadeInOnScroll delay={index * 0.08}>
                <MemberCard member={member} index={index} />
              </FadeInOnScroll>
            </div>
          ))}
        </div>

        {/* Scroll hint — mobile only */}
        <div
          className="
          flex items-center justify-center gap-2
          mt-4 px-[clamp(1rem,2vw,2rem)]
          sm:hidden
        "
        >
          <div className="h-px flex-1 bg-[#E2E0DB]" />
          <p className="font-body text-xs text-text-muted whitespace-nowrap">
            Swipe to see more
          </p>
          <div className="h-px flex-1 bg-[#E2E0DB]" />
        </div>

        {/* About page link */}
        <FadeInOnScroll>
          <div className="text-center mt-10 px-[clamp(1rem,2vw,2rem)]">
            <Link
              href="/about"
              className="
                inline-flex items-center gap-2
                font-body font-medium text-[0.95rem]
                text-[#0067C8] hover:text-[#17458F]
                transition-colors duration-150
                group
              "
            >
              Learn more about us
              <span
                className="
                  inline-block transition-transform
                  duration-200 group-hover:translate-x-1
                "
                aria-hidden="true"
              >
                →
              </span>
            </Link>
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  );
}