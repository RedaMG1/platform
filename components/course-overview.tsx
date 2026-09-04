import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  Clock3,
  Crown,
  Gauge,
  Lock,
  Play,
  Sparkles,
} from "lucide-react";
import type { Course } from "@/data/courses";

export function CourseOverview({ course }: { course: Course }) {
  const isAvailable = course.status === "available" && course.startHref;

  return (
    <div className="course-overview-page">
      <section className="course-overview-hero section-container">
        <div className="course-overview-hero__inner">
          <div className="course-overview-copy">
            <Link href="/courses" className="course-overview-back">
              <ArrowLeft size={16} />
              All courses
            </Link>

            <span className="course-overview-kicker">{course.eyebrow}</span>
            <h1>{course.title}</h1>
            <p>{course.longDescription}</p>

            <div className="course-overview-meta">
              <span>
                <Gauge size={16} />
                {course.level}
              </span>
              <span>
                <BookOpen size={16} />
                {course.lessonCount} lessons
              </span>
              <span>
                <Clock3 size={16} />
                {course.duration}
              </span>
            </div>

            <div className="course-overview-actions">
              {isAvailable ? (
                <Link href={course.startHref!} className="button">
                  <Play size={17} fill="currentColor" />
                  Start free lesson
                </Link>
              ) : (
                <span className="course-coming-button">
                  <Clock3 size={17} />
                  Course coming soon
                </span>
              )}
              <a href="#curriculum" className="button button--secondary">
                View curriculum
                <ArrowRight size={17} />
              </a>
            </div>
          </div>

          <div className={`course-overview-cover course-overview-cover--${course.accent}`}>
            <span className="course-overview-cover__subject">{course.category}</span>
            <div className="course-overview-cover__art" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
            </div>
            <div>
              <span>{course.regionLabel}</span>
              <strong>{course.title}</strong>
            </div>
            <span className="course-overview-cover__brand">FORMA</span>
          </div>
        </div>
      </section>

      <section className="course-overview-benefits" aria-label="Course features">
        <div>
          <span><Check size={16} /></span>
          <p><strong>Structured lessons</strong>Follow a clear order without wondering what comes next.</p>
        </div>
        <div>
          <span><Sparkles size={16} /></span>
          <p><strong>Visual explanations</strong>Connect names, locations and functions more easily.</p>
        </div>
        <div>
          <span><Crown size={16} /></span>
          <p><strong>Free and premium</strong>Preview selected material before subscribing.</p>
        </div>
      </section>

      <section id="curriculum" className="course-curriculum section-container">
        <div className="course-curriculum__intro">
          <span className="section-kicker">COURSE CONTENT</span>
          <h2>What you’ll learn</h2>
          <p>
            {course.modules.length} modules arranged from foundations to
            regional detail, with knowledge checks throughout.
          </p>
        </div>

        <div className="course-curriculum__list">
          {course.modules.map((module, index) => {
            const isShoulderModule =
              course.slug === "upper-limb-anatomy" && module.title === "Shoulder";

            return (
              <details key={module.title} open={index === 0}>
                <summary>
                  <span className="course-module-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="course-module-title">
                    <strong>{module.title}</strong>
                    <small>{module.lessonCount} lessons</small>
                  </span>
                  {module.freePreview && (
                    <span className="course-module-free">Free preview</span>
                  )}
                  <ChevronDown size={18} className="course-module-chevron" />
                </summary>
                <div className="course-module-content">
                  <p>{module.description}</p>
                  {isShoulderModule ? (
                    <Link href="/lesson/deltoid">
                      <Play size={15} fill="currentColor" />
                      Open “The deltoid muscle”
                    </Link>
                  ) : (
                    <span>
                      <Lock size={14} />
                      Lessons will be added through Payload CMS
                    </span>
                  )}
                </div>
              </details>
            );
          })}
        </div>
      </section>

      <section className="course-overview-cta section-container">
        <div>
          <span className="section-kicker">
            {isAvailable ? "BEGIN THIS LEARNING PATH" : "IN DEVELOPMENT"}
          </span>
          <h2>
            {isAvailable
              ? "Start with the deltoid lesson."
              : "This course is being prepared."}
          </h2>
        </div>
        {isAvailable ? (
          <Link href={course.startHref!} className="button button--dark">
            Start course
            <ArrowRight size={17} />
          </Link>
        ) : (
          <Link href="/courses" className="button button--secondary">
            Explore available courses
          </Link>
        )}
      </section>
    </div>
  );
}
