'use client';

import { useEffect, useState } from "react";
import Logo from "@/components/Logo";
import QRCode from "react-qr-code";
import Image from "next/image";
import { cn } from "@/lib/utils";

type CertificateProps = {
    studentName: string;
    rollNumber: string;
    className: string;
    rank: number;
    medal: 'Gold' | 'Silver' | 'Bronze';
    certificateNumber: string;
};

const medalDetails = {
    Gold: {
        gradient: 'bg-gradient-to-br from-yellow-300 via-amber-400 to-yellow-600',
        shadow: 'shadow-yellow-400/50',
        textColor: 'text-amber-800'
    },
    Silver: {
        gradient: 'bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400',
        shadow: 'shadow-slate-400/50',
        textColor: 'text-slate-600'
    },
    Bronze: {
        gradient: 'bg-gradient-to-br from-amber-500 via-orange-600 to-amber-700',
        shadow: 'shadow-orange-500/50',
        textColor: 'text-orange-900'
    },
};

export default function Certificate({
    studentName,
    rollNumber,
    className,
    rank,
    medal,
    certificateNumber,
}: CertificateProps) {
    const [issuedDate, setIssuedDate] = useState('');
    
    useEffect(() => {
        setIssuedDate(new Date().toLocaleDateString('en-GB'));
    }, []);

    const rankSuffix = (r: number) => {
        if (r === 1) return '1st';
        if (r === 2) return '2nd';
        if (r === 3) return '3rd';
        return `${r}th`;
    };

    const { gradient, shadow, textColor } = medalDetails[medal];
    
    const qrValue = `Certificate No: ${certificateNumber}\nStudent: ${studentName}\nRoll No: ${rollNumber}`;

    return (
        <div className={cn(
            "bg-stone-50 text-black max-w-4xl mx-auto p-4",
            "print:fixed print:inset-0 print:m-0 print:p-0 print:shadow-none print:w-[100vw] print:h-[100vh] print:max-w-none print:bg-white overflow-hidden flex items-center justify-center certificate-print-mode printable-content"
        )}>
            <style jsx global>{`
                @media print {
                    @page {
                        size: A4 landscape;
                        margin: 0;
                    }
                }
            `}</style>
            <div className="border-[12px] border-solid border-blue-900 p-8 bg-white relative print:border-[15px] print:p-6 w-full h-full flex flex-col box-border">
                 <div className="border-[4px] border-solid border-yellow-500 p-6 relative flex flex-col print:p-4 print:border-4 flex-grow box-border">
                    {/* Watermark */}
                    <div className="absolute inset-0 flex items-center justify-center z-0 opacity-5 grayscale print:opacity-[0.03] pointer-events-none">
                        <div className="w-[500px] h-[500px] print:w-[700px] print:h-[700px] relative">
                        <Image
                            src="https://mychildmate.in/AdmissionForm/img/holywritlogo_512_512.png"
                            alt="School Logo Watermark"
                            fill
                            className="object-contain"
                        />
                        </div>
                    </div>

                    <div className="relative z-10 flex flex-col flex-grow items-center justify-between text-center">
                        <header className="flex flex-col items-center">
                            <h1 className="font-headline text-4xl print:text-5xl font-bold text-blue-900 uppercase tracking-tight">
                                Holy Writ High School and Junior College
                            </h1>
                            <p className="text-gray-600 mt-1 text-lg print:text-xl font-medium">Pimpoli, Barvi Dam Road, Badlapur (W)</p>
                            <div className="w-24 h-24 print:w-32 print:h-32 mt-2">
                                <Logo />
                            </div>
                        </header>
                        
                        <div className="my-1 print:my-2">
                            <h2 className="text-5xl print:text-7xl font-headline font-extrabold text-red-700 tracking-wider uppercase" style={{ fontFamily: "'Times New Roman', serif" }}>
                                Certificate of Excellence
                            </h2>
                        </div>

                        <div className="text-lg print:text-2xl space-y-4 my-2 max-w-3xl mx-auto">
                            <p className="italic text-gray-700">This is to certify that</p>
                            <div>
                                <h3 className="text-5xl print:text-6xl font-bold text-blue-900 tracking-wide border-b-2 border-blue-900 inline-block px-8 pb-1" style={{ fontFamily: "'Times New Roman', serif" }}>
                                    {studentName}
                                </h3>
                                <p className="text-xl print:text-2xl text-gray-700 mt-2 font-bold uppercase">Roll Number: {rollNumber}</p>
                            </div>
                            <p className="px-4 leading-relaxed font-medium">
                                has demonstrated outstanding academic excellence and secured the <span className="font-bold text-blue-900 underline underline-offset-4">{rankSuffix(rank)}</span> position
                                in the Robotics & AI Examination for Class {className} in the academic year 2025-2026.
                            </p>
                        </div>

                        <div className="flex justify-center my-2 print:my-4">
                            <div className="flex flex-col items-center text-center">
                                <div className={`relative w-28 h-28 print:w-40 print:h-40 rounded-full ${gradient} flex items-center justify-center shadow-2xl ${shadow} border-4 border-white/30`}>
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/40 to-transparent"></div>
                                    <span className={`font-headline text-6xl print:text-8xl font-extrabold ${textColor} drop-shadow-lg`}>{rank}</span>
                                </div>
                                <p className={`text-3xl print:text-4xl font-black mt-2 print:mt-3 ${textColor} drop-shadow uppercase tracking-widest`}>{medal}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="relative z-10 pt-4 mt-auto">
                        <div className="flex justify-between items-end border-t-2 border-blue-900/10 pt-4 print:pt-6">
                           <div className="w-1/3 text-left space-y-2">
                                {issuedDate && <p className="text-sm print:text-lg font-bold">Date: {issuedDate}</p>}
                                <p className="text-xs print:text-base text-gray-500 font-mono uppercase">Cert ID: {certificateNumber}</p>
                                <div className="mt-2 bg-white p-2 inline-block rounded shadow-sm no-print">
                                     <QRCode value={qrValue} size={60} level="L"/>
                                </div>
                            </div>
                            <div className="w-2/3 flex justify-around items-end">
                                <div className="text-center">
                                    <div className="h-16 print:h-24"></div>
                                    <p className="font-serif text-xl print:text-2xl border-t-2 border-blue-900 px-12 pt-2 font-bold text-blue-900">Principal</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}