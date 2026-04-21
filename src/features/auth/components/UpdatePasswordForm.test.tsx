import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { UpdatePasswordForm } from "./UpdatePasswordForm";
import { useAuthContext } from "@/shared/context/AuthContext";
import { useUpdatePasswordSession } from "../hooks/useUpdatePasswordSession";

vi.mock("@/shared/context/AuthContext");
vi.mock("../hooks/useUpdatePasswordSession");

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockUpdatePassword = vi.fn();

const baseContext = {
  user: null,
  loading: false,
  error: null as string | null,
  login: vi.fn(),
  signUp: vi.fn(),
  logout: vi.fn(),
  resetPassword: vi.fn(),
  updatePassword: mockUpdatePassword,
};

const renderForm = () =>
  render(
    <MemoryRouter>
      <UpdatePasswordForm />
    </MemoryRouter>
  );

describe("UpdatePasswordForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAuthContext).mockReturnValue(baseContext);
  });

  it("shows a spinner while the recovery session is pending", () => {
    vi.mocked(useUpdatePasswordSession).mockReturnValue("pending");
    renderForm();
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("shows an expired-link message when no recovery session arrives", () => {
    vi.mocked(useUpdatePasswordSession).mockReturnValue("expired");
    renderForm();
    expect(screen.getByText(/ongeldig of verlopen/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /nieuwe reset-link/i })).toHaveAttribute(
      "href",
      "/forgot-password"
    );
  });

  it("updates the password and navigates home on success", async () => {
    vi.mocked(useUpdatePasswordSession).mockReturnValue("ready");
    mockUpdatePassword.mockResolvedValue({ ok: true });

    const user = userEvent.setup();
    renderForm();

    await user.type(screen.getByLabelText(/nieuw wachtwoord/i), "newpassword");
    await user.type(screen.getByLabelText(/wachtwoord bevestigen/i), "newpassword");
    await user.click(screen.getByRole("button", { name: /wachtwoord opslaan/i }));

    await waitFor(() => {
      expect(mockUpdatePassword).toHaveBeenCalledWith("newpassword");
      expect(mockNavigate).toHaveBeenCalledWith("/", { replace: true });
    });
  });

  it("blocks submit when passwords do not match", async () => {
    vi.mocked(useUpdatePasswordSession).mockReturnValue("ready");

    const user = userEvent.setup();
    renderForm();

    await user.type(screen.getByLabelText(/nieuw wachtwoord/i), "newpassword");
    await user.type(screen.getByLabelText(/wachtwoord bevestigen/i), "different123");
    await user.click(screen.getByRole("button", { name: /wachtwoord opslaan/i }));

    expect(mockUpdatePassword).not.toHaveBeenCalled();
    expect(screen.getByText(/komen niet overeen/i)).toBeInTheDocument();
  });

  it("blocks submit when password is too short", async () => {
    vi.mocked(useUpdatePasswordSession).mockReturnValue("ready");

    const user = userEvent.setup();
    renderForm();

    await user.type(screen.getByLabelText(/nieuw wachtwoord/i), "short");
    await user.type(screen.getByLabelText(/wachtwoord bevestigen/i), "short");
    await user.click(screen.getByRole("button", { name: /wachtwoord opslaan/i }));

    expect(mockUpdatePassword).not.toHaveBeenCalled();
    expect(screen.getByRole("alert")).toHaveTextContent(/minstens 8 tekens/i);
  });
});
