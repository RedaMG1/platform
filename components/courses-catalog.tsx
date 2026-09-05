"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowRight,
  BookOpen,
  Clock3,
  Crown,
  Search,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import { useMemo, useState } from "react";
import { courseRegions, courses, type Course } from "@/data/courses";

type CoursesCatalogProps = {
  initialRegion: string;
};

type CategoryFilter = "All" | "Anatomy" | "Foundations";

const categories: CategoryFilter[] = ["All", "Anatomy", "Foundations"];

export function CoursesCatalog({ initialRegion }: CoursesCatalogProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("All");
  const [region, setRegion] = useState(initialRegion);

  const selectedRegionLabel =
    courseRegions.find((item) => item.value === region)?.label ?? "All regions";

  const filteredCourses = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return courses.filter((course) => {
      const matchesSearch =
        normalizedQuery.length === 0 ||
        course.title.toLowerCase().includes(normalizedQuery) ||
        course.description.toLowerCase().includes(normalizedQuery) ||
        course.regionLabel.toLowerCase().includes(normalizedQuery);

      const matchesCategory =
        category === "All" || course.category === category;
      const matchesRegion = region === "all" || course.region === region;

      return matchesSearch && matchesCategory && matchesRegion;
    });
  }, [category, query, region]);

  function changeRegion(nextRegion: string) {
    setRegion(nextRegion);

    if (nextRegion === "all") {
      router.replace(pathname, { scroll: false });
      return;
    }

    router.replace(`${pathname}?region=${nextRegion}`, { scroll: false });
  }

  function clearFilters() {
    setQuery("");
    setCategory("All");
    changeRegion("all");
  }

  return (
    <div className="courses-page">
      <section className="courses-hero section-container">
        <div className="courses-hero__content">
          <span className="eyebrow">
            <Sparkles size={15} />
            Learn one region at a time
          </span>
          <h1>Courses built for real understanding.</h1>
          <p>
            Follow clear learning paths that connect anatomy lessons, visual
            explanations and active-recall quizzes.
          </p>
        </div>

        <div className="courses-hero__summary" aria-label="Course catalogue summary">
          <div>
            <strong>{courses.length}</strong>
            <span>Learning paths</span>
          </div>
          <div>
            <strong>158</strong>
            <span>Planned lessons</span>
          </div>
          <div>
            <strong>1</strong>
            <span>Available course</span>
          </div>
        </div>
      </section>

      <section className="courses-catalog section-container">
        <div className="courses-toolbar">
          <label className="courses-search">
            <Search size={18} />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search courses"
              aria-label="Search courses"
            />
          </label>

          <label className="courses-region-select">
            <SlidersHorizontal size={17} />
            <span className="sr-only">Filter by body region</span>
            <select
              value={region}
              onChange={(event) => changeRegion(event.target.value)}
            >
              {courseRegions.map((item) => (
                <option value={item.value} key={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="courses-category-filter" aria-label="Course categories">
          {categories.map((item) => (
            <button
              type="button"
              key={item}
              className={category === item ? "is-active" : ""}
              onClick={() => setCategory(item)}
              aria-pressed={category === item}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="courses-results-heading">
          <div>
            <span className="section-kicker">COURSE LIBRARY</span>
            <h2>
              {region === "all" ? "Explore all courses" : selectedRegionLabel}
            </h2>
          </div>
          <span>
            {filteredCourses.length} {filteredCourses.length === 1 ? "course" : "courses"}
          </span>
        </div>

        {filteredCourses.length > 0 ? (
          <div className="courses-grid">
            {filteredCourses.map((course) => (
              <CourseCard course={course} key={course.slug} />
            ))}
          </div>
        ) : (
          <div className="courses-empty">
            <Search size={25} />
            <h3>No courses match these filters.</h3>
            <p>Try another keyword, category or body region.</p>
            <button type="button" onClick={clearFilters}>
              Clear filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export function CourseCard({ course }: { course: Course }) {
  return (
    <Link
      href={`/courses/${course.slug}`}
      className={`course-card course-card--${course.accent}`}
    >
      <div className="course-card__cover">
        <span className="course-card__eyebrow">{course.eyebrow}</span>
        <div className="course-card__art" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </div>
        <span className="course-card__region">{course.regionLabel}</span>
        <span
          className={`course-card__status ${
            course.status === "available" ? "is-available" : ""
          }`}
        >
          {course.status === "available" ? "Available now" : "Coming soon"}
        </span>
      </div>

      <div className="course-card__body">
        <div className="course-card__badges">
          <span>{course.level}</span>
          {course.access === "Premium" ? (
            <span className="is-premium">
              <Crown size={12} />
              Premium
            </span>
          ) : (
            <span>{course.access}</span>
          )}
        </div>

        <h3>{course.title}</h3>
        <p>{course.description}</p>

        <div className="course-card__meta">
          <span>
            <BookOpen size={15} />
            {course.lessonCount} lessons
          </span>
          <span>
            <Clock3 size={15} />
            {course.duration}
          </span>
        </div>

        <span className="course-card__action">
          View course
          <ArrowRight size={17} />
        </span>
      </div>
    </Link>
  );
}
