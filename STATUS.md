# Forma — build status

Last updated: 2026-09-07

## Where things stand

**Steps 1 ("get Payload running") and 3 ("real auth + email provider") are done and verified.**
Working folder: `C:\Users\elalaoui\Desktop\Atay\mdg\03\platform` (the older
`C:\Users\elalaoui\Desktop\Atay\mdg\platform`, no `\03\`, was abandoned — do not use it).

Verified live, not just "ran without erroring":
- `forma-postgres` (Postgres 16, Docker Compose, port `5433`) — up and healthy
- Next.js dev server + Payload admin at `http://localhost:3000/admin` — loads clean, no console errors
- First admin user — email `mreda.elalaoui1@gmail.com`. Password was changed during
  live testing of the reset-password flow — the old generated placeholder no longer
  works (confirmed: 401). New password is `NewAdminPassword456!` — save this somewhere
  real, or reset it to your own via `/forgot-password`.
  **Now correctly `role: admin`** (see the access-control note below for why this needed fixing).
- `payload-types.ts` generated (664 lines) from the 7 collections with no errors
- Seed script run and checked directly against Postgres (not just log output):
  6 courses, 26 modules, 12 structures
- **Real registration, login, session, and logout** — tested end-to-end through the actual
  UI (not just the API): register → auto-login → redirect to `/dashboard` → header shows
  "Log out" → logout clears the session → `/dashboard` correctly redirects logged-out
  visitors to `/login`
- **Access control locked down on all 7 collections** — see below, this was a real gap
  I found and fixed, not part of the original plan
- **Real password-reset email, tested end-to-end** — Resend wired via
  `@payloadcms/email-resend`, custom-branded reset link pointing at Forma's own
  `/reset-password` page (not Payload's internal `/admin/reset/:token`). Verified live:
  triggered a real reset, got a real email, obtained a token, submitted the new
  password through the actual page, got redirected to `/dashboard` already logged in,
  then logged out and back in with the new password to prove it actually changed —
  and confirmed the *old* password now gets rejected (401)

## Decisions locked in

- **Localization: on** — English + French (`en`/`fr`, default `en`) enabled in
  `payload.config.ts` from the start, per the architecture review's warning that
  adding it after content exists means migrating every field.
- **Lesson URLs: nested** — `/courses/[courseSlug]/lessons/[lessonSlug]`
  (e.g. `/courses/upper-limb-anatomy/lessons/deltoid`). Lesson slugs are unique
  *within their course*, not globally — enforced by a custom hook + validator in
  `collections/Lessons.ts`, not a database constraint.
- **Native Payload drafts** (`versions: { drafts: true }`) on Courses and Lessons,
  replacing the hand-rolled `status: draft|published` field from the original scaffold.

## What's built

7 collections in `collections/`: `Users`, `Media` (with `imageSizes`), `Structures`,
`Courses`, `Modules`, `Lessons` (per-course slug uniqueness logic), `Quizzes`.
Plus `payload.config.ts`, the `app/(payload)/` admin route group, `docker-compose.yml`,
`.env`/`.env.example`, and `scripts/seed.ts`.

Frontend routes were moved into `app/(frontend)/` (was flat under `app/` before) —
this was a required fix, not a style choice: one shared root layout was colliding
with Payload's own root layout on `/admin` and crashing it with nested `<html>` tags.

**Auth wiring**: `lib/auth.ts` (`getCurrentUser()` — server-side session lookup via
Payload's Local API), `components/auth-form.tsx` (real register/login calls, replacing
the old fake "accounts aren't live yet" placeholder), `components/site-header.tsx`
(shows Login/Register vs. Dashboard/Logout based on session), `app/(frontend)/dashboard/page.tsx`
(redirects to `/login` if not authenticated).

**Access control (real gap found and fixed, not part of the original plan)**: Payload's
actual default access rule is "any logged-in user, regardless of role" — not role-aware.
Every collection I'd built inherited that, unmodified, which meant a self-registered
`student` account could create/edit/delete *anything* via the API — Courses, other
Users, all of it — and could open `/admin` too, since the "create first user" screen
has no role field and silently defaults to `student`. Confirmed and reproduced this
before fixing it (see collections/shared.ts for `isAdmin`, `publicReadAdminWrite`,
`publishedReadAdminWrite`). Now: `/admin` requires `role: admin`; all content
collections are public-read / admin-write; `Courses`/`Lessons` hide drafts from
non-admins; `Users` allows public registration but forces `role: student` on anyone
who isn't already an admin, blocking self-promotion. **The original bootstrap admin
account had this exact `student`-role problem and got locked out by my own fix** —
fixed by promoting it directly in Postgres (the one legitimate reason to bypass the
API here, since no admin existed yet to authorize the change through it).

**Email adapter caveat — important**: Resend's sandbox mode (no domain verified yet)
only allows delivery to the email the Resend account itself was signed up with
(`atay.mdg@gmail.com`). `payload.config.ts` currently has
`overrideRecipientAddress: "atay.mdg@gmail.com"` set, which means **every
password-reset email — for any user — currently lands in that one inbox**, not the
real requester's. This is deliberate for continued testing, not a bug, but it means
forgot-password isn't actually usable by real users yet. Fix: verify a domain at
resend.com/domains once one is chosen, then remove `overrideRecipientAddress` and
change `defaultFromAddress` off `onboarding@resend.dev`.

## Known, deliberately deferred (not oversights)

- Resend domain not verified — see the email adapter caveat above
- No Stripe fields on Users, no `lesson_progress`, `quiz_attempts`, or `webhook_events` tables
- No paywall enforcement on lesson *content* (the `access: free|premium` field exists,
  and drafts are now hidden from non-admins, but a `premium` lesson's full body still
  ships to anyone who can read it — field-level stripping isn't built yet)
- FK `onDelete` behavior on the relationships that do exist — not yet verified
- No email verification required at registration (deliberate choice — can be added
  later as a config flip, doesn't need a migration)

These all match the architecture doc's own step ordering (they're steps 4–6), not gaps
that were missed at this step.

## Next step

**Step 2**: rewire the frontend off the static `data/courses.ts` / `data/structures.ts`
files and onto Payload's Local API. Touches `courses-catalog.tsx`, `lesson-workspace.tsx`,
`course-overview.tsx`, `atlas-browser.tsx`.

## Reference

Full architecture doc (schema, cost model, 10 review findings):
https://claude.ai/code/artifact/0325118d-5763-4801-a616-4c330bd35299

Still open: whether kspag.de infrastructure (used for other apps) is personal or an
employer's — determines whether Forma can be hosted there. Not blocking yet, only
matters at deployment.
