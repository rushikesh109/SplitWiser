// lib/utils.test.js
import { describe, it, expect } from "vitest";
import { cn } from "./utils";

describe("cn (clsx + tailwind-merge)", () => {
  it("merges class names correctly", () => {
    const result = cn("bg-red-500", "text-white", "p-4");
    expect(result).toBe("bg-red-500 text-white p-4");
  });

  it("removes conflicting Tailwind classes", () => {
    const result = cn("p-2", "p-4");
    expect(result).toBe("p-4"); // tailwind-merge removes p-2
  });

  it("handles conditional classes", () => {
    const result = cn("text-sm", false && "text-lg", undefined, "font-bold");
    expect(result).toBe("text-sm font-bold");
  });
});
