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
    const isSpecialQ15 = n === 15 && set === '2';
    return (
      <div key={n} className="question-block">
        <div className="qrow">
          <div className="qno">Q.{n}</div>
          {isSpecialQ15 ? (
            <div className="ans-box"></div>
          ) : (
            <div className="choices">
              {['A', 'B', 'C', 'D'].map((ch) => (
                <label key={ch} className="choice-label">
                  <div className="omr-circle"></div>
                  <span>{ch}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

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
            padding: 8mm 10mm;
            background: #fff;
            box-sizing: border-box;
            color: var(--accent-dark);
            position: relative;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          @media print {
            .sheet {
              border: none;
              box-shadow: none;
              margin: 0 !important;
              padding: 8mm 10mm !important;
              width: 210mm !important;
              height: 297mm !important;
              position: absolute !important;
              top: 0 !important;
              left: 0 !important;
              visibility: visible !important;
              z-index: 9999 !important;
            }
          }

          header {
            text-align: center;
            margin-bottom: 5px;
            border-bottom: 2px solid var(--accent);
            padding-bottom: 5px;
          }

          h1 {
            margin: 0;
            font-size: 22px;
            font-weight: 900;
            color: #1e3a8a;
            text-transform: uppercase;
          }

          h2 {
            margin: 4px 0 0 0;
            font-size: 18px;
            text-align: center;
            color: var(--accent-dark);
            font-weight: bold;
          }

          .meta-info {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 5px;
            margin-top: 8px;
            font-size: 14px;
            font-weight: bold;
          }

          .student-info {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-top: 10px;
            font-size: 14px;
            font-weight: bold;
          }

          .student-info div {
            border-bottom: 1.5px solid var(--accent);
            padding: 3px 0;
          }

          .instructions-box {
            margin-top: 10px;
            border: 1.5px solid var(--accent);
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 12px;
            line-height: 1.4;
            color: #333;
            background: #fff5fa;
          }

          .omr-container {
            flex: 1;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-top: 15px;
          }

          .section-title {
            background: var(--accent);
            color: white;
            padding: 2px 10px;
            font-weight: 900;
            font-size: 13px;
            text-align: center;
            border-radius: 4px;
            margin-bottom: 8px;
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

          .choice-label {
            display: flex;
            align-items: center;
            gap: 4px;
            font-size: 13px;
            font-weight: 900;
          }

          .omr-circle {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            border: 2px solid var(--accent);
            background: transparent;
          }

          .ans-box {
            flex: 1;
            margin-left: 10px;
            border: 1.5px solid var(--accent);
            height: 22px;
            border-radius: 3px;
            background: #fff;
          }

          .bottom-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-top: 10px;
            font-size: 13px;
            font-weight: bold;
          }

          .box {
            border: 2px solid var(--accent);
            padding: 4px 10px;
            border-radius: 4px;
            min-width: 80px;
            text-align: center;
            display: inline-block;
            font-weight: 900;
            font-size: 16px;
          }

          .signature-row {
            display: flex;
            justify-content: space-between;
            margin-top: 15px;
            font-size: 12px;
            font-weight: bold;
          }
        `}</style>

        <header>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
            <img 
              src="https://mychildmate.in/AdmissionForm/img/holywritlogo_512_512.png" 
              alt="School Logo" 
              style={{ width: '70px', height: '70px', objectFit: 'contain' }} 
            />
            <div style={{ textAlign: 'center' }}>
                <h1>Holy Writ High School & Junior College</h1>
                <p style={{ margin: 0, fontSize: '14px', fontWeight: 'bold', color: '#666' }}>Badlapur (W), Dist. Thane</p>
            </div>
          </div>
          <h2>Annual Examination (2025-26)</h2>
        </header>

        <div className="meta-info">
          <div>DATE: {date}</div>
          <div>SUBJECT: {subject}</div>
          <div>MARKS: {marks}</div>
          <div>CLASS: {className}</div>
          <div>TIME: {time}</div>
          <div>SET: {set}</div>
        </div>

        <div className="student-info">
          <div>NAME: ____________________________</div>
          <div>ROLL NO: ____________________________</div>
          <div>SECTION: ____________________________</div>
        </div>

        <div className="instructions-box">
          <strong>Important Instructions:</strong>
          <ol style={{ marginTop: '4px', paddingLeft: '18px', listStyleType: 'decimal' }}>
            <li>Use <strong>Black Ball Point Pen</strong> only to darken the circles.</li>
            <li>Fill <strong>only one circle</strong> for Q.1 to Q.20. Completely darken the circle.</li>
            <li>Fill <strong>more than one circle</strong> for Q.21 to Q.40 where required.</li>
            <li>Ensure Name, Roll No, and Section are clearly written in the boxes above.</li>
            <li>Do not fold or damage this sheet. No stray marks allowed on the grid.</li>
          </ol>
        </div>

        <div className="omr-container">
          {/* Section A Column (1-20) */}
          <div className="section-column">
            <div className="section-title">SECTION A (Q.1 - Q.20)</div>
            {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => renderQuestion(n))}
          </div>

          {/* Section B Column (21-40) */}
          <div className="section-column">
            <div className="section-title">SECTION B (Q.21 - Q.40)</div>
            {Array.from({ length: 20 }, (_, i) => i + 21).map((n) => renderQuestion(n))}
          </div>
        </div>

        <div className="bottom-grid">
          <div>Marks Obtained: <span className="box">__________</span></div>
          <div style={{ textAlign: 'right' }}>Grand Total: <span className="box">{marks}</span></div>
        </div>

        <div className="signature-row">
          <div>Invigilator Signature: __________________</div>
          <div>Examiner Signature: ___________________</div>
        </div>
      </div>
    </div>
  );
}

export default function OMRPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-[#ff66b2] font-bold">Initializing Official OMR...</div>}>
      <OMRContent />
    </Suspense>
  );
}
