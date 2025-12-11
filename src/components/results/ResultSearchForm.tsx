
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
import { findUser } from "@/lib/user-store";

const FormSchema = z.object({
  rollNumber: z.string().min(1, "Roll number is required."),
  class: z.string().min(1, "Class is required."),
  section: z.string().min(1, "Section is required."),
});

export default function ResultSearchForm() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      rollNumber: "",
      class: "",
      section: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const user = findUser(data.rollNumber, data.class, data.section);

    if (user) {
      toast({
        title: "Student Found",
        description: `Redirecting to the results page for ${user.name}.`,
      });
      // Pass class and section in the query params for a more specific lookup
      router.push(`/results/${user.rollNumber}?class=${user.class}&section=${user.section}`);
    } else {
      toast({
        variant: "destructive",
        title: "Student Not Found",
        description: "No student found with these details. Please check and try again.",
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
                <Input placeholder="e.g., 101" {...field} />
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
                    <SelectValue placeholder="Select your class" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {["6", "7", "8", "9", "10"].map((c) => (
                    <SelectItem key={c} value={c}>
                      Class {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="section"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Section</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your section" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {["Daffodils", "Daisies", "A"].map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Search Result
        </Button>
      </form>
    </Form>
  );
}
