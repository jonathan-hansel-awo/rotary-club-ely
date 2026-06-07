// components/home/ImpactNumbers.tsx

import Link from "next/link";
import Container from "@/components/layout/Container";
import { getImpactStats } from "@/lib/sanity.fetch";
import { clubAge } from "@/lib/utilities";

export default async function ImpactNumbers() {
  const stats = await getImpactStats();

  const items = [
    {
      value: `${clubAge}+`,
      label: "Years of service",
    },
    {
      value: stats?.totalImpacts || "Many",
      label: "Impact stories",
    },
    {
      value: "Local & global",
      label: "Causes supported",
    },
  ];

  return (
    <section className="bg-rotary-blue py-16 text-white md:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-rotary-gold">
              Our Impact
            </p>

            <h2 className="font-heading text-3xl font-bold md:text-5xl">
              Service that reaches beyond the meeting room
            </h2>

            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/85">
              From supporting local organisations in Ely to helping
              international partners respond in times of crisis, our members
              turn goodwill into practical action.
            </p>

            <Link
              href="/impact"
              className="mt-8 inline-flex rounded-full bg-rotary-gold px-7 py-3 font-bold text-rotary-blue transition hover:bg-white"
            >
              Explore our impact
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {items.map((item) => (
              <div
                key={item.label}
                className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur"
              >
                <p className="font-heading text-3xl font-bold text-rotary-gold">
                  {item.value}
                </p>
                <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-white/75">
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
