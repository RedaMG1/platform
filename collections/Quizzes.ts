import type { CollectionConfig } from "payload"
import { publicReadAdminWrite } from "./shared"

export const Quizzes: CollectionConfig = {
  slug: "quizzes",
  admin: {
    useAsTitle: "title",
  },
  access: publicReadAdminWrite,
  fields: [
    { name: "title", type: "text", required: true, localized: true },
    { name: "lesson", type: "relationship", relationTo: "lessons", required: true, index: true },
    {
      name: "questions",
      type: "array",
      minRows: 1,
      fields: [
        { name: "question", type: "text", required: true, localized: true },
        {
          name: "options",
          type: "array",
          minRows: 2,
          fields: [{ name: "text", type: "text", required: true, localized: true }],
        },
        { name: "correctOptionIndex", type: "number", required: true, min: 0 },
        { name: "explanation", type: "textarea", localized: true },
      ],
    },
  ],
}
