/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import Image from "next/image";

// Social icon SVGs — inline to avoid extra dependencies
function FacebookIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        d="M4 4l16 16M4 20L20 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const socialIconMap: Record<string, React.ComponentType> = {
  facebook: FacebookIcon,
  twitter: TwitterIcon,
  instagram: InstagramIcon,
};

const quickLinks = [
  { label: "Events", href: "/events" },
  { label: "Our Impact", href: "/impact" },
  { label: "Our Causes", href: "/causes" },
  { label: "Latest", href: "/news" },
  { label: "About", href: "/about" },
];

const getInvolvedLinks = [
  { label: "Join the Club", href: "/contact#join" },
  { label: "Volunteer", href: "/contact#volunteer" },
  { label: "Contact Us", href: "/contact" },
  { label: "Members ↗", href: "https://rotary.org", external: true },
];

export default async function Footer() {
  const settings = await client.fetch(siteSettingsQuery);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0C2340]">
      <div className="max-w-[1280px] mx-auto px-[clamp(1rem,2vw,2rem)] pt-[clamp(3rem,5vw,5rem)] pb-10">
        {/* 4-column grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Club info + social */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 flex-shrink-0">
              <div className="relative h-10 w-10">
                <Image
                  src="/rotary-logo.svg"
                  alt="Rotary Club of Ely"
                  fill
                  sizes="40px"
                  className="object-contain object-left"
                  priority
                />
              </div>
              <span
                className="
                font-heading font-bold text-white"
              >
                Rotary Club of Ely
              </span>
            </Link>

            <p className="text-[#B8C4D8] text-sm leading-relaxed mb-6">
              Serving the Ely community through events, volunteering, and
              charitable giving. Part of Rotary International's global network
              of 1.2 million members.
            </p>

            {/* Social links */}
            {settings?.socialLinks && settings.socialLinks.length > 0 && (
              <div className="flex items-center gap-3">
                {settings.socialLinks.map(
                  (social: { platform: string; url: string }) => {
                    const Icon = socialIconMap[social.platform.toLowerCase()];
                    if (!Icon) return null;
                    return (
                      <a
                        key={social.platform}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Rotary Club of Ely on ${social.platform}`}
                        className="
                        text-[#B8C4D8] hover:text-white
                        transition-all duration-200 ease-out
                        hover:scale-110
                      "
                      >
                        <Icon />
                      </a>
                    );
                  },
                )}
              </div>
            )}
          </div>

          {/* Column 2: Quick links */}
          <div>
            <h3 className="font-heading font-semibold text-white text-[0.95rem] mb-4">
              Explore
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="
                      text-[#B8C4D8] hover:text-white
                      text-sm transition-colors duration-150
                    "
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Get involved */}
          <div>
            <h3 className="font-heading font-semibold text-white text-[0.95rem] mb-4">
              Get Involved
            </h3>
            <ul className="space-y-2">
              {getInvolvedLinks.map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        text-[#B8C4D8] hover:text-white
                        text-sm transition-colors duration-150
                      "
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="
                        text-[#B8C4D8] hover:text-white
                        text-sm transition-colors duration-150
                      "
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Meeting details */}
          <div>
            <h3 className="font-heading font-semibold text-white text-[0.95rem] mb-4">
              Meet With Us
            </h3>
            <address className="not-italic text-[#B8C4D8] text-sm leading-relaxed space-y-1">
              {settings?.meetingDay && settings?.meetingTime && (
                <p>
                  {settings.meetingDay} at {settings.meetingTime}
                </p>
              )}
              {settings?.meetingLocation && <p>{settings.meetingLocation}</p>}
            </address>

            {settings?.contactEmail && (
              <a
                href={`mailto:${settings.contactEmail}`}
                className="
                  inline-block mt-4 text-sm text-[#B8C4D8]
                  hover:text-white transition-colors duration-150
                  underline underline-offset-2
                "
              >
                {settings.contactEmail}
              </a>
            )}

            {settings?.phone && (
              <a
                href={`tel:${settings.phone}`}
                className="
                  block mt-2 text-sm text-[#B8C4D8]
                  hover:text-white transition-colors duration-150
                "
              >
                {settings.phone}
              </a>
            )}
          </div>
        </div>

        {/* Divider */}
        <hr className="border-white/10 mt-10 mb-6" />

        {/* Copyright row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#B8C4D8]">
          <p>
            © {currentYear} Rotary Club of Ely.{" "}
            {settings?.footerText || "Part of Rotary International."}
          </p>
          <p>
            Registered in England.{" "}
            <a
              href="/privacy"
              className="hover:text-white transition-colors duration-150"
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
