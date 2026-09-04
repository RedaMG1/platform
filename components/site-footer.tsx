import Link from "next/link";
import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Logo />
      <p>An anatomy-first learning platform built for lasting understanding.</p>
      <nav aria-label="Footer navigation">
        <Link href="/courses">Courses</Link>
        <Link href="/pricing">Pricing</Link>
        <Link href="/login">Log in</Link>
      </nav>
    </footer>
  );
}
