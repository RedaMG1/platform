import type { CollectionConfig } from "payload"
import { isAdmin } from "./shared"

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
  },
  auth: true,
  access: {
    // Only admins can open /admin — the first-user bootstrap screen doesn't ask
    // for a role, so without this any self-registered student could get in.
    admin: isAdmin,
    // Public registration is allowed; role is forced to "student" in the hook below.
    create: () => true,
    // Admins can read every account; everyone else can only read their own.
    read: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === "admin") return true
      return { id: { equals: user.id } }
    },
    // Same shape as read: admins update anyone, everyone else only themselves.
    update: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === "admin") return true
      return { id: { equals: user.id } }
    },
    delete: isAdmin,
  },
  hooks: {
    beforeChange: [
      ({ data, req }) => {
        // Prevent privilege escalation through the public create endpoint (or a
        // crafted update): only an existing admin may set role to "admin".
        if (req.user?.role !== "admin") {
          data.role = "student"
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: "name",
      type: "text",
    },
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "student",
      access: {
        update: isAdmin,
      },
      options: [
        { label: "Student", value: "student" },
        { label: "Admin", value: "admin" },
      ],
    },
  ],
}
