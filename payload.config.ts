import { postgresAdapter } from "@payloadcms/db-postgres"
import { resendAdapter } from "@payloadcms/email-resend"
import { lexicalEditor } from "@payloadcms/richtext-lexical"
import { s3Storage } from "@payloadcms/storage-s3"
import path from "path"
import { buildConfig } from "payload"
import { fileURLToPath } from "url"
import sharp from "sharp"

import { Courses } from "./collections/Courses"
import { Lessons } from "./collections/Lessons"
import { Media } from "./collections/Media"
import { Modules } from "./collections/Modules"
import { Quizzes } from "./collections/Quizzes"
import { Structures } from "./collections/Structures"
import { Users } from "./collections/Users"

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000"

export default buildConfig({
  serverURL,
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Structures, Courses, Modules, Lessons, Quizzes],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  // Resend's shared onboarding@resend.dev sender works with no domain setup —
  // switch defaultFromAddress once a production domain is verified in Resend.
  email: resendAdapter({
    apiKey: process.env.RESEND_API_KEY || "",
    defaultFromAddress: "onboarding@resend.dev",
    defaultFromName: "Forma",
    overrideRecipientAddress: "atay.mdg@gmail.com", // TEMP: proving real delivery works
  }),
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),
  // Building from France into a market where a French edition is plausible —
  // enabling this now costs one config block; adding it after content exists
  // means migrating every field.
  localization: {
    locales: ["en", "fr"],
    defaultLocale: "en",
  },
  sharp,
  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.R2_BUCKET || "",
      config: {
        endpoint: process.env.R2_ENDPOINT,
        region: "auto",
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
        },
      },
      // Local disk is used until R2_BUCKET is set — no credentials needed for local dev.
      enabled: Boolean(process.env.R2_BUCKET),
    }),
  ],
})
