'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Trophy, Code2, GraduationCap, ArrowRight, FileCheck, CheckCircle2, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getExamForStudent, type ScheduledExam, hasAttemptedExam, getCodingSubmissions, type CodingSubmission } from "@/lib/exam-store";
import { getCurrentUser, clearCurrentUser, type User } from "@/lib/user-store";
import { useRouter } from "next/navigation";
import { codingProblems } from "@/lib/coding-problems";
import AiTeacherChat from "@/components/student/AiTeacherChat";

export default function StudentDashboard() {
  const [activeExam, setActiveExam] = useState<ScheduledExam | null>(null);
  const [student, setStudent] = useState<User | null>(null);
  const [isResultAvailable, setIsResultAvailable] = useState(false);
  const [codingHistory, setCodingHistory] = useState<CodingSubmission[]>([]);
  const router = useRouter();

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
        setStudent(user);
        const examForStudent = getExamForStudent(user.class, user.section);
        setActiveExam(examForStudent);

        const studentId = `${user.rollNumber.padStart(2, '0')}-${user.class}-${user.section}`;
        if (examForStudent && hasAttemptedExam(studentId, examForStudent.selectedSet)) {
            setIsResultAvailable(true);
        }
        const submissions = getCodingSubmissions(studentId);
        setCodingHistory(submissions);
    } else {
        router.push('/auth/student/login');
    }
  }, [router]);

  const handleLogout = () => {
    clearCurrentUser();
    router.push('/auth');
  }

  if (!student) return <div className="flex h-screen items-center justify-center"><p>Loading Profile...</p></div>;

  const isClass12Commerce = student.class === '12' && student.faculty === 'Commerce';
  const examLink = activeExam?.subject === 'Computer' ? '/exam/computer' : `/exam/${activeExam?.selectedSet}`;

  return (
    <div className="min-h-screen flex flex-col">
       <header className="sticky top-0 z-50 w-full border-b bg-card/80 shadow-sm backdrop-blur">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/">
                    <h1 className="font-headline text-xl font-bold text-foreground">HWHS Portal</h1>
                </Link>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground hidden sm:inline">Welcome, {student.name}</span>
                    <Button variant="outline" size="sm" onClick={handleLogout}>Logout</Button>
                </div>
            </div>
        </header>

      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="container mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="font-headline text-4xl font-bold">Student Dashboard</h1>
              <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
                <GraduationCap className="h-5 w-5 text-primary" />
                <span className="font-bold text-primary">{student.faculty} Stream</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-8">
                  <Card className="border-primary/20">
                      <CardHeader>
                          <CardTitle>My Profile</CardTitle>
                          <CardDescription>Academic credentials.</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                          <div><p className="font-semibold text-muted-foreground">Name</p><p className="text-lg font-bold">{student.name}</p></div>
                          <div><p className="font-semibold text-muted-foreground">Roll No</p><p className="text-lg font-bold">{student.rollNumber}</p></div>
                          <div><p className="font-semibold text-muted-foreground">Stream</p><p className="text-lg font-bold">{student.faculty}</p></div>
                      </CardContent>
                  </Card>

                  {isClass12Commerce && (
                    <Card className="border-primary/50 bg-primary/5 shadow-lg">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-primary">
                          <Sparkles className="h-5 w-5" /> AI Teacher Chat
                        </CardTitle>
                        <CardDescription>Guideline support from Mr. Deepak Kumar.</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button 
                          className="w-full font-bold"
                          onClick={() => window.dispatchEvent(new Event('hwhs-open-ai-chat'))}
                        >
                          Chat with Virtual Teacher
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </div>

                <div className="lg:col-span-2 space-y-8">
                    <Card className="border-accent/50 shadow-lg">
                      <CardHeader className="bg-accent/5">
                        <CardTitle className="flex items-center gap-2">
                          <Code2 className="text-accent" /> Coding Studio (20 Problems)
                        </CardTitle>
                        <CardDescription>Night Mode Enterprise Workspace.</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[500px] overflow-auto pr-2">
                          {codingProblems.map((p) => {
                            const isDone = codingHistory.some(sub => sub.problemId === p.id);
                            return (
                              <div key={p.id} className="p-4 border rounded-lg hover:border-primary transition-colors flex justify-between items-center bg-card">
                                <div>
                                  <p className="font-bold text-sm">{p.title}</p>
                                  <p className="text-[10px] text-muted-foreground uppercase font-bold">{p.language}</p>
                                </div>
                                <Button size="sm" variant="ghost" asChild>
                                  <Link href={`/student/coding/${p.id}`}>
                                    Open <ArrowRight className="ml-2 h-4 w-4" />
                                  </Link>
                                </Button>
                                {isDone && <CheckCircle2 className="absolute top-2 right-2 h-3 w-3 text-green-500" />}
                              </div>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-green-500/20 bg-green-500/5">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-green-600">
                          <FileCheck className="h-5 w-5" /> Submissions
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {codingHistory.length > 0 ? (
                          <div className="space-y-2">
                            {codingHistory.map((sub, idx) => (
                              <div key={idx} className="flex justify-between items-center p-2 bg-white border rounded text-xs">
                                <span className="font-bold">{sub.problemTitle}</span>
                                <span className="text-muted-foreground">{new Date(sub.timestamp).toLocaleDateString()}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-center text-muted-foreground">No work submitted yet.</p>
                        )}
                      </CardContent>
                    </Card>
                </div>
            </div>
        </div>
      </main>
      {isClass12Commerce && <AiTeacherChat />}
    </div>
  );
}
