"use client";

import DataCard from "./DataCard"; // Keeping DataCard for the card section
import { ScrollArea } from "@/components/ui/scroll-area"; // Ensure this is imported correctly based on Shadcn setup
import Link from "next/link"; // For routing

const ProjectGrid1 = () => {
  const projects = [
    { id: 1, name: "Project 1" },
    { id: 2, name: "Project 2" },
    { id: 3, name: "Project 3" },
    { id: 4, name: "Project 4" },
    { id: 5, name: "Project 5" },
    { id: 6, name: "Project 6" },
    { id: 7, name: "Project 7" },
    { id: 8, name: "Project 8" },
    // Add more projects as needed
  ];

  return (
    <div className="flex gap-4 -mt-8">
      {/* Left side: Fixed height for the card layout */}
      <div className="grid grid-cols-3 gap-2 flex-1 h-60"> {/* Fixed height set here */}
        <DataCard title="Content 1" />
        <DataCard title="Content 2" />
        <DataCard title="Content 3" />

        <div className="col-span-3 pt-6">
          <DataCard title="Stretched Content" />
        </div>
      </div>

      {/* Right side: Scrollable area for project buttons with the same height */}
      <div className="w-[350px] h-[260px]"> {/* Matching the height with card section */}
        <div className="bg-white p-4 rounded-lg shadow-lg h-full">
          {/* Scroll area with overflow and fixed height */}
          <ScrollArea className="h-full overflow-y-auto">
            <div className="space-y-2 p-2">
              {projects.map((project) => (
                <Link key={project.id} href={`/projects/${project.id}`}>
                  <button className="w-full text-center font-bold px-4 py-2 rounded-lg hover:bg-gray-200 transition">
                    {project.name}
                  </button>
                </Link>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default ProjectGrid1;
