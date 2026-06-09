"use client";

import Link from "next/link";
import Container from "@/components/layout/Container";
import { clubAge } from "@/lib/utilities";
import Image from "next/image";
import { motion } from "framer-motion";


interface ImpactProps {
  stats: { totalImpacts?: number };
}

export default function Impact({ stats }: ImpactProps) {

  const items = [
    {
      value: `${clubAge}`,
      label: "Years of service",
    },
    {
      value: stats?.totalImpacts || "Many",
      label: "Impact stories",
    },
    {
      value: "Local & Global",
      label: "Causes supported",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-off-white py-20 md:py-28">
      {/* <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full border-[40px] border-rotary-gold/5" /> */}

      {/* Giant spinning Rotary wheel */}
      <motion.div
        aria-hidden="true"
        className="
          absolute
          -right-[20%] top-[10%]
          h-[400px] w-[400px]
          -translate-x-1/2 -translate-y-1/2
          opacity-20
          pointer-events-none
        "
        animate={{ rotate: 360 }}
        transition={{
          duration: 95,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <Image
          src="/rotary-logo.svg"
          alt=""
          fill
          sizes="5000px"
          className="object-contain"
        />
      </motion.div>

      <div className="absolute -left-32 bottom-0 h-[320px] w-[320px] rounded-full border-[24px] border-rotary-blue/5" />
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-rotary-gold">
              Our Impact
            </p>

            <h2 className="font-heading text-4xl font-bold leading-tight text-grey-900 md:text-6xl">
              Making a Difference
              <span className="block text-rotary-blue">in Ely and Beyond</span>
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-grey-700">
              From local grants and community projects to international
              humanitarian initiatives, Rotary Club of Ely members work together
              to turn goodwill into lasting impact.
            </p>

            <Link
              href="/impact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-rotary-blue px-8 py-4 font-bold text-white transition hover:bg-rotary-blue-dark"
            >
              Explore our impact →
            </Link>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr_1fr]">
            {items.map((item, index) => (
              <div
                key={item.label}
                className={
                  index === 0
                    ? "rounded-3xl bg-rotary-blue  p-8 text-white shadow-lg"
                    : "rounded-3xl border border-grey-200 bg-white p-8 shadow-md opacity-90"
                }
              >
                <p
                  className={
                    index === 0
                      ? "font-heading text-5xl font-bold text-rotary-gold"
                      : "font-heading text-4xl font-bold text-rotary-blue"
                  }
                >
                  {item.value}
                </p>

                <p
                  className={
                    index === 0
                      ? "mt-3 text-sm font-semibold uppercase tracking-wide text-white/80"
                      : "mt-3 text-sm font-semibold uppercase tracking-wide text-grey-700"
                  }
                >
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
