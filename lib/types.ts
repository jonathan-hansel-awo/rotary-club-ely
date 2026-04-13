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

export interface Event {
  _id: string;
  title: string;
  slug: Slug;
  dateStart: string;
  dateEnd?: string;
  category: string;
  location?: string;
  description?: unknown[];
  heroImage?: SanityImage;
  gallery?: SanityImage[];
  featured?: boolean;
  externalUrl?: string;
  status?: "upcoming" | "past";
  sponsors?: Sponsor[];
}

export interface NewsPost {
  _id: string;
  title: string;
  slug: Slug;
  date: string;
  body?: unknown[];
  image?: SanityImage;
  pinned?: boolean;
}

export interface Contribution {
  _id: string;
  recipient: string;
  slug: Slug;
  date: string;
  amount?: string;
  summary: string;
  description?: unknown[];
  image?: SanityImage;
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

export interface SiteSettings {
  clubName: string;
  meetingDay?: string;
  meetingTime?: string;
  meetingLocation?: string;
  contactEmail: string;
  phone?: string;
  socialLinks?: { platform: string; url: string }[];
  footerText?: string;
  heroImages?: HeroImage[]; // add this
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
}

export interface Page {
  _id: string;
  title: string;
  slug: Slug;
  body: unknown[];
  seoTitle?: string;
  seoDescription?: string;
}
