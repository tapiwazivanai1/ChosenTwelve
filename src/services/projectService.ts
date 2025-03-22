import { supabase } from "@/lib/supabase";
import type { Database } from "@/types/supabase";

export type Project = Database["public"]["Tables"]["projects"]["Row"];
export type ProjectInsert = Database["public"]["Tables"]["projects"]["Insert"];
export type ProjectUpdate = Database["public"]["Tables"]["projects"]["Update"];

export const projectService = {
  async getProjects() {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching projects:", error);
      throw error;
    }

    return data;
  },

  async getProjectById(id: string) {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(`Error fetching project with id ${id}:`, error);
      throw error;
    }

    return data;
  },

  async createProject(project: ProjectInsert) {
    const { data, error } = await supabase
      .from("projects")
      .insert(project)
      .select()
      .single();

    if (error) {
      console.error("Error creating project:", error);
      throw error;
    }

    return data;
  },

  async updateProject(id: string, updates: ProjectUpdate) {
    const { data, error } = await supabase
      .from("projects")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating project with id ${id}:`, error);
      throw error;
    }

    return data;
  },

  async deleteProject(id: string) {
    const { error } = await supabase.from("projects").delete().eq("id", id);

    if (error) {
      console.error(`Error deleting project with id ${id}:`, error);
      throw error;
    }

    return true;
  },

  async getFeaturedProject() {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("featured", true)
      .eq("status", "active")
      .single();

    if (error && error.code !== "PGRST116") {
      // PGRST116 is the error code for no rows returned
      console.error("Error fetching featured project:", error);
      throw error;
    }

    return data;
  },

  async getProjectsByCategory(category: string) {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("category", category)
      .eq("status", "active")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(
        `Error fetching projects with category ${category}:`,
        error,
      );
      throw error;
    }

    return data;
  },
};
