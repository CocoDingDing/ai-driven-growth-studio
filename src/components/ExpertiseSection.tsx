const ExpertiseSection = () => {
  return (
    <section className="py-20 px-6 bg-gradient-card">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-cosmic bg-clip-text text-transparent">
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
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li>• Assistant virtuel personnalisé pour les TPE/PME</li>
              <li>• Génération de contenus automatisé</li>
              <li>• Audit UX automatisé</li>
              <li>• Génération d'images/visuels pour le marketing</li>
              <li>• Analyse prédictive des ventes ou stocks</li>
            </ul>
          </div>
          
          <div className="group bg-gray-800/90 backdrop-blur-sm border border-border/50 rounded-2xl p-8 text-left hover:bg-gray-700/90 transition-all duration-300">
            <div className="text-5xl mb-6 group-hover:scale-110 transition-smooth">
              ⚡
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">Automatisation</h3>
            <p className="text-muted-foreground mb-4">
              Automatisation complète de vos processus commerciaux, marketing et opérationnels pour maximiser votre efficacité.
            </p>
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li>• Automatisation de la prospection commerciale</li>
              <li>• Système de veille concurrentielle automatisée</li>
              <li>• Gestion automatisée de la facturation</li>
              <li>• Optimisation automatique de publicités en ligne</li>
              <li>• Automatisation du support client</li>
              <li className="font-medium">+7 autres produits</li>
            </ul>
          </div>
          
          <div className="group bg-gray-800/90 backdrop-blur-sm border border-border/50 rounded-2xl p-8 text-left hover:bg-gray-700/90 transition-all duration-300">
            <div className="text-5xl mb-6 group-hover:scale-110 transition-smooth">
              🛠️
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">Plateformes No-Code</h3>
            <p className="text-muted-foreground mb-4">
              Création rapide d'applications et plateformes complètes sans développement traditionnel.
            </p>
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li>• Création de sites Webs en CRM et/ou ERP</li>
              <li>• Création de sites web en IA/No code</li>
              <li>• Création de chatbots sans code</li>
              <li>• Création de parcours d'onboarding interactifs</li>
              <li>• Marketplace de microservices automatisés</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;