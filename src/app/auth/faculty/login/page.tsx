'use client';

import FacultyLoginForm from "@/components/auth/FacultyLoginForm";
import Logo from "@/components/Logo";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function FacultyLoginPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md bg-card/90 backdrop-blur-lg">
        <CardHeader className="items-center text-center">
          <Logo />
          <CardTitle className="font-headline text-3xl">Faculty Login</CardTitle>
          <CardDescription>
            Enter your password to access the faculty dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isClient ? <FacultyLoginForm /> : null}
           <div className="mt-4 text-center text-sm">
            Not a faculty member? Go back to{" "}
            <Link href="/auth" className="underline text-primary">
              role selection
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
