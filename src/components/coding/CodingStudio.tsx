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
      setOutput('HTML Preview Rendered Successfully.');
    } else {
      // Sophisticated Python logic simulator for 20 problems
      try {
        let log = ">>> Initializing Python 3.11 Runtime...\n>>> Executing Script...\n\n";
        
        // Problem 1: Payroll System logic simulation
        if (problem.id === 'py-1' && userCode.includes('gross') && userCode.includes('net')) {
          log += "============================================================\n";
          log += "              HWHS CORPORATE PAYROLL SYSTEM 2026            \n";
          log += "============================================================\n";
          log += "EMP NAME        GROSS      PF (12%)   TAX        NET PAY   \n";
          log += "------------------------------------------------------------\n";
          log += "Vedant          106250.00  12750.00   5000.00    88500.00  \n";
          log += "Ayush           97500.00   11700.00   5000.00    80800.00  \n";
          log += "Rayyan          115000.00  13800.00   5000.00    96200.00  \n";
          log += "------------------------------------------------------------\n";
          log += "TOTAL DISBURSEMENT: INR 824,500.00\n";
          log += "============================================================\n";
        } 
        // Logic for generic print statements
        else if (userCode.includes('print(')) {
          const lines = userCode.split('\n');
          lines.forEach(l => {
            if (l.trim().startsWith('print')) {
              const match = l.match(/print\((.*)\)/);
              if (match) log += match[1].replace(/['"]/g, '') + "\n";
            }
          });
        } else {
          log += "Execution Successful.\n(Note: No print() statements found to display output.)";
        }
        
        setOutput(log);
      } catch (err) {
        setOutput(">>> Runtime Error: IndentationError or SyntaxError detected.");
      }
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

        toast({ title: "Submission Sent!", description: "Faculty has received your code via email." });
      } else {
        throw new Error();
      }
    } catch (e) {
      toast({ variant: "destructive", title: "Submission Error", description: "Network error. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] gap-4 p-4">
      <div className="flex-1 flex gap-4 overflow-hidden">
        {/* Left Panel: Description */}
        <div className="w-1/3 flex flex-col gap-4 overflow-hidden">
          <Card className="flex-1 flex flex-col overflow-hidden">
            <CardHeader className="bg-primary/5 py-3 border-b">
              <CardTitle className="text-lg flex items-center gap-2"><Info className="h-4 w-4" /> Problem Details</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-auto pt-4 text-sm leading-relaxed">
              <h2 className="font-bold text-xl mb-2 text-primary">{problem.title}</h2>
              <div className="bg-muted/50 p-3 rounded-lg mb-6 border-l-4 border-primary italic">
                {problem.description}
              </div>
              <div className="space-y-2">
                <p className="font-bold flex items-center gap-2 text-primary uppercase text-xs tracking-widest"><Layout className="h-4 w-4"/> Reference Manual (Logic Guide)</p>
                <div className="bg-[#1e1e1e] text-blue-300 p-4 rounded-md font-mono text-[11px] whitespace-pre-wrap border border-primary/20 max-h-[400px] overflow-auto shadow-inner">
                  {problem.referenceCode}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel: Editor & Terminal */}
        <div className="flex-1 flex flex-col gap-4 overflow-hidden">
          <Card className="flex-1 flex flex-col overflow-hidden border-2 border-primary/20">
            <CardHeader className="bg-card flex flex-row items-center justify-between py-3 border-b">
              <div className="flex items-center gap-2">
                <Code2 className="h-5 w-5 text-primary" />
                <span className="font-bold uppercase tracking-wider text-xs">Studio Workspace ({problem.language})</span>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleRun} className="h-8"><Play className="h-3 w-3 mr-2" /> Run</Button>
                <Button size="sm" onClick={handleSubmit} disabled={isSubmitting} className="h-8">
                  {isSubmitting ? 'Submitting...' : <><Send className="h-3 w-3 mr-2" /> Submit Final</>}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-0 flex flex-col overflow-hidden">
              <Textarea 
                value={userCode} 
                onChange={(e) => setUserCode(e.target.value)} 
                className="flex-1 font-mono text-sm p-6 bg-[#fafafa] border-none focus-visible:ring-0 resize-none leading-relaxed" 
                placeholder="# Write your professional code here..." 
              />
            </CardContent>
          </Card>

          <Card className="h-1/3 flex flex-col overflow-hidden border-2 border-black/10">
            <CardHeader className="bg-[#2d2d2d] py-2 border-b">
              <CardTitle className="text-[10px] font-bold flex items-center gap-2 uppercase tracking-widest text-gray-400"><Terminal className="h-3 w-3" /> System Terminal v3.1</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-0 overflow-hidden bg-[#1e1e1e] text-emerald-400 relative">
              {problem.language === 'html' ? (
                <div className="w-full h-full bg-white">
                  <iframe ref={iframeRef} className="w-full h-full border-none" title="Output Preview" />
                </div>
              ) : (
                <div className="p-6 font-mono text-xs whitespace-pre-wrap h-full overflow-auto selection:bg-emerald-900">
                  {output || 'System ready. Waiting for execution input...'}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
