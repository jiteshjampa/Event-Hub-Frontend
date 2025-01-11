"use client";
import React, { useState } from "react";
import { Plus, Search, Users, Trash2, Edit } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function AttendeesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data - replace with API calls
  const [attendees, setAttendees] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      event: "Tech Conference 2024",
    },
    // Add more mock data
  ]);

  const [events] = useState([
    { id: 1, name: "Tech Conference 2024" },
    { id: 2, name: "Digital Summit 2024" },
  ]);

  const handleAddAttendee = (formData) => {
    // Add attendee logic
  };

  const handleDeleteAttendee = (id) => {
    setAttendees(attendees.filter((attendee) => attendee.id !== id));
  };

  const filteredAttendees = attendees.filter(
    (attendee) =>
      attendee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attendee.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Users className="h-8 w-8" />
          Attendee Management
        </h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Attendee
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Attendee</DialogTitle>
            </DialogHeader>
            <form className="space-y-4">
              <Input placeholder="Name" />
              <Input type="email" placeholder="Email" />
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Event" />
                </SelectTrigger>
                <SelectContent>
                  {events.map((event) => (
                    <SelectItem key={event.id} value={event.id.toString()}>
                      {event.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button type="submit" className="w-full">
                Add Attendee
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search attendees..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Event" />
              </SelectTrigger>
              <SelectContent>
                {events.map((event) => (
                  <SelectItem key={event.id} value={event.id.toString()}>
                    {event.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Event</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAttendees.map((attendee) => (
              <TableRow key={attendee.id}>
                <TableCell>{attendee.name}</TableCell>
                <TableCell>{attendee.email}</TableCell>
                <TableCell>{attendee.event}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDeleteAttendee(attendee.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default AttendeesPage;
