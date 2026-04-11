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
import { findUser, setCurrentUser } from "@/lib/user-store";

const FormSchema = z.object({
  rollNumber: z.string().min(1, "Roll number is required."),
  class: z.string().min(1, "Class is required."),
  faculty: z.string().min(1, "Faculty/Stream is required."),
});

export default function StudentLoginForm() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      rollNumber: "",
      class: "",
      faculty: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const user = findUser(data.rollNumber, data.class, data.faculty);

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
        description: "No student found with these details. Check Faculty/Stream selection.",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
        <Button type="submit" className="w-full">Login to Student Portal</Button>
      </form>
    </Form>
  );
}
