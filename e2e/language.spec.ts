import { test, expect } from "@playwright/test";
import content from "../src/data/content";

test("el conmutador de idioma cambia a inglés y persiste al recargar", async ({
  page,
}) => {
  await page.goto("/");

  await page
    .getByRole("button", { name: "Cambiar a inglés" })
    .click();

  await expect(
    page.getByRole("heading", { level: 1, name: content.en.personal.name }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: content.en.hero.role }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Switch to Spanish" }),
  ).toBeVisible();

  await page.reload();

  await expect(
    page.getByRole("heading", { level: 1, name: content.en.personal.name }),
  ).toBeVisible();
});

test("el conmutador de idioma vuelve a español", async ({ page }) => {
  await page.goto("/");

  await page
    .getByRole("button", { name: "Cambiar a inglés" })
    .click();
  await page.getByRole("button", { name: "Switch to Spanish" }).click();

  await expect(
    page.getByRole("heading", { level: 1, name: content.es.personal.name }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Cambiar a inglés" }),
  ).toBeVisible();
});
