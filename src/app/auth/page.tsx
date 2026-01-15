import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, BookUser, GraduationCap } from "lucide-react";

export default function AuthPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <h1 className="mb-8 text-center font-headline text-5xl font-bold text-primary-foreground">
          Select Your Role
        </h1>
        <div className="grid gap-8 md:grid-cols-2">
          <Link href="/auth/student/login">
            <Card className="transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl h-full">
              <CardHeader className="items-center text-center">
                <div className="rounded-full bg-primary p-4">
                  <GraduationCap className="h-12 w-12 text-primary-foreground" />
                </div>
                <CardTitle className="mt-4 font-headline text-3xl">
                  Student Portal
                </CardTitle>
                <CardDescription>
                  Login or Register to take exams and view results.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center text-primary">
                <p className="font-bold">Proceed to Login</p>
                <ArrowRight className="ml-2 h-5 w-5" />
              </CardContent>
            </Card>
          </Link>

          <Link href="/auth/faculty/login">
            <Card className="transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl h-full">
              <CardHeader className="items-center text-center">
                <div className="rounded-full bg-primary p-4">
                  <BookUser className="h-12 w-12 text-primary-foreground" />
                </div>
                <CardTitle className="mt-4 font-headline text-3xl">
                  Faculty Portal
                </CardTitle>
                <CardDescription>
                  Manage exams and evaluate submissions.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center font-bold text-primary">
                <p>Proceed to Login</p>
                <ArrowRight className="ml-2 h-5 w-5" />
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
