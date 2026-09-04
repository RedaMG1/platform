# Forma homepage + working courses + lesson workspace

This package contains:

- The approved Forma homepage
- A searchable and filterable `/courses` page
- Dynamic course overview pages at `/courses/[slug]`
- The responsive deltoid lesson at `/lesson/deltoid`
- Working navigation between all three levels

Copy the `app` and `components` folders into the root of your existing
`platform` project. Allow Windows to merge the folders and replace the existing
files when prompted.

Replace:

- `app/layout.tsx`
- `app/page.tsx`
- `app/globals.css`
- `components/site-header.tsx`
- `components/lesson-workspace.tsx`

Add:

- `components/logo.tsx`
- `components/site-footer.tsx`
- `components/courses-catalog.tsx`
- `components/course-overview.tsx`
- `data/courses.ts`
- `app/courses/page.tsx`
- `app/courses/[slug]/page.tsx`
- `app/lesson/deltoid/page.tsx`

The project already has the only additional dependency required:

```powershell
npm install lucide-react
```

Then run:

```powershell
npm run dev
```

Open:

```text
http://localhost:3000/courses
http://localhost:3000/courses/upper-limb-anatomy
http://localhost:3000/lesson/deltoid
```

The homepage body-region cards now open `/courses` with the selected region
filter. Every course card opens a working overview. Upper Limb Anatomy is the
first available course and its start buttons open the deltoid lesson. Other
courses are honestly labelled `Coming soon`.

All content still uses frontend mock data. Payload CMS and PostgreSQL will be
connected later.
