import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import About from "@/components/About";
import Navbar from "@/components/Navbar";
import { LanguageProvider } from "@/context/LanguageContext";
import content, { placeholders } from "@/data/content";

function renderAbout() {
  return render(
    <LanguageProvider>
      <Navbar />
      <About />
    </LanguageProvider>,
  );
}

describe("About", () => {
  test("muestra el título y los párrafos en español", () => {
    renderAbout();
    expect(
      screen.getByRole("heading", { name: content.es.about.title }),
    ).toBeInTheDocument();
    for (const paragraph of content.es.about.paragraphs) {
      expect(screen.getByText(paragraph)).toBeInTheDocument();
    }
  });

  test("el botón de descargar CV apunta al archivo", () => {
    renderAbout();
    expect(
      screen.getByRole("link", { name: content.es.about.downloadCv }),
    ).toHaveAttribute("href", placeholders.cv);
  });

  test("cambia el contenido al alternar idioma", async () => {
    const user = userEvent.setup();
    renderAbout();
    await user.click(screen.getByRole("button", { name: "Cambiar a inglés" }));
    expect(
      screen.getByRole("heading", { name: content.en.about.title }),
    ).toBeInTheDocument();
    expect(screen.getByText(content.en.about.paragraphs[0])).toBeInTheDocument();
  });
});
