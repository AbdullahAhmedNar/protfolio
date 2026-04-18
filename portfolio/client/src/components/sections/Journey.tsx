import { timelineData } from "../../data/static";
import { useTheme } from "../../hooks/useTheme";

export default function Journey() {
  const { isDark } = useTheme();

  return (
    <section id="journey" className={`relative ${isDark ? "" : "bg-gray-50/50"}`}>
      <div className="section-wrapper">
        <div className="text-center mb-16">
          <p className="section-label">Journey</p>
          <h2 className={`section-title ${isDark ? "" : "text-text-light-main"}`}>
            My <span className="gradient-text">Story So Far</span>
          </h2>
          <div className="glow-line mx-auto" />
          <p className={`section-subtitle mt-6 max-w-xl mx-auto ${isDark ? "" : "text-text-light-muted"}`}>
            From first lines of code to production applications - here's how I got here.
          </p>
        </div>

        <div
          className={`max-w-5xl mx-auto mb-10 rounded-3xl border p-6 md:p-8 ${
            isDark
              ? "bg-bg-surface/80 border-white/10 shadow-[0_20px_80px_rgba(16,185,129,0.08)]"
              : "bg-white/90 border-gray-200 shadow-[0_20px_60px_rgba(15,23,42,0.06)]"
          }`}
        >
          <div className="max-w-3xl">
            <p className={`text-xs font-semibold uppercase tracking-[0.25em] mb-3 ${isDark ? "text-mint" : "text-emerald-600"}`}>
              My Story So Far
            </p>
            <h3 className={`text-2xl md:text-3xl font-bold leading-tight mb-4 ${isDark ? "text-text-main" : "text-gray-900"}`}>
              A path shaped by curiosity, fundamentals, competition, and building real products.
            </h3>
            <p className={`text-sm md:text-base leading-relaxed ${isDark ? "text-text-muted" : "text-gray-600"}`}>
              Each phase added something important to my growth, from discovering programming and studying computer
              science to specializing in the MERN Stack, earning recognition through DEPI, and taking on professional
              responsibility with Nova Mind.
            </p>
          </div>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Vertical line */}
          <div
            className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-mint via-accent-blue to-accent-purple opacity-30"
            aria-hidden="true"
          />

          <div className="space-y-8">
            {timelineData.map((item, idx) => (
              <div
                key={item.id}
                className="relative flex gap-6 opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${idx * 0.1}s`, animationFillMode: "forwards" }}
              >
                {/* Icon dot */}
                <div className="relative z-10 flex-shrink-0">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-lg ${
                      isDark ? "bg-bg-surface border border-white/10" : "bg-white border border-gray-200 shadow-sm"
                    }`}
                  >
                    <item.icon className="w-5 h-5 text-mint" />
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`flex-1 p-5 md:p-6 rounded-3xl border transition-all duration-300 hover:-translate-y-1 hover:border-mint/20 ${
                    isDark
                      ? "bg-bg-surface border-white/5 hover:shadow-xl hover:shadow-mint/5"
                      : "bg-white border-gray-200 shadow-sm hover:shadow-lg hover:shadow-mint/10"
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] mb-3 ${
                          isDark ? "bg-mint/10 text-mint" : "bg-emerald-50 text-emerald-700"
                        }`}
                      >
                        {item.period}
                      </span>
                      <h3 className={`font-bold text-lg ${isDark ? "text-text-main" : "text-gray-900"}`}>
                        {item.title}
                      </h3>
                    </div>
                    <div
                      className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl ${
                        isDark ? "bg-white/5" : "bg-gray-50"
                      }`}
                    >
                      <item.icon className="w-5 h-5 text-mint" />
                    </div>
                  </div>
                  <p className={`text-sm leading-relaxed mb-4 ${isDark ? "text-text-muted" : "text-gray-600"}`}>
                    {item.description}
                  </p>
                  {"highlights" in item && Array.isArray(item.highlights) && (
                    <div className="flex flex-wrap gap-2">
                      {item.highlights.map((highlight) => (
                        <span
                          key={highlight}
                          className={`rounded-full px-3 py-1.5 text-xs ${
                            isDark
                              ? "bg-white/5 text-text-muted border border-white/5"
                              : "bg-gray-50 text-gray-700 border border-gray-200"
                          }`}
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
