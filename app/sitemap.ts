import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://rotaryclubofely.co.uk";

// Refresh the sitemap periodically so Sanity content does not stay stale forever.
// 3600 = 1 hour. You can change this to 1800 if you want 30 minutes.
export const revalidate = 3600;

type SanitySlug = {
  slug: string;
  _updatedAt?: string;
};

function lastModified(date?: string) {
  return date ? new Date(date) : new Date();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [events, impactStories, newsPosts, causes] = await Promise.all([
    client.fetch<SanitySlug[]>(
      `*[_type == "event" && defined(slug.current)]{
        "slug": slug.current,
        _updatedAt
      }`,
    ),

    client.fetch<SanitySlug[]>(
      `*[_type == "impactStory" && defined(slug.current)]{
        "slug": slug.current,
        _updatedAt
      }`,
    ),

    client.fetch<SanitySlug[]>(
      `*[_type == "newsPost" && defined(slug.current)]{
        "slug": slug.current,
        _updatedAt
      }`,
    ),

    client.fetch<SanitySlug[]>(
      `*[_type == "cause" && defined(slug.current)]{
        "slug": slug.current,
        _updatedAt
      }`,
    ),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/events`,
      lastModified: new Date(),
      changeFrequency: "weekly",
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
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/causes`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/support-archive`,
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
  ];

  const eventUrls: MetadataRoute.Sitemap = events.map((event) => ({
    url: `${baseUrl}/events/${event.slug}`,
    lastModified: lastModified(event._updatedAt),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const impactUrls: MetadataRoute.Sitemap = impactStories.map((story) => ({
    url: `${baseUrl}/impact/${story.slug}`,
    lastModified: lastModified(story._updatedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const newsUrls: MetadataRoute.Sitemap = newsPosts.map((post) => ({
    url: `${baseUrl}/news/${post.slug}`,
    lastModified: lastModified(post._updatedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const causeUrls: MetadataRoute.Sitemap = causes.map((cause) => ({
    url: `${baseUrl}/causes/${cause.slug}`,
    lastModified: lastModified(cause._updatedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...eventUrls,
    ...impactUrls,
    ...newsUrls,
    ...causeUrls,
  ];
}
