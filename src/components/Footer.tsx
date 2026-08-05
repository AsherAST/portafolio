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
    <footer className="border-t border-zinc-200 bg-zinc-50 py-8 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 text-sm text-zinc-600 sm:flex-row sm:px-6 dark:text-zinc-400">
        <p>
          © {new Date().getFullYear()} {personal.name}. {t.footer.rights}
        </p>
        <div className="flex items-center gap-4">
          <a
            href={`mailto:${personal.email}`}
            onClick={copyEmail}
            title={t.footer.emailCopied}
            className="hover:text-zinc-950 dark:hover:text-white"
          >
            {copied ? t.footer.emailCopied : personal.email}
          </a>
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-950 dark:hover:text-white"
          >
            GitHub
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-950 dark:hover:text-white"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
