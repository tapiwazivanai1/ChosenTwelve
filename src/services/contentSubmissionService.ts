import { supabase } from "@/lib/supabase";
import type { Database } from "@/types/supabase";

export type ContentSubmission =
  Database["public"]["Tables"]["content_submissions"]["Row"];
export type ContentSubmissionInsert =
  Database["public"]["Tables"]["content_submissions"]["Insert"];
export type ContentSubmissionUpdate =
  Database["public"]["Tables"]["content_submissions"]["Update"];

export type ContentSubmissionFile =
  Database["public"]["Tables"]["content_submission_files"]["Row"];
export type ContentSubmissionFileInsert =
  Database["public"]["Tables"]["content_submission_files"]["Insert"];

export const contentSubmissionService = {
  async createSubmission(submission: ContentSubmissionInsert) {
    const { data, error } = await supabase
      .from("content_submissions")
      .insert(submission)
      .select()
      .single();

    if (error) {
      console.error("Error creating content submission:", error);
      throw error;
    }

    return data;
  },

  async updateSubmission(id: string, updates: ContentSubmissionUpdate) {
    const { data, error } = await supabase
      .from("content_submissions")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating submission with id ${id}:`, error);
      throw error;
    }

    return data;
  },

  async getSubmissionsByProject(projectId: string) {
    const { data, error } = await supabase
      .from("content_submissions")
      .select("*, content_submission_files(*)")
      .eq("project_id", projectId)
      .order("submission_date", { ascending: false });

    if (error) {
      console.error(
        `Error fetching submissions for project ${projectId}:`,
        error,
      );
      throw error;
    }

    return data;
  },

  async getSubmissionsByUser(userId: string) {
    const { data, error } = await supabase
      .from("content_submissions")
      .select("*, content_submission_files(*), projects(title)")
      .eq("user_id", userId)
      .order("submission_date", { ascending: false });

    if (error) {
      console.error(`Error fetching submissions for user ${userId}:`, error);
      throw error;
    }

    return data;
  },

  async getSubmissionById(id: string) {
    const { data, error } = await supabase
      .from("content_submissions")
      .select("*, content_submission_files(*), projects(title)")
      .eq("id", id)
      .single();

    if (error) {
      console.error(`Error fetching submission with id ${id}:`, error);
      throw error;
    }

    return data;
  },

  async addSubmissionFile(file: ContentSubmissionFileInsert) {
    const { data, error } = await supabase
      .from("content_submission_files")
      .insert(file)
      .select()
      .single();

    if (error) {
      console.error("Error adding submission file:", error);
      throw error;
    }

    return data;
  },

  async uploadFile(file: File, path: string) {
    const { data, error } = await supabase.storage
      .from("content-submissions")
      .upload(path, file);

    if (error) {
      console.error("Error uploading file:", error);
      throw error;
    }

    // Get public URL for the uploaded file
    const { data: publicUrlData } = supabase.storage
      .from("content-submissions")
      .getPublicUrl(path);

    return publicUrlData.publicUrl;
  },

  async deleteSubmission(id: string) {
    const { error } = await supabase
      .from("content_submissions")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(`Error deleting submission with id ${id}:`, error);
      throw error;
    }

    return true;
  },
};
