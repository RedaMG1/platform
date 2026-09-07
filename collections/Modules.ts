import type { CollectionConfig } from "payload"
import { publicReadAdminWrite } from "./shared"

export const Modules: CollectionConfig = {
  slug: "modules",
  admin: {
    useAsTitle: "title",
  },
  access: publicReadAdminWrite,
  fields: [
    { name: "title", type: "text", required: true, localized: true },
    { name: "slug", type: "text", required: true },
    {
      name: "course",
      type: "relationship",
      relationTo: "courses",
      required: true,
      index: true,
    },
    { name: "order", type: "number", required: true },
    { name: "description", type: "textarea", localized: true },
    { name: "freePreview", type: "checkbox", defaultValue: false },
  ],
}
