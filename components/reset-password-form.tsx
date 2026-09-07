"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, Lock, ShieldAlert, ShieldCheck } from "lucide-react";
import { useState, type FormEvent } from "react";

const benefits = [
  "Structured anatomy courses built around active recall",
  "Track progress lesson by lesson, module by module",
  "Free preview lessons on every learning path",
];

type ResetPasswordFormProps = {
  token: string | null;
};

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const password = String(formData.get("password"));
    const confirmPassword = String(formData.get("confirmPassword"));

    if (password !== confirmPassword) {
      setError("Those passwords don't match.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/users/reset-password", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        const message =
          body?.errors?.[0]?.message ??
          "That reset link is invalid or has expired. Request a new one.";
        setError(message);
        setIsSubmitting(false);
        return;
      }

      // Resetting the password logs the user in directly (same cookie as login).
      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Couldn't reach the server. Check your connection and try again.");
      setIsSubmitting(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-panel" aria-hidden="true">
        <span className="auth-panel__brand">FORMA</span>
        <h2>
          Build real anatomy
          <br />
          knowledge, one lesson
          <br />
          at a time.
        </h2>
        <ul className="auth-panel__benefits">
          {benefits.map((benefit) => (
            <li key={benefit}>
              <Check size={16} />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
        <div className="auth-panel__badge">
          <ShieldCheck size={16} />
          Your progress is always saved to your account
        </div>
      </div>

      <div className="auth-card">
        <span className="section-kicker">RESET YOUR PASSWORD</span>
        <h1>Choose a new password</h1>
        <p className="auth-card__subtitle">Make it at least 8 characters.</p>

        {!token ? (
          <div className="auth-notice auth-notice--error">
            <ShieldAlert size={18} />
            <div>
              <strong>This link is missing its token</strong>
              <p>
                Open the reset link from your email directly, or{" "}
                <Link href="/forgot-password">request a new one</Link>.
              </p>
            </div>
          </div>
        ) : (
          <form className="auth-form" onSubmit={handleSubmit}>
            <label className="auth-field">
              <span>New password</span>
              <span className="auth-field__input">
                <Lock size={17} />
                <input
                  type="password"
                  name="password"
                  placeholder="********"
                  minLength={8}
                  required
                />
              </span>
            </label>

            <label className="auth-field">
              <span>Confirm password</span>
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

            <button type="submit" className="button auth-submit" disabled={isSubmitting}>
              {isSubmitting ? "Please wait..." : "Reset password"}
              <ArrowRight size={17} />
            </button>
          </form>
        )}

        {error && (
          <div className="auth-notice auth-notice--error">
            <ShieldAlert size={18} />
            <div>
              <strong>Couldn&apos;t reset password</strong>
              <p>{error}</p>
            </div>
          </div>
        )}

        <p className="auth-switch">
          Remembered it? <Link href="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}
