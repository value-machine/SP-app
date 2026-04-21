import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { SignupForm } from "./SignupForm";
import { useAuthContext } from "@/shared/context/AuthContext";

vi.mock("@/shared/context/AuthContext");
vi.mock("../hooks/useAuthRedirect", () => ({
  useAuthRedirect: () => vi.fn(),
}));

const mockSignUp = vi.fn();

const baseContext = {
  user: null,
  loading: false,
  error: null as string | null,
  login: vi.fn(),
  signUp: mockSignUp,
  logout: vi.fn(),
  resetPassword: vi.fn(),
  updatePassword: vi.fn(),
};

const renderForm = () =>
  render(
    <MemoryRouter>
      <SignupForm />
    </MemoryRouter>
  );

describe("SignupForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAuthContext).mockReturnValue(baseContext);
  });

  const emailRegex = /^E-mail\s*\*?\s*$/i;
  const passwordRegex = /^Wachtwoord\s*\*?\s*$/i;
  const confirmRegex = /^Wachtwoord bevestigen\s*\*?\s*$/i;

  it("submits when passwords match and pass length requirement", async () => {
    const user = userEvent.setup();
    renderForm();

    await user.type(screen.getByLabelText(emailRegex), "new@example.com");
    await user.type(screen.getByLabelText(passwordRegex), "password123");
    await user.type(screen.getByLabelText(confirmRegex), "password123");
    await user.click(screen.getByRole("button", { name: /account aanmaken/i }));

    expect(mockSignUp).toHaveBeenCalledWith({
      email: "new@example.com",
      password: "password123",
    });
  });

  it("blocks submit when passwords do not match", async () => {
    const user = userEvent.setup();
    renderForm();

    await user.type(screen.getByLabelText(emailRegex), "new@example.com");
    await user.type(screen.getByLabelText(passwordRegex), "password123");
    await user.type(screen.getByLabelText(confirmRegex), "different");
    await user.click(screen.getByRole("button", { name: /account aanmaken/i }));

    expect(mockSignUp).not.toHaveBeenCalled();
    expect(screen.getByText(/komen niet overeen/i)).toBeInTheDocument();
  });

  it("blocks submit when password is too short", async () => {
    const user = userEvent.setup();
    renderForm();

    await user.type(screen.getByLabelText(emailRegex), "new@example.com");
    await user.type(screen.getByLabelText(passwordRegex), "short");
    await user.type(screen.getByLabelText(confirmRegex), "short");
    await user.click(screen.getByRole("button", { name: /account aanmaken/i }));

    expect(mockSignUp).not.toHaveBeenCalled();
    expect(screen.getByRole("alert")).toHaveTextContent(/minstens 8 tekens/i);
  });

  it("surfaces a duplicate-email error from the auth context", () => {
    vi.mocked(useAuthContext).mockReturnValue({
      ...baseContext,
      error: "Dit e-mailadres is al geregistreerd. Log in of reset je wachtwoord.",
    });
    renderForm();
    expect(screen.getByText(/al geregistreerd/i)).toBeInTheDocument();
  });
});
