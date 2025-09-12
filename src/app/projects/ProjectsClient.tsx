"use client";

import { useState, useMemo } from "react";
import MainLayout from "../../components/layout/MainLayout";
import Terminal from "../../components/ui/Terminal";
import CommandPrompt from "../../components/ui/CommandPrompt";
import { ProjectCard } from "../../components/ui/Card";
import { H2, P } from "../../components/ui/Typography";
import { Search, Filter } from "lucide-react";

interface Project {
  title: string;
  description: string;
  tags: string[];
  size: string;
  date: string;
  href: string;
  featured?: boolean;
}

interface ProjectsClientProps {
  allProjects: Project[];
  allTags: string[];
}

export default function ProjectsClient({
  allProjects,
  allTags,
}: ProjectsClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  const filteredProjects = useMemo(() => {
    return allProjects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every((tag) => project.tags.includes(tag));

      const matchesFeatured = !showFeaturedOnly || project.featured;

      return matchesSearch && matchesTags && matchesFeatured;
    });
  }, [allProjects, searchTerm, selectedTags, showFeaturedOnly]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <Terminal title="projects" showControls={false} className="max-w-2xl">
            <CommandPrompt showCursor={false}>ls -la ~/projects/</CommandPrompt>
          </Terminal>

          <div>
            <H2>Projects Repository</H2>
            <P className="mt-2">
              A collection of tools, utilities, and applications I&apos;ve built
              to solve real-world problems. Each project represents a learning
              journey and practical solution.
            </P>
          </div>
        </div>

        {/* Filters */}
        <div className="space-y-4">
          {/* Search */}
          <div className="relative max-w-md">
            <Search
              size={18}
              className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400"
            />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-md border border-gray-800 bg-gray-950 py-2 pr-4 pl-10 font-mono text-sm text-gray-200 placeholder-gray-500 focus:border-transparent focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
          </div>

          {/* Filter Options */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-gray-400" />
              <span className="font-mono text-sm text-gray-400">Filters:</span>
            </div>

            <button
              onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
              className={`rounded-md px-3 py-1 font-mono text-xs transition-colors ${
                showFeaturedOnly
                  ? "bg-green-400 text-black"
                  : "bg-gray-800 text-gray-400 hover:text-gray-200"
              }`}
            >
              Featured Only
            </button>
          </div>

          {/* Technology Tags */}
          <div className="space-y-2">
            <span className="font-mono text-sm text-gray-400">
              Technologies:
            </span>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`rounded px-2 py-1 font-mono text-xs transition-colors ${
                    selectedTags.includes(tag)
                      ? "bg-green-400 text-black"
                      : "border border-gray-700 bg-gray-800 text-gray-400 hover:text-gray-200"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="font-mono text-sm text-gray-500">
          Showing {filteredProjects.length} of {allProjects.length} projects
        </div>

        {/* Projects Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {filteredProjects.map((project) => (
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

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <Terminal
            title="search-results"
            showControls={false}
            className="max-w-lg"
          >
            <div className="space-y-2">
              <CommandPrompt showCursor={false}>
                find . -name &quot;*{searchTerm}*&quot;
              </CommandPrompt>
              <div className="text-sm text-gray-400">
                No projects found matching your criteria.
              </div>
              <div className="text-xs text-gray-500">
                Try adjusting your search terms or removing some filters.
              </div>
            </div>
          </Terminal>
        )}
      </div>
    </MainLayout>
  );
}
