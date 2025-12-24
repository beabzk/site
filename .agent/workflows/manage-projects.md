---
description: how to manage project data on the website
---

# Managing Projects

Projects are managed via static data in `src/lib/projects.ts`.

## Adding a New Project

1. **Open `src/lib/projects.ts`**.
2. **Find the `projects` array**.
3. **Add a new project object**:
   ```typescript
   {
     slug: "your-project-slug",
     metadata: {
       title: "Project Title",
       description: "Short description of the project",
       date: "2024-01-20",
       tags: ["Next.js", "TypeScript"],
       featured: true,
       github: "https://github.com/...",
       demo: "https://...",
     }
   }
   ```

## Best Practices

- **Tags**: Use consistent tags for better filtering in the Projects repository.
- **Featured**: Only set `featured: true` for projects you want to appear on the Home page.
- **Images**: If adding screenshots, place them in `public/projects/` and reference them in the metadata if supported by your theme variant.
