/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useEffect } from 'react'
import type { HeroImage } from '@/lib/types'
import { urlForImage } from '@/sanity/lib/image'
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Button from "@/components/ui/Button";


interface HeroProps {
  imageSrc: string;
  imageAlt: string;
  heroImages?: HeroImage[];
}

export default function Hero({ imageSrc, imageAlt, heroImages }: HeroProps) {
  const shouldReduceMotion = useReducedMotion();

  const [currentIndex, setCurrentIndex] = useState(0)
const [isFlipping, setIsFlipping] = useState(false)

const images = heroImages && heroImages.length > 0
  ? heroImages
  : imageSrc
    ? [{ asset: { _ref: '' }, alt: imageAlt, _type: 'image' as const }]
    : []

const hasMultiple = images.length > 1

useEffect(() => {
  if (!hasMultiple || shouldReduceMotion) return
  const interval = setInterval(() => {
    setIsFlipping(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
      setIsFlipping(false)
    }, 400)
  }, 4000)
  return () => clearInterval(interval)
}, [hasMultiple, images.length, shouldReduceMotion])

function buildUrl(image: HeroImage): string | null {
  if (!image?.asset?._ref) return imageSrc || null
  try {
    return urlForImage(image).width(1200).height(800).url()
  } catch {
    return imageSrc || null
  }
}

