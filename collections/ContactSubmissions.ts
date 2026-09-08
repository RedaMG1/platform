import type { CollectionConfig } from "payload"
import { isAdmin } from "./shared"

export const ContactSubmissions: CollectionConfig = {
  slug: "contact-submissions",
  admin: {
    useAsTitle: "email",
    defaultColumns: ["name", "email", "createdAt"],
  },
  access: {
    // Anyone can send a message; only admins can read/manage the inbox.
    create: () => true,
    read: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "email", type: "email", required: true },
    { name: "message", type: "textarea", required: true },
  ],
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation !== "create") return

        await req.payload.sendEmail({
          to: "mreda.elalaoui1@gmail.com",
          subject: `New contact message from ${doc.name}`,
          html: `
            <div style="font-family: sans-serif; max-width: 480px;">
              <p><strong>${doc.name}</strong> (${doc.email}) sent a message via the Forma contact form:</p>
              <p style="white-space: pre-wrap; background: #f5f3ef; padding: 14px; border-radius: 8px;">${doc.message}</p>
            </div>
          `,
        })
      },
    ],
  },
}
