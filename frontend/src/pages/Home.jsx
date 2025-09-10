import "../styles/Home.css";
import { Navbar } from "../components/Navbar";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <main>
      <header>
        <Navbar />
      </header>
      <HeroSection />
    </main>
  );
}

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <span className="hero-subtitle">Trusted by 1000+ Businesses</span>
        <h1>
          Smart Appointment Management for <span>Modern Businesses</span>{" "}
        </h1>
        <p>
          Manage your appointments with ease and and grow your business with our
          intelligent appointment management platform.
        </p>
        <Link to="/signup">
          <button>
            Get Started Free <FiArrowRight />
          </button>
        </Link>
      </div>
    </section>
  );
};
