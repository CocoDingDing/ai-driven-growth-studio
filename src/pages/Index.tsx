import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ExpertiseSection from "@/components/ExpertiseSection";
import SurveySection from "@/components/SurveySection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <ExpertiseSection />
      <SurveySection />
    </div>
  );
};

export default Index;
