/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import FadeInOnScroll from "@/components/animation/FadeInOnScroll";
import { urlForImage } from "@/sanity/lib/image";
import type { ClubMember } from "@/lib/types";

interface MeetTheTeamProps {
  members: ClubMember[];
}

const avatarAccents = [
  { bg: "#17458F", text: "#FFFFFF" },
  { bg: "#F7A81B", text: "#1A1918" },
  { bg: "#872455", text: "#FFFFFF" },
  { bg: "#0067C8", text: "#FFFFFF" },
  { bg: "#2D7A3A", text: "#FFFFFF" },
  { bg: "#0C2340", text: "#FFFFFF" },
];

function buildPhotoUrl(
  photo: ClubMember["photo"],
  width = 500,
  height = 500,
): string | null {
  if (!photo?.asset?._ref) return null;

  try {
    return urlForImage(photo)
      .width(width)
      .height(height)
      .fit("crop")
      .auto("format")
      .url();
  } catch {
    return null;
  }
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n.charAt(0).toUpperCase())
    .slice(0, 2)
    .join("");
}

function MemberCard({ member, index }: { member: ClubMember; index: number }) {
  const photoUrl = buildPhotoUrl(member.photo, 440, 440);
  const accent = avatarAccents[index % avatarAccents.length];

  return (
    <div className="group w-[220px] flex-shrink-0 select-none overflow-hidden rounded-[1.5rem] border border-grey-200 bg-white shadow-sm transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-square w-full overflow-hidden bg-rotary-blue">
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt={member.name}
            fill
            sizes="220px"
            className="image-polish object-cover transition-transform duration-300 ease-out group-hover:scale-105"
            style={
              member.photo?.hotspot
                ? {
                    objectPosition: `${member.photo.hotspot.x * 100}% ${
                      member.photo.hotspot.y * 100
                    }%`,
                  }
                : undefined
            }
            draggable={false}
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center"
            style={{ backgroundColor: accent.bg }}
          >
            <span
              className="font-heading text-4xl font-black"
              style={{ color: accent.text }}
            >
              {getInitials(member.name)}
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
      </div>

      <div className="p-5 text-center">
        <h3 className="font-heading text-base font-black leading-snug text-grey-900">
          {member.name}
        </h3>

        {member.role && (
          <p className="mt-2 text-xs font-bold uppercase tracking-[0.08em] text-rotary-blue">
            {member.role}
          </p>
        )}

        {member.bio && (
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-grey-700">
            {member.bio}
          </p>
        )}
      </div>
    </div>
  );
}

