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
import { Progress } from "@/components/ui/progress";
import {
  Search,
  Plus,
  MoreVertical,
  Edit,
  Trash,
  Eye,
  Archive,
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Sample project data
const sampleProjects = [
  {
    id: "project-1",
    title: "Youth Conference Magazine",
    description:
      "Help fund our annual youth conference magazine featuring testimonials, articles, and photos from church members.",
    deadline: "April 18, 2023",
    currentAmount: 2500,
    targetAmount: 5000,
    contributors: 48,
    category: "Publication",
    status: "active",
    featured: true,
  },
  {
    id: "project-2",
    title: "Church Building Renovation",
    description:
      "Support the renovation of our church building including new paint, repairs, and improved facilities.",
    deadline: "June 30, 2023",
    currentAmount: 15000,
    targetAmount: 50000,
    contributors: 124,
    category: "Construction",
    status: "active",
    featured: false,
  },
  {
    id: "project-3",
    title: "Youth Camp Scholarships",
    description:
      "Help provide scholarships for youth members to attend our annual summer camp experience.",
    deadline: "May 15, 2023",
    currentAmount: 1200,
    targetAmount: 3000,
    contributors: 32,
    category: "Education",
    status: "active",
    featured: false,
  },
  {
    id: "project-4",
    title: "Community Outreach Program",
    description:
      "Fund our monthly community outreach program providing food and essentials to those in need.",
    deadline: "Ongoing",
    currentAmount: 750,
    targetAmount: 1000,
    contributors: 28,
    category: "Outreach",
    status: "active",
    featured: false,
  },
  {
    id: "project-5",
    title: "Worship Equipment Upgrade",
    description:
      "Help us upgrade our sound system, instruments, and multimedia equipment for better worship experiences.",
    deadline: "July 31, 2023",
    currentAmount: 3800,
    targetAmount: 8000,
    contributors: 56,
    category: "Equipment",
    status: "active",
    featured: false,
  },
  {
    id: "project-6",
    title: "Children's Ministry Resources",
    description:
      "Purchase new curriculum and resources for our growing children's ministry program.",
    deadline: "August 15, 2023",
    currentAmount: 600,
    targetAmount: 2000,
    contributors: 15,
    category: "Education",
    status: "draft",
    featured: false,
  },
  {
    id: "project-7",
    title: "Mission Trip to Zimbabwe",
    description:
      "Support our team traveling to Zimbabwe to assist with local church initiatives and community projects.",
    deadline: "September 30, 2023",
    currentAmount: 0,
    targetAmount: 12000,
    contributors: 0,
    category: "Mission",
    status: "draft",
    featured: false,
  },
  {
    id: "project-8",
    title: "Christmas Charity Drive",
    description:
      "Annual Christmas charity drive to provide gifts and necessities to families in need.",
    deadline: "December 20, 2022",
    currentAmount: 4500,
    targetAmount: 5000,
    contributors: 78,
    category: "Outreach",
    status: "completed",
    featured: false,
  },
];

// Project form schema
const projectSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  description: z
    .string()
    .min(20, { message: "Description must be at least 20 characters" }),
  deadline: z.string().min(1, { message: "Deadline is required" }),
  targetAmount: z.string().min(1, { message: "Target amount is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  status: z.string().min(1, { message: "Status is required" }),
  featured: z.boolean().optional(),
  image: z.string().optional(),
});

const ProjectManagement = () => {
  const [projects, setProjects] = useState(sampleProjects);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      deadline: "",
      targetAmount: "",
      category: "",
      status: "draft",
      featured: false,
      image: "",
    },
  });

  // Filter projects based on search term and active tab
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "active" && project.status === "active") ||
      (activeTab === "draft" && project.status === "draft") ||
      (activeTab === "completed" && project.status === "completed");

    return matchesSearch && matchesTab;
  });

  const handleCreateProject = (data: z.infer<typeof projectSchema>) => {
    const newProject = {
      id: `project-${projects.length + 1}`,
      title: data.title,
      description: data.description,
      deadline: data.deadline,
      currentAmount: 0,
      targetAmount: parseInt(data.targetAmount),
      contributors: 0,
      category: data.category,
      status: data.status,
      featured: data.featured || false,
    };

    setProjects([...projects, newProject]);
    setIsCreateDialogOpen(false);
    form.reset();
  };

  const handleEditProject = (data: z.infer<typeof projectSchema>) => {
    if (!selectedProject) return;

    const updatedProjects = projects.map((project) =>
      project.id === selectedProject.id
        ? {
            ...project,
            title: data.title,
            description: data.description,
            deadline: data.deadline,
            targetAmount: parseInt(data.targetAmount),
            category: data.category,
            status: data.status,
            featured: data.featured || false,
          }
        : project,
    );

    setProjects(updatedProjects);
    setIsEditDialogOpen(false);
    setSelectedProject(null);
  };

  const handleDeleteProject = (projectId: string) => {
    const updatedProjects = projects.filter(
      (project) => project.id !== projectId,
    );
    setProjects(updatedProjects);
  };

  const openEditDialog = (project) => {
    setSelectedProject(project);
    form.reset({
      title: project.title,
      description: project.description,
      deadline: project.deadline,
      targetAmount: project.targetAmount.toString(),
      category: project.category,
      status: project.status,
      featured: project.featured,
      image: project.image || "",
    });
    setIsEditDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "draft":
        return <Badge variant="outline">Draft</Badge>;
      case "completed":
        return <Badge variant="secondary">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Project Management</h2>
          <p className="text-muted-foreground">
            Create, edit, and manage fundraising projects
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" /> Create Project
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription>
                Fill in the details below to create a new fundraising project.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleCreateProject)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter project title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter project description"
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
                    name="deadline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Deadline</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="e.g., April 30, 2023"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="targetAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Target Amount ($)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="5000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Publication">
                              Publication
                            </SelectItem>
                            <SelectItem value="Construction">
                              Construction
                            </SelectItem>
                            <SelectItem value="Education">Education</SelectItem>
                            <SelectItem value="Outreach">Outreach</SelectItem>
                            <SelectItem value="Equipment">Equipment</SelectItem>
                            <SelectItem value="Mission">Mission</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://example.com/image.jpg"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Enter a URL for the project image (optional)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="featured"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={field.onChange}
                          className="h-4 w-4 mt-1"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Featured Project</FormLabel>
                        <FormDescription>
                          This project will be highlighted on the dashboard
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">Create Project</Button>
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
            placeholder="Search projects..."
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
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Deadline</TableHead>
              <TableHead className="hidden md:table-cell">Progress</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">
                    <div>
                      {project.title}
                      {project.featured && (
                        <Badge variant="outline" className="ml-2 bg-primary/10">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground truncate max-w-[300px]">
                      {project.description}
                    </div>
                  </TableCell>
                  <TableCell>{project.category}</TableCell>
                  <TableCell>{getStatusBadge(project.status)}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {project.deadline}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center gap-2">
                      <Progress
                        value={
                          (project.currentAmount / project.targetAmount) * 100
                        }
                        className="h-2 w-[100px]"
                      />
                      <span className="text-sm">
                        {Math.round(
                          (project.currentAmount / project.targetAmount) * 100,
                        )}
                        %
                      </span>
                    </div>
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
                          onClick={() =>
                            window.open(`/projects/${project.id}`, "_blank")
                          }
                          className="flex items-center gap-2"
                        >
                          <Eye className="h-4 w-4" /> View
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => openEditDialog(project)}
                          className="flex items-center gap-2"
                        >
                          <Edit className="h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {project.status !== "completed" && (
                          <DropdownMenuItem
                            onClick={() => {
                              const updatedProjects = projects.map((p) =>
                                p.id === project.id
                                  ? { ...p, status: "completed" }
                                  : p,
                              );
                              setProjects(updatedProjects);
                            }}
                            className="flex items-center gap-2"
                          >
                            <Archive className="h-4 w-4" /> Mark as Completed
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          onClick={() => handleDeleteProject(project.id)}
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
                  No projects found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Project Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
            <DialogDescription>
              Update the details for this fundraising project.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleEditProject)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter project title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter project description"
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
                  name="deadline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Deadline</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="e.g., April 30, 2023"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="targetAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target Amount ($)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="5000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Publication">
                            Publication
                          </SelectItem>
                          <SelectItem value="Construction">
                            Construction
                          </SelectItem>
                          <SelectItem value="Education">Education</SelectItem>
                          <SelectItem value="Outreach">Outreach</SelectItem>
                          <SelectItem value="Equipment">Equipment</SelectItem>
                          <SelectItem value="Mission">Mission</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com/image.jpg"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter a URL for the project image (optional)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                        className="h-4 w-4 mt-1"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Featured Project</FormLabel>
                      <FormDescription>
                        This project will be highlighted on the dashboard
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
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

export default ProjectManagement;
