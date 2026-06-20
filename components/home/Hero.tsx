/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import type { HeroImage } from "@/lib/types";
import { urlForImage } from "@/sanity/lib/image";
import Button from "@/components/ui/Button";
import { clubAge } from "@/lib/utilities";

interface HeroProps {
  imageSrc: string;
  imageAlt: string;
  heroImages?: HeroImage[];
}

const heroStats = [
  {
    value: `${clubAge}`,
    label: "Years serving Ely",
    eyebrow: "Since 1938",
    icon: "people",
  },
  {
    value: "£70k+",
    label: "Raised in the last 5 years",
    eyebrow: "Donated locally",
    icon: "heart",
  },
  {
    value: "50+",
    label: "Charities supported",
    eyebrow: "Local & global",
    icon: "globe",
  },
  {
    value: "Annual",
    label: "Events & activities",
    eyebrow: "Community calendar",
    icon: "calendar",
  },
];

function StatIcon({ type }: { type: string }) {
  const commonProps = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2.2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (type === "heart") {
    return (
      <svg {...commonProps}>
        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />
      </svg>
    );
  }

  if (type === "globe") {
    return (
      <svg {...commonProps}>
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 0 20" />
        <path d="M12 2a15.3 15.3 0 0 0 0 20" />
      </svg>
    );
  }

  if (type === "calendar") {
    return (
      <svg {...commonProps}>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4" />
        <path d="M8 2v4" />
        <path d="M3 10h18" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export default function Hero({ imageSrc, imageAlt, heroImages }: HeroProps) {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  const imageY = useTransform(scrollY, [0, 700], [0, 120]);
  const imageScale = useTransform(scrollY, [0, 700], [1.04, 1.12]);
  const contentY = useTransform(scrollY, [0, 700], [0, -40]);
  const contentOpacity = useTransform(scrollY, [0, 500], [1, 0.72]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images =
    heroImages && heroImages.length > 0
      ? heroImages
      : imageSrc
        ? [{ asset: { _ref: "" }, alt: imageAlt, _type: "image" as const }]
        : [];

  const hasMultiple = images.length > 1;

  useEffect(() => {
    if (!hasMultiple || shouldReduceMotion) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [hasMultiple, images.length, shouldReduceMotion]);

  function buildUrl(image: HeroImage): string | null {
    if (!image?.asset?._ref) return imageSrc || null;

    try {
      return urlForImage(image).width(1800).height(1100).url();
    } catch {
      return imageSrc || null;
    }
  }

  const currentImage = images[currentIndex];
  const currentUrl = currentImage
    ? buildUrl(currentImage as HeroImage)
    : imageSrc;
  const currentAlt = currentImage?.alt ?? imageAlt;

  return (
    <section
      aria-label="Welcome to Rotary Club of Ely"
      className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-[#061D3A] text-white"
    >
      {/* Background image */}
      {/* Background image with crossfade */}
      <AnimatePresence mode="wait">
        {currentUrl && (
          <motion.div
            key={currentUrl}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 1.4,
              ease: "easeInOut",
            }}
            style={
              shouldReduceMotion
                ? undefined
                : {
                    y: imageY,
                    scale: imageScale,
                  }
            }
            className="absolute inset-[-8%]"
          >
            <Image
              src={currentUrl}
              alt={currentAlt}
              fill
              priority
              fetchPriority="high"
              sizes="100vw"
              className="image-polish object-cover object-center"
            />
          </motion.div>
        )}
      </AnimatePresence>
      {/* Dark gradient overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-[#061D3A] via-[#061D3A]/78 to-[#061D3A]/12"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[#061D3A]/90 via-transparent to-[#061D3A]/20"
      />
      <div
        aria-hidden="true"
        className="
    absolute left-[10%] top-[25%]
    h-[500px] w-[500px]
    rounded-full
    bg-rotary-gold/10
    blur-3xl
  "
      />
      {/* Content */}
      <motion.div
        style={
          shouldReduceMotion
            ? undefined
            : {
                y: contentY,
                opacity: contentOpacity,
              }
        }
        className="relative z-10 mx-auto flex min-h-[calc(100vh-80px)] max-w-[1280px] items-center px-4 py-24 sm:px-6 lg:px-8"
      >
        {" "}
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5 text-xs font-bold uppercase tracking-[0.35em] text-[#F7A81B] sm:text-sm"
          >
            Together, we make a difference
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="
              max-w-4xl
              font-heading text-[clamp(3rem,7vw,6.5rem)]
              font-extrabold leading-[0.95] tracking-[-0.05em]
            "
          >
            Be Part of Something Bigger,{" "}
            <span className="block text-[#F7A81B]"> Right Here in Ely.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.16 }}
            className="mt-7 max-w-2xl text-lg leading-8 text-white/88 sm:text-xl"
          >
            We bring people together to support our community, run fantastic
            events, and create lasting change locally and around the world.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.24 }}
            className="mt-9 flex flex-col gap-4 sm:flex-row"
          >
            <Link href="/impact">
              <Button variant="primary">See Our Impact</Button>
            </Link>

            <Link href="/contact">
              <Button variant="secondary" className="text-white">
                Get Involved
              </Button>
            </Link>
          </motion.div>

          {/* Stats panel */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="
    mt-10 max-w-5xl overflow-hidden rounded-[2rem]
    border border-white/15 bg-white/[0.08]
    shadow-[0_24px_80px_rgba(0,0,0,0.32)]
    backdrop-blur-xl
  "
          >
            <div className="grid grid-cols-2 md:grid-cols-4">
              {heroStats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`
  group relative min-w-0 p-4 transition duration-300 hover:bg-white/[0.06] sm:p-5 md:p-6
          ${index !== 0 ? "sm:border-l sm:border-white/10" : ""}
          ${index > 1 ? "border-t border-white/10 sm:border-t-0" : ""}
        `}
                >
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/10 text-rotary-gold shadow-inner">
                      <StatIcon type={stat.icon} />
                    </div>

                    <span className="hidden rounded-full bg-white/10 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-white/55 xl:inline-flex">
                      {stat.eyebrow}
                    </span>
                  </div>

                  <p className="font-heading text-2xl font-black leading-none tracking-[-0.05em] text-white sm:text-3xl md:text-[clamp(1.75rem,2.8vw,3.25rem)]">
                    {stat.value}
                  </p>

                  <p className="mt-2 max-w-[11rem] text-sm font-medium leading-snug text-white/72">
                    {stat.label}
                  </p>

                  <div className="absolute inset-x-5 bottom-0 h-px origin-left scale-x-0 bg-rotary-gold transition duration-300 group-hover:scale-x-100" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Carousel dots */}
          {hasMultiple && (
            <div className="mt-7 flex gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`Show hero image ${i + 1}`}
                  className={`
                    h-2 rounded-full transition-all
                    ${i === currentIndex ? "w-8 bg-[#F7A81B]" : "w-2 bg-white/45 hover:bg-white"}
                  `}
                />
              ))}
            </div>
          )}
        </div>
      </motion.div>{" "}
    </section>
  );
}
