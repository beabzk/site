import {
  getAllProjects,
  getAllTags,
  formatProjectDate,
} from "../../lib/projects";
import ProjectsClient from "./ProjectsClient";

export default function ProjectsPage() {
  // Get projects data on the server
  const allProjectsData = getAllProjects();
  const allTagsData = getAllTags();

  // Convert to the format expected by the client component
  const allProjects = allProjectsData.map((project) => ({
    title: project.metadata.title,
    description: project.metadata.description,
    tags: project.metadata.tags,
    size: project.metadata.size || "N/A",
    date: formatProjectDate(project.metadata.date),
    href: `/projects/${project.slug}`,
    featured: project.metadata.featured,
  }));

  const allTags = allTagsData;

  return <ProjectsClient allProjects={allProjects} allTags={allTags} />;
}
