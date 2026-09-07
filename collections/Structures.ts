import type { CollectionConfig } from "payload"
import { accentOptions, disciplineOptions, publicReadAdminWrite } from "./shared"

export const Structures: CollectionConfig = {
  slug: "structures",
  admin: {
    useAsTitle: "name",
  },
  access: publicReadAdminWrite,
  fields: [
    { name: "name", type: "text", required: true, localized: true },
    { name: "slug", type: "text", required: true, unique: true, index: true },
    {
      name: "discipline",
      type: "select",
      required: true,
      defaultValue: "anatomy",
      options: disciplineOptions,
    },
    {
      name: "type",
      type: "select",
      required: true,
      options: [
        { label: "Muscle", value: "muscle" },
        { label: "Bone", value: "bone" },
        { label: "Nerve", value: "nerve" },
        { label: "Joint", value: "joint" },
        { label: "Organ", value: "organ" },
      ],
    },
    { name: "region", type: "text", required: true },
    { name: "accent", type: "select", options: accentOptions },
    { name: "summary", type: "textarea", localized: true },
    { name: "illustration", type: "upload", relationTo: "media" },
    { name: "lesson", type: "relationship", relationTo: "lessons" },
  ],
}
