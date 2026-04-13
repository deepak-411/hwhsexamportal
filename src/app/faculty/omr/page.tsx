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
              <div className="ans-box-rect"></div>
            </div>
          ) : (
            <div className="choices">
              {['A', 'B', 'C', 'D'].map((ch) => (
                <div key={ch} className="choice-item">
                  <div className="omr-bubble"></div>
                  <span className="choice-label">{ch}</span>
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
      <div className="w-[210mm] mb-6 flex justify-between items-center print:hidden">
        <Button variant="outline" onClick={() => router.push('/faculty/dashboard')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Dashboard
        </Button>
        <Button onClick={handlePrint} size="lg">
          <Printer className="mr-2 h-5 w-5" /> PRINT OFFICIAL OMR (A4)
        </Button>
      </div>

      <div className="official-sheet printable-content">
        <style jsx>{`
          .official-sheet {
            width: 210mm;
            height: 297mm;
            padding: 10mm 15mm;
            background: #fff;
            color: #1e3a8a;
            font-family: Arial, sans-serif;
            display: flex;
            flex-direction: column;
            position: relative;
            box-sizing: border-box;
          }

          .header-container { 
            text-align: center; 
            margin-bottom: 10px; 
            border: 3px solid #1e3a8a;
            padding: 15px;
          }
          
          .school-logo { 
            width: 100px; 
            height: 100px; 
            margin-bottom: 5px;
          }
          
          h1 { margin: 0; font-size: 32px; font-weight: 900; text-transform: uppercase; }
          h2 { margin: 10px 0; font-size: 24px; color: #ff66b2; text-decoration: underline; font-weight: 900; }

          .meta-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
            font-size: 14px;
            font-weight: bold;
            border-bottom: 2px solid #ff66b2;
            padding-bottom: 5px;
            margin-bottom: 15px;
          }

          .omr-main-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            flex: 1;
          }

          .question-block {
            padding: 4px 10px;
            border: 1px dashed #ff66b2;
            margin-bottom: 5px;
            border-radius: 4px;
          }

          .qrow { display: flex; align-items: center; justify-content: space-between; }
          .qno { font-weight: 900; width: 40px; }
          .choices { display: flex; gap: 15px; flex: 1; justify-content: space-around; }
          .choice-item { display: flex; align-items: center; gap: 4px; }
          .omr-bubble { width: 18px; height: 18px; border-radius: 50%; border: 2px solid #ff66b2; }
          .ans-box-rect { flex: 1; height: 25px; border: 2px solid #ff66b2; border-radius: 4px; }

          .footer-section { margin-top: auto; border-top: 3px double #1e3a8a; padding-top: 15px; }
          .sig-row { display: flex; justify-content: space-between; font-weight: 900; font-size: 12px; }
        `}</style>

        <div className="header-container">
          <img src="https://mychildmate.in/AdmissionForm/img/holywritlogo_512_512.png" alt="Logo" className="school-logo mx-auto" />
          <h1>Holy Writ High School & Junior College</h1>
          <p className="text-sm font-bold">Pimpoli, Barvi Dam Road, Badlapur (W), Thane</p>
          <h2>OFFICIAL OMR ANSWER SHEET</h2>
        </div>

        <div className="meta-grid">
          <div>CLASS: {className}</div>
          <div>SUBJECT: {subject}</div>
          <div>SET: {set}</div>
          <div>MARKS: {marks}</div>
          <div>ROLL NO: ________</div>
          <div>NAME: ________</div>
        </div>

        <div className="omr-main-grid">
          <div className="col">
            <div className="bg-[#ff66b2] text-white text-center font-bold text-xs py-1 mb-2">SEC A (1-20)</div>
            {Array.from({ length: 20 }, (_, i) => i + 1).map(n => renderQuestion(n))}
          </div>
          <div className="col">
            <div className="bg-[#ff66b2] text-white text-center font-bold text-xs py-1 mb-2">SEC B (21-40)</div>
            {Array.from({ length: 20 }, (_, i) => i + 21).map(n => renderQuestion(n))}
          </div>
        </div>

        <div className="footer-section">
          <div className="sig-row">
            <div>Invigilator: ________________</div>
            <div>Examiner: ________________</div>
            <div>Marks Obtained: [ ______ / {marks} ]</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OMRPage() {
  return (
    <Suspense fallback={<div>Loading Template...</div>}>
      <OMRContent />
    </Suspense>
  );
}
