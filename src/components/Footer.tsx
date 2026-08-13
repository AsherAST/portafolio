"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const { personal } = t;
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(personal.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <footer className="relative border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-500" />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
          <div className="text-center md:text-left">
            <p className="text-lg font-bold tracking-tight text-zinc-950 dark:text-white">
              {personal.name.split(" ")[0]}
              <span className="text-gradient">.</span>
            </p>
            <p className="mt-2 max-w-xs text-sm text-zinc-600 dark:text-zinc-400">
              {personal.role} — {t.footer.rights}
            </p>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-500">
              © {new Date().getFullYear()} {personal.name}
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 text-sm md:items-end">
            <a
              href={`mailto:${personal.email}`}
              onClick={copyEmail}
              title={t.footer.emailCopied}
              className="font-medium text-zinc-600 transition-colors hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400"
            >
              {copied ? t.footer.emailCopied : personal.email}
            </a>
            <div className="flex items-center gap-5">
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-600 transition-colors hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400"
              >
                GitHub
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-600 transition-colors hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400"
              >
                LinkedIn
              </a>
              <a
                href="#inicio"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-300 text-zinc-600 transition-all hover:-translate-y-0.5 hover:border-indigo-400 hover:text-indigo-600 dark:border-zinc-700 dark:text-zinc-400 dark:hover:text-indigo-400"
                aria-label="Subir"
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
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}