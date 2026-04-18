import { Trophy } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

const achievementSections = [
  {
    badge: "DEPI · Digital Egypt Pioneers Initiative",
    title: "Top Achiever",
    subtitle: "One of the Top 5 Graduation Projects on the React Track",
    description:
      "During my participation in the Digital Egypt Pioneers Initiative (DEPI) — one of Egypt's most competitive national programs for developing elite software engineers — I was recognized as one of the Top Achievers and honored at the program's conclusion.",
    secondaryDescription:
      "My graduation project was officially ranked among the Top 5 Projects on the React Track across the entire cohort and evaluated for code quality, architecture, and real-world impact.",
    points: [
      "Recognized as one of the Top Achievers in DEPI",
      "Graduation project ranked among the Top 5 on the React Track",
      "Evaluated for code quality, architecture, and real-world impact",
    ],
    images: [
      { src: "/image/ach1.jpeg", alt: "DEPI Round 3 Certificate" },
      { src: "/image/ach2.jpeg", alt: "Best Project Award" },
      { src: "/image/ach3.jpeg", alt: "Top 5 React Track" },
      { src: "/image/ach9.png", alt: "DEPI ceremony and recognition" },
    ],
  },
  {
    badge: "Problem Solving · Codeforces",
    title: "Problem Solving Achievements — Codeforces",
    subtitle: "Earned Pupil and Specialist ranks on Codeforces",
    description:
      "I earned both the Pupil and Specialist ranks on Codeforces through continuous practice, virtual participation, and real contest experience on one of the most competitive problem solving platforms.",
    secondaryDescription:
      "I also solved nearly 500 problems on the platform, which helped me build strong algorithmic thinking, cleaner implementation skills, and deeper competitive programming experience.",
    points: [
      "Earned Pupil and Specialist ranks on Codeforces",
      "Solved nearly 500 problems on the platform",
      "Developed strong algorithmic and competitive programming skills",
    ],
    images: [
      { src: "/image/ach4.png", alt: "Codeforces rank achievement" },
      { src: "/image/ach5.png", alt: "Codeforces solved problems achievement" },
    ],
  },
  {
    badge: "Competitive Programming · ICPC Mansoura",
    title: "Competitive Programming — Game of Coders",
    subtitle: "Participated in the Game of Coders, organized by ICPC Mansoura",
    description:
      "I participated in the Game of Coders contest, organized by ICPC Mansoura, gaining hands-on experience with team-based competitive programming in a real contest environment.",
    secondaryDescription:
      "The event strengthened my problem-solving mindset, speed under pressure, and collaboration skills while working through challenging algorithmic problems with my teammates.",
    points: [
      "Participated in the Game of Coders contest by ICPC Mansoura",
      "Practiced team-based problem solving under real contest conditions",
      "Improved speed, accuracy, and communication in competitive programming",
    ],
    images: [
      { src: "/image/ach6.png", alt: "Game of Coders contest photo 1" },
      { src: "/image/ach7.png", alt: "Game of Coders contest photo 2" },
      { src: "/image/ach8.png", alt: "Game of Coders contest photo 3" },
    ],
  },
];

export default function Achievements() {
  const { isDark } = useTheme();

  return (
    <section
      id="achievements"
      className={`relative scroll-mt-20 lg:scroll-mt-24 ${isDark ? "" : "bg-gray-50/50"}`}
    >
      <div className="section-wrapper">
        <div className="text-center mb-16">
          <p className="section-label">Achievements</p>
          <h2 className={`section-title text-4xl sm:text-5xl inline-flex flex-wrap items-center justify-center gap-3 ${isDark ? "" : "text-text-light-main"}`}>
            <Trophy className="w-9 h-9 sm:w-11 sm:h-11 text-mint shrink-0" aria-hidden />
            <span className="gradient-text">Achievements</span>
          </h2>
          <div className="glow-line mx-auto" />
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="space-y-16 sm:space-y-24">
            {achievementSections.map((section, index) => (
              <div
                key={section.title}
                className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-start gap-12 lg:gap-16`}
              >
                <div className="w-full lg:w-2/5 lg:sticky lg:top-28 space-y-6">
                  <div
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold ${
                      isDark ? "bg-mint/10 text-mint border-mint/20" : "bg-mint/10 text-mint border-mint/25"
                    }`}
                  >
                    <Trophy className="w-3.5 h-3.5" />
                    {section.badge}
                  </div>

                  <h3 className={`text-2xl sm:text-3xl font-extrabold leading-tight ${isDark ? "text-text-main" : "text-gray-900"}`}>
                    {section.title}
                  </h3>

                  <p className={`text-sm sm:text-base leading-relaxed ${isDark ? "text-text-muted" : "text-gray-600"}`}>
                    {section.description}
                  </p>

                  <h4 className={`text-lg sm:text-xl font-bold leading-tight ${isDark ? "text-text-main" : "text-gray-900"}`}>
                    {section.subtitle}
                  </h4>

                  <p className={`text-sm sm:text-base leading-relaxed ${isDark ? "text-text-muted" : "text-gray-600"}`}>
                    {section.secondaryDescription}
                  </p>

                  <div className={`w-12 h-1 rounded-full ${isDark ? "bg-mint/40" : "bg-mint/60"}`} />

                  <div className="flex flex-col gap-3">
                    {section.points.map((point) => (
                      <div key={point} className="flex items-start gap-2.5">
                        <div className="mt-1 w-4 h-4 rounded-full bg-mint/15 flex items-center justify-center flex-shrink-0">
                          <div className="w-1.5 h-1.5 rounded-full bg-mint" />
                        </div>
                        <p className={`text-sm ${isDark ? "text-text-muted" : "text-gray-600"}`}>{point}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="w-full lg:w-3/5 flex flex-col gap-6">
                  {section.images.map((img) => (
                    <div
                      key={img.src}
                      className={`relative rounded-2xl overflow-hidden border ${
                        isDark ? "border-white/10" : "border-gray-200 shadow-md"
                      }`}
                    >
                      <img src={img.src} alt={img.alt} className="w-full h-auto object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
