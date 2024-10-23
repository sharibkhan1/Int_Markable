import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Organizations from '@/components/events/organization'
import GalleryPage from '@/components/peoples/galleryy'
import ContactPagee from '@/components/peoples/contactss'

const page = () => {
  return (
    <Tabs defaultValue="account" className="w-[screen]">
  <TabsList>
    <TabsTrigger value="account">Gallery</TabsTrigger>
    <TabsTrigger value="pass">followers</TabsTrigger>
  </TabsList>
  <TabsContent value="account"><GalleryPage/></TabsContent>
  <TabsContent value="pass"><ContactPagee/></TabsContent>
</Tabs>

  )
}

export default page