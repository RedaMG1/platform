import type { CollectionConfig } from "payload"
import { publicReadAdminWrite } from "./shared"

export const Media: CollectionConfig = {
  slug: "media",
  access: publicReadAdminWrite,
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
  upload: {
    mimeTypes: ["image/*"],
    adminThumbnail: "thumbnail",
    imageSizes: [
      { name: "thumbnail", width: 400, height: undefined, position: "centre" },
      { name: "card", width: 800, height: undefined, position: "centre" },
      { name: "hero", width: 1600, height: undefined, position: "centre" },
    ],
  },
}
