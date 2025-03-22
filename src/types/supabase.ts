export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string;
          title: string;
          description: string;
          deadline: string;
          current_amount: number;
          target_amount: number;
          contributors: number;
          category: string;
          image: string | null;
          featured: boolean;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          deadline: string;
          current_amount?: number;
          target_amount: number;
          contributors?: number;
          category: string;
          image?: string | null;
          featured?: boolean;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          deadline?: string;
          current_amount?: number;
          target_amount?: number;
          contributors?: number;
          category?: string;
          image?: string | null;
          featured?: boolean;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      users: {
        Row: {
          id: string;
          name: string | null;
          email: string | null;
          phone: string | null;
          avatar_url: string | null;
          role: string;
          status: string;
          join_date: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name?: string | null;
          email?: string | null;
          phone?: string | null;
          avatar_url?: string | null;
          role?: string;
          status?: string;
          join_date?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string | null;
          email?: string | null;
          phone?: string | null;
          avatar_url?: string | null;
          role?: string;
          status?: string;
          join_date?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      contributions: {
        Row: {
          id: string;
          project_id: string;
          user_id: string | null;
          amount: number;
          payment_method: string;
          payment_status: string;
          transaction_reference: string | null;
          contributor_name: string | null;
          contributor_email: string | null;
          contributor_phone: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          user_id?: string | null;
          amount: number;
          payment_method: string;
          payment_status?: string;
          transaction_reference?: string | null;
          contributor_name?: string | null;
          contributor_email?: string | null;
          contributor_phone?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          user_id?: string | null;
          amount?: number;
          payment_method?: string;
          payment_status?: string;
          transaction_reference?: string | null;
          contributor_name?: string | null;
          contributor_email?: string | null;
          contributor_phone?: string | null;
          created_at?: string;
        };
      };
      content_submissions: {
        Row: {
          id: string;
          project_id: string;
          user_id: string | null;
          title: string;
          content: string;
          content_type: string;
          status: string;
          rejection_reason: string | null;
          submitted_by_name: string | null;
          submitted_by_email: string | null;
          submission_date: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          user_id?: string | null;
          title: string;
          content: string;
          content_type: string;
          status?: string;
          rejection_reason?: string | null;
          submitted_by_name?: string | null;
          submitted_by_email?: string | null;
          submission_date?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          user_id?: string | null;
          title?: string;
          content?: string;
          content_type?: string;
          status?: string;
          rejection_reason?: string | null;
          submitted_by_name?: string | null;
          submitted_by_email?: string | null;
          submission_date?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      content_submission_files: {
        Row: {
          id: string;
          submission_id: string;
          file_name: string;
          file_size: string | null;
          file_type: string | null;
          file_url: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          submission_id: string;
          file_name: string;
          file_size?: string | null;
          file_type?: string | null;
          file_url: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          submission_id?: string;
          file_name?: string;
          file_size?: string | null;
          file_type?: string | null;
          file_url?: string;
          created_at?: string;
        };
      };
      notifications: {
        Row: {
          id: string;
          title: string;
          message: string;
          type: string;
          status: string;
          audience: string;
          scheduled_date: string | null;
          sent_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          message: string;
          type: string;
          status?: string;
          audience?: string;
          scheduled_date?: string | null;
          sent_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          message?: string;
          type?: string;
          status?: string;
          audience?: string;
          scheduled_date?: string | null;
          sent_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      notification_recipients: {
        Row: {
          id: string;
          notification_id: string;
          user_id: string;
          read: boolean;
          read_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          notification_id: string;
          user_id: string;
          read?: boolean;
          read_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          notification_id?: string;
          user_id?: string;
          read?: boolean;
          read_at?: string | null;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
