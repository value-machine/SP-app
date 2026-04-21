import { Box, Chip } from "@mui/material";
import type { UserProfile } from "@features/auth/hooks/useUserProfile";
import { getRoleDisplay } from "@/shared/utils/profileHelpers";

interface ProfileChipsProps {
  profile: UserProfile;
}

export const ProfileChips = ({ profile }: ProfileChipsProps) => {
  const roleDisplay = getRoleDisplay(profile);

  if (!roleDisplay) {
    return null;
  }

  return (
    <Box sx={{ display: "flex", gap: 0.5, mt: 0.5, flexWrap: "wrap" }}>
      <Chip
        label={roleDisplay}
        size="small"
        variant="outlined"
        sx={{ fontSize: (theme) => theme.typography.caption.fontSize }}
      />
    </Box>
  );
};
