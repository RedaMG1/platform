"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, Lock, Mail, ShieldAlert, ShieldCheck, User } from "lucide-react";
import { useState, type FormEvent } from "react";

type AuthFormProps = {
  mode: "login" | "register";
};

const benefits = [
  "Structured anatomy courses built around active recall",
  "Track progress lesson by lesson, module by module",
  "Free preview lessons on every learning path",
];

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

export function AuthForm({ mode }: AuthFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isLogin = mode === "login";
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));
    const name = String(formData.get("name") ?? "");

    try {
      if (!isLogin) {
        const registerRes = await fetch("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, name }),
        });

        if (!registerRes.ok) {
          setError(extractErrorMessage(await registerRes.json()));
          setIsSubmitting(false);
          return;
        }
      }

      // Registration doesn't establish a session on its own, so both flows
      // finish with a real login call.
      const loginRes = await fetch("/api/users/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!loginRes.ok) {
        setError(extractErrorMessage(await loginRes.json()));
        setIsSubmitting(false);
        return;
      }

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
        <span className="section-kicker">
          {isLogin ? "WELCOME BACK" : "GET STARTED"}
        </span>
        <h1>{isLogin ? "Log in to Forma" : "Create your account"}</h1>
        <p className="auth-card__subtitle">
          {isLogin
            ? "Continue your anatomy learning path."
            : "Start with free lessons, upgrade any time."}
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <label className="auth-field">
              <span>Full name</span>
              <span className="auth-field__input">
                <User size={17} />
                <input type="text" name="name" placeholder="Jordan Ade" required />
              </span>
            </label>
          )}

          <label className="auth-field">
            <span>Email address</span>
            <span className="auth-field__input">
              <Mail size={17} />
              <input type="email" name="email" placeholder="you@email.com" required />
            </span>
          </label>

          <label className="auth-field">
            <span>Password</span>
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

          <button type="submit" className="button auth-submit" disabled={isSubmitting}>
            {isSubmitting ? "Please wait..." : isLogin ? "Log in" : "Create account"}
            <ArrowRight size={17} />
          </button>
        </form>

        {error && (
          <div className="auth-notice auth-notice--error">
            <ShieldAlert size={18} />
            <div>
              <strong>{isLogin ? "Couldn't log in" : "Couldn't create account"}</strong>
              <p>{error}</p>
            </div>
          </div>
        )}

        <p className="auth-switch">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <Link href={isLogin ? "/register" : "/login"}>
            {isLogin ? "Sign up" : "Log in"}
          </Link>
        </p>
      </div>
    </div>
  );
}
