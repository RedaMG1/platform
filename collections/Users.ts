import type { CollectionConfig } from "payload"
import { isAdmin } from "./shared"

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
  },
  auth: {
    // Without this, Payload's default reset link points at /admin/reset/:token —
    // the internal CMS page, not a page a public student should ever see.
    forgotPassword: {
      generateEmailSubject: () => "Reset your Forma password",
      generateEmailHTML: ({ token }) => {
        const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000"
        const resetURL = `${serverURL}/reset-password?token=${token}`

        return `
          <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
            <h2 style="color: #17213b;">Reset your password</h2>
            <p>Someone requested a password reset for your Forma account. If this was you, click below to choose a new password:</p>
            <p><a href="${resetURL}" style="display: inline-block; background: #6548e8; color: #fff; padding: 12px 20px; border-radius: 8px; text-decoration: none;">Reset password</a></p>
            <p style="color: #6d7589; font-size: 13px;">This link expires in 1 hour. If you didn't request this, you can safely ignore this email.</p>
          </div>
        `
      },
    },
  },
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
