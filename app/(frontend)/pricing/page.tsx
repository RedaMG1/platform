import type { Metadata } from "next";
import { PricingPlans } from "@/components/pricing-plans";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple, transparent pricing for Forma, free to start, upgrade any time.",
};

export default function PricingPage() {
  return <PricingPlans />;
}
