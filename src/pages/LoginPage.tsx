import { Navigate } from "react-router-dom";
import { useAuthContext } from "@/shared/context/AuthContext";
import { AuthPageShell } from "@features/auth/components/AuthPageShell";
import { LoginForm } from "@features/auth/components/LoginForm";

export const LoginPage = () => {
  const { user, loading } = useAuthContext();

  if (!loading && user) {
    return <Navigate to="/" replace />;
  }

  return (
    <AuthPageShell title="Inloggen">
      <LoginForm />
    </AuthPageShell>
  );
};
