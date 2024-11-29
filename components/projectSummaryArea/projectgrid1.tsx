"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "@/lib/axios"; // Import your Axios instance
import { useUser } from "@clerk/nextjs"; // Import useUser to get user details
import { Separator } from "@/components/ui/separator"; // Separator component for styling

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"; // Assuming these UI components exist

const ProjectGrid1 = () => {
  const [projects, setProjects] = useState<
    { _id: string; projectName: string }[]
  >([]); // Store projects
  const [tasks, setTasks] = useState<
    { _id: string; taskName: string; status: string; deadline: string }[]
  >([]); // Store tasks
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser(); // Get user info

  useEffect(() => {
    // Fetch the user's projects when the component mounts
    const fetchProjects = async () => {
      try {
        if (!user) {
          throw new Error("User not authenticated.");
        }

        const response = await axios.post("/projects/allDetails", {
          userId: user.id, // Send user ID to the server
        });

        setProjects(response.data); // Set projects from the response
      } catch (error: any) {
        console.error(
          "Error fetching projects:",
          error.response?.data || error.message
        );
        // Handle error (e.g., display a notification)
      }
    };

    // Fetch tasks (reminders)
    const fetchTasks = async () => {
      setLoading(true);
      setError(null);

      try {
        if (!user) {
          throw new Error("User not authenticated.");
        }

        const response = await axios.post("/task/taskList", {
          userId: user.id, // Send user ID to the server
        });

        if (response.status === 200) {
          const data = response.data;

          // Sorting tasks by deadline
          const sortedTasks = data.sort((a: any, b: any) => {
            const dateA = new Date(a.deadline).getTime();
            const dateB = new Date(b.deadline).getTime();
            return dateA - dateB;
          });

          setTasks(sortedTasks); // Set tasks (reminders) from the response
        } else {
          setError(response.data.error || "Failed to fetch tasks");
        }
      } catch (error: any) {
        console.error(
          "Error fetching tasks:",
          error.response?.data || error.message
        );
        setError(error.message || "An error occurred while fetching tasks");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProjects(); // Fetch projects if user is authenticated
      fetchTasks(); // Fetch tasks (reminders) if user is authenticated
    }
  }, [user]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "stopped":
        return "bg-red-500 text-white";
      case "ongoing":
        return "bg-yellow-500 text-white";
      case "completed":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-300 text-gray-700";
    }
  };

  const getDeadlineColor = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    if (diffDays >= 30) {
      return "text-green-500"; // 1 month or more
    } else if (diffDays < 30 && diffDays >= 15) {
      return "text-yellow-500"; // Less than 15 days
    } else if (diffDays < 15 && diffDays >= 3) {
      return "text-yellow-500"; // Less than 15 days (same as above)
    } else if (diffDays < 3 && diffDays >= 0) {
      return "text-red-500"; // Less than 3 days
    } else {
      return "line-through text-gray-500"; // Passed deadlines
    }
  };

  return (
    <div className="space-y-4 ">
      {/* Projects Scroll Area */}
      <div className="bg-white p-4 rounded-lg shadow-lg max-h-[300px]">
        <div className="mb-2">
          <h3 className="text-lg font-semibold">Projects</h3>
        </div>
        <ScrollArea className="h-60 overflow-y-auto">
          <div className="space-y-2">
            {projects.map((project) => (
              <Link key={project._id} href={`/projects/${project._id}`}>
                <button className="w-full text-center font-bold px-4 py-2 rounded-lg hover:bg-gray-200 transition border border-gray-100 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {project.projectName}
                </button>
              </Link>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Reminders Section */}
      <div className="shadow-lg h-[250px] bg-white p-4 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold">Reminders</h3>

          {/* Bell with Tooltip and Jingle Animation */}
          <div
            className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer group transition-transform hover:rotate-6"
            onClick={() => (window.location.href = "/tasks")} // Redirect to /tasks page
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 text-gray-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.437L4 17h5m6 0a3 3 0 11-6 0m6 0H9"
              />
            </svg>
            {/* Tooltip */}
            <span className="absolute bottom-[110%] left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
              View More
            </span>
          </div>
        </div>
        <ScrollArea className="h-[180px] overflow-y-auto">
          <div className="space-y-2">
            {loading ? (
              <p>Loading tasks...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Deadline</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tasks.map((task) => (
                    <TableRow key={task._id}>
                      <TableCell className="font-medium hover:shadow-md hover:rounded-lg hover:bg-gray-50 transition-all">
                        {task.taskName}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(
                            task.status
                          )}`}
                        >
                          {task.status}
                        </span>
                      </TableCell>
                      <TableCell className={getDeadlineColor(task.deadline)}>
                        {new Date(task.deadline).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </ScrollArea>
        <Separator className="my-2" />
      </div>
    </div>
  );
};

export default ProjectGrid1;
