import Button from "@/components/ui/Button";

export default function Home() {
  return (
    <div className="min-h-screen bg-off-white flex flex-col items-center justify-center gap-8 p-8">
      <div className="flex flex-wrap gap-4 items-center">
        <Button variant="primary">Get Involved</Button>
        <Button variant="primary" size="sm">
          Join Us
        </Button>
      </div>

      <div className="flex flex-wrap gap-4 items-center">
        <Button variant="secondary">View All Events</Button>
        <Button variant="secondary" size="sm">
          Learn More
        </Button>
      </div>

      <div className="flex flex-wrap gap-4 items-center bg-rotary-blue-dark p-6 rounded-lg">
        <Button variant="ghost">Learn More</Button>
        <Button variant="primary">Get in Touch</Button>
      </div>
    </div>
  );
}
