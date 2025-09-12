import { Github, Linkedin, Mail } from "lucide-react";

const socialLinks = [
  { name: "GitHub", href: "https://github.com/beabzk", icon: Github },
  { name: "LinkedIn", href: "https://linkedin.com/in/beabzk", icon: Linkedin },
  { name: "Email", href: "mailto:hello@beabzk.dev", icon: Mail },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-800 bg-black/30">
      <div className="mx-auto max-w-4xl px-6 py-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          {/* Terminal-style status line */}
          <div className="font-mono text-sm text-gray-500">
            <span className="text-green-400">beabzk@dev</span>
            <span className="mx-2">~</span>
            <span>© {currentYear}</span>
            <span className="mx-2">•</span>
            <span>Built with Next.js & TypeScript</span>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 transition-colors hover:text-green-400"
                  aria-label={link.name}
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
