import { AuthPageShell } from "@features/auth/components/AuthPageShell";
import { UpdatePasswordForm } from "@features/auth/components/UpdatePasswordForm";

export const UpdatePasswordPage = () => {
  return (
    <AuthPageShell title="Nieuw wachtwoord instellen">
      <UpdatePasswordForm />
    </AuthPageShell>
  );
};
