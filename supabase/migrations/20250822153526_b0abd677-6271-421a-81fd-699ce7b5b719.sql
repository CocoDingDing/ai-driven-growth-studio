-- Create products table to centralize the 30 solutions used by Survey and the Chatbot
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  position INTEGER NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS and allow public read-only access to active products
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Select policy: anyone can read active products
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'products' AND policyname = 'Public can read active products'
  ) THEN
    CREATE POLICY "Public can read active products"
    ON public.products
    FOR SELECT
    USING (active = true);
  END IF;
END $$;

-- Update trigger for updated_at
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'update_products_updated_at'
  ) THEN
    CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON public.products
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();
  END IF;
END $$;

-- Seed the 30 products (idempotent upsert by title)
INSERT INTO public.products (title, description, position, active)
VALUES
  ('Automatisation de la prospection commerciale', 'Système qui génère, qualifie et contacte automatiquement des leads via e-mail, LinkedIn ou SMS.', 1, true),
  ('Création de sites web en IA/No code', 'Création de sites webs optimisés, avec textes percutants, design léché et moderne, et SEO en rapidité éclair.', 2, true),
  ('Assistant virtuel personnalisé pour les TPE/PME', 'Développement d''assistants IA sur-mesure (prise de rendez-vous, gestion d''e-mails, automatisation des tâches administratives).', 3, true),
  ('Création de sites Webs en CRM (Gestion de la relation client) et/ou ERP (Gestion des ressources internes de l''entreprise, avec indicateurs)', 'Création de plateformes complètes et complexes pour gérer vos clients, suivi, facturation, prospects, livraisons, comptabilité…', 4, true),
  ('Génération de contenus automatisé', 'Plateforme qui crée automatiquement des posts LinkedIn, articles de blog ou newsletters à partir de prompts simples.', 5, true),
  ('Audit UX automatisé', 'Solution SaaS qui analyse un site web ou une appli et propose des recommandations UX grâce à l''IA.', 6, true),
  ('Création de chatbots sans code', 'Outil qui permet à toute entreprise de créer, entraîner et intégrer un chatbot sans compétences techniques.', 7, true),
  ('Génération d''images/visuels pour le marketing', 'Plateforme qui produit des visuels, bannières, carrousels ou vidéos courtes grâce à l''IA générative.', 8, true),
  ('Système de veille concurrentielle automatisée', 'Service qui surveille les concurrents (prix, nouveautés, contenus…) et envoie des alertes ou rapports synthétiques.', 9, true),
  ('Gestion automatisée de la facturation', 'Outil qui génère, envoie et suit les factures, relance les impayés et s''intègre à la comptabilité.', 10, true),
  ('Optimisation automatique de publicités en ligne', 'Solution qui ajuste en temps réel les campagnes Ads (Google, Meta, LinkedIn) pour maximiser les conversions.', 11, true),
  ('Analyse prédictive des ventes ou stocks', 'Application qui prédit les ventes, ruptures ou besoins de réapprovisionnement grâce au machine learning.', 12, true),
  ('Assistant RH automatisé', 'Recrutement automatisé : sourcing, tri de CV, préqualification, planification des entretiens.', 13, true),
  ('Création de parcours d''onboarding interactifs', 'Outil qui génère des parcours d''onboarding automatisés et personnalisés pour nouveaux employés ou clients.', 14, true),
  ('Automatisation du support client', 'Plateforme de gestion de tickets et réponses automatiques par IA, escalade vers humain si besoin.', 15, true),
  ('Outil de résumé automatique de documents', 'Solution qui synthétise rapports, procès-verbaux, études ou notes de réunions en quelques secondes.', 16, true),
  ('Assistant de génération d''offres commerciales personnalisées', 'Création automatique de propositions commerciales adaptées au profil et au besoin du prospect.', 17, true),
  ('Plateforme de formation en ligne générée par IA', 'Création et mise à jour automatisées de modules, quiz, évaluations selon le profil de l''apprenant.', 18, true),
  ('Automatisation de la gestion de rendez-vous', 'Service qui gère les prises de RDV, envoie des rappels automatiques et s''intègre aux calendriers.', 19, true),
  ('Marketplace de microservices automatisés', 'Place de marché proposant des mini-tâches automatisées (ex : nettoyage de base de données, vérification d''e-mails, extraction de données).', 20, true),
  ('Création d''emails de prospection sur-mesure', 'Outil qui génère des séquences d''e-mails ultra-personnalisées et qui gère l''envoi et le suivi.', 21, true),
  ('Outil d''analyse d''e-réputation automatisée', 'Solution qui scrute avis, réseaux sociaux, forums pour donner un score et alerter sur les risques réputationnels.', 22, true),
  ('Assistant IA pour freelances et solopreneurs', 'Suite d''outils no code qui aide à la gestion quotidienne : devis, relances, gestion client, création de contenus, organisation.', 23, true),
  ('Plateforme de gestion automatisée de newsletters', 'Création, personnalisation, envoi et analyse de newsletters, segmentées selon l''audience.', 24, true),
  ('Automatisation du reporting et des tableaux de bord', 'Outil no code qui récupère les données clés (finance, web, CRM…), les synthétise et alimente des dashboards dynamiques.', 25, true),
  ('Génération d''idées de contenus/produits', 'IA qui suggère des idées de contenus, produits, offres à partir de tendances, mots-clés ou objectifs business.', 26, true),
  ('Service d''automatisation du recrutement sur LinkedIn', 'Envoi automatisé de messages, suivi, prise de RDV, scoring des candidats.', 27, true),
  ('Plateforme de recommandation personnalisée (produits/services)', 'IA qui analyse le comportement client pour pousser les offres adaptées (cross-sell, up-sell…).', 28, true),
  ('Outil de gestion automatique des avis clients', 'Collecte, modération et publication automatisées des avis sur différents canaux.', 29, true),
  ('Optimisation automatique du SEO et des contenus web', 'Plateforme qui analyse le site, propose des optimisations (titres, meta, structure, backlinks) et génère des textes SEO.', 30, true)
ON CONFLICT (title) DO UPDATE SET
  description = EXCLUDED.description,
  position = EXCLUDED.position,
  active = EXCLUDED.active,
  updated_at = now();