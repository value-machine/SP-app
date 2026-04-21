import type { User } from "@features/auth/types/auth.types";
import type { UserProfile } from "@features/auth/hooks/useUserProfile";

/**
 * Get display name for user (profile full name, email, or fallback)
 */
export const getDisplayName = (user: User | null, profile: UserProfile | null): string => {
  if (profile?.full_name) return profile.full_name;
  if (user?.email) return user.email;
  return "User";
};

/**
 * Get avatar initial from full name or email
 */
export const getAvatarInitial = (user: User | null, profile: UserProfile | null): string | null => {
  if (profile?.full_name) {
    return profile.full_name.charAt(0).toUpperCase();
  }
  if (user?.email) {
    return user.email.charAt(0).toUpperCase();
  }
  return null;
};

/**
 * Get avatar URL from profile
 */
export const getAvatarUrl = (profile: UserProfile | null): string | null => {
  return profile?.photo_url || null;
};

/**
 * Role chip label (admin only for now)
 */
export const getRoleDisplay = (profile: UserProfile | null): string | null => {
  if (profile?.is_admin) {
    return "Admin";
  }
  return null;
};
