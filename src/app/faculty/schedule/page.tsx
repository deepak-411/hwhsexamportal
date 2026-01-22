
'use client';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { storeExam } from '@/lib/exam-store';

export default function ScheduleExamPage() {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedSet, setSelectedSet] = useState('');
  const { toast } = useToast();
  const router = useRouter();

  const handleSchedule = () => {
    if (!selectedClass || !selectedSection || !selectedSet) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please select class, section, and question set.',
      });
      return;
    }
    
    storeExam({ selectedClass, selectedSection, selectedSet });

    toast({
      title: 'Exam Scheduled!',
      description: `Exam for Class ${selectedClass}-${selectedSection} with Set ${selectedSet} is now active.`,
    });

    router.push('/faculty/dashboard');
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">
       <div className="container mx-auto">
        <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" size="icon" asChild>
                <Link href="/faculty/dashboard"><ArrowLeft/></Link>
            </Button>
            <h1 className="font-headline text-4xl font-bold">
              Schedule New Exam
            </h1>
        </div>
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Exam Details</CardTitle>
            <CardDescription>Select the class, section, and question set for the exam.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="class">Class</Label>
                <Select onValueChange={setSelectedClass}>
                  <SelectTrigger id="class">
                    <SelectValue placeholder="Select Class" />
                  </SelectTrigger>
                  <SelectContent>
                    {['6', '7', '8', '9'].map(c => (
                      <SelectItem key={c} value={c}>Class {c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="section">Section</Label>
                <Select onValueChange={setSelectedSection}>
                  <SelectTrigger id="section">
                    <SelectValue placeholder="Select Section" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Daffodils">Daffodils</SelectItem>
                    <SelectItem value="Daisies">Daisies</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="set">Question Set</Label>
              <Select onValueChange={setSelectedSet}>
                <SelectTrigger id="set">
                  <SelectValue placeholder="Select Question Set" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 8 }, (_, i) => i + 1).map(s => (
                    <SelectItem key={s} value={String(s)}>Set {s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-4">
                <Button onClick={handleSchedule} className="flex-1">Schedule Exam</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
