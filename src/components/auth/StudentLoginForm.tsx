"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { findUser, findUserByName, setCurrentUser, getUsersByClassAndFaculty } from "@/lib/user-store";
import { useEffect, useState } from "react";

const FormSchema = z.object({
  rollNumber: z.string().optional(),
  name: z.string().optional(),
  class: z.string().min(1, "Class is required."),
  faculty: z.string().min(1, "Faculty/Stream is required."),
});

export default function StudentLoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [availableNames, setAvailableNames] = useState<string[]>([]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      rollNumber: "",
      name: "",
      class: "",
      faculty: "",
    },
  });

  const watchedClass = form.watch("class");
  const watchedFaculty = form.watch("faculty");

  const isClass12Commerce = watchedClass === "12" && watchedFaculty === "Commerce";

  useEffect(() => {
    if (isClass12Commerce) {
      const users = getUsersByClassAndFaculty("12", "Commerce");
      setAvailableNames(users.map(u => u.name));
    } else {
      setAvailableNames([]);
    }
  }, [watchedClass, watchedFaculty, isClass12Commerce]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    let user;
    if (isClass12Commerce) {
      if (!data.name) {
        toast({ variant: "destructive", title: "Missing Name", description: "Please select your name." });
        return;
      }
      user = findUserByName(data.name, data.class, data.faculty);
    } else {
      if (!data.rollNumber) {
        toast({ variant: "destructive", title: "Missing Roll No", description: "Please enter your roll number." });
        return;
      }
      user = findUser(data.rollNumber, data.class, data.faculty);
    }

    if (user) {
      setCurrentUser(user);
      toast({
        title: "Login Successful",
        description: `Welcome, ${user.name}!`,
      });
      router.push("/student/dashboard");
    } else {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "No student found with these details. Please check your selection.",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="class"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Class</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {["6", "7", "8", "9", "11", "12"].map((c) => (
                    <SelectItem key={c} value={c}>Class {c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="faculty"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Faculty / Stream</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select faculty" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {["Commerce", "Science", "Robotics", "Computer"].map((f) => (
                    <SelectItem key={f} value={f}>{f}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {isClass12Commerce ? (
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Your Name</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Search your name" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {availableNames.sort().map((name) => (
                      <SelectItem key={name} value={name}>{name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <FormField
            control={form.control}
            name="rollNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Roll Number</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <Button type="submit" className="w-full">Login to Student Portal</Button>
      </form>
    </Form>
  );
}
