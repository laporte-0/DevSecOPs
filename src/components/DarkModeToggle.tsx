import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") setDarkMode(true);
  }, []);

  return (
    <button
      onClick={() => setDarkMode((prev) => !prev)}
      className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition"
      title="Toggle Dark/Light"
    >
      {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
}
