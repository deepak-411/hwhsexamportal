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

  const renderQuestion = (n: number) => {
    // Special requirement: Set 2, Question 15 gets a rectangular box
    const isSpecialQ15 = n === 15 && set === '2';
    
    return (
      <div key={n} className="question-block">
        <div className="qrow">
          <div className="qno">Q.{n}</div>
          {isSpecialQ15 ? (
            <div className="ans-box-container">
              <div className="ans-label">Write Ans:</div>
              <div className="ans-box-rect"></div>
            </div>
          ) : (
            <div className="choices">
              {['A', 'B', 'C', 'D'].map((ch) => (
                <div key={ch} className="choice-item">
                  <div className="omr-bubble"></div>
                  <span>{ch}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 print:bg-white p-0 sm:p-8">
      {/* Controls - Hidden during print */}
      <div className="max-w-[800px] mx-auto mb-6 flex justify-between items-center print:hidden px-4">
        <Button variant="outline" onClick={() => router.push('/faculty/dashboard')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Button>
        <Button onClick={handlePrint} className="bg-[#ff66b2] hover:bg-[#e0559e] text-white font-bold">
          <Printer className="mr-2 h-4 w-4" /> Print Official OMR (A4)
        </Button>
      </div>

      {/* Official OMR Sheet */}
      <div className="official-sheet printable-content">
        <style jsx>{`
          .official-sheet {
            --accent: #ff66b2;
            --accent-dark: #e0559e;
            --paper: #ffffff;
            --blue-main: #1e3a8a;
            
            width: 210mm;
            height: 297mm;
            margin: auto;
            padding: 8mm 10mm;
            background: #fff;
            box-sizing: border-box;
            color: var(--accent-dark);
            font-family: Arial, sans-serif;
            display: flex;
            flex-direction: column;
            position: relative;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          @media print {
            .official-sheet {
              box-shadow: none;
              margin: 0 !important;
              padding: 8mm 10mm !important;
              width: 210mm !important;
              height: 297mm !important;
              position: absolute !important;
              top: 0 !important;
              left: 0 !important;
              visibility: visible !important;
            }
          }

          header {
            text-align: center;
            margin-bottom: 5px;
          }

          .header-main {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 15px;
          }

          .school-logo {
            width: 60px;
            height: 60px;
            object-fit: contain;
          }

          h1 {
            margin: 0;
            font-size: 20px;
            font-weight: 900;
            color: var(--blue-main);
            text-transform: uppercase;
          }

          h2 {
            margin: 5px 0 0 0;
            font-size: 18px;
            font-weight: bold;
            color: var(--accent-dark);
            text-align: center;
          }

          .info-row {
            display: flex;
            justify-content: space-between;
            margin-top: 8px;
            font-size: 13px;
            font-weight: bold;
          }

          .student-fields {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-top: 10px;
            font-size: 14px;
            font-weight: bold;
          }

          .field-line {
            border-bottom: 1.5px solid var(--accent);
            padding: 3px 0;
            display: flex;
            gap: 10px;
          }

          .instructions-box {
            margin-top: 10px;
            border: 1.5px solid var(--accent);
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 11px;
            line-height: 1.4;
            color: #333;
            background: #fff5fa;
          }

          .omr-main-grid {
            flex: 1;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-top: 12px;
          }

          .column-title {
            background: var(--accent);
            color: white;
            padding: 2px 10px;
            font-weight: 900;
            font-size: 13px;
            text-align: center;
            border-radius: 4px;
            margin-bottom: 8px;
            text-transform: uppercase;
          }

          .question-block {
            padding: 4px 8px;
            border: 1px dashed var(--accent);
            border-radius: 4px;
            margin-bottom: 4px;
          }

          .qrow {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .qno {
            font-weight: 900;
            font-size: 13px;
            width: 30px;
          }

          .choices {
            display: flex;
            gap: 12px;
            flex: 1;
            justify-content: space-around;
          }

          .choice-item {
            display: flex;
            align-items: center;
            gap: 4px;
            font-size: 13px;
            font-weight: 900;
          }

          .omr-bubble {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            border: 2px solid var(--accent);
            background: transparent;
          }

          .ans-box-container {
            flex: 1;
            display: flex;
            align-items: center;
            gap: 8px;
            margin-left: 5px;
          }

          .ans-label {
            font-size: 10px;
            font-weight: bold;
            color: #666;
          }

          .ans-box-rect {
            flex: 1;
            border: 2px solid var(--accent);
            height: 22px;
            border-radius: 3px;
            background: #fff;
          }

          .footer-section {
            margin-top: 10px;
            border-top: 2px solid var(--accent);
            padding-top: 8px;
          }

          .signature-row {
            display: flex;
            justify-content: space-between;
            font-size: 12px;
            font-weight: bold;
            margin-bottom: 10px;
          }

          .marks-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 14px;
            font-weight: 900;
          }

          .marks-box {
            border: 2px solid var(--accent);
            padding: 4px 12px;
            border-radius: 4px;
            min-width: 80px;
            text-align: center;
            display: inline-block;
            margin-left: 8px;
            font-size: 16px;
          }
        `}</style>

        <header>
          <div className="header-main">
            <img 
              src="https://mychildmate.in/AdmissionForm/img/holywritlogo_512_512.png" 
              alt="School Logo" 
              className="school-logo"
            />
            <div style={{ textAlign: 'center' }}>
                <h1>Holy Writ High School & Junior College</h1>
                <p style={{ margin: 0, fontSize: '12px', fontWeight: 'bold', color: '#666' }}>Badlapur (W), Dist. Thane</p>
            </div>
          </div>
          <h2>Annual Examination (2025-26)</h2>
        </header>

        <div className="info-row">
          <div>DATE: {date}</div>
          <div>SUBJECT: {subject}</div>
          <div>TOTAL MARKS: {marks}</div>
        </div>
        <div className="info-row" style={{ marginTop: '2px' }}>
          <div>CLASS: {className}</div>
          <div>TIME: {time}</div>
          <div>SET: {set}</div>
        </div>

        <div className="student-fields">
          <div className="field-line">NAME: <span style={{ flex: 1 }}></span></div>
          <div className="field-line">ROLL NO: <span style={{ flex: 1 }}></span></div>
          <div className="field-line">SECTION: <span style={{ flex: 1 }}></span></div>
          <div className="field-line">CATEGORY: <span style={{ flex: 1 }}></span></div>
        </div>

        <div className="instructions-box">
          <strong>Instructions for Candidates:</strong>
          <ol style={{ marginTop: '4px', paddingLeft: '15px', listStyleType: 'decimal' }}>
            <li>Use <strong>only Black Ball Point Pen</strong> to darken the circles.</li>
            <li>Fill <strong>only one circle</strong> for questions 1-20.</li>
            <li>Fill <strong>more than one circle</strong> for questions 21-40 where required.</li>
            <li>Completely darken the circle. Do not tick (✓) or cross (✗).</li>
            <li>Do not use pencil, gel pen, or ink pen. No stray marks allowed.</li>
            <li>Do not fold, tear, or damage this OMR sheet.</li>
            <li>Ensure Name, Roll Number, and Section are written correctly.</li>
          </ol>
        </div>

        <div className="omr-main-grid">
          {/* Section A Column (1-20) */}
          <div className="section-column">
            <div className="column-title">SECTION A (Q.1 - Q.20)</div>
            {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => renderQuestion(n))}
          </div>

          {/* Section B Column (21-40) */}
          <div className="section-column">
            <div className="column-title">SECTION B (Q.21 - Q.40)</div>
            {Array.from({ length: 20 }, (_, i) => i + 21).map((n) => renderQuestion(n))}
          </div>
        </div>

        <div className="footer-section">
          <div className="signature-row">
            <div>Invigilator Sign: ________________</div>
            <div>Examiner Name: ________________</div>
            <div>Examiner Sign: ________________</div>
          </div>

          <div className="marks-row">
            <div>Total Marks Obtained: <span className="marks-box">__________</span></div>
            <div>Maximum Marks: <span className="marks-box">{marks}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OMRPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-[#ff66b2] font-bold">Loading Official OMR Template...</div>}>
      <OMRContent />
    </Suspense>
  );
}
