import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Contact from "@/components/Contact";
import Navbar from "@/components/Navbar";
import { LanguageProvider } from "@/context/LanguageContext";
import content from "@/data/content";

function renderContact() {
  return render(
    <LanguageProvider>
      <Navbar />
      <Contact />
    </LanguageProvider>,
  );
}

describe("Contact", () => {
  test("muestra título, subtítulo y enlaces sociales", () => {
    renderContact();
    expect(
      screen.getByRole("heading", { name: content.es.contact.title }),
    ).toBeInTheDocument();
    expect(screen.getByText(content.es.contact.subtitle)).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: "Email" }),
    ).toHaveAttribute("href", `mailto:${content.es.personal.email}`);
    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      content.es.personal.github,
    );
    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "href",
      content.es.personal.linkedin,
    );
  });

  test("incluye el formulario de contacto", () => {
    renderContact();
    expect(
      screen.getByLabelText(content.es.contact.form.name),
    ).toBeInTheDocument();
  });

  test("cambia el contenido al alternar idioma", async () => {
    const user = userEvent.setup();
    renderContact();
    await user.click(screen.getByRole("button", { name: "Cambiar a inglés" }));
    expect(
      screen.getByRole("heading", { name: content.en.contact.title }),
    ).toBeInTheDocument();
  });
});
