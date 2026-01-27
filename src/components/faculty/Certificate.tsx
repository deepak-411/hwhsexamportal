'use client';

import { useEffect, useState } from "react";
import Logo from "@/components/Logo";
import QRCode from "react-qr-code";
import Image from "next/image";

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
        <div className="bg-stone-50 text-black max-w-4xl mx-auto p-2 printable-content print:m-0 print:p-0 print:shadow-none print:max-w-none print:w-full print:h-full">
            <div className="border-[12px] border-solid border-blue-900 p-6 bg-white relative print:border-4 print:p-2 h-full">
                 <div className="border-[4px] border-solid border-yellow-500 p-6 relative flex flex-col print:p-4 print:border-2 h-full">
                    {/* Watermark */}
                    <div className="absolute inset-0 flex items-center justify-center z-0 opacity-5 grayscale">
                        <div className="w-[500px] h-[500px] print:w-[400px] print:h-[400px]">
                        <Image
                            src="https://mychildmate.in/AdmissionForm/img/holywritlogo_512_512.png"
                            alt="School Logo Watermark"
                            fill
                            className="object-contain"
                        />
                        </div>
                    </div>

                    <div className="relative z-10 flex flex-col flex-grow">
                        <header className="flex flex-col items-center text-center mb-4 print:mb-2">
                            <div className="w-24 h-24 print:w-20 print:h-20">
                                <Logo />
                            </div>
                            <h1 className="font-headline text-4xl print:text-3xl font-bold text-blue-900 mt-4 print:mt-2">
                                Holy Writ High School and Junior College
                            </h1>
                            <p className="text-gray-600 mt-1 text-sm">Pimpoli, Barvi Dam Road, Badlapur (W)</p>
                        </header>
                        
                        <div className="text-center my-6 print:my-2">
                            <h2 className="text-5xl print:text-4xl font-headline font-extrabold text-red-700 tracking-wider uppercase" style={{ fontFamily: "'Times New Roman', serif" }}>
                                Certificate of Excellence
                            </h2>
                        </div>

                        <div className="text-center text-lg space-y-4 print:space-y-1 my-6 print:my-2 flex-grow">
                            <p>This is to certify that</p>
                            <div>
                                <h3 className="text-4xl print:text-3xl font-bold text-blue-900 tracking-wide" style={{ fontFamily: "'Times New Roman', serif" }}>
                                    {studentName}
                                </h3>
                                <p className="text-lg text-gray-700">Roll Number: {rollNumber}</p>
                            </div>
                            <p className="px-8 print:px-4 pt-2">
                                has demonstrated outstanding academic excellence and secured the <span className="font-bold">{rankSuffix(rank)}</span> position
                                in the Robotics & AI Examination for Class {className} in the academic year 2025-2026.
                            </p>
                        </div>

                        <div className="flex justify-center my-8 print:my-4">
                            <div className="flex flex-col items-center text-center">
                                <div className={`relative w-28 h-28 print:w-24 print:h-24 rounded-full ${gradient} flex items-center justify-center shadow-xl ${shadow}`}>
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/30 to-transparent"></div>
                                    <span className={`font-headline text-6xl print:text-5xl font-extrabold ${textColor} drop-shadow`}>{rank}</span>
                                </div>
                                <p className={`text-3xl print:text-2xl font-bold mt-4 print:mt-2 ${textColor} drop-shadow-sm`}>{medal} Medal</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="relative z-10 pt-6 print:pt-2">
                        <div className="flex justify-between items-end">
                            <div className="w-1/3 text-left">
                                {issuedDate && <p className="text-sm">Date: {issuedDate}</p>}
                                <p className="text-sm mt-1">Cert. No: {certificateNumber}</p>
                                <div className="mt-2">
                                     <QRCode value={qrValue} size={64} level="L"/>
                                </div>
                            </div>
                            <div className="w-1/3 text-center">
                                <p className="font-serif text-lg border-t-2 border-gray-700 px-4 pt-1">Vikas Dalal</p>
                                <p className="text-sm font-semibold">Vice-Principal</p>
                            </div>
                            <div className="w-1/3 text-center">
                                <p className="font-serif text-lg border-t-2 border-gray-700 px-4 pt-1">Subrata Kundu</p>
                                <p className="text-sm font-semibold">Principal</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
