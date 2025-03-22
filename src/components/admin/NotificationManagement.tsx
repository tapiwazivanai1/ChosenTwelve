import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  DialogTrigger,
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
  Plus,
  MoreVertical,
  Edit,
  Trash,
  Bell,
  CheckCircle,
  Users,
  Calendar,
} from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample notification data
const sampleNotifications = [
  {
    id: "notification-1",
    title: "New Project Launched",
    message:
      "We've launched a new fundraising project: Youth Conference Magazine. Check it out and consider contributing!",
    type: "project",
    status: "scheduled",
    scheduledDate: "May 15, 2023",
    audience: "all",
    createdAt: "May 10, 2023",
  },
  {
    id: "notification-2",
    title: "Fundraising Milestone Reached",
    message:
      "Great news! We've reached 50% of our fundraising goal for the Church Building Renovation project.",
    type: "milestone",
    status: "sent",
    sentDate: "April 28, 2023",
    audience: "contributors",
    createdAt: "April 28, 2023",
  },
  {
    id: "notification-3",
    title: "Contribution Thank You",
    message:
      "Thank you for your generous contribution to the Youth Camp Scholarships project. Your support makes a difference!",
    type: "thank_you",
    status: "sent",
    sentDate: "April 15, 2023",
    audience: "specific_members",
    specificMembers: ["member-1", "member-3", "member-8"],
    createdAt: "April 15, 2023",
  },
  {
    id: "notification-4",
    title: "Content Submission Approved",
    message:
      "Your content submission 'Youth Worship Night' has been approved and will be featured in the upcoming magazine.",
    type: "content",
    status: "sent",
    sentDate: "March 30, 2023",
    audience: "specific_members",
    specificMembers: ["member-2"],
    createdAt: "March 30, 2023",
  },
  {
    id: "notification-5",
    title: "Pledge Reminder",
    message:
      "This is a friendly reminder about your pledge to the Community Outreach Program. Your contribution will help us reach our goal.",
    type: "reminder",
    status: "draft",
    audience: "specific_members",
    specificMembers: ["member-4", "member-6"],
    createdAt: "May 5, 2023",
  },
  {
    id: "notification-6",
    title: "Upcoming Event: Volunteer Day",
    message:
      "Join us for our monthly volunteer day this Saturday. We'll be working on the church building renovation project.",
    type: "event",
    status: "scheduled",
    scheduledDate: "May 18, 2023",
    audience: "all",
    createdAt: "May 8, 2023",
  },
];

// Notification form schema
const notificationSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" }),
  type: z.string().min(1, { message: "Type is required" }),
  audience: z.string().min(1, { message: "Audience is required" }),
  status: z.string().min(1, { message: "Status is required" }),
  scheduledDate: z.string().optional(),
});

