import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { useAuthRedirect } from "./useAuthRedirect";
import { useAuthContext } from "@/shared/context/AuthContext";
import * as redirectUtils from "@/utils/redirectUtils";

vi.mock("@/shared/context/AuthContext");
vi.mock("@/utils/redirectUtils");

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("useAuthRedirect", () => {
  const defaultAuthContext = {
    user: null,
    loading: false,
    error: null,
    login: vi.fn(),
    signUp: vi.fn(),
    logout: vi.fn(),
    resetPassword: vi.fn(),
    updatePassword: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    try {
      sessionStorage.removeItem("auth_redirect_path");
    } catch {
      // Ignore errors
    }
    mockNavigate.mockClear();
    vi.mocked(useAuthContext).mockReturnValue(defaultAuthContext);
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <BrowserRouter>{children}</BrowserRouter>
  );

  it("redirects to stored path on successful login", async () => {
    const mockGetAndClearRedirectPath = vi.spyOn(redirectUtils, "getAndClearRedirectPath");
    mockGetAndClearRedirectPath.mockReturnValue("/dashboard");

    const { rerender } = renderHook(() => useAuthRedirect(), { wrapper });

    vi.mocked(useAuthContext).mockReturnValue({
      ...defaultAuthContext,
      user: { id: "123", email: "test@example.com", created_at: "2024-01-01" },
    });

    rerender();

    await waitFor(() => {
      expect(mockGetAndClearRedirectPath).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith("/dashboard", { replace: true });
    });
  });

  it("redirects to home when no stored path exists", async () => {
    const mockGetAndClearRedirectPath = vi.spyOn(redirectUtils, "getAndClearRedirectPath");
    mockGetAndClearRedirectPath.mockReturnValue(null);

    const { rerender } = renderHook(() => useAuthRedirect(), { wrapper });

    vi.mocked(useAuthContext).mockReturnValue({
      ...defaultAuthContext,
      user: { id: "123", email: "test@example.com", created_at: "2024-01-01" },
    });

    rerender();

    await waitFor(() => {
      expect(mockGetAndClearRedirectPath).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith("/", { replace: true });
    });
  });

  it("does not redirect while loading", () => {
    const mockGetAndClearRedirectPath = vi.spyOn(redirectUtils, "getAndClearRedirectPath");

    vi.mocked(useAuthContext).mockReturnValue({
      ...defaultAuthContext,
      user: { id: "123", email: "test@example.com", created_at: "2024-01-01" },
      loading: true,
    });

    renderHook(() => useAuthRedirect(), { wrapper });

    expect(mockGetAndClearRedirectPath).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("does not redirect when an error is present", () => {
    const mockGetAndClearRedirectPath = vi.spyOn(redirectUtils, "getAndClearRedirectPath");

    vi.mocked(useAuthContext).mockReturnValue({
      ...defaultAuthContext,
      user: { id: "123", email: "test@example.com", created_at: "2024-01-01" },
      error: "Login failed",
    });

    renderHook(() => useAuthRedirect(), { wrapper });

    expect(mockGetAndClearRedirectPath).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("does not redirect more than once for the same sign-in", async () => {
    const mockGetAndClearRedirectPath = vi.spyOn(redirectUtils, "getAndClearRedirectPath");
    mockGetAndClearRedirectPath.mockReturnValue("/dashboard");

    vi.mocked(useAuthContext).mockReturnValue({
      ...defaultAuthContext,
      user: { id: "123", email: "test@example.com", created_at: "2024-01-01" },
    });

    const { rerender } = renderHook(() => useAuthRedirect(), { wrapper });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledTimes(1);
    });

    rerender();
    rerender();

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledTimes(1);
    });
  });

  it("resets the redirect flag when the user logs out", async () => {
    const mockGetAndClearRedirectPath = vi.spyOn(redirectUtils, "getAndClearRedirectPath");
    mockGetAndClearRedirectPath.mockReturnValue("/dashboard");

    const { rerender } = renderHook(() => useAuthRedirect(), { wrapper });

    vi.mocked(useAuthContext).mockReturnValue({
      ...defaultAuthContext,
      user: { id: "123", email: "test@example.com", created_at: "2024-01-01" },
    });

    rerender();

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledTimes(1);
    });

    mockNavigate.mockClear();
    mockGetAndClearRedirectPath.mockClear();
    mockGetAndClearRedirectPath.mockReturnValue("/dashboard");

    vi.mocked(useAuthContext).mockReturnValue({
      ...defaultAuthContext,
      user: null,
    });
    rerender();

    vi.mocked(useAuthContext).mockReturnValue({
      ...defaultAuthContext,
      user: { id: "123", email: "test@example.com", created_at: "2024-01-01" },
    });
    rerender();

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledTimes(1);
    });
  });

  it("returns a reset function", () => {
    vi.mocked(useAuthContext).mockReturnValue(defaultAuthContext);
    const { result } = renderHook(() => useAuthRedirect(), { wrapper });

    expect(typeof result.current).toBe("function");
    expect(() => result.current()).not.toThrow();
  });
});
