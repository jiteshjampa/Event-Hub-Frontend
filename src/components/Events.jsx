"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar as CalendarIcon,
  MapPin,
  Users,
  ChevronRight,
  Search,
  X,
  Edit,
  Trash,
  Plus,
} from "lucide-react";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Textarea } from "./ui/textarea";

// Sample data
const popularEvents = [
  {
    id: 1,
    name: "Tech Conference 2024",
    description: "Annual technology conference",
    image: "/tech-conf.jpg",
    location: "San Francisco",
    date: new Date("2024-06-15"),
    attendees: 250,
  },
  {
    id: 2,
    name: "Digital Summit",
    description: "Digital transformation summit",
    image: "/digital-summit.jpg",
    location: "New York",
    date: new Date("2024-07-20"),
    attendees: 180,
  },
  {
    id: 3,
    name: "AI Expo",
    description: "Artificial Intelligence Exhibition",
    image: "/ai-expo.jpg",
    location: "London",
    date: new Date("2024-08-10"),
    attendees: 300,
  },
  {
    id: 4,
    name: "Startup Festival",
    description: "Innovation and startup showcase",
    image: "/startup-fest.jpg",
    location: "Tokyo",
    date: new Date("2024-09-05"),
    attendees: 200,
  },
];
const locations = ["San Francisco", "New York", "London", "Tokyo"];

