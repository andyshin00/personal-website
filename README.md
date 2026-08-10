# Portfolio (Vite + React + Tailwind + Three.js + MDX)

## Setup

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

## Where things live

- `src/pages/HomePage.jsx` — the landing page: hero 3D scene, a short intro,
  and social/resume links.
- `src/pages/ProjectsPage.jsx` — `/projects`, the projects list. Project data
  is a plain array at the top of the file; edit it directly there.
- `src/pages/BlogPage.jsx` — `/blog`, the list of posts (see "Adding a blog
  post" below for how posts get here).
- `src/pages/BlogPostPage.jsx` — `/blog/:slug`, renders whichever post
  matches the URL. You never add routes here yourself; new posts are found
  automatically.
- `src/components/works/ProjectCard.jsx` — image on one side, description /
  tech tags / links on the other. Reused by `ProjectsPage`.
- `src/components/blog/BlogPostLayout.jsx` — the shared wrapper every post
  page uses: back link, `<h1>`, date, and the `prose` typography wrapper.
- `src/components/blog/mdxComponents.jsx` — custom elements usable inside any
  post's `.mdx` file (see below).
- `src/components/blog/posts.js` — auto-discovers every post in
  `src/content/posts/`. You shouldn't need to edit this file to add a post.
- `src/context/ThemeContext.jsx` — light/dark theme context. Toggled from the
  header, read by every component (including the 3D scene, so the floor
  color always matches the page background).
- `src/index.css` + `tailwind.config.js` — all colors are defined once as
  CSS variables (`--color-bg`, `--color-text`, `--color-accent`, etc.) and
  exposed to Tailwind as semantic classes: `bg-bg`, `text-text`, `text-muted`,
  `text-accent`, `bg-surface`. Change the palette in one place
  (`src/index.css`) and it updates everywhere.
- `src/components/three/SceneCanvas.jsx` — the Three.js scene (see below).
- `vite.config.js` — registers the MDX plugin (`@mdx-js/rollup`), which is
  what makes `.mdx` files importable as components in the first place.

## Adding a blog post

Add a new file to `src/content/posts/`, e.g. `my-new-post.mdx`:

```mdx
export const meta = {
  title: "My New Post",
  date: "Aug 1 2026",
  description: "A one-sentence summary shown on the /blog list page.",
  tags: ["web"],
};

Whatever you want to say. **Bold**, _italics_, `code`, lists, links — all
normal markdown.

<Note>You can drop in a highlighted callout like this too.</Note>

## A heading

More text.
```

That's it — no route to add, no separate list file to update.
`src/components/blog/posts.js` finds every `.mdx` file in that folder
automatically, and the `meta` block
becomes the title/date/tag shown on the `/blog` list page. Posts are sorted
newest-first by `date`.

### Adding a new highlighted-box type (like `<Note>`)

1. Make a component, e.g. `src/components/blog/Warning.jsx` — copy
   `Note.jsx` as a starting point.
2. Add it to the list in `src/components/blog/mdxComponents.jsx`.
3. Use it in any post: `<Warning>careful here</Warning>` — no import needed
   inside the `.mdx` file itself.

### Adding images/gifs to a post

Drop the (compressed!) file in `public/posts/`, then use a normal markdown
image tag inside the `.mdx` file:

```md
![Alt text](/posts/screenshot.png)
```

## Adding a project to Projects

Edit the `projects` array at the top of `src/pages/ProjectsPage.jsx`. Drop
the project image in `public/images/projects/`.

## Adding your 3D model

1. In Blender, export your scene as **glTF Binary (.glb)**.
2. Save it as `public/models/scene.glb`.
3. Restart `npm run dev` if it was already running, then reload the page.

If the file is missing or fails to load, the scene area will show a small
message instead of crashing the page.

## What the 3D scene does

- **Lighting**: an ambient + hemisphere fill light, plus one directional
  light that casts real shadows (`castShadow`/`receiveShadow`).
- **Floor**: uses `ShadowMaterial`, which is invisible except where a shadow
  falls, so it shows the page background through it rather than a lit
  surface.
- **Hover-driven**: the model is idle (not animated, eyes squinted) until
  you hover the canvas. While hovered: the typing animation plays, the eyes
  open up, and the camera auto-orbits (`autoRotate` toggled on the
  `OrbitControls` ref, not left on all the time).
- **Manual controls**: left-click + drag to rotate the camera, scroll/pinch
  to zoom. Panning is disabled (`enablePan={false}`) to keep the model
  centered.

## Next steps (not included yet, on purpose)

- Real GitHub/resume links in `src/components/layout/Header.jsx` and
  `src/pages/HomePage.jsx`, and real project data in
  `src/pages/ProjectsPage.jsx` — all currently have placeholder content
  marked `TODO`
