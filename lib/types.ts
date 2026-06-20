import { TypedObject } from "sanity";

export interface Slug {
  current: string;
}

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  hotspot?: {
    x: number;
    y: number;
  };
  alt?: string;
}

export interface RelatedEvent {
  _id: string;
  title: string;
  slug: Slug;
  dateStart: string;
  category: string;
  heroImage?: SanityImage;
  location?: string;
}

export interface Event {
  _id: string;
  title: string;
  slug: Slug;
  dateStart?: string;
  dateEnd?: string;
  dateLabel?: string;
  eventStatus?: "upcoming" | "past";
  status?: "upcoming" | "past";
  location?: string;
  category: string;
  description?: TypedObject[];
  heroImage?: SanityImage;
  gallery?: (SanityImage & { _key: string })[];
  featured?: boolean;
  externalUrl?: string;
  relatedEvents?: RelatedEvent[];
}

export interface NewsPost {
  _id: string;
  title: string;
  slug: Slug;
  date: string;
  publishedAt?: string;
  excerpt?: string;
  category?: "news" | "announcement" | "event" | "community-story";
  body?: TypedObject[];
  image?: SanityImage;
  gallery?: (SanityImage & { _key: string })[];
  pinned?: boolean;
  featured?: boolean;
  ctaLabel?: string;
  ctaUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
  related?: Omit<NewsPost, "body" | "related">[];
}

export interface Impact {
  _id: string;
  title: string;
  slug: Slug;
  date: string;
  summary: string;
  recipient: string;
  story?: TypedObject[];
  quote?: string;
  image?: SanityImage;
}

export interface ImpactStats {
  totalImpacts: number;
}

export interface SupportRecord {
  _id: string;
  recipientName: string;
  recipientType?:
    | "charity"
    | "community-group"
    | "education"
    | "individual"
    | "health"
    | "youth"
    | "international"
    | "emergency"
    | "other";
  month?: number;
  year: number;
  note?: string;
  website?: string;
  relatedImpactSlug?: string;
}


export interface Cause {
  _id: string;
  name: string;
  slug: Slug;
  summary: string;
  description?: TypedObject[];
  image?: SanityImage; // legacy fallback
  featuredImage?: SanityImage;
  logo?: SanityImage;
  externalUrl?: string;
  order?: number;
  active?: boolean;
  related?: Omit<Cause, "description" | "related">[];
}

export interface Sponsor {
  _id: string;
  name: string;
  logo: SanityImage;
  websiteUrl?: string;
  order?: number;
}

export interface ClubMember {
  _id: string;
  name: string;
  role?: string;
  photo?: SanityImage;
  bio?: string;
  order?: number;
}

export interface HeroImage extends SanityImage {
  caption?: string;
}

export interface ActivityTile {
  label: string;
  description: string;
  href: string;
  badge?: string;
  image?: SanityImage;
}

export interface SiteSettings {
  clubName: string;
  meetingDay?: string;
  meetingTime?: string;
  meetingLocation?: string;
  contactEmail: string;
  phone?: string;
  socialLinks?: { platform: string; url: string }[];
  footerText?: string;
  heroImages?: HeroImage[];
  activityTiles?: ActivityTile[]; // add this
}


export interface HomepageData {
  upcomingEvents: Event[];
  latestNews: NewsPost[];
  causes: Cause[];
  sponsors: Sponsor[];
  impactStats: ImpactStats;
  settings: SiteSettings;
  members: ClubMember[]; 
  supportRecords: SupportRecord[];
}

export interface Page {
  _id: string;
  title: string;
  slug: Slug;
  body: unknown[];
  seoTitle?: string;
  seoDescription?: string;
}
