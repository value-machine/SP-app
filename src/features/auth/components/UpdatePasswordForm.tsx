import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Box, Alert, Link, Stack, CircularProgress, Typography } from "@mui/material";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { useAuthContext } from "@/shared/context/AuthContext";
import { useUpdatePasswordSession } from "../hooks/useUpdatePasswordSession";

const MIN_PASSWORD_LENGTH = 8;

export const UpdatePasswordForm = () => {
  const { updatePassword, loading } = useAuthContext();
  const status = useUpdatePasswordSession();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (status === "pending") {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (status === "expired") {
    return (
      <Box sx={{ width: "100%" }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          Deze link is ongeldig of verlopen. Vraag een nieuwe reset-link aan.
        </Alert>
        <Stack direction="row" justifyContent="space-between">
          <Link component={RouterLink} to="/forgot-password" variant="body2">
            Nieuwe reset-link aanvragen
          </Link>
          <Link component={RouterLink} to="/login" variant="body2">
            Terug naar inloggen
          </Link>
        </Stack>
      </Box>
    );
  }

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

    const validationError = validate();
    setFormError(validationError);
    if (validationError) return;

    setIsSubmitting(true);
    try {
      const { ok } = await updatePassword(password);
      if (ok) {
        void navigate("/", { replace: true });
      } else {
        setFormError("Wachtwoord bijwerken is mislukt. Probeer het opnieuw.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const disabled = isSubmitting || loading;

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Kies een nieuw wachtwoord voor je account.
      </Typography>
      {formError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {formError}
        </Alert>
      )}
      <Input
        label="Nieuw wachtwoord"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        fullWidth
        margin="normal"
        autoComplete="new-password"
        helperText={`Minstens ${MIN_PASSWORD_LENGTH} tekens`}
        autoFocus
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
        {disabled ? "Opslaan..." : "Wachtwoord opslaan"}
      </Button>
    </Box>
  );
};
