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
            <div className="text-5xl mb-6 group-hover:scale-110 transition-smooth">
              🤖
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">Solutions IA</h3>
            <p className="text-muted-foreground mb-4">
              Assistants virtuels intelligents et outils d'analyse automatisée pour transformer vos processus métier.
            </p>
          </div>
          
          <div className="group bg-gray-800/90 backdrop-blur-sm border border-border/50 rounded-2xl p-8 text-left hover:bg-gray-700/90 transition-all duration-300">
            <div className="text-5xl mb-6 group-hover:scale-110 transition-smooth">
              ⚡
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">Automatisation</h3>
            <p className="text-muted-foreground mb-4">
              Automatisation complète de vos processus commerciaux, marketing et opérationnels pour maximiser votre efficacité.
            </p>
          </div>
          
          <div className="group bg-gray-800/90 backdrop-blur-sm border border-border/50 rounded-2xl p-8 text-left hover:bg-gray-700/90 transition-all duration-300">
            <div className="text-5xl mb-6 group-hover:scale-110 transition-smooth">
              🛠️
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">Plateformes No-Code</h3>
            <p className="text-muted-foreground mb-4">
              Création rapide d'applications et plateformes complètes sans développement traditionnel.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;