import type { Metadata } from "next";
import { LessonWorkspace } from "@/components/lesson-workspace";

export const metadata: Metadata = {
  title: "The deltoid muscle",
  description:
    "Learn the attachments, innervation and actions of the deltoid muscle.",
};

export default function DeltoidLessonPage() {
  return <LessonWorkspace />;
}
