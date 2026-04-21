import { MenuItem, Box, Divider } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { ProfileInfo } from "./ProfileInfo";
import { SignInMenuItems } from "./SignInMenuItems";
import type { User } from "@features/auth/types/auth.types";
import type { UserProfile } from "@features/auth/hooks/useUserProfile";

interface ProfileMenuContentProps {
  isLoggedIn: boolean;
  supabaseConfigured: boolean;
  user: User | null;
  profile: UserProfile | null;
  profileLoading: boolean;
  onNavigateToLogin: () => void;
  onNavigateToSignup: () => void;
  onSignOut: () => void;
}

export const ProfileMenuContent = ({
  isLoggedIn,
  supabaseConfigured,
  user,
  profile,
  profileLoading,
  onNavigateToLogin,
  onNavigateToSignup,
  onSignOut,
}: ProfileMenuContentProps) => {
  if (isLoggedIn) {
    return (
      <>
        <ProfileInfo user={user} profile={profile} profileLoading={profileLoading} />
        <Divider key="divider" />
        <MenuItem key="sign-out" onClick={onSignOut}>
          <Box sx={{ mr: 1, display: "flex", alignItems: "center" }}>
            <LogoutIcon fontSize="small" />
          </Box>
          Uitloggen
        </MenuItem>
      </>
    );
  }

  if (supabaseConfigured) {
    return (
      <SignInMenuItems
        onNavigateToLogin={onNavigateToLogin}
        onNavigateToSignup={onNavigateToSignup}
      />
    );
  }

  return (
    <MenuItem key="not-configured" disabled>
      <Box sx={{ mr: 1, display: "flex", alignItems: "center" }}>
        <LoginIcon fontSize="small" />
      </Box>
      Supabase is niet geconfigureerd
    </MenuItem>
  );
};
