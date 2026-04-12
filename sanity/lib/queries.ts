// ─── Site Settings ───────────────────────────────────────────
export const siteSettingsQuery = `
  *[_type == "siteSettings"][0] {
    clubName,
    meetingDay,
    meetingTime,
    meetingLocation,
    contactEmail,
    phone,
    socialLinks[] {
      platform,
      url
    },
    footerText
  }
`;

// ─── Events ──────────────────────────────────────────────────
export const upcomingEventsQuery = `
  *[_type == "event" && dateStart > now()] | order(dateStart asc) [0...3] {
    _id,
    title,
    slug,
    dateStart,
    dateEnd,
    category,
    location,
    heroImage,
    featured
  }
`;

export const allEventsQuery = `
  *[_type == "event"] | order(dateStart desc) {
    _id,
    title,
    slug,
    dateStart,
    dateEnd,
    category,
    location,
    heroImage,
    featured,
    "status": select(dateStart > now() => "upcoming", "past")
  }
`;

export const eventBySlugQuery = `
  *[_type == "event" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    dateStart,
    dateEnd,
    category,
    location,
    description,
    heroImage,
    gallery,
    featured,
    externalUrl,
    sponsors[]-> {
      _id,
      name,
      logo,
      websiteUrl
    }
  }
`;

export const eventSlugsQuery = `
  *[_type == "event"] { "slug": slug.current }
`;

// ─── News Posts ───────────────────────────────────────────────
export const latestNewsQuery = `
  *[_type == "newsPost"] | order(pinned desc, date desc) [0...4] {
    _id,
    title,
    slug,
    date,
    pinned,
    image
  }
`;

export const allNewsQuery = `
  *[_type == "newsPost"] | order(pinned desc, date desc) {
    _id,
    title,
    slug,
    date,
    pinned,
    image
  }
`;

export const newsBySlugQuery = `
  *[_type == "newsPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    date,
    body,
    image,
    pinned
  }
`;

export const newsSlugsQuery = `
  *[_type == "newsPost"] { "slug": slug.current }
`;

// ─── Contributions ────────────────────────────────────────────
export const allContributionsQuery = `
  *[_type == "contribution"] | order(date desc) {
    _id,
    recipient,
    slug,
    date,
    amount,
    summary,
    image
  }
`;

export const contributionBySlugQuery = `
  *[_type == "contribution" && slug.current == $slug][0] {
    _id,
    recipient,
    slug,
    date,
    amount,
    summary,
    description,
    image
  }
`;

export const contributionSlugsQuery = `
  *[_type == "contribution"] { "slug": slug.current }
`;

export const impactStatsQuery = `
  {
    "totalContributions": count(*[_type == "contribution"]),
    "contributions": *[_type == "contribution"] {
      amount
    }
  }
`;

// ─── Causes ───────────────────────────────────────────────────
export const activeCausesQuery = `
  *[_type == "cause" && active == true] | order(order asc) {
    _id,
    name,
    slug,
    summary,
    image,
    externalUrl
  }
`;

export const causeBySlugQuery = `
  *[_type == "cause" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    summary,
    description,
    image,
    externalUrl
  }
`;

export const causeSlugsQuery = `
  *[_type == "cause"] { "slug": slug.current }
`;

// ─── Sponsors ─────────────────────────────────────────────────
export const allSponsorsQuery = `
  *[_type == "sponsor"] | order(order asc) {
    _id,
    name,
    logo,
    websiteUrl
  }
`;

// ─── Club Members ─────────────────────────────────────────────
export const clubMembersQuery = `
  *[_type == "clubMember"] | order(order asc) {
    _id,
    name,
    role,
    photo,
    bio
  }
`;

// ─── Pages ────────────────────────────────────────────────────
export const pageBySlugQuery = `
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    body,
    seoTitle,
    seoDescription
  }
`;

// ─── Homepage (parallel fetch) ────────────────────────────────
export const homepageQuery = `
  {
    "upcomingEvents": *[_type == "event" && dateStart > now()] | order(dateStart asc) [0...3] {
      _id, title, slug, dateStart, category, location, heroImage
    },
    "latestNews": *[_type == "newsPost"] | order(pinned desc, date desc) [0...4] {
      _id, title, slug, date, pinned, image
    },
    "causes": *[_type == "cause" && active == true] | order(order asc) [0...6] {
      _id, name, slug, summary, image, externalUrl
    },
    "sponsors": *[_type == "sponsor"] | order(order asc) {
      _id, name, logo, websiteUrl
    },
    "impactStats": {
      "totalContributions": count(*[_type == "contribution"])
    },
    "settings": *[_type == "siteSettings"][0] {
      clubName, meetingDay, meetingTime, meetingLocation, contactEmail
    }
  }
`;