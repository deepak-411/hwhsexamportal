
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BookCopy, Users, ExternalLink, Award } from "lucide-react";
import Link from "next/link";
import { getStoredUsers, type User } from "@/lib/user-store";
import { getStoredResults, type ExamResult } from "@/lib/exam-store";
import { useEffect, useState } from "react";

type GroupedStudents = {
  [className: string]: {
    [section: string]: User[];
  };
};

export default function FacultyDashboard() {
  const [totalStudents, setTotalStudents] = useState(0);
  const [allResults, setAllResults] = useState<{ [key: string]: any }>({});
  const [groupedStudents, setGroupedStudents] = useState<GroupedStudents>({});
  const [topStudents, setTopStudents] = useState<{ [className: string]: (User & { score: number })[] }>({});

  useEffect(() => {
    const users = getStoredUsers();
    const results = getStoredResults();
    setAllResults(results);
    setTotalStudents(users.length);

    const getStudentResult = (student: User): ExamResult | null => {
      const uniqueStudentKey = `${student.rollNumber.padStart(2, '0')}-${student.class}-${student.section}`;
      const studentResults = results[uniqueStudentKey];
      if (studentResults) {
        const examIds = Object.keys(studentResults);
        if (examIds.length > 0) {
          return studentResults[examIds[0]];
        }
      }
      return null;
    }
    
    // Calculate top students
    const studentsWithScores = users
      .map(user => {
        const result = getStudentResult(user);
        return { ...user, score: result ? result.robotics : 0 };
      })
      .filter(user => user.score > 0);

    const topPerformers: { [className: string]: (User & { score: number })[] } = {};
    ['7', '8', '9'].forEach(className => {
      topPerformers[className] = studentsWithScores
        .filter(student => student.class === className)
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);
    });
    setTopStudents(topPerformers);

    const grouped = users.reduce((acc, user) => {
      const { class: className, section } = user;
      if (!acc[className]) {
        acc[className] = {};
      }
      if (!acc[className][section]) {
        acc[className][section] = [];
      }
      acc[className][section].push(user);
      // Sort by roll number, treating roll number as a number
      acc[className][section].sort((a, b) => parseInt(a.rollNumber) - parseInt(b.rollNumber));
      return acc;
    }, {} as GroupedStudents);
    setGroupedStudents(grouped);
  }, []);

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
                    <span className="text-sm text-muted-foreground hidden sm:inline">Welcome, Faculty</span>
                    <Button variant="outline" size="sm" asChild>
                       <Link href="/auth">
                         Logout
                       </Link>
                    </Button>
                </div>
            </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 md:p-8">
            <div className="container mx-auto">
                <h1 className="font-headline text-4xl font-bold mb-8">Faculty Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalStudents}</div>
                            <p className="text-xs text-muted-foreground">Registered in the system</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Manage Exams</CardTitle>
                            <CardDescription>Schedule new exams for students.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button asChild className="w-full">
                                <Link href="/faculty/schedule">Schedule New Exam</Link>
                            </Button>
                        </CardContent>
                    </Card>
                    <Card>
                         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">AI Evaluation Tool</CardTitle>
                            <BookCopy className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                             <Link href="/faculty/evaluate">
                                <Button className="w-full">Evaluate Coding Submissions</Button>
                            </Link>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Top Performers</CardTitle>
                            <Award className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {Object.keys(topStudents).map(className => (
                              <div key={className}>
                                  <h4 className="text-sm font-semibold text-primary">Class {className}</h4>
                                  <ul className="text-xs text-muted-foreground space-y-1 mt-1">
                                    {topStudents[className].map((student, index) => (
                                        <li key={student.rollNumber + student.name} className="flex justify-between">
                                            <span>{index + 1}. {student.name}</span>
                                            <span className="font-bold">{student.score}/80</span>
                                        </li>
                                    ))}
                                  </ul>
                              </div>
                          ))}
                        </CardContent>
                    </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Student Directory & Results</CardTitle>
                    <CardDescription>Browse all registered students and their exam scores.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {Object.keys(groupedStudents).sort().map(className => (
                        <AccordionItem key={className} value={`class-${className}`}>
                          <AccordionTrigger className="text-lg font-bold">Class {className}</AccordionTrigger>
                          <AccordionContent>
                            {Object.keys(groupedStudents[className]).sort().map(section => (
                              <div key={section} className="mb-6">
                                <h4 className="font-headline text-xl font-semibold mb-2 text-primary">{section}</h4>
                                <div className="border rounded-md">
                                  <Table>
                                    <TableHeader>
                                      <TableRow>
                                        <TableHead className="w-[100px]">Roll No.</TableHead>
                                        <TableHead>Student Name</TableHead>
                                        <TableHead className="text-center">MCQ Score (/80)</TableHead>
                                        <TableHead className="text-center">Coding Score (/20)</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      {groupedStudents[className][section].map(student => {
                                        const result = getStudentResult(student);
                                        // Create a more robust unique key
                                        const uniqueKey = `${student.class}-${student.section}-${student.rollNumber}-${student.name}`;
                                        return (
                                          <TableRow key={uniqueKey}>
                                            <TableCell className="font-medium">{student.rollNumber}</TableCell>
                                            <TableCell>{student.name}</TableCell>
                                            <TableCell className="text-center">{result ? `${result.robotics}` : 'N/A'}</TableCell>
                                            <TableCell className="text-center font-medium">{result ? (result.coding === -1 ? 'Pending' : `${result.coding}`) : 'N/A'}</TableCell>
                                            <TableCell className="text-right">
                                              <Button variant="outline" size="sm" asChild>
                                                <Link href={`/results/${student.rollNumber}?class=${student.class}&section=${student.section}`}>
                                                  View Marksheet
                                                  <ExternalLink className="ml-2 h-4 w-4" />
                                                </Link>
                                              </Button>
                                            </TableCell>
                                          </TableRow>
                                        )
                                      })}
                                    </TableBody>
                                  </Table>
                                </div>
                              </div>
                            ))}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>

            </div>
        </main>
    </div>
  )
}
