"use client";

import DataCard from "./DataCard"; // Keeping DataCard for the card section
import { ScrollArea } from "@/components/ui/scroll-area"; // Ensure this is imported correctly based on Shadcn setup
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Trash2 } from "lucide-react"; // Import an icon for deletion

const ProjectDetailsGrid2 = () => {
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

  return (
    <div className="flex gap-4 pt-8"> 
    
      <div className="flex-1 flex flex-col gap-4"> 
        <DataCard title="Stretched Card Content" />
        <div className="flex gap-4">
          <div className=" grid h-48 flex-1"> 
            <DataCard title="Card 1 Title">
              <p>This is some content for Card 1.

              </p>
            </DataCard>
          </div>
          <div className="grid h-48 flex-1"> 
            <DataCard title="Card 2 Title">
              <p>This is some content for Card 2.</p>
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
                className="bg-blue-500 text-white w-10 h-10 rounded flex items-center justify-center" // Set same size as reminder divs
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
