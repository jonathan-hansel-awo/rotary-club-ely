import Container from "@/components/layout/Container";

export default function Home() {
  return (
    <div className="min-h-screen bg-off-white py-20">
      <Container>
        <p className="text-text-muted text-sm uppercase tracking-widest font-body mb-4">
          Default (1280px)
        </p>
        <div className="bg-rotary-blue text-white p-6 rounded-md font-body">
          Default container
        </div>
      </Container>

      <Container variant="narrow" className="mt-8">
        <p className="text-text-muted text-sm uppercase tracking-widest font-body mb-4">
          Narrow (768px)
        </p>
        <div className="bg-rotary-gold text-grey-900 p-6 rounded-md font-body">
          Narrow container
        </div>
      </Container>

      <Container variant="wide" className="mt-8">
        <p className="text-text-muted text-sm uppercase tracking-widest font-body mb-4">
          Wide (1440px)
        </p>
        <div className="bg-cranberry text-white p-6 rounded-md font-body">
          Wide container
        </div>
      </Container>
    </div>
  );
}
