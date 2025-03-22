import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Users,
  FileText,
  Bell,
  PieChart,
  Settings,
} from "lucide-react";
import ProjectManagement from "./ProjectManagement";
import MemberManagement from "./MemberManagement";
import ContentReview from "./ContentReview";
import AnalyticsDashboard from "./AnalyticsDashboard";
import NotificationManagement from "./NotificationManagement";
import AdminSettings from "./AdminSettings";

const AdminDashboard = () => {
  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage projects, members, content, and more.
        </p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-8">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="projects" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Projects</span>
          </TabsTrigger>
          <TabsTrigger value="members" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Members</span>
          </TabsTrigger>
          <TabsTrigger value="content" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Content</span>
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="flex items-center gap-2"
          >
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Settings</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Raised
                </CardTitle>
                <DollarIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$24,500</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Projects
                </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">
                  +2 new this month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Members
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">245</div>
                <p className="text-xs text-muted-foreground">
                  +18 new this month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Content Submissions
                </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">32</div>
                <p className="text-xs text-muted-foreground">
                  12 pending review
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Fundraising Overview</CardTitle>
                <CardDescription>
                  Monthly fundraising totals for all projects
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px] w-full bg-muted/20 rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">
                    Fundraising chart will appear here
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Project Performance</CardTitle>
                <CardDescription>Percentage of goals reached</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full bg-muted/20 rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">
                    Project performance chart will appear here
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="projects">
          <ProjectManagement />
        </TabsContent>

        <TabsContent value="members">
          <MemberManagement />
        </TabsContent>

        <TabsContent value="content">
          <ContentReview />
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationManagement />
        </TabsContent>

        <TabsContent value="settings">
          <AdminSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Simple dollar icon component
const DollarIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="12" y1="1" x2="12" y2="23"></line>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
);

export default AdminDashboard;
