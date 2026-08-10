export default function ProjectCard({ project }) {
  return (
    <div className="flex flex-col  border-border rounded-xl bg-surface overflow-hidden">
      <div className="aspect-video bg-bg">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-semibold text-text mb-1.5">{project.title}</h3>

        <p className="text-sm text-muted leading-relaxed mb-4">
          {project.description}
        </p>

        {project.tech.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tech.map((t) => (
              <span
                key={t}
                className="font-mono text-xs text-muted bg-bg border border-border rounded px-2 py-0.5"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto flex flex-wrap gap-2 pt-1">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-muted border border-border rounded-full px-3 py-1.5 hover:text-text hover:border-text transition"
            >
              Live
            </a>
          )}

          {project.source && (
            <a
              href={project.source}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-muted border border-border rounded-full px-3 py-1.5 hover:text-text hover:border-text transition"
            >
              Source
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
