import { PortableTextComponents } from "@portabletext/react";
import { urlForImage } from "./image";
import Image from "next/image";

export const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="font-body text-base text-text-secondary leading-normal mb-4">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="font-heading font-bold text-3xl text-text-primary leading-snug mt-8 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-heading font-semibold text-2xl text-text-primary leading-snug mt-6 mb-3">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-heading font-semibold text-xl text-text-primary leading-snug mt-4 mb-2">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-rotary-gold pl-6 my-6 italic text-text-secondary font-body">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-text-primary">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target={value?.blank ? "_blank" : undefined}
        rel={value?.blank ? "noopener noreferrer" : undefined}
        className="text-link underline hover:text-rotary-blue transition-colors duration-150"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-outside pl-6 mb-4 space-y-2 font-body text-text-secondary">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-outside pl-6 mb-4 space-y-2 font-body text-text-secondary">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-normal">{children}</li>,
    number: ({ children }) => <li className="leading-normal">{children}</li>,
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;
      return (
        <figure className="my-8">
          <Image
            src={urlForImage(value).width(1200).url()}
            alt={value.alt || ""}
            className="w-full rounded-md"
          />
          {value.caption && (
            <figcaption className="text-sm text-text-muted text-center mt-2 font-body">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};