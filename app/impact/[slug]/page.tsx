// app/impact/[slug]/page.tsx

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import Container from "@/components/layout/Container";
import { getImpactBySlug, getImpactSlugs } from "@/lib/sanity.fetch";
import { urlForImage } from "@/sanity/lib/image";

interface ImpactPageProps {
  params: Promise<{
    slug: string;
  }>;
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export async function generateStaticParams() {
  const slugs = await getImpactSlugs();

  return slugs.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: ImpactPageProps): Promise<Metadata> {
  const { slug } = await params;
  const impact = await getImpactBySlug(slug);

  if (!impact) {
    return {
      title: "Impact Story Not Found",
    };
  }

  return {
    title: impact.title,
    description: impact.summary,
  };
}

export default async function ImpactSlugPage({ params }: ImpactPageProps) {
  const { slug } = await params;
  const impact = await getImpactBySlug(slug);

  if (!impact) {
    notFound();
  }

  const imageSrc = impact.image
    ? urlForImage(impact.image)?.width(1600).height(950).url()
    : null;

  return (
    <main className="bg-off-white">
      <section className="relative overflow-hidden bg-rotary-blue py-20 text-white md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,209,0,0.22),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.12),transparent_32%)]" />

        <Container>
          <div className="relative max-w-4xl">
            <Link
              href="/impact"
              className="mb-8 inline-flex items-center text-sm font-bold uppercase tracking-[0.18em] text-rotary-gold transition hover:text-white"
            >
              ← Back to impact stories
            </Link>

            <p className="text-sm font-bold uppercase tracking-[0.22em] text-rotary-gold">
              Impact Story
            </p>

            <h1 className="mt-4 font-heading text-4xl font-bold leading-tight md:text-6xl">
              {impact.title}
            </h1>

            <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold text-white/85">
              <span>{formatDate(impact.date)}</span>
              <span aria-hidden="true">•</span>
              <span>{impact.recipient}</span>
            </div>

            <p className="mt-6 max-w-3xl text-xl leading-relaxed text-white/85">
              {impact.summary}
            </p>
          </div>
        </Container>
      </section>

      {imageSrc && (
        <section className="-mt-12 md:-mt-16">
          <Container>
            <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border-4 border-white bg-grey-200 shadow-2xl">
              <Image
                src={imageSrc}
                alt={impact.image?.alt || impact.title}
                fill
                priority
                className="object-cover"
                sizes="(min-width: 1024px) 1100px, 100vw"
              />
            </div>
          </Container>
        </section>
      )}

      <section className="py-16 md:py-24">
        <Container>
          <article className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-sm md:p-12">
            {impact.description && (
              <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-grey-900 prose-p:leading-relaxed prose-p:text-grey-700 prose-a:font-semibold prose-a:text-rotary-blue prose-strong:text-grey-900">
                <PortableText value={impact.description} />
              </div>
            )}

            <div className="mt-12 border-t border-grey-200 pt-8">
              <Link
                href="/impact"
                className="inline-flex rounded-full bg-rotary-blue px-6 py-3 font-bold text-white transition hover:bg-rotary-blue-dark"
              >
                View more impact stories
              </Link>
            </div>
          </article>
        </Container>
      </section>
    </main>
  );
}
