import { client } from "@/sanity/lib/client";
import {
  homepageQuery,
  upcomingEventsQuery,
  allEventsQuery,
  eventBySlugQuery,
  latestNewsQuery,
  allNewsQuery,
  newsBySlugQuery,
  newsSlugsQuery,
  allImpactsQuery,
  impactBySlugQuery,
  impactSlugsQuery,
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
  Impact,
  Cause,
  Sponsor,
  ClubMember,
  SiteSettings,
  Page,
  ImpactStats,
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
  return client.fetch(upcomingEventsQuery, {}, { next: { revalidate: 3600 } });
}

export async function getAllEvents(): Promise<Event[]> {
  return client.fetch(allEventsQuery, {}, { next: { revalidate: 3600 } });
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  return client.fetch(
    eventBySlugQuery,
    { slug },
    { next: { revalidate: 3600 } },
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

// ─── Impact Stories ────────────────────────────────────────────
export async function getAllImpacts(): Promise<Impact[]> {
  return client.fetch(
    allImpactsQuery,
    {},
    { next: { revalidate: DEFAULT_REVALIDATE } },
  );
}

export async function getImpactBySlug(slug: string): Promise<Impact | null> {
  return client.fetch(
    impactBySlugQuery,
    { slug },
    { next: { revalidate: DEFAULT_REVALIDATE } },
  );
}

export async function getImpactSlugs(): Promise<{ slug: string }[]> {
  return client.fetch(
    impactSlugsQuery,
    {},
    { next: { revalidate: DEFAULT_REVALIDATE } },
  );
}

export async function getImpactStats(): Promise<ImpactStats> {
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

