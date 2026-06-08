/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
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
    label: "Years Serving Ely",
    icon: "👥",
  },
  {
    value: "£70k+",
    label: "Raised for Local Causes within the last 5 years",
    icon: "♡",
  },
  {
    value: "50+",
    label: "Charities Supported",
    icon: "🌍",
  },
  {
    value: "Annual",
    label: "Events & Activities",
    icon: "📅",
  },
];

export default function Hero({ imageSrc, imageAlt, heroImages }: HeroProps) {
  const shouldReduceMotion = useReducedMotion();
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
      {currentUrl && (
        <Image
          src={currentUrl}
          alt={currentAlt}
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="image-polish object-cover object-center"
        />
      )}

      {/* Dark gradient overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-[#061D3A] via-[#061D3A]/85 to-[#061D3A]/20"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[#061D3A]/80 via-transparent to-[#061D3A]/30"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-80px)] max-w-[1280px] items-center px-4 py-24 sm:px-6 lg:px-8">
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
  mt-10 grid max-w-5xl grid-cols-2 overflow-hidden
  rounded-3xl border border-white/15 bg-[#061D3A]/55
  shadow-2xl backdrop-blur-md
  sm:grid-cols-4
"
          >
            {heroStats.map((stat, index) => (
              <div
                key={stat.label}
                className={`
                  min-w-0 p-5 sm:p-6 over
                  ${index !== 0 ? "sm:border-l sm:border-white/15" : ""}
                  ${index > 1 ? "border-t border-white/15 sm:border-t-0" : ""}
                `}
              >
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-xl text-[#F7A81B]">
                  {stat.icon}
                </div>

                <p className="font-heading text-[clamp(1.65rem,2.8vw,3rem)] font-extrabold leading-tight tracking-[-0.04em] text-white whitespace-nowrap">
                  {stat.value}
                </p>

                <p className="mt-1 text-sm leading-5 text-white/78">
                  {stat.label}
                </p>
              </div>
            ))}
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
      </div>
    </section>
  );
}
