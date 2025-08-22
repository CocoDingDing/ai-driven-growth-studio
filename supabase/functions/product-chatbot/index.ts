import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Initialize Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message } = await req.json();
    
    if (!message) {
      return new Response(JSON.stringify({ error: 'Message is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Fetch products from database
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('title, description, position')
      .eq('active', true)
      .order('position');

    if (productsError) {
      console.error('Error fetching products:', productsError);
      throw new Error('Failed to fetch products');
    }

    // Check if user is asking for the list of products
    const lowerMessage = message.toLowerCase();
    const isAskingForList = lowerMessage.includes('liste') && 
      (lowerMessage.includes('produit') || lowerMessage.includes('solution') || lowerMessage.includes('30'));

    if (isAskingForList) {
      const productsList = products.map((product, index) => 
        `${index + 1}. **${product.title}**\n   ${product.description}`
      ).join('\n\n');

      const listResponse = `Voici la liste complète de nos 30 solutions d'IA et d'automatisation :\n\n${productsList}\n\nCes solutions sont conçues pour automatiser et optimiser différents aspects de votre entreprise. Laquelle vous intéresse le plus ? Je peux vous donner plus de détails ou vous conseiller selon vos besoins spécifiques.\n\n💡 N'hésitez pas à demander une consultation gratuite pour analyser vos besoins !`;

      return new Response(JSON.stringify({ message: listResponse }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // For other questions, use OpenAI
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      // Fallback response if OpenAI is not available
      const fallbackResponse = `Je suis votre assistant pour nos solutions d'IA et d'automatisation. Nous proposons 30 solutions différentes couvrant la prospection commerciale, la création de sites web, les assistants virtuels, et bien plus.\n\nPour voir la liste complète, demandez-moi "quelle est la liste des 30 produits ?".\n\nSinon, n'hésitez pas à me poser une question spécifique sur nos solutions !`;
      
      return new Response(JSON.stringify({ message: fallbackResponse }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const systemPrompt = `Tu es un assistant expert qui aide les clients à comprendre nos 30 solutions d'IA et d'automatisation. Tu dois répondre uniquement en français et de manière professionnelle mais accessible.

Voici notre catalogue de 30 produits/solutions :

${products.map((product, index) => `${index + 1}. ${product.title}\n   Description: ${product.description}`).join('\n\n')}

Instructions pour tes réponses :
- Réponds uniquement aux questions concernant nos produits/solutions
- Sois précis et détaillé sur les fonctionnalités et bénéfices
- Si on te demande des recommandations, suggère les solutions les plus adaptées
- Si une question ne concerne pas nos produits, redirige poliment vers nos solutions
- Toujours finir par proposer une consultation gratuite si approprié
- Utilise un ton professionnel mais chaleureux
- N'invente jamais de fonctionnalités qui ne sont pas mentionnées`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        max_tokens: 800,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const assistantMessage = data.choices[0].message.content;

    return new Response(JSON.stringify({ message: assistantMessage }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in product-chatbot function:', error);
    return new Response(JSON.stringify({ 
      error: 'Une erreur est survenue. Veuillez réessayer.' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});