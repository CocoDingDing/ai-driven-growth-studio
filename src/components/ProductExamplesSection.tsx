const ProductExamplesSection = () => {
  return (
    <section className="py-12 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-hero bg-clip-text text-transparent">
            Quelques exemples de nos produits :
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <ul className="text-lg text-muted-foreground space-y-4 text-left">
              <li className="flex items-start">
                <span className="text-accent mr-3 mt-1">•</span>
                Création de sites web en IA/No code
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-3 mt-1">•</span>
                Création de sites Webs en CRM et/ou ERP
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-3 mt-1">•</span>
                Automatisation de la prospection commerciale
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-3 mt-1">•</span>
                Optimisation automatique de publicités en ligne
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-3 mt-1">•</span>
                Création de chatbots sans code
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-3 mt-1">•</span>
                Assistant virtuel personnalisé pour les TPE/PME
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductExamplesSection;