import { describe, it, expect, beforeEach } from "vitest";
import { buildAppUrl } from "./appUrl";

describe("buildAppUrl", () => {
  beforeEach(() => {
    Object.defineProperty(window, "location", {
      writable: true,
      value: { origin: "https://example.com" },
    });
  });

  it("returns origin + base when called with no arguments", () => {
    expect(buildAppUrl()).toMatch(/^https:\/\/example\.com\//);
  });

  it("appends a relative path after the base", () => {
    expect(buildAppUrl("update-password")).toMatch(/^https:\/\/example\.com\/.*update-password$/);
  });

  it("tolerates a leading slash in the path", () => {
    expect(buildAppUrl("/update-password")).toBe(buildAppUrl("update-password"));
  });
});
