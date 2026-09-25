// Single source of truth for every project. ProjectsPage.jsx shows all of
// these; HomePage.jsx only shows the ones marked `featured: true` — keep
// that list small (2 max) since it's meant to highlight your best work.
export const projects = [
  {
    slug: "3d-portfolio-website",
    title: "3D Website",
    description:
      "Built with Three.js, Blender, and React, this passion project blends 3D modeling, custom shaders, and interactive design. Worked on modeling, coding, shaders, design, and performance optimization.",
    image: "/projects/project2.jpg",
    tech: ["Three.js", "Blender", "React"],
    featured: true,
    live: "https://andrewshin.vercel.app/",
    source: "https://github.com/andyshin00/portfolio_26",
  },
  {
    slug: "linear-algebra-app",
    title: "Linear Algebra App",
    description:
      "A linear algebra tool built with a group for a senior design project, helping users with matrix calculations and 2D/3D graphing. Worked on the web functionality, interface design, and authentication.",
    image: "/projects/project1.png",
    tech: ["Go", "HTML", "CSS", "JS"],
    featured: true,
    source: "https://github.com/sfyatee/likeag6",
  },
  {
    slug: "timestampgen",
    title: "TimestampGen",
    description:
      "An AI tool that turns any YouTube video into clickable timestamps. Built with Next.js and the Claude API to read transcripts and generate chapter outlines.",
    image: "/projects/project3.png",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Drizzle", "Claude API"],
    featured: false,
    live: "https://timestamp-dusky.vercel.app/",
    source: "https://github.com/andyshin00/timestamp",
  },
];
