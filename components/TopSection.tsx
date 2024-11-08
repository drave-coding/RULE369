// TopSection.tsx
"use client";

import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useUser } from "@clerk/nextjs";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import ProjectForm from './projectForm';
import axios from '@/lib/axios'; // Import your Axios instance
import { useRouter } from 'next/navigation'; // Import useRouter

const TopSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser(); // Get user info
  const router = useRouter(); // Initialize useRouter

  const handleFormSubmit = async (formData: any) => {
    try {
      if (!user) {
        throw new Error("User not authenticated.");
      }

      console.log('Submitting form:', formData);
      // Include userId in the formData to send to the API
      const response = await axios.post('/projects', {
        ...formData,
        userId: user.id // Pass user ID from Clerk
      });

      // Redirect to details page with the newly created project ID
      router.push(`/projects/${response.data._id}`);


      console.log('Project saved:', response.data);
    } catch (error: any) {
      console.error('Error submitting form:', error.response?.data || error.message);
      // Display error notification or message to the user
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <div className="flex flex-col w-full h-[66.67%] rounded-lg  pb-12">
      <div className="flex justify-between items-end">
        <div></div>
        <Dialog open={isOpen} onOpenChange={(open: boolean) => setIsOpen(open)}>
          <DialogTrigger asChild>
            <button className="bg-transparent border border-purple-500 text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out hover:bg-purple-500 hover:text-white active:scale-95 flex items-center shadow-md">
              <FaPlus className="mr-2" />
              Add Project
            </button>
          </DialogTrigger>

          {/* Dialog Content */}
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>Create or Add Project</DialogTitle>
            </DialogHeader>
            <ProjectForm handleSubmit={handleFormSubmit} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="my-2" />
      {/* White Line */}
      <div className="h-1 bg-white border-t border-gray-300" />
    </div>
  );
};

export default TopSection;
