/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import FadeInOnScroll from "@/components/animation/FadeInOnScroll";
import SectionHeading from "@/components/ui/SectionHeading";
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

function buildPhotoUrl(photo: ClubMember["photo"]): string | null {
  if (!photo?.asset?._ref) return null;
  try {
    return urlForImage(photo).width(400).height(400).url();
  } catch {
    return null;
  }
}

function MemberCard({ member, index }: { member: ClubMember; index: number }) {
  const photoUrl = buildPhotoUrl(member.photo);
  const accent = avatarAccents[index % avatarAccents.length];
  const initials = member.name
    .split(" ")
    .map((n) => n.charAt(0).toUpperCase())
    .slice(0, 2)
    .join("");

  return (
    <div
      className="
      flex-shrink-0 w-[220px]
      bg-white rounded-[1rem]
      shadow-sm
      overflow-hidden
      transition-all duration-200 ease-out
      hover:-translate-y-1 hover:shadow-md
      group
      select-none
    "
    >
      {/* Photo or avatar */}
      <div className="relative w-full aspect-square overflow-hidden">
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt={member.name}
            fill
            sizes="220px"
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
            draggable={false}
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
        <h3
          className="
          font-heading font-semibold
          text-[1rem] text-text-primary
          leading-snug mb-1
        "
        >
          {member.name}
        </h3>
        {member.role && (
          <p
            className="
            font-body text-xs font-medium uppercase
            tracking-[0.06em] text-[#D4900F] mb-3
          "
          >
            {member.role}
          </p>
        )}
        {member.bio && (
          <p
            className="
            font-body text-sm text-text-secondary
            leading-relaxed line-clamp-3
          "
          >
            {member.bio}
          </p>
        )}
      </div>
    </div>
  );
}

export default function MeetTheTeam({ members }: MeetTheTeamProps) {
  const shouldReduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const scrollPosRef = useRef(0);
  const isPausedRef = useRef(false);
  const [isPaused, setIsPaused] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  if (!members || members.length === 0) return null;

  // Duplicate members for seamless loop
  const displayMembers = [...members, ...members, ...members];

  const CARD_WIDTH = 220;
  const GAP = 16;
  const STEP = CARD_WIDTH + GAP;
  const SPEED = 0.5; // px per frame

  const updateArrows = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setCanScrollLeft(scrollPosRef.current > 0);
    setCanScrollRight(true); // always true since it loops
  }, []);

  const applyScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const singleSetWidth = members.length * STEP;
    // Reset to start of second set for seamless loop
    if (scrollPosRef.current >= singleSetWidth * 2) {
      scrollPosRef.current = singleSetWidth;
    }
    if (scrollPosRef.current < 0) {
      scrollPosRef.current = singleSetWidth;
    }
    track.scrollLeft = scrollPosRef.current;
    updateArrows();
  }, [members.length, STEP, updateArrows]);

  // Auto-scroll loop
  useEffect(() => {
    if (shouldReduceMotion) return;

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
  }, [shouldReduceMotion, applyScroll, SPEED]);

  // Initialise scroll to middle set so user can scroll left immediately
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const singleSetWidth = members.length * STEP;
    scrollPosRef.current = singleSetWidth;
    track.scrollLeft = singleSetWidth;
  }, [members.length, STEP]);

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
      className="bg-[#F8F7F4] py-[clamp(3rem,6vw,6rem)]"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Heading */}
        <div
          className="px-[clamp(1rem,2vw,2rem)] mb-8"
          id="meet-the-team-heading"
        >
          <FadeInOnScroll>
            <SectionHeading
              eyebrow="The People Behind It"
              title="Meet the Team"
              subtitle="Our club is run entirely by volunteers who give their time, energy, and enthusiasm to make Ely a better place."
            />
          </FadeInOnScroll>
        </div>

        {/* Carousel wrapper */}
        <div className="relative">
          {/* Left fade edge */}
          <div
            aria-hidden="true"
            className="
              absolute left-0 top-0 bottom-0 w-16 z-10
              bg-gradient-to-r from-[#F8F7F4] to-transparent
              pointer-events-none
            "
          />

          {/* Right fade edge */}
          <div
            aria-hidden="true"
            className="
              absolute right-0 top-0 bottom-0 w-16 z-10
              bg-gradient-to-l from-[#F8F7F4] to-transparent
              pointer-events-none
            "
          />

          {/* Left arrow */}
          <button
            onClick={() => scrollBy("left")}
            onMouseEnter={pause}
            onMouseLeave={resume}
            aria-label="Scroll left"
            className="
              absolute left-3 top-1/2 -translate-y-1/2 z-20
              w-10 h-10 rounded-full
              bg-white shadow-md
              flex items-center justify-center
              text-[#17458F]
              hover:bg-[#17458F] hover:text-white
              transition-all duration-200
              disabled:opacity-30
            "
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

          {/* Right arrow */}
          <button
            onClick={() => scrollBy("right")}
            onMouseEnter={pause}
            onMouseLeave={resume}
            aria-label="Scroll right"
            className="
              absolute right-3 top-1/2 -translate-y-1/2 z-20
              w-10 h-10 rounded-full
              bg-white shadow-md
              flex items-center justify-center
              text-[#17458F]
              hover:bg-[#17458F] hover:text-white
              transition-all duration-200
            "
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

          {/* Scrollable track — hidden scrollbar, not snap */}
          <div
            ref={trackRef}
            className="
              flex gap-4
              overflow-x-scroll
              scrollbar-hide
              px-[clamp(1rem,2vw,2rem)]
              pb-4
            "
            style={{ scrollBehavior: "auto" }}
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
                index={index % members.length}
              />
            ))}
          </div>
        </div>

        {/* Pause indicator */}
        {isPaused && !shouldReduceMotion && (
          <div className="flex justify-center mt-2">
            <span
              className="
              font-body text-xs text-text-muted
              flex items-center gap-1.5
            "
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#F7A81B]" />
              Paused
            </span>
          </div>
        )}

        {/* View all link */}
        <FadeInOnScroll>
          <div className="text-center mt-8 px-[clamp(1rem,2vw,2rem)]">
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
