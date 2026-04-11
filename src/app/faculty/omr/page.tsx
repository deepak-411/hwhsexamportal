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
    <div className="min-h-screen bg-gray-100 print:bg-white p-0 sm:p-8 flex flex-col items-center">
      {/* Controls - Hidden during print */}
      <div className="w-[210mm] mb-6 flex justify-between items-center print:hidden">
        <Button variant="outline" onClick={() => router.push('/faculty/dashboard')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Button>
        <Button onClick={handlePrint} className="bg-[#ff66b2] hover:bg-[#e0559e] text-white font-bold h-12 px-8 text-lg shadow-lg">
          <Printer className="mr-2 h-5 w-5" /> PRINT OFFICIAL A4 OMR
        </Button>
      </div>

      {/* Official OMR Sheet - Locked to A4 Portrait */}
      <div className="official-sheet printable-content">
        <style jsx>{`
          .official-sheet {
            --accent: #ff66b2;
            --accent-dark: #e0559e;
            --blue-main: #1e3a8a;
            
            width: 210mm;
            height: 297mm;
            padding: 5mm 12mm;
            background: #fff;
            box-sizing: border-box;
            color: var(--blue-main);
            font-family: 'Arial', sans-serif;
            display: flex;
            flex-direction: column;
            position: relative;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          @media print {
            .official-sheet {
              box-shadow: none !important;
              position: absolute !important;
              top: 0 !important;
              left: 0 !important;
              margin: 0 !important;
            }
          }

          .header-container { text-align: center; margin-bottom: 8px; border-bottom: 4px solid var(--blue-main); padding-bottom: 10px; }
          .header-main { display: flex; align-items: center; justify-content: center; gap: 25px; }
          .school-logo { width: 110px; height: 110px; object-fit: contain; }
          h1 { margin: 0; font-size: 32px; font-weight: 900; color: var(--blue-main); text-transform: uppercase; line-height: 1.1; letter-spacing: -0.5px; }
          h2 { margin: 8px 0 0 0; font-size: 24px; font-weight: bold; color: var(--accent-dark); text-align: center; text-decoration: underline; text-transform: uppercase; letter-spacing: 1px; }

          .meta-info-grid {
            display: grid;
            grid-template-columns: 1.2fr 1fr 1fr;
            gap: 12px;
            margin-top: 12px;
            font-size: 17px;
            font-weight: 900;
            border-bottom: 2.5px solid var(--accent);
            padding-bottom: 10px;
          }

          .student-fields {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 25px;
            margin-top: 15px;
            font-size: 17px;
            font-weight: 900;
          }

          .field-line { border-bottom: 2px solid var(--accent); padding: 5px 0; display: flex; gap: 12px; }

          .instructions-box {
            margin-top: 15px;
            border: 2.5px solid var(--accent);
            padding: 12px 20px;
            border-radius: 10px;
            font-size: 14px;
            line-height: 1.5;
            color: #000;
            background: #fff5fa;
          }

          .omr-main-grid {
            flex: 1;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            margin-top: 20px;
          }

          .column-title {
            background: var(--accent);
            color: white;
            padding: 6px;
            font-weight: 900;
            font-size: 15px;
            text-align: center;
            border-radius: 5px;
            margin-bottom: 12px;
            text-transform: uppercase;
            letter-spacing: 1px;
          }

          .question-block {
            padding: 6px 12px;
            border: 1px dashed var(--accent);
            border-radius: 5px;
            margin-bottom: 8px;
          }

          .qrow { display: flex; justify-content: space-between; align-items: center; }
          .qno { font-weight: 900; font-size: 16px; width: 45px; color: var(--blue-main); }
          .choices { display: flex; gap: 18px; flex: 1; justify-content: space-around; }
          .choice-item { display: flex; align-items: center; gap: 6px; font-size: 15px; font-weight: 900; }
          .omr-bubble { width: 22px; height: 22px; border-radius: 50%; border: 2.5px solid var(--accent); background: transparent; }

          .ans-box-container { flex: 1; display: flex; align-items: center; gap: 12px; }
          .ans-label { font-size: 13px; font-weight: bold; color: var(--accent-dark); }
          .ans-box-rect { flex: 1; border: 2.5px solid var(--accent); height: 30px; border-radius: 5px; background: #fff; }

          .footer-section { margin-top: 20px; border-top: 4px double var(--blue-main); padding-top: 15px; }
          .signature-row { display: flex; justify-content: space-between; font-size: 15px; font-weight: 900; margin-bottom: 20px; }
          .marks-summary { display: flex; justify-content: space-between; align-items: center; font-size: 20px; font-weight: 900; }
          .marks-box { border: 2.5px solid var(--accent); padding: 6px 20px; border-radius: 5px; min-width: 120px; text-align: center; background: #fff; }
        `}</style>

        <div className="header-container">
          <div className="header-main">
            <img src="https://mychildmate.in/AdmissionForm/img/holywritlogo_512_512.png" alt="Logo" className="school-logo" />
            <div style={{ textAlign: 'center' }}>
                <h1>Holy Writ High School & Junior College</h1>
                <p style={{ margin: '2px 0 0 0', fontSize: '16px', fontWeight: 'bold', color: '#444' }}>Badlapur (W), Dist. Thane - Academic Session 2025-2026</p>
                <p style={{ margin: 0, fontSize: '13px', color: '#666', fontStyle: 'italic' }}>Affiliated to CBSE, New Delhi | An ISO 9001:2015 Certified Institution</p>
            </div>
          </div>
          <h2>Official Examination OMR Answer Sheet</h2>
        </div>

        <div className="meta-info-grid">
          <div>DATE: {date}</div>
          <div>SUBJECT: {subject}</div>
          <div>MARKS: {marks}</div>
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
          <strong>Important Instructions for Candidates:</strong>
          <ol style={{ marginTop: '5px', paddingLeft: '22px', listStyleType: 'decimal', fontWeight: 'bold' }}>
            <li>Use <strong>Only Black or Blue Ball Point Pen</strong> to darken the circles. Use of pencil is strictly prohibited.</li>
            <li>Darken only one circle for each question. Once darkened, it cannot be changed.</li>
            <li>Ensure that the bubble is filled completely. Partial or cross marks will not be evaluated.</li>
            <li>Do not make any stray marks on the sheet. Do not fold or tear the OMR sheet.</li>
          </ol>
        </div>

        <div className="omr-main-grid">
          <div className="section-column">
            <div className="column-title">SECTION A (Q.1 - Q.20)</div>
            {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => renderQuestion(n))}
          </div>
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
          <div className="marks-summary">
            <div>Marks Obtained: <span className="marks-box">__________</span></div>
            <div>Total Marks: <span className="marks-box">{marks}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OMRPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-[#ff66b2] font-bold text-2xl animate-pulse">Loading Official A4 Template...</div>}>
      <OMRContent />
    </Suspense>
  );
}
