import { ReactNode } from "react";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";

interface SanityImage {
  asset: { _ref: string };
  alt?: string;
  hotspot?: { x: number; y: number };
  crop?: object;
}

interface CardProps {
  title: string;
  meta?: string;
  description?: string;
  linkText?: string;
  href?: string;
  badge?: ReactNode;
  imageBg?: string;
  image?: SanityImage;
  imageAlt?: string;
  className?: string;
}

export default function Card({
  title,
  meta,
  description,
  linkText = "Read more",
  href = "#",
  badge,
  imageBg = "bg-rotary-blue",
  image,
  imageAlt,
  className = "",
}: CardProps) {

  const imageUrl = image
    ? urlForImage(image).width(800).height(450).url()
    : null

  const hotspotStyle = image?.hotspot
    ? {
        objectPosition: `${image.hotspot.x * 100}% ${image.hotspot.y * 100}%`,
      }
    : undefined

  return (
    <div
      className={`
        group
        bg-bg-card
        rounded-md
        shadow-sm
        overflow-hidden
        cursor-pointer
        transition-all duration-200 ease-out
        hover:-translate-y-1 hover:shadow-card-hover
        ${className}
      `}
    >
      {/* Image area */}
      <div className="relative w-full aspect-video overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt ?? title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="
              object-cover
              transition-transform duration-300 ease-out
              group-hover:scale-105
            "
            style={hotspotStyle}
          />
        ) : (
          <div
            className={`
              w-full h-full ${imageBg}
              transition-transform duration-300 ease-out
              group-hover:scale-105
            `}
          />
        )}

        {badge && (
          <div className="absolute top-3 left-3">
            {badge}
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="p-6">
        <h3
          className="
            font-heading font-semibold
            text-xl text-text-primary
            leading-snug mb-2
          "
        >
          {title}
        </h3>

        {meta && (
          <p className="text-sm text-text-muted font-body mb-3">
            {meta}
          </p>
        )}

        {description && (
          <p
            className="
              text-sm text-text-secondary font-body
              leading-normal mb-4
              line-clamp-2
            "
          >
            {description}
          </p>
        )}

        <a
          href={href}
          className="
            inline-flex items-center gap-1
            text-sm font-medium font-body
            text-link
            transition-all duration-150 ease-out
            group-hover:text-rotary-blue group-hover:gap-2
          "
        >
          {linkText} →
        </a>
      </div>
    </div>
  );
}