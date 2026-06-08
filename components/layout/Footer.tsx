/* eslint-disable react/no-unescaped-entities */

import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";

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
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 4l16 16M4 20L20 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
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
  x: TwitterIcon,
  instagram: InstagramIcon,
};

const quickLinks = [
  { label: "Events", href: "/events" },
  { label: "Our Impact", href: "/impact" },
  { label: "Our Causes", href: "/causes" },
  { label: "Latest Updates", href: "/news" },
  { label: "About", href: "/about" },
];

const getInvolvedLinks = [
  { label: "Join the Club", href: "/contact#join" },
  { label: "Volunteer", href: "/contact#volunteer" },
  { label: "Contact Us", href: "/contact" },
  {
    label: "Members Area ↗",
    href: "https://rotary-ribi.org/clubs/homepage.php?ClubID=467",
    external: true,
  },
];

function FooterLink({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const className =
    "group inline-flex w-fit items-center gap-2 text-sm font-medium text-white/68 transition hover:text-white";

  const content = (
    <>
      <span className="h-1.5 w-1.5 rounded-full bg-rotary-gold opacity-0 transition group-hover:opacity-100" />
      <span>{children}</span>
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}

export default async function Footer() {
  const settings = await client.fetch(siteSettingsQuery);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[#071D36] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(247,168,27,0.16),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(0,103,200,0.28),transparent_38%)]" />
      <div className="absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full border-[42px] border-white/[0.035]" />
      <div className="absolute -left-36 bottom-10 h-80 w-80 rounded-full bg-rotary-gold/10 blur-3xl" />

      <div className="relative mx-auto max-w-[1280px] px-[clamp(1rem,2vw,2rem)] py-16 md:py-20">
        <div className="mb-12 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur-md sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-rotary-gold">
                Rotary Club of Ely
              </p>

              <h2 className="mt-4 max-w-3xl font-heading text-3xl font-black leading-tight md:text-5xl">
                Service, friendship and community action in Ely.
              </h2>

              <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/68">
                Serving the Ely community through events, volunteering and
                charitable giving — as part of Rotary International's worldwide
                network.
              </p>
            </div>

            <Link
              href="/contact"
              className="inline-flex w-fit rounded-full bg-rotary-gold px-7 py-3 text-sm font-black uppercase tracking-wide text-slate-950 transition hover:bg-white"
            >
              Get in touch
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
          <div>
            <Link href="/" className="flex w-fit items-center gap-3">
              <div className="relative h-12 w-12">
                <Image
                  src="/rotary-logo.svg"
                  alt="Rotary Club of Ely"
                  fill
                  sizes="48px"
                  className="object-contain object-left"
                />
              </div>

              <span className="font-heading text-lg font-black text-white">
                Rotary Club of Ely
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/62">
              Local people working together to support good causes, create
              memorable community events and make a positive difference.
            </p>

            {settings?.socialLinks && settings.socialLinks.length > 0 && (
              <div className="mt-6 flex items-center gap-3">
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
                        className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white/68 transition hover:-translate-y-0.5 hover:border-rotary-gold hover:bg-rotary-gold hover:text-slate-950"
                      >
                        <Icon />
                      </a>
                    );
                  },
                )}
              </div>
            )}
          </div>

          <div>
            <h3 className="mb-5 font-heading text-base font-black text-white">
              Explore
            </h3>

            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 font-heading text-base font-black text-white">
              Get Involved
            </h3>

            <ul className="space-y-3">
              {getInvolvedLinks.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href} external={link.external}>
                    {link.label}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 font-heading text-base font-black text-white">
              Meet With Us
            </h3>

            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5">
              <address className="not-italic text-sm leading-relaxed text-white/68">
                {settings?.meetingDay && settings?.meetingTime && (
                  <p className="font-bold text-white">
                    {settings.meetingDay} at {settings.meetingTime}
                  </p>
                )}

                {settings?.meetingLocation && (
                  <p className="mt-2">{settings.meetingLocation}</p>
                )}
              </address>

              {settings?.contactEmail && (
                <a
                  href={`mailto:${settings.contactEmail}`}
                  className="mt-4 inline-block break-all text-sm font-bold text-rotary-gold underline underline-offset-4 transition hover:text-white"
                >
                  {settings.contactEmail}
                </a>
              )}

              {settings?.phone && (
                <a
                  href={`tel:${settings.phone}`}
                  className="mt-2 block text-sm font-bold text-white/70 transition hover:text-white"
                >
                  {settings.phone}
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <div className="flex flex-col gap-3 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {currentYear} Rotary Club of Ely.{" "}
              {settings?.footerText || "Part of Rotary International."}
            </p>

            <p>
              Registered in England.{" "}
              <Link
                href="/privacy"
                className="font-semibold text-white/70 underline underline-offset-4 transition hover:text-rotary-gold"
              >
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
