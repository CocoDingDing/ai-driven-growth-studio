import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ExpertiseSection from "@/components/ExpertiseSection";
import ProductExamplesSection from "@/components/ProductExamplesSection";
import SurveySection from "@/components/SurveySection";
import ProductChatbot from "@/components/ProductChatbot";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <ExpertiseSection />
      <ProductExamplesSection />
      <SurveySection />
      <ProductChatbot />
    </div>
  );
};

export default Index;
