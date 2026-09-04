"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Bookmark,
  BookOpen,
  Brain,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Circle,
  Clock3,
  FileText,
  Lightbulb,
  Lock,
  Menu,
  Pause,
  Play,
  RotateCcw,
  X,
} from "lucide-react";
import { useState } from "react";

type LessonTab = "lesson" | "key-points" | "structures" | "resources";

const tabs: { id: LessonTab; label: string }[] = [
  { id: "lesson", label: "Lesson" },
  { id: "key-points", label: "Key points" },
  { id: "structures", label: "Structures" },
  { id: "resources", label: "Resources" },
];

const curriculum = [
  { number: 1, title: "Shoulder overview", state: "complete" },
  { number: 2, title: "Bones and landmarks", state: "complete" },
  { number: 3, title: "The deltoid muscle", state: "current" },
  { number: 4, title: "Rotator cuff", state: "locked" },
  { number: 5, title: "Axillary nerve", state: "locked" },
  { number: 6, title: "Shoulder quiz", state: "quiz" },
] as const;

const keyPoints = [
  "The deltoid has anterior, middle and posterior parts.",
  "It originates from the clavicle, acromion and spine of the scapula.",
  "All three parts insert on the deltoid tuberosity of the humerus.",
  "The axillary nerve supplies the deltoid.",
  "Its primary role is arm abduction, with each part adding a different movement.",
];

const structures = [
  { name: "Deltoid muscle", type: "Muscle", accent: "violet" },
  { name: "Clavicle", type: "Bone", accent: "blue" },
  { name: "Scapula", type: "Bone", accent: "blue" },
  { name: "Humerus", type: "Bone", accent: "blue" },
  { name: "Axillary nerve", type: "Nerve", accent: "amber" },
];

