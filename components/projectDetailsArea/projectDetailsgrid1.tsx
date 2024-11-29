"use client";

import DataCard from "@/components/extraComponents/DataCard";

interface ProjectDetailsGrid1Props {
  project: { projectName: string; description: string }; // Define project type with only necessary fields
}

const ProjectDetailsGrid1: React.FC<ProjectDetailsGrid1Props> = ({ project }) => {
  return (
    <div className="grid grid-cols-1 h-30">
      <DataCard >
        <strong>{project.projectName}</strong>
        <p>{project.description}</p>
      </DataCard>
    </div>
  );
};

export default ProjectDetailsGrid1;
