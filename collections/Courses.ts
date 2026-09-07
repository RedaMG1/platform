import type { CollectionConfig } from "payload"
import { accentOptions, disciplineOptions, publishedReadAdminWrite } from "./shared"

export const Courses: CollectionConfig = {
  slug: "courses",
  admin: {
    useAsTitle: "title",
  },
  access: publishedReadAdminWrite,
  versions: {
    drafts: true,
  },
  fields: [
    { name: "title", type: "text", required: true, localized: true },
    { name: "slug", type: "text", required: true, unique: true, index: true },
    { name: "eyebrow", type: "text", localized: true },
    { name: "description", type: "textarea", localized: true },
    { name: "longDescription", type: "textarea", localized: true },
    {
      name: "discipline",
      type: "select",
      required: true,
      defaultValue: "anatomy",
      options: disciplineOptions,
    },
    {
      name: "category",
      type: "select",
      required: true,
      options: [
        { label: "Anatomy", value: "anatomy" },
        { label: "Foundations", value: "foundations" },
      ],
    },
    { name: "region", type: "text", required: true },
    { name: "regionLabel", type: "text", required: true, localized: true },
    {
      name: "level",
      type: "select",
      required: true,
      options: [
        { label: "Beginner", value: "beginner" },
        { label: "Intermediate", value: "intermediate" },
      ],
    },
    { name: "duration", type: "text" },
    {
      name: "access",
      type: "select",
      required: true,
      defaultValue: "premium",
      options: [
        { label: "Free", value: "free" },
        { label: "Free preview", value: "free-preview" },
        { label: "Premium", value: "premium" },
      ],
    },
    { name: "accent", type: "select", options: accentOptions },
    { name: "cover", type: "upload", relationTo: "media" },
  ],
}
