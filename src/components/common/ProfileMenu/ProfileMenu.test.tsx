import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { ProfileMenu } from "../ProfileMenu";
import { useAuthContext } from "@/shared/context/AuthContext";
import { useUserProfile } from "@features/auth/hooks/useUserProfile";
import { isSupabaseConfigured } from "@shared/services/supabaseService";
import type { User } from "@features/auth/types/auth.types";

vi.mock("@/shared/context/AuthContext");
vi.mock("@features/auth/hooks/useUserProfile");
vi.mock("@shared/services/supabaseService");

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockLogout = vi.fn();

describe("ProfileMenu", () => {
  const defaultAuthContext = {
    user: null,
    loading: false,
    error: null,
    login: vi.fn(),
    signUp: vi.fn(),
    logout: mockLogout,
    resetPassword: vi.fn(),
    updatePassword: vi.fn(),
  };

  const defaultUserProfile = {
    profile: null,
    loading: false,
    error: null,
    refetch: vi.fn(),
  };

  const renderMenu = () =>
    render(
      <MemoryRouter>
        <ProfileMenu />
      </MemoryRouter>
    );

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAuthContext).mockReturnValue(defaultAuthContext);
    vi.mocked(useUserProfile).mockReturnValue(defaultUserProfile);
    vi.mocked(isSupabaseConfigured).mockReturnValue(true);
  });

  describe("rendering", () => {
    it("renders the trigger button when logged out", () => {
      renderMenu();
      expect(screen.getByRole("button")).toBeInTheDocument();
      expect(screen.getByLabelText(/inloggen/i)).toBeInTheDocument();
    });

    it("renders the trigger button when logged in", () => {
      const mockUser: User = { id: "123", email: "test@example.com" } as User;
      vi.mocked(useAuthContext).mockReturnValue({ ...defaultAuthContext, user: mockUser });
      renderMenu();
      expect(screen.getByRole("button")).toBeInTheDocument();
      expect(screen.getByLabelText(/account/i)).toBeInTheDocument();
    });

    it("shows Inloggen and Registreren when the menu is opened and user is logged out", async () => {
      const user = userEvent.setup();
      renderMenu();
      await user.click(screen.getByRole("button"));

      await waitFor(() => {
        expect(screen.getByText(/inloggen/i)).toBeInTheDocument();
        expect(screen.getByText(/registreren/i)).toBeInTheDocument();
      });
    });

    it("shows Uitloggen when the menu is opened and user is logged in", async () => {
      const mockUser: User = { id: "123", email: "test@example.com" } as User;
      vi.mocked(useAuthContext).mockReturnValue({ ...defaultAuthContext, user: mockUser });

      const user = userEvent.setup();
      renderMenu();
      await user.click(screen.getByRole("button"));

      await waitFor(() => {
        expect(screen.getByText(/uitloggen/i)).toBeInTheDocument();
      });
    });
  });

  describe("navigation", () => {
    it("navigates to /login when Inloggen is clicked", async () => {
      const user = userEvent.setup();
      renderMenu();

      await user.click(screen.getByRole("button"));
      await waitFor(() => expect(screen.getByText(/inloggen/i)).toBeInTheDocument());

      await user.click(screen.getByText(/inloggen/i));

      expect(mockNavigate).toHaveBeenCalledWith("/login");
    });

    it("navigates to /signup when Registreren is clicked", async () => {
      const user = userEvent.setup();
      renderMenu();

      await user.click(screen.getByRole("button"));
      await waitFor(() => expect(screen.getByText(/registreren/i)).toBeInTheDocument());

      await user.click(screen.getByText(/registreren/i));

      expect(mockNavigate).toHaveBeenCalledWith("/signup");
    });
  });

  describe("sign-out", () => {
    it("calls logout when Uitloggen is clicked", async () => {
      const mockUser: User = { id: "123", email: "test@example.com" } as User;
      vi.mocked(useAuthContext).mockReturnValue({ ...defaultAuthContext, user: mockUser });

      const user = userEvent.setup();
      renderMenu();

      await user.click(screen.getByRole("button"));
      await waitFor(() => expect(screen.getByText(/uitloggen/i)).toBeInTheDocument());

      await user.click(screen.getByText(/uitloggen/i));

      expect(mockLogout).toHaveBeenCalled();
    });
  });
});
