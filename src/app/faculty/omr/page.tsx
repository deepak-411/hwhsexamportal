
'use client';

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer } from "lucide-react";
import Logo from "@/components/Logo";

function OMRContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const className = searchParams.get('class') || 'VI';
  const subject = searchParams.get('subject') || 'Computer';
  const set = searchParams.get('set') || '1';
  const marks = searchParams.get('marks') || '30';
  const time = searchParams.get('time') || '1.30 hours';
  const date = searchParams.get('date') || '14/03/2026';

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const renderQuestions = (start: number, end: number) => {
    const questions = [];
    for (let i = start; i <= end; i++) {
      questions.push(
        <div key={i} className="flex justify-between items-center p-2 border border-dashed border-[#ff66b2] rounded-md mb-2">
          <div className="font-bold text-sm">Q.{i}</div>
          <div className="flex gap-3">
            {['A', 'B', 'C', 'D'].map((ch) => (
              <div key={ch} className="flex flex-col items-center gap-1">
                <div className="w-5 h-5 rounded-full border-2 border-[#ff66b2]" />
                <span className="text-[10px] font-bold text-[#e0559e]">{ch}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return questions;
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-gray-100 print:bg-white p-4 sm:p-8">
      {/* Controls - Hidden during print */}
      <div className="max-w-[1000px] mx-auto mb-6 flex justify-between items-center print:hidden">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Button>
        <Button onClick={handlePrint}>
          <Printer className="mr-2 h-4 w-4" /> Print A4 OMR Sheet
        </Button>
      </div>

      {/* Official OMR Sheet */}
      <div className="sheet max-w-[1000px] mx-auto bg-white p-8 print:p-0 shadow-lg print:shadow-none min-h-[297mm] flex flex-col box-border border-8 border-white">
        <style jsx global>{`
          @media print {
            @page {
              size: A4 portrait;
              margin: 0;
            }
            body {
              margin: 0;
              padding: 0;
            }
            .no-print {
              display: none !important;
            }
          }
          .omr-grid-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
          }
        `}</style>

        <header className="text-center mb-4">
          <div className="flex items-center justify-center gap-4">
            <div className="w-16 h-16">
              <Logo />
            </div>
            <h1 className="text-2xl font-bold text-[#1e3a8a] uppercase tracking-tight">
              Holy Writ High School & Junior College, Badlapur (W)
            </h1>
          </div>
          <h2 className="text-xl font-bold text-[#b91c1c] mt-2 underline decoration-2 underline-offset-4">
            Annual Exam (2025-26)
          </h2>
        </header>

        <div className="flex justify-between border-y border-[#ff66b2] py-2 px-1 text-sm font-bold text-[#e0559e] mb-4">
          <div>DATE: {date}</div>
          <div>SUBJECT: {subject}</div>
          <div>MARKS: {marks}</div>
          <div>CLASS: {className}</div>
          <div>TIME: {time}</div>
          <div>SET: {set}</div>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="border-b-2 border-[#ff66b2] pb-1">
            <span className="text-xs font-bold text-[#e0559e]">NAME:</span>
          </div>
          <div className="border-b-2 border-[#ff66b2] pb-1">
            <span className="text-xs font-bold text-[#e0559e]">ROLL NUMBER:</span>
          </div>
          <div className="border-b-2 border-[#ff66b2] pb-1">
            <span className="text-xs font-bold text-[#e0559e]">SECTION:</span>
          </div>
        </div>

        <div className="border-2 border-[#ff66b2] p-4 rounded-lg bg-[#fff0f7] mb-6">
          <h4 className="font-bold text-sm text-[#e0559e] underline mb-2">Instructions for Candidates:</h4>
          <ol className="list-decimal list-inside text-[13px] leading-relaxed text-gray-800 space-y-1">
            <li>Use <strong>only Black Ball Point Pen</strong> to darken the circles.</li>
            <li>Fill only <strong>one circle</strong> for question 1-20.</li>
            <li>Fill more than one <strong>circle</strong> for question 21-40.</li>
            <li>Completely darken the circle. Do not tick (✓) or cross (✗).</li>
            <li>Do not use pencil, gel pen, or ink pen.</li>
            <li>Avoid stray marks on the OMR sheet.</li>
            <li>Do not fold, tear, or damage the OMR sheet.</li>
            <li>Write your Name, Roll Number, and Section correctly.</li>
          </ol>
        </div>

        <div className="omr-grid-container flex-grow">
          {/* Section A */}
          <div className="flex flex-col">
            <h3 className="text-center font-bold text-[#e0559e] border-b-2 border-[#ff66b2] mb-4 py-1 bg-[#fff0f7]">SECTION A</h3>
            {renderQuestions(1, 20)}
          </div>
          
          {/* Section B */}
          <div className="flex flex-col">
            <h3 className="text-center font-bold text-[#e0559e] border-b-2 border-[#ff66b2] mb-4 py-1 bg-[#fff0f7]">SECTION B</h3>
            {renderQuestions(21, 40)}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-8 border-t-2 border-[#ff66b2] pt-6">
          <div className="text-center">
            <div className="border-b border-black mb-1 h-8" />
            <p className="text-[10px] font-bold uppercase text-gray-600">Invigilator Sign</p>
          </div>
          <div className="text-center">
             <div className="border-b border-black mb-1 h-8" />
            <p className="text-[10px] font-bold uppercase text-gray-600">Examiner Name</p>
          </div>
          <div className="text-center">
             <div className="border-b border-black mb-1 h-8" />
            <p className="text-[10px] font-bold uppercase text-gray-600">Examiner Sign</p>
          </div>
        </div>

        <div className="flex justify-between items-end mt-8 pb-4">
          <div className="flex items-center gap-4">
            <span className="font-bold text-[#e0559e]">TOTAL MARKS OBTAINED:</span>
            <div className="w-24 h-10 border-2 border-[#ff66b2] rounded-md" />
          </div>
          <div className="flex items-center gap-4">
            <span className="font-bold text-[#e0559e]">OUT OF:</span>
            <div className="w-16 h-10 border-2 border-[#ff66b2] rounded-md flex items-center justify-center font-bold text-lg">
              {marks}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OMRPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-primary">Loading OMR...</div>}>
      <OMRContent />
    </Suspense>
  );
}
