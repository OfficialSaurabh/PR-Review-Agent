import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CodeReviewRequest {
  code: string;
  language: string;
  filename?: string;
}

interface ReviewComment {
  line: number;
  type: 'quality' | 'bug' | 'security' | 'performance' | 'style';
  severity: 'info' | 'warning' | 'error';
  message: string;
  suggestion?: string;
}

serve(async (req) => {
  console.log('AI Code Review function called');
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { code, language, filename }: CodeReviewRequest = await req.json();
    console.log(`Reviewing ${language} code, ${code.length} characters`);

    if (!code || !language) {
      return new Response(
        JSON.stringify({ error: 'Code and language are required' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const systemPrompt = `You are a senior software engineer conducting a thorough code review. Analyze the provided ${language} code and identify issues in these categories:

1. **Quality**: Code structure, readability, maintainability
2. **Bugs**: Logical errors, potential runtime issues, edge cases
3. **Security**: Vulnerabilities, unsafe practices
4. **Performance**: Inefficient algorithms, resource usage
5. **Style**: Coding standards, naming conventions

For each issue found, provide:
- Line number (1-indexed)
- Type: quality|bug|security|performance|style  
- Severity: info|warning|error
- Clear message explaining the issue
- Actionable suggestion for improvement

Respond with a JSON array of review comments. If no issues are found, return an empty array.

Example format:
[
  {
    "line": 5,
    "type": "bug",
    "severity": "error", 
    "message": "Potential null pointer exception",
    "suggestion": "Add null check before accessing object properties"
  }
]`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Review this ${language} code${filename ? ` from ${filename}` : ''}:\n\n${code}` }
        ],
        max_tokens: 2000,
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      console.error('OpenAI API error:', response.status, response.statusText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('OpenAI response received');
    
    let reviewComments: ReviewComment[] = [];
    
    try {
      const aiResponse = data.choices[0].message.content;
      console.log('AI Response:', aiResponse);
      
      // Extract JSON from the response
      const jsonMatch = aiResponse.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        reviewComments = JSON.parse(jsonMatch[0]);
      } else {
        console.log('No JSON array found, returning empty array');
      }
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      reviewComments = [];
    }

    console.log(`Generated ${reviewComments.length} review comments`);

    return new Response(
      JSON.stringify({ 
        comments: reviewComments,
        summary: {
          total: reviewComments.length,
          errors: reviewComments.filter(c => c.severity === 'error').length,
          warnings: reviewComments.filter(c => c.severity === 'warning').length,
          info: reviewComments.filter(c => c.severity === 'info').length,
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in ai-code-review function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});