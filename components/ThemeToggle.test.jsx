import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ThemeToggle from "./ThemeToggle";

// Declare setTheme at the top so both tests can use it
const setTheme = vi.fn();

// Properly mock useTheme
vi.mock("next-themes", () => ({
  useTheme: () => ({
    theme: "light",
    setTheme,
  }),
}));

describe("ThemeToggle", () => {
  beforeEach(() => {
    setTheme.mockClear();
  });

  it("renders the toggle button", () => {
    render(<ThemeToggle />);
    const button = screen.getByTestId("theme-toggle");
    expect(button).toBeInTheDocument();
  });

  it("toggles the theme on click", () => {
    render(<ThemeToggle />);
    const button = screen.getByTestId("theme-toggle");
    fireEvent.click(button);
    expect(setTheme).toHaveBeenCalledWith("dark");
  });
});
