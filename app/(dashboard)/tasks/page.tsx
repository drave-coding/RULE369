import TaskContent from '@/components/taskContent'
import TaskTopSection from '@/components/taskTopSection'
import React from 'react'
const ProjectSummary = () => {
  return (
    <div className=" max-w-screen-2xl mx-auto w-full pl-10 pr-10 pb-10 pt-3 " >
     <TaskTopSection/>
     <TaskContent/>
    </div>
    
  )
}
export default ProjectSummary