import "../styles/Profile.css";
import { Navbar } from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { ProfileHeader } from "../components/Profile/ProfileHeader";

export function Profile() {
  return (
    <main>
      <header>
        <Navbar />
      </header>
      <section className="profile-section">
        <ProfileHeader />
        <Outlet />
      </section>
    </main>
  );
}
