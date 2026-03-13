'use client';

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer } from "lucide-react";

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

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-gray-100 print:bg-white p-0 sm:p-8 overflow-hidden">
      {/* Controls - Hidden during print */}
      <div className="max-w-[800px] mx-auto mb-6 flex justify-between items-center print:hidden px-4">
        <Button variant="outline" onClick={() => router.push('/faculty/dashboard')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Button>
        <Button onClick={handlePrint} className="bg-[#ff66b2] hover:bg-[#e0559e] text-white">
          <Printer className="mr-2 h-4 w-4" /> Print A4 OMR Sheet
        </Button>
      </div>

      {/* The Official Sheet */}
      <div className="sheet mx-auto printable-content">
        <style jsx>{`
          .sheet {
            --accent: #ff66b2;
            --accent-dark: #e0559e;
            --paper: #ffffff;
            font-family: Arial, sans-serif;
            width: 210mm;
            height: 297mm;
            margin: auto;
            padding: 8mm 12mm; /* Tightened for single page fit */
            background: #fff;
            box-sizing: border-box;
            color: var(--accent-dark);
            position: relative;
            overflow: hidden;
            border: 1px solid #eee;
          }

          @media print {
            .sheet {
              border: none;
              box-shadow: none;
              margin: 0 !important;
              padding: 6mm 10mm !important; /* Adjusted for maximum printable area */
              width: 210mm !important;
              height: 297mm !important;
              position: absolute !important;
              top: 0 !important;
              left: 0 !important;
              visibility: visible !important;
              z-index: 9999 !important;
              overflow: hidden !important;
            }
          }

          header {
            text-align: center;
            margin-bottom: 5px;
          }

          h1 {
            margin: 0;
            font-size: 19px;
            white-space: nowrap;
          }

          h2 {
            margin: 4px 0 0 0;
            font-size: 17px;
            text-align: center;
          }

          .top-info, .meta {
            display: flex;
            justify-content: space-between;
            margin-top: 6px;
            font-size: 13px;
          }

          .student-info {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-top: 8px;
            font-size: 13px;
          }

          .student-info div {
            border-bottom: 1px solid var(--accent);
            padding: 3px 0;
          }

          .instructions-box {
            margin-top: 10px;
            border: 1.5px solid var(--accent);
            padding: 8px;
            border-radius: 6px;
            font-size: 11px;
            line-height: 1.3;
            color: #333;
          }

          .omr-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
            margin-top: 12px;
          }

          .question-block {
            padding: 5px 8px;
            border: 1px dashed var(--accent);
            border-radius: 4px;
          }

          .qrow {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .qno {
            font-weight: bold;
            font-size: 11px;
          }

          .choices {
            display: flex;
            gap: 10px;
          }

          .choice-label {
            display: flex;
            align-items: center;
            gap: 3px;
            font-size: 11px;
            font-weight: bold;
          }

          .omr-radio {
            appearance: none;
            width: 15px;
            height: 15px;
            border-radius: 50%;
            border: 2px solid var(--accent);
            cursor: pointer;
            position: relative;
            background: transparent;
            margin: 0;
          }

          .omr-radio:checked {
            background: var(--accent);
          }

          .bottom-section {
            margin-top: 12px;
            display: flex;
            justify-content: space-between;
            font-size: 12px;
          }

          .signature-box {
            margin-top: 8px;
          }

          .box {
            border: 1.5px solid var(--accent);
            padding: 4px 10px;
            border-radius: 4px;
            min-width: 100px;
            text-align: center;
            display: inline-block;
            font-weight: bold;
          }
        `}</style>

        <header>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
            <img 
              src="https://mychildmate.in/AdmissionForm/img/holywritlogo_512_512.png" 
              alt="School Logo" 
              style={{ width: '55px', height: '55px', objectFit: 'contain' }} 
            />
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

        <div className="instructions-box">
          <strong>Instructions for Candidates:</strong>
          <ol style={{ marginTop: '4px', paddingLeft: '15px', listStyleType: 'decimal' }}>
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
          {Array.from({ length: 40 }, (_, i) => i + 1).map((n) => (
            <div key={n} className="question-block">
              <div className="qrow">
                <div className="qno">Q.{n}</div>
                <div className="choices">
                  {['A', 'B', 'C', 'D'].map((ch) => (
                    <label key={ch} className="choice-label">
                      <input type="radio" name={`q${n}`} className="omr-radio" />
                      {ch}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bottom-section">
          <div className="signature-box">Invigilator Sign: ________________________</div>
          <div className="signature-box">Examiner Name: ________________________</div>
          <div className="signature-box">Examiner Sign: ________________________</div>
        </div>

        <div className="bottom-section" style={{ alignItems: 'center', marginTop: '10px' }}>
          <div>Total Marks Obtained: <span className="box">________</span></div>
          <div>Out Of: <span className="box">{marks}</span></div>
        </div>
      </div>
    </div>
  );
}

export default function OMRPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-[#ff66b2]">Loading OMR...</div>}>
      <OMRContent />
    </Suspense>
  );
}