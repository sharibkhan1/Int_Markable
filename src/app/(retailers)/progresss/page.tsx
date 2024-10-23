import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import GalleryPage from '@/components/peoples/galleryy'
import PersonalProgress from '@/components/personall/personProgress'
import BoardsProjexts from '@/components/personall/boards'
import TaskList from '@/components/personall/task'

const page = () => {
  return (
    <Tabs defaultValue="account" className="w-[screen]">
  <TabsList >
    <TabsTrigger value="account">Task</TabsTrigger>
    <TabsTrigger value="password">Boards</TabsTrigger>
    <TabsTrigger value="pass">Personal Progress</TabsTrigger>
  </TabsList>
  <TabsContent value="account"><TaskList/></TabsContent>
  <TabsContent value="password"><BoardsProjexts/></TabsContent>
  <TabsContent value="pass"><PersonalProgress/></TabsContent>
</Tabs>

  )
}

export default page