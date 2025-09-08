import "../styles/Dashboard.css";
import { Header } from "../components/Dashboard/Header";
import { Outlet } from "react-router-dom";

export function Dashboard() {
  return (
    <main className="dashboard">
      <section className="appointment-section">
        <Header />
        <Outlet />
      </section>
    </main>
  );
}
