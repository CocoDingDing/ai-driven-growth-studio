import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { supabase } from "@/integrations/supabase/client";
import { useProducts } from "@/hooks/useProducts";

const Survey = () => {
  const { products, loading } = useProducts();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [sessionId] = useState(() => crypto.randomUUID());
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Fonction pour sauvegarder les données sur Supabase
  const saveToSupabase = async () => {
    try {
      // Use upsert for the Survey page to allow updating existing responses
      const { error } = await supabase
        .from('survey_responses')
        .upsert({
          session_id: sessionId,
          first_name: firstName || null,
          email: email || null,
          company: company || null,
          selected_products: selectedProducts,
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

  const toggleProduct = (productTitle: string) => {
    setSelectedProducts(prev => 
      prev.includes(productTitle) 
        ? prev.filter(title => title !== productTitle)
        : [...prev, productTitle]
    );
  };

  const toggleOpen = (productId: string) => {
    setOpenItems(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await saveToSupabase();
      const { error } = await supabase.functions.invoke('send-survey-email', {
        body: {
          firstName,
          email,
          company,
          selectedProducts,
          sessionId,
        },
      });
      if (error) throw error;
      setSubmitted(true);
    } catch (err) {
      console.error("Erreur lors de l'envoi du sondage:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Sondage :<br />
            Quel type de solutions IA / Automatisation vous apporteraient le plus de valeur?
          </h1>
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
                  <Label htmlFor="firstName">Prénom *</Label>
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

          {firstName && (
            <>
              {/* Liste des produits */}
              <Card>
                <CardHeader>
                  <CardTitle>Sélectionnez les solutions qui vous intéressent</CardTitle>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">Chargement des solutions...</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {products.map((product) => (
                        <Collapsible key={product.id} open={openItems.includes(product.id)} onOpenChange={() => toggleOpen(product.id)}>
                          <div className="border border-border/50 rounded-lg p-4 hover:border-primary/50 transition-colors">
                            <div className="flex items-center space-x-3">
                              <Checkbox
                                id={`product-${product.id}`}
                                checked={selectedProducts.includes(product.title)}
                                onCheckedChange={() => toggleProduct(product.title)}
                              />
                              <CollapsibleTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="p-1 h-auto"
                                >
                                  {openItems.includes(product.id) ? (
                                    <ChevronUp size={16} />
                                  ) : (
                                    <ChevronDown size={16} />
                                  )}
                                </Button>
                              </CollapsibleTrigger>
                              <div className="flex-1">
                                <Label 
                                  htmlFor={`product-${product.id}`}
                                  className="font-medium cursor-pointer flex items-center space-x-2"
                                >
                                  <span className="text-primary font-bold">{product.position}.</span>
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
                  )}
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
          )}
        </form>
      </div>
    </div>
  );
};

export default Survey;