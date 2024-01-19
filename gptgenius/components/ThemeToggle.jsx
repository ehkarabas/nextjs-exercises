"use client";
import { BsMoonFill, BsSunFill } from "react-icons/bs";
import { useTheme } from "@/contexts/themeClerkContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme(); // Context'ten theme ve toggleTheme'ı alıyoruz

  return (
    <button onClick={toggleTheme} className="btn btn-sm btn-outline">
      {theme === "winter" ? (
        <BsMoonFill className="h-4 w-4 " />
      ) : (
        <BsSunFill className="h-4 w-4" />
      )}
    </button>
  );
};
export default ThemeToggle;
