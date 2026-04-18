import { ArrowUpRight, Clock } from "lucide-react";
import { blogPosts } from "../../data/static";
import { useTheme } from "../../hooks/useTheme";

export default function Blog() {
  const { isDark } = useTheme();

  return (
    <section id="blog" className={`relative ${isDark ? "section-soft-gradient--dark" : "section-soft-gradient--light"}`}>
      <div className="section-wrapper">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="section-label">Social Content</p>
            <h2 className={`section-title ${isDark ? "" : "text-text-light-main"}`}>
              Insights & <span className="gradient-text">Posts</span>
            </h2>
            <div className="glow-line" />
          </div>
          <p className={`text-sm ${isDark ? "text-text-muted" : "text-gray-500"}`}>
            Educational posts, practical notes, and technical content I share across my social platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noreferrer"
              className={`group relative p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                isDark
                  ? "bg-bg-surface border-white/5 hover:border-mint/20 hover:shadow-xl hover:shadow-mint/5"
                  : "bg-white border-gray-200 shadow-sm hover:border-mint/30 hover:shadow-mint/10 hover:shadow-md"
              }`}
              aria-label={`Open post: ${post.title}`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="tag">{post.tag}</span>
                    <span
                      className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                        isDark ? "bg-white/5 text-text-muted" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {post.platform}
                    </span>
                  </div>
                  <ArrowUpRight className={`w-4 h-4 transition-all duration-200 group-hover:text-mint ${
                    isDark ? "text-text-muted/30" : "text-gray-300"
                  }`} />
                </div>

                <h3 className={`font-bold text-base leading-snug ${isDark ? "text-text-main" : "text-gray-900"}`}>
                  {post.title}
                </h3>

                <p className={`text-sm leading-relaxed line-clamp-3 ${isDark ? "text-text-muted" : "text-gray-600"}`}>
                  {post.summary}
                </p>

                <div className={`flex items-center gap-3 text-xs pt-2 border-t ${
                  isDark ? "border-white/5 text-text-muted" : "border-gray-100 text-gray-400"
                }`}>
                  <span>{post.date}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>

                <span className="inline-flex items-center gap-1 text-xs font-semibold text-mint transition-colors">
                  View Post <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
