import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ProductsSection from "@/components/ProductsSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <ProductsSection />
    </div>
  );
};

export default Index;
