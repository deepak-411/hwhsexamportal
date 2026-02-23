"use client";

import * as React from "react";
import Logo from "@/components/Logo";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import QRCode from "react-qr-code";
import { cn } from "@/lib/utils";

type MarksheetProps = {
    studentName: string;
    rollNumber: string;
    className: string;
    section: string;
    examTitle: string;
    roboticsMarks: number;
    codingMarks: number;
    marksheetNumber: string;
};

export default function Marksheet({
    studentName,
    rollNumber,
    className,
    section,
    examTitle,
    roboticsMarks,
    codingMarks,
    marksheetNumber,
}: MarksheetProps) {
    const [currentDate, setCurrentDate] = React.useState("");


    React.useEffect(() => {
        setCurrentDate(new Date().toLocaleDateString('en-GB'));
    }, []);

    const passPercentage = 35;
    const totalMarks = 80;
    const percentage = (roboticsMarks / totalMarks) * 100;
    const passStatus = percentage >= passPercentage ? "PASS" : "FAIL";

    const getGrade = () => {
        if (percentage >= 90) return 'A1';
        if (percentage >= 80) return 'A2';
        if (percentage >= 70) return 'B1';
        if (percentage >= 60) return 'B2';
        if (percentage >= 50) return 'C1';
        if (percentage >= 35) return 'C2';
        return 'D';
    };
    
    const grade = getGrade();

    const codingStatus = codingMarks >= 0 ? "Qualified" : "Not Qualified";

    const qrValue = `Marksheet No: ${marksheetNumber}\nStudent: ${studentName}\nRoll No: ${rollNumber}`;

  return (
    <Card className={cn(
        "max-w-4xl mx-auto border-2 border-primary shadow-2xl bg-white text-black print-container marksheet-print-mode",
        "print:shadow-none print:border-none printable-content print:w-[100vw] print:h-[100vh] print:m-0 print:p-0 flex flex-col overflow-hidden"
    )}>
        <style jsx global>{`
            @media print {
                @page {
                    size: A4 portrait;
                    margin: 0;
                }
            }
        `}</style>
        <CardContent className="p-10 flex-grow flex flex-col print:p-8">
            <header className="flex flex-col items-center justify-center text-center gap-4 mb-8">
                <div className="bg-white rounded-full p-1 border-2 border-primary/20">
                    <Logo />
                </div>
                <div>
                    <h1 className="font-headline text-4xl font-bold text-primary uppercase tracking-tight">
                        Holy Writ High School and Junior College
                    </h1>
                    <p className="text-xl font-medium text-gray-600 mt-1">Academic Session: 2025-2026</p>
                    <p className="text-sm text-gray-500 uppercase tracking-widest mt-2 font-bold">Pimpoli, Barvi Dam Road, Badlapur (W)</p>
                </div>
            </header>

            <div className="my-6 text-center bg-primary text-white py-3 rounded-sm shadow-md">
                <h2 className="font-bold text-2xl tracking-[0.2em] uppercase">Statement of Marks</h2>
            </div>
            
            <div className="flex justify-between items-center bg-stone-50 p-6 rounded-lg border border-gray-100 mb-8">
                <div className="grid grid-cols-1 gap-y-3 text-lg flex-grow">
                    <div className="flex"><span className="font-bold w-40 text-primary">Student's Name:</span> <span className="uppercase font-medium">{studentName}</span></div>
                    <div className="flex"><span className="font-bold w-40 text-primary">Roll Number:</span> <span className="font-medium">{rollNumber}</span></div>
                    <div className="flex"><span className="font-bold w-40 text-primary">Class & Section:</span> <span className="font-medium">{className} - {section}</span></div>
                    <div className="flex"><span className="font-bold w-40 text-primary">Examination:</span> <span className="font-medium">{examTitle}</span></div>
                </div>
                <div className="text-center bg-white p-3 rounded border border-gray-200 shadow-sm ml-8 no-print">
                    <QRCode value={qrValue} size={90} level="L" />
                    <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase">Verify Result</p>
                </div>
            </div>

            <div className="text-sm mb-6 font-mono text-gray-500 font-bold uppercase tracking-tighter">
                Ref No: {marksheetNumber}
            </div>

            <div className="flex-grow">
                <Table className="border rounded-md overflow-hidden">
                    <TableHeader className="bg-primary/5">
                        <TableRow>
                            <TableHead className="w-[80px] font-bold text-primary">S.No.</TableHead>
                            <TableHead className="font-bold text-primary">Subject Components</TableHead>
                            <TableHead className="text-center font-bold text-primary">Maximum Marks</TableHead>
                            <TableHead className="text-right font-bold text-primary">Marks Obtained</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow className="text-lg">
                            <TableCell className="font-medium">01</TableCell>
                            <TableCell className="font-medium">Robotics & AI (Objective - MCQ)</TableCell>
                            <TableCell className="text-center">{totalMarks}</TableCell>
                            <TableCell className="text-right font-bold">{roboticsMarks}</TableCell>
                        </TableRow>
                        <TableRow className="text-lg">
                            <TableCell className="font-medium">02</TableCell>
                            <TableCell className="font-medium">Robotics & AI (Practical - Coding)</TableCell>
                            <TableCell className="text-center">Qualifying</TableCell>
                            <TableCell className="text-right font-bold text-green-600">{codingStatus}</TableCell>
                        </TableRow>
                    </TableBody>
                    <TableFooter className="bg-stone-50">
                        <TableRow className="text-xl">
                            <TableCell colSpan={2} className="font-black text-primary uppercase">Grand Total</TableCell>
                            <TableCell className="text-center font-black">{totalMarks}</TableCell>
                            <TableCell className="text-right font-black text-primary">{roboticsMarks}</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
            
            <div className="grid grid-cols-2 gap-8 mt-12 bg-primary/5 p-8 rounded-lg border border-primary/10">
                 <div className="space-y-3">
                    <p className="font-bold text-2xl flex items-center gap-4">Result Status: <span className={`px-4 py-1 rounded ${passStatus === 'PASS' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>{passStatus}</span></p>
                    <p className="font-bold text-2xl">Aggregate Percentage: <span className="text-primary">{percentage.toFixed(2)}%</span></p>
                    <p className="font-bold text-2xl">Performance Grade: <span className="text-primary font-black">{grade}</span></p>
                 </div>
                 <div className="text-right flex flex-col justify-center items-end">
                    <div className="p-4 border-2 border-primary/20 rounded-md bg-white">
                        <p className="text-sm font-bold text-gray-400 uppercase">Grade Scale</p>
                        <p className="text-xs font-medium">A1: 90-100 | A2: 80-89 | B1: 70-79</p>
                        <p className="text-xs font-medium">B2: 60-69 | C1: 50-59 | C2: 35-49</p>
                    </div>
                 </div>
            </div>
            
            <div className="flex justify-between items-end mt-16 pt-8 border-t border-dashed border-gray-300">
                <div className="text-left">
                    {currentDate && <p className="font-bold text-gray-600">Issued On: {currentDate}</p>}
                    <p className="text-xs text-gray-400 mt-1 uppercase font-bold">Advance Technology Lab - HWHS</p>
                </div>
                <footer className="w-64 text-center">
                    <div className="h-20 flex items-center justify-center">
                         {/* Placeholder for actual digital signature if needed */}
                    </div>
                    <p className="border-t-2 border-primary mt-2 pt-2 font-black text-xl text-primary uppercase">Principal</p>
                </footer>
            </div>
        </CardContent>
    </Card>
  )
}