import MainLayout from "../../components/layout/MainLayout";
import Terminal from "../../components/ui/Terminal";
import CommandPrompt from "../../components/ui/CommandPrompt";
import TypingAnimation from "../../components/ui/TypingAnimation";
import { H2, H3, P } from "../../components/ui/Typography";
import {
  Monitor,
  Cpu,
  HardDrive,
  Zap,
  Code,
  Globe,
  Wrench,
  BookOpen,
} from "lucide-react";

const hardware = [
  {
    name: 'MacBook Pro 16" M2 Max',
    description: "Primary development machine with 32GB RAM",
    icon: Monitor,
  },
  {
    name: 'Dell UltraSharp 27" 4K',
    description: "External monitor for extended workspace",
    icon: Monitor,
  },
  {
    name: "Keychron K8 Mechanical",
    description: "Wireless mechanical keyboard with brown switches",
    icon: Code,
  },
  {
    name: "Logitech MX Master 3",
    description: "Wireless mouse with precision scrolling",
    icon: Cpu,
  },
  {
    name: "Sony WH-1000XM4",
    description: "Noise-cancelling headphones for focus",
    icon: Zap,
  },
  {
    name: "Herman Miller Aeron",
    description: "Ergonomic chair for long coding sessions",
    icon: HardDrive,
  },
];

const software = [
  {
    name: "VS Code",
    description: "Primary code editor with Vim extension",
    category: "Editor",
  },
  {
    name: "iTerm2 + Zsh",
    description: "Terminal with Oh My Zsh and custom theme",
    category: "Terminal",
  },
  {
    name: "Docker Desktop",
    description: "Containerization for development environments",
    category: "DevOps",
  },
  {
    name: "Postman",
    description: "API development and testing",
    category: "API",
  },
  {
    name: "Figma",
    description: "Design collaboration and prototyping",
    category: "Design",
  },
  {
    name: "Notion",
    description: "Note-taking and project management",
    category: "Productivity",
  },
];

const services = [
  {
    name: "Vercel",
    description: "Frontend deployment and hosting",
    category: "Hosting",
  },
  {
    name: "AWS",
    description: "Cloud infrastructure and services",
    category: "Cloud",
  },
  {
    name: "GitHub",
    description: "Version control and collaboration",
    category: "DevOps",
  },
  {
    name: "Supabase",
    description: "Backend-as-a-Service for rapid development",
    category: "Database",
  },
  {
    name: "Cloudflare",
    description: "CDN and DNS management",
    category: "Infrastructure",
  },
  {
    name: "Linear",
    description: "Issue tracking and project management",
    category: "Productivity",
  },
];

const learning = [
  {
    name: "Rust Programming Language Book",
    description: "Learning systems programming",
    type: "Book",
  },
  {
    name: "Frontend Masters",
    description: "Advanced web development courses",
    type: "Platform",
  },
  {
    name: "Hacker News",
    description: "Tech news and discussions",
    type: "Community",
  },
  {
    name: "Dev.to",
    description: "Developer articles and tutorials",
    type: "Community",
  },
  {
    name: "YouTube - ThePrimeagen",
    description: "Programming insights and reviews",
    type: "Content",
  },
  {
    name: "Podcasts - Syntax.fm",
    description: "Web development podcast",
    type: "Podcast",
  },
];

interface UsesItemProps {
  name: string;
  description: string;
  category?: string;
  type?: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
}

function UsesItem({
  name,
  description,
  category,
  type,
  icon: Icon,
}: UsesItemProps) {
  return (
    <div className="flex items-start gap-3 rounded-lg bg-gray-900/50 p-3 transition-colors hover:bg-gray-900/80">
      {Icon && (
        <Icon size={20} className="mt-0.5 flex-shrink-0 text-green-400" />
      )}
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center gap-2">
          <h4 className="font-mono text-sm font-medium text-white">{name}</h4>
          {(category || type) && (
            <span className="rounded bg-gray-800 px-2 py-0.5 font-mono text-xs text-gray-400">
              {category || type}
            </span>
          )}
        </div>
        <p className="text-sm leading-relaxed text-gray-400">{description}</p>
      </div>
    </div>
  );
}

