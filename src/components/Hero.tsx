import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, CheckCircle, AlertTriangle, Info } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-primary opacity-10"></div>
      
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                AI-Powered
                <span className="bg-gradient-primary bg-clip-text text-transparent"> Code Reviews</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Industry-level code review assistant that integrates seamlessly with your GitHub, GitLab, and Bitbucket workflows. Get instant feedback on quality, security, and performance.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90 transition-opacity">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="border-border hover:bg-secondary">
                View Demo
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">99.9%</div>
                <div className="text-sm text-muted-foreground">Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">50%</div>
                <div className="text-sm text-muted-foreground">Faster Reviews</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Available</div>
              </div>
            </div>
          </div>
          
          {/* Demo Card */}
          <div className="relative">
            <Card className="p-6 bg-code-bg border-border">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Pull Request #1247</h3>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="text-sm text-success">2 approved</span>
                  </div>
                </div>
                
                <div className="bg-background rounded-lg p-4 font-mono text-sm">
                  <div className="text-muted-foreground mb-2">src/utils/api.ts</div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-3">
                      <span className="text-destructive">-</span>
                      <span className="text-muted-foreground">const data = await fetch(url)</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-success">+</span>
                      <span>const response = await fetch(url)</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-success">+</span>
                      <span>if (!response.ok) throw new Error("Request failed")</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-warning/10 border border-warning/20 rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <div className="font-medium text-warning">AI Suggestion</div>
                    <div className="text-muted-foreground mt-1">
                      Add error handling for failed API responses to prevent runtime crashes.
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-info/10 border border-info/20 rounded-lg">
                  <Info className="h-4 w-4 text-info mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <div className="font-medium text-info">Performance Tip</div>
                    <div className="text-muted-foreground mt-1">
                      Consider adding request timeout to prevent hanging connections.
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-success/20 p-2 rounded-full">
              <CheckCircle className="h-6 w-6 text-success" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;