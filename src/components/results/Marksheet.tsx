"use client";

import * as React from "react";
import Logo from "@/components/Logo";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import QRCode from "react-qr-code";

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
    <Card className="max-w-4xl mx-auto border-2 border-primary shadow-2xl print:shadow-none print:border-none bg-white text-black printable-content">
        <CardContent className="p-8">
            <header className="flex flex-col items-center justify-center text-center gap-4">
                <div className="bg-white rounded-full">
                    <Logo />
                </div>
                <div>
                    <h1 className="font-headline text-3xl font-bold text-primary">
                        Holy Writ High School and Junior College
                    </h1>
                    <p className="text-muted-foreground">Academic Session: 2025-2026</p>
                </div>
            </header>

            <div className="my-6 text-center bg-primary text-primary-foreground py-2 rounded-md">
                <h2 className="font-bold text-lg tracking-wider">STATEMENT OF MARKS</h2>
            </div>
            
            <div className="flex justify-between items-start">
                <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-base mb-4">
                    <div><span className="font-semibold">Student's Name:</span> {studentName}</div>
                    <div><span className="font-semibold">Roll No:</span> {rollNumber}</div>
                    <div><span className="font-semibold">Class:</span> {className}</div>
                    <div><span className="font-semibold">Section:</span> {section}</div>
                </div>
                <div className="text-center">
                    <QRCode value={qrValue} size={80} level="L" />
                    <p className="text-xs text-muted-foreground mt-1">Scan to verify</p>
                </div>
            </div>

            <div className="text-sm mb-6 font-medium"><span className="font-semibold">Marksheet No:</span> {marksheetNumber}</div>

            <Separator className="my-6"/>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">S.No.</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead className="text-right">Max Marks</TableHead>
                        <TableHead className="text-right">Marks Obtained</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>Robotics & AI (MCQ)</TableCell>
                        <TableCell className="text-right">{totalMarks}</TableCell>
                        <TableCell className="text-right">{roboticsMarks}</TableCell>
                    </TableRow>
                     <TableRow>
                        <TableCell>2</TableCell>
                        <TableCell>Robotics & AI (Coding)</TableCell>
                        <TableCell className="text-right">Qualifying</TableCell>
                        <TableCell className="text-right font-bold">{codingStatus}</TableCell>
                    </TableRow>
                </TableBody>
                <TableFooter>
                    <TableRow className="bg-white">
                        <TableCell colSpan={2} className="font-bold">Total</TableCell>
                        <TableCell className="text-right font-bold">{totalMarks}</TableCell>
                        <TableCell className="text-right font-bold">{roboticsMarks}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
            
            <div className="grid grid-cols-2 gap-8 mt-6">
                 <div>
                    <p className="font-bold text-lg">Result: <span className="text-primary">{passStatus}</span></p>
                    <p className="font-bold text-lg">Percentage: <span className="text-primary">{percentage.toFixed(2)}%</span></p>
                    <p className="font-bold text-lg">Grade: <span className="text-primary">{grade}</span></p>
                 </div>
                 <div className="text-right self-end">
                    {currentDate && <p>Date of Issue: {currentDate}</p>}
                 </div>
            </div>
            
            <div className="flex justify-end items-center mt-12">
                <footer className="flex gap-16">
                    <div className="text-center">
                        <div className="h-12"></div>
                        <p className="border-t border-dashed mt-2 pt-1 font-semibold">Vikas Dalal (Vice Principal)</p>
                    </div>
                     <div className="text-center">
                        <div className="h-12"></div>
                        <p className="border-t border-dashed mt-2 pt-1 font-semibold">Subrata Kundu (Principal)</p>
                    </div>
                </footer>
            </div>
        </CardContent>
    </Card>
  )
}
