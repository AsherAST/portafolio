export default function SectionHeading({
  label,
  title,
  subtitle,
}: {
  label: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600 dark:text-indigo-400">
        {label}
      </p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl dark:text-white">
        {title}
      </h2>
      <span className="mx-auto mt-5 block h-1 w-14 rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-500" />
      {subtitle ? (
        <p className="mt-5 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
