"use client";

import Link from "next/link";
import { Lock, Search, SlidersHorizontal, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { courseRegions } from "@/data/courses";
import { structures, type Structure, type StructureType } from "@/data/structures";

const types: (StructureType | "All")[] = [
  "All",
  "Muscle",
  "Bone",
  "Nerve",
  "Joint",
  "Organ",
];

export function AtlasBrowser() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<StructureType | "All">("All");
  const [region, setRegion] = useState("all");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return structures.filter((structure) => {
      const matchesQuery =
        normalized.length === 0 ||
        structure.name.toLowerCase().includes(normalized);
      const matchesType = type === "All" || structure.type === type;
      const matchesRegion = region === "all" || structure.region === region;

      return matchesQuery && matchesType && matchesRegion;
    });
  }, [query, region, type]);

  return (
    <div className="atlas-page">
      <section className="atlas-hero section-container">
        <span className="eyebrow">
          <Sparkles size={15} />
          Anatomy atlas
        </span>
        <h1>Every structure, one search away.</h1>
        <p>
          Look up bones, muscles, nerves and joints as you study. Full
          illustrated entries are coming as each course is released.
        </p>
      </section>

      <section className="atlas-toolbar section-container">
        <label className="courses-search">
          <Search size={18} />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search structures"
            aria-label="Search structures"
          />
        </label>

        <label className="courses-region-select">
          <SlidersHorizontal size={17} />
          <span className="sr-only">Filter by body region</span>
          <select
            value={region}
            onChange={(event) => setRegion(event.target.value)}
          >
            {courseRegions.map((item) => (
              <option value={item.value} key={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
      </section>

      <div
        className="courses-category-filter section-container"
        aria-label="Structure type"
      >
        {types.map((item) => (
          <button
            type="button"
            key={item}
            className={type === item ? "is-active" : ""}
            onClick={() => setType(item)}
            aria-pressed={type === item}
          >
            {item}
          </button>
        ))}
      </div>

      <section className="atlas-grid section-container">
        {filtered.length > 0 ? (
          filtered.map((structure) => (
            <StructureCard structure={structure} key={structure.slug} />
          ))
        ) : (
          <div className="courses-empty">
            <Search size={25} />
            <h3>No structures match these filters.</h3>
            <p>Try another keyword, type or region.</p>
          </div>
        )}
      </section>
    </div>
  );
}

function StructureCard({ structure }: { structure: Structure }) {
  const content = (
    <>
      <span className="structure-card__icon">{structure.name.slice(0, 1)}</span>
      <div className="structure-card__body">
        <span className="structure-card__type">{structure.type}</span>
        <strong>{structure.name}</strong>
        <p>{structure.summary}</p>
        <span className="structure-card__region">{structure.regionLabel}</span>
        {!structure.lessonHref && (
          <span className="structure-card__lock">
            <Lock size={12} />
            Coming soon
          </span>
        )}
      </div>
    </>
  );

  if (structure.lessonHref) {
    return (
      <Link
        href={structure.lessonHref}
        className={`structure-card structure-card--${structure.accent}`}
      >
        {content}
      </Link>
    );
  }

  return (
    <div className={`structure-card structure-card--${structure.accent} is-locked`}>
      {content}
    </div>
  );
}
