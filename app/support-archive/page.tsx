import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { supportArchiveQuery } from "@/sanity/lib/queries";
import SupportArchiveList from "@/components/SupportArchiveList";

export const metadata: Metadata = {
  title: "Support Archive | Rotary Club of Ely",
  description:
    "A historical archive of charities, community groups, schools, individuals and causes supported by the Rotary Club of Ely.",
};

export const revalidate = 1800;

export default async function SupportArchivePage() {
  const records = await client.fetch(supportArchiveQuery);

  return (
    <main className="bg-white">
      <section className="relative overflow-hidden bg-rotary-blue px-4 py-24 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_35%)]" />

        <div className="container relative mx-auto max-w-5xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-rotary-gold">
            Our support archive
          </p>

          <h1 className="font-heading text-5xl font-black tracking-tight md:text-6xl">
            People and causes we’ve supported
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/80">
            A historical record of charities, community groups, schools,
            individuals and initiatives supported by the Rotary Club of Ely.
          </p>
        </div>
      </section>

      <SupportArchiveList records={records} />
    </main>
  );
}
