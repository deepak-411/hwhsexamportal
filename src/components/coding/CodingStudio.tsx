'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Play, Send, ChevronRight, Code2, Terminal, Info, Layout } from 'lucide-react';
import { CodingProblem } from '@/lib/coding-problems';
import { useToast } from '@/hooks/use-toast';
import { getCurrentUser } from '@/lib/user-store';
import { sendCodingSubmission } from '@/ai/flows/send-coding-submission-email';

export default function CodingStudio({ problem }: { problem: CodingProblem }) {
  const [userCode, setUserCode] = useState(problem.initialCode);
  const [output, setOutput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { toast } = useToast();

  const handleRun = () => {
    if (problem.language === 'html') {
      if (iframeRef.current) {
        const doc = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document;
        if (doc) {
          doc.open();
          doc.write(userCode);
          doc.close();
        }
      }
      setOutput('HTML Preview Updated.');
    } else {
      // Simple Python Mock for MVP
      setOutput(`>>> Running Python Script...\n${userCode.includes('print') ? 'Execution successful. Output simulated based on logic.' : 'Error: No print statement found.'}`);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const user = getCurrentUser();
    if (!user) return;

    try {
      const result = await sendCodingSubmission({
        student: user,
        problemTitle: problem.title,
        language: problem.language,
        code: userCode,
        output: output
      });

      if (result.success) {
        toast({ title: "Submission Received!", description: "Your code has been sent to faculty for evaluation." });
      } else {
        throw new Error();
      }
    } catch (e) {
      toast({ variant: "destructive", title: "Email Failed", description: "Submission failed. Please check your connection." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] gap-4 p-4">
      <div className="flex-1 flex gap-4 overflow-hidden">
        {/* Left Side: Problem & Reference */}
        <div className="w-1/3 flex flex-col gap-4 overflow-hidden">
          <Card className="flex-1 flex flex-col overflow-hidden">
            <CardHeader className="bg-primary/5 py-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Info className="h-4 w-4" /> Problem Description
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-auto pt-4 text-sm leading-relaxed">
              <h2 className="font-bold text-lg mb-2">{problem.title}</h2>
              <p className="text-muted-foreground mb-6">{problem.description}</p>
              
              <div className="space-y-2">
                <p className="font-bold flex items-center gap-2 text-primary">
                  <Layout className="h-4 w-4"/> Expected Reference Code
                </p>
                <div className="bg-muted p-4 rounded-md font-mono text-xs whitespace-pre-wrap border border-primary/20">
                  {problem.referenceCode}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Side: Editor & Runner */}
        <div className="flex-1 flex flex-col gap-4 overflow-hidden">
          <Card className="flex-1 flex flex-col overflow-hidden">
            <CardHeader className="bg-card flex flex-row items-center justify-between py-3 border-b">
              <div className="flex items-center gap-2">
                <Code2 className="h-5 w-5 text-primary" />
                <span className="font-bold uppercase tracking-wider">{problem.language} Editor</span>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleRun}>
                  <Play className="h-4 w-4 mr-2" /> Run
                </Button>
                <Button size="sm" onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : <><Send className="h-4 w-4 mr-2" /> Submit Code</>}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-0 flex flex-col overflow-hidden">
              <Textarea 
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                className="flex-1 font-mono text-sm p-4 bg-muted/30 border-none focus-visible:ring-0 resize-none"
                placeholder="Start coding here..."
              />
            </CardContent>
          </Card>

          {/* Result Panel */}
          <Card className="h-1/3 flex flex-col overflow-hidden">
            <CardHeader className="bg-muted py-2 border-b">
              <CardTitle className="text-xs font-bold flex items-center gap-2 uppercase tracking-widest text-muted-foreground">
                <Terminal className="h-3 w-3" /> Console Output / Preview
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-0 overflow-hidden bg-white text-black relative">
              {problem.language === 'html' ? (
                <iframe ref={iframeRef} className="w-full h-full border-none" title="Output Preview" />
              ) : (
                <div className="p-4 font-mono text-sm whitespace-pre-wrap h-full bg-[#1e1e1e] text-green-400">
                  {output || 'Waiting for execution...'}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
