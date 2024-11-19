"use client";

import DataCard from "./DataCard"; // Keeping DataCard for the card section
import { ScrollArea } from "@/components/ui/scroll-area"; // Ensure this is imported correctly based on Shadcn setup
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Trash2,Upload } from "lucide-react"; // Import an icon for deletion
import { cn } from "@/lib/utils";
import { Instagram, Facebook, Linkedin } from "lucide-react";

interface ProjectDetailsGrid2Props {
  project: {
    industry: string;
    transaction: string;
    investment: number;
    dateRange: {
      from: string;
      to: string;
    };
    competitors: { name: string; link: string; _id: string }[];
    socialLinks: {
      instagram: string | null;
      facebook: string | null;
      linkedin: string | null;
      drive: string | null;
    };
  };
}

const ProjectDetailsGrid2: React.FC<ProjectDetailsGrid2Props> = ({ project }) => {
  const [reminders, setReminders] = useState<string[]>(["Reminder 1", "Reminder 2"]);
  const [newReminder, setNewReminder] = useState<string>(""); // State for the new reminder input

  const handleDelete = (index: number) => {
    setReminders(reminders.filter((_, i) => i !== index));
  };

  const handleAddReminder = () => {
    if (newReminder.trim()) {
      setReminders([...reminders, newReminder.trim()]);
      setNewReminder(""); // Clear the input after adding
    }
  };
  // Helper function to render social media links
  // Helper function to render social media links
  const renderSocialLinks = () => {
    const socialIcons = [
      { name: "Instagram", icon: <Instagram />, link: project.socialLinks.instagram },
      { name: "Facebook", icon: <Facebook />, link: project.socialLinks.facebook },
      { name: "LinkedIn", icon: <Linkedin />, link: project.socialLinks.linkedin },
      { name: "Google Drive", icon: <Upload />, link: project.socialLinks.drive }, // Added Google Drive icon
    ];

    return socialIcons.map((social, index) => {
      if (social.link) {
        return (
          <a
            key={index}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "w-10 h-10 flex items-center justify-center bg-gray-200 text-black-600 hover:bg-violet-200 hover:text-violet-800 rounded-full"
            )}
          >
            {social.icon}
          </a>
        );
      }
      return null; // If the link is null, don't render anything
    });
  };

  return (
    <div className="flex gap-4 pt-8"> 
      {/* Left side: Additional Info section */}
      <div className="flex-1 flex flex-col gap-4"> 
        <DataCard>
          <p><strong>Industry:</strong> {project.industry}</p>
          <p><strong>Transaction:</strong> {project.transaction}</p>
          <p><strong>Investment:</strong> {project.investment} Rs</p>
          

          <p>
            <strong>Date Range:</strong> 
            {` From ${new Date(project.dateRange.from).toLocaleDateString()} to ${new Date(project.dateRange.to).toLocaleDateString()}`}
          </p>
        </DataCard>
        
        <div className="flex gap-4">
        <div className="grid h-48 flex-1">
    <DataCard title="Competitors">
      <div>
        <strong>Competitors:</strong>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {project.competitors.map((competitor) => (
          <a
            key={competitor._id}
            href={competitor.link}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "w-full lg:w-auto justify-between font-normal border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none transition",
              "bg-gray-200 text-black-600 hover:bg-violet-200 hover:text-violet-800 rounded p-2"
            )}
          >
            {competitor.name}
          </a>
        ))}
      </div>
      <div className="flex gap-4 pt-8">
        {renderSocialLinks()} 
      </div>
    </DataCard>
    
    
  </div>
          <div className="grid h-48 flex-1"> 
            <DataCard title="Card 2">
              {/* Intentionally left blank */}
            </DataCard>
          </div>
        </div>
      </div>

      {/* Right side: Reminders section */}
      <div className="w-[350px] h-[260px] bg-transparent -mt-12"> {/* Made the main div transparent */}
        <Card className="border-none h-full bg-transparent shadow-none"> {/* Transparent background for the card */}
          <CardHeader className="flex justify-between items-center">
            <div className="flex items-center text-white"> {/* Make the text white */}
              <CardTitle className="mr-[200px]">Reminders</CardTitle> {/* Increased margin for spacing */}
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white"> {/* White circle for bell icon */}
                <span>🔔</span> {/* Replace with an actual icon if needed */}
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col -mt-2">
            <ScrollArea className="h-24 overflow-y-auto"> {/* Adjust height to half */}
              <div className="space-y-2">
                {reminders.map((reminder, index) => (
                  <div key={index} className="flex justify-between items-center p-1 bg-white text-black rounded"> {/* Removed border */}
                    <span className="text-sm">{reminder}</span> {/* Smaller text */}
                    <Trash2 
                      className="cursor-pointer text-red-500" 
                      onClick={() => handleDelete(index)} 
                    />
                  </div>
                ))}
              </div>
            </ScrollArea>
            <Separator className="my-2" />
            <div className="flex space-x-2"> {/* Flex container for input and button */}
              <input 
                type="text" 
                value={newReminder} 
                onChange={(e) => setNewReminder(e.target.value)} 
                placeholder="New Reminder" 
                className="flex-1 p-1 bg-white text-black rounded" // Made background white
              />
              <button 
                className="bg-violet-500 text-white w-10 h-10 rounded flex items-center justify-center" // Set same size as reminder divs
                onClick={handleAddReminder} 
              >
                + {/* Plus sign as the button text */}
              </button>
            </div>
          </CardContent>
        </Card> 
      </div>
    </div>
  );
};

export default ProjectDetailsGrid2;
