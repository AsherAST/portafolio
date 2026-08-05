import { describe, expect, test } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Skills from "@/components/Skills";
import Navbar from "@/components/Navbar";
import { LanguageProvider } from "@/context/LanguageContext";
import content from "@/data/content";

function renderSkills() {
  return render(
    <LanguageProvider>
      <Navbar />
      <Skills />
    </LanguageProvider>,
  );
}

describe("Skills", () => {
  test("muestra el título y las categorías en español", () => {
    renderSkills();
    expect(
      screen.getByRole("heading", { name: content.es.skills.title }),
    ).toBeInTheDocument();
    for (const category of content.es.skills.categories) {
      const heading = screen.getByRole("heading", { name: category.name });
      const card = heading.closest("div") as HTMLElement;
      for (const item of category.items) {
        expect(within(card).getByText(item)).toBeInTheDocument();
      }
    }
  });

  test("solo muestra tecnologías del stack web", () => {
    renderSkills();
    const items = content.es.skills.categories.flatMap((c) => c.items);
    for (const item of items) {
      expect(screen.getByText(item)).toBeInTheDocument();
    }
    expect(screen.queryByText("Unity")).not.toBeInTheDocument();
    expect(screen.queryByText("Kotlin")).not.toBeInTheDocument();
  });

  test("cambia las categorías al alternar idioma", async () => {
    const user = userEvent.setup();
    renderSkills();
    await user.click(screen.getByRole("button", { name: "Cambiar a inglés" }));
    expect(
      screen.getByRole("heading", { name: content.en.skills.title }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: content.en.skills.categories[0].name }),
    ).toBeInTheDocument();
  });
});
