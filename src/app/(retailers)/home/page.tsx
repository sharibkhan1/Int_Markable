"use client";
import { useState, useTransition } from 'react';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TweetCard, { Tweet } from "@/components/tweet/tweetcard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import FileUpload from "@/components/file-upload";
import { tweets } from "@/lib/tweets"; // Import initial tweets data
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
// Validation schema for the tweet form
const tweetSchema = z.object({
  description: z.string().min(1, "Discription must be at least 1 character long."), // Allow empty description
  image: z.string().nonempty("Image is required"), // Image is compulsory
});

export default function HomePage() {
  const [tweetList, setTweetList] = useState<Tweet[]>(tweets); // State for tweet list
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

  // Form submit handler
  const onSubmit = (data: z.infer<typeof tweetSchema>) => {
    
    const newTweet: Tweet = {
      id: tweetList.length + 1,
      username: "Current User", // Placeholder for current user
      userImg: "/logoo2.png", // Placeholder for user image
      timestamp: new Date().toLocaleString(),
      postContent: data.description || "", // Default to empty string if no description
      postImage: data.image || null, // Ensure image is provided
      comments: [],
      likes: 0,
      liked: false,
    };

    setTweetList([newTweet, ...tweetList]); // Add new tweet to the list
  };

  return (
    <div className="bg-[#F7F9FC] dark:bg-muted flex flex-col items-center min-h-screen p-4">
      <div className='absolute left-[4rem]'>
              <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary" className="mb-4 text-[##333333] hover:bg-[#f8df9e] dark:hover:bg-[#f8df9e] sticky bg-[#FFC83A] px-8 py-0.5  border-2 border-black dark:border-black uppercase text-black transition duration-200 text-sm shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] ">Add New Tweet</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload a new Message</DialogTitle>
            </DialogHeader>
            {/* Form for creating a new tweet */}
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                          placeholder="hello i am very thrilled to announce..."
                          className="w-full border p-2"
                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />                

  <FormError message={error} />
  <FormSuccess message={success} />
              <Button type="submit" variant="secondary" className='bg-[#FFC83A] text-[#333333] px-8 py-2 rounded-md font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-[#FFC83A]' disabled={isPending}
              >
                Post 
              </Button>
            </form>
            </Form>
          </DialogContent>
        </Dialog>
        </div>
      <div className="max-w-[50rem] w-full bg-[#76B2E4] rounded-lg shadow-lg p-4 mb-6">
        {/* Button to open the dialog for adding a new tweet */}
        {/* Display list of tweets */}
        {tweetList.length === 0 ? (
          <p className="text-gray-500 text-center">No tweets available.</p>
        ) : (
          tweetList.map((tweet) => <TweetCard key={tweet.id} tweet={tweet} />)
        )}
      </div>
    </div>
  );
}
