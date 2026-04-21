/**
 * Supabase public schema types (keep in sync with supabase/migrations).
 * Regenerate with `supabase gen types typescript` when schema changes.
 */

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      people: {
        Row: {
          id: string;
          full_name: string;
          email: string | null;
          phone: string | null;
          photo_url: string | null;
          notes: string | null;
          user_id: string | null;
          is_admin: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          email?: string | null;
          phone?: string | null;
          photo_url?: string | null;
          notes?: string | null;
          user_id?: string | null;
          is_admin?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          email?: string | null;
          phone?: string | null;
          photo_url?: string | null;
          notes?: string | null;
          user_id?: string | null;
          is_admin?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      organisatie_sections: {
        Row: {
          id: string;
          slug: string;
          heading: string;
          preface: string | null;
          sort_order: number;
        };
        Insert: {
          id?: string;
          slug: string;
          heading: string;
          preface?: string | null;
          sort_order?: number;
        };
        Update: {
          id?: string;
          slug?: string;
          heading?: string;
          preface?: string | null;
          sort_order?: number;
        };
        Relationships: [];
      };
      organisatie_groups: {
        Row: {
          id: string;
          section_id: string;
          slug: string;
          title: string;
          description_md: string;
          icon_key: string;
          sort_order: number;
          updated_at: string;
        };
        Insert: {
          id?: string;
          section_id: string;
          slug: string;
          title: string;
          description_md?: string;
          icon_key: string;
          sort_order?: number;
          updated_at?: string;
        };
        Update: {
          id?: string;
          section_id?: string;
          slug?: string;
          title?: string;
          description_md?: string;
          icon_key?: string;
          sort_order?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "organisatie_groups_section_id_fkey";
            columns: ["section_id"];
            isOneToOne: false;
            referencedRelation: "organisatie_sections";
            referencedColumns: ["id"];
          },
        ];
      };
      group_memberships: {
        Row: {
          id: string;
          group_id: string;
          person_id: string;
          role_label: string;
          note: string | null;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          group_id: string;
          person_id: string;
          role_label: string;
          note?: string | null;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          group_id?: string;
          person_id?: string;
          role_label?: string;
          note?: string | null;
          sort_order?: number;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "group_memberships_group_id_fkey";
            columns: ["group_id"];
            isOneToOne: false;
            referencedRelation: "organisatie_groups";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "group_memberships_person_id_fkey";
            columns: ["person_id"];
            isOneToOne: false;
            referencedRelation: "people";
            referencedColumns: ["id"];
          },
        ];
      };
      responsibilities: {
        Row: {
          id: string;
          group_id: string | null;
          title: string;
          description_md: string;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          group_id?: string | null;
          title: string;
          description_md?: string;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          group_id?: string | null;
          title?: string;
          description_md?: string;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "responsibilities_group_id_fkey";
            columns: ["group_id"];
            isOneToOne: false;
            referencedRelation: "organisatie_groups";
            referencedColumns: ["id"];
          },
        ];
      };
      responsibility_subtasks: {
        Row: {
          id: string;
          responsibility_id: string;
          title: string;
          body_md: string | null;
          sort_order: number;
          done: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          responsibility_id: string;
          title: string;
          body_md?: string | null;
          sort_order?: number;
          done?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          responsibility_id?: string;
          title?: string;
          body_md?: string | null;
          sort_order?: number;
          done?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "responsibility_subtasks_responsibility_id_fkey";
            columns: ["responsibility_id"];
            isOneToOne: false;
            referencedRelation: "responsibilities";
            referencedColumns: ["id"];
          },
        ];
      };
      responsibility_assignees: {
        Row: {
          id: string;
          responsibility_id: string;
          person_id: string;
          note: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          responsibility_id: string;
          person_id: string;
          note?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          responsibility_id?: string;
          person_id?: string;
          note?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "responsibility_assignees_responsibility_id_fkey";
            columns: ["responsibility_id"];
            isOneToOne: false;
            referencedRelation: "responsibilities";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "responsibility_assignees_person_id_fkey";
            columns: ["person_id"];
            isOneToOne: false;
            referencedRelation: "people";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
