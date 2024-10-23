import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import EventCalendarPage from '@/components/events/EventCalender'
import Organizations from '@/components/events/organization'
import Projexts from '@/components/events/projexts'

const page = () => {
  return (
    <Tabs defaultValue="account" className="w-[screen]">
  <TabsList>
    <TabsTrigger value="account">Events</TabsTrigger>
    <TabsTrigger value="password">Organization</TabsTrigger>
    <TabsTrigger value="pass">Projects</TabsTrigger>
  </TabsList>
  <TabsContent value="account"><EventCalendarPage/></TabsContent>
  <TabsContent value="password"><Projexts/></TabsContent>
  <TabsContent value="pass"><Organizations/></TabsContent>
</Tabs>

  )
}

export default page