"use client";

import Link from "next/link";
import { ArrowRight, Check, Mail, ShieldAlert, ShieldCheck } from "lucide-react";
import { useState, type FormEvent } from "react";

const benefits = [
  "Structured anatomy courses built around active recall",
  "Track progress lesson by lesson, module by module",
  "Free preview lessons on every learning path",
];

export function ForgotPasswordForm() {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const email = String(new FormData(event.currentTarget).get("email"));

    try {
      const res = await fetch("/api/users/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      // Payload always returns success here regardless of whether the email
      // exists, so a mismatched address can't be used to enumerate accounts.
      if (!res.ok) {
        throw new Error("request failed");
      }

      setIsSent(true);
    } catch {
      setError("Couldn't reach the server. Check your connection and try again.");
    } finally {
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
        <h1>Forgot your password?</h1>
        <p className="auth-card__subtitle">
          Enter the email on your account and we&apos;ll send you a link to choose a new one.
        </p>

        {isSent ? (
          <div className="auth-notice">
            <ShieldCheck size={18} />
            <div>
              <strong>Check your email</strong>
              <p>
                If an account exists for that address, a reset link is on its way. It expires
                in 1 hour.
              </p>
            </div>
          </div>
        ) : (
          <form className="auth-form" onSubmit={handleSubmit}>
            <label className="auth-field">
              <span>Email address</span>
              <span className="auth-field__input">
                <Mail size={17} />
                <input type="email" name="email" placeholder="you@email.com" required />
              </span>
            </label>

            <button type="submit" className="button auth-submit" disabled={isSubmitting}>
              {isSubmitting ? "Please wait..." : "Send reset link"}
              <ArrowRight size={17} />
            </button>
          </form>
        )}

        {error && (
          <div className="auth-notice auth-notice--error">
            <ShieldAlert size={18} />
            <div>
              <strong>Something went wrong</strong>
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
