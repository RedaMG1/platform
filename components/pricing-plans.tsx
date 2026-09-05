import Link from "next/link";
import { ArrowRight, Check, Crown, Sparkles } from "lucide-react";

type Plan = {
  name: string;
  price: string;
  period: string;
  description: string;
  cta: string;
  href: string;
  highlighted?: boolean;
  features: string[];
};

const plans: Plan[] = [
  {
    name: "Free",
    price: "€0",
    period: "forever",
    description: "Explore the platform and try the free preview lessons.",
    cta: "Start for free",
    href: "/register",
    features: [
      "Free preview lessons on every course",
      "The deltoid lesson, fully unlocked",
      "Progress tracking on free content",
      "Access to the anatomy atlas index",
    ],
  },
  {
    name: "Premium",
    price: "€9",
    period: "/ month",
    description: "Full access to every course, quiz and review tool.",
    cta: "Start Premium",
    href: "/register?plan=premium",
    highlighted: true,
    features: [
      "Everything in Free",
      "All courses, all modules, unlocked",
      "Full quiz bank with active recall review",
      "Downloadable study sheets",
      "New courses as they release",
    ],
  },
];

const faqs = [
  {
    question: "Can I cancel any time?",
    answer: "Yes, Premium is month to month with no long-term commitment.",
  },
  {
    question: "Is pricing final?",
    answer:
      "Not yet. These are working figures while billing is connected, final pricing may change before launch.",
  },
  {
    question: "Do you offer student discounts?",
    answer: "This is planned once accounts and billing are live.",
  },
];

export function PricingPlans() {
  return (
    <div className="pricing-page">
      <section className="pricing-hero section-container">
        <span className="eyebrow">
          <Sparkles size={15} />
          Simple pricing
        </span>
        <h1>Learn for free. Upgrade when you&apos;re ready.</h1>
        <p>Every course starts with a free preview, no card required.</p>
      </section>

      <section className="pricing-grid section-container">
        {plans.map((plan) => (
          <article
            key={plan.name}
            className={`pricing-card ${plan.highlighted ? "is-highlighted" : ""}`}
          >
            {plan.highlighted && (
              <span className="pricing-card__badge">
                <Crown size={13} />
                Most popular
              </span>
            )}
            <h2>{plan.name}</h2>
            <p className="pricing-card__description">{plan.description}</p>
            <div className="pricing-card__price">
              <strong>{plan.price}</strong>
              <span>{plan.period}</span>
            </div>
            <Link
              href={plan.href}
              className={`button ${plan.highlighted ? "" : "button--secondary"}`}
            >
              {plan.cta}
              <ArrowRight size={17} />
            </Link>
            <ul className="pricing-card__features">
              {plan.features.map((feature) => (
                <li key={feature}>
                  <Check size={15} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="pricing-faq section-container">
        <div className="section-heading">
          <div>
            <span className="section-kicker">QUESTIONS</span>
            <h2>Pricing FAQ</h2>
          </div>
        </div>
        <div className="pricing-faq__list">
          {faqs.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
