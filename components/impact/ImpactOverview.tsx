import CountUp from "@/components/animation/CountUp";
import FadeInOnScroll from "@/components/animation/FadeInOnScroll";

interface ImpactOverviewProps {
  totalContributions: number;
  yearsActive?: number;
}

export default function ImpactOverview({
  totalContributions,
  yearsActive = 80,
}: ImpactOverviewProps) {
  return (
    <div className="rounded-2xl bg-rotary-blue p-8 md:p-12 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-rotary-gold/10 blur-2xl" />
      </div>

      <div className="relative grid grid-cols-1 gap-8 sm:grid-cols-3">
        <FadeInOnScroll>
          <div className="text-center">
            <CountUp
              target={totalContributions}
              className="font-heading text-5xl font-extrabold text-white"
              aria-label={`${totalContributions} contributions`}
            />
            <div className="mx-auto mt-3 h-0.5 w-8 rounded-full bg-rotary-gold" />
            <p className="mt-3 text-sm font-medium text-white/70">
              Causes &amp; Charities Supported
            </p>
          </div>
        </FadeInOnScroll>

        <FadeInOnScroll delay={0.1}>
          <div className="text-center">
            <CountUp
              target={yearsActive}
              suffix="+"
              className="font-heading text-5xl font-extrabold text-white"
              aria-label={`${yearsActive}+ years serving the community`}
            />
            <div className="mx-auto mt-3 h-0.5 w-8 rounded-full bg-rotary-gold" />
            <p className="mt-3 text-sm font-medium text-white/70">
              Years Serving Ely
            </p>
          </div>
        </FadeInOnScroll>

        <FadeInOnScroll delay={0.2}>
          <div className="text-center">
            <p className="font-heading text-5xl font-extrabold text-white">
              100%
            </p>
            <div className="mx-auto mt-3 h-0.5 w-8 rounded-full bg-rotary-gold" />
            <p className="mt-3 text-sm font-medium text-white/70">
              Volunteer-Led Organisation
            </p>
          </div>
        </FadeInOnScroll>
      </div>
    </div>
  );
}
