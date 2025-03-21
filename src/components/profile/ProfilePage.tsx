import React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, FileText, DollarSign, Image } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Contribution {
  id: string;
  projectId: string;
  projectTitle: string;
  amount: number;
  date: string;
  paymentMethod: string;
}

interface ContentSubmission {
  id: string;
  projectId: string;
  projectTitle: string;
  contentType: string;
  title: string;
  submissionDate: string;
  status: "pending" | "approved" | "rejected";
}

interface ProfilePageProps {
  userProfile?: {
    name: string;
    email: string;
    joinDate: string;
    avatar: string;
  };
  contributions?: Contribution[];
  contentSubmissions?: ContentSubmission[];
}

const ProfilePage = ({
  userProfile = {
    name: "John Doe",
    email: "john.doe@example.com",
    joinDate: "January 15, 2023",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
  },
  contributions = [
    {
      id: "contrib-1",
      projectId: "project-1",
      projectTitle: "Youth Conference Magazine",
      amount: 150,
      date: "March 10, 2023",
      paymentMethod: "Mobile Money",
    },
    {
      id: "contrib-2",
      projectId: "project-2",
      projectTitle: "Church Building Renovation",
      amount: 300,
      date: "April 5, 2023",
      paymentMethod: "PayPal",
    },
    {
      id: "contrib-3",
      projectId: "project-3",
      projectTitle: "Youth Camp Scholarships",
      amount: 75,
      date: "May 20, 2023",
      paymentMethod: "Bank Transfer",
    },
  ],
  contentSubmissions = [
    {
      id: "content-1",
      projectId: "project-1",
      projectTitle: "Youth Conference Magazine",
      contentType: "Article",
      title: "My Faith Journey",
      submissionDate: "February 15, 2023",
      status: "approved",
    },
    {
      id: "content-2",
      projectId: "project-1",
      projectTitle: "Youth Conference Magazine",
      contentType: "Photo",
      title: "Youth Worship Night",
      submissionDate: "March 2, 2023",
      status: "approved",
    },
    {
      id: "content-3",
      projectId: "project-4",
      projectTitle: "Community Outreach Program",
      contentType: "Testimonial",
      title: "Impact of Our Food Drive",
      submissionDate: "April 10, 2023",
      status: "pending",
    },
  ],
}: ProfilePageProps) => {
  const navigate = useNavigate();

  const totalContributed = contributions.reduce(
    (total, contribution) => total + contribution.amount,
    0,
  );

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl bg-gray-50">
      <Button
        variant="ghost"
        className="mb-6 flex items-center gap-2"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-4 w-4" /> Back to Dashboard
      </Button>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        {/* Profile Header */}
        <div className="bg-primary/10 p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-center sm:items-start">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
            <img
              src={userProfile.avatar}
              alt={userProfile.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gray-900">
              {userProfile.name}
            </h1>
            <p className="text-gray-600">{userProfile.email}</p>
            <p className="text-sm text-gray-500 mt-1">
              Member since {userProfile.joinDate}
            </p>
            <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-4">
              <div className="bg-white rounded-md px-4 py-2 shadow-sm border border-gray-100">
                <p className="text-sm text-gray-500">Total Contributed</p>
                <p className="text-xl font-bold text-primary">
                  ${totalContributed.toLocaleString()}
                </p>
              </div>
              <div className="bg-white rounded-md px-4 py-2 shadow-sm border border-gray-100">
                <p className="text-sm text-gray-500">Projects Supported</p>
                <p className="text-xl font-bold text-primary">
                  {new Set(contributions.map((c) => c.projectId)).size}
                </p>
              </div>
              <div className="bg-white rounded-md px-4 py-2 shadow-sm border border-gray-100">
                <p className="text-sm text-gray-500">Content Submissions</p>
                <p className="text-xl font-bold text-primary">
                  {contentSubmissions.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-6">
          <Tabs defaultValue="contributions" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger
                value="contributions"
                className="flex items-center gap-2"
              >
                <DollarSign className="h-4 w-4" /> My Contributions
              </TabsTrigger>
              <TabsTrigger value="content" className="flex items-center gap-2">
                <FileText className="h-4 w-4" /> My Content
              </TabsTrigger>
            </TabsList>

            <TabsContent value="contributions" className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Your Contributions
              </h2>
              {contributions.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-600">
                          Project
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">
                          Amount
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">
                          Date
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">
                          Payment Method
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {contributions.map((contribution) => (
                        <tr
                          key={contribution.id}
                          className="border-b border-gray-100 hover:bg-gray-50"
                        >
                          <td className="py-3 px-4 text-gray-800">
                            {contribution.projectTitle}
                          </td>
                          <td className="py-3 px-4 text-gray-800 font-medium">
                            ${contribution.amount.toLocaleString()}
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            {contribution.date}
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            {contribution.paymentMethod}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">
                    You haven't made any contributions yet.
                  </p>
                  <Button className="mt-4">Browse Projects</Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="content" className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Your Content Submissions
              </h2>
              {contentSubmissions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {contentSubmissions.map((submission) => (
                    <div
                      key={submission.id}
                      className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden"
                    >
                      <div className="p-4 border-b border-gray-100">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-gray-900">
                              {submission.title}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {submission.projectTitle}
                            </p>
                          </div>
                          <div
                            className={`px-2 py-1 text-xs rounded-full ${
                              submission.status === "approved"
                                ? "bg-green-100 text-green-800"
                                : submission.status === "rejected"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {submission.status.charAt(0).toUpperCase() +
                              submission.status.slice(1)}
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                          <div className="flex items-center gap-1">
                            {submission.contentType === "Article" ? (
                              <FileText className="h-4 w-4" />
                            ) : submission.contentType === "Photo" ? (
                              <Image className="h-4 w-4" />
                            ) : (
                              <FileText className="h-4 w-4" />
                            )}
                            <span>{submission.contentType}</span>
                          </div>
                          <span>•</span>
                          <span>{submission.submissionDate}</span>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full mt-2"
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">
                    You haven't submitted any content yet.
                  </p>
                  <Button className="mt-4">Submit Content</Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
