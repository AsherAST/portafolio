import { describe, expect, test } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from "@/components/Navbar";
import { LanguageProvider } from "@/context/LanguageContext";
import content from "@/data/content";

function renderNavbar() {
  return render(
    <LanguageProvider>
      <Navbar />
    </LanguageProvider>,
  );
}

describe("Navbar", () => {
  test("muestra un enlace por cada link de navegación", () => {
    renderNavbar();
    for (const link of content.es.nav) {
      const anchor = screen.getByRole("link", { name: link.label });
      expect(anchor).toHaveAttribute("href", link.href);
    }
  });

  test("el botón de idioma alterna entre ES y EN", async () => {
    const user = userEvent.setup();
    renderNavbar();

    const toggle = screen.getByRole("button", { name: "Cambiar a inglés" });
    expect(toggle).toHaveTextContent("EN");

    await user.click(toggle);

    const toggleEn = screen.getByRole("button", { name: "Switch to Spanish" });
    expect(toggleEn).toHaveTextContent("ES");
    expect(
      screen.getByRole("link", { name: content.en.nav[0].label }),
    ).toBeInTheDocument();
  });

  test("abre y cierra el menú móvil al hacer clic", async () => {
    const user = userEvent.setup();
    renderNavbar();

    const toggle = screen.getByRole("button", { name: "Abrir menú" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByTestId("menu-movil")).toBeVisible();

    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByTestId("menu-movil")).not.toBeInTheDocument();
  });

  test("cierra el menú móvil al hacer clic en un enlace", async () => {
    const user = userEvent.setup();
    renderNavbar();

    await user.click(screen.getByRole("button", { name: "Abrir menú" }));
    const menu = screen.getByTestId("menu-movil");
    await user.click(
      within(menu).getByRole("link", { name: content.es.nav[1].label }),
    );

    expect(screen.queryByTestId("menu-movil")).not.toBeInTheDocument();
  });
});
