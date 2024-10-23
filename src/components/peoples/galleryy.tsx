"use client";
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import FileUpload from "@/components/file-upload";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Card, Carousel } from "@/components/ui/apple-cards-carousel";
import { albumsData } from "@/lib/tweets";
import { FaPaperPlane, FaUpload } from 'react-icons/fa'; // Importing the upload icon

// Schema for album creation form validation
const albumSchema = z.object({
  title: z.string().min(1, "Album title is required."),
  description: z.string().min(1, "Description is required."),
  coverImage: z.string().nonempty("Cover image is required."),
});

type Album = {
  id: number;
  title: string;
  description: string;
  coverImage: string;
  images: string[]; // New field to store uploaded images
};

const GalleryPage = () => {
  const [albums, setAlbums] = useState<Album[]>(
    albumsData.map((album) => ({ ...album, images: [] })) // Initialize with an empty images array
  );
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  // Initialize form with zod validation
  const form = useForm<z.infer<typeof albumSchema>>({
    resolver: zodResolver(albumSchema),
    defaultValues: {
      title: "",
      description: "",
      coverImage: "",
    },
  });

  // Handle form submission to create a new album
  const onSubmit = (data: z.infer<typeof albumSchema>) => {
    const newAlbum: Album = {
      id: albums.length + 1,
      title: data.title,
      description: data.description,
      coverImage: data.coverImage,
      images: [], // Initialize with an empty images array
    };

    setAlbums([...albums, newAlbum]); // Add new album to state
    setSuccess("Album created successfully!");
  };

  // Handle image upload for the specific album
  const handleImageUpload = (albumId: number, image: string) => {
    setAlbums((prevAlbums) =>
      prevAlbums.map((album) =>
        album.id === albumId ? { ...album, images: [...album.images, image] } : album
      )
    );
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, albumId: number) => {
    const target = e.target; // This can be null
    if (target && target.files) {
      const file = target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        handleImageUpload(albumId, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="bg-gray-200 dark:bg-muted min-h-screen p-8">
      {/* Section for showing albums */}
      <Dialog>
        <DialogTrigger asChild>
          <Button     variant="secondary"      className=" dark:shadow-white sticky z-20 top-0 mb-4 dark:bg-[#FFC83A] px-4 py-2 rounded-md border border-black bg-[#FFC83A] text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200"
          >Create Album</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Album</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Cover Image Upload */}
              <FormField
                control={form.control}
                name="coverImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cover Image</FormLabel>
                    <FormControl>
                      <FileUpload
                        endpoint="serverImage"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Album Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Album Title</FormLabel>
                    <FormControl>
                      <input
                        {...field}
                        type="text"
                        placeholder="Enter album title"
                        className="w-full border p-2"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Album Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <textarea
                        {...field}
                        placeholder="Enter album description"
                        className="w-full border p-2"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormError message={error} />
              <FormSuccess message={success} />

              <Button type="submit" className="bg-[#FFC83A] text-[#333333] px-8 py-2 rounded-md font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-[#FFC83A]" disabled={isPending}>
                Create Album
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      {albums.length > 0 ? (
        <Carousel 
          items={albums.map((album, index) => (
            <Card
              key={album.id}
              index={index}
            
              card={{
                src: album.coverImage,
                title: album.title,
                content: (
                  <div  >
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {album.images.map((imgSrc, idx) => (
                        <img key={idx} src={imgSrc} alt={`Uploaded image ${idx + 1}`} className="w-full h-auto object-cover" />
                      ))}
                    </div>
                    <label className="ml-2 cursor-pointer">
                    <input
                      type="file"
                      onChange={(e) => handleFileChange(e, album.id)}
                      className="hidden" // Hiding the input element
                      />
                        <FaUpload className="text-gray-600 hover:text-gray-800 transition" size={24} />
                      </label>
                  </div>
                ),
              }}
            />
          ))}
        />
      ) : (
        <p>No albums created yet. Start by adding one!</p>
      )}

      {/* Dialog for creating new albums */}

    </div>
  );
};

export default GalleryPage;
