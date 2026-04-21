import { AuthPageShell } from "@features/auth/components/AuthPageShell";
import { ForgotPasswordForm } from "@features/auth/components/ForgotPasswordForm";

export const ForgotPasswordPage = () => {
  return (
    <AuthPageShell
      title="Wachtwoord vergeten"
      subtitle="Vul je e-mailadres in en we sturen je een link om een nieuw wachtwoord in te stellen."
    >
      <ForgotPasswordForm />
    </AuthPageShell>
  );
};
