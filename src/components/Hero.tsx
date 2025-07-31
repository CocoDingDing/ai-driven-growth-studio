import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-pattern" />
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center pt-24">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Transformez Votre Business
            </h1>
            <h2 className="text-3xl md:text-5xl font-semibold text-foreground/90">
              avec l'IA & l'Automatisation
            </h2>
          </div>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Spécialistes en création de sites web, CRM, ERP et solutions d'automatisation sur-mesure. 
            Nous développons des outils No Code qui révolutionnent votre productivité.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
            <Button 
              size="lg" 
              className="bg-gradient-primary text-lg px-8 py-6 shadow-glow hover:shadow-lg transition-all duration-300 animate-glow"
              onClick={() => window.open('https://advice.typeform.com/to/DT7U0IZd', '_blank')}
            >
              Réserver un Appel Gratuit
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-6 border-primary/50 hover:bg-primary/10"
            >
              Découvrir nos Solutions
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">30+</div>
              <div className="text-muted-foreground">Solutions Disponibles</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <div className="text-muted-foreground">100% adapté à vos besoins</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">3 à 7 j</div>
              <div className="text-muted-foreground">Délai de Livraison</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;