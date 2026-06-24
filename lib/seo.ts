import type { Metadata } from "next";

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://rotaryclubofely.co.uk"
).replace(/\/$/, "");

type PageSeoOptions = {
  title: string;
  description: string;
  path: `/${string}` | "/";
  image?: {
    url: string;
    width: number;
    height: number;
    alt: string;
  };
};

const defaultOgImage = {
  url: "/og-default.png",
  width: 1200,
  height: 630,
  alt: "Rotary Club of Ely — People of Action",
};

function absoluteUrl(path: string) {
  if (path.startsWith("http")) return path;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function createPageMetadata({
  title,
  description,
  path,
  image = defaultOgImage,
}: PageSeoOptions): Metadata {
  const canonicalUrl = absoluteUrl(path);
  const imageUrl = absoluteUrl(image.url);

  return {
    title,
    description,

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      type: "website",
      locale: "en_GB",
      url: canonicalUrl,
      siteName: "Rotary Club of Ely",
      title,
      description,
      images: [
        {
          ...image,
          url: imageUrl,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}
