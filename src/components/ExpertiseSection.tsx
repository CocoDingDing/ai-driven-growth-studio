const ExpertiseSection = () => {
  return (
    <section className="py-20 px-6 bg-gradient-card">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-muted-foreground">Notre </span>
            <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">Expertise</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Nous nous spécialisons dans trois domaines clés qui pilotent la transformation digitale
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-background/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 text-center hover:bg-background/70 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-primary rounded-xl mx-auto mb-6 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">Solutions IA</h3>
            <p className="text-muted-foreground">
              Assistants virtuels intelligents et outils d'analyse automatisée pour transformer vos processus métier.
            </p>
          </div>
          
          <div className="bg-background/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 text-center hover:bg-background/70 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-primary rounded-xl mx-auto mb-6 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">Automatisation</h3>
            <p className="text-muted-foreground">
              Automatisation complète de vos processus commerciaux, marketing et opérationnels pour maximiser votre efficacité.
            </p>
          </div>
          
          <div className="bg-background/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 text-center hover:bg-background/70 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-primary rounded-xl mx-auto mb-6 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">Plateformes No-Code</h3>
            <p className="text-muted-foreground">
              Création rapide d'applications et plateformes complètes sans développement traditionnel.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;