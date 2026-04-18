import {
  Atom,
  BookOpen,
  Bot,
  Braces,
  Code2,
  FileCode2,
  GitBranch,
  Handshake,
  Layers3,
  MessageSquareMore,
  Puzzle,
  SearchCheck,
  Server,
  SquareCode,
} from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

const techSkills = [
  // Languages
  { name: "JavaScript", level: "Advanced", category: "Language", icon: Code2 },
  { name: "TypeScript", level: "Intermediate", category: "Language", icon: FileCode2 },
  { name: "C++", level: "Intermediate", category: "Language", icon: FileCode2 },
  { name: "HTML5", level: "Advanced", category: "Language", icon: Braces },
  { name: "CSS3", level: "Advanced", category: "Language", icon: SquareCode },
  // Frameworks
  { name: "React", level: "Advanced", category: "Framework", icon: Atom },
  { name: "Node.js", level: "Advanced", category: "Framework", icon: Server },
  { name: "Express.js", level: "Advanced", category: "Framework", icon: Bot },
  { name: "Electron.js", level: "Intermediate", category: "Framework", icon: Code2 },
  { name: "Tailwind CSS", level: "Advanced", category: "Framework", icon: Layers3 },
  { name: "Bootstrap", level: "Advanced", category: "Framework", icon: Layers3 },
  // Tools
  { name: "MongoDB", level: "Advanced", category: "Tool", icon: Server },
  { name: "Git / GitHub", level: "Advanced", category: "Tool", icon: GitBranch },
  { name: "VS Code", level: "Advanced", category: "Tool", icon: Code2 },
  { name: "Odoo", level: "Intermediate", category: "Tool", icon: Layers3 },
  { name: "Python", level: "Intermediate", category: "Language", icon: FileCode2 },
];

const softSkills = [
  { name: "Problem Solving", icon: Puzzle, desc: "Breaking complex challenges into elegant solutions" },
  { name: "Communication", icon: MessageSquareMore, desc: "Clear, concise and effective technical communication" },
  { name: "Teamwork", icon: Handshake, desc: "Collaborating effectively in cross-functional teams" },
  { name: "Continuous Learning", icon: BookOpen, desc: "Staying up-to-date with the latest technologies" },
  { name: "Attention to Detail", icon: SearchCheck, desc: "Precision and care in every line of code" },
];

const levelColors: Record<string, string> = {
  Advanced: "text-mint",
  Intermediate: "text-accent-blue",
};

export default function Skills() {
  const { isDark } = useTheme();

  const categories = [
    { label: "Languages", filter: "Language" },
    { label: "Frameworks & Libraries", filter: "Framework" },
    { label: "Tools & Technologies", filter: "Tool" },
  ];

  return (
    <section id="skills" className={`relative ${isDark ? "" : "bg-gray-50/50"}`}>
      <div className="section-wrapper">
        <div className="text-center mb-16">
          <p className="section-label">Skills</p>
          <h2 className={`section-title ${isDark ? "" : "text-text-light-main"}`}>
            What I <span className="gradient-text">Work With</span>
          </h2>
          <div className="glow-line mx-auto" />
          <p className={`section-subtitle mt-6 max-w-xl mx-auto ${isDark ? "" : "text-text-light-muted"}`}>
            Technologies and tools I use to craft digital products from idea to production.
          </p>
        </div>

        {/* Tech Skills */}
        <div className="space-y-10 mb-16">
          {categories.map(({ label, filter }) => (
            <div key={filter}>
              <h3 className={`text-sm font-semibold uppercase tracking-widest mb-4 ${isDark ? "text-text-muted" : "text-gray-500"}`}>
                {label}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {techSkills
                  .filter((s) => s.category === filter)
                  .map((skill) => {
                    const Icon = skill.icon;

                    return (
                    <div
                      key={skill.name}
                      className={`group relative p-4 rounded-2xl border cursor-default
                        transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                          isDark
                            ? "bg-bg-surface border-white/5 hover:border-mint/30 hover:shadow-mint/5"
                            : "bg-white border-gray-200 hover:border-mint/30 hover:shadow-mint/10"
                        }`}
                    >
                      <div className="mb-3 inline-flex w-10 h-10 items-center justify-center rounded-xl bg-mint/10">
                        <Icon className={`w-5 h-5 ${skill.level === "Advanced" ? "text-mint" : "text-accent-blue"}`} />
                      </div>
                      <div className={`text-sm font-semibold mb-1 ${isDark ? "text-text-main" : "text-gray-900"}`}>
                        {skill.name}
                      </div>
                      <div className={`text-xs font-medium ${levelColors[skill.level] || "text-text-muted"}`}>
                        {skill.level}
                      </div>
                    </div>
                  )})}
              </div>
            </div>
          ))}
        </div>

        {/* Soft Skills */}
        <div>
          <h3 className={`text-sm font-semibold uppercase tracking-widest mb-6 ${isDark ? "text-text-muted" : "text-gray-500"}`}>
            Soft Skills
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {softSkills.map((skill) => {
              const Icon = skill.icon;

              return (
              <div
                key={skill.name}
                className={`p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                  isDark
                    ? "bg-bg-surface border-white/5 hover:border-mint/20"
                    : "bg-white border-gray-200 hover:border-mint/30 shadow-sm"
                }`}
              >
                <div className="mb-3 inline-flex w-10 h-10 items-center justify-center rounded-xl bg-mint/10">
                  <Icon className="w-5 h-5 text-mint" />
                </div>
                <div className={`text-sm font-semibold mb-1 ${isDark ? "text-text-main" : "text-gray-900"}`}>
                  {skill.name}
                </div>
                <p className={`text-xs leading-relaxed ${isDark ? "text-text-muted" : "text-gray-500"}`}>
                  {skill.desc}
                </p>
              </div>
            )})}
          </div>
        </div>
      </div>
    </section>
  );
}
