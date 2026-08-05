import { describe, expect, test, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { LanguageProvider } from "@/context/LanguageContext";
import content from "@/data/content";

function renderFooter() {
  return render(
    <LanguageProvider>
      <Navbar />
      <Footer />
    </LanguageProvider>,
  );
}

describe("Footer", () => {
  test("muestra el nombre, los derechos y el año actual", () => {
    renderFooter();
    expect(
      screen.getByText(new RegExp(content.es.personal.name)),
    ).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(content.es.footer.rights)),
    ).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(String(new Date().getFullYear()))),
    ).toBeInTheDocument();
  });

  test("muestra los enlaces de contacto", () => {
    renderFooter();
    expect(
      screen.getByRole("link", { name: content.es.personal.email }),
    ).toHaveAttribute("href", `mailto:${content.es.personal.email}`);
    expect(screen.getByRole("link", { name: "GitHub" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "LinkedIn" })).toBeInTheDocument();
  });

  test("hacer clic en el correo lo copia al portapapeles y muestra el mensaje", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal("navigator", { clipboard: { writeText } });

    renderFooter();
    fireEvent.click(
      screen.getByRole("link", { name: content.es.personal.email }),
    );

    expect(writeText).toHaveBeenCalledWith(content.es.personal.email);
    expect(
      await screen.findByText(content.es.footer.emailCopied),
    ).toBeInTheDocument();

    vi.unstubAllGlobals();
  });

  test("cambia el contenido al alternar idioma", async () => {
    const user = userEvent.setup();
    renderFooter();
    await user.click(screen.getByRole("button", { name: "Cambiar a inglés" }));
    expect(
      screen.getByText(new RegExp(content.en.footer.rights)),
    ).toBeInTheDocument();
  });
});