const currentImage = images[currentIndex]
const currentUrl = currentImage ? buildUrl(currentImage as HeroImage) : imageSrc
const currentAlt = currentImage?.alt ?? imageAlt
const currentCaption = (currentImage as HeroImage)?.caption

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
      },
    },
  };

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  const imageVariants = {
    hidden: {
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.97,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1] as const,
        delay: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  return (
    <section
      aria-label="Welcome to Rotary Club of Ely"
      className="
        relative overflow-hidden
        bg-[#F8F7F4]
        pt-[calc(80px+clamp(2rem,4vw,4rem))]
        pb-[clamp(3rem,6vw,6rem)]
      "
    >
      {/* Spinning Rotary wheel — half off left edge, behind everything */}
      <motion.div
        aria-hidden="true"
        className="
    absolute -left-60 top-1/2 -translate-y-1/2
    w-130 h-130
    opacity-[0.2]
    pointer-events-none
    z-0
  "
        animate={shouldReduceMotion ? { rotate: 0 } : { rotate: 360 }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : {
                duration: 40,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop" as const,
              }
        }
      >
        <Image
          src="/rotary-logo.png"
          alt=""
          fill
          sizes="h-full w-auto"
          className="z-0 relative"
        />
      </motion.div>
      {/* Decorative circle — sits behind the image on the right */}
      <div
        aria-hidden="true"
        className="
          absolute right-[-10%] top-[10%]
          w-150 h-150
          rounded-full
          bg-rotary-blue/4
          pointer-events-none
        "
      />
      {/* Second smaller circle for depth */}
      <div
        aria-hidden="true"
        className="
          absolute right-[15%] bottom-[-5%]
          w-75 h-75
          rounded-full
          bg-[#F7A81B]/6
          pointer-events-none
        "
      />

      <div className="max-w-[1280px] mx-auto px-[clamp(1rem,2vw,2rem)] z-10 relative">
        <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16">
          {/* ── Left: Text content ── */}
          <motion.div
            className="flex-1 lg:max-w-[520px]"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Eyebrow */}
            <motion.p
              variants={fadeUp}
              className="
                font-body font-medium text-xs uppercase
                tracking-[0.08em] text-[#D4900F]
                mb-4
              "
            >
              Rotary Club of Ely
            </motion.p>

            {/* Gold accent bar */}
            <motion.div
              variants={fadeUp}
              className="w-12 h-[3px] bg-[#F7A81B] rounded-full mb-5 z-10"
              aria-hidden="true"
            />

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="
                font-heading font-extrabold
                text-[clamp(2.2rem,5.5vw,4rem)]
                leading-[1.1] tracking-[-0.02em]
                text-[#1A1918]
                mb-5
              "
            >
              People of Action,{" "}
              <span className="text-[#17458F]">Right Here in Ely</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              className="
                font-body text-[clamp(1rem,1.5vw,1.15rem)]
                leading-relaxed text-[#4A4845]
                max-w-[480px] mb-8
              "
            >
              We organise events that bring the community together, raise funds
              for local causes, and create lasting positive change in East
              Cambridgeshire.
            </motion.p>

            {/* CTA buttons */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Link href="/events">
                <Button variant="primary">See What's Coming Up</Button>
              </Link>
              <Link href="/about">
                <Button variant="secondary">Learn About Us</Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* ── Right: Shaped image ── */}
          {/* ── Right: Shaped image carousel ── */}
          <motion.div
            className="flex-1 relative"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Rounded image container */}
            <div
              className="
      relative w-full
      rounded-[24px] overflow-hidden
      shadow-[0_12px_32px_rgba(0,0,0,0.1),_0_4px_8px_rgba(0,0,0,0.04)]
      aspect-[4/3] lg:aspect-[3/2]
    "
              style={{ perspective: "1200px" }}
            >
              {/* Flip wrapper */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  rotateY: isFlipping ? 90 : 0,
                  scale: isFlipping ? 0.97 : 1,
                }}
                transition={{
                  duration: 0.4,
                  ease: [0.25, 0.1, 0.25, 1] as const,
                }}
                style={{ transformOrigin: "center center" }}
              >
                {/* Ken Burns on current image */}
                <motion.div
                  key={currentIndex}
                  className="absolute inset-0"
                  initial={{ scale: 1 }}
                  animate={shouldReduceMotion ? { scale: 1 } : { scale: 1.06 }}
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : {
                          duration: 20,
                          ease: [0, 0, 1, 1] as const,
                          repeat: Infinity,
                          repeatType: "reverse",
                        }
                  }
                >
                  {currentUrl && (
                    <Image
                      src={currentUrl}
                      alt={currentAlt}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className="object-cover"
                    />
                  )}
                </motion.div>
              </motion.div>

              {/* Bottom gradient */}
              <div
                aria-hidden="true"
                className="
        absolute inset-x-0 bottom-0 h-1/3
        bg-gradient-to-t from-[#0C2340]/20 to-transparent
        pointer-events-none z-10
      "
              />

              {/* Caption pill */}
              {currentCaption && (
                <motion.div
                  key={`caption-${currentIndex}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="
          absolute bottom-4 left-4 z-20
          bg-black/40 backdrop-blur-sm
          text-white text-xs font-medium font-body
          px-3 py-1.5 rounded-full
        "
                >
                  {currentCaption}
                </motion.div>
              )}

              {/* Dot indicators */}
              {hasMultiple && (
                <div
                  className="
        absolute bottom-4 right-4 z-20
        flex items-center gap-1.5
      "
                >
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setIsFlipping(true);
                        setTimeout(() => {
                          setCurrentIndex(i);
                          setIsFlipping(false);
                        }, 400);
                      }}
                      aria-label={`Show image ${i + 1}`}
                      className={`
              rounded-full transition-all duration-300
              ${
                i === currentIndex
                  ? "w-4 h-2 bg-white"
                  : "w-2 h-2 bg-white/50 hover:bg-white/80"
              }
            `}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Floating stat card */}
            <div
              className="
      absolute -bottom-5 -left-4 lg:-left-8
      bg-white rounded-[16px]
      shadow-[0_4px_12px_rgba(0,0,0,0.08),_0_2px_4px_rgba(0,0,0,0.04)]
      px-5 py-4
      flex items-center gap-3
      z-20
    "
            >
              <div
                className="w-10 h-10 rounded-full bg-[#F7A81B]/15 flex items-center justify-center flex-shrink-0"
                aria-hidden="true"
              >
                <span className="text-[#D4900F] text-lg font-bold">★</span>
              </div>
              <div>
                <p className="font-heading font-bold text-[#1A1918] text-sm leading-tight">
                  80+ Years
                </p>
                <p className="font-body text-[#8A8681] text-xs leading-tight mt-0.5">
                  Serving the community
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