export function LessonWorkspace() {
  const [activeTab, setActiveTab] = useState<LessonTab>("lesson");
  const [isSaved, setIsSaved] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const completedLessons = isComplete ? 3 : 2;

  return (
    <div className="lesson-page">
      <button
        type="button"
        className="lesson-mobile-trigger"
        onClick={() => setIsSidebarOpen(true)}
        aria-controls="lesson-curriculum"
        aria-expanded={isSidebarOpen}
      >
        <Menu size={18} />
        Course contents
      </button>

      <button
        type="button"
        className={`lesson-sidebar-backdrop ${isSidebarOpen ? "is-visible" : ""}`}
        onClick={() => setIsSidebarOpen(false)}
        aria-label="Close course contents"
      />

      <aside
        id="lesson-curriculum"
        className={`lesson-sidebar ${isSidebarOpen ? "is-open" : ""}`}
      >
        <div className="lesson-sidebar__top">
          <Link
            href="/courses/upper-limb-anatomy"
            className="lesson-course-back"
          >
            <ArrowLeft size={16} />
            Upper limb anatomy
          </Link>
          <button
            type="button"
            className="lesson-sidebar__close"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close course contents"
          >
            <X size={20} />
          </button>
        </div>

        <span className="lesson-sidebar__module">Module 2 · Shoulder</span>

        <nav className="lesson-curriculum" aria-label="Course lessons">
          {curriculum.map((item) => {
            const currentIsComplete =
              item.state === "current" && isComplete;

            return (
              <button
                type="button"
                className={`lesson-curriculum__item is-${item.state} ${
                  currentIsComplete ? "is-marked-complete" : ""
                }`}
                key={item.number}
                disabled={item.state === "locked" || item.state === "quiz"}
                aria-current={item.state === "current" ? "page" : undefined}
              >
                <span className="lesson-curriculum__status" aria-hidden="true">
                  {item.state === "complete" || currentIsComplete ? (
                    <CheckCircle2 size={19} />
                  ) : item.state === "locked" ? (
                    <Lock size={18} />
                  ) : item.state === "quiz" ? (
                    <Brain size={19} />
                  ) : (
                    <Circle size={19} />
                  )}
                </span>
                <span>
                  <small>{item.number}</small>
                  <strong>{item.title}</strong>
                </span>
              </button>
            );
          })}
        </nav>

        <div className="lesson-progress">
          <div>
            <span>Module progress</span>
            <strong>{completedLessons}/6</strong>
          </div>
          <div
            className="lesson-progress__track"
            role="progressbar"
            aria-label="Module progress"
            aria-valuemin={0}
            aria-valuemax={6}
            aria-valuenow={completedLessons}
          >
            <i style={{ width: `${(completedLessons / 6) * 100}%` }} />
          </div>
        </div>
      </aside>

      <div className="lesson-main">
        <div className="lesson-main__inner">
          <div className="lesson-breadcrumbs" aria-label="Breadcrumb">
            <Link href="/courses/upper-limb-anatomy">Upper limb</Link>
            <ChevronRight size={13} />
            <span>Shoulder</span>
            <ChevronRight size={13} />
            <span>Lesson 3</span>
          </div>

          <header className="lesson-heading">
            <div>
              <span className="lesson-heading__eyebrow">Muscular system</span>
              <h1>The deltoid muscle</h1>
              <p>
                Learn its attachments, innervation and role in shoulder
                movement.
              </p>
            </div>

            <button
              type="button"
              className={`lesson-save ${isSaved ? "is-saved" : ""}`}
              onClick={() => setIsSaved((value) => !value)}
              aria-pressed={isSaved}
            >
              {isSaved ? <Check size={17} /> : <Bookmark size={17} />}
              {isSaved ? "Saved" : "Save"}
            </button>
          </header>

          <div className="lesson-tabs" role="tablist" aria-label="Lesson content">
            {tabs.map((tab) => (
              <button
                type="button"
                role="tab"
                key={tab.id}
                className={activeTab === tab.id ? "is-active" : ""}
                aria-selected={activeTab === tab.id}
                aria-controls={`lesson-panel-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <section
            id={`lesson-panel-${activeTab}`}
            className="lesson-panel"
            role="tabpanel"
          >
            {activeTab === "lesson" && (
              <LessonContent
                isPlaying={isPlaying}
                onTogglePlay={() => setIsPlaying((value) => !value)}
              />
            )}

            {activeTab === "key-points" && <KeyPoints />}
            {activeTab === "structures" && <Structures />}
            {activeTab === "resources" && <Resources />}
          </section>

          <nav className="lesson-navigation" aria-label="Lesson navigation">
            <button type="button" className="lesson-navigation__previous">
              <ChevronLeft size={17} />
              <span>
                <small>Previous</small>
                Bones and landmarks
              </span>
            </button>

            <button
              type="button"
              className={`lesson-complete ${isComplete ? "is-complete" : ""}`}
              onClick={() => setIsComplete((value) => !value)}
              aria-pressed={isComplete}
            >
              {isComplete ? <RotateCcw size={17} /> : <Check size={17} />}
              {isComplete ? "Mark as incomplete" : "Complete lesson"}
            </button>

            <button
              type="button"
              className="lesson-navigation__next"
              disabled={!isComplete}
              title={isComplete ? undefined : "Complete this lesson to continue"}
            >
              <span>
                <small>Next lesson</small>
                Rotator cuff
              </span>
              {isComplete ? <ChevronRight size={17} /> : <Lock size={15} />}
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}

function LessonContent({
  isPlaying,
  onTogglePlay,
}: {
  isPlaying: boolean;
  onTogglePlay: () => void;
}) {
  return (
    <div className="lesson-content">
      <button
        type="button"
        className={`lesson-video ${isPlaying ? "is-playing" : ""}`}
        onClick={onTogglePlay}
        aria-label={isPlaying ? "Pause lesson preview" : "Play lesson preview"}
      >
        <span className="lesson-video__grid" aria-hidden="true" />
        <span className="lesson-video__label">
          <BookOpen size={15} />
          Video lesson
        </span>
        <strong>The deltoid muscle</strong>
        <span className="lesson-video__subtitle">
          Attachments · Innervation · Function
        </span>
        <span className="lesson-video__play">
          {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
        </span>
        <span className="lesson-video__duration">
          {isPlaying ? "Preview playing" : "06:42"}
        </span>
        <span className="lesson-video__timeline" aria-hidden="true">
          <i />
        </span>
      </button>

      <div className="lesson-article">
        <p className="lesson-article__lead">
          The deltoid is the large, triangular muscle that forms the rounded
          contour of the shoulder. Its three parts work together to move and
          stabilise the arm.
        </p>

        <h2>Overview</h2>
        <p>
          Although it appears to be one muscle, the deltoid is organised into
          anterior, middle and posterior fibres. Each part has a different line
          of pull, which explains why the muscle can produce several shoulder
          movements.
        </p>

        <div className="lesson-facts">
          <article>
            <span>Origin</span>
            <strong>Lateral clavicle, acromion and scapular spine</strong>
          </article>
          <article>
            <span>Insertion</span>
            <strong>Deltoid tuberosity of the humerus</strong>
          </article>
          <article>
            <span>Innervation</span>
            <strong>Axillary nerve · C5–C6</strong>
          </article>
          <article>
            <span>Main action</span>
            <strong>Abduction of the arm</strong>
          </article>
        </div>

        <div className="lesson-note">
          <Lightbulb size={21} />
          <div>
            <strong>Clinical connection</strong>
            <p>
              Axillary nerve injury can weaken arm abduction and reduce
              sensation over the lateral shoulder.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function KeyPoints() {
  return (
    <div className="lesson-section-card">
      <span className="lesson-section-card__icon">
        <Lightbulb size={22} />
      </span>
      <div>
        <span className="lesson-heading__eyebrow">Quick review</span>
        <h2>Key points to remember</h2>
        <ul className="lesson-key-points">
          {keyPoints.map((point) => (
            <li key={point}>
              <Check size={16} />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Structures() {
  return (
    <div className="lesson-tab-section">
      <div className="lesson-tab-section__heading">
        <span className="lesson-heading__eyebrow">Linked anatomy</span>
        <h2>Structures in this lesson</h2>
        <p>These records will later come from the anatomy database.</p>
      </div>
      <div className="lesson-structures">
        {structures.map((structure) => (
          <article
            className={`lesson-structure lesson-structure--${structure.accent}`}
            key={structure.name}
          >
            <span>{structure.type.slice(0, 1)}</span>
            <div>
              <small>{structure.type}</small>
              <strong>{structure.name}</strong>
            </div>
            <ChevronRight size={17} />
          </article>
        ))}
      </div>
    </div>
  );
}

function Resources() {
  return (
    <div className="lesson-tab-section">
      <div className="lesson-tab-section__heading">
        <span className="lesson-heading__eyebrow">Study materials</span>
        <h2>Lesson resources</h2>
        <p>Resources are UI placeholders until Payload and subscriptions are connected.</p>
      </div>
      <div className="lesson-resources">
        <article>
          <span><FileText size={21} /></span>
          <div>
            <small>Premium PDF</small>
            <strong>Deltoid study sheet</strong>
          </div>
          <Lock size={16} />
        </article>
        <article>
          <span><Clock3 size={21} /></span>
          <div>
            <small>5 questions</small>
            <strong>Quick knowledge check</strong>
          </div>
          <Lock size={16} />
        </article>
        <article>
          <span><Brain size={21} /></span>
          <div>
            <small>Atlas collection</small>
            <strong>Shoulder structures</strong>
          </div>
          <ChevronRight size={17} />
        </article>
      </div>
    </div>
  );
}
