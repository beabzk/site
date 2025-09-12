import Link from "next/link";
import { File, Folder, ExternalLink } from "lucide-react";

interface FileItem {
  name: string;
  type: "file" | "directory";
  size?: string;
  date?: string;
  href?: string;
  external?: boolean;
  description?: string;
  tags?: string[];
}

interface FileListingProps {
  items: FileItem[];
  showHeader?: boolean;
  className?: string;
}

export default function FileListing({
  items,
  showHeader = true,
  className = "",
}: FileListingProps) {
  return (
    <div className={`font-mono text-sm ${className}`}>
      {showHeader && (
        <div className="mb-2 border-b border-gray-800 pb-2 text-gray-500">
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-1">Type</div>
            <div className="col-span-4">Name</div>
            <div className="col-span-2">Size</div>
            <div className="col-span-3">Modified</div>
            <div className="col-span-2">Tags</div>
          </div>
        </div>
      )}

      <div className="space-y-1">
        {items.map((item, index) => {
          const Icon = item.type === "directory" ? Folder : File;
          const content = (
            <div className="group grid grid-cols-12 items-center gap-2 rounded px-2 py-2 transition-colors hover:bg-gray-900">
              {/* Type icon */}
              <div className="col-span-1">
                <Icon
                  size={16}
                  className={
                    item.type === "directory"
                      ? "text-blue-400"
                      : "text-gray-400"
                  }
                />
              </div>

              {/* Name */}
              <div className="col-span-4">
                <div className="flex items-center gap-2">
                  <span
                    className={`${item.href ? "text-green-400 group-hover:text-green-300" : "text-gray-200"}`}
                  >
                    {item.name}
                  </span>
                  {item.external && (
                    <ExternalLink size={12} className="text-gray-500" />
                  )}
                </div>
                {item.description && (
                  <div className="mt-1 text-xs text-gray-500">
                    {item.description}
                  </div>
                )}
              </div>

              {/* Size */}
              <div className="col-span-2 text-gray-400">{item.size || "-"}</div>

              {/* Date */}
              <div className="col-span-3 text-gray-400">{item.date || "-"}</div>

              {/* Tags */}
              <div className="col-span-2">
                {item.tags && (
                  <div className="flex flex-wrap gap-1">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded bg-gray-800 px-1 py-0.5 text-xs text-gray-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );

          if (item.href) {
            return (
              <Link
                key={index}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="block"
              >
                {content}
              </Link>
            );
          }

          return <div key={index}>{content}</div>;
        })}
      </div>
    </div>
  );
}
