export default function Home() {
  return (
    <div className="min-h-screen bg-off-white flex flex-col items-center justify-center gap-6 p-8">
      <p className="font-body text-text-muted uppercase tracking-widest text-sm">
        Rotary Club of Ely
      </p>
      <h1 className="font-heading text-5xl font-bold text-rotary-blue leading-tight">
        People of Action
      </h1>
      <p className="font-body text-base text-text-secondary max-w-prose text-center leading-normal">
        Serving the Ely community through events, volunteering, and charitable
        giving.
      </p>
    </div>
  );
}
