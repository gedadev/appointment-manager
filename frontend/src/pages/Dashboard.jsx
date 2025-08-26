import "../styles/Dashboard.css";
import { Header } from "../components/Dashboard/Header";
import { useAppointment } from "../hooks/useAppointment";

export function Dashboard() {
  const { appointments, error } = useAppointment();

  return (
    <main className="dashboard">
      <section className="appointment-section">
        <Header />
      </section>
    </main>
  );
}
