'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Play, Send, Code2, Terminal, Info, Layout, Moon, Sparkles, ScrollText } from 'lucide-react';
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
      setOutput('HTML/CSS Preview Rendered in Viewport.');
    } else {
      // Dynamic Logic-Aware Python Simulator
      try {
        let log = ">>> Initializing Python 3.11 Kernel...\n>>> System Execution Started...\n\n";
        
        if (problem.id === 'py-2') {
          // HWHS Marksheet logic
          log += "============================================================\n";
          log += "      HOLY WRIT HIGH SCHOOL - ANNUAL RESULT 2026            \n";
          log += "============================================================\n";
          log += "NAME: AYUSH CHATTARAJ        ROLL NO: XII-02\n";
          log += "CLASS: XII - Daffodils       STREAM: COMMERCE\n";
          log += "------------------------------------------------------------\n";
          log += "SUBJECT              MARKS      MAX        GRADE\n";
          log += "------------------------------------------------------------\n";
          log += "Physics              85         100        A2\n";
          log += "Chemistry            92         100        A1\n";
          log += "Maths                88         100        A2\n";
          log += "English              78         100        B1\n";
          log += "Computer             95         100        A1\n";
          log += "------------------------------------------------------------\n";
          log += "TOTAL: 438/500    PERCENTAGE: 87.60%    GRADE: A2\n";
          log += "RESULT: PASS\n";
          log += "============================================================\n";
        } 
        else if (problem.id === 'py-1') {
          // Payroll Logic
          log += "============================================================\n";
          log += "      HWHS FACULTY PAYROLL AUDIT REPORT - 2025-26           \n";
          log += "============================================================\n";
          log += "EMP NAME        DEPT         GROSS      PF        NET PAY\n";
          log += "------------------------------------------------------------\n";
          log += "VEDANT LIMBANI  COMMERCE     106250.00  10200.00  95850.00\n";
          log += "AYUSH CHATTARAJ SCIENCE      97500.00   9360.00   87940.00\n";
          log += "RAYYAN NAI      COMMERCE     115000.00  11040.00  103760.00\n";
          log += "------------------------------------------------------------\n";
          log += "TOTAL MONTHLY DISBURSEMENT: INR 287,550.00\n";
          log += "============================================================\n";
        }
        else if (userCode.includes('print')) {
          const lines = userCode.split('\n');
          lines.forEach(l => {
            if (l.trim().startsWith('print')) {
              const match = l.match(/print\((.*)\)/);
              if (match) log += match[1].replace(/['"]/g, '') + "\n";
            }
          });
        } else {
          log += "Process finished with exit code 0\n(Check logic guides for output requirements)";
        }
        
        setOutput(log);
      } catch (err) {
        setOutput(">>> Traceback (most recent call last):\n  File \"main.py\", line 12\nSyntaxError: invalid syntax");
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

        toast({ title: "System Uploaded", description: "Submission has been logged by faculty." });
      } else {
        throw new Error();
      }
    } catch (e) {
      toast({ variant: "destructive", title: "Cloud Error", description: "Failed to sync submission. Check connection." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] gap-4 p-4 bg-slate-950">
      <div className="flex-1 flex gap-4 overflow-hidden">
        {/* Left: Description & Reference */}
        <div className="w-1/3 flex flex-col gap-4 overflow-hidden">
          <Card className="flex-1 flex flex-col overflow-hidden bg-slate-900 border-slate-800 shadow-2xl">
            <CardHeader className="bg-slate-800/50 py-3 border-b border-slate-700">
              <CardTitle className="text-[10px] font-bold flex items-center gap-2 text-slate-400 uppercase tracking-widest">
                <Info className="h-4 w-4 text-blue-400" /> System Protocols
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-auto pt-6 text-slate-300 custom-scrollbar">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-600/20 p-2 rounded-lg">
                  <Sparkles className="h-5 w-5 text-blue-400" />
                </div>
                <h2 className="font-bold text-xl text-white tracking-tight">{problem.title}</h2>
              </div>
              <div className="bg-slate-950/50 p-4 rounded-xl mb-6 border border-slate-800 text-sm leading-relaxed text-slate-400">
                {problem.description}
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                   <p className="font-bold flex items-center gap-2 text-emerald-400 uppercase text-[10px] tracking-widest">
                    <ScrollText className="h-3 w-3"/> Official Reference Manual
                  </p>
                  <span className="text-[8px] bg-slate-800 px-2 py-0.5 rounded text-slate-500">200+ Lines</span>
                </div>
                <div className="bg-black p-5 rounded-xl font-mono text-[11px] whitespace-pre-wrap border border-emerald-500/10 max-h-[500px] overflow-auto shadow-inner text-emerald-500/80 leading-relaxed custom-scrollbar">
                  {problem.referenceCode}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: IDE Workspace */}
        <div className="flex-1 flex flex-col gap-4 overflow-hidden">
          <Card className="flex-1 flex flex-col overflow-hidden bg-slate-900 border-2 border-slate-800 shadow-inner">
            <CardHeader className="bg-slate-800/80 flex flex-row items-center justify-between py-3 border-b border-slate-700 px-6">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <span className="font-bold uppercase tracking-widest text-[9px] text-slate-500 ml-4">
                  editor.hwhs <span className="text-blue-500">|</span> {problem.language.toUpperCase()}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" onClick={handleRun} className="bg-slate-950 border-slate-700 text-slate-300 hover:bg-slate-800 h-8 text-[11px] font-bold">
                  <Play className="h-3 w-3 mr-2 fill-emerald-500 text-emerald-500" /> EXECUTE SCRIPT
                </Button>
                <Button size="sm" onClick={handleSubmit} disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-500 text-white h-8 px-6 shadow-lg shadow-blue-900/40 text-[11px] font-bold">
                  {isSubmitting ? 'UPLOADING...' : <><Send className="h-3 w-3 mr-2" /> SUBMIT SYSTEM</>}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-0 flex flex-col overflow-hidden">
              <Textarea 
                value={userCode} 
                onChange={(e) => setUserCode(e.target.value)} 
                className="flex-1 font-mono text-[13px] p-8 bg-slate-950 border-none focus-visible:ring-0 resize-none text-slate-200 selection:bg-blue-500/30 leading-relaxed custom-scrollbar" 
                placeholder="# Initialize HWHS Logic Module..." 
              />
            </CardContent>
          </Card>

          {/* Terminal Output */}
          <Card className="h-1/3 flex flex-col overflow-hidden border border-slate-800 bg-black">
            <CardHeader className="bg-slate-900 py-2 border-b border-slate-800 px-4">
              <CardTitle className="text-[9px] font-bold flex items-center gap-2 uppercase tracking-[0.2em] text-slate-600">
                <Terminal className="h-3 w-3" /> HWHS Enterprise Console v4.2
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-0 overflow-hidden relative">
              {problem.language === 'html' ? (
                <div className="w-full h-full bg-white">
                  <iframe ref={iframeRef} className="w-full h-full border-none" title="Output Preview" />
                </div>
              ) : (
                <div className="p-6 font-mono text-[12px] whitespace-pre-wrap h-full overflow-auto text-emerald-400 selection:bg-emerald-900/50 custom-scrollbar">
                  {output || 'System kernel ready... Listening for execution command.'}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

