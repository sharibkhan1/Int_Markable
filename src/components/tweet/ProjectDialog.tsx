"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { useState } from "react";



// Define the schema for the project form
const projectSchema = z.object({
  title: z.string().min(1, "Title is required."),
  description: z.string().min(1, "Description must be at least 1 character long."),
});

interface ProjectDialogProps {
  onProjectSubmit: (data: z.infer<typeof projectSchema>) => void;
}

export default function ProjectDialog({ onProjectSubmit }: ProjectDialogProps) {
  const projectForm = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  return (
    <Dialog>
      <DialogTrigger asChild>
      <Button variant="secondary" className="mb-4 px-4 py-2 bg-[#FFC83A] dark:bg-[#FFC83A] rounded-md border border-black  text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200 " > Add Project</Button>   
         </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
        </DialogHeader>
        <Form {...projectForm}>
          <form onSubmit={projectForm.handleSubmit(onProjectSubmit)} className="space-y-4">
            <FormField
              control={projectForm.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <Input {...field} placeholder="Project Title" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={projectForm.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <Input {...field} placeholder="Project Description" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button type="submit" className="bg-[#FFC83A] text-[#333333] px-8 py-2 rounded-md font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-[#FFC83A]">Add Project</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
