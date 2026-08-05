import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import { LanguageProvider } from "@/context/LanguageContext";
import content from "@/data/content";

function renderHero() {
  return render(
    <LanguageProvider>
      <Navbar />
      <Hero />
    </LanguageProvider>,
  );
}

describe("Hero", () => {
  test("muestra el nombre, el rol y el resumen en español", () => {
    renderHero();
    expect(
      screen.getByRole("heading", { name: content.es.personal.name }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: content.es.hero.role }),
    ).toBeInTheDocument();
    expect(screen.getByText(content.es.hero.summary)).toBeInTheDocument();
  });

  test("los botones enlazan a proyectos y contacto", () => {
    renderHero();
    expect(
      screen.getByRole("link", { name: content.es.hero.ctaProjects }),
    ).toHaveAttribute("href", "#proyectos");
    expect(
      screen.getByRole("link", { name: content.es.hero.ctaContact }),
    ).toHaveAttribute("href", "#contacto");
  });

  test("cambia el contenido al alternar idioma", async () => {
    const user = userEvent.setup();
    renderHero();
    await user.click(screen.getByRole("button", { name: "Cambiar a inglés" }));
    expect(
      screen.getByRole("heading", { name: content.en.personal.name }),
    ).toBeInTheDocument();
    expect(screen.getByText(content.en.hero.summary)).toBeInTheDocument();
  });
});
