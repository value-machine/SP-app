import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Alert, Link, Stack } from "@mui/material";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { useAuthContext } from "@/shared/context/AuthContext";
import { useAuthRedirect } from "../hooks/useAuthRedirect";
import type { LoginCredentials } from "../types/auth.types";

const friendlyLoginError = (message: string): string => {
  const lower = message.toLowerCase();
  if (lower.includes("invalid login credentials")) {
    return "E-mail of wachtwoord onjuist.";
  }
  if (lower.includes("email not confirmed")) {
    return "Je e-mailadres is nog niet bevestigd. Check je inbox of vraag een nieuwe bevestigingsmail aan.";
  }
  if (lower.includes("rate") || lower.includes("too many")) {
    return "Te veel pogingen. Probeer het over een minuut opnieuw.";
  }
  return message;
};

export const LoginForm = () => {
  const { login, loading, error } = useAuthContext();
  const resetRedirect = useAuthRedirect();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || loading) return;
    setIsSubmitting(true);
    try {
      resetRedirect();
      const credentials: LoginCredentials = { email: email.trim(), password };
      await login(credentials);
    } finally {
      setIsSubmitting(false);
    }
  };

  const disabled = isSubmitting || loading;

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {friendlyLoginError(error)}
        </Alert>
      )}
      <Input
        label="E-mail"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        fullWidth
        margin="normal"
        autoComplete="email"
        autoFocus
      />
      <Input
        label="Wachtwoord"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        fullWidth
        margin="normal"
        autoComplete="current-password"
      />
      <Button type="submit" variant="contained" fullWidth disabled={disabled} sx={{ mt: 2 }}>
        {disabled ? "Bezig met inloggen..." : "Inloggen"}
      </Button>
      <Stack direction="row" justifyContent="space-between" sx={{ mt: 2 }}>
        <Link component={RouterLink} to="/forgot-password" variant="body2">
          Wachtwoord vergeten?
        </Link>
        <Link component={RouterLink} to="/signup" variant="body2">
          Nog geen account? Registreren
        </Link>
      </Stack>
    </Box>
  );
};
