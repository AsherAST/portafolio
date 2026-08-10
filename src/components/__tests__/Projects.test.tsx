import { describe, expect, test } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Projects from "@/components/Projects";
import Navbar from "@/components/Navbar";
import { LanguageProvider } from "@/context/LanguageContext";
import content from "@/data/content";

function renderProjects() {
  return render(
    <LanguageProvider>
      <Navbar />
      <Projects />
    </LanguageProvider>,
  );
}

describe("Projects", () => {
  test("muestra los proyectos con título, descripción, stack y features", () => {
    renderProjects();
    for (const project of content.es.projects.list) {
      const article = screen
        .getByRole("heading", { name: project.title })
        .closest("article") as HTMLElement;

      expect(
        within(article).getByText(project.description),
      ).toBeInTheDocument();
      for (const tech of project.stack) {
        expect(within(article).getByText(tech)).toBeInTheDocument();
      }
      for (const feature of project.features) {
        expect(within(article).getByText(feature)).toBeInTheDocument();
      }
      for (const link of project.links) {
        expect(
          within(article).getByRole("link", { name: link.label }),
        ).toHaveAttribute("href", link.href);
      }
    }
  });

  test("solo muestra el proyecto constructora", () => {
    renderProjects();
    expect(
      screen.getByRole("heading", { name: content.es.projects.list[0].title }),
    ).toBeInTheDocument();
    expect(screen.queryByText("Unity")).not.toBeInTheDocument();
  });

  test("los enlaces de proyecto abren en pestaña nueva", () => {
    renderProjects();
    const article = screen
      .getByRole("heading", { name: content.es.projects.list[0].title })
      .closest("article") as HTMLElement;
    for (const link of content.es.projects.list[0].links) {
      expect(
        within(article).getByRole("link", { name: link.label }),
      ).toHaveAttribute("target", "_blank");
    }
  });

  test("cambia el contenido al alternar idioma", async () => {
    const user = userEvent.setup();
    renderProjects();
    await user.click(screen.getByRole("button", { name: "Cambiar a inglés" }));
    expect(
      screen.getByRole("heading", { name: content.en.projects.list[0].title }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(content.en.projects.list[0].description),
    ).toBeInTheDocument();
  });
});
