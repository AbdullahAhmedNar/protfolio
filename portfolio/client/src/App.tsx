import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { ThemeProvider } from "./hooks/useTheme";
import { AdminProvider } from "./hooks/useAdmin";
import { ProjectsProvider } from "./hooks/useProjects";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import AdminLoginModal from "./components/admin/AdminLoginModal";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
      <AdminLoginModal />
    </div>
  );
}

function AchievementsLegacyRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/", { replace: true });
    const id = window.setTimeout(() => {
      document.getElementById("achievements")?.scrollIntoView({ behavior: "smooth" });
    }, 80);
    return () => window.clearTimeout(id);
  }, [navigate]);
  return null;
}

export default function App() {
  return (
    <ThemeProvider>
      <AdminProvider>
        <ProjectsProvider>
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/achievements" element={<AchievementsLegacyRedirect />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </ProjectsProvider>
      </AdminProvider>
    </ThemeProvider>
  );
}
