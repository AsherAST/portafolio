import { describe, expect, test } from "vitest";
import content from "@/data/content";

describe("content (bilingüe)", () => {
  test("existe contenido para los dos idiomas", () => {
    expect(content.es).toBeDefined();
    expect(content.en).toBeDefined();
  });

  test("ambos idiomas tienen la misma estructura de claves", () => {
    const esKeys = JSON.stringify(Object.keys(content.es).sort());
    const enKeys = JSON.stringify(Object.keys(content.en).sort());
    expect(esKeys).toBe(enKeys);
  });

  test("el contenido de navegación coincide en href entre idiomas", () => {
    expect(content.es.nav.map((l) => l.href)).toEqual(
      content.en.nav.map((l) => l.href),
    );
  });

  test("los proyectos son válidos y con links", () => {
    for (const lang of ["es", "en"] as const) {
      for (const project of content[lang].projects.list) {
        expect(project.title).toBeTruthy();
        expect(project.description).toBeTruthy();
        expect(project.stack.length).toBeGreaterThan(0);
        expect(project.features.length).toBeGreaterThan(0);
        for (const link of project.links) {
          expect(link.href.startsWith("http")).toBe(true);
        }
      }
    }
  });

  test("ambos idiomas exponen el mismo proyecto constructora", () => {
    expect(content.es.projects.list[0].title).toBe(content.en.projects.list[0].title);
  });

  test("las categorías de habilidades solo cubren el stack web", () => {
    const webOnly = ["Next.js", "React", "TypeScript", "Tailwind CSS"];
    for (const lang of ["es", "en"] as const) {
      const items = content[lang].skills.categories.flatMap((c) => c.items);
      for (const skill of webOnly) {
        expect(items).toContain(skill);
      }
      expect(items).not.toContain("Unity");
      expect(items).not.toContain("Kotlin");
    }
  });
});
