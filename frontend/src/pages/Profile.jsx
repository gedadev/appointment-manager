import "../styles/Profile.css";
import { Navbar } from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { ProfileHeader } from "../components/Profile/ProfileHeader";
import { ProfileProvider } from "../context/ProfileProvider";

export function Profile() {
  return (
    <main>
      <header>
        <Navbar />
      </header>
      <section className="profile-section">
        <ProfileProvider>
          <ProfileHeader />
          <Outlet />
        </ProfileProvider>
      </section>
    </main>
  );
}
