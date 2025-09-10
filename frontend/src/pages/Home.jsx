import "../styles/Home.css";
import { Navbar } from "../components/Navbar";
import { CTA, FeaturesSection, HeroSection } from "../components/LandingPage";

export function Home() {
  return (
    <main>
      <header>
        <Navbar />
      </header>
      <HeroSection />
      <FeaturesSection />
      <CTA />
    </main>
  );
}
