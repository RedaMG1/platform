export type CourseAccent =
  | "violet"
  | "coral"
  | "blue"
  | "amber"
  | "teal"
  | "rose";

export type CourseModule = {
  title: string;
  description: string;
  lessonCount: number;
  freePreview?: boolean;
};

export type Course = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  longDescription: string;
  category: "Anatomy" | "Foundations";
  region: string;
  regionLabel: string;
  level: "Beginner" | "Intermediate";
  duration: string;
  lessonCount: number;
  access: "Free" | "Free preview" | "Premium";
  accent: CourseAccent;
  status: "available" | "coming-soon";
  startHref?: string;
  modules: CourseModule[];
};

export const courses: Course[] = [
  {
    slug: "upper-limb-anatomy",
    title: "Upper limb anatomy",
    eyebrow: "Featured course",
    description:
      "Master the bones, joints, muscles, vessels and nerves of the upper limb.",
    longDescription:
      "Build a connected understanding of the shoulder, arm, forearm and hand through concise lessons, visual explanations and active-recall quizzes.",
    category: "Anatomy",
    region: "upper-limb",
    regionLabel: "Upper limb",
    level: "Beginner",
    duration: "6h 40m",
    lessonCount: 28,
    access: "Free preview",
    accent: "coral",
    status: "available",
    startHref: "/lesson/deltoid",
    modules: [
      {
        title: "Upper limb overview",
        description: "Regions, terminology and foundational organisation.",
        lessonCount: 4,
        freePreview: true,
      },
      {
        title: "Shoulder",
        description: "Bones, joints, deltoid, rotator cuff and axillary nerve.",
        lessonCount: 6,
        freePreview: true,
      },
      {
        title: "Arm and cubital fossa",
        description: "Compartments, muscles, vessels and nerves.",
        lessonCount: 5,
      },
      {
        title: "Forearm",
        description: "Flexor and extensor compartments and their innervation.",
        lessonCount: 7,
      },
      {
        title: "Wrist and hand",
        description: "Carpal anatomy, intrinsic muscles and neurovascular supply.",
        lessonCount: 6,
      },
    ],
  },
  {
    slug: "anatomy-fundamentals",
    title: "Anatomy fundamentals",
    eyebrow: "Start here",
    description:
      "Learn anatomical language, tissues, movement and the organisation of the body.",
    longDescription:
      "A clear introduction to the concepts used throughout every anatomy course, designed to give new learners a confident starting point.",
    category: "Foundations",
    region: "whole-body",
    regionLabel: "Whole body",
    level: "Beginner",
    duration: "3h 15m",
    lessonCount: 18,
    access: "Free",
    accent: "violet",
    status: "coming-soon",
    modules: [
      {
        title: "Anatomical language",
        description: "Positions, planes, directions and regional terminology.",
        lessonCount: 4,
        freePreview: true,
      },
      {
        title: "Tissues and structures",
        description: "How bones, muscles, nerves and vessels are organised.",
        lessonCount: 5,
      },
      {
        title: "Joints and movement",
        description: "Joint types and the language of human movement.",
        lessonCount: 5,
      },
      {
        title: "Imaging basics",
        description: "A first look at X-ray, CT and MRI orientation.",
        lessonCount: 4,
      },
    ],
  },
  {
    slug: "head-and-neck-anatomy",
    title: "Head and neck anatomy",
    eyebrow: "Regional anatomy",
    description:
      "Explore the skull, face, neck, cranial nerves and major vessels.",
    longDescription:
      "Learn the dense anatomy of the head and neck in a structured sequence that connects regions, functions and clinical relationships.",
    category: "Anatomy",
    region: "head-neck",
    regionLabel: "Head & neck",
    level: "Intermediate",
    duration: "8h 10m",
    lessonCount: 36,
    access: "Premium",
    accent: "violet",
    status: "coming-soon",
    modules: [
      {
        title: "Skull and face",
        description: "Cranial bones, facial skeleton and key landmarks.",
        lessonCount: 8,
      },
      {
        title: "Neck regions",
        description: "Fascia, triangles, muscles and cervical structures.",
        lessonCount: 7,
      },
      {
        title: "Cranial nerves",
        description: "Origins, pathways and functional components.",
        lessonCount: 10,
      },
      {
        title: "Vessels and viscera",
        description: "Blood supply, pharynx, larynx and thyroid gland.",
        lessonCount: 11,
      },
    ],
  },
  {
    slug: "thorax-anatomy",
    title: "Thorax anatomy",
    eyebrow: "Regional anatomy",
    description:
      "Understand the thoracic wall, lungs, heart and mediastinum.",
    longDescription:
      "Connect the structures of the chest with breathing, circulation and the spatial organisation of the mediastinum.",
    category: "Anatomy",
    region: "thorax",
    regionLabel: "Thorax",
    level: "Beginner",
    duration: "5h 30m",
    lessonCount: 24,
    access: "Free preview",
    accent: "blue",
    status: "coming-soon",
    modules: [
      {
        title: "Thoracic wall",
        description: "Ribs, sternum, joints and intercostal spaces.",
        lessonCount: 6,
        freePreview: true,
      },
      {
        title: "Pleura and lungs",
        description: "Lobes, surfaces, pleural cavities and airways.",
        lessonCount: 6,
      },
      {
        title: "Heart",
        description: "Chambers, valves, coronary supply and conduction.",
        lessonCount: 7,
      },
      {
        title: "Mediastinum",
        description: "Compartments, vessels, nerves and relationships.",
        lessonCount: 5,
      },
    ],
  },
  {
    slug: "lower-limb-anatomy",
    title: "Lower limb anatomy",
    eyebrow: "Regional anatomy",
    description:
      "Study the hip, thigh, leg, ankle and foot from structure to movement.",
    longDescription:
      "Follow the lower limb from pelvis to toes while connecting regional anatomy to gait, stability and common clinical problems.",
    category: "Anatomy",
    region: "lower-limb",
    regionLabel: "Lower limb",
    level: "Intermediate",
    duration: "7h 25m",
    lessonCount: 32,
    access: "Premium",
    accent: "amber",
    status: "coming-soon",
    modules: [
      {
        title: "Hip and gluteal region",
        description: "Joint anatomy, gluteal muscles and neurovascular supply.",
        lessonCount: 7,
      },
      {
        title: "Thigh",
        description: "Compartments, femoral triangle and adductor canal.",
        lessonCount: 7,
      },
      {
        title: "Knee",
        description: "Surfaces, ligaments, menisci and movement.",
        lessonCount: 6,
      },
      {
        title: "Leg",
        description: "Muscle compartments, vessels and nerves.",
        lessonCount: 6,
      },
      {
        title: "Ankle and foot",
        description: "Arches, joints, intrinsic muscles and gait mechanics.",
        lessonCount: 6,
      },
    ],
  },
  {
    slug: "musculoskeletal-foundations",
    title: "Musculoskeletal foundations",
    eyebrow: "Movement science",
    description:
      "Connect bones, joints and muscles to the principles of human movement.",
    longDescription:
      "Bridge foundational anatomy and movement science with a practical introduction to leverage, muscle roles and joint mechanics.",
    category: "Foundations",
    region: "whole-body",
    regionLabel: "Whole body",
    level: "Beginner",
    duration: "4h 45m",
    lessonCount: 20,
    access: "Premium",
    accent: "teal",
    status: "coming-soon",
    modules: [
      {
        title: "Bone and joint foundations",
        description: "Structure, loading and joint classification.",
        lessonCount: 5,
      },
      {
        title: "Muscle architecture",
        description: "Fibre arrangement, force and range of motion.",
        lessonCount: 5,
      },
      {
        title: "Movement roles",
        description: "Agonists, antagonists, synergists and stabilisers.",
        lessonCount: 5,
      },
      {
        title: "Introductory biomechanics",
        description: "Levers, moments and basic movement analysis.",
        lessonCount: 5,
      },
    ],
  },
];

export const courseRegions = [
  { value: "all", label: "All regions" },
  { value: "whole-body", label: "Whole body" },
  { value: "head-neck", label: "Head & neck" },
  { value: "upper-limb", label: "Upper limb" },
  { value: "thorax", label: "Thorax" },
  { value: "lower-limb", label: "Lower limb" },
];

export function getCourseBySlug(slug: string) {
  return courses.find((course) => course.slug === slug);
}

export function normalizeRegion(value: string | undefined) {
  if (!value) return "all";

  const normalized = value
    .trim()
    .toLowerCase()
    .replace(/&/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return courseRegions.some((region) => region.value === normalized)
    ? normalized
    : "all";
}
