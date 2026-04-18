import type { CSSProperties, ComponentType } from "react";
import { MessageCircle, Send, Github, Linkedin } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

type IconComponent = ComponentType<{ className?: string; style?: CSSProperties }>;

function DiscordIcon({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
    </svg>
  );
}

function FacebookIcon({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.198 21.5H9.198V13.49H6.802l.396-3.98h2V7.5c0-2.761 2.239-5 5-5h3v4h-3a1 1 0 0 0-1 1v2.01h4l-.396 3.98h-3.604V21.5Z" />
    </svg>
  );
}

function XIcon({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.53 3H20.5l-6.49 7.42L21.64 21h-5.98l-4.68-6.11L5.63 21H2.66l6.94-7.93L2.27 3h6.13l4.23 5.58L17.53 3Zm-1.05 16.2h1.65L7.5 4.7H5.73L16.48 19.2Z" />
    </svg>
  );
}

const socialLinks: Array<{
  label: string;
  href: string;
  icon: IconComponent;
  brand: string;
}> = [
  { label: "Facebook", href: "https://www.facebook.com/abdullahahmed.nar", icon: FacebookIcon, brand: "#3b82f6" },
  { label: "X", href: "https://x.com/A_b_d_ll_ah11", icon: XIcon, brand: "#cbd5e1" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/abdullah-ahmed-mohamed", icon: Linkedin, brand: "#38bdf8" },
  { label: "GitHub", href: "https://github.com/AbdullahAhmedNar", icon: Github, brand: "#c084fc" },
  { label: "WhatsApp", href: "https://api.whatsapp.com/send/?phone=201066209693", icon: MessageCircle, brand: "#22c55e" },
  { label: "Telegram", href: "https://t.me/NAAR108", icon: Send, brand: "#60a5fa" },
  { label: "Discord", href: "https://discord.com/users/ninga.com_89947", icon: DiscordIcon, brand: "#818cf8" },
];

export default function Contact() {
  const { isDark } = useTheme();
  const mailWidgetStyle = {
    ["--mail-body" as string]: isDark ? "#a35d57" : "#d87c73",
    ["--mail-top" as string]: isDark ? "#8f4d47" : "#c5675f",
    ["--mail-back" as string]: isDark ? "#7f4743" : "#bf5c55",
    ["--mail-left" as string]: isDark ? "#934f49" : "#d46a63",
    ["--mail-paper" as string]: isDark ? "#f4ede6" : "#fffaf5",
    ["--mail-accent" as string]: isDark ? "#a87c7c" : "#7e6363",
    ["--mail-shadow" as string]: isDark ? "rgba(0, 0, 0, 0.38)" : "rgba(94, 0, 6, 0.18)",
  } as CSSProperties;

  const socialBaseStyle = {
    ["--social-bg" as string]: isDark ? "#2f2626" : "#fffaf6",
    ["--social-edge" as string]: isDark ? "#4a3c3c" : "#dbc9b8",
  } as CSSProperties;

  return (
    <section id="contact" className={`relative ${isDark ? "" : "bg-gray-50/50"}`}>
      <div className="section-wrapper">
        <div className="text-center mb-16">
          <p className="section-label">Contact</p>
          <h2 className={`section-title text-4xl sm:text-5xl ${isDark ? "" : "text-text-light-main"}`}>
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <div className="glow-line mx-auto" />
        </div>

        <div className="max-w-5xl mx-auto">
          <div>
            <div
              className={`p-6 sm:p-8 rounded-3xl border ${
                isDark ? "bg-bg-surface border-white/5" : "bg-white border-gray-200 shadow-sm"
              }`}
            >
              <div className="text-center">
                <h3
                  className={`font-voltage text-xl sm:text-2xl font-bold tracking-[0.04em] mb-10 max-w-2xl mx-auto ${isDark ? "text-text-main" : "text-gray-900"}`}
                >
                  {"Let's work together – contact me anytime"}
                </h3>

                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=abdullahahmednar11@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-envelope-widget"
                  style={mailWidgetStyle}
                  aria-label="Open Gmail compose"
                >
                  <div className="contact-envelope-mail">
                    <div className="contact-envelope-back-fold" />
                    <div className="contact-envelope-letter">
                      <div className="contact-envelope-letter-border" />
                      <div className="contact-envelope-letter-title" />
                      <div className="contact-envelope-letter-context" />
                      <div className="contact-envelope-letter-stamp" />
                    </div>
                    <div className="contact-envelope-top-fold" />
                    <div className="contact-envelope-body" />
                    <div className="contact-envelope-left-fold" />
                  </div>
                  <div className="contact-envelope-shadow" />
                </a>

                <div className="mt-12" style={socialBaseStyle}>
                  <ul className="contact-social-list">
                    {socialLinks.map(({ label, href, icon: Icon, brand }) => (
                      <li key={label} className="contact-social-item">
                        <a
                          className="contact-social-link"
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={label}
                          style={{ ["--brand" as string]: brand } as CSSProperties}
                        >
                          <Icon className="w-5 h-5" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
