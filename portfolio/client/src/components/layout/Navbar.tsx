import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  House,
  UserRound,
  Code2,
  FolderKanban,
  Trophy,
  Route,
  Newspaper,
  Mail,
} from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { useAdmin } from "../../hooks/useAdmin";
import NavbarClock from "./NavbarClock";

const navItems = [
  { label: "Home", href: "#hero", icon: House },
  { label: "About", href: "#about", icon: UserRound },
  { label: "Skills", href: "#skills", icon: Code2 },
  { label: "Projects", href: "#projects", icon: FolderKanban },
  { label: "Achievements", href: "#achievements", icon: Trophy },
  { label: "Journey", href: "#journey", icon: Route },
  { label: "Blog", href: "#blog", icon: Newspaper },
  { label: "Contact", href: "#contact", icon: Mail },
];

const mobileNavItems = [
  { label: "Home", href: "#hero", icon: House },
  { label: "Skills", href: "#skills", icon: Code2 },
  { label: "Projects", href: "#projects", icon: FolderKanban },
  { label: "Achievements", href: "#achievements", icon: Trophy },
  { label: "Contact", href: "#contact", icon: Mail },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#hero");
  const { isDark } = useTheme();
  const { registerSecretTap, isAdmin, logout } = useAdmin();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (location.pathname !== "/") return;

    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter((section): section is Element => Boolean(section));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      {
        rootMargin: "-42% 0px -42% 0px",
        threshold: 0.1,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [location.pathname]);

  const handleNavClick = (item: (typeof navItems)[0]) => {
    setActiveSection(item.href);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* ── Top header (desktop + mobile logo bar) ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 overflow-visible transition-all duration-300 ${
          scrolled
            ? isDark
              ? "bg-bg-main/95 backdrop-blur-md border-b border-white/5 shadow-xl shadow-black/20"
              : "bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-md"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-visible relative">
          <div className="flex items-center justify-between h-16 lg:h-20 overflow-visible">
            {/* Logo */}
            <Link
              to="/"
              onClick={(event) => {
                event.preventDefault();
                registerSecretTap();
                if (location.pathname !== "/") {
                  navigate("/");
                  setTimeout(() => {
                    document.querySelector("#hero")?.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                } else {
                  document.querySelector("#hero")?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="flex items-center group"
              aria-label="Abdullah Ahmed - Home"
            >
              <span
                className="text-xl sm:text-2xl leading-none tracking-wide select-none brand-text"
                style={{ fontFamily: "'MasterRumble', serif" }}
              >
                <span className="text-mint">&lt;</span>
                <span>Abdullah Ahmed</span>
                <span className="text-mint">/&gt;</span>
              </span>
            </Link>

            {isAdmin && (
              <button
                type="button"
                onClick={logout}
                className={`hidden rounded-full border px-3 py-1 text-xs font-semibold sm:inline-flex ${
                  isDark
                    ? "border-mint/40 bg-mint/10 text-mint hover:bg-mint/20"
                    : "border-mint/40 bg-mint/5 text-mint hover:bg-mint/15"
                }`}
              >
                Admin Logout
              </button>
            )}

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-2" aria-label="Main navigation">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.href === activeSection;

                return (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item)}
                    className={`nav-link pb-0.5 ${
                      isActive ? "active" : ""
                    } ${isDark ? "" : "text-gray-600 hover:text-mint"}`}
                  >
                    <Icon className="nav-link__icon" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* NAR branding */}
            <span
              className="hidden sm:inline-block text-2xl lg:text-3xl leading-none tracking-wide brand-text select-none"
              style={{ fontFamily: "'MasterRumble', serif" }}
              aria-hidden="true"
            >
              NAR
            </span>
          </div>

          {/* Neumorphic clock — hangs below header (lg+ only) */}
          <div
            className={`nav-hang-clock-anchor hidden lg:flex ${
              scrolled ? "nav-hang-clock-anchor--hidden" : ""
            }`}
          >
            <NavbarClock />
          </div>
        </div>
      </header>

      {/* ── Bottom nav bar (mobile only) ── */}
      <nav
        className={`bottom-nav lg:hidden ${isDark ? "bottom-nav--dark" : "bottom-nav--light"}`}
        aria-label="Mobile navigation"
      >
        <div className="bottom-nav__track">
          {mobileNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.href === activeSection;

            return (
              <button
                key={item.label}
                onClick={() => handleNavClick(item)}
                className={`bottom-nav__item ${isActive ? "bottom-nav__item--active" : ""}`}
              >
                <Icon className="bottom-nav__icon" />
                <span className="bottom-nav__label">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
