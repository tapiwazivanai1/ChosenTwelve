import { supabase } from "@/lib/supabase";
import type { Database } from "@/types/supabase";

export type Contribution = Database["public"]["Tables"]["contributions"]["Row"];
export type ContributionInsert =
  Database["public"]["Tables"]["contributions"]["Insert"];

export const contributionService = {
  async createContribution(contribution: ContributionInsert) {
    const { data, error } = await supabase
      .from("contributions")
      .insert(contribution)
      .select()
      .single();

    if (error) {
      console.error("Error creating contribution:", error);
      throw error;
    }

    // Update project's current amount and contributors count
    await this.updateProjectAfterContribution(
      contribution.project_id,
      contribution.amount,
    );

    return data;
  },

  async getContributionsByProject(projectId: string) {
    const { data, error } = await supabase
      .from("contributions")
      .select("*")
      .eq("project_id", projectId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(
        `Error fetching contributions for project ${projectId}:`,
        error,
      );
      throw error;
    }

    return data;
  },

  async getContributionsByUser(userId: string) {
    const { data, error } = await supabase
      .from("contributions")
      .select("*, projects(*)")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(`Error fetching contributions for user ${userId}:`, error);
      throw error;
    }

    return data;
  },

  async updateProjectAfterContribution(projectId: string, amount: number) {
    // First get the current project data
    const { data: project, error: projectError } = await supabase
      .from("projects")
      .select("current_amount, contributors")
      .eq("id", projectId)
      .single();

    if (projectError) {
      console.error(`Error fetching project ${projectId}:`, projectError);
      throw projectError;
    }

    // Update the project with new amount and contributors count
    const { error: updateError } = await supabase
      .from("projects")
      .update({
        current_amount: project.current_amount + amount,
        contributors: project.contributors + 1,
        updated_at: new Date().toISOString(),
      })
      .eq("id", projectId);

    if (updateError) {
      console.error(
        `Error updating project ${projectId} after contribution:`,
        updateError,
      );
      throw updateError;
    }

    return true;
  },
};
