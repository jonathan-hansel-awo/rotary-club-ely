"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

export default function HeroBackground() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      {/* Clean off-white base */}
      <div className="absolute inset-0 bg-[#F8F7F4]" />

      {/* Spinning Rotary wheel — anchored left edge, half off-screen */}
      <motion.div
        className="
          absolute
          -left-[280px] top-1/2 -translate-y-1/2
          w-[560px] h-[560px]
          opacity-[0.07]
        "
        animate={shouldReduceMotion ? { rotate: 0 } : { rotate: 360 }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : {
                duration: 40,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop",
              }
        }
      >
        <Image
          src="/rotary-logo.png"
          alt=""
          fill
          className="object-contain"
          priority
        />
      </motion.div>

      {/* Subtle gold accent glow — bottom right, static */}
      <div
        className="
          absolute -bottom-32 -right-32
          w-[500px] h-[500px]
          rounded-full
          opacity-[0.06]
        "
        style={{
          backgroundColor: "#F7A81B",
          filter: "blur(80px)",
        }}
      />

      {/* Subtle blue glow — top right, static */}
      <div
        className="
          absolute -top-24 right-[10%]
          w-[400px] h-[400px]
          rounded-full
          opacity-[0.05]
        "
        style={{
          backgroundColor: "#17458F",
          filter: "blur(100px)",
        }}
      />
    </div>
  );
}
