
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Trophy } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getExamForStudent, type ScheduledExam, hasAttemptedExam } from "@/lib/exam-store";
import { getCurrentUser, clearCurrentUser, type User } from "@/lib/user-store";
import { useRouter } from "next/navigation";

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

  if (!student) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

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
                    <Button variant="outline" size="sm" onClick={handleLogout}>
                         Logout
                    </Button>
                </div>
            </div>
        </header>

      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="container mx-auto">
            <h1 className="font-headline text-4xl font-bold mb-8">Student Dashboard</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle>My Profile</CardTitle>
                        <CardDescription>Your personal information.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <p className="font-semibold text-muted-foreground">Name</p>
                            <p className="text-lg">{student.name}</p>
                        </div>
                         <div>
                            <p className="font-semibold text-muted-foreground">Roll Number</p>
                            <p className="text-lg">{student.rollNumber}</p>
                        </div>
                         <div>
                            <p className="font-semibold text-muted-foreground">Class</p>
                            <p className="text-lg">{student.class} - {student.section}</p>
                        </div>
                    </CardContent>
                </Card>

                <div className="lg:col-span-2 grid grid-cols-1 gap-8">
                    <Card className="flex flex-col justify-between">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BookOpen className="text-primary"/>
                                Exam Schedule
                            </CardTitle>
                            {activeExam ? (
                               <CardDescription>The following exam is scheduled for your class.</CardDescription>
                            ) : (
                                <CardDescription>No exam is currently scheduled for your class.</CardDescription>
                            )}
                        </CardHeader>
                        {activeExam && (
                            <>
                                <CardContent className="space-y-4">
                                    <div className="p-4 bg-muted rounded-lg">
                                        <h3 className="font-bold text-lg">Robotics and AI Examination (Set {activeExam.selectedSet})</h3>
                                        <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                                            <p><strong>Class:</strong> {activeExam.selectedClass}</p>
                                            <p><strong>Section:</strong> {activeExam.selectedSection}</p>
                                            <p><strong>Duration:</strong> 30 Minutes</p>
                                            <p><strong>Questions:</strong> 30 MCQs + 1 Coding</p>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button asChild className="w-full">
                                        <Link href={`/exam/${activeExam.selectedSet}`}>Start Exam</Link>
                                    </Button>
                                </CardFooter>
                            </>
                        )}
                    </Card>
                     <Card className="flex flex-col justify-between">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Trophy className="text-accent"/>
                                My Results
                            </CardTitle>
                            <CardDescription>Check your published exam results.</CardDescription>
                        </CardHeader>
                         <CardContent>
                           <p className="text-muted-foreground">
                            {isResultAvailable 
                                ? "Your results are available. Click the button below to view your marksheet." 
                                : "Results will be available here after evaluation."}
                           </p>
                        </CardContent>
                        <CardFooter>
                            <Button asChild className="w-full" variant="secondary" disabled={!isResultAvailable}>
                                <Link href={`/results/${student.rollNumber}?class=${student.class}&section=${student.section}`}>View Results</Link>
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
