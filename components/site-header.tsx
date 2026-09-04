"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "./logo";

const navigation = [
  { label: "Courses", href: "/courses" },
  { label: "Atlas", href: "/atlas" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Pricing", href: "/pricing" },
];

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  function isActiveLink(href: string) {
    if (href === "/courses") {
      return pathname.startsWith("/courses") || pathname.startsWith("/lesson");
    }

    return pathname.startsWith(href);
  }

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Logo />

        <nav className="desktop-navigation" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActiveLink(item.href) ? "is-active" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="site-header__actions">
          <Link
            href="/courses"
            className="header-search"
            aria-label="Search courses"
          >
            <Search size={19} />
          </Link>
          <Link href="/login" className="header-login">
            Log in
          </Link>
          <Link href="/register" className="button button--small">
            Start learning
          </Link>
          <button
            type="button"
            className="mobile-menu-button"
            onClick={() => setIsMenuOpen((current) => !current)}
            aria-label="Toggle navigation"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav className="mobile-navigation" aria-label="Mobile navigation">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActiveLink(item.href) ? "is-active" : undefined}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/login" onClick={() => setIsMenuOpen(false)}>
            Log in
          </Link>
          <Link
            href="/register"
            className="button"
            onClick={() => setIsMenuOpen(false)}
          >
            Start learning
          </Link>
        </nav>
      )}
    </header>
  );
}
