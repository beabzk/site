import MainLayout from "../components/layout/MainLayout";
import { ProjectCard } from "../components/ui/Card";
import { getFeaturedProjects } from "../lib/projects";

export default function Home() {
  // Get featured projects from content management system
  const featuredProjectsData = getFeaturedProjects();

  const featuredProjects = featuredProjectsData.map((project) => ({
    title: project.metadata.title,
    description: project.metadata.description,
    tags: project.metadata.tags.slice(0, 3), // Limit to 3 tags for display
    href: `/projects/${project.slug}`,
  }));

  return (
    <MainLayout>
      <div className="space-y-20 pb-10">
        {/* Intro / Hero Section */}
        <section className="space-y-6 pt-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Hey, I&apos;m <span style={{ color: "var(--accent-primary)" }}>beabzk</span>
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-gray-300">a random person</p>
          {/* <div className="flex flex-wrap gap-4 pt-2">
            <span className="inline-flex items-center rounded-full bg-gray-950 px-3 py-1 text-sm font-medium text-gray-400 border border-gray-800">
              Developer Tooling
            </span>
            <span className="inline-flex items-center rounded-full bg-gray-950 px-3 py-1 text-sm font-medium text-gray-400 border border-gray-800">
              Automation
            </span>
            <span className="inline-flex items-center rounded-full bg-gray-950 px-3 py-1 text-sm font-medium text-gray-400 border border-gray-800">
              Web Applications
            </span>
          </div> */}
        </section>

        {/* Featured Projects */}
        <section className="space-y-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold text-white">Featured Projects</h2>
            <p className="text-gray-400">A selection of my recent work and open-source contributions.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.title}
                title={project.title}
                description={project.description}
                tags={project.tags}
                href={project.href}
              />
            ))}
          </div>
        </section>

        {/* Status / Quick Stats */}
        <section className="rounded-2xl border border-gray-800 bg-gray-950 p-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Languages</p>
              <p className="mt-2 text-white">Python, TypeScript</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Focus</p>
              <p className="mt-2 text-white">Full-stack Dev</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Status</p>
              <p className="mt-2" style={{ color: "var(--accent-primary)" }}>Available for projects</p>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
