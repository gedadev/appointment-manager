import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

export function ProfileHeader() {
  const [activeSection, setActiveSection] = useState(null);
  const sections = useMemo(
    () => [
      { key: "general", text: "General Information" },
      { key: "hours", text: "Working Hours" },
      { key: "advanced", text: "Advanced" },
    ],
    []
  );

  useEffect(() => {
    if (!activeSection) {
      setActiveSection(sections[0].key);
    }
  }, [activeSection, sections]);

  const baseStyle = {
    backgroundColor: "rgba(0, 0, 0, 0)",
    color: "var(--dark)",
  };

  const activeStyle = {
    backgroundColor: "var(--accent-alt)",
    color: "var(--light)",
  };

  return (
    <>
      <header className="profile-header">
        <h1>Business Profile</h1>
        <span>Manage your business information and settings</span>
      </header>
      <nav className="profile-nav">
        <ul>
          {sections.map((section) => (
            <Link
              key={section.key}
              to={section.key}
              onClick={() => setActiveSection(section.key)}
              style={activeSection === section.key ? activeStyle : baseStyle}
            >
              <li>{section.text}</li>
            </Link>
          ))}
        </ul>
      </nav>
    </>
  );
}
