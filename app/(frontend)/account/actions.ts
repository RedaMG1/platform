"use server";

import config from "@payload-config";
import { getPayload } from "payload";
import { getCurrentUser } from "@/lib/auth";

type ActionResult = { success: true } | { success: false; error: string };

export async function updateName(name: string): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Not logged in." };

  const payload = await getPayload({ config });

  try {
    await payload.update({
      collection: "users",
      id: user.id,
      data: { name },
      overrideAccess: false,
      user,
    });
    return { success: true };
  } catch {
    return { success: false, error: "Couldn't update your name." };
  }
}

export async function changePassword(
  currentPassword: string,
  newPassword: string
): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Not logged in." };

  const payload = await getPayload({ config });

  // Require proof of the current password before allowing a change — an
  // authenticated session alone (e.g. a hijacked cookie) shouldn't be enough
  // to lock the real owner out.
  try {
    await payload.login({
      collection: "users",
      data: { email: user.email, password: currentPassword },
    });
  } catch {
    return { success: false, error: "Current password is incorrect." };
  }

  try {
    await payload.update({
      collection: "users",
      id: user.id,
      data: { password: newPassword },
      overrideAccess: false,
      user,
    });
    return { success: true };
  } catch {
    return { success: false, error: "Couldn't update your password." };
  }
}
