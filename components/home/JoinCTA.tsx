/* eslint-disable react/no-unescaped-entities */

import Image from "next/image";
import Link from "next/link";
import FadeInOnScroll from "@/components/animation/FadeInOnScroll";
import type { SiteSettings } from "@/lib/types";

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
      className="relative overflow-hidden bg-white py-20 md:py-28"
    >
      <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-rotary-blue/10 blur-3xl" />
      <div className="absolute -left-40 bottom-10 h-96 w-96 rounded-full bg-rotary-gold/15 blur-3xl" />

      <div className="mx-auto max-w-[1280px] px-[clamp(1rem,2vw,2rem)]">
        <FadeInOnScroll>
          <div className="relative overflow-hidden rounded-[2rem] bg-slate-950 shadow-card-hover">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(247,168,27,0.22),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(0,103,200,0.34),transparent_38%)]" />

            <div className="relative grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="relative min-h-[420px] overflow-hidden p-8 sm:p-10 lg:p-14">
                <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full border-[28px] border-white/5" />
                <div className="absolute -bottom-28 right-8 h-80 w-80 rounded-full bg-rotary-gold/10 blur-3xl" />

                <div className="relative flex h-full flex-col justify-between">
                  <div>
                    <div className="relative mb-5 h-12 w-12">
                      <Image
                        src="/rotary-logo.svg"
                        alt="Rotary Club of Ely"
                        fill
                        sizes="48px"
                        className="object-contain object-left"
                      />
                    </div>

                    <p className="text-sm font-black uppercase tracking-[0.24em] text-rotary-gold">
                      Rotary Club of Ely
                    </p>

                    <blockquote className="mt-5 max-w-md font-heading text-4xl font-black leading-tight text-white md:text-5xl">
                      "Service Above Self"
                    </blockquote>

                    <p className="mt-4 max-w-sm text-base leading-relaxed text-white/65">
                      A local club connected to a worldwide movement of people
                      taking action.
                    </p>
                  </div>

                  <div className="mt-12 grid max-w-md grid-cols-2 gap-4">
                    <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                      <p className="font-heading text-3xl font-black text-white">
                        1.2M+
                      </p>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-white/55">
                        Members worldwide
                      </p>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                      <p className="font-heading text-3xl font-black text-white">
                        45k+
                      </p>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-white/55">
                        Clubs globally
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative bg-white p-8 sm:p-10 lg:p-14">
                <div className="absolute right-0 top-0 h-48 w-48 rounded-bl-full bg-rotary-gold/10" />

                <div className="relative">
                  <p className="mb-4 text-sm font-black uppercase tracking-[0.22em] text-rotary-gold">
                    Get involved
                  </p>

                  <h2
                    id="join-cta-heading"
                    className="font-heading text-4xl font-black leading-tight text-grey-900 md:text-5xl"
                  >
                    Be Part of Something
                    <span className="block text-rotary-blue">Bigger</span>
                  </h2>

                  <p className="mt-6 max-w-xl text-lg leading-relaxed text-grey-700">
                    Whether you want to give back, meet new people, volunteer at
                    community events, or support good causes, there's a place
                    for you at Ely Rotary.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-4">
                    <Link
                      href="/contact"
                      className="inline-flex rounded-full bg-rotary-blue px-7 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:bg-rotary-blue-dark"
                    >
                      Contact us
                    </Link>

                    <Link
                      href="/about"
                      className="inline-flex rounded-full border border-rotary-blue px-7 py-3 text-sm font-black uppercase tracking-wide text-rotary-blue transition hover:bg-rotary-blue hover:text-white"
                    >
                      Learn about the club
                    </Link>
                  </div>

                  <div className="mt-10 grid gap-4 sm:grid-cols-3">
                    <div className="rounded-2xl bg-off-white p-5">
                      <p className="text-sm font-black text-rotary-blue">
                        Volunteer
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-grey-700">
                        Help at events and community activities.
                      </p>
                    </div>

                    <div className="rounded-2xl bg-off-white p-5">
                      <p className="text-sm font-black text-rotary-blue">
                        Connect
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-grey-700">
                        Meet people who care about Ely.
                      </p>
                    </div>

                    <div className="rounded-2xl bg-off-white p-5">
                      <p className="text-sm font-black text-rotary-blue">
                        Serve
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-grey-700">
                        Support local and international causes.
                      </p>
                    </div>
                  </div>

                  {(meetingLine1 || meetingLine2 || settings.contactEmail) && (
                    <div className="mt-8 rounded-3xl border border-grey-200 bg-off-white p-5">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex gap-4">
                          <div
                            className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-rotary-blue/10"
                            aria-hidden="true"
                          >
                            <svg
                              width="19"
                              height="19"
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

                          <div>
                            <p className="text-xs font-black uppercase tracking-[0.16em] text-rotary-gold-dark">
                              Come and meet us
                            </p>

                            {meetingLine1 && (
                              <p className="mt-1 font-heading text-base font-bold text-grey-900">
                                {meetingLine1}
                              </p>
                            )}

                            {meetingLine2 && (
                              <p className="mt-1 text-sm text-grey-700">
                                {meetingLine2}
                              </p>
                            )}

                            {settings.contactEmail && (
                              <a
                                href={`mailto:${settings.contactEmail}`}
                                className="mt-2 inline-block break-all text-sm font-bold text-rotary-azure underline underline-offset-4 transition hover:text-rotary-blue"
                              >
                                {settings.contactEmail}
                              </a>
                            )}
                          </div>
                        </div>

                        <a
                          href="https://rotary-ribi.org/clubs/homepage.php?ClubID=467g"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 text-sm font-bold text-grey-700 transition hover:text-rotary-blue"
                        >
                          Members ↗
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  );
}
