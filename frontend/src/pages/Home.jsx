import "../styles/Home.css";
import { Navbar } from "../components/Navbar";
import {
  FiActivity,
  FiArrowRight,
  FiCalendar,
  FiCheckCircle,
  FiUsers,
} from "react-icons/fi";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <main>
      <header>
        <Navbar />
      </header>
      <HeroSection />
      <FeaturesSection />
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

const FeaturesSection = () => {
  const featureData = [
    {
      icon: <FiCalendar />,
      title: "Smart Scheduling",
      content:
        "Effortlessly manage appointments with intelligent scheduling that prevents conflicts and optimizes your calendar.",
    },
    {
      icon: <FiUsers />,
      title: "Customer Management",
      content:
        "Keep detailed customer profiles with appointment history, preferences, and notes for personalized service.",
    },
    {
      icon: <FiActivity />,
      title: "Business Analytics",
      content:
        "Track revenue, appointment trends, and business performance with comprehensive dashboard insights.",
    },
    {
      icon: <FiCheckCircle />,
      title: "Status Tracking",
      content:
        "Monitor appointment status in real-time with confirmed, pending, completed an cancelled states.",
    },
  ];
  return (
    <section className="features-section">
      <div className="features-intro">
        <h1>Everything you need to manage your appointments</h1>
        <p>
          Powerful features designed to simplify your workflow and enhance
          customer experience
        </p>
      </div>
      <div className="features-cards-container">
        {featureData.map((feature) => (
          <div className="feature-card">
            <div className="card-header">
              <span>{feature.icon}</span>
              <h2>{feature.title}</h2>
            </div>
            <div className="card-content">
              <p>{feature.content}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
