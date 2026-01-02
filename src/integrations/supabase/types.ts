export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      broadcasts: {
        Row: {
          body: string
          created_at: string
          id: string
          segment_json: Json | null
          sent_at: string | null
          title: string
        }
        Insert: {
          body: string
          created_at?: string
          id?: string
          segment_json?: Json | null
          sent_at?: string | null
          title: string
        }
        Update: {
          body?: string
          created_at?: string
          id?: string
          segment_json?: Json | null
          sent_at?: string | null
          title?: string
        }
        Relationships: []
      }
      course_days: {
        Row: {
          created_at: string
          day_number: number
          id: string
          is_published: boolean
          language: Database["public"]["Enums"]["content_language"]
          max_duration_seconds: number
          min_duration_seconds: number
          subtitle: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          day_number: number
          id?: string
          is_published?: boolean
          language?: Database["public"]["Enums"]["content_language"]
          max_duration_seconds?: number
          min_duration_seconds?: number
          subtitle?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          day_number?: number
          id?: string
          is_published?: boolean
          language?: Database["public"]["Enums"]["content_language"]
          max_duration_seconds?: number
          min_duration_seconds?: number
          subtitle?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      craving_logs: {
        Row: {
          context_tag: string | null
          coping_used: string | null
          created_at: string
          id: string
          intensity: number
          overcame: boolean | null
          trigger_tag: string | null
          user_id: string
        }
        Insert: {
          context_tag?: string | null
          coping_used?: string | null
          created_at?: string
          id?: string
          intensity: number
          overcame?: boolean | null
          trigger_tag?: string | null
          user_id: string
        }
        Update: {
          context_tag?: string | null
          coping_used?: string | null
          created_at?: string
          id?: string
          intensity?: number
          overcame?: boolean | null
          trigger_tag?: string | null
          user_id?: string
        }
        Relationships: []
      }
      day_modules: {
        Row: {
          config_json: Json | null
          created_at: string
          day_id: string
          description: string | null
          estimated_seconds: number
          gating_required: boolean
          id: string
          order_index: number
          title: string
          type: Database["public"]["Enums"]["module_type"]
        }
        Insert: {
          config_json?: Json | null
          created_at?: string
          day_id: string
          description?: string | null
          estimated_seconds?: number
          gating_required?: boolean
          id?: string
          order_index: number
          title: string
          type: Database["public"]["Enums"]["module_type"]
        }
        Update: {
          config_json?: Json | null
          created_at?: string
          day_id?: string
          description?: string | null
          estimated_seconds?: number
          gating_required?: boolean
          id?: string
          order_index?: number
          title?: string
          type?: Database["public"]["Enums"]["module_type"]
        }
        Relationships: [
          {
            foreignKeyName: "day_modules_day_id_fkey"
            columns: ["day_id"]
            isOneToOne: false
            referencedRelation: "course_days"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          created_at: string
          event_type: string
          id: string
          payload_json: Json | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          event_type: string
          id?: string
          payload_json?: Json | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          event_type?: string
          id?: string
          payload_json?: Json | null
          user_id?: string | null
        }
        Relationships: []
      }
      module_assets: {
        Row: {
          asset_type: Database["public"]["Enums"]["asset_type"]
          captions_url: string | null
          created_at: string
          id: string
          language: Database["public"]["Enums"]["content_language"]
          lottie_key: string | null
          module_id: string
          poster_url: string | null
          transcript: string | null
          url: string
        }
        Insert: {
          asset_type: Database["public"]["Enums"]["asset_type"]
          captions_url?: string | null
          created_at?: string
          id?: string
          language?: Database["public"]["Enums"]["content_language"]
          lottie_key?: string | null
          module_id: string
          poster_url?: string | null
          transcript?: string | null
          url: string
        }
        Update: {
          asset_type?: Database["public"]["Enums"]["asset_type"]
          captions_url?: string | null
          created_at?: string
          id?: string
          language?: Database["public"]["Enums"]["content_language"]
          lottie_key?: string | null
          module_id?: string
          poster_url?: string | null
          transcript?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "module_assets_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "day_modules"
            referencedColumns: ["id"]
          },
        ]
      }
      practices: {
        Row: {
          always_available: boolean
          config_json: Json
          created_at: string
          day_id: string | null
          description: string | null
          estimated_seconds: number
          id: string
          order_index: number
          practice_type: Database["public"]["Enums"]["practice_type"]
          required: boolean
          title: string
          unlock_after_day: number | null
        }
        Insert: {
          always_available?: boolean
          config_json?: Json
          created_at?: string
          day_id?: string | null
          description?: string | null
          estimated_seconds?: number
          id?: string
          order_index?: number
          practice_type: Database["public"]["Enums"]["practice_type"]
          required?: boolean
          title: string
          unlock_after_day?: number | null
        }
        Update: {
          always_available?: boolean
          config_json?: Json
          created_at?: string
          day_id?: string | null
          description?: string | null
          estimated_seconds?: number
          id?: string
          order_index?: number
          practice_type?: Database["public"]["Enums"]["practice_type"]
          required?: boolean
          title?: string
          unlock_after_day?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "practices_day_id_fkey"
            columns: ["day_id"]
            isOneToOne: false
            referencedRelation: "course_days"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          cigarettes_per_day: number | null
          created_at: string
          display_name: string | null
          id: string
          language: Database["public"]["Enums"]["content_language"]
          quit_date: string | null
          subscription_expires_at: string | null
          subscription_status: string | null
          updated_at: string
          voice_preference: string | null
          years_smoking: number | null
        }
        Insert: {
          cigarettes_per_day?: number | null
          created_at?: string
          display_name?: string | null
          id: string
          language?: Database["public"]["Enums"]["content_language"]
          quit_date?: string | null
          subscription_expires_at?: string | null
          subscription_status?: string | null
          updated_at?: string
          voice_preference?: string | null
          years_smoking?: number | null
        }
        Update: {
          cigarettes_per_day?: number | null
          created_at?: string
          display_name?: string | null
          id?: string
          language?: Database["public"]["Enums"]["content_language"]
          quit_date?: string | null
          subscription_expires_at?: string | null
          subscription_status?: string | null
          updated_at?: string
          voice_preference?: string | null
          years_smoking?: number | null
        }
        Relationships: []
      }
      user_broadcast_reads: {
        Row: {
          broadcast_id: string
          id: string
          read_at: string
          user_id: string
        }
        Insert: {
          broadcast_id: string
          id?: string
          read_at?: string
          user_id: string
        }
        Update: {
          broadcast_id?: string
          id?: string
          read_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_broadcast_reads_broadcast_id_fkey"
            columns: ["broadcast_id"]
            isOneToOne: false
            referencedRelation: "broadcasts"
            referencedColumns: ["id"]
          },
        ]
      }
      user_day_completions: {
        Row: {
          completed_at: string
          day_id: string
          id: string
          total_duration_seconds: number
          user_id: string
        }
        Insert: {
          completed_at?: string
          day_id: string
          id?: string
          total_duration_seconds: number
          user_id: string
        }
        Update: {
          completed_at?: string
          day_id?: string
          id?: string
          total_duration_seconds?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_day_completions_day_id_fkey"
            columns: ["day_id"]
            isOneToOne: false
            referencedRelation: "course_days"
            referencedColumns: ["id"]
          },
        ]
      }
      user_practice_logs: {
        Row: {
          completed_at: string
          duration_seconds: number
          id: string
          intensity_after: number | null
          intensity_before: number | null
          metadata_json: Json | null
          practice_id: string
          user_id: string
        }
        Insert: {
          completed_at?: string
          duration_seconds: number
          id?: string
          intensity_after?: number | null
          intensity_before?: number | null
          metadata_json?: Json | null
          practice_id: string
          user_id: string
        }
        Update: {
          completed_at?: string
          duration_seconds?: number
          id?: string
          intensity_after?: number | null
          intensity_before?: number | null
          metadata_json?: Json | null
          practice_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_practice_logs_practice_id_fkey"
            columns: ["practice_id"]
            isOneToOne: false
            referencedRelation: "practices"
            referencedColumns: ["id"]
          },
        ]
      }
      user_progress: {
        Row: {
          completed_at: string | null
          created_at: string
          day_id: string
          id: string
          module_id: string | null
          seconds_watched: number
          total_active_seconds: number
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          day_id: string
          id?: string
          module_id?: string | null
          seconds_watched?: number
          total_active_seconds?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          day_id?: string
          id?: string
          module_id?: string | null
          seconds_watched?: number
          total_active_seconds?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_progress_day_id_fkey"
            columns: ["day_id"]
            isOneToOne: false
            referencedRelation: "course_days"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_progress_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "day_modules"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      asset_type: "VIDEO" | "AUDIO" | "LOTTIE" | "IMAGE" | "CAPTIONS"
      content_language: "en" | "de" | "zh" | "hi"
      module_type:
        | "STORY_VIDEO"
        | "ANIMATED_SLIDES"
        | "COACH_VIDEO"
        | "GUIDED_PRACTICE"
        | "CHECKPOINT"
        | "CRAVING_TOOL"
      practice_type:
        | "BREATHING"
        | "URGE_SURFING"
        | "TRIGGER_SCAN"
        | "THOUGHT_REFRAME"
        | "VISUALIZATION"
        | "BODY_SCAN"
        | "MICRO_COMMITMENT"
        | "TAP_QUIZ"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
      asset_type: ["VIDEO", "AUDIO", "LOTTIE", "IMAGE", "CAPTIONS"],
      content_language: ["en", "de", "zh", "hi"],
      module_type: [
        "STORY_VIDEO",
        "ANIMATED_SLIDES",
        "COACH_VIDEO",
        "GUIDED_PRACTICE",
        "CHECKPOINT",
        "CRAVING_TOOL",
      ],
      practice_type: [
        "BREATHING",
        "URGE_SURFING",
        "TRIGGER_SCAN",
        "THOUGHT_REFRAME",
        "VISUALIZATION",
        "BODY_SCAN",
        "MICRO_COMMITMENT",
        "TAP_QUIZ",
      ],
    },
  },
} as const
