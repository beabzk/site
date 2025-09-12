import MainLayout from "../components/layout/MainLayout";
import Terminal from "../components/ui/Terminal";
import CommandPrompt, { CommandOutput } from "../components/ui/CommandPrompt";
import TypingAnimation from "../components/ui/TypingAnimation";
import { ProjectCard } from "../components/ui/Card";
import { getFeaturedProjects, formatProjectDate } from "../lib/projects";

export default function Home() {
  // Get featured projects from content management system
  const featuredProjectsData = getFeaturedProjects();

  const featuredProjects = featuredProjectsData.map((project) => ({
    title: project.metadata.title,
    description: project.metadata.description,
    tags: project.metadata.tags.slice(0, 3), // Limit to 3 tags for display
    size: project.metadata.size || "N/A",
    date: formatProjectDate(project.metadata.date),
    href: `/projects/${project.slug}`,
  }));

  return (
    <MainLayout>
      <div className="space-y-12">
        {/* Terminal Introduction */}
        <Terminal title="beabzk@dev:~" className="max-w-2xl">
          <div className="space-y-2">
            <CommandPrompt showCursor={false}>
              <TypingAnimation text="whoami" speed={100} delay={500} />
            </CommandPrompt>
            <CommandOutput>
              Full-stack developer specializing in Python and TypeScript
            </CommandOutput>

            <CommandPrompt showCursor={false}>
              <TypingAnimation text="cat about.txt" speed={100} delay={2000} />
            </CommandPrompt>
            <CommandOutput>
              I build practical tools and full-stack solutions that solve real
              problems. Currently focused on developer tooling, automation, and
              web applications.
            </CommandOutput>
          </div>
        </Terminal>

        {/* Featured Projects */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <CommandPrompt showCursor={false}>
              <TypingAnimation
                text="ls -la projects/"
                speed={100}
                delay={4000}
              />
            </CommandPrompt>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.title}
                title={project.title}
                description={project.description}
                tags={project.tags}
                size={project.size}
                date={project.date}
                href={project.href}
              />
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <Terminal title="stats" showControls={false} className="max-w-lg">
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Languages:</span>
              <span className="text-green-400">
                Python, TypeScript, JavaScript
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Focus:</span>
              <span className="text-green-400">Full-stack Development</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Status:</span>
              <span className="text-green-400">Available for projects</span>
            </div>
          </div>
        </Terminal>
      </div>
    </MainLayout>
  );
}
