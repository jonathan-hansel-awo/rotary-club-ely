import SectionHeading from "@/components/ui/SectionHeading";
import ImageWithHotspot from "@/components/ui/ImageWithHotspot";
import Container from "@/components/layout/Container";

export default function Home() {
  return (
    <div className="min-h-screen bg-off-white py-20 flex flex-col gap-16">
      <Container>
        <SectionHeading
          eyebrow="Upcoming Events"
          title="What's Happening in Ely"
          subtitle="Join us for our upcoming community events — from summer festivals to winter fireworks, there's something for everyone."
        />
      </Container>

      <Container>
        <SectionHeading
          eyebrow="Our Impact"
          title="Making a Difference"
          subtitle="Every year we raise thousands for local causes."
          align="center"
        />
      </Container>

      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ImageWithHotspot
            image={null}
            alt="Placeholder"
            aspectRatio="video"
          />
          <ImageWithHotspot
            image={{
              _type: "image",
              asset: { _ref: "test", _type: "reference" },
            }}
            alt="Test image"
            aspectRatio="square"
          />
          <ImageWithHotspot
            image={{
              _type: "image",
              asset: { _ref: "test", _type: "reference" },
            }}
            alt="Test image"
            aspectRatio="cinema"
          />
        </div>
      </Container>
    </div>
  );
}
