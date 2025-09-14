import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Workflow from "@/components/Workflow";
import { CodeReview } from "@/components/CodeReview";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <CodeReview />
        <Features />
        <Workflow />
      </main>
    </div>
  );
};

export default Index;