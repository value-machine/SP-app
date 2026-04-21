import { getSupabase } from "@shared/services/supabaseService";
import type { UserProfile } from "../types/auth.types";

const PERSON_PROFILE_FIELDS = `
  id,
  full_name,
  email,
  phone,
  photo_url,
  notes,
  user_id,
  is_admin,
  created_at,
  updated_at
`;

/**
 * Fetches person profile from `public.people` by auth user id (`user_id`).
 * Returns null if no row (PGRST116); throws on other errors.
 */
export const fetchUserProfile = async (authUserId: string): Promise<UserProfile | null> => {
  const { data, error } = await getSupabase()
    .from("people")
    .select(PERSON_PROFILE_FIELDS)
    .eq("user_id", authUserId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data as UserProfile | null;
};

/** Partial profile data for updates (excludes id and auth link) */
export type UserProfileUpdate = Partial<
  Pick<UserProfile, "full_name" | "email" | "phone" | "photo_url" | "notes">
>;

/**
 * Updates person profile in `public.people` for the given auth user id.
 */
export const updateUserProfile = async (
  authUserId: string,
  data: UserProfileUpdate
): Promise<UserProfile | null> => {
  const { data: updated, error } = await getSupabase()
    .from("people")
    .update(data)
    .eq("user_id", authUserId)
    .select(PERSON_PROFILE_FIELDS)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return updated as UserProfile | null;
};
