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
              <div className="ans-label">Write Answer:</div>
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
            padding: 10mm 12mm;
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
              padding: 10mm 12mm !important;
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
            margin-bottom: 8px;
            border-bottom: 2px solid var(--accent);
            padding-bottom: 8px;
          }

          .header-main {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 20px;
          }

          .school-logo {
            width: 75px;
            height: 75px;
            object-fit: contain;
          }

          h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 900;
            color: var(--blue-main);
            text-transform: uppercase;
            letter-spacing: -0.5px;
          }

          h2 {
            margin: 5px 0 0 0;
            font-size: 20px;
            font-weight: bold;
            color: var(--accent-dark);
          }

          .info-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
            margin-top: 10px;
            font-size: 14px;
            font-weight: bold;
          }

          .student-fields {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-top: 12px;
            font-size: 15px;
            font-weight: bold;
          }

          .field-line {
            border-bottom: 1.5px solid var(--accent);
            padding: 4px 0;
            display: flex;
            gap: 10px;
          }

          .instructions-box {
            margin-top: 12px;
            border: 1.5px solid var(--accent);
            padding: 10px 15px;
            border-radius: 8px;
            font-size: 12px;
            line-height: 1.5;
            color: #333;
            background: #fff5fa;
          }

          .omr-main-grid {
            flex: 1;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 25px;
            margin-top: 15px;
          }

          .column-title {
            background: var(--accent);
            color: white;
            padding: 3px 10px;
            font-weight: 900;
            font-size: 14px;
            text-align: center;
            border-radius: 4px;
            margin-bottom: 10px;
            text-transform: uppercase;
          }

          .question-block {
            padding: 5px 10px;
            border: 1px dashed var(--accent);
            border-radius: 5px;
            margin-bottom: 5px;
          }

          .qrow {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .qno {
            font-weight: 900;
            font-size: 14px;
            width: 35px;
          }

          .choices {
            display: flex;
            gap: 15px;
            flex: 1;
            justify-content: space-around;
          }

          .choice-item {
            display: flex;
            align-items: center;
            gap: 5px;
            font-size: 14px;
            font-weight: 900;
          }

          .omr-bubble {
            width: 18px;
            height: 18px;
            border-radius: 50%;
            border: 2px solid var(--accent);
            background: transparent;
          }

          .ans-box-container {
            flex: 1;
            display: flex;
            align-items: center;
            gap: 10px;
            margin-left: 10px;
          }

          .ans-label {
            font-size: 11px;
            font-weight: bold;
            color: #666;
          }

          .ans-box-rect {
            flex: 1;
            border: 2px solid var(--accent);
            height: 24px;
            border-radius: 4px;
            background: #fff;
          }

          .footer-section {
            margin-top: 15px;
            border-top: 2px solid var(--accent);
            padding-top: 10px;
          }

          .signature-row {
            display: flex;
            justify-content: space-between;
            font-size: 13px;
            font-weight: bold;
            margin-bottom: 15px;
          }

          .marks-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 15px;
            font-weight: 900;
          }

          .marks-box {
            border: 2.5px solid var(--accent);
            padding: 6px 15px;
            border-radius: 6px;
            min-width: 100px;
            text-align: center;
            display: inline-block;
            margin-left: 10px;
            font-size: 18px;
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
                <p style={{ margin: 0, fontSize: '14px', fontWeight: 'bold', color: '#666' }}>Badlapur (W), Dist. Thane</p>
            </div>
          </div>
          <h2>Annual Examination (2025-26)</h2>
        </header>

        <div className="info-grid">
          <div>DATE: {date}</div>
          <div style={{ textAlign: 'center' }}>SUBJECT: {subject}</div>
          <div style={{ textAlign: 'right' }}>TOTAL MARKS: {marks}</div>
          
          <div>CLASS: {className}</div>
          <div style={{ textAlign: 'center' }}>TIME: {time}</div>
          <div style={{ textAlign: 'right' }}>SET: {set}</div>
        </div>

        <div className="student-fields">
          <div className="field-line">NAME: <span style={{ flex: 1 }}></span></div>
          <div className="field-line">ROLL NO: <span style={{ flex: 1 }}></span></div>
          <div className="field-line">SECTION: <span style={{ flex: 1 }}></span></div>
          <div className="field-line">CATEGORY: <span style={{ flex: 1 }}></span></div>
        </div>

        <div className="instructions-box">
          <strong>Important Instructions for Candidates:</strong>
          <ol style={{ marginTop: '5px', paddingLeft: '20px', listStyleType: 'decimal' }}>
            <li>Use <strong>only Black Ball Point Pen</strong> to darken the circles.</li>
            <li>Fill <strong>only one circle</strong> for questions 1-20. Completely darken the circle.</li>
            <li>Fill <strong>more than one circle</strong> for questions 21-40 where required.</li>
            <li>Do not use pencil, gel pen, or ink pen. No stray marks allowed on the sheet.</li>
            <li>Do not fold, tear, or damage this OMR sheet.</li>
            <li>Ensure Name, Roll Number, and Section are written correctly in the boxes above.</li>
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
            <div>Invigilator Signature: __________________</div>
            <div>Examiner Name: ___________________</div>
            <div>Examiner Signature: ___________________</div>
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
