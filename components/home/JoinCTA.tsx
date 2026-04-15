/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import FadeInOnScroll from "@/components/animation/FadeInOnScroll";
import Button from "@/components/ui/Button";
import type { SiteSettings } from "@/lib/types";
import Image from "next/image";

interface JoinCTAProps {
  settings: SiteSettings;
}

export default function JoinCTA({ settings }: JoinCTAProps) {
  const meetingLine1 = [settings.meetingDay, settings.meetingTime]
    .filter(Boolean)
    .join(" at ");

  const meetingLine2 = settings.meetingLocation ?? null;

  return (
    <section
      aria-labelledby="join-cta-heading"
      className="bg-[#F8F7F4] py-[clamp(3rem,6vw,6rem)]"
    >
      <div className="max-w-[1280px] mx-auto px-[clamp(1rem,2vw,2rem)]">
        <FadeInOnScroll>
          <div
            className="
            relative overflow-hidden
            rounded-[1.5rem]
            grid grid-cols-1 lg:grid-cols-2
            min-h-[420px]
          "
          >
            {/* ── Left panel: decorative ── */}
            <div
              className="
              relative
              bg-gradient-to-br from-[#17458F] to-[#0C2340]
              p-10 lg:p-14
              flex flex-col justify-between
              min-h-[260px] lg:min-h-0
            "
            >
              {/* Background pattern */}
              <div
                aria-hidden="true"
                className="
                  absolute inset-0 opacity-[0.04]
                  pointer-events-none
                "
                style={{
                  backgroundImage: `
                    radial-gradient(circle at 25% 25%, white 1px, transparent 1px),
                    radial-gradient(circle at 75% 75%, white 1px, transparent 1px)
                  `,
                  backgroundSize: "48px 48px",
                }}
              />

              {/* Decorative circles */}
              <div
                aria-hidden="true"
                className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/[0.03] pointer-events-none"
              />
              <div
                aria-hidden="true"
                className="absolute -bottom-8 -left-8 w-48 h-48 rounded-full bg-[#F7A81B]/[0.06] pointer-events-none"
              />

              {/* Rotary wheel mark */}
              <div className="relative">
                <div className="relative h-10 w-10">
                  <Image
                    src="/rotary-logo.svg"
                    alt="Rotary Club of Ely"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain object-left"
                    priority
                  />
                </div>

                <p
                  className="
                  font-body font-medium text-xs uppercase
                  tracking-[0.08em] text-[#F7A81B]
                  mb-3
                "
                >
                  Rotary Club of Ely
                </p>

                <blockquote
                  className="
                  font-heading font-bold
                  text-[clamp(1.25rem,2.5vw,1.75rem)]
                  text-white leading-snug
                "
                >
                  "Service Above Self"
                </blockquote>

                <p className="font-body text-sm text-white/60 mt-2">
                  Rotary International Motto
                </p>
              </div>

              {/* Stats row at bottom of left panel */}
              <div className="relative flex items-center gap-8 mt-8 lg:mt-0">
                <div>
                  <p className="font-heading font-bold text-2xl text-white tabular-nums">
                    1.2M+
                  </p>
                  <p className="font-body text-xs text-white/60 leading-snug mt-0.5">
                    Members worldwide
                  </p>
                </div>
                <div className="w-px h-10 bg-white/20" aria-hidden="true" />
                <div>
                  <p className="font-heading font-bold text-2xl text-white tabular-nums">
                    46,000+
                  </p>
                  <p className="font-body text-xs text-white/60 leading-snug mt-0.5">
                    Clubs globally
                  </p>
                </div>
              </div>
            </div>

            {/* ── Right panel: text + CTA ── */}
            <div
              className="
              bg-white
              p-10 lg:p-14
              flex flex-col justify-center
            "
            >
              <h2
                id="join-cta-heading"
                className="
                  font-heading font-extrabold
                  text-[clamp(1.75rem,3vw,2.5rem)]
                  text-[#1A1918] leading-tight
                  tracking-[-0.02em]
                  mb-4
                "
              >
                Be Part of Something Bigger
              </h2>

              <p
                className="
                font-body text-[clamp(0.95rem,1.2vw,1.05rem)]
                text-[#4A4845] leading-relaxed
                max-w-[420px] mb-6
              "
              >
                Whether you want to make new connections, give back to your
                community, or simply be part of a passionate local group —
                there's a place for you at Ely Rotary.
              </p>

              <p
                className="
                font-body text-sm text-[#4A4845] leading-relaxed
                max-w-[400px] mb-8
              "
              >
                No experience necessary. We welcome people from all walks of
                life who share a desire to make a positive difference.
              </p>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-4 mb-10">
                <Link href="https://rotary-ribi.org/clubs/homepage.php?ClubID=467">
                  <Button variant="primary">Join Us</Button>
                </Link>
                <Link href="https://rotary-ribi.org/clubs/homepage.php?ClubID=467">
                  <Button variant="secondary">About Us</Button>
                </Link>
              </div>

              {/* Meeting info card */}
              <div
                className="
                border-t-4 border-t-[#F7A81B]
                bg-[#F8F7F4] rounded-[0.75rem]
                p-5
                flex items-start gap-4
              "
              >
                {/* Calendar icon */}
                <div
                  className="
                    w-10 h-10 rounded-full
                    bg-[#17458F]/10
                    flex items-center justify-center
                    flex-shrink-0 mt-0.5
                  "
                  aria-hidden="true"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#17458F"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>

                <div className="flex-1 min-w-0">
                  <p
                    className="
                    font-body font-medium text-xs uppercase
                    tracking-[0.06em] text-[#8A8681]
                    mb-1
                  "
                  >
                    Come and Meet Us
                  </p>

                  {meetingLine1 && (
                    <p className="font-heading font-semibold text-[#1A1918] text-sm leading-snug">
                      {meetingLine1}
                    </p>
                  )}

                  {meetingLine2 && (
                    <p className="font-body text-sm text-[#4A4845] mt-0.5">
                      {meetingLine2}
                    </p>
                  )}

                  {settings.contactEmail && (
                    <a
                      href={`mailto:${settings.contactEmail}`}
                      className="
    inline-block mt-2
    font-body text-xs text-[#0067C8]
    hover:text-[#17458F] transition-colors duration-150
    underline underline-offset-2
    break-all
  "
                    >
                      {settings.contactEmail}
                    </a>
                  )}
                </div>

                {/* Members link */}
                <a
                  href="https://rotary-ribi.org/clubs/homepage.php?ClubID=467g"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    flex-shrink-0 self-start
                    font-body font-medium text-xs
                    text-[#8A8681] hover:text-[#17458F]
                    transition-colors duration-150
                    whitespace-nowrap
                  "
                >
                  Members ↗
                </a>
              </div>
            </div>
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  );
}
