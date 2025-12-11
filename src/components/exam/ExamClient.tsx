
"use client";

import { useState, useEffect, useRef } from "react";
import { questions, type Question } from "@/lib/questions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import Timer from "./Timer";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { Code, Send, Loader2, ShieldAlert, MonitorPlay, AlertTriangle } from "lucide-react";
import { getCurrentUser, type User } from "@/lib/user-store";
import { sendSubmissionEmail } from "@/ai/flows/send-submission-email-flow";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { storeResult, hasAttemptedExam, markExamAsAttempted } from "@/lib/exam-store";

type ExamStatus = "loading" | "fullscreen_prompt" | "mcq" | "coding" | "submitting" | "submitted" | "blocked";
type Answers = { [key: number]: string };

export default function ExamClient({ examId }: { examId: string }) {
  const [status, setStatus] = useState<ExamStatus>("loading");
  const [mcqQuestions, setMcqQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [codingAnswer, setCodingAnswer] = useState("");
  const { toast } = useToast();
  const examSubmittedRef = useRef(false);
  const [student, setStudent] = useState<User | null>(null);

  // Load exam questions and check for previous attempts
  useEffect(() => {
    const studentUser = getCurrentUser();
    if (!studentUser) {
        setStatus("blocked");
        toast({ title: "Error", description: "Could not find student details. Please log in again." });
        return;
    }
    setStudent(studentUser);

    if (hasAttemptedExam(`${studentUser.rollNumber}-${studentUser.class}-${studentUser.section}`, examId)) {
        setStatus("blocked");
        return;
    }

    const questionSetIndex = parseInt(examId, 10) - 1;
    if (isNaN(questionSetIndex) || questionSetIndex < 0 || questionSetIndex >= 8) {
        setStatus("blocked");
        toast({ title: "Invalid Exam", description: "This exam set is not available." });
        return;
    }
    
    const questionsPerSet = 30;
    const start = questionSetIndex * questionsPerSet;
    const end = start + questionsPerSet;
    
    const examQuestions = questions.slice(start, end);
    setMcqQuestions(examQuestions);
    
    setStatus("fullscreen_prompt");
  }, [examId, toast]);

  // Proctoring: Tab switching and fullscreen exit detection
  useEffect(() => {
    if (status !== 'mcq' && status !== 'coding') return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        toast({
          variant: "destructive",
          title: "Tab Switched!",
          description: "Your exam is being submitted for leaving the exam tab.",
        });
        handleSubmitExam(true);
      }
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
         toast({
          variant: "destructive",
          title: "Full-Screen Exited!",
          description: "Your exam is being submitted for exiting full-screen mode.",
        });
        handleSubmitExam(true);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, answers, codingAnswer]);

  // Proctoring: Disable context menu and copy/paste
  useEffect(() => {
    const handleContextmenu = (e: MouseEvent) => e.preventDefault();
    const handleKeydown = (e: KeyboardEvent) => {
        if (e.ctrlKey && (e.key === 'c' || e.key === 'C')) {
            e.preventDefault();
            toast({
                variant: 'destructive',
                title: 'Action Blocked',
                description: 'Copying is disabled during the exam.'
            });
        }
    };
    
    document.addEventListener('contextmenu', handleContextmenu);
    document.addEventListener('keydown', handleKeydown);
    return () => {
        document.removeEventListener('contextmenu', handleContextmenu);
        document.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  const startExamInFullScreen = async () => {
    try {
        await document.documentElement.requestFullscreen();
        setStatus("mcq");
    } catch (err) {
        toast({
            variant: "destructive",
            title: "Full-Screen Required",
            description: "Please allow full-screen mode to start the exam.",
        });
    }
  };

  const currentQuestion = mcqQuestions[currentQuestionIndex];

  const handleNextQuestion = () => {
    if (currentQuestionIndex < mcqQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setStatus("coding");
    }
  };

  const handleManualNext = () => {
     if (!answers[currentQuestion.id]) {
      toast({
        variant: "destructive",
        title: "No option selected",
        description: "Please select an option before proceeding.",
      });
      return;
    }
    handleNextQuestion();
  }

  const handleTimeUp = () => {
     toast({
      title: "Time's up!",
      description: "Submitting your exam now.",
    });
    handleSubmitExam(false);
  }

  const handleSubmitExam = async (isAutoSubmit = false) => {
    if (examSubmittedRef.current) return;
    examSubmittedRef.current = true;
    
    setStatus("submitting");

    if (!student) {
        toast({
            variant: "destructive",
            title: "Error",
            description: "Could not identify student. Please log in again.",
        });
        setStatus("coding"); // Revert status
        examSubmittedRef.current = false;
        return;
    }

    let mcqCorrect = 0;
    mcqQuestions.forEach(q => {
        if (answers[q.id] === q.answer) {
            mcqCorrect++;
        }
    });

    const totalMcq = mcqQuestions.length;
    const mcqScore = Math.round((mcqCorrect / totalMcq) * 80);
    const studentId = `${student.rollNumber}-${student.class}-${student.section}`;


    storeResult(student.rollNumber, student.class, student.section, examId, { robotics: mcqScore, coding: -1 });
    markExamAsAttempted(studentId, examId);

    const answeredQuestions = mcqQuestions.map(q => ({
        question: q.question,
        selectedAnswer: answers[q.id] || "Not Answered",
        correctAnswer: q.answer,
        isCorrect: (answers[q.id] === q.answer)
    }));

    let finalCodingAnswer = codingAnswer;
    if (isAutoSubmit) {
      finalCodingAnswer = `AUTOMATIC SUBMISSION DUE TO PROCTORING VIOLATION\n\n${codingAnswer}`;
    }

    try {
        await sendSubmissionEmail({
            student,
            answeredQuestions,
            codingAnswer: finalCodingAnswer,
            mcqScore: mcqScore,
            totalMcqQuestions: totalMcq,
            mcqCorrect,
        });

        if (!isAutoSubmit) {
            toast({
                title: "Exam Submitted!",
                description: "Your submission has been recorded. Good luck!",
            });
        }
    } catch (error) {
        console.error("Failed to process submission:", error);
        toast({
            variant: "destructive",
            title: "Submission Failed",
            description: "There was an error sending your submission. Please contact faculty.",
        });
        setStatus("coding"); // Revert on failure
        examSubmittedRef.current = false;
        return;
    }

    // Exit fullscreen after successful submission
    if (document.fullscreenElement) {
        document.exitFullscreen();
    }
    setStatus("submitted");
  };

  if (status === "loading") {
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="flex flex-col items-center space-y-4">
                 <Loader2 className="h-12 w-12 animate-spin text-primary"/>
                 <p className="text-lg">Loading Exam...</p>
            </div>
        </div>
    );
  }

  if (status === "fullscreen_prompt") {
    return (
        <div className="flex h-screen items-center justify-center">
            <Card className="w-full max-w-lg text-center">
                <CardHeader>
                    <CardTitle className="font-headline text-3xl">Ready to Begin?</CardTitle>
                    <CardDescription>This exam must be taken in full-screen mode to prevent cheating.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <AlertTriangle className="h-16 w-16 text-destructive mx-auto" />
                    <p className="font-bold text-lg">Proctoring is Enabled</p>
                    <ul className="text-sm text-muted-foreground list-disc list-inside text-left">
                        <li>The exam must be in full-screen.</li>
                        <li>Switching tabs or leaving full-screen will auto-submit your exam.</li>
                        <li>Copying and right-clicking are disabled.</li>
                    </ul>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" onClick={startExamInFullScreen}>
                        <MonitorPlay className="mr-2"/> Start Exam in Full-Screen
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
  }

  if (status === "blocked") {
     return (
        <div className="flex h-screen items-center justify-center">
            <Card className="w-full max-w-lg text-center">
                <CardHeader>
                    <CardTitle className="font-headline text-3xl">Exam Already Attempted</CardTitle>
                    <CardDescription>You have already submitted this exam and cannot attempt it again.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Your results will be published on the dashboard once they are evaluated by the faculty.</p>
                </CardContent>
                <CardFooter>
                    <Button asChild className="w-full">
                        <Link href="/student/dashboard">Back to Dashboard</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
  }
  
  if (status === "submitting") {
    return (
        <div className="flex h-screen items-center justify-center">
             <Card className="w-full max-w-lg text-center">
                <CardHeader>
                    <CardTitle className="font-headline text-3xl">Submitting...</CardTitle>
                    <CardDescription>Please wait while we process your submission.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto"/>
                </CardContent>
            </Card>
        </div>
    )
  }

  if (status === "submitted") {
    return (
        <div className="flex h-screen items-center justify-center">
            <Card className="w-full max-w-lg text-center">
                <CardHeader>
                    <CardTitle className="font-headline text-3xl">Submission Successful!</CardTitle>
                    <CardDescription>Your exam has been submitted for evaluation.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Your results will be published by the faculty soon. You can check your dashboard for updates.</p>
                </CardContent>
                <CardFooter>
                    <Button asChild className="w-full">
                        <Link href="/student/dashboard">Back to Dashboard</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
  }

  if (!currentQuestion) {
     return (
        <div className="flex h-screen items-center justify-center">
            <div className="flex flex-col items-center space-y-4">
                 <Loader2 className="h-12 w-12 animate-spin text-primary"/>
                 <p className="text-lg">Error loading question...</p>
            </div>
        </div>
    );
  }

  return (
    <div className="flex h-screen w-screen flex-col">
      <Card className="flex h-full w-full flex-col rounded-none border-0">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="font-headline text-3xl">
                Robotics and AI Examination
              </CardTitle>
               <CardDescription>
                 {status === 'mcq' ? `Question ${currentQuestionIndex + 1} of ${mcqQuestions.length}` : 'Coding Challenge'}
              </CardDescription>
            </div>
            <div className="flex items-center gap-4">
               <Timer initialTime={1800} onTimeUp={handleTimeUp} />
               <AlertDialog>
                 <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm"><ShieldAlert className="mr-2"/> Rules</Button>
                 </AlertDialogTrigger>
                 <AlertDialogContent>
                   <AlertDialogHeader>
                     <AlertDialogTitle>Exam Rules & Proctoring</AlertDialogTitle>
                     <AlertDialogDescription>
                       This is a 30-minute exam. It must be taken in full-screen. Switching tabs, leaving full-screen, or trying to copy content will result in an automatic submission. You cannot re-attempt the exam.
                     </AlertDialogDescription>
                   </AlertDialogHeader>
                   <AlertDialogFooter>
                     <AlertDialogAction>I Understand</AlertDialogAction>
                   </AlertDialogFooter>
                 </AlertDialogContent>
               </AlertDialog>
            </div>
          </div>
          {status === 'mcq' && <Progress value={((currentQuestionIndex + 1) / mcqQuestions.length) * 100} className="mt-4" />}
        </CardHeader>

        {status === 'mcq' && (
           <>
             <CardContent className="flex-1 overflow-y-auto">
               <h2 className="text-lg font-semibold mb-6">{currentQuestion.question}</h2>
               <RadioGroup
                 value={answers[currentQuestion.id] || ""}
                 onValueChange={(value) =>
                   setAnswers({ ...answers, [currentQuestion.id]: value })
                 }
                 className="space-y-4"
               >
                 {currentQuestion.options.map((option, index) => (
                   <div key={index} className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-muted transition-colors">
                     <RadioGroupItem value={option} id={`option-${index}`} />
                     <Label htmlFor={`option-${index}`} className="flex-1 text-base cursor-pointer">{option}</Label>
                   </div>
                 ))}
               </RadioGroup>
             </CardContent>
             <CardFooter className="justify-end border-t pt-4">
               <Button onClick={handleManualNext}>
                 {currentQuestionIndex === mcqQuestions.length - 1 ? "Proceed to Coding Section" : "Next Question"}
               </Button>
             </CardFooter>
           </>
        )}

        {status === 'coding' && (
           <>
              <CardContent className="flex flex-1 flex-col space-y-4 pt-0">
                  <div className="p-4 rounded-lg bg-muted border">
                     <p className="font-semibold">Question: Write HTML and CSS code to display your school name, your name, subject, and marks.</p>
                  </div>
                  <Textarea 
                      placeholder="Write your code here..." 
                      className="font-code flex-1 bg-muted/50"
                      value={codingAnswer}
                      onChange={(e) => setCodingAnswer(e.target.value)}
                  />
              </CardContent>
              <CardFooter className="justify-between border-t pt-4">
                  <Button variant="secondary" disabled>Run Code</Button>
                  <Button onClick={() => handleSubmitExam(false)}>Submit Exam <Send className="ml-2"/></Button>
              </CardFooter>
           </>
        )}
      </Card>
    </div>
  );
}
