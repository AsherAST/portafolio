"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useLanguage } from "@/context/LanguageContext";

type FormErrors = {
  name?: string;
  email?: string;
  message?: string;
};

const inputClasses =
  "mt-1.5 w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-zinc-900 placeholder-zinc-400 shadow-sm transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder-zinc-500 dark:focus:border-indigo-400";

export default function ContactForm() {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");

  const labels = t.contact.form;

  function validate(): FormErrors {
    const nextErrors: FormErrors = {};
    if (!name.trim()) {
      nextErrors.name = labels.errors.name;
    }
    if (!email.trim()) {
      nextErrors.email = labels.errors.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = labels.errors.emailInvalid;
    }
    if (!message.trim()) {
      nextErrors.message = labels.errors.message;
    }
    return nextErrors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!response.ok) {
        throw new Error("submit-failed");
      }

      setStatus("sent");
    } catch {
      setStatus("error");
      setErrorMessage(labels.error);
    }
  }

  function reset() {
    setName("");
    setEmail("");
    setMessage("");
    setErrors({});
    setStatus("idle");
    setErrorMessage("");
  }

  if (status === "sent") {
    return (
      <div
        role="status"
        className="flex flex-col items-center justify-center rounded-2xl border border-emerald-600/30 bg-emerald-500/10 p-10 text-center"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 ring-1 ring-inset ring-emerald-500/30 dark:text-emerald-400">
          <svg
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </span>
        <h3 className="mt-5 text-lg font-semibold text-emerald-700 dark:text-emerald-400">
          {labels.success}
        </h3>
        <button
          type="button"
          onClick={reset}
          className="mt-5 text-sm font-medium text-zinc-600 underline underline-offset-4 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
        >
          {labels.submit}
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-lg shadow-zinc-900/5 sm:p-8 dark:border-zinc-800 dark:bg-zinc-950"
    >
      <div>
        <label htmlFor="contact-name" className="text-sm font-medium">
          {labels.name}
        </label>
        <input
          id="contact-name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          className={inputClasses}
          placeholder={labels.namePlaceholder}
        />
        {errors.name && (
          <p
            id="contact-name-error"
            role="alert"
            className="mt-1 text-sm text-red-600 dark:text-red-400"
          >
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-email" className="text-sm font-medium">
          {labels.email}
        </label>
        <input
          id="contact-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          className={inputClasses}
          placeholder={labels.emailPlaceholder}
        />
        {errors.email && (
          <p
            id="contact-email-error"
            role="alert"
            className="mt-1 text-sm text-red-600 dark:text-red-400"
          >
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-message" className="text-sm font-medium">
          {labels.message}
        </label>
        <textarea
          id="contact-message"
          rows={5}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className={inputClasses}
          placeholder={labels.messagePlaceholder}
        />
        {errors.message && (
          <p
            id="contact-message-error"
            role="alert"
            className="mt-1 text-sm text-red-600 dark:text-red-400"
          >
            {errors.message}
          </p>
        )}
      </div>

      {status === "error" && (
        <p
          role="alert"
          className="rounded-lg border border-red-700/40 bg-red-500/10 p-3 text-sm text-red-600 dark:text-red-400"
        >
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-6 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/40 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? "…" : labels.submit}
        {status === "sending" ? null : (
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
              d="M6 12h12m0 0l-4-4m4 4l-4 4"
            />
          </svg>
        )}
      </button>
    </form>
  );
}