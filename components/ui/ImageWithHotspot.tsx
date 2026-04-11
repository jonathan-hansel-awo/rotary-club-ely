interface Hotspot {
  x: number;
  y: number;
}

interface SanityImageRef {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  hotspot?: Hotspot;
}

interface ImageWithHotspotProps {
  image: SanityImageRef | null;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  aspectRatio?: "video" | "square" | "portrait" | "cinema";
}

const aspectRatioClasses = {
  video: "aspect-video",
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  cinema: "aspect-[21/9]",
};

export default function ImageWithHotspot({
  image,
  alt,
  className = "",
  aspectRatio = "video",
}: ImageWithHotspotProps) {
  // Placeholder until Sanity image builder is wired up in Batch C
  if (!image) {
    return (
      <div
        className={`
          ${aspectRatioClasses[aspectRatio]}
          bg-grey-200
          flex items-center justify-center
          rounded-md
          ${className}
        `}
      >
        <span className="text-text-muted text-sm font-body">No image</span>
      </div>
    );
  }

  // Temporary — will be replaced with next/image + Sanity URL builder
  return (
    <div
      className={`
        ${aspectRatioClasses[aspectRatio]}
        bg-grey-200
        overflow-hidden
        rounded-md
        ${className}
      `}
    >
      <div className="w-full h-full bg-linear-to-br from-rotary-blue to-rotary-blue-dark" />
    </div>
  );
}
