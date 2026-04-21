import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Alert, Link, Stack } from "@mui/material";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { useAuthContext } from "@/shared/context/AuthContext";
import { useAuthRedirect } from "../hooks/useAuthRedirect";

const MIN_PASSWORD_LENGTH = 8;

const friendlySignupError = (message: string): string => {
  const lower = message.toLowerCase();
  if (lower.includes("already") && lower.includes("registered")) {
    return "Dit e-mailadres is al geregistreerd. Log in of reset je wachtwoord.";
  }
  if (lower.includes("weak") || lower.includes("password")) {
    return `Wachtwoord moet minstens ${MIN_PASSWORD_LENGTH} tekens lang zijn.`;
  }
  if (lower.includes("rate") || lower.includes("too many")) {
    return "Te veel pogingen. Probeer het over een minuut opnieuw.";
  }
  return message;
};

export const SignupForm = () => {
  const { signUp, loading, error } = useAuthContext();
  const resetRedirect = useAuthRedirect();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): string | null => {
    if (password.length < MIN_PASSWORD_LENGTH) {
      return `Wachtwoord moet minstens ${MIN_PASSWORD_LENGTH} tekens lang zijn.`;
    }
    if (password !== passwordConfirm) {
      return "De wachtwoorden komen niet overeen.";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || loading) return;
    setLocalError(null);

    const validationError = validate();
    if (validationError) {
      setLocalError(validationError);
      return;
    }

    setIsSubmitting(true);
    try {
      resetRedirect();
      await signUp({ email: email.trim(), password });
    } finally {
      setIsSubmitting(false);
    }
  };

  const displayError = localError ?? (error ? friendlySignupError(error) : null);
  const disabled = isSubmitting || loading;

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
      {displayError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {displayError}
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
        autoComplete="new-password"
        helperText={`Minstens ${MIN_PASSWORD_LENGTH} tekens`}
      />
      <Input
        label="Wachtwoord bevestigen"
        type="password"
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
        required
        fullWidth
        margin="normal"
        autoComplete="new-password"
      />
      <Button type="submit" variant="contained" fullWidth disabled={disabled} sx={{ mt: 2 }}>
        {disabled ? "Account aanmaken..." : "Account aanmaken"}
      </Button>
      <Stack direction="row" justifyContent="flex-end" sx={{ mt: 2 }}>
        <Link component={RouterLink} to="/login" variant="body2">
          Al een account? Inloggen
        </Link>
      </Stack>
    </Box>
  );
};
