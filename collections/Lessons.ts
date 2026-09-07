import type { CollectionConfig } from "payload"
import { publishedReadAdminWrite } from "./shared"

// Lesson URLs are nested under their course — /courses/[courseSlug]/lessons/[lessonSlug] —
// so a lesson's slug only has to be unique within its own course, not globally. Lessons only
// carry a `module` relationship, so `course` is derived from the module before validation runs
// and kept as a read-only reference for querying and for the per-course uniqueness check below.
export const Lessons: CollectionConfig = {
  slug: "lessons",
  admin: {
    useAsTitle: "title",
  },
  access: publishedReadAdminWrite,
  versions: {
    drafts: true,
  },
  hooks: {
    beforeValidate: [
      async ({ data, req }) => {
        if (!data?.module) return data

        const moduleId =
          typeof data.module === "object" ? data.module.id : data.module

        const moduleDoc = await req.payload.findByID({
          collection: "modules",
          id: moduleId,
          depth: 0,
        })

        return { ...data, course: moduleDoc?.course ?? data.course }
      },
    ],
  },
  fields: [
    { name: "title", type: "text", required: true, localized: true },
    {
      name: "slug",
      type: "text",
      required: true,
      validate: async (value, { data, req, originalDoc }) => {
        if (!value) return "Slug is required"
        if (!data?.course) return true

        const courseId =
          typeof data.course === "object" ? data.course.id : data.course

        const conditions: Record<string, unknown>[] = [
          { slug: { equals: value } },
          { course: { equals: courseId } },
        ]

        if (originalDoc?.id) {
          conditions.push({ id: { not_equals: originalDoc.id } })
        }

        const existing = await req.payload.find({
          collection: "lessons",
          where: { and: conditions },
          limit: 1,
          depth: 0,
        })

        return existing.totalDocs > 0
          ? `A lesson with slug "${value}" already exists in this course.`
          : true
      },
    },
    { name: "eyebrow", type: "text", localized: true },
    {
      name: "module",
      type: "relationship",
      relationTo: "modules",
      required: true,
      index: true,
    },
    {
      name: "course",
      type: "relationship",
      relationTo: "courses",
      index: true,
      admin: {
        readOnly: true,
        position: "sidebar",
        description: "Derived automatically from the selected module.",
      },
    },
    { name: "order", type: "number", required: true },
    { name: "summary", type: "textarea", localized: true },
    { name: "content", type: "richText", localized: true },
    {
      name: "keyPoints",
      type: "array",
      fields: [{ name: "point", type: "text", required: true, localized: true }],
    },
    { name: "structures", type: "relationship", relationTo: "structures", hasMany: true },
    {
      name: "access",
      type: "select",
      required: true,
      defaultValue: "premium",
      options: [
        { label: "Free", value: "free" },
        { label: "Premium", value: "premium" },
      ],
    },
    { name: "streamVideoId", type: "text" },
    { name: "durationSeconds", type: "number" },
  ],
}
