import Hero from "@/components/home/Hero";

export default function Home() {
  return (
    <div>
      {/* Dark hero area to test transparent nav */}
      <Hero
          imageSrc="/images/hero-placeholder.jpg"
          imageAlt="Members of the Rotary Club of Ely at a community event"
        />

      {/* Light area to test scrolled nav */}
      <div className="min-h-screen bg-off-white flex items-center justify-center">
        <h2 className="font-heading font-bold text-3xl text-rotary-blue">
          Scroll down to see nav change
        </h2>
      </div>
    </div>
  );
}
