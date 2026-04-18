import { BarChart3, Bug, Lightbulb, User, MapPin, Briefcase, Zap } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

const infoItems = [
  { icon: User, label: "Name", value: "Abdullah Ahmed Mohamed" },
  { icon: MapPin, label: "Location", value: "Mansoura, Egypt" },
  { icon: Briefcase, label: "Role", value: "Full Stack Developer (MERN Stack) & Desktop App Developer" },
  { icon: Zap, label: "Focus", value: "Production-ready web & desktop solutions" },
];

const traitBrutalistCards = [
  { label: "Problem Solver", icon: Lightbulb },
  { label: "Logical Thinker", icon: BarChart3 },
  { label: "Fast Learner", icon: Zap },
  { label: "Bug Fixer", icon: Bug },
] as const;


export default function About() {
  const { isDark } = useTheme();

  return (
    <section
      id="about"
      className={`relative section-about-gradient ${isDark ? "section-about-gradient--dark" : "section-about-gradient--light"}`}
    >
      <div className="section-wrapper">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Text */}
          <div className="space-y-6">
            <div>
              <p className="section-label">About Me</p>
              <h2 className={`section-title ${isDark ? "" : "text-text-light-main"}`}>
                Crafting Digital Experiences<br />
                <span className="gradient-text">with Purpose</span>
              </h2>
              <div className="glow-line" />
            </div>

            <div className={`space-y-4 text-base leading-relaxed ${isDark ? "text-text-muted" : "text-gray-600"}`}>
              <p>
                Hello, I'm <span className={`font-semibold ${isDark ? "text-text-main" : "text-gray-900"}`}>Abdullah Ahmed Mohamed</span> — 
                Full Stack Developer (MERN Stack) & Desktop Application Developer.
              </p>
              <p>
                I design and develop responsive web applications that blend technology with creativity. 
                I'm passionate about crafting seamless digital experiences using modern full-stack frameworks.
              </p>
              <p>
                I'm focused on delivering innovative, scalable, and user-centric solutions that solve 
                real problems and leave a lasting impression.
              </p>
              <p>
                I also have experience in developing ERP systems and Odoo customization, 
                helping businesses streamline their operations through tailored software solutions.
              </p>
            </div>
          </div>

          {/* Right: Info + Stats */}
          <div className="space-y-8">
            {/* Info grid */}
            <div className={`quick-info-ribbons ${isDark ? "quick-info-ribbons--dark" : "quick-info-ribbons--light"}`}>
              <h3 className={`quick-info-ribbons__title ${isDark ? "" : "quick-info-ribbons__title--light"}`}>
                Quick Info
              </h3>

              <div className="quick-info-ribbons__list">
                {infoItems.map(({ icon: Icon, label, value }, index) => (
                  <article
                    key={label}
                    className={`quick-info-ribbon ${index % 2 === 0 ? "quick-info-ribbon--left" : "quick-info-ribbon--right"}`}
                  >
                    <div className="quick-info-ribbon__badge">
                      <span className="quick-info-ribbon__badge-label">INFO</span>
                      <span className="quick-info-ribbon__badge-number">{String(index + 1).padStart(2, "0")}</span>
                    </div>

                    <div className="quick-info-ribbon__content">
                      <p className="quick-info-ribbon__label">{label}</p>
                      <p className="quick-info-ribbon__value">{value}</p>
                    </div>

                    <div className="quick-info-ribbon__icon-wrap">
                      <Icon className="quick-info-ribbon__icon" />
                    </div>
                  </article>
                ))}
              </div>
            </div>


            {/* Traits — neo-brutalist cards */}
            <div className="brutalist-trait-grid max-w-xl mx-auto lg:mx-0">
              {traitBrutalistCards.map(({ label, icon: Icon }, index) => (
                <div
                  key={label}
                  className="brutalist-trait-card"
                  data-index={index}
                >
                  <span className="brutalist-trait-card__label">{label}</span>
                  <Icon className="brutalist-trait-card__icon" aria-hidden />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
