import { Button } from "@/components/ui/button";
import CosmicBackground from "@/components/CosmicBackground";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Cosmic background */}
      <CosmicBackground />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center pt-24">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-hero bg-clip-text text-transparent">
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
              variant="hero"
              size="lg" 
              className="text-lg px-8 h-[4.5rem] w-[272px]"
              onClick={() => window.open('https://advice.typeform.com/to/DT7U0IZd', '_blank')}
            >
              Consultation gratuite
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 h-[4.5rem] w-[272px] border-accent/50 hover:bg-accent/10 text-foreground hover:text-accent"
              onClick={() => document.getElementById('survey')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Découvrir nos Solutions
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 mb-9">
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-2">30+</div>
              <div className="text-muted-foreground">Solutions Disponibles</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-2">70%</div>
              <div className="text-muted-foreground">d'Economies</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-2">2 X</div>
              <div className="text-muted-foreground">Temps gagné</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;