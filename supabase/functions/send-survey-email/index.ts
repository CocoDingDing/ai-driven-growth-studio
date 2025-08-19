import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY") as string);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const {
      firstName,
      email,
      company,
      selectedProducts,
      sessionId,
    } = await req.json();

    const subject = `Nouveau sondage reçu - ${firstName || "Anonyme"}`;

    const html = `
      <h1>Résultats du sondage</h1>
      <p><strong>Prénom:</strong> ${firstName || "(non fourni)"}</p>
      <p><strong>Email:</strong> ${email || "(non fourni)"}</p>
      <p><strong>Entreprise:</strong> ${company || "(non fournie)"}</p>
      <p><strong>Session ID:</strong> ${sessionId}</p>
      <h2>Solutions sélectionnées</h2>
      <ul>
        ${(selectedProducts || []).map((p: string) => `<li>${p}</li>`).join("") || "<li>Aucune</li>"}
      </ul>
    `;

    const { error } = await resend.emails.send({
      from: "Lovable <onboarding@resend.dev>",
      to: ["mathieu777@gmail.com"],
      subject,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (err: any) {
    console.error("Function error:", err);
    return new Response(JSON.stringify({ error: err.message || String(err) }), {
      status: 400,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
});
