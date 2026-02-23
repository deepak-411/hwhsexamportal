'use client';

import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function Footer() {
  const pathname = usePathname();
  
  // Hide footer during exams to maintain full-screen focus and proctoring layout
  if (pathname.startsWith('/exam')) return null;

  return (
    <footer className={cn(
      "w-full py-6 px-4 bg-card/30 backdrop-blur-md border-t mt-auto text-center shrink-0 no-print"
    )}>
      <div className="container mx-auto space-y-1">
        <p className="text-sm font-medium text-foreground">
          &copy; 2026 Holy Writ High School & Junior College
        </p>
        <p className="text-xs text-muted-foreground">
          Developed & Maintained by <span className="font-semibold text-primary">Deepak Kumar (Robotics & AI)</span>
        </p>
        <p className="text-[10px] uppercase tracking-widest text-accent font-bold">
          Advance Technology Lab
        </p>
      </div>
    </footer>
  );
}