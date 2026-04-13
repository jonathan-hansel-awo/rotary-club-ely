"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import CountUp from "@/components/animation/CountUp";
import FadeInOnScroll from "@/components/animation/FadeInOnScroll";
import SectionHeading from "@/components/ui/SectionHeading";

interface ImpactStat {
  prefix?: string;
  value: number;
  suffix?: string;
  label: string;
}

interface ImpactNumbersProps {
  totalContributions: number;
}

export default function ImpactNumbers({
  totalContributions,
}: ImpactNumbersProps) {
  const stats: ImpactStat[] = [
    {
      prefix: "£",
      value: 45000,
      suffix: "+",
      label: "Raised for Local Causes",
    },
    {
      value: totalContributions,
      suffix: "+",
      label: "Donations & Contributions Made",
    },
    {
      value: 80,
      suffix: "+",
      label: "Years Serving the Community",
    },
  ];

  return (
    <section
      aria-labelledby="impact-numbers-heading"
      className="
        relative overflow-hidden
        bg-[#17458F]
        py-[clamp(3rem,6vw,6rem)]
      "
    >
      {/* Subtle radial highlight */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0 pointer-events-none
          bg-[radial-gradient(ellipse_at_70%_50%,rgba(255,255,255,0.05)_0%,transparent_60%)]
        "
      />

      <div className="max-w-[1280px] mx-auto px-[clamp(1rem,2vw,2rem)] relative">
        {/* Section heading */}
        <FadeInOnScroll>
          <div className="text-center mb-12">
            <p
              className="
              font-body font-medium text-xs uppercase
              tracking-[0.08em] text-[#F7A81B]
              mb-3
            "
            >
              Our Impact
            </p>
            <h2
              id="impact-numbers-heading"
              className="
                font-heading font-bold
                text-[clamp(1.5rem,3vw,2.25rem)]
                text-white leading-snug
              "
            >
              Making a Difference in Ely
            </h2>
          </div>
        </FadeInOnScroll>

        {/* Stats grid */}
        <div
          className="
          grid grid-cols-1 sm:grid-cols-3
          gap-10 sm:gap-6
          max-w-[900px] mx-auto
        "
        >
          {stats.map((stat, index) => (
            <FadeInOnScroll key={stat.label} delay={index * 0.15}>
              <div className="text-center">
                <CountUp
                  target={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  className="
                    font-heading font-extrabold
                    text-[clamp(2.5rem,5vw,3.5rem)]
                    text-white leading-none
                    tabular-nums
                  "
                />

                {/* Gold accent bar */}
                <div
                  aria-hidden="true"
                  className="w-8 h-[3px] bg-[#F7A81B] rounded-full mx-auto my-4"
                />

                <p
                  className="
                  font-body font-medium
                  text-[clamp(0.9rem,1.2vw,1rem)]
                  text-white/75 leading-snug
                  max-w-[160px] mx-auto
                "
                >
                  {stat.label}
                </p>
              </div>
            </FadeInOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
