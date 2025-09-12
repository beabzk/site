import { Github, ExternalLink, Play, FileText, Package } from "lucide-react";

interface ProjectLink {
  type: "github" | "demo" | "docs" | "npm" | "custom";
  url: string;
  label?: string;
}

interface ProjectLinksProps {
  links: ProjectLink[];
  title?: string;
}

const linkConfig = {
  github: {
    icon: Github,
    label: "View Source",
    bgColor: "bg-gray-800 hover:bg-gray-700",
    textColor: "text-gray-300 hover:text-white",
  },
  demo: {
    icon: Play,
    label: "Live Demo",
    bgColor: "bg-green-800 hover:bg-green-700",
    textColor: "text-green-300 hover:text-white",
  },
  docs: {
    icon: FileText,
    label: "Documentation",
    bgColor: "bg-blue-800 hover:bg-blue-700",
    textColor: "text-blue-300 hover:text-white",
  },
  npm: {
    icon: Package,
    label: "NPM Package",
    bgColor: "bg-red-800 hover:bg-red-700",
    textColor: "text-red-300 hover:text-white",
  },
  custom: {
    icon: ExternalLink,
    label: "External Link",
    bgColor: "bg-purple-800 hover:bg-purple-700",
    textColor: "text-purple-300 hover:text-white",
  },
};

export default function ProjectLinks({
  links,
  title = "Project Links",
}: ProjectLinksProps) {
  return (
    <div className="my-6">
      <h4 className="mb-4 font-mono text-lg font-semibold text-white">
        {title}
      </h4>
      <div className="flex flex-wrap gap-3">
        {links.map((link, index) => {
          const config = linkConfig[link.type];
          const Icon = config.icon;
          const displayLabel = link.label || config.label;

          return (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 rounded-lg border border-gray-600 px-4 py-2 font-mono text-sm transition-all duration-200 ${config.bgColor} ${config.textColor} `}
            >
              <Icon size={16} />
              {displayLabel}
              <ExternalLink size={12} className="opacity-60" />
            </a>
          );
        })}
      </div>
    </div>
  );
}

// Compact version for smaller spaces
export function CompactProjectLinks({ links }: { links: ProjectLink[] }) {
  return (
    <div className="my-4 flex gap-2">
      {links.map((link, index) => {
        const config = linkConfig[link.type];
        const Icon = config.icon;

        return (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`rounded-lg border border-gray-600 p-2 transition-all duration-200 ${config.bgColor} ${config.textColor} `}
            title={link.label || config.label}
          >
            <Icon size={16} />
          </a>
        );
      })}
    </div>
  );
}
