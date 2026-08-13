"use client";

import { useLanguage } from "@/context/LanguageContext";
import { placeholders } from "@/data/content";
import SectionHeading from "@/components/SectionHeading";

export default function About() {
  const { t } = useLanguage();
  const { about, personal } = t;

  const facts = [
    { label: about.factLocation, value: personal.location },
    { label: about.factEmail, value: personal.email },
    { label: about.factFocus, value: personal.role },
  ];

  return (
    <section id="sobre-mi" className="relative bg-zinc-50 py-24 dark:bg-zinc-900">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading label={about.label} title={about.title} />

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
          <div className="animate-fade-in-up">
            <div className="space-y-5 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <dl className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {facts.map((fact) => (
                <div
                  key={fact.label}
                  className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950"
                >
                  <dt className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    {fact.label}
                  </dt>
                  <dd className="mt-1 truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-8">
              <a
                href={placeholders.cv}
                download
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-6 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/40"
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
                {about.downloadCv}
              </a>
            </div>
          </div>

          <div className="animate-fade-in-up relative" style={{ animationDelay: "0.15s" }}>
            <div
              aria-hidden="true"
              className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-indigo-500/20 via-violet-500/10 to-sky-500/20 blur-2xl"
            />
            <div className="animate-float relative overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-950 shadow-2xl dark:border-zinc-700">
              <div className="flex items-center gap-2 border-b border-zinc-800 px-5 py-3.5">
                <span className="h-3 w-3 rounded-full bg-red-500" />
                <span className="h-3 w-3 rounded-full bg-yellow-500" />
                <span className="h-3 w-3 rounded-full bg-green-500" />
                <span className="ml-3 font-mono text-xs text-zinc-500">
                  damian.ts
                </span>
              </div>
              <pre className="overflow-x-auto p-6 font-mono text-sm leading-7 text-zinc-300">
                <code>
                  <span className="text-violet-400">const</span>{" "}
                  <span className="text-sky-300">developer</span>{" "}
                  <span className="text-zinc-500">=</span> {"{"}
                  {"\n"}  name:{" "}
                  <span className="text-emerald-300">&quot;Damian Espinosa&quot;</span>,
                  {"\n"}  role: <span className="text-emerald-300">&quot;Web&quot;</span>,{" "}
                  <span className="text-emerald-300">&quot;Full-stack&quot;</span>,
                  {"\n"}  stack: [
                  {"\n"}    <span className="text-emerald-300">&quot;Next.js&quot;</span>,{" "}
                  <span className="text-emerald-300">&quot;React&quot;</span>,{" "}
                  <span className="text-emerald-300">&quot;TypeScript&quot;</span>,
                  {"\n"}    <span className="text-emerald-300">&quot;Node.js&quot;</span>,{" "}
                  <span className="text-emerald-300">&quot;PostgreSQL&quot;</span>,
                  {"\n"}  ],
                  {"\n"}  testing: <span className="text-emerald-300">&quot;Vitest&quot;</span>,{" "}
                  <span className="text-emerald-300">&quot;Playwright&quot;</span>,
                  {"\n"}  deploy: <span className="text-emerald-300">&quot;Vercel&quot;</span>,
                  {"\n"}  available:{" "}
                  <span className="text-amber-300">true</span>,
                  {"\n"}
                  {"}"};
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}