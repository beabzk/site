"use client";

import { useState, useMemo } from "react";
import MainLayout from "../../components/layout/MainLayout";
import Container from "../../components/ui/Container";
import { ProjectCard } from "../../components/ui/Card";
import { H2, P } from "../../components/ui/Typography";
import { Search, Filter, X } from "lucide-react";

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
      <div className="space-y-12 pb-10">
        {/* Header */}
        <section className="space-y-4">
          <H2>Projects</H2>
          <P className="max-w-2xl text-gray-400">
            A collection of tools, utilities, and applications I&apos;ve built
            to solve real-world problems. Each project represents a learning
            journey and practical solution.
          </P>
        </section>

        {/* Filters & Search */}
        <section className="space-y-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <label htmlFor="search" className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Search Projects</label>
              <div className="relative">
                <Search
                  size={18}
                  className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-500"
                />
                <input
                  id="search"
                  type="text"
                  placeholder="Keywords, tech, title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-xl border border-gray-800 bg-gray-950 py-3 pr-4 pl-10 text-sm text-gray-200 placeholder-gray-600 focus:border-[var(--accent-primary)] focus:ring-0 focus:outline-none transition-colors"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-600 hover:text-gray-400"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* Featured Toggle */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">Show Featured Only</span>
              <button
                onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${showFeaturedOnly ? "bg-[var(--accent-primary)]" : "bg-gray-800"
                  }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${showFeaturedOnly ? "translate-x-6" : "translate-x-1"
                    }`}
                />
              </button>
            </div>
          </div>

          {/* Technology filter */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
              <Filter size={14} />
              <span>Filter by Technology</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${isSelected
                        ? "bg-[var(--accent-primary)] text-black"
                        : "bg-gray-950 border border-gray-800 text-gray-400 hover:border-gray-600"
                      }`}
                  >
                    {tag}
                  </button>
                );
              })}
              {selectedTags.length > 0 && (
                <button
                  onClick={() => setSelectedTags([])}
                  className="text-xs text-gray-500 hover:text-white transition-colors underline underline-offset-4 ml-2"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Results Info */}
        <div className="flex items-center justify-between border-b border-gray-800 pb-2">
          <span className="text-sm text-gray-500">
            Found <span className="text-white font-medium">{filteredProjects.length}</span> projects
          </span>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              tags={project.tags}
              href={project.href}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <Container variant="subtle" className="py-20 text-center border border-dashed border-gray-800">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-900 text-gray-600 mb-4">
              <Search size={32} />
            </div>
            <h3 className="text-lg font-semibold text-white">No projects found</h3>
            <p className="text-gray-400 mt-2">Try adjusting your filters or search term.</p>
            <button
              onClick={() => { setSearchTerm(""); setSelectedTags([]); setShowFeaturedOnly(false); }}
              className="mt-6 text-sm text-[var(--accent-primary)] hover:underline"
            >
              Reset all filters
            </button>
          </Container>
        )}
      </div>
    </MainLayout>
  );
}