const NotificationManagement = () => {
  const [notifications, setNotifications] = useState(sampleNotifications);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const form = useForm<z.infer<typeof notificationSchema>>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      title: "",
      message: "",
      type: "project",
      audience: "all",
      status: "draft",
      scheduledDate: "",
    },
  });

  // Filter notifications based on search term and active tab
  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "draft" && notification.status === "draft") ||
      (activeTab === "scheduled" && notification.status === "scheduled") ||
      (activeTab === "sent" && notification.status === "sent");

    return matchesSearch && matchesTab;
  });

  const handleCreateNotification = (
    data: z.infer<typeof notificationSchema>,
  ) => {
    const newNotification = {
      id: `notification-${notifications.length + 1}`,
      title: data.title,
      message: data.message,
      type: data.type,
      status: data.status,
      audience: data.audience,
      createdAt: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      ...(data.status === "scheduled" && {
        scheduledDate: data.scheduledDate,
      }),
    };

    setNotifications([...notifications, newNotification]);
    setIsCreateDialogOpen(false);
    form.reset();
  };

  const handleEditNotification = (data: z.infer<typeof notificationSchema>) => {
    if (!selectedNotification) return;

    const updatedNotifications = notifications.map((notification) =>
      notification.id === selectedNotification.id
        ? {
            ...notification,
            title: data.title,
            message: data.message,
            type: data.type,
            status: data.status,
            audience: data.audience,
            ...(data.status === "scheduled" && {
              scheduledDate: data.scheduledDate,
            }),
          }
        : notification,
    );

    setNotifications(updatedNotifications);
    setIsEditDialogOpen(false);
    setSelectedNotification(null);
  };

  const handleDeleteNotification = (notificationId: string) => {
    const updatedNotifications = notifications.filter(
      (notification) => notification.id !== notificationId,
    );
    setNotifications(updatedNotifications);
  };

  const openEditDialog = (notification) => {
    setSelectedNotification(notification);
    form.reset({
      title: notification.title,
      message: notification.message,
      type: notification.type,
      audience: notification.audience,
      status: notification.status,
      scheduledDate: notification.scheduledDate || "",
    });
    setIsEditDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "sent":
        return <Badge className="bg-green-500">Sent</Badge>;
      case "scheduled":
        return (
          <Badge
            variant="outline"
            className="bg-blue-100 text-blue-800 border-blue-200"
          >
            Scheduled
          </Badge>
        );
      case "draft":
        return <Badge variant="outline">Draft</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "project":
        return <Bell className="h-4 w-4" />;
      case "milestone":
        return <CheckCircle className="h-4 w-4" />;
      case "thank_you":
        return <Users className="h-4 w-4" />;
      case "content":
        return <Edit className="h-4 w-4" />;
      case "reminder":
        return <Bell className="h-4 w-4" />;
      case "event":
        return <Calendar className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Notification Management</h2>
          <p className="text-muted-foreground">
            Create and manage notifications for church members
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" /> Create Notification
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Notification</DialogTitle>
              <DialogDescription>
                Fill in the details below to create a new notification.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleCreateNotification)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notification Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter notification title"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter notification message"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="project">New Project</SelectItem>
                            <SelectItem value="milestone">
                              Milestone Reached
                            </SelectItem>
                            <SelectItem value="thank_you">Thank You</SelectItem>
                            <SelectItem value="content">
                              Content Update
                            </SelectItem>
                            <SelectItem value="reminder">Reminder</SelectItem>
                            <SelectItem value="event">Event</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="audience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Audience</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select audience" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="all">All Members</SelectItem>
                            <SelectItem value="contributors">
                              Contributors Only
                            </SelectItem>
                            <SelectItem value="specific_members">
                              Specific Members
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="scheduled">Scheduled</SelectItem>
                            <SelectItem value="sent">Sent</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {form.watch("status") === "scheduled" && (
                    <FormField
                      control={form.control}
                      name="scheduledDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Scheduled Date</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="e.g., May 30, 2023"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
                <DialogFooter>
                  <Button type="submit">Create Notification</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search notifications..."
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
            <TabsTrigger value="draft">Draft</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="sent">Sent</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Notification</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Audience</TableHead>
              <TableHead className="hidden md:table-cell">Status</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <TableRow key={notification.id}>
                  <TableCell className="font-medium">
                    <div>{notification.title}</div>
                    <div className="text-sm text-muted-foreground truncate max-w-[300px]">
                      {notification.message}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {getTypeIcon(notification.type)}
                      <span className="capitalize">
                        {notification.type.replace("_", " ")}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="capitalize">
                      {notification.audience.replace("_", " ")}
                    </span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {getStatusBadge(notification.status)}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {notification.sentDate ||
                      notification.scheduledDate ||
                      notification.createdAt}
                  </TableCell>
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
                          onClick={() => openEditDialog(notification)}
                          className="flex items-center gap-2"
                        >
                          <Edit className="h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        {notification.status === "draft" && (
                          <DropdownMenuItem
                            onClick={() => {
                              const updatedNotifications = notifications.map(
                                (n) =>
                                  n.id === notification.id
                                    ? {
                                        ...n,
                                        status: "sent",
                                        sentDate: new Date().toLocaleDateString(
                                          "en-US",
                                          {
                                            month: "long",
                                            day: "numeric",
                                            year: "numeric",
                                          },
                                        ),
                                      }
                                    : n,
                              );
                              setNotifications(updatedNotifications);
                            }}
                            className="flex items-center gap-2 text-green-600"
                          >
                            <CheckCircle className="h-4 w-4" /> Send Now
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() =>
                            handleDeleteNotification(notification.id)
                          }
                          className="text-red-600 flex items-center gap-2"
                        >
                          <Trash className="h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No notifications found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Notification Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Notification</DialogTitle>
            <DialogDescription>
              Update the details for this notification.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleEditNotification)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notification Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter notification title"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter notification message"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="project">New Project</SelectItem>
                          <SelectItem value="milestone">
                            Milestone Reached
                          </SelectItem>
                          <SelectItem value="thank_you">Thank You</SelectItem>
                          <SelectItem value="content">
                            Content Update
                          </SelectItem>
                          <SelectItem value="reminder">Reminder</SelectItem>
                          <SelectItem value="event">Event</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="audience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Audience</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select audience" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="all">All Members</SelectItem>
                          <SelectItem value="contributors">
                            Contributors Only
                          </SelectItem>
                          <SelectItem value="specific_members">
                            Specific Members
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="scheduled">Scheduled</SelectItem>
                          <SelectItem value="sent">Sent</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {form.watch("status") === "scheduled" && (
                  <FormField
                    control={form.control}
                    name="scheduledDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Scheduled Date</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="e.g., May 30, 2023"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
              <DialogFooter>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NotificationManagement;
