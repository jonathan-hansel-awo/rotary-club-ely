"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type SupportRecord = {
  _id: string;
  recipientName: string;
  recipientType?: string;
  rotaryYear: string;
  note?: string;
  website?: string;
  relatedImpactSlug?: string;
};

function formatType(type?: string) {
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

  return labels[type ?? ""] ?? "Other";
}

export default function SupportArchiveList({
  records,
}: {
  records: SupportRecord[];
}) {
  const [search, setSearch] = useState("");
  const [selectedRotaryYear, setSelectedRotaryYear] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  const rotaryYears = useMemo(() => {
    return Array.from(new Set(records.map((record) => record.rotaryYear))).sort(
      (a, b) => b.localeCompare(a),
    );
  }, [records]);

  const types = useMemo(() => {
    return Array.from(
      new Set(records.map((record) => record.recipientType).filter(Boolean)),
    ) as string[];
  }, [records]);

  const filteredRecords = useMemo(() => {
    const query = search.trim().toLowerCase();

    return records.filter((record) => {
      const matchesSearch =
        !query ||
        record.recipientName.toLowerCase().includes(query) ||
        record.note?.toLowerCase().includes(query);

      const matchesRotaryYear =
        selectedRotaryYear === "all" ||
        record.rotaryYear === selectedRotaryYear;

      const matchesType =
        selectedType === "all" || record.recipientType === selectedType;

      return matchesSearch && matchesRotaryYear && matchesType;
    });
  }, [records, search, selectedRotaryYear, selectedType]);

const groupedRecords = useMemo(() => {
  return filteredRecords.reduce<Record<string, SupportRecord[]>>(
    (groups, record) => {
      if (!groups[record.rotaryYear]) groups[record.rotaryYear] = [];
      groups[record.rotaryYear].push(record);
      return groups;
    },
    {},
  );
}, [filteredRecords]);

const groupedYears = Object.keys(groupedRecords).sort((a, b) =>
  b.localeCompare(a),
);

  return (
    <section className="px-4 py-16">
      <div className="container mx-auto max-w-6xl">
        <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-4 shadow-sm md:p-6">
          <div className="grid gap-4 md:grid-cols-[1fr_180px_220px]">
            <label className="block">
              <span className="mb-2 block text-sm font-bold text-slate-700">
                Search archive
              </span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by charity, group or person..."
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-rotary-gold focus:ring-4 focus:ring-rotary-gold/20"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-bold text-slate-700">
                Rotary year
              </span>
              <select
                value={selectedRotaryYear}
                onChange={(event) => setSelectedRotaryYear(event.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-rotary-gold focus:ring-4 focus:ring-rotary-gold/20"
              >
                <option value="all">All Rotary years</option>
                {rotaryYears.map((rotaryYear) => (
                  <option key={rotaryYear} value={rotaryYear}>
                    {rotaryYear}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-bold text-slate-700">
                Type
              </span>
              <select
                value={selectedType}
                onChange={(event) => setSelectedType(event.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-rotary-gold focus:ring-4 focus:ring-rotary-gold/20"
              >
                <option value="all">All types</option>
                {types.map((type) => (
                  <option key={type} value={type}>
                    {formatType(type)}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between gap-4">
          <p className="text-sm font-semibold text-slate-600">
            Showing {filteredRecords.length} of {records.length} records
          </p>

          {(search ||
            selectedRotaryYear !== "all" ||
            selectedType !== "all") && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
setSelectedRotaryYear("all");                setSelectedType("all");
              }}
              className="text-sm font-bold text-rotary-blue underline underline-offset-4"
            >
              Clear filters
            </button>
          )}
        </div>

        {groupedYears.length > 0 ? (
          <div className="mt-10 space-y-12">
            {groupedYears.map((year) => (
              <section key={year}>
                <div className="mb-5 flex items-center gap-4">
                  <h2 className="font-heading text-3xl font-black text-rotary-blue">
                    {year}
                  </h2>
                  <div className="h-px flex-1 bg-slate-200" />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {groupedRecords[year].map((record) => (
                    <article
                      key={record._id}
                      className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-rotary-gold/60 hover:shadow-lg hover:shadow-slate-900/5"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm font-bold text-rotary-gold">
                            {record.rotaryYear}
                          </p>

                          <h3 className="mt-1 font-heading text-xl font-black text-rotary-blue">
                            {record.recipientName}
                          </h3>
                        </div>

                        <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                          {formatType(record.recipientType)}
                        </span>
                      </div>

                      {record.note ? (
                        <p className="mt-3 text-sm leading-6 text-slate-600">
                          {record.note}
                        </p>
                      ) : null}

                      <div className="mt-4 flex flex-wrap gap-3">
                        {record.relatedImpactSlug ? (
                          <Link
                            href={`/impact/${record.relatedImpactSlug}`}
                            className="text-sm font-bold text-rotary-blue underline underline-offset-4"
                          >
                            Read impact story
                          </Link>
                        ) : null}

                        {record.website ? (
                          <a
                            href={record.website}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm font-bold text-rotary-blue underline underline-offset-4"
                          >
                            Visit website
                          </a>
                        ) : null}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-[2rem] border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
            <h2 className="font-heading text-2xl font-black text-rotary-blue">
              No records found
            </h2>
            <p className="mt-2 text-slate-600">
              Try changing your search or filter options.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
