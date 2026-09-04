import type { Metadata } from "next";
import { CoursesCatalog } from "@/components/courses-catalog";
import { normalizeRegion } from "@/data/courses";

export const metadata: Metadata = {
  title: "Courses",
  description:
    "Explore structured anatomy and movement-science courses from Forma.",
};

type CoursesPageProps = {
  searchParams: Promise<{
    region?: string | string[];
  }>;
};

export default async function CoursesPage({ searchParams }: CoursesPageProps) {
  const params = await searchParams;
  const regionValue = Array.isArray(params.region)
    ? params.region[0]
    : params.region;

  return <CoursesCatalog initialRegion={normalizeRegion(regionValue)} />;
}
