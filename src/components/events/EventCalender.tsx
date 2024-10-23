"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/datepicker";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DateRange } from "react-day-picker"; // Ensure this import is present

// Sample events data
const sampleEvents = [
  {
    id: 1,
    title: "Team Meeting",
    date: "2024-10-25",
    details: "Discuss project milestones and deadlines.",
    status: "joined",
  },
  {
    id: 2,
    title: "Conference Call",
    date: "2024-10-30",
    details: "Weekly update on project progress.",
    status: "not_rsvp",
  },
  {
    id: 3,
    title: "Client Presentation",
    date: "2024-11-02",
    details: "Present the quarterly results to the client.",
    status: "not_joined",
  },
  {
    id: 4,
    title: "Project Kickoff",
    date: "2024-10-20",
    details: "Initial meeting for project kickoff.",
    status: "joined",
  },
  {
    id: 5,
    title: "Brainstorming Session",
    date: "2024-11-05",
    details: "Creative brainstorming for new ideas.",
    status: "not_rsvp",
  },
];

const EventCalendarPage = () => {
  const [events, setEvents] = useState(sampleEvents);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    details: "",
  });
  
  // Correctly type selectedRange
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(undefined);
  const [filterStatus, setFilterStatus] = useState("all");

  // Function to add a new event
  const addEvent = () => {
    const newEventData = {
      id: events.length + 1,
      title: newEvent.title,
      date: newEvent.date,
      details: newEvent.details,
      status: "joined",
    };
    setEvents([...events, newEventData]);
    setNewEvent({ title: "", date: "", details: "" });
  };

  // Function to handle Join
  const handleJoin = (eventId: number) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === eventId ? { ...event, status: "not_rsvp" } : event
      )
    );
  };

  // Function to handle Cancel
  const handleCancel = (eventId: number) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === eventId ? { ...event, status: "not_joined" } : event
      )
    );
  };

  // Function to filter events based on selected date range and status
  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    const withinDateRange =
      (selectedRange?.from ? eventDate >= selectedRange.from : true) &&
      (selectedRange?.to ? eventDate <= selectedRange.to : true);
    
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "joined" && event.status === "joined") ||
      (filterStatus === "not_rsvp" && event.status === "not_rsvp") ||
      (filterStatus === "not_joined" && event.status === "not_joined");

    return withinDateRange && matchesStatus;
  });

  return (
    <div className="flex flex-col w-full p-4">
      {/* Upcoming Events and Add Event Section */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Upcoming Events</h2>
        <div className="">
        <Dialog >
          <DialogTrigger asChild>
            <Button variant="secondary" className="mb-4 px-4 py-2 bg-[#FFC83A] dark:bg-[#FFC83A] rounded-md border border-black  text-black text-sm dark:hover:shadow-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200 " >Add New Event</Button>
          </DialogTrigger>
          <DialogContent >
            <DialogHeader>
              <DialogTitle>Add a new event here</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
            <input
              type="text"
              placeholder="Event Title"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              className="mb-2 border rounded p-1 w-full"
            />
            <input
              type="date"
              value={newEvent.date}
              onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
              className="mb-2 border rounded p-1 w-full"
            />
            <textarea
              placeholder="Event Details"
              value={newEvent.details}
              onChange={(e) => setNewEvent({ ...newEvent, details: e.target.value })}
              className="mb-2 border rounded p-1 w-full"
            />
            <Button onClick={addEvent} className="bg-blue-500 text-white">
              Add Event
            </Button>
          </DialogContent>
        </Dialog>
        </div>
      </div>
      {/* Dropdown for Filtering Events */}
      <div className="flex flex-row sticky z-20 top-0 mr-2" >
      <DropdownMenu >
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="mb-4 px-4 py-2 bg-[#FFC83A] dark:bg-[#FFC83A] rounded-md border border-black  text-black text-sm dark:hover:shadow-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200 w-full md:w-[20rem] mr-0 md:mr-4" >Filter Events</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={filterStatus} onValueChange={setFilterStatus}>
            <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="not_rsvp">Not RSVP</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="joined">Joined</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="not_joined">Not Joined</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Date Range Picker */}
      <DatePickerWithRange className=" w-[20rem] sm:w-[5rem] " onChange={(range) => setSelectedRange(range)} />
      </div>

      {/* List of Filtered Events */}
      <div className="mt-4">
        {filteredEvents.map((event) => (
          <div key={event.id} className="mb-4 p-2 border rounded">
            <h3 className="font-bold">{event.title}</h3>
            {event.date ? (
              <p>{format(new Date(event.date), "PPP")}</p>
            ) : (
              <p className="text-red-500">Invalid Date</p>
            )}
            <p>{event.details}</p>
            <div className="flex items-center space-x-2">
              <span
                className={cn(
                  "inline-block h-2 w-2 rounded-full",
                  event.status === "joined"
                    ? "bg-green-500"
                    : event.status === "not_rsvp"
                    ? "bg-yellow-500"
                    : "bg-red-500"
                )}
              ></span>
              <span className="text-sm">
                {event.status === "joined"
                  ? "You joined this event"
                  : event.status === "not_rsvp"
                  ? "You are RSVP'd but not joined"
                  : "You have not joined this event"}
              </span>
            </div>
            {event.status === "not_joined" ? (
              <Button className="mt-2" onClick={() => handleJoin(event.id)}>
                Join
              </Button>
            ) : (
              <Button className="mt-2 bg-red-500" onClick={() => handleCancel(event.id)}>
                Cancel
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCalendarPage;
