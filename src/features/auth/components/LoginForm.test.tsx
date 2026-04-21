import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { LoginForm } from "./LoginForm";
import { useAuthContext } from "@/shared/context/AuthContext";

vi.mock("@/shared/context/AuthContext");
vi.mock("../hooks/useAuthRedirect", () => ({
  useAuthRedirect: () => vi.fn(),
}));

const mockLogin = vi.fn();

const baseContext = {
  user: null,
  loading: false,
  error: null as string | null,
  login: mockLogin,
  signUp: vi.fn(),
  logout: vi.fn(),
  resetPassword: vi.fn(),
  updatePassword: vi.fn(),
};

const renderForm = () =>
  render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>
  );

describe("LoginForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAuthContext).mockReturnValue(baseContext);
  });

  it("calls login with trimmed email and password on submit", async () => {
    const user = userEvent.setup();
    renderForm();

    await user.type(screen.getByLabelText(/e-mail/i), "  test@example.com  ");
    await user.type(screen.getByLabelText(/wachtwoord/i), "password123");
    await user.click(screen.getByRole("button", { name: /inloggen/i }));

    expect(mockLogin).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
    });
  });

  it("renders links to forgot-password and signup", () => {
    renderForm();
    expect(screen.getByRole("link", { name: /wachtwoord vergeten/i })).toHaveAttribute(
      "href",
      "/forgot-password"
    );
    expect(screen.getByRole("link", { name: /registreren/i })).toHaveAttribute("href", "/signup");
  });

  it("translates 'Invalid login credentials' to a Dutch friendly message", () => {
    vi.mocked(useAuthContext).mockReturnValue({
      ...baseContext,
      error: "Invalid login credentials",
    });
    renderForm();
    expect(screen.getByText(/onjuist/i)).toBeInTheDocument();
  });

  it("disables the button while loading", () => {
    vi.mocked(useAuthContext).mockReturnValue({ ...baseContext, loading: true });
    renderForm();
    expect(screen.getByRole("button", { name: /bezig met inloggen/i })).toBeDisabled();
  });
});
