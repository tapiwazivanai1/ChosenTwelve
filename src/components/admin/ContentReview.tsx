import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  MoreVertical,
  Eye,
  CheckCircle,
  X,
  MessageSquare,
  FileText,
  Image,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

// Sample content submissions data
const sampleSubmissions = [
  {
    id: "submission-1",
    title: "My Faith Journey",
    contentType: "Article",
    projectId: "project-1",
    projectTitle: "Youth Conference Magazine",
    submittedBy: {
      id: "member-1",
      name: "John Doe",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    },
    submissionDate: "February 15, 2023",
    status: "pending",
    content:
      "This is my personal faith journey that I would like to share with the youth conference attendees. It details my struggles and triumphs in my walk with Christ over the past five years...",
    files: [{ name: "faith-journey.docx", size: "245 KB", type: "document" }],
  },
  {
    id: "submission-2",
    title: "Youth Worship Night",
    contentType: "Photo",
    projectId: "project-1",
    projectTitle: "Youth Conference Magazine",
    submittedBy: {
      id: "member-2",
      name: "Jane Smith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
    },
    submissionDate: "March 2, 2023",
    status: "approved",
    content:
      "Photos from our recent youth worship night. These capture the spirit of our vibrant youth ministry.",
    files: [
      { name: "worship1.jpg", size: "1.2 MB", type: "image" },
      { name: "worship2.jpg", size: "980 KB", type: "image" },
      { name: "worship3.jpg", size: "1.5 MB", type: "image" },
    ],
  },
  {
    id: "submission-3",
    title: "Impact of Our Food Drive",
    contentType: "Testimonial",
    projectId: "project-4",
    projectTitle: "Community Outreach Program",
    submittedBy: {
      id: "member-3",
      name: "Robert Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=robert",
    },
    submissionDate: "April 10, 2023",
    status: "pending",
    content:
      "I want to share how our monthly food drive has impacted families in our community. Last month, we were able to provide essential groceries to over 50 families...",
    files: [{ name: "food-drive.jpg", size: "850 KB", type: "image" }],
  },
  {
    id: "submission-4",
    title: "Church Building Progress",
    contentType: "Photo",
    projectId: "project-2",
    projectTitle: "Church Building Renovation",
    submittedBy: {
      id: "member-5",
      name: "Michael Brown",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
    },
    submissionDate: "May 5, 2023",
    status: "approved",
    content:
      "Photos showing the progress of our church building renovation project. The new paint and repairs are making a significant difference.",
    files: [
      { name: "building1.jpg", size: "1.8 MB", type: "image" },
      { name: "building2.jpg", size: "1.5 MB", type: "image" },
    ],
  },
  {
    id: "submission-5",
    title: "Youth Camp Experience",
    contentType: "Article",
    projectId: "project-3",
    projectTitle: "Youth Camp Scholarships",
    submittedBy: {
      id: "member-6",
      name: "Emily Davis",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
    },
    submissionDate: "April 25, 2023",
    status: "rejected",
    content:
      "An article about my experience at last year's youth camp and how it transformed my spiritual life. I'm grateful for the scholarship that made it possible for me to attend...",
    files: [],
    rejectionReason:
      "Content needs more focus on the impact of scholarships. Please revise to include how the scholarship specifically helped you attend the camp.",
  },
  {
    id: "submission-6",
    title: "Worship Team in Action",
    contentType: "Photo",
    projectId: "project-5",
    projectTitle: "Worship Equipment Upgrade",
    submittedBy: {
      id: "member-8",
      name: "Lisa Taylor",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa",
    },
    submissionDate: "May 12, 2023",
    status: "pending",
    content:
      "Photos of our worship team using the new equipment. The sound quality has improved dramatically!",
    files: [
      { name: "worship-team1.jpg", size: "1.3 MB", type: "image" },
      { name: "worship-team2.jpg", size: "1.1 MB", type: "image" },
    ],
  },
];

