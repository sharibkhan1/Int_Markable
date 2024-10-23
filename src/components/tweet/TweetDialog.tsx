"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState, useTransition } from 'react';
import { Tweet } from "./tweetcard";
import { tweets } from "@/lib/tweets";
import FileUpload from "@/components/file-upload";

// Define the schema for the tweet form
const tweetSchema = z.object({
  description: z.string().min(1, "Discription must be at least 1 character long."), // Allow empty description
  image: z.string().nonempty("Image is required"), // Image is compulsory
});

interface TweetDialogProps {
  onTweetSubmit: (data: z.infer<typeof tweetSchema>) => void;
}

export default function TweetDialog({ onTweetSubmit }: TweetDialogProps) {
  const [tweetLists, setTweetLists] = useState<Tweet[]>(tweets); // State for tweet list
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const form = useForm<z.infer<typeof tweetSchema>>({
    resolver: zodResolver(tweetSchema),
    defaultValues: {
      description: "",
      image: "",
    },
});

  return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary" className="mb-4 px-4 py-2 bg-[#FFC83A] dark:bg-[#FFC83A] rounded-md border border-black  text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200 " > New Message</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Send a Message</DialogTitle>
            </DialogHeader>
            {/* Form for creating a new tweet */}
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onTweetSubmit)} className="space-y-4">
              <FormField
                            control={form.control}
                            name="image"
                            render={({field})=>(
                                <FormItem>
                                    <FormControl>
                                        <FileUpload 
                                            endpoint="serverImage"
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                            />
              <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                    <textarea
                          {...field}
                          disabled={isPending}
                          placeholder="Description"
                          className="w-full border p-2"
                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />                

  <FormError message={error} />
  <FormSuccess message={success} />
              <Button type="submit" variant="secondary" disabled={isPending} className="bg-[#FFC83A] text-[#333333] px-8 py-2 rounded-md font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-[#FFC83A]"
              >
                Post
              </Button>
            </form>
            </Form>
          </DialogContent>
        </Dialog>
  );
}
