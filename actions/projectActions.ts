// actions/projectActions.ts
import Project from "@/models/Project";

export const storeProjectData = async (projectData: any) => {
  console.log("Project Data:", projectData); // Log the project data for debugging

  try {
    const project = new Project({
      userId: projectData.userId, // Use the user ID passed from the frontend
      projectName: projectData.projectName,
      description: projectData.description,
      industry: projectData.industry,
      transaction: projectData.transaction,
      dateRange: projectData.dateRange,
      competitors: projectData.competitors,
    });
    await project.save();
    return project;
  } catch (error: any) {
    throw new Error("Error storing project data: " + error.message);
  }
};



export const getProjectData = async (projectId: string) => {
  try {
    const project = await Project.findById(projectId).exec(); // Fetch the project by ID
    return project; // Return the project data
  } catch (error: any) {
    throw new Error("Error fetching project data: " + error.message);
  }
}

