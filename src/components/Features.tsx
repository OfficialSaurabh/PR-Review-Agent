import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Zap, 
  Bug, 
  TestTube, 
  Code, 
  Target,
  GitBranch,
  Clock
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Code,
      title: "Code Quality & Standards",
      description: "Automated checks for linting rules, naming conventions, and project guidelines across all major languages.",
      tags: ["ESLint", "Pylint", "SonarQube"],
      color: "text-primary"
    },
    {
      icon: Bug,
      title: "Bug & Logic Detection",
      description: "Identify null checks, exception handling gaps, resource leaks, and performance bottlenecks before they reach production.",
      tags: ["Static Analysis", "Pattern Recognition"],
      color: "text-destructive"
    },
    {
      icon: Shield,
      title: "Security Scanning",
      description: "Comprehensive security analysis flagging insecure functions, SQL injection risks, and hardcoded secrets.",
      tags: ["OWASP", "SEI CERT", "SAST"],
      color: "text-warning"
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Detect N+1 queries, unnecessary computations, and suggest caching strategies for optimal performance.",
      tags: ["Query Analysis", "Async Patterns"],
      color: "text-info"
    },
    {
      icon: TestTube,
      title: "Test Coverage Analysis",
      description: "Ensure new code paths have proper unit and integration tests, suggesting missing edge cases.",
      tags: ["Unit Tests", "Coverage Reports"],
      color: "text-success"
    },
    {
      icon: Target,
      title: "Smart Context Awareness",
      description: "Only reviews new/changed code while understanding the broader codebase context for accurate suggestions.",
      tags: ["Diff Analysis", "Context Learning"],
      color: "text-primary"
    },
    {
      icon: GitBranch,
      title: "Seamless Integration",
      description: "Works natively with GitHub, GitLab, and Bitbucket through webhooks and CI/CD pipeline integration.",
      tags: ["GitHub Actions", "GitLab CI", "Webhooks"],
      color: "text-info"
    },
    {
      icon: Clock,
      title: "Instant Feedback",
      description: "Get review comments within seconds of pushing code, with severity levels and actionable suggestions.",
      tags: ["Real-time", "Inline Comments"],
      color: "text-success"
    }
  ];

  return (
    <section className="py-20 bg-gradient-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Enterprise-Grade Code Review
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our AI-powered assistant provides comprehensive code analysis with industry-leading accuracy, 
            helping teams ship better code faster while maintaining security and performance standards.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur-sm border-border hover:bg-card/80 transition-colors">
              <CardHeader className="pb-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-secondary flex items-center justify-center mb-3`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-lg font-semibold">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {feature.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {feature.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">SOC 2 Compliant • GDPR Ready • Enterprise Security</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;