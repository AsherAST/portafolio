"use client";

import { useLanguage } from "@/context/LanguageContext";
import { placeholders } from "@/data/content";

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="sobre-mi" className="bg-zinc-50 py-20 dark:bg-zinc-900">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">
          {t.about.title}
        </h2>
        <div className="mt-6 space-y-4 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          {t.about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-8">
          <a
            href={placeholders.cv}
            download
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-zinc-300 px-5 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16"
              />
            </svg>
            {t.about.downloadCv}
          </a>
        </div>
      </div>
    </section>
  );
}
