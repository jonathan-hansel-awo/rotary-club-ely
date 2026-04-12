import { getHomepageData } from "@/lib/sanity.fetch";

export default async function Home() {
  const data = await getHomepageData();

  return (
    <div className="min-h-screen bg-off-white p-12">
      <h1 className="font-heading font-bold text-3xl text-rotary-blue mb-8">
        Sanity Data Test
      </h1>

      <section className="mb-8">
        <h2 className="font-heading font-semibold text-xl mb-4">
          Site Settings
        </h2>
        <pre className="bg-white p-4 rounded-md text-sm overflow-auto">
          {JSON.stringify(data.settings, null, 2)}
        </pre>
      </section>

      <section className="mb-8">
        <h2 className="font-heading font-semibold text-xl mb-4">
          Upcoming Events ({data.upcomingEvents.length})
        </h2>
        <pre className="bg-white p-4 rounded-md text-sm overflow-auto">
          {JSON.stringify(data.upcomingEvents, null, 2)}
        </pre>
      </section>

      <section className="mb-8">
        <h2 className="font-heading font-semibold text-xl mb-4">
          Latest News ({data.latestNews.length})
        </h2>
        <pre className="bg-white p-4 rounded-md text-sm overflow-auto">
          {JSON.stringify(data.latestNews, null, 2)}
        </pre>
      </section>

      <section className="mb-8">
        <h2 className="font-heading font-semibold text-xl mb-4">
          Impact Stats
        </h2>
        <pre className="bg-white p-4 rounded-md text-sm overflow-auto">
          {JSON.stringify(data.impactStats, null, 2)}
        </pre>
      </section>
    </div>
  );
}
