import config from "@payload-config"
import { headers as getHeaders } from "next/headers"
import { getPayload } from "payload"

// Server-side only: reads the incoming request's payload-token cookie via
// Payload's Local API and resolves the logged-in user, if any. Safe to call
// from any Server Component or Route Handler.
export async function getCurrentUser() {
  const headers = await getHeaders()
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers })
  return user
}
