import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import FadeInOnScroll from "@/components/animation/FadeInOnScroll";
import StaggerChildren, {
  StaggerItem,
} from "@/components/animation/StaggerChildren";
import CountUp from "@/components/animation/CountUp";

export default function Home() {
  return (
    <div className="min-h-screen bg-off-white py-20 flex flex-col gap-20">
      {/* FadeInOnScroll test */}
      <Container>
        <FadeInOnScroll>
          <SectionHeading
            eyebrow="Animation Test"
            title="Fade In On Scroll"
            subtitle="This section fades up when it enters the viewport."
          />
        </FadeInOnScroll>
      </Container>

      {/* StaggerChildren test */}
      <Container>
        <SectionHeading
          eyebrow="Stagger Test"
          title="Staggered Cards"
          className="mb-8"
        />
        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StaggerItem>
            <Card
              title="Ely Aquafest 2026"
              meta="18 July 2026"
              description="Our flagship summer event on the river."
              imageBg="bg-gradient-to-br from-rotary-blue-light to-rotary-blue"
            />
          </StaggerItem>
          <StaggerItem>
            <Card
              title="Fireworks Night"
              meta="1 November 2026"
              description="East Cambridgeshire's biggest fireworks display."
              imageBg="bg-gradient-to-br from-rotary-blue-dark to-cranberry"
            />
          </StaggerItem>
          <StaggerItem>
            <Card
              title="Community Clean-Up"
              meta="14 March 2026"
              description="Volunteers sprucing up Ely's green spaces."
              imageBg="bg-gradient-to-br from-rotary-gold-dark to-rotary-gold"
            />
          </StaggerItem>
        </StaggerChildren>
      </Container>

      {/* CountUp test */}
      <div className="bg-rotary-blue py-16">
        <Container>
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <CountUp
                target={45000}
                prefix="£"
                suffix="+"
                className="font-heading font-extrabold text-5xl text-white"
              />
              <p className="font-body text-white/75 mt-2">
                Raised for Local Causes
              </p>
            </div>
            <div>
              <CountUp
                target={30}
                suffix="+"
                className="font-heading font-extrabold text-5xl text-white"
              />
              <p className="font-body text-white/75 mt-2">
                Charities Supported
              </p>
            </div>
            <div>
              <CountUp
                target={15}
                suffix="+"
                className="font-heading font-extrabold text-5xl text-white"
              />
              <p className="font-body text-white/75 mt-2">Years Serving Ely</p>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
