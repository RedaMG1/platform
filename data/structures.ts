export type StructureType = "Muscle" | "Bone" | "Nerve" | "Joint" | "Organ";
export type StructureAccent =
  | "violet"
  | "coral"
  | "blue"
  | "amber"
  | "teal"
  | "rose";

export type Structure = {
  slug: string;
  name: string;
  type: StructureType;
  region: string;
  regionLabel: string;
  accent: StructureAccent;
  summary: string;
  lessonHref?: string;
};

export const structures: Structure[] = [
  {
    slug: "deltoid",
    name: "Deltoid muscle",
    type: "Muscle",
    region: "upper-limb",
    regionLabel: "Upper limb",
    accent: "violet",
    summary: "Triangular shoulder muscle responsible for arm abduction.",
    lessonHref: "/lesson/deltoid",
  },
  {
    slug: "clavicle",
    name: "Clavicle",
    type: "Bone",
    region: "upper-limb",
    regionLabel: "Upper limb",
    accent: "blue",
    summary: "S-shaped bone connecting the sternum to the scapula.",
  },
  {
    slug: "scapula",
    name: "Scapula",
    type: "Bone",
    region: "upper-limb",
    regionLabel: "Upper limb",
    accent: "blue",
    summary: "Flat triangular bone forming the back of the shoulder girdle.",
  },
  {
    slug: "humerus",
    name: "Humerus",
    type: "Bone",
    region: "upper-limb",
    regionLabel: "Upper limb",
    accent: "blue",
    summary: "The long bone of the upper arm.",
  },
  {
    slug: "axillary-nerve",
    name: "Axillary nerve",
    type: "Nerve",
    region: "upper-limb",
    regionLabel: "Upper limb",
    accent: "amber",
    summary:
      "Supplies the deltoid and teres minor; wraps around the surgical neck of the humerus.",
  },
  {
    slug: "rotator-cuff",
    name: "Rotator cuff",
    type: "Muscle",
    region: "upper-limb",
    regionLabel: "Upper limb",
    accent: "violet",
    summary: "Four muscles stabilising the glenohumeral joint.",
  },
  {
    slug: "heart",
    name: "Heart",
    type: "Organ",
    region: "thorax",
    regionLabel: "Thorax",
    accent: "coral",
    summary: "Four-chambered muscular pump driving the circulatory system.",
  },
  {
    slug: "sternum",
    name: "Sternum",
    type: "Bone",
    region: "thorax",
    regionLabel: "Thorax",
    accent: "blue",
    summary: "Flat bone at the centre of the thoracic wall.",
  },
  {
    slug: "cranial-nerves",
    name: "Cranial nerves",
    type: "Nerve",
    region: "head-neck",
    regionLabel: "Head & neck",
    accent: "amber",
    summary: "Twelve paired nerves emerging directly from the brain.",
  },
  {
    slug: "femur",
    name: "Femur",
    type: "Bone",
    region: "lower-limb",
    regionLabel: "Lower limb",
    accent: "blue",
    summary: "The longest and strongest bone in the body.",
  },
  {
    slug: "sciatic-nerve",
    name: "Sciatic nerve",
    type: "Nerve",
    region: "lower-limb",
    regionLabel: "Lower limb",
    accent: "amber",
    summary: "The largest nerve in the body, supplying most of the lower limb.",
  },
  {
    slug: "knee-joint",
    name: "Knee joint",
    type: "Joint",
    region: "lower-limb",
    regionLabel: "Lower limb",
    accent: "rose",
    summary: "A hinge-type synovial joint between the femur, tibia and patella.",
  },
];

export function getStructureTypes(): StructureType[] {
  return Array.from(new Set(structures.map((item) => item.type)));
}
