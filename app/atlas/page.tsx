import type { Metadata } from "next";
import { AtlasBrowser } from "@/components/atlas-browser";

export const metadata: Metadata = {
  title: "Atlas",
  description:
    "Search the Forma anatomy atlas for bones, muscles, nerves and joints.",
};

export default function AtlasPage() {
  return <AtlasBrowser />;
}
