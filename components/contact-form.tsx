"use client";

import { ArrowRight, Mail, MessageCircle, ShieldAlert, ShieldCheck, User } from "lucide-react";
import { useState, type FormEvent } from "react";

function extractErrorMessage(payload: unknown): string {
  if (
    payload &&
    typeof payload === "object" &&
    "errors" in payload &&
    Array.isArray((payload as { errors: unknown }).errors)
  ) {
    const errors = (payload as { errors: unknown[] }).errors;
    const first = errors[0] as {
      message?: string;
      data?: { errors?: { message?: string }[] };
    };
    return first?.data?.errors?.[0]?.message ?? first?.message ?? "Something went wrong.";
  }

  return "Something went wrong.";
}

export function ContactForm() {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name"));
    const email = String(formData.get("email"));
    const message = String(formData.get("message"));

    try {
      const res = await fetch("/api/contact-submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) {
        setError(extractErrorMessage(await res.json()));
        setIsSubmitting(false);
        return;
      }

      setIsSent(true);
    } catch {
      setError("Couldn't reach the server. Check your connection and try again.");
      setIsSubmitting(false);
    }
  }

  return (
    <div className="contact-page section-container">
      <div className="contact-card">
        <span className="contact-card__icon" aria-hidden="true">
          <MessageCircle size={20} />
        </span>
        <span className="section-kicker">GET IN TOUCH</span>
        <h1>Contact us</h1>
        <p className="contact-card__subtitle">
          Questions, feedback, or something not working? Send us a message.
        </p>

        {isSent ? (
          <div className="auth-notice">
            <ShieldCheck size={18} />
            <div>
              <strong>Message sent</strong>
              <p>Thanks for reaching out — we&apos;ll get back to you soon.</p>
            </div>
          </div>
        ) : (
          <form className="auth-form" onSubmit={handleSubmit}>
            <label className="auth-field">
              <span>Full name</span>
              <span className="auth-field__input">
                <User size={17} />
                <input type="text" name="name" placeholder="Jordan Ade" required />
              </span>
            </label>

            <label className="auth-field">
              <span>Email address</span>
              <span className="auth-field__input">
                <Mail size={17} />
                <input type="email" name="email" placeholder="you@email.com" required />
              </span>
            </label>

            <label className="auth-field contact-field">
              <span>Message</span>
              <textarea
                name="message"
                placeholder="How can we help?"
                minLength={10}
                required
              />
            </label>

            <button type="submit" className="button auth-submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send message"}
              <ArrowRight size={17} />
            </button>
          </form>
        )}

        {error && (
          <div className="auth-notice auth-notice--error">
            <ShieldAlert size={18} />
            <div>
              <strong>Couldn&apos;t send message</strong>
              <p>{error}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
