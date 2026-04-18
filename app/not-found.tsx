import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "Sorry, we could not find the page you were looking for.",
};

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="min-h-[70vh] bg-off-white flex items-center"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-24 text-center">
        {/* Large 404 */}
        <p className="font-heading font-extrabold text-[8rem] sm:text-[12rem] leading-none text-grey-200 select-none">
          404
        </p>

        {/* Gold accent bar */}
        <div className="w-14 h-1.5 bg-rotary-gold rounded-full mx-auto -mt-4 mb-8" />

        <h1 className="font-heading font-bold text-3xl sm:text-4xl text-grey-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-grey-600 text-lg max-w-md mx-auto mb-10">
          Sorry, we could not find the page you were looking for. It may have
          moved or no longer exists.
        </p>

        {/* Action buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-rotary-gold hover:bg-rotary-gold-dark text-grey-900 font-semibold px-6 py-3 rounded-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Back to Home
          </Link>
          <Link
            href="/events"
            className="inline-flex items-center gap-2 border-2 border-rotary-blue text-rotary-blue hover:bg-rotary-blue hover:text-white font-semibold px-6 py-3 rounded-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            View Events
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 border-2 border-grey-300 text-grey-700 hover:border-grey-400 font-semibold px-6 py-3 rounded-md transition-all duration-200 hover:-translate-y-0.5"
          >
            Contact Us
          </Link>
        </div>

        {/* Quick links */}
        <div className="border-t border-grey-200 pt-10">
          <p className="text-sm font-medium uppercase tracking-widest text-grey-400 mb-6">
            Or try one of these
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {[
              { label: "Events", href: "/events" },
              { label: "Our Impact", href: "/impact" },
              { label: "Latest News", href: "/news" },
              { label: "Our Causes", href: "/causes" },
              { label: "About", href: "/about" },
              { label: "Contact", href: "/contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-rotary-azure hover:text-rotary-blue font-medium text-sm transition-colors duration-150"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