export default function UsesPage() {
  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <Terminal title="uses" showControls={false} className="max-w-2xl">
            <CommandPrompt showCursor={false}>
              <TypingAnimation text="cat ~/setup/README.md" speed={80} />
            </CommandPrompt>
          </Terminal>

          <div>
            <H2>What I Use</H2>
            <P className="mt-2">
              A comprehensive overview of my development setup, tools, and
              resources. This page is inspired by{" "}
              <a
                href="https://uses.tech"
                className="text-green-400 hover:underline"
              >
                uses.tech
              </a>{" "}
              and gets updated regularly as my setup evolves.
            </P>
          </div>
        </div>

        {/* Hardware */}
        <div>
          <div className="mb-4 flex items-center gap-2">
            <Monitor size={20} className="text-green-400" />
            <H3>Hardware</H3>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {hardware.map((item) => (
              <UsesItem
                key={item.name}
                name={item.name}
                description={item.description}
                icon={item.icon}
              />
            ))}
          </div>
        </div>

        {/* Software */}
        <div>
          <div className="mb-4 flex items-center gap-2">
            <Code size={20} className="text-green-400" />
            <H3>Software & Tools</H3>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {software.map((item) => (
              <UsesItem
                key={item.name}
                name={item.name}
                description={item.description}
                category={item.category}
              />
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <div className="mb-4 flex items-center gap-2">
            <Globe size={20} className="text-green-400" />
            <H3>Services & Platforms</H3>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {services.map((item) => (
              <UsesItem
                key={item.name}
                name={item.name}
                description={item.description}
                category={item.category}
              />
            ))}
          </div>
        </div>

        {/* Learning Resources */}
        <div>
          <div className="mb-4 flex items-center gap-2">
            <BookOpen size={20} className="text-green-400" />
            <H3>Learning & Resources</H3>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {learning.map((item) => (
              <UsesItem
                key={item.name}
                name={item.name}
                description={item.description}
                type={item.type}
              />
            ))}
          </div>
        </div>

        {/* Development Environment */}
        <div>
          <div className="mb-4 flex items-center gap-2">
            <Wrench size={20} className="text-green-400" />
            <H3>Development Environment</H3>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <Terminal title="shell-config" showControls={false}>
              <div className="space-y-2 text-sm">
                <div className="text-gray-400">
                  $ cat ~/.zshrc | grep -E &quot;(alias|export)&quot;
                </div>
                <div className="space-y-1 font-mono text-gray-300">
                  <div>export EDITOR=&quot;code&quot;</div>
                  <div>alias ll=&quot;ls -la&quot;</div>
                  <div>alias gs=&quot;git status&quot;</div>
                  <div>alias gp=&quot;git push&quot;</div>
                  <div>alias gc=&quot;git commit -m&quot;</div>
                  <div>alias nrd=&quot;npm run dev&quot;</div>
                  <div>alias nrb=&quot;npm run build&quot;</div>
                </div>
              </div>
            </Terminal>

            <Terminal title="vscode-extensions" showControls={false}>
              <div className="space-y-2 text-sm">
                <div className="text-gray-400">
                  $ code --list-extensions | head -8
                </div>
                <div className="space-y-1 font-mono text-gray-300">
                  <div>vscodevim.vim</div>
                  <div>ms-python.python</div>
                  <div>bradlc.vscode-tailwindcss</div>
                  <div>esbenp.prettier-vscode</div>
                  <div>ms-vscode.vscode-typescript-next</div>
                  <div>github.copilot</div>
                  <div>ms-vscode.theme-github-dark</div>
                  <div>pkief.material-icon-theme</div>
                </div>
              </div>
            </Terminal>
          </div>
        </div>

        {/* System Specs */}
        <Terminal
          title="system-info"
          showControls={false}
          className="max-w-2xl"
        >
          <div className="space-y-2 text-sm">
            <div className="text-gray-400">
              $ system_profiler SPHardwareDataType | head -10
            </div>
            <div className="space-y-1 font-mono text-gray-300">
              <div>Hardware Overview:</div>
              <div className="ml-4">Model Name: MacBook Pro</div>
              <div className="ml-4">Chip: Apple M2 Max</div>
              <div className="ml-4">
                Total Number of Cores: 12 (8 performance and 4 efficiency)
              </div>
              <div className="ml-4">Memory: 32 GB</div>
              <div className="ml-4">System Version: macOS 14.0</div>
              <div className="ml-4">Kernel Version: Darwin 23.0.0</div>
            </div>
          </div>
        </Terminal>
      </div>
    </MainLayout>
  );
}
