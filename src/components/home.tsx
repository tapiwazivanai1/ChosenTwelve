import React, { useState } from "react";
import { Bell, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

import ProjectDashboard from "./dashboard/ProjectDashboard";
import ContributionModal from "./contribution/ContributionModal";
import ContentSubmissionForm from "./submission/ContentSubmissionForm";
import NotificationPanel from "./notifications/NotificationPanel";

const Home = () => {
  const [isContributionModalOpen, setIsContributionModalOpen] = useState(false);
  const [isContentSubmissionOpen, setIsContentSubmissionOpen] = useState(false);
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const [selectedProjectName, setSelectedProjectName] = useState<string>("");

  // Mock notification count
  const unreadNotifications = 2;

  const handleContribute = (projectId: string) => {
    // Find project name based on ID (in a real app, this would come from your data store)
    const projectName =
      projectId === "project-1" ? "Youth Conference Magazine" : "Project";
    setSelectedProjectId(projectId);
    setSelectedProjectName(projectName);
    setIsContributionModalOpen(true);
  };

  const handleSubmitContent = (projectId: string) => {
    setSelectedProjectId(projectId);
    setIsContentSubmissionOpen(true);
  };

  const handleContentSubmission = (data: any, contentType: string) => {
    console.log("Content submitted:", {
      data,
      contentType,
      projectId: selectedProjectId,
    });
    setIsContentSubmissionOpen(false);
    // In a real app, you would send this data to your backend
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex">
            <a href="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl">Guta Ra Mwari</span>
            </a>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="hidden md:flex items-center space-x-4">
              <a
                href="/"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Dashboard
              </a>
              <a
                href="/projects"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Projects
              </a>
              <a
                href="/submissions"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Submissions
              </a>
            </nav>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => setIsNotificationPanelOpen(true)}
              >
                <Bell className="h-5 w-5" />
                {unreadNotifications > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {unreadNotifications}
                  </Badge>
                )}
              </Button>
              <div className="hidden md:block">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </div>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[240px] sm:w-[300px]">
                  <nav className="flex flex-col space-y-4 mt-6">
                    <a
                      href="/"
                      className="text-sm font-medium transition-colors hover:text-primary"
                    >
                      Dashboard
                    </a>
                    <a
                      href="/projects"
                      className="text-sm font-medium transition-colors hover:text-primary"
                    >
                      Projects
                    </a>
                    <a
                      href="/submissions"
                      className="text-sm font-medium transition-colors hover:text-primary"
                    >
                      Submissions
                    </a>
                    <Button variant="outline" size="sm" className="w-full">
                      Sign In
                    </Button>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-6">
        <ProjectDashboard
          onContribute={handleContribute}
          onSubmitContent={handleSubmitContent}
        />
      </main>

      {/* Modals and Panels */}
      <ContributionModal
        open={isContributionModalOpen}
        onOpenChange={setIsContributionModalOpen}
        projectName={selectedProjectName}
        projectId={selectedProjectId}
        onContributionComplete={(data) => {
          console.log("Contribution completed:", data);
          // In a real app, you would process the payment and update the project status
        }}
      />

      {isContentSubmissionOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-white rounded-lg overflow-auto max-h-[90vh]">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 z-10"
              onClick={() => setIsContentSubmissionOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
            <ContentSubmissionForm
              onSubmit={handleContentSubmission}
              isOpen={true}
            />
          </div>
        </div>
      )}

      <NotificationPanel
        isOpen={isNotificationPanelOpen}
        onClose={() => setIsNotificationPanelOpen(false)}
      />
    </div>
  );
};

export default Home;
