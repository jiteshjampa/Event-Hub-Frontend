"use client";
import React, { useEffect, useState } from "react";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  CalendarDays,
  Info,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

function EventDetails({ id }) {
  //const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const event = {
    _id: "507f1f77bcf86cd799439011",
    name: "Tech Conference 2024",
    description:
      "Join us for a day of cutting-edge technology discussions, workshops, and networking opportunities. Featured topics include AI, Cloud Computing, and Web Development.",
    location: "Digital Innovation Center, 123 Tech Street, Silicon Valley",
    date: "2024-06-15T09:00:00.000Z",
    attendees: [
      {
        _id: "507f1f77bcf86cd799439012",
        name: "John Smith",
        email: "john.smith@email.com",
        event: "507f1f77bcf86cd799439011",
      },
      {
        _id: "507f1f77bcf86cd799439013",
        name: "Emma Wilson",
        email: "emma.wilson@email.com",
        event: "507f1f77bcf86cd799439011",
      },
      {
        _id: "507f1f77bcf86cd799439014",
        name: "Michael Chen",
        email: "michael.chen@email.com",
        event: "507f1f77bcf86cd799439011",
      },
    ],
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Event not found
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-3xl font-bold">{event.name}</CardTitle>
            <Badge variant="secondary" className="text-lg">
              {new Date(event.date).toLocaleDateString()}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Description Section */}
          <div className="flex items-start gap-2">
            <Info className="w-5 h-5 mt-1 text-gray-500" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">About</h3>
              <p className="text-gray-600">{event.description}</p>
            </div>
          </div>

          <Separator />

          {/* Event Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Location */}
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-3 rounded-full">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Location</h3>
                <p className="text-gray-600">{event.location}</p>
              </div>
            </div>

            {/* Date & Time */}
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-3 rounded-full">
                <CalendarDays className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Date & Time</h3>
                <p className="text-gray-600">
                  {new Date(event.date).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Attendees Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Attendees ({event.attendees?.length || 0})
            </h3>
            <div className="flex flex-wrap gap-4">
              {event.attendees?.map((attendee, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Avatar>
                    <AvatarFallback>
                      {attendee.name?.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{attendee.name}</p>
                    <p className="text-sm text-gray-500">{attendee.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default EventDetails;
