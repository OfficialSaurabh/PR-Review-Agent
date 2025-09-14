import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, GitPullRequest, Bot, MessageSquare, CheckCircle } from "lucide-react";

const Workflow = () => {
  const steps = [
    {
      icon: GitPullRequest,
      title: "Developer Submits PR",
      description: "Developer creates a pull request in GitHub, GitLab, or Bitbucket",
      detail: "Automatic webhook triggers our AI review process",
      color: "text-primary"
    },
    {
      icon: Bot,
      title: "AI Analysis Begins",
      description: "Multi-stage analysis covering quality, security, performance, and best practices",
      detail: "Static analysis + semantic understanding in seconds",
      color: "text-info"
    },
    {
      icon: MessageSquare,
      title: "Inline Comments Posted",
      description: "AI posts detailed suggestions directly on changed lines, just like a human reviewer",
      detail: "Contextual feedback with severity levels and explanations",
      color: "text-warning"
    },
    {
      icon: CheckCircle,
      title: "Review & Approval",
      description: "Developer addresses feedback, AI re-reviews, and approves when standards are met",
      detail: "Automatic re-review after fixes are pushed",
      color: "text-success"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            How It Works
          </Badge>
          <h2 className="text-4xl font-bold mb-4">
            Seamless Integration Into Your Workflow
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our AI code review assistant integrates directly into your existing development process, 
            providing instant feedback without disrupting your team's workflow.
          </p>
        </div>
        
        <div className="relative">
          {/* Connection lines */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 -translate-y-1/2 z-0"></div>
          
          <div className="grid lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="bg-card border-border hover:border-primary/20 transition-colors">
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-primary flex items-center justify-center mb-4`}>
                      <step.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <CardTitle className="text-lg">
                      {step.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground mb-3">
                      {step.description}
                    </p>
                    <div className="text-xs text-primary font-medium bg-primary/10 px-3 py-1 rounded-full">
                      {step.detail}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Arrow for large screens */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 -translate-y-1/2 z-20">
                    <ArrowRight className="h-6 w-6 text-primary" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-secondary border-border">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Code Reviews?</h3>
              <p className="text-muted-foreground mb-6">
                Join thousands of developers who've already improved their code quality and reduced review time by 50% with our AI assistant.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-primary text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity">
                  Start 30-Day Free Trial
                </button>
                <button className="border border-border px-6 py-3 rounded-lg font-medium hover:bg-secondary transition-colors">
                  Schedule Demo
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Workflow;