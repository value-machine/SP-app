import { describe, it, expect, vi, beforeEach } from "vitest";
import * as authService from "./authService";

const mockSupabase = {
  auth: {
    signInWithPassword: vi.fn(),
    signUp: vi.fn(),
    signOut: vi.fn(),
    getUser: vi.fn(),
    resetPasswordForEmail: vi.fn(),
    updateUser: vi.fn(),
  },
};

vi.mock("@shared/services/supabaseService", () => ({
  getSupabase: vi.fn(() => mockSupabase),
  isSupabaseConfigured: vi.fn(() => true),
}));

describe("authService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    Object.defineProperty(window, "location", {
      writable: true,
      value: { origin: "http://localhost:5173", href: "http://localhost:5173/" },
    });
    // Vitest defaults import.meta.env.BASE_URL to "/", so buildAppUrl() -> origin + "/"
  });

  describe("login", () => {
    it("returns the user on valid credentials", async () => {
      const mockUser = { id: "123", email: "test@example.com", created_at: "2024-01-01" };
      vi.mocked(mockSupabase.auth.signInWithPassword).mockResolvedValue({
        data: { user: mockUser, session: null },
        error: null,
      } as unknown as Awaited<ReturnType<typeof mockSupabase.auth.signInWithPassword>>);

      const result = await authService.login({
        email: "test@example.com",
        password: "password123",
      });

      expect(result.error).toBeNull();
      expect(result.user).toEqual({
        id: "123",
        email: "test@example.com",
        created_at: "2024-01-01",
      });
    });

    it("surfaces Supabase error on invalid credentials", async () => {
      const mockError = { message: "Invalid login credentials" };
      vi.mocked(mockSupabase.auth.signInWithPassword).mockResolvedValue({
        data: { user: null, session: null },
        error: mockError,
      } as unknown as Awaited<ReturnType<typeof mockSupabase.auth.signInWithPassword>>);

      const result = await authService.login({
        email: "test@example.com",
        password: "wrongpassword",
      });

      expect(result.user).toBeNull();
      expect(result.error).toEqual(mockError);
    });
  });

  describe("signUp", () => {
    it("returns the user on a fresh email", async () => {
      const mockUser = {
        id: "123",
        email: "new@example.com",
        created_at: "2024-01-01",
        identities: [{ id: "abc", provider: "email" }],
      };
      vi.mocked(mockSupabase.auth.signUp).mockResolvedValue({
        data: { user: mockUser, session: null },
        error: null,
      } as unknown as Awaited<ReturnType<typeof mockSupabase.auth.signUp>>);

      const result = await authService.signUp({
        email: "new@example.com",
        password: "password123",
      });

      expect(result.error).toBeNull();
      expect(result.user?.email).toBe("new@example.com");
      expect(mockSupabase.auth.signUp).toHaveBeenCalledWith({
        email: "new@example.com",
        password: "password123",
        options: { emailRedirectTo: "http://localhost:5173/" },
      });
    });

    it("detects a duplicate email (empty identities) and returns a friendly error", async () => {
      const duplicateUser = {
        id: "123",
        email: "existing@example.com",
        created_at: "2024-01-01",
        identities: [],
      };
      vi.mocked(mockSupabase.auth.signUp).mockResolvedValue({
        data: { user: duplicateUser, session: null },
        error: null,
      } as unknown as Awaited<ReturnType<typeof mockSupabase.auth.signUp>>);

      const result = await authService.signUp({
        email: "existing@example.com",
        password: "password123",
      });

      expect(result.user).toBeNull();
      expect(result.error?.message).toMatch(/al geregistreerd/i);
    });
  });

  describe("resetPasswordForEmail", () => {
    it("forwards to Supabase with redirectTo pointing at /update-password", async () => {
      vi.mocked(mockSupabase.auth.resetPasswordForEmail).mockResolvedValue({
        data: {},
        error: null,
      } as unknown as Awaited<ReturnType<typeof mockSupabase.auth.resetPasswordForEmail>>);

      const result = await authService.resetPasswordForEmail("user@example.com");

      expect(result.error).toBeNull();
      expect(mockSupabase.auth.resetPasswordForEmail).toHaveBeenCalledWith("user@example.com", {
        redirectTo: "http://localhost:5173/update-password",
      });
    });
  });

  describe("updatePassword", () => {
    it("updates the user password", async () => {
      vi.mocked(mockSupabase.auth.updateUser).mockResolvedValue({
        data: { user: null },
        error: null,
      } as unknown as Awaited<ReturnType<typeof mockSupabase.auth.updateUser>>);

      const result = await authService.updatePassword("new-password");

      expect(result.error).toBeNull();
      expect(mockSupabase.auth.updateUser).toHaveBeenCalledWith({ password: "new-password" });
    });

    it("returns Supabase error when update fails", async () => {
      const mockError = { message: "weak_password" };
      vi.mocked(mockSupabase.auth.updateUser).mockResolvedValue({
        data: { user: null },
        error: mockError,
      } as unknown as Awaited<ReturnType<typeof mockSupabase.auth.updateUser>>);

      const result = await authService.updatePassword("abc");

      expect(result.error).toEqual(mockError);
    });
  });

  describe("logout", () => {
    it("clears the session", async () => {
      vi.mocked(mockSupabase.auth.signOut).mockResolvedValue({
        error: null,
      } as unknown as Awaited<ReturnType<typeof mockSupabase.auth.signOut>>);

      const result = await authService.logout();
      expect(result.error).toBeNull();
    });
  });
});
