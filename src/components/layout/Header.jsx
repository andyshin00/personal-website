import { NavLink } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const navLinkClass = ({ isActive }) =>
  `hover:text-text transition ${isActive ? "text-text" : "text-muted"}`;

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header>
      <div className="flex items-center justify-between px-6 py-6 md:px-16 max-w-4xl mx-auto">
        <nav className="flex items-center gap-4 md:gap-8 text-lg">
          <NavLink to="/" end className={navLinkClass}>
            home
          </NavLink>
          <NavLink to="/projects" className={navLinkClass}>
            projects
          </NavLink>
          <NavLink to="/blog" className={navLinkClass}>
            blog
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            contact
          </NavLink>
        </nav>

        <button
          onClick={toggleTheme}
          aria-label="Toggle color theme"
          className="w-8 h-8 flex items-center justify-center rounded-full border border-border text-muted hover:text-text hover:border-text transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent shrink-0"
        >
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </header>
  );
}
