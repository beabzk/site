import fs from "fs";
import path from "path";
import matter from "gray-matter";

const projectsDirectory = path.join(process.cwd(), "content/projects");

export interface ProjectMetadata {
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  github?: string;
  demo?: string;
  docs?: string;
  npm?: string;
  date: string;
  featured?: boolean;
  status: "Active" | "Archived" | "In Development" | "Maintenance";
  category?: string;
  size?: string;
}

export interface Project {
  slug: string;
  metadata: ProjectMetadata;
  content: string;
}

export function getProjectSlugs(): string[] {
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }
  return fs
    .readdirSync(projectsDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getProjectBySlug(slug: string): Project | null {
  const fullPath = path.join(projectsDirectory, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    metadata: data as ProjectMetadata,
    content,
  };
}

export function getAllProjects(): Project[] {
  const slugs = getProjectSlugs();
  const projects = slugs
    .map((slug) => getProjectBySlug(slug))
    .filter((project): project is Project => project !== null)
    .sort((a, b) => {
      return (
        new Date(b.metadata.date).getTime() -
        new Date(a.metadata.date).getTime()
      );
    });

  return projects;
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((project) => project.metadata.featured);
}

export function getProjectsByTag(tag: string): Project[] {
  return getAllProjects().filter((project) =>
    project.metadata.tags.includes(tag)
  );
}

export function getProjectsByCategory(category: string): Project[] {
  return getAllProjects().filter(
    (project) => project.metadata.category === category
  );
}

export function getAllTags(): string[] {
  const allTags = getAllProjects().flatMap((project) => project.metadata.tags);
  return Array.from(new Set(allTags)).sort();
}

export function getAllCategories(): string[] {
  const allCategories = getAllProjects()
    .map((project) => project.metadata.category)
    .filter((category): category is string => category !== undefined);

  return Array.from(new Set(allCategories)).sort();
}

// Helper function to format project size
export function formatProjectSize(sizeInKB: number): string {
  if (sizeInKB < 1024) {
    return `${sizeInKB}K`;
  } else {
    return `${(sizeInKB / 1024).toFixed(1)}M`;
  }
}

// Helper function to format project date
export function formatProjectDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// Helper function to get project links
export function getProjectLinks(metadata: ProjectMetadata) {
  const links = [];

  if (metadata.github) {
    links.push({ type: "github" as const, url: metadata.github });
  }

  if (metadata.demo) {
    links.push({ type: "demo" as const, url: metadata.demo });
  }

  if (metadata.docs) {
    links.push({ type: "docs" as const, url: metadata.docs });
  }

  if (metadata.npm) {
    links.push({ type: "npm" as const, url: metadata.npm });
  }

  return links;
}

