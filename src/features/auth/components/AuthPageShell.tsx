import { ReactNode } from "react";
import { Box, Paper, Typography } from "@mui/material";

interface AuthPageShellProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

/**
 * Centered card layout used by all standalone auth pages
 * (/login, /signup, /forgot-password, /update-password).
 */
export const AuthPageShell = ({ title, subtitle, children }: AuthPageShellProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        pt: { xs: 4, sm: 8 },
        pb: 4,
        px: 2,
      }}
    >
      <Paper
        elevation={2}
        sx={{
          width: "100%",
          maxWidth: 420,
          p: { xs: 3, sm: 4 },
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {subtitle}
          </Typography>
        )}
        {children}
      </Paper>
    </Box>
  );
};
