import ProjectCard from "../components/projects/ProjectCard";
import { projects } from "../components/projects/projects";

export default function ProjectsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 md:px-16 pb-24 pt-2">
      <h1 className="font-serif font-bold text-4xl md:text-5xl text-text mb-8">
        my projects
      </h1>

      <div className="grid sm:grid-cols-2 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      <p className="text-center text-sm text-muted italic py-8">
        More projects coming soon.
      </p>
    </div>
  );
}
