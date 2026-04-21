import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Alert, Link, Stack, Typography } from "@mui/material";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { useAuthContext } from "@/shared/context/AuthContext";

export const ForgotPasswordForm = () => {
  const { resetPassword, loading, error } = useAuthContext();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || loading) return;
    setIsSubmitting(true);
    try {
      const { ok } = await resetPassword(email.trim());
      if (ok) setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <Box sx={{ width: "100%" }}>
        <Alert severity="success" sx={{ mb: 2 }}>
          Als dit e-mailadres bij ons bekend is, hebben we een link gestuurd om je wachtwoord
          opnieuw in te stellen. Check ook je spamfolder.
        </Alert>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Niets ontvangen? Probeer het over een minuut nog eens.
        </Typography>
        <Stack direction="row" justifyContent="space-between">
          <Link component={RouterLink} to="/login" variant="body2">
            Terug naar inloggen
          </Link>
          <Link
            component="button"
            type="button"
            variant="body2"
            onClick={() => setSubmitted(false)}
          >
            Ander e-mailadres gebruiken
          </Link>
        </Stack>
      </Box>
    );
  }

  const disabled = isSubmitting || loading;

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
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
      <Button type="submit" variant="contained" fullWidth disabled={disabled} sx={{ mt: 2 }}>
        {disabled ? "Versturen..." : "Stuur reset-link"}
      </Button>
      <Stack direction="row" justifyContent="flex-start" sx={{ mt: 2 }}>
        <Link component={RouterLink} to="/login" variant="body2">
          Terug naar inloggen
        </Link>
      </Stack>
    </Box>
  );
};
