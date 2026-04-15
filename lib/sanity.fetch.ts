import { client } from "@/sanity/lib/client";
import {
  homepageQuery,
  upcomingEventsQuery,
  allEventsQuery,
  eventBySlugQuery,
  eventSlugsQuery,
  latestNewsQuery,
  allNewsQuery,
  newsBySlugQuery,
  newsSlugsQuery,
  allContributionsQuery,
  contributionBySlugQuery,
  contributionSlugsQuery,
  impactStatsQuery,
  activeCausesQuery,
  causeBySlugQuery,
  causeSlugsQuery,
  allSponsorsQuery,
  clubMembersQuery,
  pageBySlugQuery,
  siteSettingsQuery,
  aboutPageQuery,
} from "@/sanity/lib/queries";

import type {
  HomepageData,
  Event,
  NewsPost,
  Contribution,
  Cause,
  Sponsor,
  ClubMember,
  SiteSettings,
  Page,
} from "@/lib/types";

const DEFAULT_REVALIDATE = 3600;

// ─── Homepage ─────────────────────────────────────────────────
export async function getHomepageData(): Promise<HomepageData> {
  return client.fetch(
    homepageQuery,
    {},
    { next: { revalidate: DEFAULT_REVALIDATE } },
  );
}

// ─── Events ──────────────────────────────────────────────────
export async function getUpcomingEvents(): Promise<Event[]> {
  return client.fetch(
    upcomingEventsQuery,
    {},
    { next: { revalidate: DEFAULT_REVALIDATE } },
  );
}

export async function getAllEvents(): Promise<Event[]> {
  return client.fetch(
    allEventsQuery,
    {},
    { next: { revalidate: DEFAULT_REVALIDATE } },
  );
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  return client.fetch(
    eventBySlugQuery,
    { slug },
    { next: { revalidate: DEFAULT_REVALIDATE } },
  );
}

export async function getEventSlugs(): Promise<{ slug: string }[]> {
  return client.fetch(
    eventSlugsQuery,
    {},
    { next: { revalidate: DEFAULT_REVALIDATE } },
  );
}

// ─── News ─────────────────────────────────────────────────────
export async function getLatestNews(): Promise<NewsPost[]> {
  return client.fetch(
    latestNewsQuery,
    {},
    { next: { revalidate: DEFAULT_REVALIDATE } },
  );
}

export async function getAllNews(): Promise<NewsPost[]> {
  return client.fetch(
    allNewsQuery,
    {},
    { next: { revalidate: DEFAULT_REVALIDATE } },
  );
}

export async function getNewsBySlug(slug: string): Promise<NewsPost | null> {
  return client.fetch(
    newsBySlugQuery,
    { slug },
    { next: { revalidate: DEFAULT_REVALIDATE } },
  );
}

export async function getNewsSlugs(): Promise<{ slug: string }[]> {
  return client.fetch(
    newsSlugsQuery,
    {},
    { next: { revalidate: DEFAULT_REVALIDATE } },
  );
}

// ─── Contributions ────────────────────────────────────────────
export async function getAllContributions(): Promise<Contribution[]> {
  return client.fetch(
    allContributionsQuery,
    {},
    { next: { revalidate: DEFAULT_REVALIDATE } },
  );
}

export async function getContributionBySlug(
  slug: string,
): Promise<Contribution | null> {
  return client.fetch(
    contributionBySlugQuery,
    { slug },
    { next: { revalidate: DEFAULT_REVALIDATE } },
  );
}

export async function getContributionSlugs(): Promise<{ slug: string }[]> {
  return client.fetch(
    contributionSlugsQuery,
    {},
    { next: { revalidate: DEFAULT_REVALIDATE } },
  );
}

export async function getImpactStats() {
  return client.fetch(
    impactStatsQuery,
    {},
    { next: { revalidate: DEFAULT_REVALIDATE } },
  );
}

// ─── Causes ───────────────────────────────────────────────────
export async function getActiveCauses(): Promise<Cause[]> {
  return client.fetch(
    activeCausesQuery,
    {},
    { next: { revalidate: DEFAULT_REVALIDATE } },
  );
}

export async function getCauseBySlug(slug: string): Promise<Cause | null> {
  return client.fetch(
    causeBySlugQuery,
    { slug },
    { next: { revalidate: DEFAULT_REVALIDATE } },
  );
}

export async function getCauseSlugs(): Promise<{ slug: string }[]> {
  return client.fetch(
    causeSlugsQuery,
    {},
    { next: { revalidate: DEFAULT_REVALIDATE } },
  );
}

// ─── Sponsors ─────────────────────────────────────────────────
export async function getAllSponsors(): Promise<Sponsor[]> {
  return client.fetch(
    allSponsorsQuery,
    {},
    { next: { revalidate: DEFAULT_REVALIDATE } },
  );
}

// ─── Members ──────────────────────────────────────────────────
export async function getClubMembers(): Promise<ClubMember[]> {
  return client.fetch(
    clubMembersQuery,
    {},
    { next: { revalidate: DEFAULT_REVALIDATE } },
  );
}

// ─── Settings ─────────────────────────────────────────────────
export async function getSiteSettings(): Promise<SiteSettings> {
  return client.fetch(
    siteSettingsQuery,
    {},
    { next: { revalidate: DEFAULT_REVALIDATE } },
  );
}

// ─── Pages ────────────────────────────────────────────────────
export async function getPageBySlug(slug: string): Promise<Page | null> {
  return client.fetch(
    pageBySlugQuery,
    { slug },
    { next: { revalidate: DEFAULT_REVALIDATE } },
  );
}

export async function getAboutPage() {
  return client.fetch(aboutPageQuery);
}
