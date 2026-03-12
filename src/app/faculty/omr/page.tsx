
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

  const renderQuestions = () => {
    const questions = [];
    for (let i = 1; i <= 40; i++) {
      questions.push(
        <div key={i} className="question-block">
          <div className="qrow">
            <div className="qno">Q.{i}</div>
            <div className="choices">
              {['A', 'B', 'C', 'D'].map((ch) => (
                <div key={ch} className="choice-item">
                  <div className="omr-circle" />
                  <span className="choice-label">{ch}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
    return questions;
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-gray-100 print:bg-white p-0 sm:p-8">
      {/* Controls - Hidden during print */}
      <div className="max-w-[1000px] mx-auto mb-6 flex justify-between items-center print:hidden px-4">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Button>
        <Button onClick={handlePrint}>
          <Printer className="mr-2 h-4 w-4" /> Print A4 OMR Sheet
        </Button>
      </div>

      {/* Official OMR Sheet */}
      <div className="sheet mx-auto print:m-0">
        <style jsx>{`
          .sheet {
            width: 210mm;
            min-height: 297mm;
            padding: 20mm;
            margin: auto;
            background: #ffffff;
            box-shadow: 0 4px 15px rgba(0,0,0,0.08);
            box-sizing: border-box;
            font-family: Arial, sans-serif;
            color: #e0559e;
          }

          @media print {
            .sheet {
              box-shadow: none;
              margin: 0;
              width: 210mm;
              height: 297mm;
            }
            @page {
              size: A4 portrait;
              margin: 0;
            }
          }

          header {
            text-align: center;
            margin-bottom: 10px;
          }

          h1 {
            margin: 0;
            font-size: 20px;
            text-transform: uppercase;
            color: #1e3a8a;
          }

          h2 {
            margin: 8px 0 0 0;
            font-size: 18px;
            color: #b91c1c;
            text-decoration: underline;
          }

          .top-info, .meta {
            display: flex;
            justify-content: space-between;
            margin-top: 10px;
            font-size: 14px;
            font-weight: bold;
          }

          .student-info {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-top: 15px;
            font-size: 14px;
          }

          .student-info div {
            border-bottom: 1px solid #ff66b2;
            padding: 5px 0;
          }

          .instructions {
            margin-top: 18px;
            border: 1px solid #ff66b2;
            padding: 12px;
            border-radius: 6px;
            font-size: 13px;
            line-height: 1.6;
            color: #333;
          }

          .omr-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            margin-top: 20px;
          }

          .question-block {
            padding: 8px;
            border: 1px dashed #ff66b2;
            border-radius: 6px;
          }

          .qrow {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .qno {
            font-weight: bold;
            font-size: 14px;
          }

          .choices {
            display: flex;
            gap: 12px;
          }

          .choice-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2px;
          }

          .omr-circle {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: 2px solid #ff66b2;
          }

          .choice-label {
            font-size: 10px;
            font-weight: bold;
          }

          .bottom-section {
            margin-top: 25px;
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            color: #333;
          }

          .box {
            border: 1px solid #ff66b2;
            padding: 8px 12px;
            border-radius: 5px;
            min-width: 100px;
            text-align: center;
            display: inline-block;
            font-weight: bold;
            color: #e0559e;
          }

          .signature-box {
            margin-top: 15px;
            font-weight: bold;
          }
        `}</style>

        <header>
          <div className="flex items-center justify-center gap-4">
            <div className="w-16 h-16">
              <Logo />
            </div>
            <h1>Holy Writ High School & Junior College, Badlapur (W)</h1>
          </div>
          <h2>Annual Exam (2025-26)</h2>
        </header>

        <div className="top-info">
          <div><strong>Date:</strong> {date}</div>
          <div><strong>Subject:</strong> {subject}</div>
          <div><strong>Marks:</strong> {marks}</div>
        </div>

        <div className="meta">
          <div><strong>Class:</strong> {className}</div>
          <div><strong>Time:</strong> {time}</div>
          <div><strong>SET:</strong> {set}</div>
        </div>

        <div className="student-info">
          <div><strong>Name:</strong> ________________________</div>
          <div><strong>Roll Number:</strong> ________________________</div>
          <div><strong>Section:</strong> ________________________</div>
        </div>

        <div className="instructions">
          <strong>Instructions for Candidates:</strong>
          <ol className="list-decimal list-inside mt-2 space-y-1">
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

        <div className="omr-grid">
          {renderQuestions()}
        </div>

        <div className="bottom-section">
          <div className="signature-box">Invigilator Sign: ____________________</div>
          <div className="signature-box">Examiner Name: ____________________</div>
          <div className="signature-box">Examiner Sign: ____________________</div>
        </div>

        <div className="bottom-section pt-4">
          <div className="font-bold">Total Marks Obtained: <span className="box ml-2"></span></div>
          <div className="font-bold">Out Of: <span className="box ml-2">{marks}</span></div>
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
