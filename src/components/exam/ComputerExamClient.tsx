
'use client';

import { useState, useEffect, useRef } from "react";
import { computerPaper } from "@/lib/computer-questions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ShieldAlert, MonitorPlay, Send, BookOpen, FileText } from "lucide-react";
import { getCurrentUser, type User } from "@/lib/user-store";
import { storeResult, markExamAsAttempted, hasAttemptedExam } from "@/lib/exam-store";
import { useRouter } from "next/navigation";
import Timer from "./Timer";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ComputerExamClient() {
    const [status, setStatus] = useState<"loading" | "prompt" | "exam" | "submitting" | "submitted" | "blocked">("loading");
    const [answers, setAnswers] = useState<{ [key: string]: string }>({});
    const [student, setStudent] = useState<User | null>(null);
    const { toast } = useToast();
    const router = useRouter();
    const examSubmittedRef = useRef(false);

    useEffect(() => {
        const user = getCurrentUser();
        if (!user) {
            router.push('/auth/student/login');
            return;
        }
        setStudent(user);

        const studentId = `${user.rollNumber.padStart(2, '0')}-${user.class}-${user.section}`;
        if (hasAttemptedExam(studentId, 'COMP-ANNUAL-9')) {
            setStatus("blocked");
        } else {
            setStatus("prompt");
        }
    }, [router]);

    const startExam = async () => {
        try {
            await document.documentElement.requestFullscreen();
            setStatus("exam");
        } catch (err) {
            toast({ variant: "destructive", title: "Fullscreen Required", description: "Please enable fullscreen to continue." });
        }
    };

    const handleTabSwitch = () => {
        if (status === "exam" && !examSubmittedRef.current) {
            toast({ variant: "destructive", title: "Violation Detected", description: "Tab switching is forbidden. Submitting now." });
            handleSubmit(true);
        }
    };

    useEffect(() => {
        document.addEventListener("visibilitychange", handleTabSwitch);
        document.addEventListener("fullscreenchange", () => {
            if (!document.fullscreenElement && status === "exam") handleTabSwitch();
        });
        return () => {
            document.removeEventListener("visibilitychange", handleTabSwitch);
        };
    }, [status]);

    const handleSubmit = (isAuto = false) => {
        if (examSubmittedRef.current) return;
        examSubmittedRef.current = true;
        setStatus("submitting");

        if (!student) return;

        // Calculate MCQ Score
        let mcqCorrect = 0;
        computerPaper.sections[0].questions.forEach(q => {
            if (answers[q.id] === q.answer) mcqCorrect++;
        });

        const studentId = `${student.rollNumber.padStart(2, '0')}-${student.class}-${student.section}`;
        storeResult(student.rollNumber, student.class, student.section, 'COMP-ANNUAL-9', {
            robotics: mcqCorrect, // Using robotics field as primary MCQ store for now
            coding: -2 // Specialized code for Written/Computer Paper
        });
        markExamAsAttempted(studentId, 'COMP-ANNUAL-9');

        if (document.fullscreenElement) document.exitFullscreen();
        setStatus("submitted");
    };

    if (status === "loading") return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>;

    if (status === "blocked") {
        return (
            <div className="flex h-screen items-center justify-center p-4">
                <Card className="max-w-md w-full text-center">
                    <CardHeader><CardTitle>Exam Attempted</CardTitle></CardHeader>
                    <CardContent><p>You have already completed this Computer Annual Exam.</p></CardContent>
                    <CardFooter><Button className="w-full" onClick={() => router.push('/student/dashboard')}>Back to Dashboard</Button></CardFooter>
                </Card>
            </div>
        );
    }

    if (status === "prompt") {
        return (
            <div className="flex h-screen items-center justify-center p-4">
                <Card className="max-w-2xl w-full">
                    <CardHeader className="text-center">
                        <CardTitle className="text-3xl font-headline">Annual Computer Exam 2025-26</CardTitle>
                        <CardDescription>Class IX - Section: Daisies</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="bg-muted p-4 rounded-md text-sm">
                            <h4 className="font-bold mb-2">Instructions:</h4>
                            <ul className="list-disc list-inside space-y-1">
                                <li>Time Limit: 60 Minutes</li>
                                <li>Total Marks: 30</li>
                                <li>The exam is in Split-Screen mode.</li>
                                <li>Left side: Question Paper (Reference)</li>
                                <li>Right side: Answer Copy (Input Area)</li>
                                <li>Do not exit fullscreen or switch tabs.</li>
                            </ul>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" size="lg" onClick={startExam}><MonitorPlay className="mr-2" /> Start Official Exam</Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }

    if (status === "submitted") {
        return (
            <div className="flex h-screen items-center justify-center p-4">
                <Card className="max-w-md w-full text-center">
                    <CardHeader><CardTitle className="text-2xl font-bold">Submission Successful</CardTitle></CardHeader>
                    <CardContent><p>Your Computer Annual Exam has been submitted. The written section will be evaluated by the subject teacher soon.</p></CardContent>
                    <CardFooter><Button className="w-full" onClick={() => router.push('/student/dashboard')}>Return Home</Button></CardFooter>
                </Card>
            </div>
        );
    }

    return (
        <div className="h-screen w-screen flex flex-col bg-background">
            {/* Header */}
            <header className="h-16 border-b flex items-center justify-between px-6 bg-card shrink-0">
                <div className="flex items-center gap-2">
                    <BookOpen className="text-primary" />
                    <h1 className="font-headline font-bold text-lg">{computerPaper.school} - Computer</h1>
                </div>
                <div className="flex items-center gap-6">
                    <Timer initialTime={3600} onTimeUp={() => handleSubmit(true)} />
                    <Button variant="destructive" size="sm" onClick={() => handleSubmit(false)}>Submit Final <Send className="ml-2 h-4 w-4" /></Button>
                </div>
            </header>

            {/* Split Screen Content */}
            <div className="flex-1 flex overflow-hidden">
                {/* Left: Question Paper (Reference) */}
                <div className="w-1/2 border-r bg-muted/30 flex flex-col">
                    <div className="p-4 bg-primary/10 border-b flex items-center gap-2 font-bold">
                        <FileText className="h-4 w-4" /> Question Paper (Reference)
                    </div>
                    <ScrollArea className="flex-1 p-6">
                        <div className="max-w-2xl mx-auto bg-white text-black p-8 shadow-sm border rounded-sm space-y-6">
                            <div className="text-center border-b pb-4">
                                <h2 className="font-bold text-lg">{computerPaper.school}</h2>
                                <p className="text-sm font-semibold">{computerPaper.exam}</p>
                                <div className="flex justify-between mt-2 text-xs font-bold uppercase">
                                    <span>Subject: {computerPaper.subject}</span>
                                    <span>Marks: {computerPaper.totalMarks}</span>
                                </div>
                            </div>

                            {computerPaper.sections.map(section => (
                                <div key={section.id} className="space-y-4">
                                    <h3 className="font-bold underline text-center">{section.title}</h3>
                                    {section.questions.map(q => (
                                        <div key={q.id} className="text-sm">
                                            <p className="font-semibold">{q.text} <span className="float-right text-xs">({q.marks} Mark)</span></p>
                                            {q.options && (
                                                <div className="mt-2 grid grid-cols-2 gap-2 pl-4">
                                                    {q.options.map((opt, i) => (
                                                        <p key={i}>{String.fromCharCode(65 + i)}. {opt}</p>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </div>

                {/* Right: Answer Sheet (CBSE Style) */}
                <div className="w-1/2 flex flex-col bg-background">
                    <div className="p-4 bg-accent/10 border-b flex items-center gap-2 font-bold">
                        <ShieldAlert className="h-4 w-4 text-accent" /> Official Answer Copy
                    </div>
                    <ScrollArea className="flex-1 p-6">
                        <div className="max-w-2xl mx-auto space-y-10 pb-20">
                            {computerPaper.sections.map(section => (
                                <div key={section.id} className="space-y-8">
                                    <div className="bg-primary/5 p-2 rounded-md border text-center font-bold text-primary">
                                        ANSWERS FOR {section.title}
                                    </div>

                                    {section.questions.map(q => (
                                        <div key={q.id} className="space-y-3">
                                            <div className="flex items-center gap-2">
                                                <Badge variant="outline" className="rounded-sm">Answer {q.id}</Badge>
                                                <span className="text-xs text-muted-foreground">Type: {q.type}</span>
                                            </div>
                                            
                                            {q.type === 'MCQ' ? (
                                                <RadioGroup 
                                                    onValueChange={(val) => setAnswers({...answers, [q.id]: val})}
                                                    value={answers[q.id]}
                                                    className="grid grid-cols-2 gap-2"
                                                >
                                                    {q.options?.map((opt, i) => (
                                                        <div key={i} className="flex items-center space-x-2 border p-3 rounded-md hover:bg-muted/50 cursor-pointer">
                                                            <RadioGroupItem value={opt} id={`${q.id}-${i}`} />
                                                            <Label htmlFor={`${q.id}-${i}`} className="flex-1 cursor-pointer">{opt}</Label>
                                                        </div>
                                                    ))}
                                                </RadioGroup>
                                            ) : (
                                                <Textarea 
                                                    placeholder={`Write your answer for ${q.id} here...`}
                                                    className="min-h-[150px] font-body bg-muted/20 focus:bg-white transition-colors"
                                                    onChange={(e) => setAnswers({...answers, [q.id]: e.target.value})}
                                                    value={answers[q.id]}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </div>
            </div>
        </div>
    );
}

const Badge = ({ children, variant, className }: any) => (
    <div className={`px-2 py-0.5 text-xs font-bold border ${className}`}>
        {children}
    </div>
);
