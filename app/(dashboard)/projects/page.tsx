
import ProjectGrid1 from '@/components/projectgrid1'
import ProjectGrid2 from '@/components/projectgrid2'
import TopSection from '@/components/TopSection'

import React from 'react'

const ProjectSummary = () => {
  return (
    <div className=" max-w-screen-2xl mx-auto w-full pl-10 pr-10 pb-10 pt-3 " >
      <TopSection/>
      <ProjectGrid1/>
      <ProjectGrid2/>
      
    </div>
    
  )
}

export default ProjectSummary