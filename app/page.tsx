export default function Home() {
  return (
    <div>
      {/* Dark hero area to test transparent nav */}
      <div className="min-h-screen bg-rotary-blue-dark flex items-center justify-center">
        <h1 className="font-heading font-bold text-5xl text-white">
          Hero Area
        </h1>
      </div>

      {/* Light area to test scrolled nav */}
      <div className="min-h-screen bg-off-white flex items-center justify-center">
        <h2 className="font-heading font-bold text-3xl text-rotary-blue">
          Scroll down to see nav change
        </h2>
      </div>
    </div>
  );
}
