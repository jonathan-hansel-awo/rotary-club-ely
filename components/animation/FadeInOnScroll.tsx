"use client";

import { useRef, ReactNode } from "react";
import { motion, useInView } from "framer-motion";

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

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: distance }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: distance }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
