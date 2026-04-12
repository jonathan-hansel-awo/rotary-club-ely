/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "@/components/ui/Button";
import Image from "next/image";

const navLinks = [
  { label: "Events", href: "/events" },
  { label: "Our Impact", href: "/impact" },
  { label: "Our Causes", href: "/causes" },
  { label: "Latest", href: "/news" },
  { label: "About", href: "/about" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Floating header bar */}
      <header
        className={`
          fixed top-4 left-4 right-4 z-50
          rounded-2xl
          transition-all duration-300 ease-out
          ${
            scrolled
              ? "bg-white/90 backdrop-blur-md shadow-lg text-text-primary"
              : "bg-white/10 backdrop-blur-sm text-white"
          }
        `}
      >
        <div className="max-w-[1280px] mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="relative h-10 w-10">
            <Image
              src="/rotary-logo.png"
              alt="Rotary Club of Ely"
              fill
              className={`
      object-contain object-left
      transition-all duration-300
      ${scrolled ? "brightness-100" : "brightness-0 invert"}
    `}
              priority
            />
            </div>
            <span
              className={`
                font-heading font-bold text-base leading-tight
                transition-colors duration-300
                ${scrolled ? "text-rotary-blue" : "text-white"}
              `}
            >
              Rotary Club of Ely
            </span>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    relative font-body font-medium text-sm
                    transition-colors duration-150
                    ${
                      scrolled
                        ? isActive
                          ? "text-rotary-blue"
                          : "text-text-secondary hover:text-rotary-blue"
                        : isActive
                          ? "text-rotary-gold"
                          : "text-white/90 hover:text-white"
                    }
                  `}
                >
                  {link.label}
                  {/* Active underline */}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-rotary-gold rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right side actions */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="https://rotary-ribi.org/clubs/homepage.php?ClubID=467"
              target="_blank"
              rel="noopener noreferrer"
              className={`
                font-body font-medium text-sm
                transition-colors duration-150
                ${scrolled ? "text-text-muted hover:text-text-primary" : "text-white/70 hover:text-white"}
              `}
            >
              Members ↗
            </a>
            <Button
              as="a"
              href="https://rotary-ribi.org/clubs/homepage.php?ClubID=467"
              variant={scrolled ? "primary" : "ghost"}
              size="sm"
            >
              Join Us
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`
              lg:hidden flex flex-col gap-1.5 p-2 rounded-md
              transition-colors duration-150
              ${scrolled ? "text-text-primary" : "text-white"}
            `}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span
              className={`
                block w-6 h-0.5 rounded-full bg-current
                transition-all duration-300
                ${menuOpen ? "rotate-45 translate-y-2" : ""}
              `}
            />
            <span
              className={`
                block w-6 h-0.5 rounded-full bg-current
                transition-all duration-300
                ${menuOpen ? "opacity-0" : ""}
              `}
            />
            <span
              className={`
                block w-6 h-0.5 rounded-full bg-current
                transition-all duration-300
                ${menuOpen ? "-rotate-45 -translate-y-2" : ""}
              `}
            />
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`
          fixed inset-0 z-40
          bg-rotary-blue-dark/95 backdrop-blur-md
          flex flex-col
          transition-all duration-300 ease-out
          lg:hidden
          ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 px-8">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={`
                font-heading font-bold text-3xl text-white
                hover:text-rotary-gold transition-all duration-300
                ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
              `}
              style={{ transitionDelay: menuOpen ? `${i * 60}ms` : "0ms" }}
            >
              {link.label}
            </Link>
          ))}

          <div
            className={`
              flex flex-col items-center gap-4 mt-4
              transition-all duration-300
              ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
            `}
            style={{
              transitionDelay: menuOpen ? `${navLinks.length * 60}ms` : "0ms",
            }}
          >
            <Button as="a" href="/contact" variant="primary">
              Join Us
            </Button>
            <a
              href="https://rotary.org"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-sm text-white/60 hover:text-white transition-colors"
            >
              Members ↗
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
