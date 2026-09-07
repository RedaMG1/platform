import type { Access } from "payload"

// Payload's own default access (`Boolean(req.user)`) allows ANY logged-in user to
// write to a collection, regardless of role — it doesn't know about our `role`
// field. Everything content-related is admin-write, public-read instead.
export const isAdmin: Access = ({ req: { user } }) => user?.role === "admin"

export const publicReadAdminWrite = {
  read: () => true,
  create: isAdmin,
  update: isAdmin,
  delete: isAdmin,
}

// For collections with versions/drafts enabled: admins see everything, everyone
// else only sees published documents. Without this, an unauthenticated request
// could read draft content straight from the REST/GraphQL API.
export const publishedReadAdminWrite = {
  read: ({ req: { user } }: Parameters<Access>[0]) => {
    if (user?.role === "admin") return true
    return { _status: { equals: "published" } }
  },
  create: isAdmin,
  update: isAdmin,
  delete: isAdmin,
}

export const disciplineOptions = [
  { label: "Anatomy", value: "anatomy" },
  { label: "Biomechanics", value: "biomechanics" },
  { label: "Physiotherapy", value: "physiotherapy" },
  { label: "Sports coaching", value: "sports-coaching" },
]

export const accentOptions = ["violet", "coral", "blue", "amber", "teal", "rose"].map(
  (value) => ({ label: value, value })
)
