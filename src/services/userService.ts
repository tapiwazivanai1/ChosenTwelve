import { supabase } from "@/lib/supabase";
import type { Database } from "@/types/supabase";

export type User = Database["public"]["Tables"]["users"]["Row"];
export type UserInsert = Database["public"]["Tables"]["users"]["Insert"];
export type UserUpdate = Database["public"]["Tables"]["users"]["Update"];

export const userService = {
  async getCurrentUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return null;

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error && error.code !== "PGRST116") {
      // PGRST116 is the error code for no rows returned
      console.error("Error fetching current user:", error);
      throw error;
    }

    return data;
  },

  async getUserById(id: string) {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(`Error fetching user with id ${id}:`, error);
      throw error;
    }

    return data;
  },

  async updateUser(id: string, updates: UserUpdate) {
    const { data, error } = await supabase
      .from("users")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating user with id ${id}:`, error);
      throw error;
    }

    return data;
  },

  async createUserProfile(userProfile: UserInsert) {
    const { data, error } = await supabase
      .from("users")
      .insert(userProfile)
      .select()
      .single();

    if (error) {
      console.error("Error creating user profile:", error);
      throw error;
    }

    return data;
  },

  async getAllUsers() {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .order("name");

    if (error) {
      console.error("Error fetching all users:", error);
      throw error;
    }

    return data;
  },

  async getUsersByRole(role: string) {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("role", role)
      .order("name");

    if (error) {
      console.error(`Error fetching users with role ${role}:`, error);
      throw error;
    }

    return data;
  },

  async uploadAvatar(file: File, userId: string) {
    const fileExt = file.name.split(".").pop();
    const fileName = `${userId}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("user-avatars")
      .upload(filePath, file);

    if (uploadError) {
      console.error("Error uploading avatar:", uploadError);
      throw uploadError;
    }

    const { data: urlData } = supabase.storage
      .from("user-avatars")
      .getPublicUrl(filePath);

    // Update user profile with new avatar URL
    await this.updateUser(userId, { avatar_url: urlData.publicUrl });

    return urlData.publicUrl;
  },

  async signUp(
    email: string,
    password: string,
    userData: Omit<UserInsert, "id">,
  ) {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      console.error("Error signing up:", authError);
      throw authError;
    }

    if (authData.user) {
      // Create user profile
      await this.createUserProfile({
        id: authData.user.id,
        email: authData.user.email,
        ...userData,
      });
    }

    return authData;
  },

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Error signing in:", error);
      throw error;
    }

    return data;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error signing out:", error);
      throw error;
    }

    return true;
  },
};
