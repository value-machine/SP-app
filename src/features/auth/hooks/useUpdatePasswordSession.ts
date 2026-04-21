import { useEffect, useState } from "react";
import { getSupabase, isSupabaseConfigured } from "@shared/services/supabaseService";

export type UpdatePasswordSessionStatus = "pending" | "ready" | "expired";

/**
 * Detect Supabase password-recovery parameters in the current URL.
 * Supabase emits:
 *   - PKCE flow:     /update-password?code=<pkce>
 *   - Implicit flow: /update-password#access_token=...&type=recovery
 */
const urlLooksLikeRecovery = (): boolean => {
  const url = new URL(window.location.href);
  if (url.searchParams.has("code")) return true;
  if (url.searchParams.get("type") === "recovery") return true;
  const hash = url.hash || "";
  return hash.includes("type=recovery") || hash.includes("access_token");
};

/**
 * Tracks whether the /update-password page has a valid password-recovery session.
 *
 * - Subscribes to `onAuthStateChange` and resolves to `ready` on `PASSWORD_RECOVERY`.
 * - Resolves to `expired` if the URL carries no recovery params, or after a
 *   grace period if Supabase never emits the event (invalid/expired link).
 *
 * This intentionally does NOT treat a normal `SIGNED_IN` session as sufficient;
 * only an explicit recovery handshake unlocks the password-change form.
 */
export const useUpdatePasswordSession = (): UpdatePasswordSessionStatus => {
  const [status, setStatus] = useState<UpdatePasswordSessionStatus>("pending");

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setStatus("expired");
      return;
    }

    const hasRecoveryParams = urlLooksLikeRecovery();

    if (!hasRecoveryParams) {
      setStatus("expired");
      return;
    }

    const supabase = getSupabase();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setStatus("ready");
      }
    });

    const timeoutId = window.setTimeout(() => {
      setStatus((prev) => (prev === "pending" ? "expired" : prev));
    }, 4000);

    return () => {
      window.clearTimeout(timeoutId);
      subscription.unsubscribe();
    };
  }, []);

  return status;
};
