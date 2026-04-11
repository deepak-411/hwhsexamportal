'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Play, Send, Code2, Terminal, Info, Layout } from 'lucide-react';
import { CodingProblem } from '@/lib/coding-problems';
import { useToast } from '@/hooks/use-toast';
import { getCurrentUser } from '@/lib/user-store';
import { sendCodingSubmission } from '@/ai/flows/send-coding-submission-email';
import { storeCodingSubmission } from '@/lib/exam-store';

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
      // Python Simulation
      const simulatedOutput = `>>> Running Python Script...\n${
        userCode.includes('print') 
        ? "Execution successful. Output generated based on logic." 
        : "Warning: No output detected. Add print() statements."
      }`;
      setOutput(simulatedOutput);
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
        const studentId = `${user.rollNumber.padStart(2, '0')}-${user.class}-${user.section}`;
        storeCodingSubmission(studentId, {
          problemId: problem.id,
          problemTitle: problem.title,
          language: problem.language,
          code: userCode,
          timestamp: Date.now()
        });

        toast({ title: "Submission Received!", description: "Your code has been sent to faculty and recorded in your dashboard." });
      } else {
        throw new Error();
      }
    } catch (e) {
      toast({ variant: "destructive", title: "Submission Error", description: "Failed to send code. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] gap-4 p-4">
      <div className="flex-1 flex gap-4 overflow-hidden">
        <div className="w-1/3 flex flex-col gap-4 overflow-hidden">
          <Card className="flex-1 flex flex-col overflow-hidden">
            <CardHeader className="bg-primary/5 py-3">
              <CardTitle className="text-lg flex items-center gap-2"><Info className="h-4 w-4" /> Problem Description</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-auto pt-4 text-sm leading-relaxed">
              <h2 className="font-bold text-lg mb-2">{problem.title}</h2>
              <p className="text-muted-foreground mb-6">{problem.description}</p>
              <div className="space-y-2">
                <p className="font-bold flex items-center gap-2 text-primary"><Layout className="h-4 w-4"/> Reference Code Preview</p>
                <div className="bg-muted p-4 rounded-md font-mono text-[10px] whitespace-pre-wrap border border-primary/20 max-h-[300px] overflow-auto">
                  {problem.referenceCode}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex-1 flex flex-col gap-4 overflow-hidden">
          <Card className="flex-1 flex flex-col overflow-hidden">
            <CardHeader className="bg-card flex flex-row items-center justify-between py-3 border-b">
              <div className="flex items-center gap-2">
                <Code2 className="h-5 w-5 text-primary" />
                <span className="font-bold uppercase tracking-wider">{problem.language} Editor</span>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleRun}><Play className="h-4 w-4 mr-2" /> Run</Button>
                <Button size="sm" onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : <><Send className="h-4 w-4 mr-2" /> Submit</>}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-0 flex flex-col overflow-hidden">
              <Textarea value={userCode} onChange={(e) => setUserCode(e.target.value)} className="flex-1 font-mono text-sm p-4 bg-muted/30 border-none focus-visible:ring-0 resize-none" placeholder="Write your code here..." />
            </CardContent>
          </Card>

          <Card className="h-1/3 flex flex-col overflow-hidden">
            <CardHeader className="bg-muted py-2 border-b">
              <CardTitle className="text-xs font-bold flex items-center gap-2 uppercase tracking-widest text-muted-foreground"><Terminal className="h-3 w-3" /> Execution Output</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-0 overflow-hidden bg-white text-black relative">
              {problem.language === 'html' ? (
                <iframe ref={iframeRef} className="w-full h-full border-none" title="Output Preview" />
              ) : (
                <div className="p-4 font-mono text-sm whitespace-pre-wrap h-full bg-[#1e1e1e] text-green-400">{output || 'Waiting for execution...'}</div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
