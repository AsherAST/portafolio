import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  LanguageProvider,
  useLanguage,
} from "@/context/LanguageContext";

function Probe() {
  const { lang, toggleLang, t } = useLanguage();
  return (
    <div>
      <p data-testid="lang">{lang}</p>
      <p data-testid="greeting">{t.hero.greeting}</p>
      <button type="button" onClick={toggleLang}>
        toggle
      </button>
    </div>
  );
}

describe("LanguageContext", () => {
  test("provee el idioma por defecto (es) y su contenido", () => {
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>,
    );
    expect(screen.getByTestId("lang")).toHaveTextContent("es");
    expect(screen.getByTestId("greeting")).toHaveTextContent("Hola, soy");
  });

  test("toggleLang cambia el idioma y el contenido", async () => {
    const user = userEvent.setup();
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>,
    );
    await user.click(screen.getByRole("button", { name: "toggle" }));
    expect(screen.getByTestId("lang")).toHaveTextContent("en");
    expect(screen.getByTestId("greeting")).toHaveTextContent("Hi, I'm");
  });

  test("lee el idioma guardado en localStorage", () => {
    localStorage.setItem("portfolio-lang", "en");
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>,
    );
    expect(screen.getByTestId("lang")).toHaveTextContent("en");
  });

  test("useLanguage lanza error fuera del proveedor", () => {
    const originalError = console.error;
    console.error = () => {};
    expect(() => render(<Probe />)).toThrow(
      "useLanguage debe usarse dentro de LanguageProvider",
    );
    console.error = originalError;
  });
});
