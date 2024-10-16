"use client";

import ProjectDetailsGrid1 from '@/components/projectDetailsgrid1';
import ProjectDetailsGrid2 from '@/components/projectDetailsgrid2';

import TopSection from '@/components/TopSection';

import { useParams } from 'next/navigation'; // Use useParams instead of useRouter
import React from 'react';

const ProjectDetails = () => {
  const { id } = useParams(); // Get the project number from the URL

  return (
    <div className="max-w-screen-2xl mx-auto w-full pl-10 pr-10 pb-10 pt-3">
      <TopSection />
      <ProjectDetailsGrid1 projectId={id} />
      <ProjectDetailsGrid2/>
    </div>
  );
};

export default ProjectDetails;
