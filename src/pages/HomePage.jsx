import { Link } from "react-router-dom";
import { ArrowRight, FileText, Mail } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import SceneCanvas from "../components/threejs/SceneCanvas";
import ProjectCard from "../components/projects/ProjectCard";
import { projects } from "../components/projects/projects";
import { GithubIcon, LinkedinIcon } from "../components/icons/icons";

export default function HomePage() {
  const { theme } = useTheme();

  return (
    <div className="max-w-4xl mx-auto px-6 md:px-16 pb-24">
      <div className="flex flex-col items-center gap-6 mb-20">
        <div className="w-full order-2 flex flex-col md:flex-row items-stretch gap-8 md:gap-20">
          <img
            src="/images/pic.png"
            alt="Andrew Shin"
            className="w-40 h-48 md:w-52 md:h-64 rounded-2xl object-cover border border-border shrink-0"
          />

          <div className="w-full md:flex-1 flex flex-col md:justify-between">
            <div>
              <h1 className="font-serif font-semibold text-3xl md:text-4xl text-text leading-tight mb-3">
                Hello, I'm Andrew!
              </h1>

              <p className="max-w-xs text-text font-semibold mb-4">
                A 26 year old graduate from California State University,
                Northridge with a bachelors in Computer Science.
              </p>
              <p className="max-w-xs text-text font-semibold mb-4">
                Currently, I am focusing in full stack web development.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="/public/resume/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium border border-border rounded-lg px-4 py-2 hover:border-text transition"
              >
                Resume
                <FileText size={15} />
              </a>

              <a
                href="https://github.com/andyshin00?tab=repositories"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-border text-muted hover:text-text hover:border-text transition"
              >
                <GithubIcon />
              </a>

              <a
                href="https://www.linkedin.com/in/andrew-shin-21920a2a8/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-border text-muted hover:text-text hover:border-text transition"
              >
                <LinkedinIcon />
              </a>
            </div>
          </div>
        </div>

        <div className="w-full h-[200px] md:h-[250px] order-1">
          <SceneCanvas
            modelUrl="/models/scene.glb"
            bgColor={theme === "dark" ? "#111111" : "#f2eadd"}
          />
        </div>
      </div>

      <section>
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="font-serif font-bold text-2xl md:text-3xl text-text">
            featured projects
          </h2>

          <Link
            to="/projects"
            className="inline-flex items-center gap-1 text-sm text-muted hover:text-accent transition"
          >
            view more
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {projects
            .filter((project) => project.featured)
            .map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
        </div>
      </section>
    </div>
  );
}
