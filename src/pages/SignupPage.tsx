import { Navigate } from "react-router-dom";
import { useAuthContext } from "@/shared/context/AuthContext";
import { AuthPageShell } from "@features/auth/components/AuthPageShell";
import { SignupForm } from "@features/auth/components/SignupForm";

export const SignupPage = () => {
  const { user, loading } = useAuthContext();

  if (!loading && user) {
    return <Navigate to="/" replace />;
  }

  return (
    <AuthPageShell title="Registreren">
      <SignupForm />
    </AuthPageShell>
  );
};
