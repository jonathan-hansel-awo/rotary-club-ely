import Card from "@/components/ui/Card";
import Container from "@/components/layout/Container";

export default function Home() {
  return (
    <div className="min-h-screen bg-off-white py-20">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card
            title="Ely Aquafest 2026"
            meta="Saturday 18 July 2026 · Riverside, Ely"
            description="Our flagship summer event returns with boat races, live music, food stalls, and family entertainment along the beautiful River Great Ouse."
            imageBg="bg-gradient-to-br from-rotary-blue-light to-rotary-blue"
            badge={
              <span className="text-xs font-medium uppercase tracking-wider px-2 py-1 rounded-sm bg-white/20 text-white backdrop-blur-sm">
                Aquafest
              </span>
            }
          />
          <Card
            title="Ely Fireworks Night"
            meta="Saturday 1 November 2026 · Paradise Centre"
            description="East Cambridgeshire's biggest fireworks display — a spectacular evening of music, food, and unforgettable pyrotechnics."
            imageBg="bg-gradient-to-br from-rotary-blue-dark to-cranberry"
            badge={
              <span className="text-xs font-medium uppercase tracking-wider px-2 py-1 rounded-sm bg-white/20 text-white backdrop-blur-sm">
                Fireworks
              </span>
            }
          />
          <Card
            title="Spring Community Clean-Up"
            meta="Saturday 14 March 2026 · Ely City Centre"
            description="Volunteers came together to spruce up Ely's green spaces, riverbanks, and public areas ahead of the summer season."
            imageBg="bg-gradient-to-br from-rotary-gold-dark to-rotary-gold"
            badge={
              <span className="text-xs font-medium uppercase tracking-wider px-2 py-1 rounded-sm bg-white/20 text-white backdrop-blur-sm">
                Community
              </span>
            }
          />
        </div>
      </Container>
    </div>
  );
}
