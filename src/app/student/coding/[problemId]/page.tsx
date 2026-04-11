'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { codingProblems, CodingProblem } from '@/lib/coding-problems';
import CodingStudio from '@/components/coding/CodingStudio';
import { getCurrentUser } from '@/lib/user-store';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Terminal } from 'lucide-react';
import Link from 'next/link';

export default function ProblemPage() {
  const params = useParams();
  const router = useRouter();
  const [problem, setProblem] = useState<CodingProblem | null>(null);

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      router.push('/auth/student/login');
      return;
    }

    const found = codingProblems.find(p => p.id === params.problemId);
    if (found) {
      setProblem(found);
    } else {
      router.push('/student/dashboard');
    }
  }, [params.problemId, router]);

  if (!problem) return <div className="p-10 text-center bg-slate-950 h-screen text-slate-500">Initializing Workspace...</div>;

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col overflow-hidden">
      <header className="h-14 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-900 shrink-0 shadow-lg z-10">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild className="text-slate-400 hover:text-white hover:bg-slate-800">
            <Link href="/student/dashboard"><ArrowLeft className="h-5 w-5"/></Link>
          </Button>
          <div className="flex items-center gap-3 border-l border-slate-700 pl-4">
            <Terminal className="h-5 w-5 text-blue-500" />
            <h1 className="font-headline font-bold text-sm tracking-widest text-slate-200 uppercase">
              HWHS Coding Studio <span className="text-blue-500">v4.0</span>
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter bg-slate-800 px-3 py-1 rounded-full">
            Kernel: {problem.language === 'python' ? 'Python 3.11' : 'Web Engine 2.0'}
          </div>
          <div className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">
            {problem.id}
          </div>
        </div>
      </header>
      <main className="flex-1 overflow-hidden">
        <CodingStudio problem={problem} />
      </main>
    </div>
  );
}
