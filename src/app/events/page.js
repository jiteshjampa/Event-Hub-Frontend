"use client";

import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(null); // For updating event data
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    date: "",
  });

  const isEditing = !!currentEvent;

  // Fetch all events on page load
  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    try {
      const response = await fetch("http://localhost:5000/api/events", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  }

  async function handleEventSubmit(e) {
    e.preventDefault();

    try {
      const method = isEditing ? "PUT" : "POST";
      const endpoint = isEditing
        ? `http://localhost:5000/api/events/${currentEvent.id}`
        : "http://localhost:5000/api/events";

      await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      fetchEvents();
      resetForm();
    } catch (error) {
      console.error("Error submitting event:", error);
    }
  }

  function resetForm() {
    setFormData({ name: "", description: "", location: "", date: "" });
    setCurrentEvent(null);
  }

  async function handleDeleteEvent(id) {
    try {
      await fetch(`http://localhost:5000/api/events/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Manage Events</h1>

      {/* Radix UI Dialog for Creating/Updating Events */}
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            {isEditing ? "Update Event" : "Add New Event"}
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/50 fixed inset-0" />
          <Dialog.Content className="bg-white p-6 rounded-md fixed top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] shadow-lg w-[400px]">
            <Dialog.Title className="text-xl font-bold">
              {isEditing ? "Update Event" : "Add New Event"}
            </Dialog.Title>
            <form onSubmit={handleEventSubmit} className="space-y-4 mt-4">
              <div>
                <label className="block text-sm font-medium">Event Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="border rounded p-2 w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                  className="border rounded p-2 w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  required
                  className="border rounded p-2 w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  required
                  className="border rounded p-2 w-full"
                />
              </div>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Submit
              </button>
              <Dialog.Close asChild>
                <button
                  className="absolute top-2 right-2 text-gray-600 hover:text-black"
                  aria-label="Close"
                  onClick={resetForm}
                >
                  <Cross2Icon />
                </button>
              </Dialog.Close>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Event List */}
      <ul className="mt-8 space-y-4">
        {events.map((event) => (
          <li key={event.id} className="border p-4 rounded shadow">
            <h2 className="text-lg font-bold">{event.name}</h2>
            <p>{event.description}</p>
            <p>
              <strong>Location:</strong> {event.location}
            </p>
            <p>
              <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
            </p>
            <button
              onClick={() => setCurrentEvent(event)}
              className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteEvent(event.id)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
