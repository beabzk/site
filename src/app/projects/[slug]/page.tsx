import { notFound } from "next/navigation";
import Link from "next/link";
import MainLayout from "../../../components/layout/MainLayout";
import Terminal from "../../../components/ui/Terminal";
import CommandPrompt from "../../../components/ui/CommandPrompt";
import { H1, P } from "../../../components/ui/Typography";
import {
  ArrowLeft,
  ExternalLink,
  Calendar,
  Tag,
  Star,
  GitBranch,
} from "lucide-react";
import {
  getProjectBySlug,
  getProjectSlugs,
  getStaticProject,
  getProjectLinks,
} from "../../../lib/projects";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getProjectSlugs();

  // If no MDX files exist, use static projects
  if (slugs.length === 0) {
    return ["ethioqen", "yamds", "audio-lyrics-merger"].map((slug) => ({
      slug,
    }));
  }

  return slugs.map((slug) => ({ slug }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  // Await params in Next.js 15
  const { slug } = await params;

  // Try to get project from MDX files first, then fallback to static data
  let project = getProjectBySlug(slug);

  if (!project) {
    project = getStaticProject(slug);
  }

  if (!project) {
    notFound();
  }

  const projectLinks = getProjectLinks(project.metadata);

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Navigation */}
        <div className="flex items-center gap-4">
          <Link
            href="/projects"
            className="flex items-center gap-2 text-gray-400 transition-colors hover:text-gray-200"
          >
            <ArrowLeft size={16} />
            <span className="font-mono text-sm">Back to Projects</span>
          </Link>
        </div>

        {/* Terminal Header */}
        <Terminal
          title={`project-details`}
          showControls={false}
          className="max-w-2xl"
        >
          <CommandPrompt showCursor={false}>
            cat ~/projects/{slug}/README.md
          </CommandPrompt>
        </Terminal>

        {/* Project Info */}
        <div className="grid gap-8 lg:grid-cols-4">
          <div className="space-y-6 lg:col-span-3">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <H1>{project.metadata.title}</H1>
                {project.metadata.featured && (
                  <Star size={24} className="fill-current text-yellow-400" />
                )}
              </div>
              <P className="text-lg">
                {project.metadata.longDescription ||
                  project.metadata.description}
              </P>
            </div>

            {/* Content */}
            <div className="prose prose-invert max-w-none">
              <div className="leading-relaxed whitespace-pre-wrap text-gray-300">
                {project.content}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Links */}
            {projectLinks.length > 0 && (
              <Terminal title="links" showControls={false}>
                <div className="space-y-3">
                  {projectLinks.map((link, index) => {
                    const icons = {
                      github: GitBranch,
                      demo: ExternalLink,
                      docs: ExternalLink,
                      npm: ExternalLink,
                    };
                    const labels = {
                      github: "View Source",
                      demo: "Live Demo",
                      docs: "Documentation",
                      npm: "NPM Package",
                    };
                    const Icon = icons[link.type];

                    return (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm transition-colors hover:text-green-400"
                      >
                        <Icon size={16} />
                        {labels[link.type]}
                        <ExternalLink size={12} />
                      </a>
                    );
                  })}
                </div>
              </Terminal>
            )}

            {/* Project Meta */}
            <Terminal title="metadata" showControls={false}>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-green-400" />
                  <span className="text-gray-400">Created:</span>
                  <span>
                    {new Date(project.metadata.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag size={14} className="text-green-400" />
                  <span className="text-gray-400">Status:</span>
                  <span className="text-green-400">
                    {project.metadata.status}
                  </span>
                </div>
                {project.metadata.difficulty && (
                  <div className="flex items-center gap-2">
                    <Tag size={14} className="text-green-400" />
                    <span className="text-gray-400">Difficulty:</span>
                    <span className="text-green-400">
                      {project.metadata.difficulty}
                    </span>
                  </div>
                )}
                {project.metadata.category && (
                  <div className="flex items-center gap-2">
                    <Tag size={14} className="text-green-400" />
                    <span className="text-gray-400">Category:</span>
                    <span className="text-green-400">
                      {project.metadata.category}
                    </span>
                  </div>
                )}
              </div>
            </Terminal>

            {/* Technologies */}
            <Terminal title="technologies" showControls={false}>
              <div className="space-y-2">
                {project.metadata.tags.map((tag, index) => (
                  <div key={tag} className="flex items-center gap-2 text-sm">
                    <span className="w-6 font-mono text-gray-500">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-gray-300">{tag}</span>
                  </div>
                ))}
              </div>
            </Terminal>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
