/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";

interface CountUpProps {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

export default function CountUp({
  target,
  prefix = "",
  suffix = "",
  duration = 1500,
  className = "",
}: CountUpProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (isInView && !hasStarted) {
      setHasStarted(true);

      // Respect prefers-reduced-motion
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReduced) {
        setCount(target);
        return;
      }

      const startTime = performance.now();

      const tick = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // easeOut cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * target));

        if (progress < 1) {
          requestAnimationFrame(tick);
        }
      };

      requestAnimationFrame(tick);
    }
  }, [isInView, hasStarted, target, duration]);

  return (
    <span
      ref={ref}
      className={`font-variant-numeric-tabular ${className}`}
      aria-label={`${prefix}${target}${suffix}`}
    >
      {prefix}
      {count}
      {suffix}
    </span>
  );
}
