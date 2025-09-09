import { Button } from "@/components/ui/button";

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-hero rounded-lg"></div>
            <button 
              className="text-xl text-foreground hover:text-accent transition-colors cursor-pointer"
              style={{ fontWeight: 670 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              AI adoption
            </button>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="#services" 
              className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('services');
                if (element) {
                  const offsetTop = element.offsetTop - 80;
                  window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                }
              }}
            >
              Services
            </a>
            <a 
              href="#survey" 
              className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('survey');
                if (element) {
                  const offsetTop = element.offsetTop - 80;
                  window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                }
              }}
            >
              Sondage / Nos produits
            </a>
            <a 
              href="#contact" 
              className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('contact');
                if (element) {
                  const offsetTop = element.offsetTop - 80;
                  window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                }
              }}
            >
              Contact
            </a>
          </div>
          
          <Button 
            variant="hero"
            onClick={() => window.open('https://advice.typeform.com/to/DT7U0IZd', '_blank')}
          >
            Réserver un Appel
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;