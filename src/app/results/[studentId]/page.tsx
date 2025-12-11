
'use client';
import Marksheet from "@/components/results/Marksheet";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ArrowLeft, Printer, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { findUser, type User } from "@/lib/user-store";
import { getStoredResults, type ExamResult } from "@/lib/exam-store";


type MarksheetData = {
    name: string;
    rollNumber: string;
    class: string;
    section: string;
    exam: string;
    marks: ExamResult;
    totalMarks: { robotics: number; coding: number; };
}

export default function ResultPage() {
    const params = useParams();
    const router = useRouter();
    const searchParams = useSearchParams();
    const studentId = params.studentId as string;
    const studentClass = searchParams.get('class');
    const studentSection = searchParams.get('section');
    
    const [studentResult, setStudentResult] = useState<MarksheetData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!studentId || !studentClass || !studentSection) {
            setError(`Invalid URL. Please go back and search for a student.`);
            setIsLoading(false);
            return;
        }

        const userForMarksheet = findUser(studentId, studentClass, studentSection);
        
        if (userForMarksheet) {
            const allResults = getStoredResults();
            const uniqueStudentKeyForResults = `${userForMarksheet.rollNumber}-${userForMarksheet.class}-${userForMarksheet.section}`;
            
            const studentResults = allResults[uniqueStudentKeyForResults];
            
            if (studentResults) {
                const availableExamIds = Object.keys(studentResults);
                if (availableExamIds.length > 0) {
                    const firstExamId = availableExamIds[0];
                    const result = studentResults[firstExamId];
                    
                    setStudentResult({
                        name: userForMarksheet.name,
                        rollNumber: userForMarksheet.rollNumber,
                        class: userForMarksheet.class,
                        section: userForMarksheet.section,
                        exam: `Robotics and AI Examination 2025 (Set ${firstExamId})`,
                        marks: result,
                        totalMarks: {
                            robotics: 80,
                            coding: 20
                        },
                    });
                } else {
                    setError(`No exam result found for ${userForMarksheet.name} (Roll No: ${studentId}).`);
                }
            } else {
                 setError(`No result data found for Roll No: ${studentId} in Class ${studentClass}-${studentSection}.`);
            }
        } else {
            setError(`A student with Roll No: ${studentId}, Class: ${studentClass}, Section: ${studentSection} could not be found.`);
        }
        setIsLoading(false);
    }, [studentId, studentClass, studentSection]);
    
    const handlePrint = () => {
        window.print();
    };

    if (isLoading) {
        return <div className="flex h-screen items-center justify-center"><p>Loading results...</p></div>
    }

    if (error) {
        return (
             <div className="flex h-screen items-center justify-center text-center">
                <div>
                    <Alert variant="destructive" className="max-w-md">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Result Not Found</AlertTitle>
                        <AlertDescription>
                           {error} Please check the details and try again.
                        </AlertDescription>
                    </Alert>
                     <Button asChild className="mt-4" onClick={() => router.back()}>
                        <Link href="#"><ArrowLeft className="mr-2"/> Go Back</Link>
                    </Button>
                </div>
            </div>
        )
    }

    if (!studentResult) {
        return <div className="flex h-screen items-center justify-center"><p>An unexpected error occurred while loading the marksheet.</p></div>
    }

    const obtainedTotal = studentResult.marks.robotics >= 0 ? studentResult.marks.robotics : 0;
    const maximumTotal = studentResult.totalMarks.robotics;
    const isCodingEvaluated = studentResult.marks.coding >= 0;

    return (
        <div className="p-4 sm:p-6 md:p-8">
             <div className="container mx-auto">
                <div className="flex items-center justify-between gap-4 mb-8 print:hidden">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" onClick={() => router.back()}>
                            <ArrowLeft/>
                        </Button>
                        <h1 className="font-headline text-4xl font-bold">
                            Student Marksheet
                        </h1>
                    </div>
                     <Button onClick={handlePrint}>
                        <Printer className="mr-2"/>
                        Print Marksheet
                    </Button>
                </div>
                <div className="printable-content">
                    <Marksheet 
                        studentName={studentResult.name}
                        rollNumber={studentResult.rollNumber}
                        className={studentResult.class}
                        section={studentResult.section}
                        examTitle={studentResult.exam}
                        roboticsMarks={studentResult.marks.robotics}
                        codingMarks={studentResult.marks.coding}
                        totalObtained={obtainedTotal}
                        totalMax={maximumTotal}
                        isFinal={isCodingEvaluated}
                    />
                </div>
            </div>
        </div>
    )
}
