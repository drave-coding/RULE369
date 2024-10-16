"use client";

import React from 'react';
import DataCard from '@/components/DataCard';

interface ProjectDetailsGrid1Props {
  projectId: string | string[] | undefined; // Accept projectId as string or array
}

const ProjectDetailsGrid1: React.FC<ProjectDetailsGrid1Props> = ({ projectId }) => {
  // Handle projectId being an array or undefined
  const projectTitle = Array.isArray(projectId) ? projectId[0] : projectId || "Unknown";

  return (
    <div className="grid grid-cols-1 -mt-12 h-40">
      <DataCard title={`Project ${projectTitle}`}>
        <p>This section will include the description of the project</p>
      </DataCard>
    </div>
  );
};

export default ProjectDetailsGrid1;
