import { Box, Typography, Container } from "@mui/material";
import { useAuthContext } from "@/shared/context/AuthContext";

export const HomePage = () => {
  const { user } = useAuthContext();

  return (
    <Container maxWidth="md">
      <Box sx={{ textAlign: "center", py: 8 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to SP Utrecht
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          A modern boilerplate with React, TypeScript, Vite, Material-UI, and Supabase
        </Typography>
        {user ? (
          <Box sx={{ mt: 4 }}>
            <Typography variant="body1" paragraph>
              Welcome back, {user.email}!
            </Typography>
          </Box>
        ) : (
          <Box sx={{ mt: 4 }}>
            <Typography variant="body1" color="text.secondary">
              Use the profile icon in the topbar to sign in.
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};
