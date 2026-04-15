"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { urlForImage } from "@/sanity/lib/image";
import { SanityImageSource } from "@sanity/image-url";


interface GalleryImage {
  _key: string;
  asset: SanityImageSource;
  alt?: string;
  hotspot?: object;
  crop?: object;
}

interface EventGalleryProps {
  images: GalleryImage[];
}

export default function EventGallery({ images }: EventGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const isOpen = lightboxIndex !== null;

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev + 1) % images.length,
    );
  }, [images.length]);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev - 1 + images.length) % images.length,
    );
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, goNext, goPrev]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!images || images.length === 0) return null;

  return (
    <>
      {/* Grid */}
      <div
        className={`
          grid gap-3
          ${images.length === 1 ? "grid-cols-1" : ""}
          ${images.length === 2 ? "grid-cols-2" : ""}
          ${images.length >= 3 ? "grid-cols-2 sm:grid-cols-3" : ""}
        `}
      >
        {images.map((image, index) => {
          const src = urlForImage(image)?.width(800).height(600).url();
          if (!src) return null;

          return (
            <button
              key={image._key}
              onClick={() => openLightbox(index)}
              className={`
                group relative overflow-hidden rounded-xl bg-grey-200 focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-rotary-gold focus-visible:ring-offset-2
                ${index === 0 && images.length >= 3 ? "col-span-2 sm:col-span-1" : ""}
              `}
              aria-label={`View image ${index + 1} of ${images.length}${image.alt ? `: ${image.alt}` : ""}`}
            >
              <div className="aspect-[4/3] w-full relative">
                <Image
                  src={src}
                  alt={image.alt || `Gallery image ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-rotary-blue-dark/0 transition-colors duration-300 group-hover:bg-rotary-blue-dark/20" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-grey-900 shadow-md">
                    View
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isOpen && lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
          >
            {/* Image container */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative max-h-[85vh] max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const currentImage = images[lightboxIndex];
                const src = urlForImage(currentImage)
                  ?.width(1600)
                  .height(1200)
                  .url();
                if (!src) return null;
                return (
                  <div className="relative w-full aspect-[4/3]">
                    <Image
                      src={src}
                      alt={
                        currentImage.alt || `Gallery image ${lightboxIndex + 1}`
                      }
                      fill
                      className="object-contain rounded-lg"
                      sizes="(max-width: 1024px) 95vw, 80vw"
                      priority
                    />
                  </div>
                );
              })()}

              {/* Caption */}
              {images[lightboxIndex].alt && (
                <p className="mt-3 text-center text-sm text-white/70">
                  {images[lightboxIndex].alt}
                </p>
              )}

              {/* Counter */}
              <p className="mt-2 text-center text-xs text-white/50">
                {lightboxIndex + 1} / {images.length}
              </p>
            </motion.div>

            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Close lightbox"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Prev button */}
            {images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Previous image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            )}

            {/* Next button */}
            {images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Next image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
