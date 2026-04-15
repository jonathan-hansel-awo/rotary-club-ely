import { SanityImageSource } from "@sanity/image-url";
import Container from "../layout/Container";
import ImageWithHotspot, { SanityImageRef } from "./ImageWithHotspot";


interface InteriorHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image?: SanityImageRef & { alt?: string; hotspot?: object; crop?: object };
}

export default function InteriorHero({
  eyebrow,
  title,
  subtitle,
  image,
}: InteriorHeroProps) {
  return (
    <section className="relative overflow-hidden bg-rotary-blue-dark pt-24 pb-16 md:pt-32 md:pb-20">
      {/* Background image */}
      {image && (
        <div className="absolute inset-0 opacity-20">
          <ImageWithHotspot image={image} alt="" className="object-cover" />
        </div>
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-rotary-blue-dark via-rotary-blue-dark/80 to-transparent" />

      {/* Decorative dot pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <Container className="relative z-10">
        {eyebrow && (
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-rotary-gold">
            {eyebrow}
          </p>
        )}
        <h1 className="font-heading text-3xl font-bold text-white md:text-4xl lg:text-5xl leading-tight max-w-3xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-lg text-white/75 max-w-xl leading-relaxed">
            {subtitle}
          </p>
        )}
        {/* Gold accent bar */}
        <div className="mt-6 h-1 w-12 rounded-full bg-rotary-gold" />
      </Container>
    </section>
  );
}
