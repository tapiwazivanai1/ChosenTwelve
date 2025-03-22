import { supabase } from "@/lib/supabase";
import type { Database } from "@/types/supabase";

export type Notification = Database["public"]["Tables"]["notifications"]["Row"];
export type NotificationInsert =
  Database["public"]["Tables"]["notifications"]["Insert"];
export type NotificationUpdate =
  Database["public"]["Tables"]["notifications"]["Update"];

export type NotificationRecipient =
  Database["public"]["Tables"]["notification_recipients"]["Row"];
export type NotificationRecipientInsert =
  Database["public"]["Tables"]["notification_recipients"]["Insert"];

export const notificationService = {
  async createNotification(notification: NotificationInsert) {
    const { data, error } = await supabase
      .from("notifications")
      .insert(notification)
      .select()
      .single();

    if (error) {
      console.error("Error creating notification:", error);
      throw error;
    }

    return data;
  },

  async updateNotification(id: string, updates: NotificationUpdate) {
    const { data, error } = await supabase
      .from("notifications")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating notification with id ${id}:`, error);
      throw error;
    }

    return data;
  },

  async getNotifications() {
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching notifications:", error);
      throw error;
    }

    return data;
  },

  async getNotificationById(id: string) {
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(`Error fetching notification with id ${id}:`, error);
      throw error;
    }

    return data;
  },

  async deleteNotification(id: string) {
    const { error } = await supabase
      .from("notifications")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(`Error deleting notification with id ${id}:`, error);
      throw error;
    }

    return true;
  },

  async addNotificationRecipient(recipient: NotificationRecipientInsert) {
    const { data, error } = await supabase
      .from("notification_recipients")
      .insert(recipient)
      .select()
      .single();

    if (error) {
      console.error("Error adding notification recipient:", error);
      throw error;
    }

    return data;
  },

  async getUserNotifications(userId: string) {
    const { data, error } = await supabase
      .from("notification_recipients")
      .select("*, notifications(*)")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(`Error fetching notifications for user ${userId}:`, error);
      throw error;
    }

    return data;
  },

  async markNotificationAsRead(id: string) {
    const { data, error } = await supabase
      .from("notification_recipients")
      .update({
        read: true,
        read_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error(`Error marking notification ${id} as read:`, error);
      throw error;
    }

    return data;
  },

  async sendNotificationToAllUsers(notificationId: string) {
    // First get all active users
    const { data: users, error: usersError } = await supabase
      .from("users")
      .select("id")
      .eq("status", "active");

    if (usersError) {
      console.error("Error fetching users for notification:", usersError);
      throw usersError;
    }

    // Create notification recipients for each user
    const recipients = users.map((user) => ({
      notification_id: notificationId,
      user_id: user.id,
      read: false,
    }));

    const { error } = await supabase
      .from("notification_recipients")
      .insert(recipients);

    if (error) {
      console.error("Error sending notification to all users:", error);
      throw error;
    }

    // Update notification status to sent
    await this.updateNotification(notificationId, {
      status: "sent",
      sent_date: new Date().toISOString(),
    });

    return true;
  },
};
