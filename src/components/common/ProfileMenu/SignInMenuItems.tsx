import { MenuItem, Box } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

interface SignInMenuItemsProps {
  onNavigateToLogin: () => void;
  onNavigateToSignup: () => void;
}

export const SignInMenuItems = ({
  onNavigateToLogin,
  onNavigateToSignup,
}: SignInMenuItemsProps) => {
  return (
    <>
      <MenuItem key="sign-in" onClick={onNavigateToLogin}>
        <Box sx={{ mr: 1, display: "flex", alignItems: "center" }}>
          <LoginIcon fontSize="small" />
        </Box>
        Inloggen
      </MenuItem>
      <MenuItem key="sign-up" onClick={onNavigateToSignup}>
        <Box sx={{ mr: 1, display: "flex", alignItems: "center" }}>
          <PersonAddIcon fontSize="small" />
        </Box>
        Registreren
      </MenuItem>
    </>
  );
};
