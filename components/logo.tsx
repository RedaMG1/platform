import Link from "next/link";

type LogoProps = {
  light?: boolean;
};

export function Logo({ light = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={`brand-logo ${light ? "brand-logo--light" : ""}`}
      aria-label="Forma home"
    >
      <span className="brand-logo__mark" aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
      <span>Forma</span>
    </Link>
  );
}
