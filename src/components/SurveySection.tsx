import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { supabase } from "@/integrations/supabase/client";

const products = [
  {
    title: "Création de sites Webs en CRM et/ou ERP",
    description: "Création de plateformes complètes et complexes pour gérer vos clients, suivi, facturation, prospects, livraisons, comptabilité…"
  },
  {
    title: "Assistant virtuel personnalisé pour les TPE/PME",
    description: "Développement d'assistants IA sur-mesure (prise de rendez-vous, gestion d'e-mails, automatisation des tâches administratives)."
  },
  {
    title: "Automatisation de la prospection commerciale",
    description: "Système qui génère, qualifie et contacte automatiquement des leads via e-mail, LinkedIn ou SMS."
  },
  {
    title: "Création de sites web en IA/No code",
    description: "Création de sites webs optimisés, avec textes percutants, design léché et moderne, et SEO en rapidité éclair."
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

const SurveySection = () => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [sessionId] = useState(() => crypto.randomUUID());
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Fonction pour sauvegarder les données sur Supabase
  const saveToSupabase = async () => {
    try {
      const selectedProductTitles = selectedProducts.map(i => products[i].title);
      
      // Use upsert for consistency with Survey page
      const { error } = await supabase
        .from('survey_responses')
        .upsert({
          session_id: sessionId,
          first_name: firstName || null,
          email: email || null,
          company: company || null,
          selected_products: selectedProductTitles,
        }, {
          onConflict: 'session_id'
        });

      if (error) {
        console.error('Erreur lors de la sauvegarde:', error);
        // Database validation errors will be caught here
        if (error.message.includes('Invalid email format')) {
          console.warn('Email format invalide détecté');
        }
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  };

  // Sauvegarder automatiquement après chaque changement (avec délai)
  const debouncedSave = () => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    saveTimeoutRef.current = setTimeout(saveToSupabase, 500);
  };

  // Sauvegarder quand firstName, email, company ou selectedProducts changent
  useEffect(() => {
    if (firstName) { // Ne sauvegarder que si le prénom est renseigné
      debouncedSave();
    }
  }, [firstName, email, company, selectedProducts]);

  // Nettoyer le timeout au démontage du composant
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  const toggleProduct = (index: number) => {
    setSelectedProducts(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const toggleOpen = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    setSubmitting(true);
    const selectedProductTitles = selectedProducts.map(i => products[i].title);
    await saveToSupabase();
    const { error } = await supabase.functions.invoke('send-survey-email', {
      body: {
        firstName,
        email,
        company,
        selectedProducts: selectedProductTitles,
        sessionId,
      },
    });
    if (error) throw error;
    setSubmitted(true);
  } catch (err) {
    console.error('Erreur lors de l’envoi du sondage:', err);
  } finally {
    setSubmitting(false);
  }
};

  return (
    <section id="contact" className="py-20 px-6 bg-background">
      <div id="survey" className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
            Sondage / Nos produits:<br />
            Quel type de solutions IA / Automatisation vous apporteraient le plus de valeur?
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Prénom */}
          <Card>
            <CardHeader>
              <CardTitle>Informations personnelles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="mt-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Liste visible sans attendre le prénom */}
          <>
              {/* Liste des produits */}
              <Card>
                <CardHeader>
                  <CardTitle>Sélectionnez les solutions qui vous intéressent</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {products.map((product, index) => (
                      <Collapsible key={index} open={openItems.includes(index)} onOpenChange={() => toggleOpen(index)}>
                        <div className="border border-border/50 rounded-lg p-4 hover:border-primary/50 transition-colors">
                          <div className="flex items-center space-x-3">
                            <Checkbox
                              id={`product-${index}`}
                              checked={selectedProducts.includes(index)}
                              onCheckedChange={() => toggleProduct(index)}
                            />
                            <CollapsibleTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="p-1 h-auto"
                              >
                                {openItems.includes(index) ? (
                                  <ChevronUp size={16} />
                                ) : (
                                  <ChevronDown size={16} />
                                )}
                              </Button>
                            </CollapsibleTrigger>
                            <div className="flex-1">
                              <Label 
                                htmlFor={`product-${index}`}
                                className="font-medium cursor-pointer flex items-center space-x-2"
                              >
                                <span className="text-primary font-bold">{index + 1}.</span>
                                <span>{product.title}</span>
                              </Label>
                            </div>
                          </div>
                          <CollapsibleContent className="mt-3 ml-12">
                            <p className="text-sm text-muted-foreground">
                              {product.description}
                            </p>
                          </CollapsibleContent>
                        </div>
                      </Collapsible>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Informations de contact */}
              <Card>
                <CardHeader>
                  <CardTitle>Informations de contact</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email">Adresse email (optionnel)</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="company">Nom de l'entreprise (optionnel)</Label>
                      <Input
                        id="company"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="mt-2"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Bouton d'envoi */}
<div className="text-center">
  <Button 
    type="submit" 
    size="lg"
    className="bg-gradient-primary text-lg px-8 py-6 shadow-glow hover:shadow-lg transition-all duration-300"
    disabled={!firstName || submitting}
  >
    {submitting ? 'Envoi…' : 'Envoyer'}
  </Button>
  {submitted && (
    <p className="mt-4 text-sm text-muted-foreground">
      Nous avons bien reçu les réponses de votre sondage. Merci beaucoup.
    </p>
  )}
</div>
          </>
        </form>
        
        <div className="text-center mt-16">
          <div className="bg-gradient-card border border-border/50 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Prêt à transformer votre business ?
            </h3>
            <p className="text-muted-foreground mb-6">
              Réservez un appel gratuit pour discuter de vos besoins et découvrir comment nos solutions peuvent vous aider.
            </p>
            <Button 
              variant="hero"
              size="lg" 
              className="text-lg px-8 h-[4.5rem] w-[272px]"
              onClick={() => window.open('https://calendly.com/mathieu777/15min', '_blank')}
            >
              Consultation gratuite
            </Button>
            <p className="text-sm text-muted-foreground mt-6">
              Pour toute information, contacter{" "}
              <a 
                href="mailto:mathieu.hourteillan@gmail.com" 
                className="text-[#2C6CF3] hover:text-[#1e57d9] transition-colors underline"
              >
                mathieu.hourteillan@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SurveySection;