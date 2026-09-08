"use client";

import { useRouter } from "next/navigation";
import { Lock, ShieldAlert, ShieldCheck, User } from "lucide-react";
import { useState, type FormEvent } from "react";
import { changePassword, updateName } from "@/app/(frontend)/account/actions";

type AccountSettingsFormProps = {
  user: { name: string; email: string };
};

export function AccountSettingsForm({ user }: AccountSettingsFormProps) {
  const router = useRouter();

  const [name, setName] = useState(user.name);
  const [isSavingName, setIsSavingName] = useState(false);
  const [nameStatus, setNameStatus] = useState<"idle" | "success" | "error">("idle");

  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  async function handleNameSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSavingName(true);
    setNameStatus("idle");

    const result = await updateName(name);
    setNameStatus(result.success ? "success" : "error");
    setIsSavingName(false);
    if (result.success) router.refresh();
  }

  async function handlePasswordSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(false);

    const formData = new FormData(event.currentTarget);
    const currentPassword = String(formData.get("currentPassword"));
    const newPassword = String(formData.get("newPassword"));
    const confirmPassword = String(formData.get("confirmPassword"));

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords don't match.");
      return;
    }

    setIsSavingPassword(true);
    const result = await changePassword(currentPassword, newPassword);
    setIsSavingPassword(false);

    if (result.success) {
      setPasswordSuccess(true);
      event.currentTarget.reset();
    } else {
      setPasswordError(result.error);
    }
  }

  return (
    <div className="account-page section-container">
      <span className="section-kicker">YOUR ACCOUNT</span>
      <h1>Account settings</h1>
      <p>Update your profile details or change your password.</p>

      <div className="account-card">
        <h2>Profile</h2>
        <p className="account-card__subtitle">This is how you appear across Forma.</p>

        <form className="auth-form" onSubmit={handleNameSubmit}>
          <label className="auth-field">
            <span>Full name</span>
            <span className="auth-field__input">
              <User size={17} />
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Jordan Ade"
              />
            </span>
          </label>

          <label className="auth-field">
            <span>Email address</span>
            <span className="auth-field__input">
              <input type="email" value={user.email} disabled />
            </span>
          </label>

          <button type="submit" className="button auth-submit" disabled={isSavingName}>
            {isSavingName ? "Saving..." : "Save profile"}
          </button>
        </form>

        {nameStatus === "success" && (
          <div className="auth-notice">
            <ShieldCheck size={18} />
            <div>
              <strong>Saved</strong>
              <p>Your name has been updated.</p>
            </div>
          </div>
        )}

        {nameStatus === "error" && (
          <div className="auth-notice auth-notice--error">
            <ShieldAlert size={18} />
            <div>
              <strong>Couldn&apos;t save</strong>
              <p>Something went wrong. Try again.</p>
            </div>
          </div>
        )}
      </div>

      <div className="account-card">
        <h2>Password</h2>
        <p className="account-card__subtitle">
          You&apos;ll need your current password to set a new one.
        </p>

        <form className="auth-form" onSubmit={handlePasswordSubmit}>
          <label className="auth-field">
            <span>Current password</span>
            <span className="auth-field__input">
              <Lock size={17} />
              <input type="password" name="currentPassword" placeholder="********" required />
            </span>
          </label>

          <label className="auth-field">
            <span>New password</span>
            <span className="auth-field__input">
              <Lock size={17} />
              <input
                type="password"
                name="newPassword"
                placeholder="********"
                minLength={8}
                required
              />
            </span>
          </label>

          <label className="auth-field">
            <span>Confirm new password</span>
            <span className="auth-field__input">
              <Lock size={17} />
              <input
                type="password"
                name="confirmPassword"
                placeholder="********"
                minLength={8}
                required
              />
            </span>
          </label>

          <button type="submit" className="button auth-submit" disabled={isSavingPassword}>
            {isSavingPassword ? "Updating..." : "Update password"}
          </button>
        </form>

        {passwordSuccess && (
          <div className="auth-notice">
            <ShieldCheck size={18} />
            <div>
              <strong>Password updated</strong>
              <p>Use your new password next time you log in.</p>
            </div>
          </div>
        )}

        {passwordError && (
          <div className="auth-notice auth-notice--error">
            <ShieldAlert size={18} />
            <div>
              <strong>Couldn&apos;t update password</strong>
              <p>{passwordError}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
