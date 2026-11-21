import { COMPANY } from "@/lib/data";

// Cloudflare Pages: runtime edge.
export const runtime = "edge";

// Evita injection HTML nei valori inseriti nell'email
function esc(v: unknown): string {
  return String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(req: Request) {
  try {
    const { nome, telefono, email, servizio, messaggio } = await req.json();

    // Validazione minima
    if (!nome || !telefono || !messaggio) {
      return Response.json(
        { ok: false, error: "Nome, telefono e messaggio sono obbligatori." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return Response.json(
        { ok: false, error: "Servizio email non configurato." },
        { status: 500 }
      );
    }

    // Chiamata diretta all'API REST di Resend (compatibile edge/Cloudflare)
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // `from` deve usare un dominio verificato su Resend.
        // Finché termoidricags.it non è verificato, si può usare onboarding@resend.dev.
        from: process.env.RESEND_FROM || "Termoidrica GS <onboarding@resend.dev>",
        to: process.env.PREVENTIVO_TO || COMPANY.email,
        reply_to: email || undefined,
        subject: `Nuovo preventivo da ${esc(nome)}`,
        html: `
          <h2>Nuova richiesta di preventivo</h2>
          <p><b>Nome:</b> ${esc(nome)}</p>
          <p><b>Telefono:</b> ${esc(telefono)}</p>
          <p><b>Email:</b> ${esc(email) || "—"}</p>
          <p><b>Servizio:</b> ${esc(servizio) || "—"}</p>
          <p><b>Messaggio:</b><br/>${esc(messaggio).replace(/\n/g, "<br/>")}</p>
        `,
      }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      return Response.json(
        { ok: false, error: data?.message || "Invio non riuscito." },
        { status: 502 }
      );
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json(
      { ok: false, error: "Errore interno del server." },
      { status: 500 }
    );
  }
}
