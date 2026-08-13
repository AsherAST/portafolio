"use client";

import { useLanguage } from "@/context/LanguageContext";
import ContactForm from "@/components/ContactForm";
import SectionHeading from "@/components/SectionHeading";

const contactIcons: Record<string, string> = {
  email:
    "M3 8l9 6 9-6M4 19h16a1 1 0 001-1V6a1 1 0 00-1-1H4a1 1 0 00-1 1v12a1 1 0 001 1z",
  github:
    "M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.09.68-.22.68-.49v-1.7c-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.57 2.34 1.12 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05a9.36 9.36 0 015 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.04.36.32.68.94.68 1.9v2.82c0 .27.18.59.69.49A10.28 10.28 0 0022 12.25C22 6.58 17.52 2 12 2z",
  linkedin:
    "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4V8h4v2a4 4 0 012-2zM6 9H2v12h4V9zM4 6a2 2 0 100-4 2 2 0 000 4z",
};

export default function Contact() {
  const { t } = useLanguage();
  const { personal } = t;

  const socialLinks = [
    { label: "Email", href: `mailto:${personal.email}`, value: personal.email },
    { label: "GitHub", href: personal.github, value: "github.com/AsherAST" },
    { label: "LinkedIn", href: personal.linkedin, value: "linkedin.com/in/damian-espinosa" },
  ];

  return (
    <section id="contacto" className="relative overflow-hidden py-24">
      <div
        aria-hidden="true"
        className="absolute -bottom-40 left-1/2 h-96 w-[40rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-400/20 via-violet-400/20 to-sky-400/20 blur-3xl"
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading label={t.contact.label} title={t.contact.title} subtitle={t.contact.subtitle} />

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                aria-label={link.label}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="group flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-500/10 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-indigo-500/40"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/25">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d={contactIcons[link.label.toLowerCase()]} />
                  </svg>
                </span>
                <span className="flex-1">
                  <span className="block font-semibold text-zinc-950 dark:text-white">
                    {link.label}
                  </span>
                  <span className="block truncate text-sm text-zinc-500 dark:text-zinc-400">
                    {link.value}
                  </span>
                </span>
                <svg
                  className="h-4 w-4 text-zinc-400 transition-transform group-hover:translate-x-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 6H5a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2V10.5m2.5-4.5H16m4 0v4m0-4l-8.5 8.5"
                  />
                </svg>
              </a>
            ))}
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}