import "../styles/Profile.css";
import { ProfileProvider } from "../context/ProfileProvider";
import { ProfileHeader } from "../components/Profile/ProfileHeader";
import { ProfileForm } from "../components/Profile/ProfileForm";
import { Header } from "../components/Dashboard/Header";

export function Profile() {
  return (
    <main>
      <header>
        <Header />
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
