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
  dateStart: string;
  dateEnd?: string;
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
  body?: TypedObject[];
  image?: SanityImage;
  pinned?: boolean;
  related?: Omit<NewsPost, "body" | "related">[];
}

export interface Contribution {
  _id: string;
  title?: string;
  slug: Slug;
  date: string;
  amount?: string;
  summary: string;
  recipient: string;
  description?: TypedObject[];
  image?: SanityImage;
  related?: Omit<Contribution, "description" | "related">[];
}

export interface Cause {
  _id: string;
  name: string;
  slug: Slug;
  summary: string;
  description?: unknown[];
  image?: SanityImage;
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

export interface ImpactStats {
  totalContributions: number;
}

export interface HomepageData {
  upcomingEvents: Event[];
  latestNews: NewsPost[];
  causes: Cause[];
  sponsors: Sponsor[];
  impactStats: ImpactStats;
  settings: SiteSettings;
  members: ClubMember[]; // add this
}

export interface Page {
  _id: string;
  title: string;
  slug: Slug;
  body: unknown[];
  seoTitle?: string;
  seoDescription?: string;
}
