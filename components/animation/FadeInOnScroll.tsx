"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface FadeInOnScrollProps {
  children: ReactNode;
  delay?: number;
  distance?: number;
  duration?: number;
  className?: string;
}

export default function FadeInOnScroll({
  children,
  delay = 0,
  distance = 20,
  duration = 0.4,
  className = "",
}: FadeInOnScrollProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: prefersReduced ? 1 : 0,
        y: prefersReduced ? 0 : distance,
      }}
      animate={
        isInView || prefersReduced
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: distance }
      }
      transition={
        prefersReduced ? { duration: 0 } : { duration, delay, ease: "easeOut" }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}
