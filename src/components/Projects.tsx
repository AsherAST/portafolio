"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import SectionHeading from "@/components/SectionHeading";

export default function Projects() {
  const { t } = useLanguage();
  const { projects } = t;

  return (
    <section id="proyectos" className="relative bg-zinc-50 py-24 dark:bg-zinc-900">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          label={projects.label}
          title={projects.title}
          subtitle={projects.subtitle}
        />

        <div className="mt-16 flex flex-col gap-8">
          {projects.list.map((project) => {
            const initials = project.title
              .split(" ")
              .slice(0, 2)
              .map((word) => word.charAt(0))
              .join("");

            return (
              <article
                key={project.title}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-zinc-900/10 lg:grid lg:grid-cols-5 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:shadow-black/50"
              >
                <div className="relative overflow-hidden lg:col-span-2">
                  {project.image ? (
                    <>
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={1440}
                        height={900}
                        className="aspect-video h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 lg:aspect-auto"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </>
                  ) : (
                    <div className="relative flex aspect-video h-full w-full items-center justify-center overflow-hidden border-b border-zinc-200 bg-gradient-to-br from-indigo-500/10 via-violet-500/10 to-sky-500/10 dark:border-zinc-800">
                      <div
                        aria-hidden="true"
                        className="bg-grid absolute inset-0 opacity-60"
                      />
                      <span className="text-gradient relative text-5xl font-black">
                        {initials}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-6 sm:p-8 lg:col-span-3">
                  <h3 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-zinc-600 dark:text-zinc-400">
                    {project.description}
                  </p>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-700 transition-colors group-hover:bg-indigo-50 dark:bg-zinc-800 dark:text-zinc-300 dark:group-hover:bg-indigo-500/10"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-6 space-y-2.5">
                    {project.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 text-zinc-700 dark:text-zinc-300"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500/15 to-violet-500/15 text-indigo-600 ring-1 ring-inset ring-indigo-500/25 dark:text-indigo-400">
                          <svg
                            className="h-3 w-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-wrap gap-3 pt-8">
                    {project.links.map((link, index) => (
                      <a
                        key={link.label + link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={
                          index === 0
                            ? "inline-flex h-10 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-5 text-sm font-semibold text-white shadow-md shadow-indigo-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/40"
                            : "inline-flex h-10 items-center justify-center gap-2 rounded-full border border-zinc-300 px-5 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
                        }
                      >
                        {link.label}
                        <svg
                          className="h-3.5 w-3.5"
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
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}