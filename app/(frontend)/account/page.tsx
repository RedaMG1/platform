import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AccountSettingsForm } from "@/components/account-settings-form";
import { getCurrentUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Account settings",
  description: "Manage your Forma account.",
};

export default async function AccountPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <AccountSettingsForm
      user={{ name: user.name ?? "", email: user.email }}
    />
  );
}
