import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Forma team.",
};

export default function ContactPage() {
  return <ContactForm />;
}
