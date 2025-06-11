import "../styles/Profile.css";
import { Navbar } from "../components/Navbar";
import { ProfileProvider } from "../context/ProfileProvider";
import { ProfileHeader } from "../components/Profile/ProfileHeader";
import { ProfileForm } from "../components/Profile/ProfileForm";

export function Profile() {
  return (
    <main>
      <header>
        <Navbar />
      </header>
      <section className="profile-section">
        <ProfileProvider>
          <ProfileHeader />
          <ProfileForm />
        </ProfileProvider>
      </section>
    </main>
  );
}
