import MainLayout from "../../components/layout/MainLayout";
import Container from "../../components/ui/Container";
import { H2, H3, P } from "../../components/ui/Typography";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";

const skills = {
  Languages: ["Python", "TypeScript", "JavaScript", "Go", "Rust", "SQL"],
  Frontend: ["React", "Next.js", "Tailwind CSS", "HTML5", "CSS3"],
  Backend: ["Node.js", "Django", "Express", "PostgreSQL"],
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

export default function AboutPage() {
  return (
    <MainLayout>
      <div className="space-y-12 pb-10">
        {/* Header */}
        <section>
          <H2>About Me</H2>
          <P className="mt-4 max-w-2xl text-lg">
            I&apos;m a developer with a focus on creating efficient, scalable solutions.
          </P>
        </section>

        {/* Bio Section */}
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="space-y-12 lg:col-span-2">
            {/* Introduction */}
            <section>
              <H3>Introduction</H3>
              <div className="mt-4 space-y-4 leading-relaxed text-gray-300">
                <P>
                  My journey in software development started with curiosity about
                  how things work under the hood.
                </P>
              </div>
            </section>

            {/* Experience */}
            {/* <section>
              <H3>Experience</H3>
              <div className="mt-6 space-y-8">
                {experience.map((exp, index) => (
                  <div key={index} className="relative border-l-2 border-gray-800 pl-6 ml-1">
                    <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full border-2 border-gray-800 bg-black" />
                    <div className="mb-1 flex items-center gap-2 text-[var(--accent-primary)]">
                      <Calendar size={14} />
                      <span className="text-sm font-medium">{exp.period}</span>
                    </div>
                    <h4 className="text-xl font-semibold text-white">{exp.role}</h4>
                    <p className="text-sm text-gray-400">{exp.company}</p>
                    <p className="mt-3 text-gray-300 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </section> */}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Contact Info */}
            <Container variant="bordered">
              <h4 className="mb-4 font-semibold text-white">Contact</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-400">
                  <MapPin size={18} style={{ color: "var(--accent-primary)" }} />
                  <span className="text-sm">Remote / Global</span>
                </div>
                <a
                  href="mailto:beabzk@proton.me"
                  className="flex items-center gap-3 text-gray-300 transition-colors hover:text-[var(--accent-primary)]"
                >
                  <Mail size={18} style={{ color: "var(--accent-primary)" }} />
                  <span className="text-sm">beabzk@proton.me</span>
                </a>
                <a
                  href="https://github.com/beabzk"
                  className="flex items-center gap-3 text-gray-300 transition-colors hover:text-[var(--accent-primary)]"
                >
                  <Github size={18} style={{ color: "var(--accent-primary)" }} />
                  <span className="text-sm">github.com/beabzk</span>
                </a>
                <a
                  href="https://linkedin.com/in/beabzk"
                  className="flex items-center gap-3 text-gray-300 transition-colors hover:text-[var(--accent-primary)]"
                >
                  <Linkedin size={18} style={{ color: "var(--accent-primary)" }} />
                  <span className="text-sm">linkedin.com/in/beabzk</span>
                </a>
              </div>
            </Container>

            {/* Current Status */}
            <Container variant="bordered">
              <h4 className="mb-4 font-semibold text-white">Status</h4>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Availability</span>
                  <span style={{ color: "var(--accent-primary)" }}>Open</span>
                </div>
                {/* <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Focus</span>
                  <span className="text-white">Full-stack</span>
                </div> */}
              </div>
            </Container>
          </div>
        </div>

        {/* Skills Matrix */}
        <section>
          <H3>Technical Skills</H3>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(skills).map(([category, skillList]) => (
              <Container
                key={category}
                variant="subtle"
                className="border border-gray-900"
              >
                <div className="mb-4 font-semibold text-white uppercase tracking-wider text-xs text-gray-500">
                  {category}
                </div>
                <div className="flex flex-wrap gap-2">
                  {skillList.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-gray-950 border border-gray-800 px-3 py-1 text-xs text-gray-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </Container>
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
