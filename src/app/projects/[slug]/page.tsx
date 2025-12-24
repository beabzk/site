import { notFound } from "next/navigation";
import Link from "next/link";
import MainLayout from "../../../components/layout/MainLayout";
import Container from "../../../components/ui/Container";
import { MDXRemote } from "next-mdx-remote/rsc";
import { components } from "../../../mdx-components";
import rehypePrettyCode from "rehype-pretty-code";
import {
  ArrowLeft,
  ExternalLink,
  Calendar,
  Star,
  GitBranch,
} from "lucide-react";
import {
  getProjectBySlug,
  getProjectSlugs,
  getProjectLinks,
} from "../../../lib/projects";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;

  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const projectLinks = getProjectLinks(project.metadata);
  const formattedDate = new Date(project.metadata.date).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const mdxOptions = {
    mdxOptions: {
      rehypePlugins: [
        [
          rehypePrettyCode,
          {
            theme: "catppuccin-mocha",
            keepBackground: false,
          },
        ],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ] as any,
    },
  };

  return (
    <MainLayout>
      <div className="pb-20">
        {/* Navigation */}
        <Link
          href="/projects"
          className="group mb-12 inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-white"
        >
          <ArrowLeft
            size={16}
            className="transition-transform group-hover:-translate-x-1"
          />
          <span>Back to Projects</span>
        </Link>

        {/* Project Header */}
        <header className="mb-12 space-y-6">
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-gray-500">
            <div className="flex items-center gap-1.5">
              <Calendar size={14} style={{ color: "var(--accent-primary)" }} />
              <span>{formattedDate}</span>
            </div>
            {project.metadata.category && (
              <div className="rounded-full bg-gray-950 border border-gray-800 px-3 py-1 uppercase tracking-wider">
                {project.metadata.category}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between gap-4">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              {project.metadata.title}
            </h1>
            {project.metadata.featured && (
              <Star size={32} className="text-yellow-500 fill-current" />
            )}
          </div>

          <p className="max-w-3xl text-xl text-gray-400 leading-relaxed">
            {project.metadata.description}
          </p>
        </header>

        {/* Main Content Grid */}
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="lg:col-span-3">
            {/* Content Body */}
            <div className="prose prose-invert prose-emerald max-w-none">
              <MDXRemote source={project.content} components={components} options={mdxOptions} />
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Action Links */}
            {projectLinks.length > 0 && (
              <section className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500">Links</h3>
                <div className="flex flex-col gap-3">
                  {projectLinks.map((link, index) => {
                    const icons = {
                      github: GitBranch,
                      demo: ExternalLink,
                      docs: ExternalLink,
                      npm: ExternalLink,
                    };
                    const labels = {
                      github: "Source Code",
                      demo: "Live Demo",
                      docs: "Documentation",
                      npm: "NPM Package",
                    };
                    const Icon = icons[link.type] || ExternalLink;

                    return (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between rounded-xl border border-gray-800 bg-gray-950 p-4 transition-all hover:border-[var(--accent-primary)] group"
                      >
                        <div className="flex items-center gap-3">
                          <Icon size={18} className="text-gray-400 group-hover:text-[var(--accent-primary)]" />
                          <span className="text-sm font-medium text-white">{labels[link.type]}</span>
                        </div>
                        <ExternalLink size={14} className="text-gray-600 group-hover:text-[var(--accent-primary)]" />
                      </a>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Technologies */}
            <section className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.metadata.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-gray-900 border border-gray-800 px-3 py-1 text-xs text-gray-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </section>

            {/* Info Cards */}
            <section className="space-y-4">
              <Container variant="subtle" className="border border-gray-900">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-600">Status</span>
                  <span className="text-sm text-gray-200" style={{ color: "var(--accent-primary)" }}>
                    {project.metadata.status || "Completed"}
                  </span>
                </div>
              </Container>
            </section>
          </aside>
        </div>
      </div>
    </MainLayout>
  );
}
