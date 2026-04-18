import { ArrowRight, MapPin } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

export default function Hero() {
  const { isDark } = useTheme();

  const scrollToProjects = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 mesh-bg pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-mint/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-purple/10 rounded-full blur-3xl pointer-events-none" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: isDark
            ? "linear-gradient(rgba(211,218,217,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(113,90,90,0.06) 1px, transparent 1px)"
            : "linear-gradient(rgba(94,0,6,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(155,15,6,0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="section-wrapper w-full">
        <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-10 lg:gap-16">
          {/* Text content */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
          <div className="space-y-6 opacity-0 animate-fade-in-up" style={{ animationFillMode: "forwards" }}>
            {/* Availability terminal */}
            <div className="terminal-loader">
              <div className="terminal-header">
                <div className="terminal-title">Status</div>
                <div className="terminal-controls">
                  <div className="control close"></div>
                  <div className="control minimize"></div>
                  <div className="control maximize"></div>
                </div>
              </div>
              <div className="text">Available for Freelance Work</div>
            </div>

            {/* Name & Title */}
            <div className="space-y-3">
              <p
                className={`text-base font-medium ${isDark ? "text-text-muted" : "text-gray-500"}`}
              >
                Hello, I'm
              </p>
              <h1
                style={{ fontFamily: "'BlueVoltage', sans-serif" }}
                className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight ${
                  isDark ? "text-text-main" : "text-gray-900"
                }`}
              >
                Abdullah<br />
                <span className="brand-text">Ahmed</span> Mohamed
              </h1>
              <p className={`text-lg sm:text-xl font-medium ${isDark ? "text-text-muted" : "text-gray-600"}`}>
                Full Stack Developer (MERN Stack) &{" "}
                <span className="text-mint">Desktop App Developer</span>
              </p>
            </div>

            {/* Description */}
            <p className={`text-base leading-relaxed max-w-xl ${isDark ? "text-text-muted" : "text-gray-600"}`}>
              I design and build responsive web applications that blend technology with creativity — 
              focused on innovative, scalable, and user-centric solutions. Experienced in ERP systems 
              and Odoo customization.
            </p>

            {/* Location */}
            <div className={`flex items-center gap-2 text-sm ${isDark ? "text-text-muted" : "text-gray-500"} justify-center lg:justify-start`}>
              <MapPin className="w-4 h-4 text-mint" />
              <span>Mansoura, Egypt</span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-2 justify-center lg:justify-start">
              <button
                type="button"
                onClick={scrollToProjects}
                className="cv-btn"
                aria-label="Explore my projects"
              >
                <span className="cv-btn__lg">
                  <span className="cv-btn__sl" />
                  <span className="cv-btn__text">
                    Explore Projects
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </span>
              </button>

              <button
                type="button"
                onClick={scrollToContact}
                className="cv-btn"
                aria-label="Contact me"
              >
                <span className="cv-btn__lg">
                  <span className="cv-btn__sl" />
                  <span className="cv-btn__text">
                    Contact Me
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </span>
              </button>
            </div>

            {/* Tags line */}
            <p className={`text-sm ${isDark ? "text-text-muted/70" : "text-gray-400"} pt-2`}>
              Full Stack MERN & Desktop App Developer{" "}
              <span className="text-mint">•</span> ERP & Odoo Customization
            </p>
          </div>
          </div>

          {/* Portrait image */}
          <div className="hero-photo-wrap flex-shrink-0 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
            <img
              src="/image/naaar.png"
              alt="Abdullah Ahmed Mohamed"
              loading="eager"
              className="hero-photo"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
