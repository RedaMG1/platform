import type { Metadata } from "next";
import { ForgotPasswordForm } from "@/components/forgot-password-form";

export const metadata: Metadata = {
  title: "Forgot password",
  description: "Reset your Forma account password.",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
