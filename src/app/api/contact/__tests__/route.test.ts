import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { POST } from "@/app/api/contact/route";

const { mockSend } = vi.hoisted(() => ({ mockSend: vi.fn() }));

vi.mock("resend", () => ({
  Resend: vi.fn().mockImplementation(function (
    this: { emails: { send: typeof mockSend } },
  ) {
    this.emails = { send: mockSend };
  }),
}));

function jsonRequest(body: unknown) {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
}

const originalFrom = process.env.CONTACT_FROM_EMAIL;
const originalTo = process.env.CONTACT_TO_EMAIL;

beforeEach(() => {
  process.env.CONTACT_FROM_EMAIL = "onboarding@resend.dev";
  process.env.CONTACT_TO_EMAIL = "damianespinosadev@gmail.com";
  process.env.RESEND_API_KEY = "re_test_key";
});

afterEach(() => {
  process.env.CONTACT_FROM_EMAIL = originalFrom;
  process.env.CONTACT_TO_EMAIL = originalTo;
  delete process.env.RESEND_API_KEY;
  vi.clearAllMocks();
  mockSend.mockReset();
});

describe("POST /api/contact", () => {
  test("responde 400 si el cuerpo no es JSON válido", async () => {
    const response = await POST(
      new Request("http://localhost/api/contact", {
        method: "POST",
        body: "no-es-json",
      }),
    );
    expect(response.status).toBe(400);
  });

  test("responde 400 si faltan campos", async () => {
    const response = await POST(jsonRequest({ name: "Ana", email: "" }));
    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toBe("Todos los campos son obligatorios.");
  });

  test("responde 400 si el correo no es válido", async () => {
    const response = await POST(
      jsonRequest({ name: "Ana", email: "correo-invalido", message: "Hola" }),
    );
    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toBe("El correo electrónico no es válido.");
  });

  test("responde 500 si las variables de correo no están configuradas", async () => {
    delete process.env.CONTACT_FROM_EMAIL;
    delete process.env.CONTACT_TO_EMAIL;

    const response = await POST(
      jsonRequest({ name: "Ana", email: "ana@ejemplo.com", message: "Hola" }),
    );
    expect(response.status).toBe(500);
  });

  test("envía el correo con Resend y responde ok", async () => {
    mockSend.mockResolvedValue({ data: {}, error: null });

    const response = await POST(
      jsonRequest({ name: "Ana", email: "ana@ejemplo.com", message: "Hola" }),
    );
    expect(response.status).toBe(200);

    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        from: "onboarding@resend.dev",
        to: ["damianespinosadev@gmail.com"],
        replyTo: "ana@ejemplo.com",
      }),
    );
  });

  test("responde 500 si Resend devuelve un error", async () => {
    mockSend.mockResolvedValue({ data: null, error: new Error("fail") });

    const response = await POST(
      jsonRequest({ name: "Ana", email: "ana@ejemplo.com", message: "Hola" }),
    );
    expect(response.status).toBe(500);
  });
});
