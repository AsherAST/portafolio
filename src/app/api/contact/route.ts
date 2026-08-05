import { Resend } from "resend";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const toEmail = process.env.CONTACT_TO_EMAIL;

  let body: { name?: string; email?: string; message?: string };

  try {
    body = await request.json();
  } catch {
    return Response.json(
      { error: "Cuerpo de la solicitud inválido." },
      { status: 400 },
    );
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name || !email || !message) {
    return Response.json(
      { error: "Todos los campos son obligatorios." },
      { status: 400 },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json(
      { error: "El correo electrónico no es válido." },
      { status: 400 },
    );
  }

  if (!fromEmail || !toEmail) {
    return Response.json(
      { error: "El envío de correos no está configurado." },
      { status: 500 },
    );
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: `Nuevo mensaje de contacto: ${name}`,
      replyTo: email,
      text: `Nombre: ${name}\nCorreo: ${email}\n\n${message}`,
    });
    if (error) {
      throw error;
    }
  } catch (err) {
    console.error("CONTACT-ROUTE-ERROR", err);
    return Response.json(
      { error: "No se pudo enviar el mensaje. Inténtalo de nuevo." },
      { status: 500 },
    );
  }

  return Response.json({ ok: true });
}
