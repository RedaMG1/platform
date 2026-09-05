import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CirclePlay,
  Flame,
  Map,
  Target,
} from "lucide-react";
import { courses } from "@/data/courses";
import { CourseCard } from "@/components/courses-catalog";

export function DashboardOverview() {
  const activeCourse = courses.find((course) => course.status === "available");
  const otherCourses = courses.filter(
    (course) => course.slug !== activeCourse?.slug
  );

  return (
    <div className="dashboard-page section-container">
      <header className="dashboard-header">
        <div>
          <span className="section-kicker">GOOD TO SEE YOU</span>
          <h1>Continue learning</h1>
          <p>Pick up where you left off, or explore a new region.</p>
        </div>
        <Link href="/courses" className="button button--secondary">
          Browse all courses
          <ArrowRight size={17} />
        </Link>
      </header>

      <div className="dashboard-stats">
        <article>
          <span className="dashboard-stats__icon">
            <BookOpen size={18} />
          </span>
          <strong>12</strong>
          <span>Lessons complete</span>
        </article>
        <article>
          <span className="dashboard-stats__icon">
            <Target size={18} />
          </span>
          <strong>86%</strong>
          <span>Quiz accuracy</span>
        </article>
        <article>
          <span className="dashboard-stats__icon">
            <Flame size={18} />
          </span>
          <strong>5</strong>
          <span>Day streak</span>
        </article>
      </div>

      {activeCourse && (
        <section className="dashboard-continue">
          <div className="dashboard-continue__cover">
            <span>{activeCourse.regionLabel}</span>
          </div>
          <div className="dashboard-continue__body">
            <span className="section-kicker">
              LESSON 7 OF {activeCourse.lessonCount}
            </span>
            <h2>The deltoid muscle</h2>
            <p>Attachments, innervation and function</p>
            <div
              className="progress-bar"
              role="progressbar"
              aria-label="Course progress"
              aria-valuenow={68}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <i style={{ width: "68%" }} />
            </div>
            <Link href="/lesson/deltoid" className="button">
              <CirclePlay size={17} />
              Continue lesson
            </Link>
          </div>
        </section>
      )}

      <section className="dashboard-explore">
        <div className="section-heading">
          <div>
            <span className="section-kicker">KEEP GOING</span>
            <h2>More learning paths</h2>
          </div>
          <Link href="/atlas" className="text-link">
            Browse the atlas
            <Map size={16} />
          </Link>
        </div>
        <div className="courses-grid">
          {otherCourses.slice(0, 3).map((course) => (
            <CourseCard course={course} key={course.slug} />
          ))}
        </div>
      </section>
    </div>
  );
}
