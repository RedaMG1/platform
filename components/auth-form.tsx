"use client";

import Link from "next/link";
import { ArrowRight, Check, Lock, Mail, ShieldCheck, User } from "lucide-react";
import { useState, type FormEvent } from "react";

type AuthFormProps = {
  mode: "login" | "register";
};

const benefits = [
  "Structured anatomy courses built around active recall",
  "Track progress lesson by lesson, module by module",
  "Free preview lessons on every learning path",
];

export function AuthForm({ mode }: AuthFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const isLogin = mode === "login";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
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

        {submitted ? (
          <div className="auth-notice">
            <ShieldCheck size={18} />
            <div>
              <strong>Accounts aren&apos;t live yet</strong>
              <p>
                This is a UI preview, sign-in and billing will be connected
                once the backend is in place.
              </p>
            </div>
          </div>
        ) : (
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

            <button type="submit" className="button auth-submit">
              {isLogin ? "Log in" : "Create account"}
              <ArrowRight size={17} />
            </button>
          </form>
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
