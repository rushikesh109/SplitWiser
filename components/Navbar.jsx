"use client";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <nav className="w-full px-4 py-3 bg-white dark:bg-black text-black dark:text-white flex justify-between items-center">
      <h1 className="text-lg font-bold">🌗 SplitWiser</h1>
      <ThemeToggle />
    </nav>
  );
}
