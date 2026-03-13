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
  const set = searchParams.get('set') || '2';
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
    // The image shows 2 columns. Column 1 (Left) has odd/even? 
    // Usually, it's 1-20 left, 21-40 right or Q1 left, Q2 right.
    // Based on the image Q.1 is left, Q.2 is right.
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
      <div className="max-w-[800px] mx-auto mb-6 flex justify-between items-center print:hidden px-4">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Button>
        <Button onClick={handlePrint} className="bg-[#ff66b2] hover:bg-[#e0559e] text-white">
          <Printer className="mr-2 h-4 w-4" /> Print A4 OMR Sheet
        </Button>
      </div>

      {/* Professional OMR Sheet Container */}
      <div className="sheet mx-auto print:m-0 printable-content">
        <style jsx>{`
          .sheet {
            width: 210mm;
            min-height: 297mm;
            padding: 10mm 15mm;
            margin: auto;
            background: #ffffff;
            box-shadow: 0 4px 15px rgba(0,0,0,0.08);
            box-sizing: border-box;
            font-family: 'Arial', sans-serif;
            color: #ff66b2;
          }

          @media print {
            .sheet {
              box-shadow: none;
              margin: 0;
              width: 210mm;
              height: 297mm;
              padding: 8mm 12mm;
            }
            @page {
              size: A4 portrait;
              margin: 0;
            }
          }

          header {
            text-align: center;
            margin-bottom: 5px;
          }

          .header-top {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 15px;
          }

          h1 {
            margin: 0;
            font-size: 22px;
            font-weight: bold;
            color: #ff66b2;
            text-transform: none;
          }

          h2 {
            margin: 10px 0;
            font-size: 18px;
            color: #ff66b2;
            font-weight: bold;
          }

          .meta-info {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 10px;
            margin-bottom: 15px;
            font-size: 12px;
            font-weight: bold;
          }

          .meta-item {
            display: flex;
            justify-content: space-between;
          }

          .student-fields {
            margin-bottom: 15px;
            font-size: 13px;
            font-weight: bold;
          }

          .field-row {
            display: flex;
            gap: 20px;
            margin-bottom: 8px;
          }

          .field-line {
            border-bottom: 1px solid #ff66b2;
            flex-grow: 1;
            height: 18px;
          }

          .instructions-box {
            border: 1.5px solid #ff66b2;
            border-radius: 10px;
            padding: 10px 15px;
            margin-bottom: 20px;
            font-size: 11px;
            line-height: 1.4;
            color: #ff66b2;
          }

          .instructions-box strong {
            display: block;
            margin-bottom: 5px;
            font-size: 12px;
          }

          .omr-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px 30px;
            margin-bottom: 20px;
          }

          .question-block {
            border-bottom: 1px dashed #ff66b2;
            padding: 6px 0;
          }

          .qrow {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }

          .qno {
            font-weight: bold;
            font-size: 14px;
            min-width: 40px;
          }

          .choices {
            display: flex;
            gap: 15px;
          }

          .choice-item {
            display: flex;
            align-items: center;
            gap: 4px;
          }

          .omr-circle {
            width: 18px;
            height: 18px;
            border-radius: 50%;
            border: 1.5px solid #ff66b2;
            background: transparent;
          }

          .choice-label {
            font-size: 12px;
            font-weight: bold;
          }

          .footer-section {
            margin-top: auto;
            border-top: 1px solid #ff66b2;
            padding-top: 15px;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 10px;
            font-size: 11px;
            font-weight: bold;
          }

          .footer-marks {
            margin-top: 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-weight: bold;
            font-size: 13px;
          }

          .marks-box {
            border: 1.5px solid #ff66b2;
            padding: 5px 15px;
            border-radius: 5px;
            min-width: 80px;
            text-align: center;
            height: 25px;
            display: inline-block;
          }
        `}</style>

        <header>
          <div className="header-top">
            <div className="w-12 h-12">
              <Logo />
            </div>
            <h1>Holy Writ High School & Junior College, Badlapur (W)</h1>
          </div>
          <h2>Annual Exam (2025-26)</h2>
        </header>

        <div className="meta-info">
          <div className="meta-item"><span>Date:</span> <span>{date}</span></div>
          <div className="meta-item"><span>Subject:</span> <span>{subject}</span></div>
          <div className="meta-item"><span>Marks:</span> <span>{marks}</span></div>
          <div className="meta-item"><span>Class:</span> <span>{className}</span></div>
          <div className="meta-item"><span>Time:</span> <span>{time}</span></div>
          <div className="meta-item"><span>SET:</span> <span>{set}</span></div>
        </div>

        <div className="student-fields">
          <div className="field-row">
            <span>Name:</span>
            <div className="field-line"></div>
            <span>Roll Number:</span>
            <div className="field-line" style={{ flexGrow: 0, width: '150px' }}></div>
          </div>
          <div className="field-row">
            <span>Section:</span>
            <div className="field-line"></div>
          </div>
        </div>

        <div className="instructions-box">
          <strong>Instructions for Candidates:</strong>
          <ol className="list-decimal list-inside space-y-0.5">
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

        <div className="footer-section">
          <div>Invigilator Sign: ____________________</div>
          <div>Examiner Name: ____________________</div>
          <div>Examiner Sign: ____________________</div>
        </div>

        <div className="footer-marks">
          <div className="flex items-center gap-2">
            Total Marks Obtained: <span className="marks-box"></span>
          </div>
          <div className="flex items-center gap-2">
            Out Of: <span className="marks-box">{marks}</span>
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
