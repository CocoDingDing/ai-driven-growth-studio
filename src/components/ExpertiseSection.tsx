const aiSolutionsIcon = "/lovable-uploads/e411b46a-1649-4a65-9741-93bc0e8020a2.png";
const automationIcon = "/lovable-uploads/b36eb994-ffc7-4787-a860-1b34d96a7372.png";
const nocodeIcon = "/lovable-uploads/99f01a82-57d4-4a77-ba92-46f272d05bce.png";

const ExpertiseSection = () => {
  return (
    <section className="py-12 px-6 bg-gradient-card">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
            Notre Expertise
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Nous nous spécialisons dans trois domaines clés qui pilotent la transformation digitale
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="group bg-gray-800/90 backdrop-blur-sm border border-border/50 rounded-2xl p-8 text-left hover:bg-gray-700/90 transition-all duration-300">
            <div className="flex items-center justify-center mb-6 group-hover:scale-110 transition-smooth">
              <img src={aiSolutionsIcon} alt="Solutions IA" className="w-16 h-16" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-4">Solutions IA</h3>
            <p className="text-sm text-muted-foreground">
              Assistants virtuels intelligents et outils d'analyse automatisée pour transformer vos processus métier.
            </p>
          </div>
          
          <div className="group bg-gray-800/90 backdrop-blur-sm border border-border/50 rounded-2xl p-8 text-left hover:bg-gray-700/90 transition-all duration-300">
            <div className="flex items-center justify-center mb-6 group-hover:scale-110 transition-smooth">
              <img src={automationIcon} alt="Automatisation" className="w-16 h-16" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-4">Automatisation</h3>
            <p className="text-sm text-muted-foreground">
              Automatisation complète de vos processus commerciaux, marketing et opérationnels pour maximiser votre efficacité.
            </p>
          </div>
          
          <div className="group bg-gray-800/90 backdrop-blur-sm border border-border/50 rounded-2xl p-8 text-left hover:bg-gray-700/90 transition-all duration-300">
            <div className="flex items-center justify-center mb-6 group-hover:scale-110 transition-smooth">
              <img src={nocodeIcon} alt="Plateformes No-Code" className="w-16 h-16" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-4">Plateformes No-Code</h3>
            <p className="text-sm text-muted-foreground">
              Création rapide d'applications et plateformes complètes sans développement traditionnel.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;