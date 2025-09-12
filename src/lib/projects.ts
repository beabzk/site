// For now, we'll use static data instead of file system operations
// This avoids the client/server component issues

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
  difficulty?: "Beginner" | "Intermediate" | "Advanced";
  category?: string;
  size?: string;
}

export interface Project {
  slug: string;
  metadata: ProjectMetadata;
  content: string;
}

// For now, use static data to avoid file system issues
export function getProjectSlugs(): string[] {
  return Object.keys(staticProjects);
}

export function getProjectBySlug(slug: string): Project | null {
  return getStaticProject(slug);
}

export function getAllProjects(): Project[] {
  const projects = Object.keys(staticProjects)
    .map((slug) => getStaticProject(slug))
    .filter((project): project is Project => project !== null)
    .sort((a, b) => {
      // Sort by date (newest first)
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

// Static project data for development (fallback when no MDX files exist)
export const staticProjects: Record<string, ProjectMetadata> = {
  // FEATURED PROJECTS (Homepage showcase)
  zaphnath: {
    title: "Zaphnath Bible Reader",
    description:
      "A modern, cross-platform Bible reading application built with Electron, React, and TypeScript.",
    longDescription:
      "Zaphnath provides a beautiful, feature-rich interface for studying the Bible with support for multiple translations, advanced search, bookmarks, reading plans, and repository management. Features offline-first design, cross-platform support (Windows, macOS, Linux), and comprehensive error handling with SQLite database storage.",
    tags: [
      "Electron",
      "React",
      "TypeScript",
      "Bible Study",
      "Cross-platform",
      "SQLite",
      "Tailwind CSS",
      "Desktop App",
    ],
    github: "https://github.com/beabzk/zaphnath",
    date: "2025-09-08",
    featured: true,
    status: "Active",
    difficulty: "Advanced",
    category: "Desktop Application",
    size: "45M",
  },
  ethioqen: {
    title: "ethioqen",
    description:
      "A Python library for accurate and efficient conversions between Ethiopian and Gregorian calendars.",
    longDescription:
      "ethioqen provides comprehensive conversion capabilities between the Ethiopian calendar, Gregorian calendar, Ethiopian local time, standard 24-hour time, and Unix timestamps. Features timezone support, leap year handling, and extensive documentation with examples. Available on PyPI with comprehensive test coverage.",
    tags: [
      "Python",
      "Calendar",
      "Date Conversion",
      "Ethiopian Calendar",
      "Time Zones",
      "PyPI",
      "Library",
    ],
    github: "https://github.com/beabzk/ethioqen",
    npm: "https://pypi.org/project/ethioqen/",
    docs: "https://beabzk.github.io/ethioqen/",
    date: "2025-01-03",
    featured: true,
    status: "Active",
    difficulty: "Intermediate",
    category: "Python Library",
    size: "125K",
  },
  yamds: {
    title: "YAMDS",
    description:
      "Yet Another Movie Database Searcher - A feature-rich React movie search application.",
    longDescription:
      "A comprehensive movie search application built with React, Vite, and Zustand. Features movie search with pagination, trending movies, developer's picks, detailed movie information with cast/crew, favorites system, dark mode, and responsive design. Integrates with The Movie Database (TMDb) API for real-time data.",
    tags: [
      "React",
      "JavaScript",
      "Vite",
      "Zustand",
      "TMDb API",
      "Tailwind CSS",
      "Responsive Design",
      "Movie Database",
    ],
    github: "https://github.com/beabzk/yamds",
    demo: "https://yamds.vercel.app",
    date: "2024-10-08",
    featured: true,
    status: "Active",
    difficulty: "Intermediate",
    category: "Web Application",
    size: "2.1M",
  },

  // REGULAR PROJECTS (General listing)
  "pft-api": {
    title: "Personal Finance Tracker API",
    description:
      "A robust and secure RESTful backend service for personal finance tracking applications.",
    longDescription:
      "Built with Django and Django Rest Framework, this API provides JWT user authentication, category management (CRUD), transaction management (CRUD), and simple reporting with monthly summaries. Features comprehensive security measures, scalable architecture, and extensive API documentation.",
    tags: [
      "Python",
      "Django",
      "REST API",
      "JWT",
      "Finance",
      "Backend",
      "Authentication",
    ],
    github: "https://github.com/beabzk/pft-api",
    date: "2025-09-03",
    featured: false,
    status: "Active",
    difficulty: "Advanced",
    category: "Backend API",
    size: "2.5M",
  },
  "symmetrical-fortnight": {
    title: "Library Management System",
    description:
      "A comprehensive library management system with NestJS backend and TypeScript frontend.",
    longDescription:
      "Features user authentication, book management (add, update, remove, toggle availability, search), user management (list, view, update, delete, activate/deactivate), and a complete borrowing system with history tracking and overdue book management. Built with modern full-stack technologies.",
    tags: [
      "NestJS",
      "TypeScript",
      "Library Management",
      "Authentication",
      "Full-stack",
      "Database",
    ],
    github: "https://github.com/beabzk/symmetrical-fortnight",
    date: "2025-01-12",
    featured: false,
    status: "Active",
    difficulty: "Advanced",
    category: "Full-stack Application",
    size: "8.2M",
  },
  "cbe-expense": {
    title: "CBE Expense Tracker",
    description:
      "A React + Vite expense tracking application with modern UI and enhanced user experience.",
    longDescription:
      "Features UI overhauls, dark mode support, improved UX, file input capabilities, and transaction extraction. Built with modern React patterns and optimized for performance with responsive design and intuitive user interface.",
    tags: [
      "React",
      "Vite",
      "JavaScript",
      "Expense Tracking",
      "Dark Mode",
      "UI/UX",
    ],
    github: "https://github.com/beabzk/cbe-expense",
    date: "2025-02-26",
    featured: false,
    status: "Maintenance",
    difficulty: "Intermediate",
    category: "Web Application",
    size: "1.8M",
  },
};

// Fallback function when MDX files don't exist
export function getStaticProject(slug: string): Project | null {
  const metadata = staticProjects[slug];
  if (!metadata) return null;

  const content = `${metadata.title}

${metadata.longDescription}

## Features

This project includes comprehensive features and documentation. Built with modern technologies and best practices.

## Installation

Follow the installation instructions in the repository README.

## Usage

Check the documentation for detailed usage examples and API reference.

## Contributing

Contributions are welcome! Please see the contributing guidelines in the repository.`;

  return {
    slug,
    metadata,
    content,
  };
}
