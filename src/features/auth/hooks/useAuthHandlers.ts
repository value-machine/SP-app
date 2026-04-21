import type { User, LoginCredentials, SignUpCredentials } from "../types/auth.types";
import {
  handleLogin as handleLoginUtil,
  handleSignUp as handleSignUpUtil,
  handleLogout as handleLogoutUtil,
  handleResetPassword as handleResetPasswordUtil,
  handleUpdatePassword as handleUpdatePasswordUtil,
} from "./authHandlerUtils";

interface UseAuthHandlersOptions {
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAuthHandlers = ({ setUser, setLoading, setError }: UseAuthHandlersOptions) => {
  const state = { setUser, setLoading, setError };

  return {
    login: (credentials: LoginCredentials) => handleLoginUtil(credentials, state),
    signUp: (credentials: SignUpCredentials) => handleSignUpUtil(credentials, state),
    logout: () => handleLogoutUtil(state),
    resetPassword: (email: string) => handleResetPasswordUtil(email, state),
    updatePassword: (newPassword: string) => handleUpdatePasswordUtil(newPassword, state),
  };
};
