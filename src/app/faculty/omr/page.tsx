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
            padding: 10mm 12mm;
            background: #fff;
            box-sizing: border-box;
            color: var(--accent-dark);
            position: relative;
            overflow: hidden;
            border: 1px solid #eee;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          @media print {
            .sheet {
              border: none;
              box-shadow: none;
              margin: 0 !important;
              padding: 5mm 8mm !important; /* Slightly reduced for full bleed */
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
            margin-bottom: 8px;
            border-bottom: 2px solid var(--accent);
            padding-bottom: 8px;
          }

          h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 900;
            color: #1e3a8a; /* Professional blue for school name */
            text-transform: uppercase;
          }

          h2 {
            margin: 6px 0 0 0;
            font-size: 20px;
            text-align: center;
            color: var(--accent-dark);
            font-weight: bold;
          }

          .top-info, .meta {
            display: flex;
            justify-content: space-between;
            margin-top: 10px;
            font-size: 16px;
            font-weight: bold;
          }

          .student-info {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-top: 15px;
            font-size: 16px;
            font-weight: bold;
          }

          .student-info div {
            border-bottom: 2px solid var(--accent);
            padding: 5px 0;
          }

          .instructions-box {
            margin-top: 15px;
            border: 2px solid var(--accent);
            padding: 12px;
            border-radius: 8px;
            font-size: 14px; /* Increased for readability */
            line-height: 1.5;
            color: #333;
            background: #fff5fa;
          }

          .omr-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            margin-top: 20px;
          }

          .question-block {
            padding: 8px 12px;
            border: 1px dashed var(--accent);
            border-radius: 6px;
            background: #fff;
          }

          .qrow {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .qno {
            font-weight: 900;
            font-size: 15px;
          }

          .choices {
            display: flex;
            gap: 15px;
          }

          .choice-label {
            display: flex;
            align-items: center;
            gap: 5px;
            font-size: 15px;
            font-weight: 900;
          }

          .omr-radio {
            appearance: none;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            border: 2.5px solid var(--accent);
            cursor: pointer;
            position: relative;
            background: transparent;
            margin: 0;
          }

          .omr-radio:checked {
            background: var(--accent);
          }

          .ans-box {
            flex: 1;
            margin-left: 20px;
            border: 2px solid var(--accent);
            height: 26px;
            border-radius: 4px;
            background: #fff;
          }

          .bottom-section {
            margin-top: 20px;
            display: flex;
            justify-content: space-between;
            font-size: 15px;
            font-weight: bold;
          }

          .signature-box {
            margin-top: 10px;
          }

          .box {
            border: 2px solid var(--accent);
            padding: 6px 15px;
            border-radius: 6px;
            min-width: 120px;
            text-align: center;
            display: inline-block;
            font-weight: 900;
            font-size: 18px;
          }
        `}</style>

        <header>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '25px' }}>
            <img 
              src="https://mychildmate.in/AdmissionForm/img/holywritlogo_512_512.png" 
              alt="School Logo" 
              style={{ width: '85px', height: '85px', objectFit: 'contain' }} 
            />
            <div style={{ textAlign: 'center' }}>
                <h1>Holy Writ High School & Junior College</h1>
                <p style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', color: '#666' }}>Badlapur (W), Dist. Thane</p>
            </div>
          </div>
          <h2>Annual Examination (2025-26)</h2>
        </header>

        <div className="top-info">
          <div>DATE: {date}</div>
          <div>SUBJECT: {subject}</div>
          <div>TOTAL MARKS: {marks}</div>
        </div>

        <div className="meta">
          <div>CLASS: {className}</div>
          <div>TIME: {time}</div>
          <div>SET: {set}</div>
        </div>

        <div className="student-info">
          <div>CANDIDATE NAME: ________________________</div>
          <div>ROLL NUMBER: ________________________</div>
          <div>SECTION: ________________________</div>
        </div>

        <div className="instructions-box">
          <strong>Important Instructions for Candidates:</strong>
          <ol style={{ marginTop: '8px', paddingLeft: '22px', listStyleType: 'decimal' }}>
            <li>Use <strong>only Black Ball Point Pen</strong> to darken the circles. Do not use pencil or ink pen.</li>
            <li>Fill only <strong>one circle</strong> for question numbers 1 to 20 (Except special format questions).</li>
            <li>Fill <strong>more than one circle</strong> for question numbers 21 to 40 (where applicable).</li>
            <li>Completely darken the circle. Do not tick (✓) or cross (✗) inside the circles.</li>
            <li>Ensure your Name, Roll Number, and Section are written clearly in the fields provided above.</li>
            <li>Do not fold, tear, or damage the OMR sheet. Avoid any stray marks on the grid.</li>
          </ol>
        </div>

        <div className="omr-grid">
          {Array.from({ length: 40 }, (_, i) => i + 1).map((n) => (
            <div key={n} className="question-block">
              <div className="qrow">
                <div className="qno">Q.{n}</div>
                
                {/* SET 2 Special Case for Q15: Rectangular Box */}
                {n === 15 && set === '2' ? (
                  <div className="ans-box"></div>
                ) : (
                  <div className="choices">
                    {['A', 'B', 'C', 'D'].map((ch) => (
                      <label key={ch} className="choice-label">
                        <input type="radio" name={`q${n}`} className="omr-radio" />
                        {ch}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="bottom-section">
          <div className="signature-box">Invigilator Signature: __________________</div>
          <div className="signature-box">Examiner Signature: ___________________</div>
        </div>

        <div className="bottom-section" style={{ alignItems: 'center', marginTop: '20px' }}>
          <div style={{ fontSize: '20px' }}>Marks Obtained: <span className="box">__________</span></div>
          <div style={{ fontSize: '20px' }}>Grand Total: <span className="box">{marks}</span></div>
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