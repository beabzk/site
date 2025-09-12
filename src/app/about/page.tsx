import MainLayout from "../../components/layout/MainLayout";
import Terminal from "../../components/ui/Terminal";
import CommandPrompt from "../../components/ui/CommandPrompt";
import TypingAnimation from "../../components/ui/TypingAnimation";
import { H2, H3, P } from "../../components/ui/Typography";
import { Github, Linkedin, Mail, MapPin, Calendar } from "lucide-react";

const skills = {
  Languages: ["Python", "TypeScript", "JavaScript", "Go", "Rust", "SQL"],
  Frontend: ["React", "Next.js", "Vue.js", "Tailwind CSS", "HTML5", "CSS3"],
  Backend: ["Node.js", "FastAPI", "Django", "Express", "PostgreSQL", "Redis"],
  Tools: ["Git", "Docker", "AWS", "Vercel", "Linux", "VS Code"],
  Concepts: [
    "REST APIs",
    "GraphQL",
    "Microservices",
    "CI/CD",
    "Testing",
    "Agile",
  ],
};

const experience = [
  {
    period: "2023 - Present",
    role: "Senior Full-Stack Developer",
    company: "Tech Innovations Inc.",
    description:
      "Leading development of scalable web applications using modern technologies. Mentoring junior developers and architecting cloud-native solutions.",
  },
  {
    period: "2021 - 2023",
    role: "Full-Stack Developer",
    company: "Digital Solutions Co.",
    description:
      "Built and maintained multiple client applications using React, Node.js, and Python. Improved application performance by 40% through optimization.",
  },
  {
    period: "2020 - 2021",
    role: "Frontend Developer",
    company: "StartupXYZ",
    description:
      "Developed responsive web applications and collaborated with design teams to create intuitive user experiences. Implemented modern frontend architectures.",
  },
];

export default function AboutPage() {
  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <Terminal title="about" showControls={false} className="max-w-2xl">
            <CommandPrompt showCursor={false}>
              <TypingAnimation text="cat ~/about.txt" speed={80} />
            </CommandPrompt>
          </Terminal>

          <div>
            <H2>About Me</H2>
            <P className="mt-2">
              Full-stack developer passionate about building tools that solve
              real problems. I enjoy working with modern technologies and
              contributing to open source projects.
            </P>
          </div>
        </div>

        {/* Bio Section */}
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            {/* Introduction */}
            <div>
              <H3>Introduction</H3>
              <div className="mt-4 space-y-4 leading-relaxed text-gray-300">
                <P>
                  I&apos;m a full-stack developer with a passion for creating
                  efficient, scalable solutions. My journey in software
                  development started with curiosity about how things work under
                  the hood, and has evolved into a career focused on building
                  tools that make developers&apos; lives easier.
                </P>
                <P>
                  I specialize in Python and TypeScript ecosystems, with
                  experience ranging from CLI utilities to complex web
                  applications. I believe in writing clean, maintainable code
                  and am always exploring new technologies to stay current with
                  industry trends.
                </P>
                <P>
                  When I&apos;m not coding, you&apos;ll find me contributing to
                  open source projects, writing technical documentation, or
                  experimenting with new frameworks and tools. I&apos;m
                  particularly interested in developer experience, automation,
                  and building systems that scale.
                </P>
              </div>
            </div>

            {/* Experience */}
            <div>
              <H3>Experience</H3>
              <div className="mt-4 space-y-6">
                {experience.map((exp, index) => (
                  <div key={index} className="border-l-2 border-gray-800 pl-4">
                    <div className="mb-2 flex items-center gap-2">
                      <Calendar size={16} className="text-green-400" />
                      <span className="font-mono text-sm text-green-400">
                        {exp.period}
                      </span>
                    </div>
                    <h4 className="font-mono text-lg text-white">{exp.role}</h4>
                    <p className="mb-2 font-mono text-sm text-gray-400">
                      {exp.company}
                    </p>
                    <p className="text-sm leading-relaxed text-gray-300">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <Terminal title="contact" showControls={false}>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-green-400" />
                  <span className="text-sm">Remote / Global</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-green-400" />
                  <a
                    href="mailto:hello@beabzk.dev"
                    className="text-sm transition-colors hover:text-green-400"
                  >
                    hello@beabzk.dev
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Github size={16} className="text-green-400" />
                  <a
                    href="https://github.com/beabzk"
                    className="text-sm transition-colors hover:text-green-400"
                  >
                    github.com/beabzk
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Linkedin size={16} className="text-green-400" />
                  <a
                    href="https://linkedin.com/in/beabzk"
                    className="text-sm transition-colors hover:text-green-400"
                  >
                    linkedin.com/in/beabzk
                  </a>
                </div>
              </div>
            </Terminal>

            {/* Current Status */}
            <Terminal title="status" showControls={false}>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Status:</span>
                  <span className="text-green-400">Available</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Focus:</span>
                  <span className="text-green-400">Full-stack</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Timezone:</span>
                  <span className="text-green-400">UTC+0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Coffee:</span>
                  <span className="text-green-400">Always</span>
                </div>
              </div>
            </Terminal>
          </div>
        </div>

        {/* Skills Matrix */}
        <div>
          <H3>Technical Skills</H3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(skills).map(([category, skillList]) => (
              <Terminal
                key={category}
                title={category.toLowerCase()}
                showControls={false}
              >
                <div className="space-y-1">
                  {skillList.map((skill, index) => (
                    <div
                      key={skill}
                      className="flex items-center gap-2 text-sm"
                    >
                      <span className="w-6 font-mono text-gray-500">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-gray-300">{skill}</span>
                    </div>
                  ))}
                </div>
              </Terminal>
            ))}
          </div>
        </div>

        {/* Fun Facts */}
        <Terminal title="fun-facts" showControls={false} className="max-w-2xl">
          <div className="space-y-2 text-sm">
            <div className="text-gray-400">$ cat ~/fun-facts.txt</div>
            <div className="space-y-1 text-gray-300">
              <div>• I prefer dark themes (obviously)</div>
              <div>• My favorite programming font is JetBrains Mono</div>
              <div>• I use Vim keybindings in VS Code</div>
              <div>• I have strong opinions about code formatting</div>
              <div>• I believe in the power of good documentation</div>
              <div>• I&apos;m always learning something new</div>
            </div>
          </div>
        </Terminal>
      </div>
    </MainLayout>
  );
}
