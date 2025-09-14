import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, CheckCircle, Info, Zap, Shield, Code, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface ReviewComment {
  line: number;
  type: 'quality' | 'bug' | 'security' | 'performance' | 'style';
  severity: 'info' | 'warning' | 'error';
  message: string;
  suggestion?: string;
}

interface ReviewSummary {
  total: number;
  errors: number;
  warnings: number;
  info: number;
}

const SUPPORTED_LANGUAGES = [
  'javascript', 'typescript', 'python', 'java', 'go', 'rust', 'cpp', 'c', 'csharp', 'php', 'ruby', 'swift'
];

const getSeverityIcon = (severity: string) => {
  switch (severity) {
    case 'error': return <AlertCircle className="w-4 h-4 text-destructive" />;
    case 'warning': return <AlertCircle className="w-4 h-4 text-warning" />;
    case 'info': return <Info className="w-4 h-4 text-info" />;
    default: return <Info className="w-4 h-4" />;
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'bug': return <AlertCircle className="w-4 h-4" />;
    case 'security': return <Shield className="w-4 h-4" />;
    case 'performance': return <Zap className="w-4 h-4" />;
    case 'quality': return <CheckCircle className="w-4 h-4" />;
    case 'style': return <Code className="w-4 h-4" />;
    default: return <Code className="w-4 h-4" />;
  }
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'error': return 'destructive';
    case 'warning': return 'warning';
    case 'info': return 'secondary';
    default: return 'secondary';
  }
};

export const CodeReview = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('');
  const [filename, setFilename] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [comments, setComments] = useState<ReviewComment[]>([]);
  const [summary, setSummary] = useState<ReviewSummary | null>(null);

  const handleAnalyze = async () => {
    if (!code.trim() || !language) {
      toast({
        title: "Missing Information",
        description: "Please provide both code and select a language.",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    setComments([]);
    setSummary(null);

    try {
      const { data, error } = await supabase.functions.invoke('ai-code-review', {
        body: { code, language, filename }
      });

      if (error) {
        throw error;
      }

      setComments(data.comments || []);
      setSummary(data.summary || null);

      if (data.comments?.length === 0) {
        toast({
          title: "Great Code!",
          description: "No issues found in your code review.",
          variant: "default"
        });
      } else {
        toast({
          title: "Review Complete",
          description: `Found ${data.summary?.total || 0} suggestions for improvement.`,
          variant: "default"
        });
      }
    } catch (error) {
      console.error('Code review error:', error);
      toast({
        title: "Review Failed", 
        description: "Failed to analyze code. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const codeLines = code.split('\n');

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            AI Code Review Demo
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Submit your code and get instant AI-powered feedback on quality, bugs, security, and performance.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Code Input Panel */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5" />
                Code Submission
              </CardTitle>
              <CardDescription>
                Paste your code and select the programming language for analysis.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {SUPPORTED_LANGUAGES.map(lang => (
                        <SelectItem key={lang} value={lang}>
                          {lang.charAt(0).toUpperCase() + lang.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <Input
                    placeholder="filename.ext (optional)"
                    value={filename}
                    onChange={(e) => setFilename(e.target.value)}
                  />
                </div>
              </div>
              
              <Textarea
                placeholder="Paste your code here..."
                value={code}
                onChange={(e) => setCode(e.target.value)}
                rows={15}
                className="font-mono text-sm"
              />
              
              <Button 
                onClick={handleAnalyze}
                disabled={isAnalyzing || !code.trim() || !language}
                className="w-full"
                size="lg"
              >
                {isAnalyzing && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {isAnalyzing ? 'Analyzing Code...' : 'Start AI Review'}
              </Button>
            </CardContent>
          </Card>

          {/* Review Results Panel */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Review Results
              </CardTitle>
              <CardDescription>
                AI-generated inline comments and suggestions for your code.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {summary && (
                <div className="mb-6 p-4 bg-muted rounded-lg">
                  <h3 className="font-semibold mb-3">Review Summary</h3>
                  <div className="flex gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <Badge variant="destructive">{summary.errors}</Badge> Errors
                    </span>
                    <span className="flex items-center gap-1">
                      <Badge variant="warning">{summary.warnings}</Badge> Warnings
                    </span>
                    <span className="flex items-center gap-1">
                      <Badge variant="secondary">{summary.info}</Badge> Info
                    </span>
                  </div>
                </div>
              )}

              <div className="space-y-4 max-h-96 overflow-y-auto">
                {comments.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">
                    {isAnalyzing ? 'Analyzing your code...' : 'No review results yet. Submit code to get started.'}
                  </div>
                ) : (
                  comments.map((comment, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant={getSeverityColor(comment.severity)} className="text-xs">
                            Line {comment.line}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {getTypeIcon(comment.type)}
                            {comment.type}
                          </Badge>
                        </div>
                        {getSeverityIcon(comment.severity)}
                      </div>
                      
                      <p className="text-sm font-medium">{comment.message}</p>
                      
                      {comment.suggestion && (
                        <div className="bg-muted p-3 rounded text-sm">
                          <strong>Suggestion:</strong> {comment.suggestion}
                        </div>
                      )}
                      
                      {code && comment.line <= codeLines.length && (
                        <div className="bg-card border rounded p-2">
                          <code className="text-xs text-muted-foreground">
                            {codeLines[comment.line - 1]?.trim()}
                          </code>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};