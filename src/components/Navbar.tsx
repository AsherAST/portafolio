"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const { lang, toggleLang, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const firstName = t.personal.name.split(" ")[0];
  const lastName = t.personal.name.split(" ")[1] ?? "";

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/70 bg-white/80 backdrop-blur-md dark:border-zinc-800/70 dark:bg-zinc-950/80">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#inicio" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-sky-500 text-sm font-black text-white shadow-lg shadow-indigo-500/30">
            {firstName.charAt(0)}
            {lastName.charAt(0)}
          </span>
          <span className="text-lg font-bold tracking-tight text-zinc-950 dark:text-white">
            {firstName}
            <span className="text-gradient">.</span>
          </span>
        </a>

        <ul className="hidden items-center gap-7 text-sm font-medium md:flex">
          {t.nav.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group relative text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="#contacto"
            className="hidden h-9 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-4 text-sm font-semibold text-white shadow-md shadow-indigo-500/25 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/40 md:inline-flex"
          >
            {t.navCta}
          </a>

          <button
            type="button"
            onClick={toggleLang}
            aria-label={lang === "es" ? "Cambiar a inglés" : "Switch to Spanish"}
            className="rounded-full border border-zinc-300 px-3 py-1 text-xs font-semibold uppercase transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
          >
            {lang === "es" ? "EN" : "ES"}
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label="Abrir menú"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-zinc-300 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800 md:hidden"
          >
            <span className="sr-only">Menú</span>
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div
          data-testid="menu-movil"
          className="border-t border-zinc-200 bg-white px-4 py-4 dark:border-zinc-800 dark:bg-zinc-950 md:hidden"
        >
          <ul className="flex flex-col gap-3 text-sm font-medium">
            {t.nav.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={closeMenu}
                  className="block py-1 text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contacto"
                onClick={closeMenu}
                className="mt-2 inline-flex h-10 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-5 text-sm font-semibold text-white"
              >
                {t.navCta}
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