const ContentReview = () => {
  const [submissions, setSubmissions] = useState(sampleSubmissions);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  // Filter submissions based on search term and active tab
  const filteredSubmissions = submissions.filter((submission) => {
    const matchesSearch =
      submission.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.submittedBy.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      submission.projectTitle.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "pending" && submission.status === "pending") ||
      (activeTab === "approved" && submission.status === "approved") ||
      (activeTab === "rejected" && submission.status === "rejected");

    return matchesSearch && matchesTab;
  });

  const handleApproveSubmission = (submissionId) => {
    const updatedSubmissions = submissions.map((submission) =>
      submission.id === submissionId
        ? { ...submission, status: "approved" }
        : submission,
    );
    setSubmissions(updatedSubmissions);
    setIsViewDialogOpen(false);
  };

  const handleRejectSubmission = () => {
    if (!selectedSubmission || !rejectionReason) return;

    const updatedSubmissions = submissions.map((submission) =>
      submission.id === selectedSubmission.id
        ? { ...submission, status: "rejected", rejectionReason }
        : submission,
    );
    setSubmissions(updatedSubmissions);
    setIsRejectDialogOpen(false);
    setRejectionReason("");
  };

  const openViewDialog = (submission) => {
    setSelectedSubmission(submission);
    setIsViewDialogOpen(true);
  };

  const openRejectDialog = (submission) => {
    setSelectedSubmission(submission);
    setRejectionReason("");
    setIsRejectDialogOpen(true);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500">Approved</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      case "pending":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-100 text-yellow-800 border-yellow-200"
          >
            Pending Review
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getContentTypeIcon = (contentType) => {
    switch (contentType) {
      case "Article":
        return <FileText className="h-4 w-4" />;
      case "Photo":
        return <Image className="h-4 w-4" />;
      case "Testimonial":
        return <MessageSquare className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Content Review</h2>
        <p className="text-muted-foreground">
          Review and manage content submissions for projects
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search submissions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Tabs
          defaultValue="all"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full sm:w-auto"
        >
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="hidden md:table-cell">Project</TableHead>
              <TableHead className="hidden md:table-cell">
                Submitted By
              </TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSubmissions.length > 0 ? (
              filteredSubmissions.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell className="font-medium">
                    {submission.title}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {getContentTypeIcon(submission.contentType)}
                      <span className="hidden md:inline">
                        {submission.contentType}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {submission.projectTitle}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage
                          src={submission.submittedBy.avatar}
                          alt={submission.submittedBy.name}
                        />
                        <AvatarFallback>
                          {submission.submittedBy.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span>{submission.submittedBy.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {submission.submissionDate}
                  </TableCell>
                  <TableCell>{getStatusBadge(submission.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => openViewDialog(submission)}
                          className="flex items-center gap-2"
                        >
                          <Eye className="h-4 w-4" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {submission.status === "pending" && (
                          <>
                            <DropdownMenuItem
                              onClick={() =>
                                handleApproveSubmission(submission.id)
                              }
                              className="flex items-center gap-2 text-green-600"
                            >
                              <CheckCircle className="h-4 w-4" /> Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => openRejectDialog(submission)}
                              className="flex items-center gap-2 text-red-600"
                            >
                              <X className="h-4 w-4" /> Reject
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No submissions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* View Submission Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        {selectedSubmission && (
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {getContentTypeIcon(selectedSubmission.contentType)}
                {selectedSubmission.title}
              </DialogTitle>
              <DialogDescription>
                Submitted for {selectedSubmission.projectTitle} on{" "}
                {selectedSubmission.submissionDate}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage
                    src={selectedSubmission.submittedBy.avatar}
                    alt={selectedSubmission.submittedBy.name}
                  />
                  <AvatarFallback>
                    {selectedSubmission.submittedBy.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">
                    {selectedSubmission.submittedBy.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Contributor
                  </div>
                </div>
                <div className="ml-auto">
                  {getStatusBadge(selectedSubmission.status)}
                </div>
              </div>

              <div className="border rounded-md p-4 bg-muted/20">
                <ScrollArea className="h-[200px]">
                  <p className="whitespace-pre-wrap">
                    {selectedSubmission.content}
                  </p>
                </ScrollArea>
              </div>

              {selectedSubmission.files &&
                selectedSubmission.files.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">
                      Attached Files:
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                      {selectedSubmission.files.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 p-2 border rounded-md bg-muted/10"
                        >
                          {file.type === "image" ? (
                            <Image className="h-4 w-4 text-blue-500" />
                          ) : (
                            <FileText className="h-4 w-4 text-blue-500" />
                          )}
                          <div className="text-sm truncate">
                            <div className="font-medium truncate">
                              {file.name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {file.size}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {selectedSubmission.status === "rejected" &&
                selectedSubmission.rejectionReason && (
                  <div className="border border-red-200 bg-red-50 rounded-md p-4">
                    <h4 className="text-sm font-medium text-red-800 mb-1">
                      Rejection Reason:
                    </h4>
                    <p className="text-sm text-red-700">
                      {selectedSubmission.rejectionReason}
                    </p>
                  </div>
                )}
            </div>

            <DialogFooter>
              {selectedSubmission.status === "pending" && (
                <div className="flex gap-2 w-full">
                  <Button
                    variant="outline"
                    onClick={() => openRejectDialog(selectedSubmission)}
                    className="flex items-center gap-2"
                  >
                    <X className="h-4 w-4" /> Reject
                  </Button>
                  <Button
                    onClick={() =>
                      handleApproveSubmission(selectedSubmission.id)
                    }
                    className="flex-1 flex items-center gap-2"
                  >
                    <CheckCircle className="h-4 w-4" /> Approve
                  </Button>
                </div>
              )}
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>

      {/* Reject Submission Dialog */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        {selectedSubmission && (
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Reject Submission</DialogTitle>
              <DialogDescription>
                Please provide a reason for rejecting "
                {selectedSubmission.title}"
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="rejection-reason"
                  className="text-sm font-medium"
                >
                  Rejection Reason
                </label>
                <Textarea
                  id="rejection-reason"
                  placeholder="Please explain why this submission is being rejected..."
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  className="mt-1 min-h-[100px]"
                />
                {rejectionReason.length === 0 && (
                  <p className="text-sm text-red-500 mt-1">
                    A rejection reason is required
                  </p>
                )}
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsRejectDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleRejectSubmission}
                disabled={rejectionReason.length === 0}
              >
                Reject Submission
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default ContentReview;
