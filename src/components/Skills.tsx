"use client";

import { useLanguage } from "@/context/LanguageContext";
import SectionHeading from "@/components/SectionHeading";

const categoryIcons = [
  <path
    key="frontend"
    d="M3 5a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"
  />,
  <path
    key="backend"
    d="M12 4c4.97 0 9 1.34 9 3s-4.03 3-9 3-9-1.34-9-3 4.03-3 9-3z"
  />,
  <path key="testing" d="M12 3l7 3v5c0 4.97-3.13 8.42-7 9-3.87-.58-7-4.03-7-9V6l7-3z" />,
  <path
    key="tools"
    d="M5 6l4 4m4-4h6m0 0l-3-3m3 3l-3 3M7 19l4-4m4 4h6m0 0l-3-3m3 3l-3 3"
  />,
];

const iconShapes = [
  <rect key="monitor" x="2" y="4" width="20" height="14" rx="2" />,
  <ellipse key="db" cx="12" cy="5" rx="8" ry="3" />,
  <path key="shield" d="M9 12l2 2 4-4" />,
  <path key="terminal" d="M7 8l3 3-3 3M13 14h4" />,
];

export default function Skills() {
  const { t } = useLanguage();
  const { skills } = t;

  return (
    <section id="habilidades" className="py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading label={skills.label} title={skills.title} subtitle={skills.subtitle} />

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {skills.categories.map((category, index) => (
            <div
              key={category.name}
              className="group rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/10 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-indigo-500/40"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/10 to-violet-500/10 text-indigo-600 ring-1 ring-inset ring-indigo-500/20 transition-colors group-hover:from-indigo-500 group-hover:to-violet-500 group-hover:text-white dark:text-indigo-400">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {categoryIcons[index]}
                  {iconShapes[index]}
                </svg>
              </span>
              <h3 className="mt-4 text-lg font-semibold text-zinc-950 dark:text-white">
                {category.name}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-700 transition-colors group-hover:bg-indigo-50 dark:bg-zinc-800 dark:text-zinc-300 dark:group-hover:bg-indigo-500/10"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
