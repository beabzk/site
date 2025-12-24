"use client";

import MainLayout from "../../components/layout/MainLayout";
import { H2, H3, P } from "../../components/ui/Typography";
import {
  Code,
  Globe,
} from "lucide-react";

// const hardware = [
//   {
//     name: 'MacBook Pro 16" M2 Max',
//     description: "Primary development machine with 32GB RAM",
//     icon: Monitor,
//   },
//   {
//     name: 'Dell UltraSharp 27" 4K',
//     description: "External monitor for extended workspace",
//     icon: Monitor,
//   },
//   {
//     name: "Keychron K8 Mechanical",
//     description: "Wireless mechanical keyboard with brown switches",
//     icon: Code,
//   },
//   {
//     name: "Logitech MX Master 3",
//     description: "Wireless mouse with precision scrolling",
//     icon: Cpu,
//   },
//   {
//     name: "Sony WH-1000XM4",
//     description: "Noise-cancelling headphones for focus",
//     icon: Zap,
//   },
// ];

const software = [
  {
    name: "VS Code",
    description: "Primary code editor",
    category: "Editor",
  },
  {
    name: "Docker Desktop",
    description: "Containerization for development environments",
    category: "DevOps",
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
];

interface UsesItemProps {
  name: string;
  description: string;
  category?: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
}

function UsesItem({ name, description, category, icon: Icon }: UsesItemProps) {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-gray-800 bg-gray-950/50 p-4 transition-colors hover:border-gray-700">
      {Icon && (
        <div className="mt-1 rounded-lg bg-gray-900 p-2 text-[var(--accent-primary)]">
          <Icon size={20} />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center gap-2">
          <h4 className="text-sm font-semibold text-white">{name}</h4>
          {category && (
            <span className="rounded-full bg-gray-900 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-gray-500 border border-gray-800">
              {category}
            </span>
          )}
        </div>
        <p className="text-xs leading-relaxed text-gray-400">{description}</p>
      </div>
    </div>
  );
}

export default function UsesPage() {
  return (
    <MainLayout>
      <div className="space-y-12 pb-10">
        {/* Header */}
        <section>
          <H2>What I Use</H2>
          <P className="mt-4 max-w-2xl">
            An overview of my setup, tools, and resources. This setup evolves as I find better ways to work.
          </P>
        </section>

        {/* Hardware */}
        {/* <section>
          <div className="mb-6 flex items-center gap-2">
            <Monitor size={22} style={{ color: "var(--accent-primary)" }} />
            <H3>Hardware</H3>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {hardware.map((item) => (
              <UsesItem
                key={item.name}
                name={item.name}
                description={item.description}
                icon={item.icon}
              />
            ))}
          </div>
        </section> */}

        {/* Software & Tools */}
        <section>
          <div className="mb-6 flex items-center gap-2">
            <Code size={22} style={{ color: "var(--accent-primary)" }} />
            <H3>Software & Tools</H3>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {software.map((item) => (
              <UsesItem
                key={item.name}
                name={item.name}
                description={item.description}
                category={item.category}
              />
            ))}
          </div>
        </section>

        {/* Services */}
        <section>
          <div className="mb-6 flex items-center gap-2">
            <Globe size={22} style={{ color: "var(--accent-primary)" }} />
            <H3>Services & Platforms</H3>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {services.map((item) => (
              <UsesItem
                key={item.name}
                name={item.name}
                description={item.description}
                category={item.category}
              />
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
