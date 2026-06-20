import Link from "next/link";

type SupportRecord = {
  _id: string;
  recipientName: string;
  recipientType?: string;
  month?: number;
  year: number;
  note?: string;
  website?: string;
  relatedImpactSlug?: string;
};

const months = [
  "",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function formatDate(month?: number, year?: number) {
  if (!year) return "";
  if (!month) return `${year}`;
  return `${months[month]} ${year}`;
}

function formatType(type?: string) {
  if (!type) return "Supported cause";

  const labels: Record<string, string> = {
    charity: "Charity",
    "community-group": "Community group",
    education: "Education",
    individual: "Individual",
    health: "Health",
    youth: "Youth",
    international: "International",
    emergency: "Emergency appeal",
    other: "Other",
  };

  return labels[type] ?? "Supported cause";
}

export default function SupportArchivePreview({
  records,
}: {
  records: SupportRecord[];
}) {
  if (!records?.length) return null;

  const scrollingRecords = [...records, ...records];

  return (
    <section className="relative overflow-hidden bg-white py-20">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rotary-gold/60 to-transparent" />

      <div className="container mx-auto px-4">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-rotary-gold">
              Support archive
            </p>

            <h2 className="font-heading text-4xl font-black tracking-tight text-rotary-blue md:text-5xl">
              A legacy of support
            </h2>

            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-700">
              Over the years, the Rotary Club of Ely has supported charities,
              community groups, schools, individuals and local initiatives
              across Ely and beyond.
            </p>

            <div className="mt-8">
              <Link
                href="/support-archive"
                className="inline-flex items-center rounded-full bg-rotary-blue px-6 py-3 text-sm font-bold text-white shadow-lg shadow-rotary-blue/20 transition hover:-translate-y-0.5 hover:bg-rotary-blue-dark"
              >
                View full support archive
                <span className="ml-2" aria-hidden="true">
                  →
                </span>
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-rotary-blue/10 via-rotary-gold/10 to-transparent blur-2xl" />

            <div className="relative h-[420px] overflow-y-auto rounded-[2rem] border border-slate-200 bg-slate-50/80 p-4 shadow-xl shadow-slate-900/5">
              <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-slate-50 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-t from-slate-50 to-transparent" />

              <div className="support-scroll space-y-3 py-8">
                {scrollingRecords.map((record, index) => (
                  <article
                    key={`${record._id}-${index}`}
                    className="rounded-2xl border border-white bg-white p-4 shadow-sm transition hover:border-rotary-gold/50 hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-heading text-lg font-extrabold text-rotary-blue">
                          {record.recipientName}
                        </h3>

                        {record.note ? (
                          <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-600">
                            {record.note}
                          </p>
                        ) : null}
                      </div>

                      <div className="shrink-0 text-right">
                        <p className="text-sm font-bold text-slate-900">
                          {formatDate(record.month, record.year)}
                        </p>
                        <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                          {formatType(record.recipientType)}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <p className="mt-3 text-center text-xs text-slate-500">
              Scroll manually or hover to pause the preview.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .support-scroll {
          animation: support-scroll 34s linear infinite;
        }

        .support-scroll:hover {
          animation-play-state: paused;
        }

        @keyframes support-scroll {
          from {
            transform: translateY(0);
          }

          to {
            transform: translateY(-50%);
          }
        }
      `}</style>
    </section>
  );
}
