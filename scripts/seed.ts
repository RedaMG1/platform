import { getPayload, type Payload } from "payload"
import config from "../payload.config"
import { courses } from "../data/courses"
import { structures } from "../data/structures"

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

async function upsert(
  payload: Payload,
  collection: "courses" | "modules" | "structures",
  where: Record<string, unknown>,
  data: Record<string, unknown>
) {
  const existing = await payload.find({ collection, where, limit: 1 })

  if (existing.totalDocs > 0) {
    return payload.update({ collection, id: existing.docs[0].id, data })
  }

  return payload.create({ collection, data })
}

async function seed() {
  const payload = await getPayload({ config })

  payload.logger.info("Seeding courses, modules and structures...")

  for (const course of courses) {
    const courseDoc = await upsert(
      payload,
      "courses",
      { slug: { equals: course.slug } },
      {
        title: course.title,
        slug: course.slug,
        eyebrow: course.eyebrow,
        description: course.description,
        longDescription: course.longDescription,
        discipline: "anatomy",
        category: course.category.toLowerCase(),
        region: course.region,
        regionLabel: course.regionLabel,
        level: course.level.toLowerCase(),
        duration: course.duration,
        access:
          course.access === "Free"
            ? "free"
            : course.access === "Free preview"
              ? "free-preview"
              : "premium",
        accent: course.accent,
        _status: course.status === "available" ? "published" : "draft",
      }
    )

    let order = 0
    for (const mod of course.modules) {
      order += 1
      const moduleSlug = slugify(mod.title)

      await upsert(
        payload,
        "modules",
        {
          and: [
            { course: { equals: courseDoc.id } },
            { slug: { equals: moduleSlug } },
          ],
        },
        {
          title: mod.title,
          slug: moduleSlug,
          course: courseDoc.id,
          order,
          description: mod.description,
          freePreview: Boolean(mod.freePreview),
        }
      )
    }
  }

  for (const structure of structures) {
    await upsert(
      payload,
      "structures",
      { slug: { equals: structure.slug } },
      {
        name: structure.name,
        slug: structure.slug,
        discipline: "anatomy",
        type: structure.type.toLowerCase(),
        region: structure.region,
        accent: structure.accent,
        summary: structure.summary,
      }
    )
  }

  payload.logger.info("Seed complete.")
}

// `payload run` resolves its dynamic import as soon as this module's synchronous
// top-level code finishes, then exits the process immediately — an unawaited
// seed().catch(...) here would get killed mid-flight before doing any work.
try {
  await seed()
} catch (error) {
  console.error(error)
  process.exitCode = 1
}
