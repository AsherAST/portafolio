"use client";

import { useLanguage } from "@/context/LanguageContext";

const socialIcons: Record<string, string> = {
  github:
    "M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.09.68-.22.68-.49v-1.7c-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.57 2.34 1.12 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05a9.36 9.36 0 015 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.04.36.32.68.94.68 1.9v2.82c0 .27.18.59.69.49A10.28 10.28 0 0022 12.25C22 6.58 17.52 2 12 2z",
  linkedin:
    "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4V8h4v2a4 4 0 012-2zM6 9H2v12h4V9zM4 6a2 2 0 100-4 2 2 0 000 4z",
  email:
    "M3 8l9 6 9-6M4 19h16a1 1 0 001-1V6a1 1 0 00-1-1H4a1 1 0 00-1 1v12a1 1 0 001 1z",
};

export default function Hero() {
  const { t } = useLanguage();
  const { hero, personal } = t;

  const socials = [
    { label: "GitHub", href: personal.github },
    { label: "LinkedIn", href: personal.linkedin },
    { label: "Email", href: `mailto:${personal.email}` },
  ];

  return (
    <section id="inicio" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="bg-grid mask-fade-bottom absolute inset-0"
      />
      <div
        aria-hidden="true"
        className="absolute -top-40 left-1/2 h-[28rem] w-[44rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-400/30 via-violet-400/30 to-sky-400/30 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-28 sm:px-6 sm:pt-36">
        <div className="animate-fade-in-up mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-zinc-200 bg-white/70 px-4 py-1.5 text-sm font-medium text-zinc-700 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/70 dark:text-zinc-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            {hero.available}
          </span>

          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600 dark:text-indigo-400">
            {hero.greeting}
          </p>
          <h1 className="mt-3 text-5xl font-bold tracking-tight text-zinc-950 sm:text-6xl lg:text-7xl dark:text-white">
            {personal.name}
          </h1>
          <h2 className="text-gradient mt-4 text-2xl font-semibold sm:text-3xl lg:text-4xl">
            {hero.role}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            {hero.summary}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#proyectos"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-7 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/40"
            >
              {hero.ctaProjects}
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
            <a
              href="#contacto"
              className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-300 px-7 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
            >
              {hero.ctaContact}
            </a>
          </div>

          <div className="mt-10 flex items-center justify-center gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  social.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/40"
              >
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d={socialIcons[social.label.toLowerCase()]} />
                </svg>
              </a>
            ))}
          </div>

          <dl className="mx-auto mt-12 grid max-w-lg grid-cols-3 divide-x divide-zinc-200 rounded-2xl border border-zinc-200 bg-white/60 py-4 shadow-sm backdrop-blur dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-900/60">
            {hero.stats.map((stat) => (
              <div key={stat.label} className="px-2 text-center">
                <dd className="text-gradient text-2xl font-bold sm:text-3xl">
                  {stat.value}
                </dd>
                <dt className="mt-1 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
