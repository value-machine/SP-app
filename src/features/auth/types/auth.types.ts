export interface User {
  id: string;
  email: string;
  created_at?: string;
}

/** Kept for future role expansion; profile uses `is_admin` for admin access. */
export type UserRole = "anonymous" | "free" | "premium" | "admin" | "super-admin";

/** Row from `public.people` linked via `user_id` to `auth.users`. */
export interface UserProfile {
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
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials {
  email: string;
  password: string;
}
