'use client';

import { useEffect, useState } from "react";
import Logo from "@/components/Logo";
import { Stamp } from "lucide-react";

type CertificateProps = {
    studentName: string;
    className: string;
    rank: number;
    medal: 'Gold' | 'Silver' | 'Bronze';
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
    className,
    rank,
    medal,
}: CertificateProps) {
    const [issuedDate, setIssuedDate] = useState('');
    
    useEffect(() => {
        setIssuedDate(new Date().toLocaleDateString());
    }, []);

    const rankSuffix = (r: number) => {
        if (r === 1) return '1st';
        if (r === 2) return '2nd';
        if (r === 3) return '3rd';
        return `${r}th`;
    };

    const { gradient, shadow, textColor } = medalDetails[medal];

    return (
        <div className="bg-stone-50 text-black max-w-4xl mx-auto p-2 printable-content">
            <div className="border-[10px] border-solid border-blue-900 p-8 bg-white relative">
                 {/* Decorative Corner Elements */}
                <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-yellow-500"></div>
                <div className="absolute top-0 right-0 w-20 h-20 border-t-4 border-r-4 border-yellow-500"></div>
                <div className="absolute bottom-0 left-0 w-20 h-20 border-b-4 border-l-4 border-yellow-500"></div>
                <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-yellow-500"></div>

                <header className="flex flex-col items-center text-center mb-6">
                    <div className="w-24 h-24">
                        <Logo />
                    </div>
                    <h1 className="font-headline text-4xl font-bold text-blue-900 mt-4">
                        Holy Writ High School and Junior College
                    </h1>
                    <p className="text-gray-600 mt-1">Pimpoli, Barvi Dam Road, Badlapur (W)</p>
                </header>
                
                <div className="text-center my-8">
                    <h2 className="text-5xl font-headline font-extrabold text-red-700 tracking-wider uppercase">
                        Certificate of Achievement
                    </h2>
                </div>

                <div className="text-center text-xl space-y-4 my-8">
                    <p>This certificate is proudly presented to</p>
                    <h3 className="text-4xl font-bold font-serif text-blue-900 tracking-wide">
                        {studentName}
                    </h3>
                    <p className="px-8">
                        for outstanding academic excellence and securing the <span className="font-bold">{rankSuffix(rank)}</span> position
                        in the Robotics & AI Examination for Class {className} in the academic year 2025-2026.
                    </p>
                </div>

                <div className="flex justify-center my-10">
                    <div className="flex flex-col items-center text-center">
                        <div className={`relative w-28 h-28 rounded-full ${gradient} flex items-center justify-center shadow-xl ${shadow}`}>
                            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/30 to-transparent"></div>
                            <span className={`font-headline text-6xl font-extrabold ${textColor} drop-shadow`}>{rank}</span>
                        </div>
                        <p className={`text-3xl font-bold mt-4 ${textColor} drop-shadow-sm`}>{medal} Medal</p>
                    </div>
                </div>
                
                <div className="flex justify-between items-center mt-20 text-center">
                    <div>
                        <p className="font-serif text-lg border-t-2 border-gray-700 px-4 pt-1">Vikas Dalal</p>
                        <p className="text-sm font-semibold">Vice-Principal</p>
                    </div>
                     <div className="text-blue-800/50">
                       <Stamp size={80} strokeWidth={1}/>
                    </div>
                    <div>
                        <p className="font-serif text-lg border-t-2 border-gray-700 px-4 pt-1">Subrata Kundu</p>
                        <p className="text-sm font-semibold">Principal</p>
                    </div>
                </div>
                
                {issuedDate && (
                    <div className="text-center mt-6 text-xs text-gray-500">
                        <p>Issued on: {issuedDate}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
