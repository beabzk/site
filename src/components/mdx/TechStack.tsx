interface TechStackProps {
  technologies: string[];
  title?: string;
}

export default function TechStack({
  technologies,
  title = "Tech Stack",
}: TechStackProps) {
  return (
    <div className="my-6">
      <h4 className="mb-4 font-mono text-lg font-semibold text-white">
        {title}
      </h4>
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech, index) => (
          <span
            key={index}
            className="rounded-full border border-gray-700 bg-gray-800 px-3 py-1 font-mono text-sm text-gray-300 transition-colors hover:border-green-400 hover:text-green-400"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

// Alternative grid layout for larger tech stacks
export function TechGrid({
  technologies,
  title = "Technologies Used",
}: TechStackProps) {
  return (
    <div className="my-6">
      <h4 className="mb-4 font-mono text-lg font-semibold text-white">
        {title}
      </h4>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {technologies.map((tech, index) => (
          <div
            key={index}
            className="group rounded-lg border border-gray-700 bg-gray-900 p-3 text-center transition-colors hover:border-green-400"
          >
            <span className="font-mono text-sm text-gray-300 transition-colors group-hover:text-green-400">
              {tech}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
