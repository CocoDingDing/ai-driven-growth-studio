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

    // Envoyer l'email à mathieu777@gmail.com
    const { error: adminError } = await resend.emails.send({
      from: "Lovable <onboarding@resend.dev>",
      to: ["mathieu777@gmail.com"],
      subject,
      html,
    });

    if (adminError) {
      console.error("Admin email error:", adminError);
      return new Response(JSON.stringify({ error: adminError.message }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Envoyer un email de confirmation à l'utilisateur s'il a fourni son email
    if (email) {
      const userSubject = "Confirmation de votre sondage - Merci pour votre participation";
      const userHtml = `
        <h1>Merci ${firstName} !</h1>
        <p>Nous avons bien reçu votre sondage. Voici un récapitulatif de vos réponses :</p>
        
        <h2>Vos informations</h2>
        <p><strong>Prénom:</strong> ${firstName}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${company ? `<p><strong>Entreprise:</strong> ${company}</p>` : ''}
        
        <h2>Solutions qui vous intéressent</h2>
        <ul>
          ${(selectedProducts || []).map((p: string) => `<li>${p}</li>`).join("") || "<li>Aucune solution sélectionnée</li>"}
        </ul>
        
        <p>Nous reviendrons vers vous très prochainement pour discuter de vos besoins.</p>
        <p>À bientôt !</p>
      `;

      const { error: userError } = await resend.emails.send({
        from: "Lovable <onboarding@resend.dev>",
        to: [email],
        subject: userSubject,
        html: userHtml,
      });

      if (userError) {
        console.error("User email error:", userError);
        // On continue même si l'email utilisateur échoue
      }
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
