import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export function ProfileHeader() {
  const [activeSection, setActiveSection] = useState(null);
  const location = useLocation();
  const sections = useMemo(
    () => [
      { key: "general", label: "General Information" },
      { key: "hours", label: "Working Hours" },
      { key: "advanced", label: "Advanced" },
    ],
    []
  );

  useEffect(() => {
    const sectionInUrl = location.pathname.split("/")[2];

    if (!sectionInUrl) {
      setActiveSection(sections[0].key);
    } else {
      setActiveSection(sectionInUrl);
    }
  }, [sections, location]);

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
              style={activeSection === section.key ? activeStyle : baseStyle}
            >
              <li>{section.label}</li>
            </Link>
          ))}
        </ul>
      </nav>
    </>
  );
}
