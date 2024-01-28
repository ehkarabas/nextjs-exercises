"use client";
import React, { createContext, useContext, useMemo, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const defaultContextValue = {
  theme: "dark", 
  setTheme: (theme: string) => {}, 
};

const ThemeContext = createContext(defaultContextValue);

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeContextClerkProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }): React.ReactElement => {
  const [theme, setTheme] = useState("dark");

  const contextValue = useMemo(() => {
    return { theme, setTheme };
  }, [theme]);

  const clerkAppearance = ["dark", "system"].includes(theme)
    ? { baseTheme: dark }
    : undefined;

  return (
    <ThemeContext.Provider value={contextValue}>
      <ClerkProvider
        publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
        appearance={clerkAppearance}
      >
        {children}
      </ClerkProvider>
    </ThemeContext.Provider>
  );
};

const ThemeClerkProvider: React.FC<ThemeProviderProps> = ({
  children,
  ...props
}): React.ReactElement => {
  return (
    <NextThemesProvider {...props}>
      <ThemeContextClerkProvider>{children}</ThemeContextClerkProvider>
    </NextThemesProvider>
  );
};

export default ThemeClerkProvider;
