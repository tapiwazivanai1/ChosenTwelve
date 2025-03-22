import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  PieChart,
  LineChart,
  Download,
  Calendar,
  Users,
  DollarSign,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AnalyticsDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("last30days");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
          <p className="text-muted-foreground">
            Track fundraising progress and member engagement
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select
            defaultValue="last30days"
            value={selectedPeriod}
            onValueChange={setSelectedPeriod}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last7days">Last 7 days</SelectItem>
              <SelectItem value="last30days">Last 30 days</SelectItem>
              <SelectItem value="last90days">Last 90 days</SelectItem>
              <SelectItem value="thisYear">This year</SelectItem>
              <SelectItem value="allTime">All time</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" /> Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Raised</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$24,500</div>
            <div className="flex items-center pt-1">
              <span className="text-xs text-green-500 font-medium">+20.1%</span>
              <span className="text-xs text-muted-foreground ml-1">
                from last period
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contributors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245</div>
            <div className="flex items-center pt-1">
              <span className="text-xs text-green-500 font-medium">+12.5%</span>
              <span className="text-xs text-muted-foreground ml-1">
                from last period
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Contribution
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$100</div>
            <div className="flex items-center pt-1">
              <span className="text-xs text-green-500 font-medium">+5.2%</span>
              <span className="text-xs text-muted-foreground ml-1">
                from last period
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Content Submissions
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32</div>
            <div className="flex items-center pt-1">
              <span className="text-xs text-green-500 font-medium">+18.2%</span>
              <span className="text-xs text-muted-foreground ml-1">
                from last period
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="fundraising" className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-[400px] mb-4">
          <TabsTrigger value="fundraising" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            <span>Fundraising</span>
          </TabsTrigger>
          <TabsTrigger value="engagement" className="flex items-center gap-2">
            <LineChart className="h-4 w-4" />
            <span>Engagement</span>
          </TabsTrigger>
          <TabsTrigger value="projects" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" />
            <span>Projects</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="fundraising">
          <div className="grid gap-4 md:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Fundraising Overview</CardTitle>
                <CardDescription>
                  Monthly fundraising totals for all projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full bg-muted/20 rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">
                    Fundraising chart will appear here
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Contribution Sources</CardTitle>
                <CardDescription>Breakdown by payment method</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full bg-muted/20 rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">
                    Contribution sources chart will appear here
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="engagement">
          <div className="grid gap-4 md:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Engagement</CardTitle>
                <CardDescription>
                  Track member engagement and activity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full bg-muted/20 rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">
                    Engagement chart will appear here
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Active Members</CardTitle>
                <CardDescription>Members by activity level</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full bg-muted/20 rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">
                    Member activity chart will appear here
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="projects">
          <div className="grid gap-4 md:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Project Performance</CardTitle>
                <CardDescription>
                  Fundraising progress by project
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full bg-muted/20 rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">
                    Project performance chart will appear here
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Project Status</CardTitle>
                <CardDescription>Projects by completion status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full bg-muted/20 rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">
                    Project status chart will appear here
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsDashboard;
