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
    footerText,
    heroImages[] {
      ...,
      alt,
      caption
    },
    activityTiles[] {
      label,
      description,
      href,
      badge,
      image {
        ...,
        alt
      }
    }
  }
`;

// ─── Events ──────────────────────────────────────────────────
export const upcomingEventsQuery = `
  *[
    _type == "event" &&
    (
      (defined(dateStart) && dateStart > now()) ||
      (!defined(dateStart) && eventStatus == "upcoming")
    )
  ]
  | order(featured desc, dateStart asc) [0...3] {
    _id,
    title,
    slug,
    dateStart,
    dateEnd,
    dateLabel,
    eventStatus,
    category,
    location,
    heroImage,
    featured,
    "status": select(
      defined(dateStart) && dateStart > now() => "upcoming",
      defined(dateStart) && dateStart <= now() => "past",
      eventStatus
    )
  }
`;

export const allEventsQuery = `
  *[_type == "event"]
  | order(featured desc, dateStart asc) {
    _id,
    title,
    slug,
    dateStart,
    dateEnd,
    dateLabel,
    eventStatus,
    category,
    location,
    heroImage,
    featured,
    "status": select(
      defined(dateStart) && dateStart > now() => "upcoming",
      defined(dateStart) && dateStart <= now() => "past",
      eventStatus
    )
  }
`;

export const eventBySlugQuery = `
  *[_type == "event" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    dateStart,
    dateEnd,
    dateLabel,
    eventStatus,
    category,
    location,
    description,
    heroImage,
    gallery,
    featured,
    externalUrl,
    "status": select(
      defined(dateStart) && dateStart > now() => "upcoming",
      defined(dateStart) && dateStart <= now() => "past",
      eventStatus
    ),
    sponsors[]-> {
      _id,
      name,
      logo,
      websiteUrl
    }
  }
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

// ─── Impact Stories ────────────────────────────────────────────
export const allImpactsQuery = `
  *[_type == "impactStory"] | order(date desc) {
    _id,
    title,
    recipient,
    slug,
    date,
    summary,
    image
  }
`;

export const impactBySlugQuery = `
  *[_type == "impactStory" && slug.current == $slug][0] {
    _id,
    title,
    recipient,
    slug,
    date,
    summary,
    story,
    quote,
    image
  }
`;

export const impactSlugsQuery = `
  *[_type == "impactStory"] {
    "slug": slug.current
  }
`;

export const impactStatsQuery = `
  {
    "totalImpacts": count(*[_type == "impactStory"])
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
    featuredImage,
    logo,
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
    featuredImage,
    logo,
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

export const aboutPageQuery = `
  *[_type == "page" && slug.current == "about"][0] {
    title,
    body
  }
`;

// ─── Homepage (parallel fetch) ────────────────────────────────
export const homepageQuery = `
  {
    "upcomingEvents": *[
  _type == "event" &&
  (
    (defined(dateStart) && dateStart > now()) ||
    (!defined(dateStart) && eventStatus == "upcoming")
  )
] | order(featured desc, dateStart asc) [0...3] {
  _id,
  title,
  slug,
  dateStart,
  dateEnd,
  dateLabel,
  eventStatus,
  category,
  location,
  heroImage,
  featured,
  "status": select(
    defined(dateStart) && dateStart > now() => "upcoming",
    defined(dateStart) && dateStart <= now() => "past",
    eventStatus
  )
},
    "latestNews": *[_type == "newsPost"] | order(pinned desc, date desc) [0...4] {
      _id, title, slug, date, pinned, image
    },
"causes": *[_type == "cause" && active == true] | order(order asc) [0...6] {
  _id,
  name,
  slug,
  summary,
  image,
  featuredImage,
  logo,
  externalUrl
},
    "sponsors": *[_type == "sponsor"] | order(order asc) {
      _id, name, logo, websiteUrl
    },
    "impactStats": {
      "totalImpacts": count(*[_type == "impact"])
    },
    "members": *[_type == "clubMember"] | order(order asc) [0...8] {
  _id, name, role, photo, bio
},
    "settings": *[_type == "siteSettings"][0] {
  clubName,
  meetingDay,
  meetingTime,
  meetingLocation,
  contactEmail,
  heroImages[] {
    ...,
    alt,
    caption
  },
  activityTiles[] {
    label,
    description,
    href,
    badge,
    image {
      ...,
      alt
    }
  }
},
  }
`;