import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Brain,
  Check,
  CirclePlay,
  Flame,
  LayoutDashboard,
  Map,
  Play,
  Sparkles,
  Trophy,
} from "lucide-react";
import type { ReactNode } from "react";

const regions = [
  {
    number: "01",
    title: "Head & neck",
    slug: "head-neck",
    description: "Skull, cranial nerves and cervical structures",
    tone: "violet",
  },
  {
    number: "02",
    title: "Upper limb",
    slug: "upper-limb",
    description: "Shoulder, arm, forearm and hand",
    tone: "coral",
  },
  {
    number: "03",
    title: "Thorax",
    slug: "thorax",
    description: "Heart, lungs, chest wall and mediastinum",
    tone: "blue",
  },
  {
    number: "04",
    title: "Lower limb",
    slug: "lower-limb",
    description: "Hip, thigh, leg, ankle and foot",
    tone: "amber",
  },
];

const learningSteps: {
  number: string;
  title: string;
  description: string;
  icon: ReactNode;
}[] = [
  {
    number: "01",
    title: "Understand",
    description: "Concise, structured lessons explain the essential anatomy.",
    icon: <BookOpen />,
  },
  {
    number: "02",
    title: "Test yourself",
    description: "Questions turn passive reading into active recall.",
    icon: <Brain />,
  },
  {
    number: "03",
    title: "Remember",
    description: "Progress and review queues help your knowledge stick.",
    icon: <Flame />,
  },
];

export default function HomePage() {
  return (
    <>
      <section className="hero section-container">
        <div className="hero__content">
          <span className="eyebrow">
            <Sparkles size={15} />
            Anatomy, made understandable
          </span>

          <h1>
            Learn the human body <em>with clarity.</em>
          </h1>

          <p>
            Short lessons, visual explanations, smart quizzes and an anatomy
            atlas—built into one calm learning flow.
          </p>

          <div className="hero__actions">
            <Link href="/courses" className="button">
              Explore courses
              <ArrowRight size={18} />
            </Link>
            <Link href="/lesson/deltoid" className="button button--secondary">
              <Play size={17} fill="currentColor" />
              Preview a lesson
            </Link>
          </div>

          <div className="hero__benefits">
            <span>
              <Check size={15} />
              Start for free
            </span>
            <span>
              <Check size={15} />
              Learn at your pace
            </span>
            <span>
              <Check size={15} />
              Track your progress
            </span>
          </div>
        </div>

        <DashboardPreview />
      </section>

      <section className="audience-strip" aria-label="Intended audience">
        <span>BUILT FOR</span>
        <strong>Medical students</strong>
        <i />
        <strong>Physiotherapy students</strong>
        <i />
        <strong>Health professionals</strong>
      </section>

      <section id="regions" className="regions section-container">
        <div className="section-heading">
          <div>
            <span className="section-kicker">START EXPLORING</span>
            <h2>Choose a body region</h2>
          </div>
          <Link href="/courses" className="text-link">
            View all courses
            <ArrowRight size={17} />
          </Link>
        </div>

        <div className="region-grid">
          {regions.map((region) => (
            <Link
              href={`/courses?region=${region.slug}`}
              className={`region-card region-card--${region.tone}`}
              key={region.title}
            >
              <span className="region-card__number">{region.number}</span>
              <div className="region-card__graphic" aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
              <h3>{region.title}</h3>
              <p>{region.description}</p>
              <span className="region-card__arrow">
                <ArrowRight size={18} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="learning-loop section-container">
        <div className="learning-loop__intro">
          <span className="section-kicker section-kicker--light">
            A BETTER STUDY LOOP
          </span>
          <h2>
            Learn. Test.
            <br />
            Remember.
          </h2>
          <p>
            Each topic connects explanation, active recall and review—so you
            spend less time deciding what to study next.
          </p>
          <Link href="/lesson/deltoid" className="button button--light">
            See how a lesson works
            <ArrowRight size={17} />
          </Link>
        </div>

        <div className="learning-steps">
          {learningSteps.map((step) => (
            <article className="learning-step" key={step.number}>
              <div className="learning-step__icon">{step.icon}</div>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-cta section-container">
        <div>
          <span className="section-kicker">YOUR NEXT LESSON IS READY</span>
          <h2>Start building anatomy confidence today.</h2>
        </div>
        <Link href="/courses" className="button button--dark">
          Browse free lessons
          <ArrowRight size={18} />
        </Link>
      </section>
    </>
  );
}

function DashboardPreview() {
  return (
    <div className="dashboard-preview" aria-label="Learning dashboard preview">
      <div className="dashboard-preview__window">
        <i />
        <i />
        <i />
        <span>forma.study / dashboard</span>
      </div>

      <div className="dashboard-preview__app">
        <aside aria-hidden="true">
          <strong>F</strong>
          <LayoutDashboard size={18} />
          <BookOpen size={18} />
          <Map size={18} />
        </aside>

        <div className="dashboard-preview__content">
          <span>Good morning, Alex</span>
          <h2>Continue learning</h2>

          <article className="continue-card">
            <div className="course-cover">
              <span>
                UPPER
                <br />
                LIMB
              </span>
              <div className="abstract-rings" aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
            </div>

            <div className="continue-card__content">
              <span>LESSON 7 OF 28</span>
              <h3>The deltoid muscle</h3>
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
              <span className="continue-card__action">
                <CirclePlay size={16} />
                Continue lesson
              </span>
            </div>
          </article>

          <div className="dashboard-preview__stats">
            <div>
              <strong>12</strong>
              <span>Lessons complete</span>
            </div>
            <div>
              <strong>86%</strong>
              <span>Quiz accuracy</span>
            </div>
            <div>
              <strong>5</strong>
              <span>Day streak</span>
            </div>
          </div>
        </div>
      </div>

      <div className="achievement-card">
        <Trophy size={19} />
        <span>
          <strong>Week complete</strong>
          <small>+120 learning points</small>
        </span>
      </div>
    </div>
  );
}
