import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Skills from "../components/sections/Skills";
import Projects from "../components/sections/Projects";
import Achievements from "../components/sections/Achievements";
import Journey from "../components/sections/Journey";
import Blog from "../components/sections/Blog";
import Contact from "../components/sections/Contact";

export default function HomePage() {
  return (
    <main className="wave-layout">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Achievements />
      <Journey />
      <Blog />
      <Contact />
    </main>
  );
}
