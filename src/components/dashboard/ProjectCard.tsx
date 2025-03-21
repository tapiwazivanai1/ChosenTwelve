import React from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CalendarIcon, Users, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ProjectCardProps {
  id?: string;
  title?: string;
  description?: string;
  deadline?: string;
  currentAmount?: number;
  targetAmount?: number;
  contributors?: number;
  category?: string;
  image?: string;
  onContribute?: () => void;
  onSubmitContent?: () => void;
  featured?: boolean;
}

const ProjectCard = ({
  id = "project-1",
  title = "Youth Conference Magazine",
  description = "Help fund our annual youth conference magazine featuring testimonials, articles, and photos from church members.",
  deadline = "April 18, 2023",
  currentAmount = 2500,
  targetAmount = 5000,
  contributors = 48,
  category = "Publication",
  image = "https://images.unsplash.com/photo-1603796846097-bee99e4a601f?w=800&q=80",
  onContribute = () => {},
  onSubmitContent = () => {},
  featured = false,
}: ProjectCardProps) => {
  const progress = (currentAmount / targetAmount) * 100;
  const daysLeft = (() => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  })();

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-lg bg-white",
        featured ? "border-primary border-2" : "",
      )}
    >
      <div className="relative h-48 w-full overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <Badge className="absolute right-2 top-2 bg-primary">{category}</Badge>
      </div>

      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-bold">{title}</CardTitle>
        </div>
        <CardDescription className="mt-2 line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1 text-sm">
              <span className="font-medium">
                ${currentAmount.toLocaleString()} raised
              </span>
              <span className="text-muted-foreground">
                ${targetAmount.toLocaleString()} goal
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="flex justify-between text-sm">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    <span>{daysLeft} days left</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Deadline: {deadline}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{contributors} contributors</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{contributors} people have contributed</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2 pt-2">
        <Button
          onClick={onContribute}
          className="flex-1 gap-1"
          variant="default"
        >
          <DollarSign className="h-4 w-4" />
          Contribute
        </Button>
        <Button onClick={onSubmitContent} className="flex-1" variant="outline">
          Submit Content
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
