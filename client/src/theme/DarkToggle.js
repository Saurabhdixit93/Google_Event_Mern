import { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import HoverToolTip from "../Components/hoverTip/HoverToolTip";

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

  return (
    <HoverToolTip textMessage={darkMode ? "Light Mode" : "Dark Mode"}>
      <button
        onClick={toggleDarkMode}
        className="text-gray-900 dark:text-white p-2 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center"
      >
        {darkMode ? (
          <FaSun className="text-yellow-500" size={20} />
        ) : (
          <FaMoon className="text-blue-500" size={20} />
        )}
      </button>
    </HoverToolTip>
  );
}
