'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Trophy, Code2, GraduationCap, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getExamForStudent, type ScheduledExam, hasAttemptedExam } from "@/lib/exam-store";
import { getCurrentUser, clearCurrentUser, type User } from "@/lib/user-store";
import { useRouter } from "next/navigation";
import { codingProblems } from "@/lib/coding-problems";

export default function StudentDashboard() {
  const [activeExam, setActiveExam] = useState<ScheduledExam | null>(null);
  const [student, setStudent] = useState<User | null>(null);
  const [isResultAvailable, setIsResultAvailable] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
        setStudent(user);
        const examForStudent = getExamForStudent(user.class, user.section);
        setActiveExam(examForStudent);

        if (examForStudent) {
            const studentId = `${user.rollNumber.padStart(2, '0')}-${user.class}-${user.section}`;
            if (hasAttemptedExam(studentId, examForStudent.selectedSet)) {
                setIsResultAvailable(true);
            }
        }
    } else {
        router.push('/auth/student/login');
    }
  }, [router]);

  const handleLogout = () => {
    clearCurrentUser();
    router.push('/auth');
  }

  if (!student) return <div className="flex h-screen items-center justify-center"><p>Loading...</p></div>;

  const isSenior = ['11', '12'].includes(student.class);
  const examLink = activeExam?.subject === 'Computer' ? '/exam/computer' : `/exam/${activeExam?.selectedSet}`;

  return (
    <div className="min-h-screen flex flex-col">
       <header className="sticky top-0 z-50 w-full border-b bg-card/80 shadow-sm backdrop-blur">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-4">
                    <Link href="/">
                       <h1 className="font-headline text-xl font-bold text-foreground">HWHS Portal</h1>
                    </Link>
                </div>
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
                <Card className="lg:col-span-1 border-primary/20">
                    <CardHeader>
                        <CardTitle>My Profile</CardTitle>
                        <CardDescription>Your academic credentials.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div><p className="font-semibold text-muted-foreground">Name</p><p className="text-lg font-bold">{student.name}</p></div>
                        <div><p className="font-semibold text-muted-foreground">Roll Number</p><p className="text-lg font-bold">{student.rollNumber}</p></div>
                        <div><p className="font-semibold text-muted-foreground">Class & Faculty</p><p className="text-lg font-bold">Class {student.class} - {student.faculty}</p></div>
                    </CardContent>
                </Card>

                <div className="lg:col-span-2 grid grid-cols-1 gap-8">
                    {isSenior ? (
                      <Card className="border-accent/50 shadow-lg">
                        <CardHeader className="bg-accent/5">
                          <CardTitle className="flex items-center gap-2">
                            <Code2 className="text-accent" /> Coding Studio Assignments
                          </CardTitle>
                          <CardDescription>Solve 20 unique challenges in Python and Web Design.</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {codingProblems.map((p) => (
                              <div key={p.id} className="p-4 border rounded-lg hover:border-primary transition-colors flex justify-between items-center group bg-card">
                                <div>
                                  <p className="font-bold">{p.title}</p>
                                  <p className="text-xs text-muted-foreground uppercase">{p.language}</p>
                                </div>
                                <Button size="sm" variant="ghost" asChild>
                                  <Link href={`/student/coding/${p.id}`}>
                                    Open Studio <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                  </Link>
                                </Button>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <Card className="flex flex-col justify-between border-primary/20">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BookOpen className="text-primary"/> Exam Schedule
                            </CardTitle>
                            <CardDescription>{activeExam ? 'Exam active for your class.' : 'No exams currently scheduled.'}</CardDescription>
                        </CardHeader>
                        {activeExam && (
                            <>
                                <CardContent className="space-y-4">
                                    <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
                                        <h3 className="font-bold text-lg">{activeExam.subject === 'Computer' ? 'Annual Computer Exam 2025-26' : `Robotics and AI Examination (Set ${activeExam.selectedSet})`}</h3>
                                        <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                                            <p><strong>Class:</strong> {activeExam.selectedClass}</p>
                                            <p><strong>Duration:</strong> 60 Minutes</p>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button asChild className="w-full shadow-lg shadow-primary/20"><Link href={examLink}>Start Exam</Link></Button>
                                </CardFooter>
                            </>
                        )}
                      </Card>
                    )}

                    <Card className="flex flex-col justify-between border-accent/20">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Trophy className="text-accent"/> Performance Statement
                            </CardTitle>
                            <CardDescription>Track your submission results.</CardDescription>
                        </CardHeader>
                         <CardContent>
                           <p className="text-muted-foreground">
                            {isResultAvailable 
                                ? "Results are ready. Click below to view your official statement." 
                                : "Submissions are pending faculty evaluation."}
                           </p>
                        </CardContent>
                        <CardFooter>
                            <Button asChild className="w-full" variant="secondary" disabled={!isResultAvailable}>
                                <Link href={`/results/${student.rollNumber}?class=${student.class}&section=${student.section}`}>View Marksheet</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}
