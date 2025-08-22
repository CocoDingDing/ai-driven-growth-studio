import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const PRODUCTS_DATA = [
  {
    title: "Automatisation de la prospection commerciale",
    description: "Système qui génère, qualifie et contacte automatiquement des leads via e-mail, LinkedIn ou SMS."
  },
  {
    title: "Création de sites web en IA/No code",
    description: "Création de sites webs optimisés, avec textes percutants, design léché et moderne, et SEO en rapidité éclair."
  },
  {
    title: "Assistant virtuel personnalisé pour les TPE/PME",
    description: "Développement d'assistants IA sur-mesure (prise de rendez-vous, gestion d'e-mails, automatisation des tâches administratives)."
  },
  {
    title: "Création de sites Webs en CRM (Gestion de la relation client) et/ou ERP (Gestion des ressources internes de l'entreprise, avec indicateurs)",
    description: "Création de plateformes complètes et complexes pour gérer vos clients, suivi, facturation, prospects, livraisons, comptabilité…"
  },
  {
    title: "Générateur de contenus automatisé",
    description: "Plateforme qui crée automatiquement des posts LinkedIn, articles de blog ou newsletters à partir de prompts simples."
  },
  {
    title: "Audit UX automatisé",
    description: "Solution SaaS qui analyse un site web ou une appli et propose des recommandations UX grâce à l'IA."
  },
  {
    title: "Créateur de chatbots sans code",
    description: "Outil qui permet à toute entreprise de créer, entraîner et intégrer un chatbot sans compétences techniques."
  },
  {
    title: "Générateur d'images/visuels pour le marketing",
    description: "Plateforme qui produit des visuels, bannières, carrousels ou vidéos courtes grâce à l'IA générative."
  },
  {
    title: "Système de veille concurrentielle automatisée",
    description: "Service qui surveille les concurrents (prix, nouveautés, contenus…) et envoie des alertes ou rapports synthétiques."
  },
  {
    title: "Gestion automatisée de la facturation",
    description: "Outil qui génère, envoie et suit les factures, relance les impayés et s'intègre à la comptabilité."
  },
  {
    title: "Optimisation automatique de publicités en ligne",
    description: "Solution qui ajuste en temps réel les campagnes Ads (Google, Meta, LinkedIn) pour maximiser les conversions."
  },
  {
    title: "Analyse prédictive des ventes ou stocks",
    description: "Application qui prédit les ventes, ruptures ou besoins de réapprovisionnement grâce au machine learning."
  },
  {
    title: "Assistant RH automatisé",
    description: "Recrutement automatisé : sourcing, tri de CV, préqualification, planification des entretiens."
  },
  {
    title: "Créateur de parcours d'onboarding interactifs",
    description: "Outil qui génère des parcours d'onboarding automatisés et personnalisés pour nouveaux employés ou clients."
  },
  {
    title: "Automatisation du support client",
    description: "Plateforme de gestion de tickets et réponses automatiques par IA, escalade vers humain si besoin."
  },
  {
    title: "Outil de résumé automatique de documents",
    description: "Solution qui synthétise rapports, procès-verbaux, études ou notes de réunions en quelques secondes."
  },
  {
    title: "Assistant de génération d'offres commerciales personnalisées",
    description: "Création automatique de propositions commerciales adaptées au profil et au besoin du prospect."
  },
  {
    title: "Plateforme de formation en ligne générée par IA",
    description: "Création et mise à jour automatisées de modules, quiz, évaluations selon le profil de l'apprenant."
  },
  {
    title: "Automatisation de la gestion de rendez-vous",
    description: "Service qui gère les prises de RDV, envoie des rappels automatiques et s'intègre aux calendriers."
  },
  {
    title: "Marketplace de microservices automatisés",
    description: "Place de marché proposant des mini-tâches automatisées (ex : nettoyage de base de données, vérification d'e-mails, extraction de données)."
  },
  {
    title: "Créateur d'emails de prospection sur-mesure",
    description: "Outil qui génère des séquences d'e-mails ultra-personnalisées et qui gère l'envoi et le suivi."
  },
  {
    title: "Outil d'analyse d'e-réputation automatisée",
    description: "Solution qui scrute avis, réseaux sociaux, forums pour donner un score et alerter sur les risques réputationnels."
  },
  {
    title: "Assistant IA pour freelances et solopreneurs",
    description: "Suite d'outils no code qui aide à la gestion quotidienne : devis, relances, gestion client, création de contenus, organisation."
  },
  {
    title: "Plateforme de gestion automatisée de newsletters",
    description: "Création, personnalisation, envoi et analyse de newsletters, segmentées selon l'audience."
  },
  {
    title: "Automatisation du reporting et des tableaux de bord",
    description: "Outil no code qui récupère les données clés (finance, web, CRM…), les synthétise et alimente des dashboards dynamiques."
  },
  {
    title: "Générateur d'idées de contenus/produits",
    description: "IA qui suggère des idées de contenus, produits, offres à partir de tendances, mots-clés ou objectifs business."
  },
  {
    title: "Service d'automatisation du recrutement sur LinkedIn",
    description: "Envoi automatisé de messages, suivi, prise de RDV, scoring des candidats."
  },
  {
    title: "Plateforme de recommandation personnalisée (produits/services)",
    description: "IA qui analyse le comportement client pour pousser les offres adaptées (cross-sell, up-sell…)."
  },
  {
    title: "Outil de gestion automatique des avis clients",
    description: "Collecte, modération et publication automatisées des avis sur différents canaux."
  },
  {
    title: "Optimisation automatique du SEO et des contenus web",
    description: "Plateforme qui analyse le site, propose des optimisations (titres, meta, structure, backlinks) et génère des textes SEO."
  }
];

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

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OPENAI_API_KEY is not set');
    }

    const systemPrompt = `Tu es un assistant expert qui aide les clients à comprendre nos 30 solutions d'IA et d'automatisation. Tu dois répondre uniquement en français et de manière professionnelle mais accessible.

Voici notre catalogue de 30 produits/solutions :

${PRODUCTS_DATA.map((product, index) => `${index + 1}. ${product.title}\n   Description: ${product.description}`).join('\n\n')}

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