import { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://rotaryclubofely.co.uk";

  // Fetch all published slugs from Sanity
  const [events, contributions, newsPosts, causes] = await Promise.all([
    client.fetch(
      `*[_type == "event" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`,
    ),
    client.fetch(
      `*[_type == "contribution" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`,
    ),
    client.fetch(
      `*[_type == "newsPost" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`,
    ),
    client.fetch(
      `*[_type == "cause" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`,
    ),
  ]);

  const eventUrls = events.map((e: { slug: string; _updatedAt: string }) => ({
    url: `${baseUrl}/events/${e.slug}`,
    lastModified: new Date(e._updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const contributionUrls = contributions.map(
    (c: { slug: string; _updatedAt: string }) => ({
      url: `${baseUrl}/impact/${c.slug}`,
      lastModified: new Date(c._updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }),
  );

  const newsUrls = newsPosts.map((n: { slug: string; _updatedAt: string }) => ({
    url: `${baseUrl}/news/${n.slug}`,
    lastModified: new Date(n._updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const causeUrls = causes.map((c: { slug: string; _updatedAt: string }) => ({
    url: `${baseUrl}/causes/${c.slug}`,
    lastModified: new Date(c._updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/events`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/impact`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/causes`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...eventUrls,
    ...contributionUrls,
    ...newsUrls,
    ...causeUrls,
  ];
}
