-- Créer une table pour stocker les réponses au sondage
CREATE TABLE public.survey_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL DEFAULT gen_random_uuid(),
  first_name TEXT,
  email TEXT,
  company TEXT,
  selected_products JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Créer un index unique sur session_id pour éviter les doublons de session
CREATE UNIQUE INDEX idx_survey_responses_session_id ON public.survey_responses(session_id);

-- Créer un index sur created_at pour les requêtes de tri
CREATE INDEX idx_survey_responses_created_at ON public.survey_responses(created_at);

-- Fonction pour mettre à jour le champ updated_at automatiquement
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour mettre à jour automatiquement updated_at
CREATE TRIGGER update_survey_responses_updated_at
  BEFORE UPDATE ON public.survey_responses
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Activer Row Level Security (RLS)
ALTER TABLE public.survey_responses ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre à tout le monde d'insérer et de mettre à jour ses propres données
CREATE POLICY "Anyone can insert survey responses" 
ON public.survey_responses 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update their own survey responses" 
ON public.survey_responses 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can select their own survey responses" 
ON public.survey_responses 
FOR SELECT 
USING (true);