'use client';

import { useState, useEffect, useRef } from "react";
import { computerPaper } from "@/lib/computer-questions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, ShieldAlert, MonitorPlay, Send, BookOpen, FileText, UserCircle, AlertTriangle } from "lucide-react";
import { getCurrentUser, type User } from "@/lib/user-store";
import { storeResult, markExamAsAttempted, hasAttemptedExam } from "@/lib/exam-store";
import { useRouter } from "next/navigation";
import Timer from "./Timer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { sendComputerSubmissionEmail } from "@/ai/flows/send-computer-submission-email";

export default function ComputerExamClient() {
    const [status, setStatus] = useState<"loading" | "prompt" | "exam" | "submitting" | "submitted" | "blocked">("loading");
    const [answers, setAnswers] = useState<{ [key: string]: string }>({});
    const [student, setStudent] = useState<User | null>(null);
    
    const { toast } = useToast();
    const router = useRouter();
    const examSubmittedRef = useRef(false);
    const isViolationRef = useRef(false);

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

    const triggerViolation = (reason: string) => {
        if (examSubmittedRef.current) return;
        isViolationRef.current = true;
        toast({ 
            variant: "destructive", 
            title: "PROCTORING ALERT: VIOLATION DETECTED", 
            description: reason 
        });
        handleSubmit(true);
    };

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
            triggerViolation("Window switching detected. Automatic submission initiated.");
        }
    };

    useEffect(() => {
        if (status !== "exam") return;

        const onVisibilityChange = () => {
            if (document.hidden) handleTabSwitch();
        };

        const onBlur = () => {
            handleTabSwitch();
        };

        const onFullscreenChange = () => {
            if (!document.fullscreenElement) handleTabSwitch();
        };

        document.addEventListener("visibilitychange", onVisibilityChange);
        window.addEventListener("blur", onBlur);
        document.addEventListener("fullscreenchange", onFullscreenChange);

        return () => {
            document.removeEventListener("visibilitychange", onVisibilityChange);
            window.removeEventListener("blur", onBlur);
            document.removeEventListener("fullscreenchange", onFullscreenChange);
        };
    }, [status]);

    const handleSubmit = async (isAuto = false) => {
        if (examSubmittedRef.current) return;
        examSubmittedRef.current = true;
        setStatus("submitting");

        if (!student) return;

        let mcqCorrect = 0;
        computerPaper.sections[0].questions.forEach(q => {
            if (answers[q.id] === q.answer) mcqCorrect++;
        });

        const studentId = `${student.rollNumber.padStart(2, '0')}-${student.class}-${student.section}`;
        
        storeResult(student.rollNumber, student.class, student.section, 'COMP-ANNUAL-9', {
            robotics: mcqCorrect,
            coding: -2 
        });
        markExamAsAttempted(studentId, 'COMP-ANNUAL-9');

        try {
            await sendComputerSubmissionEmail({
                student: student,
                answers: answers,
                isViolation: isViolationRef.current || isAuto,
                examTitle: `${computerPaper.exam} - ${computerPaper.subject}`
            });
        } catch (error) {
            console.error("Failed to send submission email", error);
        }

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
                        <CardDescription>Advanced Proctored Environment</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="bg-destructive/10 border-l-4 border-destructive p-4 rounded-md">
                            <h4 className="font-bold flex items-center gap-2 text-destructive">
                                <ShieldAlert className="h-5 w-5" /> PROCTORING WARNING
                            </h4>
                            <ul className="list-disc list-inside space-y-2 mt-2 text-sm">
                                <li><strong>Tab Switching:</strong> Any attempt to leave this page or use other devices will terminate the exam.</li>
                                <li><strong>Fullscreen Required:</strong> Staying in fullscreen mode is mandatory.</li>
                                <li><strong>AI Analysis:</strong> Your activity is being monitored for cheating patterns.</li>
                            </ul>
                        </div>
                        
                        <div className="flex items-center gap-4 justify-center">
                             <div className="flex items-center gap-2 text-muted-foreground"><MonitorPlay className="h-4 w-4"/> Fullscreen Mode Only</div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" size="lg" onClick={startExam}><MonitorPlay className="mr-2" /> Start Exam in Fullscreen</Button>
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
                    <CardContent>
                        {isViolationRef.current ? (
                             <Alert variant="destructive" className="text-left mb-4">
                                <AlertTriangle className="h-4 w-4" />
                                <AlertTitle>Proctoring Violation Recorded</AlertTitle>
                                <AlertDescription>
                                    Your exam was auto-submitted due to a detected violation. This has been reported to the faculty.
                                </AlertDescription>
                             </Alert>
                        ) : (
                            <p>Your Answer Copy has been dispatched to the faculty for evaluation. Thank you.</p>
                        )}
                    </CardContent>
                    <CardFooter><Button className="w-full" onClick={() => router.push('/student/dashboard')}>Return Home</Button></CardFooter>
                </Card>
            </div>
        );
    }

    return (
        <div className="h-screen w-screen flex flex-col bg-background select-none">
            <header className="h-16 border-b flex items-center justify-between px-6 bg-card shrink-0">
                <div className="flex items-center gap-2">
                    <BookOpen className="text-primary" />
                    <h1 className="font-headline font-bold text-lg">{computerPaper.school} - Computer</h1>
                </div>
                <div className="flex items-center gap-6">
                    <Timer initialTime={3600} onTimeUp={() => triggerViolation("Time limit reached.")} />
                    <Button variant="destructive" size="sm" onClick={() => handleSubmit(false)}>Submit Final Copy <Send className="ml-2 h-4 w-4" /></Button>
                </div>
            </header>

            <div className="flex-1 flex overflow-hidden">
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

                <div className="w-1/2 flex flex-col bg-[#fff9e6]">
                    <div className="p-4 bg-[#f0ebda] border-b flex items-center justify-between font-bold text-blue-900">
                        <div className="flex items-center gap-2">
                            <ShieldAlert className="h-4 w-4 text-red-600" /> OFFICIAL CBSE ANSWER SCRIPT
                        </div>
                        <div className="flex items-center gap-4 text-xs">
                             <div className="flex items-center gap-1 text-green-600">
                                <div className="w-2 h-2 rounded-full bg-green-600 animate-pulse" /> PROCTORING ACTIVE
                             </div>
                            <div className="flex items-center gap-2">
                                <UserCircle className="h-4 w-4" />
                                {student?.name} ({student?.rollNumber})
                            </div>
                        </div>
                    </div>
                    
                    <ScrollArea className="flex-1 p-0">
                        <div className="min-h-full w-full bg-[#fff9e6] relative pb-40">
                            <div className="absolute left-[60px] top-0 bottom-0 w-[2px] bg-red-400" />
                            <div className="absolute inset-0 pointer-events-none" style={{
                                backgroundImage: 'linear-gradient(#d1d5db 1px, transparent 1px)',
                                backgroundSize: '100% 30px',
                                marginTop: '40px'
                            }} />

                            <div className="relative z-10 p-8 pl-20 space-y-12">
                                <div className="border-b-2 border-black pb-4 mb-8">
                                    <div className="grid grid-cols-2 gap-4 text-sm font-bold text-blue-900">
                                        <p>Candidate Name: <span className="underline">{student?.name}</span></p>
                                        <p>Roll No: <span className="underline">{student?.rollNumber}</span></p>
                                        <p>Subject: <span className="underline">{computerPaper.subject}</span></p>
                                        <p>Section: <span className="underline">{student?.section}</span></p>
                                    </div>
                                </div>

                                {computerPaper.sections.map(section => (
                                    <div key={section.id} className="space-y-10">
                                        <div className="bg-blue-900 text-white px-4 py-1 inline-block font-bold rounded-sm">
                                            ANSWERS FOR {section.title}
                                        </div>

                                        {section.questions.map(q => (
                                            <div key={q.id} className="space-y-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold text-blue-900 border-b border-blue-900 px-2">Ans {q.id}.</span>
                                                    <span className="text-[10px] uppercase text-gray-500">[{q.type}]</span>
                                                </div>
                                                
                                                {q.type === 'MCQ' ? (
                                                    <RadioGroup 
                                                        onValueChange={(val) => setAnswers({...answers, [q.id]: val})}
                                                        value={answers[q.id]}
                                                        className="grid grid-cols-1 gap-2"
                                                    >
                                                        {q.options?.map((opt, i) => (
                                                            <div key={i} className="flex items-center space-x-2 bg-white/50 p-2 rounded border border-gray-200">
                                                                <RadioGroupItem value={opt} id={`${q.id}-${i}`} />
                                                                <Label htmlFor={`${q.id}-${i}`} className="flex-1 cursor-pointer font-medium">{String.fromCharCode(65+i)}. {opt}</Label>
                                                            </div>
                                                        ))}
                                                    </RadioGroup>
                                                ) : (
                                                    <Textarea 
                                                        placeholder="Write your answer here..."
                                                        className="min-h-[200px] font-mono bg-transparent border-none focus-visible:ring-0 shadow-none text-blue-900 text-lg leading-[30px] p-0 resize-none"
                                                        style={{ background: 'transparent' }}
                                                        onChange={(e) => setAnswers({...answers, [q.id]: e.target.value})}
                                                        value={answers[q.id]}
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ))}

                                <div className="pt-20 flex justify-between items-end border-t border-black/20">
                                    <div className="text-center">
                                        <div className="w-32 border-b border-black mb-1" />
                                        <p className="text-[10px] font-bold">INVIGILATOR SIGNATURE</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="font-headline italic text-blue-900 opacity-50">{student?.name}</p>
                                        <div className="w-32 border-b border-black mb-1" />
                                        <p className="text-[10px] font-bold">CANDIDATE SIGNATURE</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollArea>
                </div>
            </div>
        </div>
    );
}