export default function Events() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODFmOTFjNDJkZGQyZDM1ZTAxMDYxOCIsImlhdCI6MTczNjU4ODgxNiwiZXhwIjoxNzM2Njc1MjE2fQ.5fHYqo5CvAT9U2j6Wk5DS_jXjMYpjjSpgDq3XIwj6so";

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const {
    register: registerNew,
    handleSubmit: handleNewSubmit,
    reset,
    formState: { errors: newErrors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      location: "",
      date: "",
    },
    resolver: zodResolver(
      z.object({
        name: z.string().min(1, "Name is required"),
        description: z.string().min(1, "Description is required"),
        location: z.string().min(1, "Location is required"),
        date: z.string().refine((date) => new Date(date) > new Date(), {
          message: "Date must be in the future",
        }),
      })
    ),
  });
  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:5000/api/events", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const data = await response.json();
      console.log(data);
      setEvents(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create event");
      }
      reset();
      setOpen(false);
      // Refresh events list
      fetchEvents();
    } catch (error) {}
  };
  useEffect(() => {
    fetchEvents();
  }, []);

  const handleEditEvent = (event) => {
    setCurrentEvent(event);
    setEditModalOpen(true);
    setValue("name", event.name);
    setValue("description", event.description);
    setValue("location", event.location);
    setValue("date", format(new Date(event.date), "yyyy-MM-dd"));
  };
  const handleDeleteEvent = (event) => {
    setCurrentEvent(event);
    setDeleteModalOpen(true);
  };

  const onEditSubmit = (data) => {
    console.log("Edited event:", data);
    setEditModalOpen(false);
    onEditEvent(currentEvent.id, data);
  };

  const onAddSubmit = (data) => {
    console.log("New event:", data);
    setAddModalOpen(false);
    onAddEvent(data);
    reset();
  };

  const confirmDeleteEvent = () => {
    console.log("Deleting event:", currentEvent);
    setDeleteModalOpen(false);
    onDeleteEvent(currentEvent.id);
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesLocation = selectedLocation
      ? event.location === selectedLocation
      : true;

    return matchesSearch && matchesLocation;
  });

  const handleViewDetails = (event) => {
    router.push(`/events/${event.id}`);
  };

  const handleAssignAttendees = (eventId) => {
    router.push(`/events/${eventId}/attendees`);
  };
  const ResetFilters = () => {
    setSearchTerm("");
    setSelectedLocation("");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Filters */}
      <section className="mb-8 flex justify-between">
        <div className="flex flex-col md:flex-row w-full gap-4">
          <Input
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="md:w-1/3"
            icon={<Search className="h-4 w-4" />}
          />
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="md:w-1/4">
              <SelectValue placeholder="Filter by location" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {(searchTerm || selectedLocation) && (
            <Button variant="outline" onClick={ResetFilters}>
              <X />
              Clear Filters
            </Button>
          )}
        </div>
        <Button onClick={() => setAddModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" /> Add Event
        </Button>
      </section>

      {/* Events Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 p-4">{error}</div>
        ) : events.length === 0 ? (
          <div className="text-center text-gray-500 p-4">No events found</div>
        ) : (
          filteredEvents.map((event) => (
            <Card key={event.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{event.name}</CardTitle>
                <CardDescription>{event.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    <span>{format(event.date, "PPP")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{event.attendees.length} attendees</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col w-full">
                <div className="flex justify-evenly mb-4 w-full">
                  <Button
                    variant="outline"
                    onClick={() => handleEditEvent(event)}
                  >
                    <Edit className="h-4 w-4 mr-2" /> Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDeleteEvent(event)}
                  >
                    <Trash className="h-4 w-4 mr-2" /> Delete
                  </Button>
                </div>
                <Button
                  className="w-full"
                  onClick={() => handleViewDetails(event)}
                >
                  View Details
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
        {filteredEvents.length === 0 && (
          <div className="col-span-full text-center py-10 text-gray-500">
            No events found matching your criteria
          </div>
        )}
        {/* Add Event Modal */}
        <Dialog open={addModalOpen} onOpenChange={setAddModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Event</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleNewSubmit(onSubmit)}>
              <Label htmlFor="new-name">Name</Label>
              <Input
                {...registerNew("name")}
                placeholder="Event Name"
                className={newErrors.name && "border-red-500"}
              />
              {newErrors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {newErrors.name.message}
                </p>
              )}

              <Label htmlFor="new-description" className="mt-4">
                Description
              </Label>
              <Textarea
                {...registerNew("description")}
                placeholder="Description"
                className={newErrors.description && "border-red-500"}
              />
              {newErrors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {newErrors.description.message}
                </p>
              )}

              <Label htmlFor="new-location" className="mt-4">
                Location
              </Label>
              <Select
                onValueChange={(value) => {
                  setSelectedLocation(value);
                  setValue("location", value, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
                value={selectedLocation}
              >
                <SelectTrigger
                  className={newErrors.location ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="Select a location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Location1">Location 1</SelectItem>
                  <SelectItem value="Location2">Location 2</SelectItem>
                </SelectContent>
              </Select>
              {newErrors.location && (
                <p className="text-red-500 text-sm mt-1">
                  {newErrors.location.message}
                </p>
              )}

              <Label htmlFor="new-date" className="mt-4">
                Date
              </Label>
              <Input
                {...registerNew("date")}
                type="datetime-local"
                className={newErrors.date && "border-red-500"}
              />
              {newErrors.date && (
                <p className="text-red-500 text-sm mt-1">
                  {newErrors.date.message}
                </p>
              )}

              <DialogFooter>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? "Creating..." : "Create Event"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        {/* Edit Modal */}
        <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Event</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onEditSubmit)}>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}

              <Label htmlFor="description" className="mt-4">
                Description
              </Label>
              <Input
                id="description"
                {...register("description", {
                  required: "Description is required",
                })}
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}

              <Label htmlFor="location" className="mt-4">
                Location
              </Label>
              <Select>
                <SelectTrigger
                  id="location"
                  {...register("location", {
                    required: "Location is required",
                  })}
                >
                  <SelectValue placeholder="Select a location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Location1">Location 1</SelectItem>
                  <SelectItem value="Location2">Location 2</SelectItem>
                </SelectContent>
              </Select>
              {errors.location && (
                <p className="text-red-500 text-sm">
                  {errors.location.message}
                </p>
              )}

              <Label htmlFor="date" className="mt-4">
                Date
              </Label>
              <Input
                type="date"
                id="date"
                {...register("date", { required: "Date is required" })}
              />
              {errors.date && (
                <p className="text-red-500 text-sm">{errors.date.message}</p>
              )}

              <DialogFooter>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Modal */}
        <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Event</DialogTitle>
            </DialogHeader>
            <p>Are you sure you want to delete this event?</p>
            <DialogFooter>
              <Button variant="destructive" onClick={confirmDeleteEvent}>
                Yes, Delete
              </Button>
              <Button onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </section>
    </div>
  );
}
