import { test, expect } from "@playwright/test";
import content from "../src/data/content";

test("la portada carga y muestra el hero con nombre y rol", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { level: 1, name: content.es.personal.name }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: content.es.hero.role }),
  ).toBeVisible();
  await expect(page.getByText(content.es.hero.summary)).toBeVisible();
});

test("todas las secciones de la portada están presentes", async ({ page }) => {
  await page.goto("/");

  for (const heading of [
    content.es.hero.role,
    content.es.about.title,
    content.es.skills.title,
    content.es.projects.title,
    content.es.contact.title,
  ]) {
    await expect(
      page.getByRole("heading", { name: heading }),
    ).toBeVisible();
  }
});

test("el proyecto constructora se muestra con sus links", async ({ page }) => {
  await page.goto("/");
  const project = content.es.projects.list[0];

  await expect(
    page.getByRole("heading", { name: project.title }),
  ).toBeVisible();
  for (const link of project.links) {
    await expect(
      page.getByRole("link", { name: link.label }),
    ).toHaveAttribute("href", link.href);
  }
});

test("los links de navegación apuntan a sus anclas", async ({ page }) => {
  await page.goto("/");

  for (const link of content.es.nav) {
    const anchor = page
      .getByRole("link", { name: link.label, exact: true })
      .first();
    await expect(anchor).toHaveAttribute("href", link.href);
  }
});
