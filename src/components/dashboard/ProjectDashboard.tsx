import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, Filter, Plus } from "lucide-react";
import ProjectCard from "./ProjectCard";

interface Project {
  id: string;
  title: string;
  description: string;
  deadline: string;
  currentAmount: number;
  targetAmount: number;
  contributors: number;
  category: string;
  image: string;
  featured?: boolean;
}

interface ProjectDashboardProps {
  projects?: Project[];
  onContribute?: (projectId: string) => void;
  onSubmitContent?: (projectId: string) => void;
  onCreateProject?: () => void;
  isAdmin?: boolean;
}

const ProjectDashboard = ({
  projects = [
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
      image:
        "https://images.unsplash.com/photo-1603796846097-bee99e4a601f?w=800&q=80",
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
      image:
        "https://images.unsplash.com/photo-1543674892-7d64d45df18d?w=800&q=80",
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
      image:
        "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&q=80",
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
      image:
        "https://images.unsplash.com/photo-1593113630400-ea4288922497?w=800&q=80",
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
      image:
        "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=800&q=80",
    },
  ],
  onContribute = () => {},
  onSubmitContent = () => {},
  onCreateProject = () => {},
  isAdmin = false,
}: ProjectDashboardProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  // Filter projects based on search term and active category
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === "all" ||
      project.category.toLowerCase() === activeCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  // Get featured project
  const featuredProject = projects.find((project) => project.featured);

  // Get all other projects
  const regularProjects = filteredProjects.filter(
    (project) => !project.featured,
  );

  // Extract unique categories from projects
  const categories = [
    "all",
    ...new Set(projects.map((project) => project.category.toLowerCase())),
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 bg-gray-50">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Project Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Browse and contribute to our active fundraising projects
          </p>
        </div>

        {isAdmin && (
          <Button onClick={onCreateProject} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create Project
          </Button>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Tabs defaultValue="all" className="w-full md:w-auto">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 h-auto">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                onClick={() => setActiveCategory(category)}
                className="capitalize"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Featured Project */}
      {featuredProject && (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Featured Project</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="h-96 rounded-lg overflow-hidden">
                <img
                  src={featuredProject.image}
                  alt={featuredProject.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold mb-2">
                {featuredProject.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {featuredProject.description}
              </p>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">
                      ${featuredProject.currentAmount.toLocaleString()} raised
                    </span>
                    <span className="text-gray-500">
                      ${featuredProject.targetAmount.toLocaleString()} goal
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-primary h-2.5 rounded-full"
                      style={{
                        width: `${(featuredProject.currentAmount / featuredProject.targetAmount) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <span>Deadline: {featuredProject.deadline}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>{featuredProject.contributors} contributors</span>
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <Button
                    onClick={() => onContribute(featuredProject.id)}
                    className="flex-1"
                  >
                    Contribute Now
                  </Button>
                  <Button
                    onClick={() => onSubmitContent(featuredProject.id)}
                    variant="outline"
                    className="flex-1"
                  >
                    Submit Content
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* All Projects */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">All Projects</h2>
        {regularProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularProjects.map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title}
                description={project.description}
                deadline={project.deadline}
                currentAmount={project.currentAmount}
                targetAmount={project.targetAmount}
                contributors={project.contributors}
                category={project.category}
                image={project.image}
                onContribute={() => onContribute(project.id)}
                onSubmitContent={() => onSubmitContent(project.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-100">
            <p className="text-gray-500">
              No projects found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDashboard;
