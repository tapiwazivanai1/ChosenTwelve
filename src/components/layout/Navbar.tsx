import React from "react";
import { Link } from "react-router-dom";
import { Bell, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface NavbarProps {
  className?: string;
}

const Navbar = ({ className = "" }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      className={cn(
        "w-full bg-background border-b border-border sticky top-0 z-50",
        className,
      )}
    >
      <div className="container mx-auto px-4 h-[70px] flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold">GRM</span>
          </div>
          <span className="font-bold text-lg hidden md:block">
            Guta Ra Mwari
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Dashboard
          </Link>
          <Link
            to="/projects"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Projects
          </Link>
          <Link
            to="/submissions"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Submissions
          </Link>
          <Link
            to="/notifications"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Notifications
          </Link>
        </div>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          {/* Notification Bell */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </Button>

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="rounded-full h-8 w-8 p-0">
                <Avatar>
                  <AvatarImage
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=church"
                    alt="User"
                  />
                  <AvatarFallback>GR</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>My Contributions</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link
              to="/"
              className="text-sm font-medium hover:text-primary transition-colors p-2 rounded-md hover:bg-accent"
              onClick={toggleMenu}
            >
              Dashboard
            </Link>
            <Link
              to="/projects"
              className="text-sm font-medium hover:text-primary transition-colors p-2 rounded-md hover:bg-accent"
              onClick={toggleMenu}
            >
              Projects
            </Link>
            <Link
              to="/submissions"
              className="text-sm font-medium hover:text-primary transition-colors p-2 rounded-md hover:bg-accent"
              onClick={toggleMenu}
            >
              Submissions
            </Link>
            <Link
              to="/notifications"
              className="text-sm font-medium hover:text-primary transition-colors p-2 rounded-md hover:bg-accent"
              onClick={toggleMenu}
            >
              Notifications
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
