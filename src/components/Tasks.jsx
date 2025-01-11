"use client";
import React, { useState } from "react";
import {
  ListTodo,
  Plus,
  Calendar,
  Search,
  CheckCircle2,
  Clock,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Badge } from "@/components/ui/badge";

// Sample data
const MOCK_TASKS = [
  {
    id: 1,
    name: "Prepare Presentation",
    deadline: "2024-04-15",
    status: "Pending",
    attendee: "John Doe",
  },
  {
    id: 2,
    name: "Review Documentation",
    deadline: "2024-04-20",
    status: "Completed",
    attendee: "Jane Smith",
  },
];

const MOCK_ATTENDEES = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState(MOCK_TASKS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusToggle = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: task.status === "Pending" ? "Completed" : "Pending",
            }
          : task
      )
    );
  };

  const handleAddTask = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newTask = {
      id: tasks.length + 1,
      name: formData.get("taskName"),
      deadline: formData.get("deadline"),
      status: "Pending",
      attendee: formData.get("attendee"),
    };
    setTasks([...tasks, newTask]);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <ListTodo className="h-8 w-8" />
          Task Management
        </h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddTask} className="space-y-4">
              <Input name="taskName" placeholder="Task Name" required />
              <Input name="deadline" type="date" required />
              <Select name="attendee">
                <SelectTrigger>
                  <SelectValue placeholder="Assign to" />
                </SelectTrigger>
                <SelectContent>
                  {MOCK_ATTENDEES.map((attendee) => (
                    <SelectItem key={attendee.id} value={attendee.name}>
                      {attendee.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button type="submit" className="w-full">
                Create Task
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-6 flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search tasks..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTasks.map((task) => (
          <Card
            key={task.id}
            className={task.status === "Completed" ? "bg-gray-50" : ""}
          >
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span className="truncate">{task.name}</span>
                <Badge
                  variant={
                    task.status === "Completed" ? "secondary" : "default"
                  }
                >
                  {task.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>{task.deadline}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <User className="h-4 w-4" />
                <span>{task.attendee}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleStatusToggle(task.id)}
              >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Toggle Status
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
