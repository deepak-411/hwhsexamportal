'use client';

import { useEffect, useState } from "react";
import Logo from "@/components/Logo";
import QRCode from "react-qr-code";
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
            "bg-stone-50 text-black w-full max-w-[800px] aspect-[1/1.414] mx-auto relative shadow-2xl printable-content",
            "print:fixed print:inset-0 print:m-0 print:p-0 print:shadow-none print:w-[210mm] print:h-[297mm] print:max-w-none flex items-center justify-center overflow-hidden"
        )}>
            <div className="border-[12px] border-solid border-[#1e3a8a] p-1 bg-white w-full h-full flex flex-col box-border">
                 <div className="border-[6px] border-solid border-[#eab308] p-8 print:p-12 relative flex flex-col items-center justify-between flex-grow box-border">
                    
                    {/* Header Section */}
                    <div className="w-full text-center space-y-2">
                        <h1 className="font-headline text-3xl print:text-4xl font-extrabold text-[#1e3a8a] uppercase tracking-tight">
                            Holy Writ High School and Junior College
                        </h1>
                        <p className="text-gray-500 text-lg print:text-xl font-medium">
                            Pimpoli, Barvi Dam Road, Badlapur (W)
                        </p>
                        <div className="flex justify-center pt-4">
                            <div className="w-20 h-20 print:w-28 print:h-28">
                                <Logo />
                            </div>
                        </div>
                    </div>

                    {/* Title Section */}
                    <div className="text-center my-4">
                        <h2 className="text-4xl print:text-6xl font-bold text-[#b91c1c] tracking-wider uppercase leading-none" style={{ fontFamily: "'Times New Roman', serif" }}>
                            CERTIFICATE OF <br/> EXCELLENCE
                        </h2>
                    </div>

                    {/* Main Body Text */}
                    <div className="text-center space-y-4 w-full px-4">
                        <p className="text-xl print:text-2xl font-medium italic text-gray-800">This is to certify that</p>
                        <div className="space-y-1">
                            <h3 className="text-4xl print:text-5xl font-black text-[#1e3a8a] tracking-wide" style={{ fontFamily: "'Times New Roman', serif" }}>
                                {studentName}
                            </h3>
                            <p className="text-lg print:text-xl text-gray-700 font-bold uppercase">Roll Number: {rollNumber}</p>
                        </div>
                        <p className="px-6 text-lg print:text-2xl leading-snug font-medium text-gray-800 max-w-2xl mx-auto">
                            has demonstrated outstanding academic excellence and secured the <span className="font-black text-black">{rankSuffix(rank)}</span> position in the Robotics & AI Examination for Class {className} in the academic year 2025-2026.
                        </p>
                    </div>

                    {/* Medal Section */}
                    <div className="flex flex-col items-center py-4">
                        <div className={`relative w-24 h-24 print:w-32 print:h-32 rounded-full ${gradient} flex items-center justify-center shadow-2xl ${shadow} border-4 border-white/30`}>
                            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/40 to-transparent"></div>
                            <span className={`font-headline text-5xl print:text-7xl font-extrabold ${textColor} drop-shadow-lg`}>{rank}</span>
                        </div>
                        <p className={`text-2xl print:text-3xl font-black mt-2 ${textColor} uppercase tracking-widest`}>{medal}</p>
                    </div>

                    {/* Footer Section */}
                    <div className="w-full flex justify-between items-end pt-8">
                        <div className="text-left space-y-2">
                            <p className="text-sm print:text-lg font-bold">Date: {issuedDate}</p>
                            <div className="pt-2">
                                <QRCode value={qrValue} size={64} level="L" />
                            </div>
                            <p className="text-[12px] print:text-sm text-black font-mono font-bold mt-2">Cert. No: {certificateNumber}</p>
                        </div>
                        
                        <div className="text-center w-48 mb-4">
                            <div className="w-full h-[1.5px] bg-black mb-2"></div>
                            <p className="font-bold text-lg print:text-xl text-gray-900 uppercase">Principal</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
