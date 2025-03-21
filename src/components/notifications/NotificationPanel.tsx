import React, { useState } from "react";
import { Bell, X, Check, ChevronRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: "project_update" | "pledge_reminder" | "milestone" | "general";
  read: boolean;
}

interface NotificationPanelProps {
  isOpen?: boolean;
  onClose?: () => void;
  notifications?: Notification[];
}

const NotificationPanel = ({
  isOpen = true,
  onClose = () => {},
  notifications = [
    {
      id: "1",
      title: "Youth Conference Magazine",
      message:
        "The project has reached 75% of its funding goal! Thank you for your contributions.",
      timestamp: "2 hours ago",
      type: "milestone",
      read: false,
    },
    {
      id: "2",
      title: "Pledge Reminder",
      message:
        "You have a pending pledge of $50 for the Youth Conference Magazine project.",
      timestamp: "1 day ago",
      type: "pledge_reminder",
      read: false,
    },
    {
      id: "3",
      title: "Content Submission",
      message:
        'Your article "Faith in Action" has been approved for the magazine.',
      timestamp: "3 days ago",
      type: "project_update",
      read: true,
    },
    {
      id: "4",
      title: "New Project Launched",
      message: "Church Building Fund project has been launched. Check it out!",
      timestamp: "1 week ago",
      type: "general",
      read: true,
    },
    {
      id: "5",
      title: "Payment Confirmation",
      message:
        "Your contribution of $25 to the Youth Conference Magazine has been received.",
      timestamp: "2 weeks ago",
      type: "project_update",
      read: true,
    },
  ],
}: NotificationPanelProps) => {
  const [localNotifications, setLocalNotifications] =
    useState<Notification[]>(notifications);

  // Count unread notifications
  const unreadCount = localNotifications.filter(
    (notification) => !notification.read,
  ).length;

  // Mark a notification as read
  const markAsRead = (id: string) => {
    setLocalNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    );
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setLocalNotifications((prevNotifications) =>
      prevNotifications.map((notification) => ({
        ...notification,
        read: true,
      })),
    );
  };

  // Get badge color based on notification type
  const getBadgeVariant = (type: Notification["type"]) => {
    switch (type) {
      case "milestone":
        return "default"; // primary color
      case "pledge_reminder":
        return "destructive";
      case "project_update":
        return "secondary";
      default:
        return "outline";
    }
  };

  // Get badge text based on notification type
  const getBadgeText = (type: Notification["type"]) => {
    switch (type) {
      case "milestone":
        return "Milestone";
      case "pledge_reminder":
        return "Action Required";
      case "project_update":
        return "Update";
      default:
        return "Info";
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-80 md:w-96 bg-background border-l shadow-lg flex flex-col">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between bg-muted/30">
        <div className="flex items-center space-x-2">
          <Bell className="h-5 w-5" />
          <h2 className="font-semibold text-lg">Notifications</h2>
          {unreadCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {unreadCount} new
            </Badge>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              Mark all read
            </Button>
          )}
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Notification List */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {localNotifications.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No notifications</p>
            </div>
          ) : (
            localNotifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  "rounded-lg border p-3 transition-colors hover:bg-muted/50 cursor-pointer",
                  !notification.read && "bg-muted/20 border-primary/20",
                )}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium">{notification.title}</h3>
                      <Badge variant={getBadgeVariant(notification.type)}>
                        {getBadgeText(notification.type)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {notification.message}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0 mt-1" />
                  )}
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-muted-foreground">
                    {notification.timestamp}
                  </span>
                  <div className="flex items-center space-x-1">
                    {notification.type === "pledge_reminder" && (
                      <Button variant="ghost" size="sm" className="h-7 text-xs">
                        Pay Now <ChevronRight className="ml-1 h-3 w-3" />
                      </Button>
                    )}
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          markAsRead(notification.id);
                        }}
                      >
                        <Check className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default NotificationPanel;
