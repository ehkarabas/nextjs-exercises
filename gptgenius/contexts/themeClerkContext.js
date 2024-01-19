"use client";
import { createContext, useContext } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useSelector } from "react-redux";
import useThemeCall from "@/hooks/useThemeCall";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeClerkProvider = ({ children }) => {
  const { theme } = useSelector((state) => state.theme);
  const { themeChange } = useThemeCall();

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "winter" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    themeChange(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ClerkProvider
        appearance={theme === "dark" ? { baseTheme: dark } : undefined}
      >
        {children}
      </ClerkProvider>
    </ThemeContext.Provider>
  );
};
