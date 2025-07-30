import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ExpertiseSection from "@/components/ExpertiseSection";
import ProductsSection from "@/components/ProductsSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <ExpertiseSection />
      <ProductsSection />
    </div>
  );
};

export default Index;
