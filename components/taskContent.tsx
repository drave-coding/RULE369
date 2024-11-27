"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "@/lib/axios";


interface Task {
  _id: string;
  taskName: string;
  content: string;
  status: string;
  project: {
    projectId: string;
    projectName: string;
  };
  userId: string;
  deadline: string;
}

const TaskContent: React.FC = () => {
  const { user } = useUser(); // Get user info from Clerk
  const [tasks, setTasks] = useState<Task[]>([]); // Store tasks
  const [loading, setLoading] = useState<boolean>(false); // Track loading state
  const [error, setError] = useState<string | null>(null); // Track error state

  useEffect(() => {
    // Fetch tasks when the component mounts
    const fetchTasks = async () => {
      if (!user) {
        setError("User not authenticated.");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await axios.post("/task/taskList", {
          userId: user.id, // Pass userId from Clerk
        });

        setTasks(response.data); // Set tasks from the response
      } catch (error: any) {
        console.error("Error fetching tasks:", error.response?.data || error.message);
        setError(error.message || "Failed to fetch tasks");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchTasks(); // Fetch tasks if user is authenticated
    }
  }, [user]);

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-col space-y-4">
      {tasks.map((task, index) => (
        <div
          key={index}
          className="bg-slate-50 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
        >
          <h3 className="font-semibold text-xl">{task.taskName}</h3>
          <p><strong>Content:</strong> {task.content}</p>
          <p><strong>Id:</strong> {task._id}</p>
          <p><strong>Status:</strong> {task.status}</p>
          <p><strong>Project:</strong> {task.project.projectName} (ID: {task.project.projectId})</p>
          <p><strong>Deadline:</strong> {task.deadline}</p>
          <p><strong>User ID:</strong> {task.userId}</p>
        </div>
      ))}
    </div>
  );
};

export default TaskContent;
