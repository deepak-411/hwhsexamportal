'use client';
import Certificate from "@/components/faculty/Certificate";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ArrowLeft, Printer, AlertTriangle } from "lucide-react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { findUser, type User, getStoredUsers } from "@/lib/user-store";
import { getStoredResults, type ExamResult } from "@/lib/exam-store";

type CertificateData = {
    name: string;
    rollNumber: string;
    className: string;
    rank: number;
    medal: 'Gold' | 'Silver' | 'Bronze';
    certificateNumber: string;
};

export default function CertificatePage() {
    const params = useParams();
    const router = useRouter();
    const searchParams = useSearchParams();
    const studentId = params.studentId as string;
    const studentClass = searchParams.get('class');
    const studentSection = searchParams.get('section');
    
    const [certificateData, setCertificateData] = useState<CertificateData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!studentId || !studentClass || !studentSection) {
            setError(`Invalid URL. Missing student details.`);
            setIsLoading(false);
            return;
        }

        const user = findUser(studentId, studentClass, studentSection);
        
        if (user) {
            const allResults = getStoredResults();
            const allUsers = getStoredUsers();

            const getStudentResult = (student: User): ExamResult | null => {
              const uniqueStudentKey = `${student.rollNumber.padStart(2, '0')}-${student.class}-${student.section}`;
              const studentResults = allResults[uniqueStudentKey];
              if (studentResults) {
                const examIds = Object.keys(studentResults);
                if (examIds.length > 0) {
                  return studentResults[examIds[0]];
                }
              }
              return null;
            }

            const studentsInClass = allUsers
              .filter(u => u.class === studentClass)
              .map(u => {
                  const result = getStudentResult(u);
                  return { ...u, score: result ? result.robotics : -1 };
              })
              .filter(u => u.score >= 0)
              .sort((a, b) => b.score - a.score);

            const rank = studentsInClass.findIndex(u => u.rollNumber === studentId && u.section === studentSection) + 1;
            
            if (rank > 0 && rank <= 3) {
                 const uniqueCertId = `HWHS-CERT-${user.class}${user.rollNumber}-${new Date().getFullYear()}${rank}`;
                 setCertificateData({
                    name: user.name,
                    rollNumber: user.rollNumber,
                    className: user.class,
                    rank: rank,
                    medal: rank === 1 ? 'Gold' : rank === 2 ? 'Silver' : 'Bronze',
                    certificateNumber: uniqueCertId,
                });
            } else {
                 setError(`Student ${user.name} is not a top 3 performer in Class ${studentClass}.`);
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
        return <div className="flex h-screen items-center justify-center"><p>Loading certificate...</p></div>
    }

    if (error) {
        return (
             <div className="flex h-screen items-center justify-center text-center p-4">
                <div>
                    <Alert variant="destructive" className="max-w-md">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Cannot Generate Certificate</AlertTitle>
                        <AlertDescription>
                           {error}
                        </AlertDescription>
                    </Alert>
                     <Button className="mt-4" onClick={() => router.back()}>
                        <ArrowLeft className="mr-2"/> Go Back
                    </Button>
                </div>
            </div>
        )
    }

    if (!certificateData) {
        return <div className="flex h-screen items-center justify-center"><p>An unexpected error occurred while loading the certificate.</p></div>
    }

    return (
        <div className="bg-gray-200 print:bg-white print:p-0 print:h-screen">
             <div className="container mx-auto p-4 sm:p-6 md:p-8 print:p-0 print:max-w-none print:h-full">
                <div className="flex items-center justify-between gap-4 mb-8 print:hidden">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" onClick={() => router.back()}>
                            <ArrowLeft/>
                        </Button>
                        <h1 className="font-headline text-4xl font-bold">
                            Certificate of Excellence
                        </h1>
                    </div>
                     <Button onClick={handlePrint}>
                        <Printer className="mr-2"/>
                        Print Certificate
                    </Button>
                </div>
                <Certificate 
                    studentName={certificateData.name}
                    rollNumber={certificateData.rollNumber}
                    className={certificateData.className}
                    rank={certificateData.rank}
                    medal={certificateData.medal}
                    certificateNumber={certificateData.certificateNumber}
                />
            </div>
        </div>
    )
}
