import { Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import ContactPage from "./pages/ContactPage";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>

      <footer className="text-center text-xs text-muted py-8">
        © 2026 Andrew Shin
      </footer>
    </div>
  );
}
