import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "@/shared/context/AuthContext";
import { storeRedirectPath } from "@utils/redirectUtils";

interface UseProfileMenuHandlersProps {
  onClose: () => void;
}

const isAuthRoute = (path: string): boolean =>
  path.startsWith("/login") ||
  path.startsWith("/signup") ||
  path.startsWith("/forgot-password") ||
  path.startsWith("/update-password") ||
  path.startsWith("/auth");

export const useProfileMenuHandlers = ({ onClose }: UseProfileMenuHandlersProps) => {
  const { logout } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  const rememberCurrentPath = useCallback(() => {
    // useLocation().pathname is router-relative (basename-stripped), which is what
    // `navigate(path)` expects when we redirect back after login.
    const currentPath = `${location.pathname}${location.search}`;
    if (!isAuthRoute(currentPath) && currentPath !== "/") {
      storeRedirectPath(currentPath);
    }
  }, [location.pathname, location.search]);

  const handleNavigateToLogin = useCallback(() => {
    rememberCurrentPath();
    onClose();
    void navigate("/login");
  }, [navigate, onClose, rememberCurrentPath]);

  const handleNavigateToSignup = useCallback(() => {
    rememberCurrentPath();
    onClose();
    void navigate("/signup");
  }, [navigate, onClose, rememberCurrentPath]);

  const handleSignOut = useCallback(async () => {
    onClose();
    await logout();
  }, [logout, onClose]);

  return {
    handleNavigateToLogin,
    handleNavigateToSignup,
    handleSignOut,
  };
};
