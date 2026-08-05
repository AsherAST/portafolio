import { test, expect } from "@playwright/test";
import content from "../src/data/content";

test("enviar el formulario vacío muestra errores de validación", async ({
  page,
}) => {
  await page.goto("/");
  const form = content.es.contact.form;

  await page.getByRole("button", { name: form.submit }).click();

  await expect(page.getByText(form.errors.name)).toBeVisible();
  await expect(page.getByText(form.errors.emailRequired)).toBeVisible();
  await expect(page.getByText(form.errors.message)).toBeVisible();
});

test("enviar un email inválido muestra el error de correo", async ({ page }) => {
  await page.goto("/");
  const form = content.es.contact.form;

  await page.getByLabel(form.name).fill("Ana");
  await page.getByLabel(form.email).fill("correo-invalido");
  await page.getByLabel(form.message).fill("Hola");
  await page.getByRole("button", { name: form.submit }).click();

  await expect(page.getByText(form.errors.emailInvalid)).toBeVisible();
});

test("los enlaces de contacto apuntan a los datos del perfil", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page.getByRole("link", { name: "Email" }).first()).toHaveAttribute(
    "href",
    `mailto:${content.es.personal.email}`,
  );
  await expect(page.getByRole("link", { name: "GitHub" }).first()).toHaveAttribute(
    "href",
    content.es.personal.github,
  );
});
