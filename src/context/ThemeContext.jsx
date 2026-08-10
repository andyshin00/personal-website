import { createContext, useContext, useEffect, useState } from "react";

// createContext makes a "channel" that components can broadcast a value on
// (with a Provider, below) and any component underneath it in the tree can
// tune into (with useContext, also below) — without passing props down
// through every component in between. The `null` here is just a fallback
// value for if something tries to read this outside of a Provider.
const ThemeContext = createContext(undefined);

// This component is the thing that actually broadcasts a value on the
// channel above. It gets wrapped around the whole app once, in main.jsx —
// {children} below is everything nested inside it, i.e. your entire <App />.
export function ThemeProvider({ children }) {
  // theme state. if user has theme in localStorage, use it.
  // if not, check browser preference
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem("theme");
    if (stored) return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  //use useEffect for side effect like localStorage, rerun on theme
  useEffect(() => {
    const root = document.documentElement; // the actual <html> tag

    // Light/Dark switch
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");

    // Set in local storage
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Flips the theme
  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");

  return ctx;
}
