"use client";

import { useRef, ReactNode } from "react";
import { motion, useInView } from "framer-motion";

interface StaggerChildrenProps {
  children: ReactNode;
  staggerInterval?: number;
  className?: string;
}

const containerVariants = (staggerInterval: number) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerInterval,
    },
  },
});

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={childVariants} className={className}>
      {children}
    </motion.div>
  );
}

export default function StaggerChildren({
  children,
  staggerInterval = 0.08,
  className = "",
}: StaggerChildrenProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      variants={containerVariants(staggerInterval)}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}
