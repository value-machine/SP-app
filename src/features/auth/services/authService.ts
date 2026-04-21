import { getSupabase, isSupabaseConfigured } from "@shared/services/supabaseService";
import { queryClient } from "@shared/utils/queryClient";
import type { User, LoginCredentials, SignUpCredentials } from "../types/auth.types";
import { supabaseUserToUser } from "@/shared/utils/userUtils";
import { buildAppUrl } from "@utils/appUrl";
import type { User as SupabaseUser } from "@supabase/supabase-js";

const NOT_CONFIGURED_ERROR = new Error(
  "Authentication requires Supabase to be configured. Please set up Supabase in the setup wizard."
);

/**
 * Supabase returns `data.user` with an empty `identities` array when the email is already
 * registered (anti-enumeration behaviour). We treat that as a duplicate signup.
 */
const isDuplicateEmailSignUp = (user: SupabaseUser | null): boolean => {
  if (!user) return false;
  const identities = (user as SupabaseUser & { identities?: unknown[] }).identities;
  return Array.isArray(identities) && identities.length === 0;
};

export const login = async (
  credentials: LoginCredentials
): Promise<{ user: User | null; error: Error | null }> => {
  if (!isSupabaseConfigured()) {
    return { user: null, error: NOT_CONFIGURED_ERROR };
  }

  try {
    const { data, error } = await getSupabase().auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) {
      return { user: null, error };
    }

    const user = supabaseUserToUser(data.user);
    return { user, error: null };
  } catch (error) {
    return {
      user: null,
      error: error instanceof Error ? error : new Error("Login failed"),
    };
  }
};

export const signUp = async (
  credentials: SignUpCredentials
): Promise<{ user: User | null; error: Error | null }> => {
  if (!isSupabaseConfigured()) {
    return { user: null, error: NOT_CONFIGURED_ERROR };
  }

  try {
    const { data, error } = await getSupabase().auth.signUp({
      email: credentials.email,
      password: credentials.password,
      options: {
        emailRedirectTo: buildAppUrl(),
      },
    });

    if (error) {
      return { user: null, error };
    }

    if (isDuplicateEmailSignUp(data.user)) {
      return {
        user: null,
        error: new Error("Dit e-mailadres is al geregistreerd. Log in of reset je wachtwoord."),
      };
    }

    const user = supabaseUserToUser(data.user);
    return { user, error: null };
  } catch (error) {
    return {
      user: null,
      error: error instanceof Error ? error : new Error("Sign up failed"),
    };
  }
};

export const logout = async (): Promise<{ error: Error | null }> => {
  if (!isSupabaseConfigured()) {
    return { error: null };
  }

  try {
    queryClient.clear();
    const { error } = await getSupabase().auth.signOut();
    return { error: error || null };
  } catch (error) {
    return {
      error: error instanceof Error ? error : new Error("Logout failed"),
    };
  }
};

export const getCurrentUser = async (): Promise<{
  user: User | null;
  error: Error | null;
}> => {
  if (!isSupabaseConfigured()) {
    return { user: null, error: null };
  }

  try {
    const {
      data: { user: authUser },
      error,
    } = await getSupabase().auth.getUser();

    if (error) {
      return { user: null, error };
    }

    const user = supabaseUserToUser(authUser);
    return { user, error: null };
  } catch (error) {
    return {
      user: null,
      error: error instanceof Error ? error : new Error("Get user failed"),
    };
  }
};

/**
 * Send a password-reset email. Supabase always returns success (anti-enumeration);
 * surface a neutral message in the UI.
 */
export const resetPasswordForEmail = async (email: string): Promise<{ error: Error | null }> => {
  if (!isSupabaseConfigured()) {
    return { error: NOT_CONFIGURED_ERROR };
  }

  try {
    const { error } = await getSupabase().auth.resetPasswordForEmail(email, {
      redirectTo: buildAppUrl("update-password"),
    });
    return { error: error || null };
  } catch (error) {
    return {
      error: error instanceof Error ? error : new Error("Failed to send reset email"),
    };
  }
};

/**
 * Update the password for the currently signed-in (or password-recovery) session.
 */
export const updatePassword = async (newPassword: string): Promise<{ error: Error | null }> => {
  if (!isSupabaseConfigured()) {
    return { error: NOT_CONFIGURED_ERROR };
  }

  try {
    const { error } = await getSupabase().auth.updateUser({ password: newPassword });
    return { error: error || null };
  } catch (error) {
    return {
      error: error instanceof Error ? error : new Error("Failed to update password"),
    };
  }
};

/**
 * Sign in anonymously (for visitors who haven't logged in).
 * Used so public RLS reads continue to work.
 */
export const signInAnonymously = async (): Promise<{ error: Error | null }> => {
  if (!isSupabaseConfigured()) {
    return { error: null };
  }

  try {
    const { error } = await getSupabase().auth.signInAnonymously();
    return { error: error || null };
  } catch (error) {
    return {
      error: error instanceof Error ? error : new Error("Failed to sign in anonymously"),
    };
  }
};

/**
 * Exchange authorization code for a session (used in optional email-confirmation PKCE callback).
 */
export const exchangeCodeForSession = async (code: string): Promise<{ error: Error | null }> => {
  if (!isSupabaseConfigured()) {
    return { error: new Error("Supabase is not configured") };
  }

  try {
    const { error } = await getSupabase().auth.exchangeCodeForSession(code);
    return { error: error || null };
  } catch (error) {
    return {
      error: error instanceof Error ? error : new Error("Failed to exchange code for session"),
    };
  }
};
