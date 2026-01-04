import HeroSection from "@/components/sections/hero-section"
import AboutSection from "@/components/sections/about-section"
import ProjectsSection from "@/components/sections/projects-section"
import SkillsSection from "@/components/sections/skills-section-server"
import ExperienceSection from "@/components/sections/experience-section-server"
import ContactSection from "@/components/sections/contact-section"
import Footer from "@/components/layout/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
      <Footer />
    </div>
  )
}
