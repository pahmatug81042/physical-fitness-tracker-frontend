import React, { createContext, useEffect, useState } from "react";

// Create ThemeContext
export const ThemeContext = createContext();

// ThemeProvider wraps the app and provides theme state
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light"); // Current theme state

  // Load saved theme from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) {
      setTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
    }
  }, []);

  // Toggle theme and persist to localStorage
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  // Return JSX with proper parentheses and no unused variables
  return (
    <ThemeContext.Provider values={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};