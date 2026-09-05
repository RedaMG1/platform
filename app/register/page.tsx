import type { Metadata } from "next";
import { AuthForm } from "@/components/auth-form";

export const metadata: Metadata = {
  title: "Sign up",
  description: "Create a free Forma account and start learning anatomy.",
};

export default function RegisterPage() {
  return <AuthForm mode="register" />;
}
