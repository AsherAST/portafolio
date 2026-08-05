import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm from "@/components/ContactForm";
import { LanguageProvider } from "@/context/LanguageContext";
import content from "@/data/content";

function renderForm() {
  return render(
    <LanguageProvider>
      <ContactForm />
    </LanguageProvider>,
  );
}

describe("ContactForm", () => {
  test("muestra las etiquetas del formulario en español", () => {
    renderForm();
    const form = content.es.contact.form;
    expect(
      screen.getByLabelText(form.name),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(form.email),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(form.message),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: form.submit }),
    ).toBeInTheDocument();
  });

  test("muestra errores de validación al enviar vacío", async () => {
    const user = userEvent.setup();
    renderForm();
    const form = content.es.contact.form;
    await user.click(screen.getByRole("button", { name: form.submit }));

    expect(screen.getByText(form.errors.name)).toBeInTheDocument();
    expect(screen.getByText(form.errors.emailRequired)).toBeInTheDocument();
    expect(screen.getByText(form.errors.message)).toBeInTheDocument();
  });

  test("muestra error si el correo no es válido", async () => {
    const user = userEvent.setup();
    renderForm();
    const form = content.es.contact.form;

    await user.type(screen.getByLabelText(form.name), "Ana");
    await user.type(screen.getByLabelText(form.email), "correo-invalido");
    await user.type(screen.getByLabelText(form.message), "Hola");
    await user.click(screen.getByRole("button", { name: form.submit }));

    expect(screen.getByText(form.errors.emailInvalid)).toBeInTheDocument();
  });

  test("envía el mensaje y muestra el estado de éxito", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    const user = userEvent.setup();
    renderForm();
    const form = content.es.contact.form;

    await user.type(screen.getByLabelText(form.name), "Ana");
    await user.type(screen.getByLabelText(form.email), "ana@ejemplo.com");
    await user.type(screen.getByLabelText(form.message), "Hola");
    await user.click(screen.getByRole("button", { name: form.submit }));

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/contact",
      expect.objectContaining({ method: "POST" }),
    );
    expect(screen.getByRole("status")).toHaveTextContent(form.success);

    vi.unstubAllGlobals();
  });

  test("muestra el error del formulario si la petición falla", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));

    const user = userEvent.setup();
    renderForm();
    const form = content.es.contact.form;

    await user.type(screen.getByLabelText(form.name), "Ana");
    await user.type(screen.getByLabelText(form.email), "ana@ejemplo.com");
    await user.type(screen.getByLabelText(form.message), "Hola");
    await user.click(screen.getByRole("button", { name: form.submit }));

    expect(screen.getByRole("alert")).toHaveTextContent(form.error);

    vi.unstubAllGlobals();
  });
});
