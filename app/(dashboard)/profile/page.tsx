"use client";

import React, { useEffect, useState } from "react";
import ProfileForm from "@/components/profileForm";
import ProfileDetails from "@/components/profileDetails";
import { useUser } from "@clerk/nextjs";
import axios from "@/lib/axios"; // Import your axios instance
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const { user } = useUser(); // Get user info
  const router = useRouter(); // For page redirection
  const [isProfileExists, setIsProfileExists] = useState<boolean | null>(null); // Track profile existence (null = loading)
  const [loading, setLoading] = useState<boolean>(true); // To show loading status

  // Check if profile exists
  useEffect(() => {
    const checkProfile = async () => {
      try {
        if (!user) {
          return;
        }
        const response = await axios.post("/profile/details", { userId: user.id });
        setIsProfileExists(!!response.data); // Set true if profile exists, false otherwise
      } // eslint-disable-next-line @typescript-eslint/no-explicit-any
      catch (error: any) {
        console.error("Error checking profile:", error.message);
        setIsProfileExists(false); // Handle error (e.g., no profile found)
      } finally {
        setLoading(false); // Set loading to false after checking
      }
    };

    checkProfile();
  }, [user]);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (formData: any) => {
    try {
      if (!user) {
        throw new Error("User not authenticated.");
      }

      console.log("Submitting form:", formData);

      // Include userId in the formData to send to the API
      const response = await axios.post("/profile/add", {
        userId: user.id,
        ...formData,
      });

      console.log("Profile saved:", response.data);

      // Mark profile as existing after submission
      setIsProfileExists(true);
      setLoading(false);
      router.refresh(); // Refresh the page to reflect changes
    }// eslint-disable-next-line @typescript-eslint/no-explicit-any 
    catch (error: any) {
      console.error("Error submitting form:", error.message);
    }
  };

  if (loading || isProfileExists === null) {
    // Show loading spinner while checking profile existence
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-3">
      {isProfileExists ? (
        <ProfileDetails userId={user?.id || ""} /> // Show profile details if profile exists
      ) : (
        <div className="bg-slate-50 p-4 rounded-xl max-w-[600px] mx-auto">
          <h1 className="text-2xl  font-bold mb-4">Create Your Profile</h1>
          <ProfileForm handleSubmit={handleSubmit} /> {/* Show form if no profile exists */}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
