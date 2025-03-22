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
  Eye,
  Ban,
  CheckCircle,
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

// Sample member data
const sampleMembers = [
  {
    id: "member-1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 8901",
    joinDate: "January 15, 2023",
    status: "active",
    role: "member",
    totalContributions: 450,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
  },
  {
    id: "member-2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 234 567 8902",
    joinDate: "February 3, 2023",
    status: "active",
    role: "admin",
    totalContributions: 1200,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
  },
  {
    id: "member-3",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    phone: "+1 234 567 8903",
    joinDate: "March 10, 2023",
    status: "active",
    role: "member",
    totalContributions: 75,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=robert",
  },
  {
    id: "member-4",
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    phone: "+1 234 567 8904",
    joinDate: "January 5, 2023",
    status: "inactive",
    role: "member",
    totalContributions: 300,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
  },
  {
    id: "member-5",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    phone: "+1 234 567 8905",
    joinDate: "April 20, 2023",
    status: "active",
    role: "member",
    totalContributions: 550,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
  },
  {
    id: "member-6",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "+1 234 567 8906",
    joinDate: "February 15, 2023",
    status: "active",
    role: "member",
    totalContributions: 125,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
  },
  {
    id: "member-7",
    name: "David Wilson",
    email: "david.wilson@example.com",
    phone: "+1 234 567 8907",
    joinDate: "March 3, 2023",
    status: "pending",
    role: "member",
    totalContributions: 0,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
  },
  {
    id: "member-8",
    name: "Lisa Taylor",
    email: "lisa.taylor@example.com",
    phone: "+1 234 567 8908",
    joinDate: "January 25, 2023",
    status: "active",
    role: "member",
    totalContributions: 850,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa",
  },
];

// Member form schema
const memberSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
  role: z.string().min(1, { message: "Role is required" }),
  status: z.string().min(1, { message: "Status is required" }),
});

const MemberManagement = () => {
  const [members, setMembers] = useState(sampleMembers);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const form = useForm<z.infer<typeof memberSchema>>({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      role: "member",
      status: "active",
    },
  });

  // Filter members based on search term and status filter
  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || member.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleCreateMember = (data: z.infer<typeof memberSchema>) => {
    const newMember = {
      id: `member-${members.length + 1}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      joinDate: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      status: data.status,
      role: data.role,
      totalContributions: 0,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.name.toLowerCase().replace(/ /g, "")}`,
    };

    setMembers([...members, newMember]);
    setIsCreateDialogOpen(false);
    form.reset();
  };

  const handleEditMember = (data: z.infer<typeof memberSchema>) => {
    if (!selectedMember) return;

    const updatedMembers = members.map((member) =>
      member.id === selectedMember.id
        ? {
            ...member,
            name: data.name,
            email: data.email,
            phone: data.phone,
            status: data.status,
            role: data.role,
          }
        : member,
    );

    setMembers(updatedMembers);
    setIsEditDialogOpen(false);
    setSelectedMember(null);
  };

  const handleDeleteMember = (memberId: string) => {
    const updatedMembers = members.filter((member) => member.id !== memberId);
    setMembers(updatedMembers);
  };

  const openEditDialog = (member) => {
    setSelectedMember(member);
    form.reset({
      name: member.name,
      email: member.email,
      phone: member.phone,
      role: member.role,
      status: member.status,
    });
    setIsEditDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>;
      case "pending":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-100 text-yellow-800 border-yellow-200"
          >
            Pending
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return (
          <Badge variant="outline" className="bg-primary/10 border-primary/20">
            Admin
          </Badge>
        );
      case "member":
        return <Badge variant="outline">Member</Badge>;
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Member Management</h2>
          <p className="text-muted-foreground">
            Manage church members and their accounts
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" /> Add Member
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Member</DialogTitle>
              <DialogDescription>
                Fill in the details below to add a new member to the system.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleCreateMember)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="john.doe@example.com"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 234 567 8900" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="member">Member</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
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
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <DialogFooter>
                  <Button type="submit">Add Member</Button>
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
            placeholder="Search members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Member</TableHead>
              <TableHead className="hidden md:table-cell">Contact</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Role</TableHead>
              <TableHead className="hidden md:table-cell">Join Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMembers.length > 0 ? (
              filteredMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-muted-foreground md:hidden">
                          {member.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div>{member.email}</div>
                    <div className="text-sm text-muted-foreground">
                      {member.phone}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(member.status)}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {getRoleBadge(member.role)}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {member.joinDate}
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
                            window.open(`/profile/${member.id}`, "_blank")
                          }
                          className="flex items-center gap-2"
                        >
                          <Eye className="h-4 w-4" /> View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => openEditDialog(member)}
                          className="flex items-center gap-2"
                        >
                          <Edit className="h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {member.status === "active" ? (
                          <DropdownMenuItem
                            onClick={() => {
                              const updatedMembers = members.map((m) =>
                                m.id === member.id
                                  ? { ...m, status: "inactive" }
                                  : m,
                              );
                              setMembers(updatedMembers);
                            }}
                            className="flex items-center gap-2"
                          >
                            <Ban className="h-4 w-4" /> Deactivate
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem
                            onClick={() => {
                              const updatedMembers = members.map((m) =>
                                m.id === member.id
                                  ? { ...m, status: "active" }
                                  : m,
                              );
                              setMembers(updatedMembers);
                            }}
                            className="flex items-center gap-2"
                          >
                            <CheckCircle className="h-4 w-4" /> Activate
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          onClick={() => handleDeleteMember(member.id)}
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
                  No members found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Member Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Member</DialogTitle>
            <DialogDescription>
              Update the details for this member.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleEditMember)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="john.doe@example.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 234 567 8900" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="member">Member</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
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
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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

export default MemberManagement;
