'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { codingProblems, CodingProblem } from '@/lib/coding-problems';
import CodingStudio from '@/components/coding/CodingStudio';
import { getCurrentUser } from '@/lib/user-store';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
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

  if (!problem) return <div className="p-10 text-center">Loading Studio...</div>;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="h-14 border-b flex items-center justify-between px-6 bg-card shrink-0">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/student/dashboard"><ArrowLeft className="h-5 w-5"/></Link>
          </Button>
          <h1 className="font-headline font-bold text-lg">HWHS Coding Studio</h1>
        </div>
        <div className="text-sm font-medium text-muted-foreground">
          Problem ID: {problem.id}
        </div>
      </header>
      <main className="flex-1 overflow-hidden">
        <CodingStudio problem={problem} />
      </main>
    </div>
  );
}
