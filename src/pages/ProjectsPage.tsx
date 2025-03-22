import React from "react";
import ProjectDashboard from "@/components/dashboard/ProjectDashboard";

const ProjectsPage = () => {
  // Handler for when a user wants to contribute to a project
  const handleContribute = (projectId: string) => {
    console.log(`User wants to contribute to project: ${projectId}`);
    // Here you would typically open a contribution modal
    // For example: setContributionModalOpen(true); setSelectedProjectId(projectId);
  };

  // Handler for when a user wants to submit content to a project
  const handleSubmitContent = (projectId: string) => {
    console.log(`User wants to submit content to project: ${projectId}`);
    // Here you would typically navigate to a content submission form
    // For example: navigate(`/submit-content/${projectId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <ProjectDashboard
          onContribute={handleContribute}
          onSubmitContent={handleSubmitContent}
          isAdmin={false} // This is a general user view, not admin
        />
      </div>
    </div>
  );
};

export default ProjectsPage;