function FeaturedMember({ member }: { member: ClubMember }) {
  const photoUrl = buildPhotoUrl(member.photo, 720, 820);

  return (
    <FadeInOnScroll>
      <div className="mb-12 overflow-hidden rounded-[2rem] bg-white shadow-lg">
        <div className="grid lg:grid-cols-[390px_1fr]">
          <div className="relative min-h-[360px] overflow-hidden bg-rotary-blue lg:min-h-[480px]">
            {photoUrl ? (
              <Image
                src={photoUrl}
                alt={member.name}
                fill
                className="image-polish object-cover"
                sizes="(max-width: 1024px) 100vw, 390px"
                style={
                  member.photo?.hotspot
                    ? {
                        objectPosition: `${member.photo.hotspot.x * 100}% ${
                          member.photo.hotspot.y * 100
                        }%`,
                      }
                    : undefined
                }
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-rotary-blue to-rotary-blue-dark">
                <span className="font-heading text-7xl font-black text-white">
                  {getInitials(member.name)}
                </span>
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent" />
          </div>

          <div className="relative flex flex-col justify-center overflow-hidden p-8 sm:p-10 lg:p-12">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-rotary-gold/10" />

            <div className="relative">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-rotary-gold">
                Leadership
              </p>

              <h3 className="mt-4 font-heading text-4xl font-black leading-tight text-grey-900 md:text-5xl">
                {member.name}
              </h3>

              {member.role && (
                <p className="mt-3 text-xl font-bold text-rotary-blue">
                  {member.role}
                </p>
              )}

              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-grey-700">
                {member.bio ||
                  "Helping guide Rotary Club of Ely's mission of service, community engagement and positive local impact."}
              </p>

              <Link
                href="/about"
                className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-rotary-blue px-7 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:bg-rotary-blue-dark"
              >
                Learn about the club
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </FadeInOnScroll>
  );
}

export default function MeetTheTeam({ members }: MeetTheTeamProps) {
  const shouldReduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const scrollPosRef = useRef(0);
  const isPausedRef = useRef(false);
  const [isPaused, setIsPaused] = useState(false);

  if (!members || members.length === 0) return null;

  const featuredMember =
    members.find((member) =>
      member.role?.toLowerCase().includes("president"),
    ) || members[0];

  const carouselMembers =
    members.length > 1
      ? members.filter((member) => member._id !== featuredMember._id)
      : members;

  const displayMembers = [
    ...carouselMembers,
    ...carouselMembers,
    ...carouselMembers,
  ];

  const CARD_WIDTH = 220;
  const GAP = 16;
  const STEP = CARD_WIDTH + GAP;
  const SPEED = 0.5;

  const applyScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track || carouselMembers.length === 0) return;

    const singleSetWidth = carouselMembers.length * STEP;

    if (scrollPosRef.current >= singleSetWidth * 2) {
      scrollPosRef.current = singleSetWidth;
    }

    if (scrollPosRef.current < 0) {
      scrollPosRef.current = singleSetWidth;
    }

    track.scrollLeft = scrollPosRef.current;
  }, [carouselMembers.length, STEP]);

  useEffect(() => {
    if (shouldReduceMotion || carouselMembers.length <= 1) return;

    const tick = () => {
      if (!isPausedRef.current) {
        scrollPosRef.current += SPEED;
        applyScroll();
      }

      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [shouldReduceMotion, applyScroll, carouselMembers.length]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || carouselMembers.length === 0) return;

    const singleSetWidth = carouselMembers.length * STEP;
    scrollPosRef.current = singleSetWidth;
    track.scrollLeft = singleSetWidth;
  }, [carouselMembers.length, STEP]);

  const pause = () => {
    isPausedRef.current = true;
    setIsPaused(true);
  };

  const resume = () => {
    isPausedRef.current = false;
    setIsPaused(false);
  };

  const scrollBy = (direction: "left" | "right") => {
    scrollPosRef.current += direction === "right" ? STEP : -STEP;
    applyScroll();
  };

  return (
    <section
      aria-labelledby="meet-the-team-heading"
      className="relative overflow-hidden bg-white py-20 md:py-28"
    >
      <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-rotary-blue/5 blur-3xl" />
      <div className="absolute -left-40 bottom-10 h-96 w-96 rounded-full bg-rotary-gold/10 blur-3xl" />

      <div className="relative mx-auto max-w-[1280px]">
        <div className="mb-12 px-[clamp(1rem,2vw,2rem)]">
          <FadeInOnScroll>
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div>
                <p className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-rotary-gold">
                  The People Behind It
                </p>

                <h2
                  id="meet-the-team-heading"
                  className="font-heading text-4xl font-black leading-tight text-grey-900 md:text-6xl"
                >
                  Meet the
                  <span className="block text-rotary-blue">Team</span>
                </h2>
              </div>

              <p className="max-w-2xl text-lg leading-relaxed text-grey-700 lg:justify-self-end">
                Rotary Club of Ely is powered by volunteers who give their time,
                experience and energy to support the community and create
                lasting impact.
              </p>
            </div>
          </FadeInOnScroll>
        </div>

        <div className="px-[clamp(1rem,2vw,2rem)]">
          <FeaturedMember member={featuredMember} />
        </div>

        {carouselMembers.length > 0 && (
          <>
            <div className="mb-5 flex items-center gap-4 px-[clamp(1rem,2vw,2rem)]">
              <h3 className="font-heading text-2xl font-black text-grey-900">
                Club Leadership
              </h3>
              <div className="h-px flex-1 bg-grey-200" />
            </div>

            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute bottom-0 left-0 top-0 z-10 w-16 bg-gradient-to-r from-white to-transparent pointer-events-none"
              />

              <div
                aria-hidden="true"
                className="absolute bottom-0 right-0 top-0 z-10 w-16 bg-gradient-to-l from-white to-transparent pointer-events-none"
              />

              <button
                onClick={() => scrollBy("left")}
                onMouseEnter={pause}
                onMouseLeave={resume}
                aria-label="Scroll left"
                className="absolute left-3 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white text-rotary-blue shadow-md transition hover:bg-rotary-blue hover:text-white"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              <button
                onClick={() => scrollBy("right")}
                onMouseEnter={pause}
                onMouseLeave={resume}
                aria-label="Scroll right"
                className="absolute right-3 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white text-rotary-blue shadow-md transition hover:bg-rotary-blue hover:text-white"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>

              <div
                ref={trackRef}
                className="scrollbar-hide flex gap-4 overflow-x-scroll px-[clamp(1rem,2vw,2rem)] pb-4"
                style={{ scrollBehavior: "auto" }}
                tabIndex={0}
                role="region"
                aria-label="Club members carousel — use arrow buttons or arrow keys to scroll"
                onMouseEnter={pause}
                onMouseLeave={resume}
                onTouchStart={pause}
                onTouchEnd={resume}
                onFocus={pause}
                onBlur={resume}
              >
                {displayMembers.map((member, index) => (
                  <MemberCard
                    key={`${member._id}-${index}`}
                    member={member}
                    index={index % carouselMembers.length}
                  />
                ))}
              </div>
            </div>

            {isPaused && !shouldReduceMotion && (
              <div className="mt-2 flex justify-center">
                <span className="flex items-center gap-1.5 text-xs text-grey-700">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-rotary-gold" />
                  Paused
                </span>
              </div>
            )}
          </>
        )}

        <FadeInOnScroll>
          <div className="mt-8 px-[clamp(1rem,2vw,2rem)] text-center">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-full border border-rotary-blue px-6 py-3 text-sm font-black uppercase tracking-wide text-rotary-blue transition hover:bg-rotary-blue hover:text-white"
            >
              Learn more about us
              <span
                className="inline-block transition-transform duration-200 group-hover:translate-x-1"
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
