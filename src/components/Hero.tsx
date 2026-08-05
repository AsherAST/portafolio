"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section id="inicio" className="mx-auto max-w-5xl px-4 pt-24 pb-16 sm:px-6">
      <p className="mb-3 text-sm font-medium text-blue-600 dark:text-blue-400">
        {t.hero.greeting}
      </p>
      <h1 className="text-4xl font-bold tracking-tight text-zinc-950 sm:text-5xl dark:text-white">
        {t.personal.name}
      </h1>
      <h2 className="mt-2 text-2xl font-semibold text-zinc-600 sm:text-3xl dark:text-zinc-400">
        {t.hero.role}
      </h2>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
        {t.hero.summary}
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <a
          href="#proyectos"
          className="inline-flex h-12 items-center justify-center rounded-full bg-zinc-950 px-6 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-300"
        >
          {t.hero.ctaProjects}
        </a>
        <a
          href="#contacto"
          className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-300 px-6 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
        >
          {t.hero.ctaContact}
        </a>
      </div>
    </section>
  );
}
