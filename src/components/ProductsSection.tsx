import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";

const products = [
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

const ProductsSection = () => {
  return (
    <section id="products" className="py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Nos 30 Solutions IA & Automatisation
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez notre catalogue complet de solutions No Code pour transformer votre business
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              title={product.title}
              description={product.description}
              number={index + 1}
            />
          ))}
        </div>
        
        <div className="text-center mt-16">
          <div className="bg-gradient-card border border-border/50 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Prêt à transformer votre business ?
            </h3>
            <p className="text-muted-foreground mb-6">
              Réservez un appel gratuit pour discuter de vos besoins et découvrir comment nos solutions peuvent vous aider.
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-primary text-lg px-8 py-6 shadow-glow hover:shadow-lg transition-all duration-300"
              onClick={() => window.open('https://advice.typeform.com/to/DT7U0IZd', '_blank')}
            >
              Réserver un Appel Gratuit
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;